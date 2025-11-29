<?php

use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\RoleManagementController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::middleware('role:admin|superadmin')->prefix('users')->group(function () {
        Route::get('/', [UserManagementController::class, 'index'])->name('users.index');
        Route::get('/{user}', [UserManagementController::class, 'show'])->name('users.show');
        Route::post('/{user}/send-reset-password', [UserManagementController::class, 'sendResetPassword'])->name('users.send-reset-password');
    });

    Route::middleware('role:superadmin')->prefix('users')->group(function () {
        Route::get('/{user}/edit', [UserManagementController::class, 'edit'])->name('users.edit');
        Route::put('/{user}/roles', [UserManagementController::class, 'update'])->name('users.update.roles');
    });

    Route::middleware('role:superadmin')->prefix('roles')->group(function () {
        Route::get('/', [RoleManagementController::class, 'index'])->name('roles.index');
        Route::post('/', [RoleManagementController::class, 'store'])->name('roles.store');
        Route::put('/{role}', [RoleManagementController::class, 'update'])->name('roles.update');
        Route::delete('/{role}', [RoleManagementController::class, 'destroy'])->name('roles.destroy');
    });

    Route::middleware('role:admin|superadmin')->prefix('reports')->group(function () {
        Route::get('/', [ReportsController::class, 'index'])->name('reports.index');
    });
}); 