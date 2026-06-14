<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'message', 'type', 'date_denvoi', 'lu'])]
class Notification extends Model
{
    protected function casts(): array
    {
        return [
            'lu' => 'boolean',
            'date_denvoi' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
