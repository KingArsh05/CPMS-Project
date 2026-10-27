<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\SessionHistory;
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
            $request,
        );

        SessionHistory::create([
            'emp_id' => $user->emp_id,
            'session_id' => $request->session()->getId(),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'status' => 'active',
            'login_at' => now(),
        ]);

        // Return the authenticated user's details.
        return response()->json([
            'message' => 'Login successful.',
            'user' => new UserResource($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $sessionId = $request->session()->getId();

        Auth::guard('web')->logout();

        SessionHistory::where('session_id', $sessionId)
            ->update([
                'status' => 'logged_out',
                'logout_at' => now(),
            ]);

        // Destroy the session record in DB and regenerate CSRF token.
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Cookie deletion is handled by ClearSessionCookiesOnLogout middleware,
        // which runs after StartSession and strips/expires both cookies cleanly.
        return response()->json(['message' => 'Logout successful.']);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }
}
