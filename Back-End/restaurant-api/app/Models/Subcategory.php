<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    protected $fillable = ['name', 'category_id'];

    // ✅ كل Subcategory تابعة لفئة واحدة
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // ✅ العلاقة مع الـ MenuItems
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
