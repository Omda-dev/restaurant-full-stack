<?php

namespace App\Http\Controllers;

use App\Models\Category;

class categories extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    // ⬅️ جديد: يرجع كل التصنيفات، السابكاتيجوريز، وكل menu items داخل كل sub
    public function withMenu()
    {
        // eager load subcategories and for each subcategory its menuItems
        $structure = Category::with(['subcategories.menuItems'])->get();

        // (اختياري) لو عايز تحوّل مسار الصورة لمسار كامل هنا بدل ما تعالج في الفرانت
        $structure->each(function($cat) {
            $cat->subcategories->each(function($sub) {
                $sub->menuItems->each(function($item) {
                    if ($item->image) {
                        $item->image = asset('storage/' . $item->image);
                    } else {
                        $item->image = null;
                    }
                });
            });
        });

        return response()->json($structure);
    }
}
