<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/maintenance', function () {
    return Inertia::render('public/maintenance');
})->name('maintenance');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/superadmin/dashboard', [DashboardController::class, 'superadmin'])->name('superadmin.dashboard')->middleware('role:superadmin');
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->name('admin.dashboard')->middleware('role:admin|superadmin');
    Route::get('/user/dashboard', [DashboardController::class, 'user'])->name('user.dashboard');
});

// CLI routes
Route::get('/cli/login', [\App\Http\Controllers\CliController::class, 'showLogin'])->name('cli.login');
Route::post('/cli/login', [\App\Http\Controllers\CliController::class, 'handleLogin'])->name('cli.login.submit');
Route::post('/cli/authorize', [\App\Http\Controllers\CliController::class, 'authorize'])->middleware('auth')->name('cli.authorize');
Route::get('/cli/success', [\App\Http\Controllers\CliController::class, 'successPage'])->name('cli.success');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
