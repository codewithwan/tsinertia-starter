<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleRoleNavigation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user()) {
            return $next($request);
        }

        $navigationItems = [
            'superadmin' => [
                [
                    'title' => 'Dashboard',
                    'href' => '/dashboard',
                    'icon' => 'LayoutGrid',
                    'permission' => 'view dashboard'
                ],
                [
                    'title' => 'User Management',
                    'href' => '/users',
                    'icon' => 'Users',
                    'permission' => 'manage users'
                ],
                [
                    'title' => 'Role Management',
                    'href' => '/roles',
                    'icon' => 'Shield',
                    'permission' => 'manage roles'
                ],
            ],
            'admin' => [
                [
                    'title' => 'Dashboard',
                    'href' => '/dashboard',
                    'icon' => 'LayoutGrid',
                    'permission' => 'view dashboard'
                ],
                [
                    'title' => 'Reports',
                    'href' => '/reports',
                    'icon' => 'BarChart',
                    'permission' => 'view reports'
                ],
            ],
            'user' => [
                [
                    'title' => 'Dashboard',
                    'href' => '/dashboard',
                    'icon' => 'LayoutGrid',
                    'permission' => 'view dashboard'
                ],
            ],
        ];

        // Filter navigation items based on user permissions
        $userNavItems = collect($navigationItems[$request->user()->roles->first()->name] ?? [])
            ->filter(function ($item) use ($request) {
                return $request->user()->can($item['permission']);
            })
            ->values()
            ->all();

        $request->merge(['navigation_items' => $userNavItems]);

        return $next($request);
    }
}
