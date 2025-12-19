<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MaintenanceFlag
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $enabled = filter_var(env('APP_MAINTENANCE', false), FILTER_VALIDATE_BOOLEAN);

        if ($enabled) {
            $path = trim($request->path(), '/');
            $isHome = $path === '';
            $isMaintenance = $path === 'maintenance';

            if (!$isHome && !$isMaintenance) {
                if ($request->expectsJson()) {
                    return response()->json(['message' => 'Maintenance in progress'], 503);
                }

                return redirect()->route('maintenance');
            }
        }

        return $next($request);
    }
}
