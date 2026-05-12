<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Breakfast',
            'Lunch',
            'Dinner',
            'Desserts',
            'Drinks',
        ];

        foreach ($categories as $name) {
            $category = Category::where('name', $name)->first();

            if ($category) {
                if (empty($category->slug)) {
                    $category->slug = Str::slug($name);
                    $category->save();
                }

                continue;
            }

            $category = new Category();
            $category->name = $name;
            $category->slug = Str::slug($name);
            $category->save();
        }
    }
}
