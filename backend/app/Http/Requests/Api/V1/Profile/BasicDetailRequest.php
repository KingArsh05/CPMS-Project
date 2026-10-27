<?php

namespace App\Http\Requests\Api\V1\Profile;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BasicDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $currentEmpId = $this->user()->emp_id;
        return [
            // Aadhaar must be 12 digits, unique (ignoring the user's own current record)
            'aadhaar_number' => [
                'required', 
                'digits:12', 
                Rule::unique('user_basic_details', 'aadhaar_number')->ignore($currentEmpId, 'emp_id')
            ],
            // PAN must be 10 characters (5 letters, 4 digits, 1 letter)
            'pancard_number' => [
                'required', 
                'string', 
                'size:10', 
                'regex:/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/',
                Rule::unique('user_basic_details', 'pancard_number')->ignore($currentEmpId, 'emp_id')
            ],
            'blood_group'     => ['required', Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])],
            'dob'             => ['required', 'date', 'before:today'],
            'contact_number'  => ['required', 'digits:10'],
            'present_address' => ['required', 'string', 'max:1000'],
            // Profile photo upload: must be provided (or already exist on record), real image, max 2MB
            'profile_pic'     => [
                $this->user()?->basicDetail?->profile_pic ? 'nullable' : 'required',
                'image',
                'mimes:jpeg,png,jpg,webp',
                'max:2048',
            ],
        ];
    }
}
