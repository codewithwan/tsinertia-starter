<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/security', [ProfileController::class, 'security'])->name('security.edit');
    Route::delete('settings/security', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/sessions', [SessionController::class, 'index'])->name('sessions.index');
    Route::delete('settings/sessions/{session}', [SessionController::class, 'destroy'])->name('sessions.destroy');
    Route::delete('settings/sessions', [SessionController::class, 'destroyAll'])->name('sessions.destroyAll');

    Route::get('settings/preferences', function () {
        return Inertia::render('settings/preferences');
    })->name('preferences');
});
