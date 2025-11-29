<?php
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use App\Services\ActivityLogService;

if (!function_exists('logActivity')) {
    function logActivity(string $action, string $description, ?array $metadata = null): ActivityLog
    {   
        return ActivityLogService::log(
            user: Auth::user() ?? new User(),
            action: $action,
            description: $description,
            metadata: $metadata
        );
    }
}

