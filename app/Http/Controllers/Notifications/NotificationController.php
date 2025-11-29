<?php

namespace App\Http\Controllers\Notifications;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Facades\Notification as NotificationFacade;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        $notifications = $request->user()
            ->notifications()
            ->latest()
            ->paginate(20)
            ->through(function ($notification) {
                return [
                    'id' => $notification->id,
                    'data' => $notification->data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at?->diffForHumans(),
                ];
            });

        return Inertia::render('notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Request $request, DatabaseNotification $notification): RedirectResponse
    {
        if ($notification->notifiable_id !== $request->user()->id) {
            abort(403);
        }

        $notification->markAsRead();

        return back()->with('status', 'Notification marked as read');
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return back()->with('status', 'All notifications marked as read');
    }

    public function send(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'user_ids' => ['required', 'array'],
            'user_ids.*' => ['required', 'exists:users,id'],
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'action_url' => ['nullable', 'url'],
            'action_text' => ['nullable', 'string'],
        ]);

        $userIds = $validated['user_ids'];
        $currentUser = $request->user();

        $query = User::whereIn('id', $userIds);

        if ($currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            $query->whereDoesntHave('roles', function ($q) {
                $q->whereIn('name', ['admin', 'superadmin']);
            });
        }

        $users = $query->get();

        if ($users->count() !== count($userIds)) {
            abort(403, 'You cannot send notifications to admin or superadmin users.');
        }

        $notification = new SystemNotification(
            title: $validated['title'],
            message: $validated['message'],
            actionUrl: $validated['action_url'] ?? null,
            actionText: $validated['action_text'] ?? null
        );

        NotificationFacade::send($users, $notification);

        return back()->with('success', 'Notification sent successfully to ' . $users->count() . ' user(s)');
    }

    public function broadcast(Request $request): RedirectResponse
    {
        if (!$request->user()->hasRole('superadmin')) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'action_url' => ['nullable', 'url'],
            'action_text' => ['nullable', 'string'],
        ]);

        $users = User::all();
        $notification = new SystemNotification(
            title: $validated['title'],
            message: $validated['message'],
            actionUrl: $validated['action_url'] ?? null,
            actionText: $validated['action_text'] ?? null
        );

        NotificationFacade::send($users, $notification);

        return back()->with('success', 'Broadcast notification sent successfully');
    }

    public function manage(Request $request): Response
    {
        $currentUser = $request->user();

        if (!$currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            abort(403);
        }

        $query = User::with('roles')->orderBy('name');

        if ($currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            $query->whereDoesntHave('roles', function ($q) {
                $q->whereIn('name', ['admin', 'superadmin']);
            });
        }

        $users = $query->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->map(fn($role) => [
                    'id' => $role->id,
                    'name' => $role->name,
                ]),
            ];
        });

        return Inertia::render('admin/notifications/manage', [
            'users' => $users,
            'isSuperadmin' => $currentUser->hasRole('superadmin'),
        ]);
    }
}

