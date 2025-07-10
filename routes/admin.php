<?php

use App\Http\Controllers\ReportsController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    // Superadmin routes
    Route::middleware('role:superadmin')->group(function () {
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::put('/users/{user}/roles', [UserManagementController::class, 'update'])->name('users.update.roles');

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