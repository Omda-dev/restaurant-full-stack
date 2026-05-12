<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->menuItems() as $item) {
            $category = $this->findOrCreateCategory($item['category']);

            $subcategory = Subcategory::firstOrCreate([
                'category_id' => $category->id,
                'name' => $item['subCategory'],
            ]);

            MenuItem::updateOrCreate(
                [
                    'name' => $item['name'],
                    'category_id' => $category->id,
                ],
                [
                    'description' => $item['description'],
                    'price' => $item['price'],
                    'image' => $item['image'],
                    'subcategory_id' => $subcategory->id,
                ]
            );
        }
    }

    private function findOrCreateCategory(string $name): Category
    {
        $category = Category::where('name', $name)->first();

        if ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($name);
                $category->save();
            }

            return $category;
        }

        $category = new Category();
        $category->name = $name;
        $category->slug = Str::slug($name);
        $category->save();

        return $category;
    }

    private function menuItems(): array
    {
        return [
            [
                'name' => 'Classic Pancakes',
                'description' => 'Fluffy golden pancakes served with maple syrup and fresh butter.',
                'price' => 7.99,
                'image' => 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80',
                'category' => 'Breakfast',
                'subCategory' => 'Pancakes',
            ],
            [
                'name' => 'Cheese Omelette',
                'description' => 'Soft three-egg omelette filled with melted cheese and herbs.',
                'price' => 6.75,
                'image' => 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=900&q=80',
                'category' => 'Breakfast',
                'subCategory' => 'Egg Dishes',
            ],
            [
                'name' => 'Avocado Toast',
                'description' => 'Toasted artisan bread topped with smashed avocado and cherry tomatoes.',
                'price' => 8.50,
                'image' => 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80',
                'category' => 'Breakfast',
                'subCategory' => 'Egg Dishes',
            ],
            [
                'name' => 'Breakfast Burrito',
                'description' => 'Warm tortilla filled with eggs, sausage, potatoes, and cheddar.',
                'price' => 9.25,
                'image' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
                'category' => 'Breakfast',
                'subCategory' => 'Egg Dishes',
            ],
            [
                'name' => 'Grilled Chicken Sandwich',
                'description' => 'Tender grilled chicken breast with lettuce, tomato, and garlic mayo.',
                'price' => 11.50,
                'image' => 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
                'category' => 'Lunch',
                'subCategory' => 'Chicken',
            ],
            [
                'name' => 'Creamy Alfredo Pasta',
                'description' => 'Rich Alfredo pasta tossed with parmesan and grilled chicken slices.',
                'price' => 12.99,
                'image' => 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=80',
                'category' => 'Lunch',
                'subCategory' => 'Pasta',
            ],
            [
                'name' => 'Crispy Chicken Wrap',
                'description' => 'Crispy chicken strips wrapped with lettuce, cheese, and spicy sauce.',
                'price' => 10.75,
                'image' => 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80',
                'category' => 'Lunch',
                'subCategory' => 'Chicken',
            ],
            [
                'name' => 'House Caesar Salad',
                'description' => 'Crisp romaine with parmesan, croutons, and creamy Caesar dressing.',
                'price' => 8.99,
                'image' => 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
                'category' => 'Lunch',
                'subCategory' => 'Salads',
            ],
            [
                'name' => 'Grilled Ribeye Steak',
                'description' => 'Juicy ribeye steak grilled to perfection and served with seasonal vegetables.',
                'price' => 21.99,
                'image' => 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
                'category' => 'Dinner',
                'subCategory' => 'Steaks',
            ],
            [
                'name' => 'Herb Roasted Salmon',
                'description' => 'Fresh salmon fillet roasted with herbs and finished with lemon butter.',
                'price' => 19.50,
                'image' => 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
                'category' => 'Dinner',
                'subCategory' => 'Seafood',
            ],
            [
                'name' => 'Chicken Parmesan',
                'description' => 'Breaded chicken breast topped with marinara and melted mozzarella.',
                'price' => 17.25,
                'image' => 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=900&q=80',
                'category' => 'Dinner',
                'subCategory' => 'Chicken',
            ],
            [
                'name' => 'Mixed Grill Platter',
                'description' => 'A hearty platter of grilled chicken, beef kofta, and roasted vegetables.',
                'price' => 22.50,
                'image' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
                'category' => 'Dinner',
                'subCategory' => 'Grills',
            ],
            [
                'name' => 'Chocolate Lava Cake',
                'description' => 'Warm chocolate lava cake with a rich molten center and light dusting of sugar.',
                'price' => 6.50,
                'image' => 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
                'category' => 'Desserts',
                'subCategory' => 'Cakes',
            ],
            [
                'name' => 'Strawberry Cheesecake',
                'description' => 'Creamy cheesecake topped with strawberry glaze and fresh berries.',
                'price' => 6.75,
                'image' => 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
                'category' => 'Desserts',
                'subCategory' => 'Cheesecake',
            ],
            [
                'name' => 'Classic Tiramisu',
                'description' => 'Italian-style tiramisu layered with coffee-soaked sponge and mascarpone.',
                'price' => 6.25,
                'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
                'category' => 'Desserts',
                'subCategory' => 'Tiramisu',
            ],
            [
                'name' => 'Vanilla Ice Cream Bowl',
                'description' => 'Creamy vanilla ice cream served with caramel drizzle and crunchy topping.',
                'price' => 4.99,
                'image' => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
                'category' => 'Desserts',
                'subCategory' => 'Ice Cream',
            ],
            [
                'name' => 'Fresh Lemonade',
                'description' => 'Chilled homemade lemonade with fresh mint and citrus slices.',
                'price' => 3.50,
                'image' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
                'category' => 'Drinks',
                'subCategory' => 'Refreshers',
            ],
            [
                'name' => 'Iced Coffee',
                'description' => 'Smooth cold coffee served over ice with a touch of cream.',
                'price' => 4.25,
                'image' => 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
                'category' => 'Drinks',
                'subCategory' => 'Coffee',
            ],
            [
                'name' => 'Berry Mojito',
                'description' => 'Refreshing berry mojito with lime, mint, and sparkling soda.',
                'price' => 4.75,
                'image' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
                'category' => 'Drinks',
                'subCategory' => 'Mocktails',
            ],
            [
                'name' => 'Chocolate Milkshake',
                'description' => 'Thick chocolate milkshake finished with whipped cream and cocoa drizzle.',
                'price' => 5.25,
                'image' => 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80',
                'category' => 'Drinks',
                'subCategory' => 'Milkshakes',
            ],
        ];
    }
}
