<?php

use App\Http\Controllers\ReportsController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // User Management - accessible by admin and superadmin
    Route::middleware('role:admin|superadmin')->group(function () {
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::get('/users/{user}', [UserManagementController::class, 'show'])->name('users.show');
        Route::post('/users/{user}/send-reset-password', [UserManagementController::class, 'sendResetPassword'])->name('users.send-reset-password');
    });

    // User Management - only superadmin can edit roles
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/users/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}/roles', [UserManagementController::class, 'update'])->name('users.update.roles');
    });

    // Superadmin routes
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/roles', [RoleManagementController::class, 'index'])->name('roles.index');
        Route::post('/roles', [RoleManagementController::class, 'store'])->name('roles.store');
        Route::put('/roles/{role}', [RoleManagementController::class, 'update'])->name('roles.update');
        Route::delete('/roles/{role}', [RoleManagementController::class, 'destroy'])->name('roles.destroy');
    });

    // Admin routes
    Route::middleware('role:admin|superadmin')->group(function () {
        Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');
    });
}); 