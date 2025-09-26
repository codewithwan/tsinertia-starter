<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();   
        
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
