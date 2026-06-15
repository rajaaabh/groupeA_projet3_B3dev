<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionType extends Model
{
    protected $fillable = [
        'nom_type',
        'duree_jours',
        'prix',
        'description',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'type_id');
    }
}
