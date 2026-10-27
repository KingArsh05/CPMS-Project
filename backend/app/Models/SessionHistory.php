<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SessionHistory extends Model
{
    protected $fillable = [
        'emp_id',
        'session_id',
        'ip_address',
        'user_agent',
        'status',
        'login_at',
        'logout_at',
    ];

    protected function casts(): array
    {
        return [
            'login_at'  => 'datetime',
            'logout_at' => 'datetime',
        ];
    }

    // Relationship: Each session history belongs to a User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'emp_id', 'emp_id');
    }
}
