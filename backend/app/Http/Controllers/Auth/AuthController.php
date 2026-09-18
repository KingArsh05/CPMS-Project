<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


final class AuthController extends Controller
{
    public function login(
        LoginRequest $request,
        LoginAction $loginAction
    ): JsonResponse {
        $user = $loginAction->execute(
            $request->string('college_email_id')->toString(),
            $request->string('password')->toString(),
        );

        return response()->json([
            'message' => 'Login successful.',
            'user' => new UserResource($user),
        ]);
    }

    public function logout(Request $request):JsonResponse{
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout successful.',
        ]);

    }
}