<?php

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    try{
        DB::connection()->getPdo();
        return response()->json([
            'status' => 'ok',
            'service' => "CPMS API's",
            'database' => [
                'status' => 'connected',
                'name' => DB::connection()->getDatabaseName(),
            ],
            'timestamp' => now()->toISOString(),
        ]);
    }catch(\Throwable $e){
        return response()->json([
            'status' => 'error',
            'service' => "CPMS API's",
            'database' => [
                'status' => 'disconnected',
            ],
        ], 503);
    }
});

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json([
        'user' => new UserResource($request->user()),
    ]);
});