<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Services\ActivityLogService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
     * Show the security settings page with sessions.
     */
    public function security(Request $request): Response
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();

        // Get all sessions for the current user
        $sessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->orderBy('last_activity', 'desc')
            ->get()
            ->map(function ($session) use ($currentSessionId) {
                return [
                    'id' => $session->id,
                    'ip_address' => $session->ip_address,
                    'user_agent' => $session->user_agent,
                    'last_activity' => $session->last_activity,
                    'last_activity_human' => now()->setTimestamp($session->last_activity)->diffForHumans(),
                    'is_current' => $session->id === $currentSessionId,
                    'device' => $this->getDeviceInfo($session->user_agent),
                    'location' => $this->getLocationInfo($session->ip_address),
                ];
            });

        return Inertia::render('settings/security', [
            'sessions' => $sessions,
            'currentSessionId' => $currentSessionId,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Get device information from user agent.
     */
    private function getDeviceInfo(?string $userAgent): string
    {
        if (!$userAgent) {
            return 'Unknown Device';
        }

        // Detect OS
        if (preg_match('/Windows NT 10.0/i', $userAgent)) {
            $os = 'Windows 10/11';
        } elseif (preg_match('/Windows NT 6.3/i', $userAgent)) {
            $os = 'Windows 8.1';
        } elseif (preg_match('/Windows NT 6.2/i', $userAgent)) {
            $os = 'Windows 8';
        } elseif (preg_match('/Windows NT 6.1/i', $userAgent)) {
            $os = 'Windows 7';
        } elseif (preg_match('/Mac OS X/i', $userAgent)) {
            $os = 'macOS';
        } elseif (preg_match('/Linux/i', $userAgent)) {
            $os = 'Linux';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $os = 'Android';
        } elseif (preg_match('/iPhone|iPad|iPod/i', $userAgent)) {
            $os = 'iOS';
        } else {
            $os = 'Unknown OS';
        }

        // Detect Browser
        if (preg_match('/Chrome/i', $userAgent) && !preg_match('/Edg|OPR/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Safari/i', $userAgent) && !preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/Edg/i', $userAgent)) {
            $browser = 'Edge';
        } elseif (preg_match('/OPR/i', $userAgent)) {
            $browser = 'Opera';
        } else {
            $browser = 'Unknown Browser';
        }

        return "{$browser} on {$os}";
    }

    /**
     * Get location information from IP address.
     */
    private function getLocationInfo(?string $ipAddress): string
    {
        if (!$ipAddress || $ipAddress === '127.0.0.1' || $ipAddress === '::1') {
            return 'Local';
        }

        return $ipAddress;
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

        $changes = [];
        
        if (isset($validated['name']) && !empty(trim($validated['name']))) {
            $oldName = $user->name;
            $user->name = trim($validated['name']);
            if ($oldName !== $user->name) {
                $changes['name'] = ['old' => $oldName, 'new' => $user->name];
            }
        }
        
        if (isset($validated['email']) && !empty(trim($validated['email']))) {
            $oldEmail = $user->email;
            $user->email = trim($validated['email']);

            if ($oldEmail !== $user->email) {
                $user->email_verified_at = null;
                $changes['email'] = ['old' => $oldEmail, 'new' => $user->email];
            }
        }

        $user->save();
        $user->refresh();

        if (!empty($changes)) {
            ActivityLogService::logFromRequest(
                $request,
                'profile_updated',
                'User updated their profile',
                ['changes' => $changes]
            );
        }

        if ($request->hasFile('avatar')) {
            ActivityLogService::logFromRequest(
                $request,
                'avatar_updated',
                'User updated their profile picture'
            );
        }

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
