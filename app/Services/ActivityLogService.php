<?php

namespace App\Services;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityLogService
{
    public static function log(
        User|int|null $user = null,
        string $action,
        string $description,
        ?array $metadata = null,
        ?string $ipAddress = null,
        ?string $userAgent = null
    ): ActivityLog {
        $userId = null;
        
        if ($user instanceof User) {
            $userId = $user->id;
        } elseif (is_int($user)) {
            $userId = $user;
        } elseif (Auth::check()) {
            $userId = Auth::id();
        }

        return ActivityLog::create([
            'user_id' => $userId,
            'action' => $action,
            'description' => $description,
            'ip_address' => $ipAddress ?? request()?->ip(),
            'user_agent' => $userAgent ?? request()?->userAgent(),
            'metadata' => $metadata ? json_encode($metadata) : null,
        ]);
    }

    public static function logFromRequest(
        Request $request,
        string $action,
        string $description,
        ?array $metadata = null
    ): ActivityLog {
        return self::log(
            user: $request->user(),
            action: $action,
            description: $description,
            metadata: $metadata,
            ipAddress: $request->ip(),
            userAgent: $request->userAgent()
        );
    }
}

