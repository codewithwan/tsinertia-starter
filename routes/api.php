<?php

use App\Http\Controllers\CliController;
use Illuminate\Support\Facades\Route;

Route::post('/cli/exchange-code', [CliController::class, 'exchangeCode'])->name('cli.exchange-code');

