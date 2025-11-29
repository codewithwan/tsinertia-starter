<?php

use App\Http\Controllers\Notifications\NotificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('notifications')->name('notifications.')->group(function () {
    Route::get('/', [NotificationController::class, 'index'])->name('index');
    Route::post('/{notification}/read', [NotificationController::class, 'markAsRead'])->name('read');
    Route::post('/read-all', [NotificationController::class, 'markAllAsRead'])->name('read-all');
});

Route::middleware(['auth', 'verified', 'role:admin|superadmin'])->prefix('admin/notifications')->name('admin.notifications.')->group(function () {
    Route::get('/manage', [NotificationController::class, 'manage'])->name('manage');
    Route::post('/send', [NotificationController::class, 'send'])->name('send');
    Route::post('/broadcast', [NotificationController::class, 'broadcast'])->name('broadcast')->middleware('role:superadmin');
});

