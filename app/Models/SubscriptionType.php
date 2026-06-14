<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['nom_type', 'duree_jours', 'prix', 'description'])]
class SubscriptionType extends Model
{
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'type_id');
    }
}
