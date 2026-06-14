<?php

namespace App\Models;

use App\Http\Controllers\TypeDabonnementController;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
        protected $fillable = [
        'user_id',
        'type_abonnement_id',
        'start_date',
        'end_date',
        'status'
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

    public function typeAbonnement()
    {
        return $this->belongsTo(Type_dabonnement::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
