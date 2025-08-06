<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['name', 'address', 'phone', 'items', 'total', 'status'];

    protected $casts = [
        'items' => 'array',
    ];
}
