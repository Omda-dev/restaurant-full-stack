<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    // ✅ العلاقة مع الـ Subcategories
    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    // ✅ العلاقة مع الـ MenuItems
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
