<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Base URL: {host}/api/...
| Routes are organized into versioned groups with explicit names.
|
*/

// Health Check Endpoint: /api/health -> api.health
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();

        return response()->json([
            'status' => 'ok',
            'service' => "CPMS API's",
            'database' => [
                'status' => 'connected',
                'name' => DB::connection()->getDatabaseName(),
            ],
            'timestamp' => now('Asia/Kolkata')->format('d F Y, h:i A'),
        ]);
    } catch (Throwable $e) {
        return response()->json([
            'status' => 'error',
            'service' => "CPMS API's",
            'database' => [
                'status' => 'disconnected',
            ],
        ], 503);
    }
})->name('api.health');

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/user', [AuthController::class, 'user'])->name('user');
        Route::get('/me', [AuthController::class, 'user'])->name('me');
    });
});

Route::post('/users', [UserController::class, 'store'])->name('user.store');
