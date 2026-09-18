<?php

declare(strict_types=1);
namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'college_email_id' => [
                'required',
                'string',
                'email',
                'max:100',
            ],
            'password' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }
}
