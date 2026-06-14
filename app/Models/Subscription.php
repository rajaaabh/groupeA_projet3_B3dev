<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'type_id',
        'date_debut',
        'date_fin',
        'statut',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subscriptionType()
    {
        return $this->belongsTo(SubscriptionType::class, 'type_id');
    }
}
