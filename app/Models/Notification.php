<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
        protected $fillable = [
        'user_id',
        'subscription_id',
        'message',
        'type',
        'date_envoi',
        'lu'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

}
