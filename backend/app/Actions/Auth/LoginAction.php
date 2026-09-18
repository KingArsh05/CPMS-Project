<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

final class LoginAction
{
    public function execute(string $email, string $password): User
    {
        if (! Auth::attempt([
            'college_email_id' => $email,
            'password' => $password,
        ])) {
            throw ValidationException::withMessages([
                'college_email_id' => [
                    'The provided credentials are incorrect.',
                ],
            ]);
        }

        /** @var User $user */
        $user = Auth::user();

        if ($user->status !== 'active') {
            Auth::logout();

            throw ValidationException::withMessages([
                'college_email_id' => [
                    'Your account is not active.',
                ],
            ]);
        }

        request()->session()->regenerate();

        return $user;
    }
}