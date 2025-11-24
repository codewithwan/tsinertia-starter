<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = User::with('roles');
        
        if ($user->hasRole('admin') && !$user->hasRole('superadmin')) {
            $query->whereDoesntHave('roles', function ($q) {
                $q->where('name', 'superadmin');
            });
        }
        
        // Search functionality
        if ($request->has('search') && $request->get('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }
        
        $perPage = $request->get('per_page', 10);
        $perPage = in_array($perPage, [10, 25, 50, 100]) ? (int) $perPage : 10;
        
        $users = $query->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();
        
        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => Role::all(),
        ]);
    }

    public function show(Request $request, User $user)
    {
        $currentUser = $request->user();
    
        if ($currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            if ($user->hasRole('superadmin')) {
                abort(403, 'Unauthorized action.');
            }
        }
        
        $user->load('roles');
        
        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    public function edit(Request $request, User $user)
    {
        $currentUser = $request->user();
        
        if (!$currentUser->hasRole('superadmin')) {
            abort(403, 'Only superadmin can edit user roles.');
        }
        
        if ($currentUser->id === $user->id) {
            abort(403, 'You cannot edit your own account roles.');
        }
        
        $user->load('roles');
        
        $roles = Role::whereIn('name', ['user', 'admin'])->get();
        
        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $currentUser = $request->user();
        
        // Only superadmin can update roles
        if (!$currentUser->hasRole('superadmin')) {
            abort(403, 'Only superadmin can update user roles.');
        }
        
        if ($currentUser->id === $user->id) {
            abort(403, 'You cannot edit your own account roles.');
        }
        
        // Prevent editing superadmin users
        if ($user->hasRole('superadmin')) {
            abort(403, 'Cannot edit superadmin user roles.');
        }
        
        $validated = $request->validate([
            'role_id' => ['required', 'integer', 'exists:roles,id'],
        ]);

        // Only allow user and admin roles (not superadmin)
        $allowedRoleIds = Role::whereIn('name', ['user', 'admin'])->pluck('id')->toArray();
        
        if (!in_array($validated['role_id'], $allowedRoleIds)) {
            return back()->withErrors(['role_id' => 'Invalid role selected.']);
        }

        $user->syncRoles([$validated['role_id']]);

        return back()->with('success', 'User roles updated successfully.');
    }

    public function sendResetPassword(Request $request, User $user)
    {
        $currentUser = $request->user();
        
        // Admin and superadmin can send reset password
        if (!$currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            abort(403, 'Unauthorized action.');
        }
        
        // Admin cannot send reset password to other admins or superadmins
        if ($currentUser->hasRole('admin') && !$currentUser->hasRole('superadmin')) {
            if ($user->hasRole('admin') || $user->hasRole('superadmin')) {
                abort(403, 'You cannot send reset password to admin or superadmin users.');
            }
        }
        
        $status = Password::sendResetLink(['email' => $user->email]);
        
        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('success', 'Password reset link has been sent to the user\'s email.');
        }
        
        return back()->withErrors(['email' => __($status)]);
    }
}
