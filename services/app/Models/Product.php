<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'price', 'stock', 'image', 'is_active'];
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
