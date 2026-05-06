<?php

use App\Models\ActivityLog;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Support\Facades\Auth;

if (! function_exists('logActivity')) {
    function logActivity(string $action, string $description, ?array $metadata = null): ActivityLog
    {
        return ActivityLogService::log(
            user: Auth::user() ?? new User,
            action: $action,
            description: $description,
            metadata: $metadata
        );
    }
}
