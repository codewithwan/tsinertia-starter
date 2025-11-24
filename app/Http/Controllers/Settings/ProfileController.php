<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the security settings page.
     */
    public function security(Request $request): Response
    {
        return Inertia::render('settings/security');
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        if ($request->hasFile('avatar')) {
            $oldAvatar = $user->avatar;
            
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = '/storage/' . $avatarPath;
            
            if ($oldAvatar && $oldAvatar !== $user->avatar) {
                $oldAvatarPath = str_replace('/storage/', '', $oldAvatar);
                if (Storage::disk('public')->exists($oldAvatarPath)) {
                    Storage::disk('public')->delete($oldAvatarPath);
                }
            }
        }

        if (isset($validated['name']) && !empty(trim($validated['name']))) {
            $user->name = trim($validated['name']);
        }
        
        if (isset($validated['email']) && !empty(trim($validated['email']))) {
            $oldEmail = $user->email;
            $user->email = trim($validated['email']);

            if ($oldEmail !== $user->email) {
                $user->email_verified_at = null;
            }
        }

        $user->save();
        $user->refresh();

        return to_route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
