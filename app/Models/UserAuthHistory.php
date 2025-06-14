<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserAuthHistory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'store_id',
        'user_id',
        'ip_address',
        'type',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
