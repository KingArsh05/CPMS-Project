<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $primaryKey = 'emp_id';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        "emp_id",
        "college_id",
        "name",
        "college_email_id",
        "password",
        "role",
        "designation",
        "status"
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected function casts():array{
        return [
            "emp_id"=>"integer",
            "password"=>"hashed",
        ];
    }
}