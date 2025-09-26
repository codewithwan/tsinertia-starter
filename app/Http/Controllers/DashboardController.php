<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Redirect to role-specific dashboard
        if ($user->hasRole('superadmin')) {
            return Inertia::render('superadmin/dashboard');
        } elseif ($user->hasRole('admin')) {
            return Inertia::render('admin/dashboard');
        } else {
            return Inertia::render('user/dashboard');
        }
    }
    
    public function superadmin()
    {
        return Inertia::render('superadmin/dashboard');
    }
    
    public function admin()
    {
        return Inertia::render('admin/dashboard');
    }
    
    public function user()
    {
        return Inertia::render('user/dashboard');
    }
}
