<?php

use App\Http\Controllers\CliController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'cli'], function () {
    Route::get('/login', [CliController::class, 'showLogin'])->name('cli.login');
    Route::post('/login', [CliController::class, 'handleLogin'])->name('cli.login.submit');
    Route::post('/authorize', [CliController::class, 'authorize'])->middleware('auth')->name('cli.authorize');
    Route::get('/success', [CliController::class, 'successPage'])->name('cli.success');
});