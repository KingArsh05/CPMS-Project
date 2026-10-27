<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserBasicDetail extends Model
{
    protected $table = 'user_basic_details';

    protected $fillable = [
        'emp_id',
        'profile_pic',
        'aadhaar_number',
        'pancard_number',
        'present_address',
        'dob',
        'blood_group',
        'contact_number',
    ];

    protected function casts(): array
    {
        return [
            'dob' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'emp_id', 'emp_id');
    }


}
