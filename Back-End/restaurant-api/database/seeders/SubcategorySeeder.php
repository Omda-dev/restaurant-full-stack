<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        $subcategories = [
            ['name' => 'Egg Dishes', 'category' => 'Breakfast'],
            ['name' => 'Pancakes', 'category' => 'Breakfast'],
            ['name' => 'Grilled', 'category' => 'Lunch'],
            ['name' => 'Pasta', 'category' => 'Lunch'],
            ['name' => 'Main Courses', 'category' => 'Dinner'],
            ['name' => 'Cakes', 'category' => 'Desserts'],
            ['name' => 'Juices', 'category' => 'Drinks'],
            ['name' => 'Hot Drinks', 'category' => 'Drinks'],
        ];

        foreach ($subcategories as $sub) {
            $category = Category::where('name', $sub['category'])->first();

            if (! $category) {
                continue;
            }

            Subcategory::firstOrCreate([
                'name' => $sub['name'],
                'category_id' => $category->id,
            ]);
        }
    }
}
