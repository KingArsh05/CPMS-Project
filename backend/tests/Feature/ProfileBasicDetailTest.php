<?php

use App\Models\User;
use App\Models\UserBasicDetail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

test('unauthenticated users cannot access basic details', function () {
    $response = $this->getJson(route('api.v1.profile.basic-details.show'));

    $response->assertStatus(401)
        ->assertJson(['message' => 'Unauthenticated.']);
});

test('authenticated user can view their basic details', function () {
    $user = User::create([
        'emp_id' => 9999,
        'college_id' => 'GNDEC9999',
        'name' => 'Prof. Testing',
        'college_email_id' => 'prof9999@gndec.ac.in',
        'password' => Hash::make('password123'),
        'role' => 'teacher',
        'designation' => 'assistant_professor',
        'status' => 'active',
    ]);

    UserBasicDetail::create([
        'emp_id' => $user->emp_id,
        'aadhaar_number' => '112233445566',
        'pancard_number' => 'ABCDE9999Z',
        'blood_group' => 'O+',
        'dob' => '1990-01-01',
        'contact_number' => '9876543210',
        'present_address' => 'GNDEC Campus, Ludhiana',
    ]);

    $response = $this->actingAs($user)
        ->getJson(route('api.v1.profile.basic-details.show'));

    $response->assertOk()
        ->assertJsonPath('data.aadhaar_number', '112233445566')
        ->assertJsonPath('data.pancard_number', 'ABCDE9999Z');
});
