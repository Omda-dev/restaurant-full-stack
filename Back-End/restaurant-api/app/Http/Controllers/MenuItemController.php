<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class MenuItemController extends Controller
{
    public function index()
    {
        $menuItems = MenuItem::with(['category', 'subcategory'])->get();

        return response()->json(
            $menuItems->map(fn (MenuItem $menuItem) => $this->formatMenuItem($menuItem))
        );
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['subcategory_id'] = $this->resolveSubcategoryId(
            $request,
            (int) $validated['category_id'],
            true
        );

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('menu_images', 'public');
            $validated['image'] = $imagePath;
        }

        $menuItem = MenuItem::create($validated)->load(['category', 'subcategory']);

        return response()->json($this->formatMenuItem($menuItem), 201);
    }

    public function show($id)
    {
        $menuItem = MenuItem::with(['category', 'subcategory'])->findOrFail($id);

        return response()->json($this->formatMenuItem($menuItem));
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $menuItem = MenuItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'sometimes|required|exists:categories,id',
        ]);

        $categoryId = (int) ($validated['category_id'] ?? $menuItem->category_id);

        if ($request->hasAny(['subcategory_id', 'subcategory', 'subCategory']) || array_key_exists('category_id', $validated)) {
            $validated['subcategory_id'] = $this->resolveSubcategoryId(
                $request,
                $categoryId,
                true,
                $menuItem->subcategory_id
            );
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('menu_images', 'public');
            $validated['image'] = $imagePath;
        }

        $menuItem->update($validated);
        $menuItem->load(['category', 'subcategory']);

        return response()->json([
            'message' => 'Menu item updated successfully',
            'item' => $this->formatMenuItem($menuItem),
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return response()->json(['message' => 'Menu item deleted']);
    }

    private function resolveSubcategoryId(
        Request $request,
        int $categoryId,
        bool $required = true,
        ?int $currentSubcategoryId = null
    ): ?int {
        $subcategoryId = $request->input('subcategory_id');

        if ($subcategoryId !== null && $subcategoryId !== '') {
            $subcategory = Subcategory::where('id', $subcategoryId)
                ->where('category_id', $categoryId)
                ->first();

            if (! $subcategory) {
                throw ValidationException::withMessages([
                    'subcategory_id' => 'The selected subcategory does not belong to the selected category.',
                ]);
            }

            return $subcategory->id;
        }

        $subcategoryName = trim((string) ($request->input('subCategory') ?? $request->input('subcategory') ?? ''));

        if ($subcategoryName !== '') {
            return Subcategory::firstOrCreate([
                'category_id' => $categoryId,
                'name' => $subcategoryName,
            ])->id;
        }

        if ($currentSubcategoryId) {
            $currentSubcategory = Subcategory::where('id', $currentSubcategoryId)
                ->where('category_id', $categoryId)
                ->first();

            if ($currentSubcategory) {
                return $currentSubcategory->id;
            }
        }

        if ($required) {
            throw ValidationException::withMessages([
                'subCategory' => 'The subcategory field is required.',
            ]);
        }

        return null;
    }

    private function formatMenuItem(MenuItem $menuItem): array
    {
        $category = $menuItem->category;
        $subcategory = $menuItem->subcategory;

        return [
            'id' => $menuItem->id,
            'name' => $menuItem->name,
            'description' => $menuItem->description,
            'price' => $menuItem->price,
            'image' => $menuItem->image,
            'category_id' => $menuItem->category_id,
            'subcategory_id' => $menuItem->subcategory_id,
            'category' => $category ? [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ] : null,
            'subcategory' => $subcategory ? [
                'id' => $subcategory->id,
                'name' => $subcategory->name,
                'category_id' => $subcategory->category_id,
            ] : null,
            'subCategory' => $subcategory ? [
                'id' => $subcategory->id,
                'name' => $subcategory->name,
                'category_id' => $subcategory->category_id,
            ] : null,
            'created_at' => $menuItem->created_at,
            'updated_at' => $menuItem->updated_at,
        ];
    }
}
