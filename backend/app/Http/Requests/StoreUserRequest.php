<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'emp_id' => ['required', 'integer', 'unique:users,emp_id'],
            'college_id' => ['required', 'string', 'max:30', 'unique:users,college_id'],
            'name' => ['required', 'string', 'min:3', 'max:50'],
            'college_email_id' => ['required', 'email', 'ends_with:@gndec.ac.in', 'unique:users,college_email_id'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:staff,teacher,hod,establishment,principal,dev_admin'],
            'designation' => ['nullable', 'in:professor,assistant_professor,hod,principal'],
        ];
    }
}
