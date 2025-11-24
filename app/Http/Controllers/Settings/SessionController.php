<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    /**
     * Show the user's active sessions.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();

        // Get all sessions for the current user
        $sessions = DB::table('sessions')
            ->where('user_id', operator: $user->id)
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

        return Inertia::render('settings/sessions', [
            'sessions' => $sessions,
            'currentSessionId' => $currentSessionId,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Delete a specific session.
     */
    public function destroy(Request $request, string $sessionId)
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();

        // Prevent deleting current session
        if ($sessionId === $currentSessionId) {
            return back()->withErrors(['session' => 'You cannot delete your current session.']);
        }

        // Delete the session
        DB::table('sessions')
            ->where('id', $sessionId)
            ->where('user_id', $user->id)
            ->delete();

        return back()->with('status', 'Session deleted successfully.');
    }

    /**
     * Delete all other sessions (keep current).
     */
    public function destroyAll(Request $request)
    {
        $user = $request->user();
        $currentSessionId = $request->session()->getId();

        // Delete all sessions except current
        DB::table('sessions')
            ->where('user_id', $user->id)
            ->where('id', '!=', $currentSessionId)
            ->delete();

        return back()->with('status', 'All other sessions have been deleted.');
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

        // For production, you might want to use a geolocation service
        // For now, we'll just return the IP
        return $ipAddress;
    }
}

