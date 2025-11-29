<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ActivityLogController extends Controller
{
    public function index(Request $request): Response|StreamedResponse
    {
        $currentUser = $request->user();
        $isSuperadmin = $currentUser->hasRole('superadmin');
        $isAdmin = $currentUser->hasRole('admin');

        $query = ActivityLog::with('user:id,name,email')
            ->latest();

        if (!$isSuperadmin && !$isAdmin) {
            $query->where('user_id', $currentUser->id);
        } elseif ($isAdmin && !$isSuperadmin) {
            $query->whereHas('user', function ($q) {
                $q->whereDoesntHave('roles', function ($roleQuery) {
                    $roleQuery->whereIn('name', ['admin', 'superadmin']);
                });
            });
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('action')) {
            $query->where('action', $request->action);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->filled('export')) {
            return $this->export($query, $request->export);
        }

        $activityLogs = $query->paginate(20)->through(function ($log) {
            return [
                'id' => $log->id,
                'action' => $log->action,
                'description' => $log->description,
                'ip_address' => $log->ip_address,
                'user_agent' => $log->user_agent,
                'metadata' => $log->metadata,
                'created_at' => $log->created_at?->diffForHumans(),
                'created_at_raw' => $log->created_at?->toIso8601String(),
                'user' => $log->user ? [
                    'id' => $log->user->id,
                    'name' => $log->user->name,
                    'email' => $log->user->email,
                ] : null,
            ];
        });

        $users = collect();
        $actions = collect();

        if ($isSuperadmin || $isAdmin) {
            $users = User::select('id', 'name', 'email')
                ->orderBy('name')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]);

            if (!$isSuperadmin) {
                $users = $users->filter(function ($user) {
                    $userModel = User::find($user['id']);
                    return $userModel && !$userModel->hasAnyRole(['admin', 'superadmin']);
                });
            }

            $actions = ActivityLog::select('action')
                ->distinct()
                ->orderBy('action')
                ->pluck('action')
                ->map(fn ($action) => [
                    'value' => $action,
                    'label' => ucwords(str_replace('_', ' ', $action)),
                ]);
        }

        return Inertia::render('activity/index', [
            'activityLogs' => $activityLogs,
            'users' => $users,
            'actions' => $actions,
            'filters' => [
                'user_id' => $request->user_id,
                'action' => $request->action,
                'search' => $request->search,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
            'isSuperadmin' => $isSuperadmin,
            'isAdmin' => $isAdmin,
        ]);
    }

    public function export($query, string $format): StreamedResponse
    {
        $logs = $query->get();
        $filename = 'activity_logs_' . now()->format('Y-m-d_H-i-s') . '.' . $format;

        if ($format === 'csv') {
            return $this->exportCsv($logs, $filename);
        }

        return $this->exportJson($logs, $filename);
    }

    private function exportCsv($logs, string $filename): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        return response()->stream(function () use ($logs) {
            $file = fopen('php://output', 'w');

            fputcsv($file, ['ID', 'User', 'Email', 'Action', 'Description', 'IP Address', 'User Agent', 'Created At']);

            foreach ($logs as $log) {
                fputcsv($file, [
                    $log->id,
                    $log->user?->name ?? 'N/A',
                    $log->user?->email ?? 'N/A',
                    $log->action,
                    $log->description,
                    $log->ip_address ?? 'N/A',
                    $log->user_agent ?? 'N/A',
                    $log->created_at?->format('Y-m-d H:i:s') ?? 'N/A',
                ]);
            }

            fclose($file);
        }, 200, $headers);
    }

    private function exportJson($logs, string $filename): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'application/json',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        return response()->stream(function () use ($logs) {
            $data = $logs->map(function ($log) {
                return [
                    'id' => $log->id,
                    'user' => $log->user ? [
                        'id' => $log->user->id,
                        'name' => $log->user->name,
                        'email' => $log->user->email,
                    ] : null,
                    'action' => $log->action,
                    'description' => $log->description,
                    'ip_address' => $log->ip_address,
                    'user_agent' => $log->user_agent,
                    'metadata' => $log->metadata,
                    'created_at' => $log->created_at?->toIso8601String(),
                ];
            });

            echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        }, 200, $headers);
    }

    public function deleteOldLogs(Request $request): RedirectResponse
    {
        if (!$request->user()->hasRole('superadmin')) {
            abort(403);
        }

        $deleted = ActivityLog::where('created_at', '<', now()->subDays(90))->delete();

        return back()->with('success', "Deleted {$deleted} activity logs older than 90 days.");
    }
}
