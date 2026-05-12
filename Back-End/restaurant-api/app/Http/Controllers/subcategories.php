<?php

namespace App\Http\Controllers;

use App\Models\Subcategory;

class subcategories extends Controller
{
    public function index()
    {
        return response()->json(Subcategory::all());
    }


public function getByCategory($categoryId)
{
    $subcategories = Subcategory::where('category_id', $categoryId)->get();

    return response()->json($subcategories);
}
}
