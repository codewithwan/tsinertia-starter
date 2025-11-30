<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FeedbackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/maintenance', function () {
    return Inertia::render('public/maintenance');
})->name('maintenance');

Route::get('/changelog', function () {
    return Inertia::render('public/changelog');
})->name('changelog');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/superadmin/dashboard', [DashboardController::class, 'superadmin'])->name('superadmin.dashboard')->middleware('role:superadmin');
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->name('admin.dashboard')->middleware('role:admin|superadmin');
    Route::get('/user/dashboard', [DashboardController::class, 'user'])->name('user.dashboard');
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/cli.php';
require __DIR__.'/notifications.php';
require __DIR__.'/user.php';
require __DIR__.'/admin.php';
