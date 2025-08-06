<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Define fillable fields if needed
    protected $fillable = [
        'email',
        'password',
    ];

    // Hide sensitive fields
    protected $hidden = [
        'password',
        'remember_token',
    ];
}
