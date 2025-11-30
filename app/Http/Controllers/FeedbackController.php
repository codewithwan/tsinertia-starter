<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class FeedbackController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:bug,feature,improvement,rating,other',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        Feedback::create([
            'user_id' => $request->user()?->id,
            'type' => $validated['type'],
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'],
            'rating' => $validated['rating'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'metadata' => [
                'url' => $request->header('referer'),
                'page' => $request->input('page'),
            ],
        ]);

        return back()->with('success', 'Thank you for your feedback!');
    }

    public function index(Request $request): Response
    {
        $currentUser = $request->user();
        $isSuperadmin = $currentUser->hasRole('superadmin');
        $isAdmin = $currentUser->hasRole('admin');

        if (!$isSuperadmin && !$isAdmin) {
            abort(403);
        }

        $query = Feedback::with('user:id,name,email,avatar')
            ->latest();

        // Superadmin can see all feedbacks
        // Admin can see all feedbacks except superadmin feedbacks
        if ($isAdmin && !$isSuperadmin) {
            $query->where(function ($q) {
                $q->whereHas('user', function ($userQuery) {
                    $userQuery->whereDoesntHave('roles', function ($roleQuery) {
                        $roleQuery->whereIn('name', ['admin', 'superadmin']);
                    });
                })->orWhereNull('user_id');
            });
        }

        // Filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('subject', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->filled('rating')) {
            $query->where('rating', $request->rating);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Get paginated results
        $feedbacks = $query->paginate(20)->withQueryString();

        // Get filter options
        $types = ['bug', 'feature', 'improvement', 'rating', 'other'];
        $users = User::select('id', 'name', 'email')
            ->when($isAdmin && !$isSuperadmin, function ($q) {
                $q->whereDoesntHave('roles', function ($roleQuery) {
                    $roleQuery->whereIn('name', ['admin', 'superadmin']);
                });
            })
            ->orderBy('name')
            ->get();

        // Get statistics (overall stats without filters, but with role restrictions)
        $statsQuery = Feedback::query();
        
        if ($isAdmin && !$isSuperadmin) {
            $statsQuery->where(function ($q) {
                $q->whereHas('user', function ($userQuery) {
                    $userQuery->whereDoesntHave('roles', function ($roleQuery) {
                        $roleQuery->whereIn('name', ['admin', 'superadmin']);
                    });
                })->orWhereNull('user_id');
            });
        }

        $avgRating = (clone $statsQuery)->whereNotNull('rating')->avg('rating');

        $stats = [
            'total' => (clone $statsQuery)->count(),
            'by_type' => (clone $statsQuery)
                ->select('type', DB::raw('count(*) as count'))
                ->groupBy('type')
                ->pluck('count', 'type')
                ->toArray(),
            'avg_rating' => $avgRating !== null ? (float) $avgRating : null,
        ];

        return Inertia::render('admin/feedback/index', [
            'feedbacks' => $feedbacks,
            'filters' => [
                'type' => $request->type ?? '',
                'user_id' => $request->user_id ?? '',
                'search' => $request->search ?? '',
                'rating' => $request->rating ?? '',
                'date_from' => $request->date_from ?? '',
                'date_to' => $request->date_to ?? '',
            ],
            'types' => $types,
            'users' => $users,
            'stats' => $stats,
        ]);
    }
}
