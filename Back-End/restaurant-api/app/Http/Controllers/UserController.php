<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::all()->map(function ($item) {
            $item->image = $this->resolveImageUrl($item->image);
            return $item;
        });

        return response()->json($users);
    }

    public function store(Request $request)
    {
        $authUser = Auth::user();

        if (! $authUser->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => ['required', Rule::in(['user', 'admin'])],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        $user->image = $this->resolveImageUrl($user->image);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function show($id)
    {
        $user = Auth::user();

        if (! $user->isAdmin() && $user->id != $id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userData = User::findOrFail($id);
        $userData->image = $this->resolveImageUrl($userData->image);

        return response()->json($userData);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if (! $user->isAdmin() && $user->id != $id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userToUpdate = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users')->ignore($userToUpdate->id),
            ],
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:6|confirmed',
            'image' => 'sometimes|image|max:2048',
            'role' => 'sometimes|in:user,admin',
            'remove_image' => 'sometimes|boolean',
        ]);

        $fields = ['name', 'email', 'phone', 'address', 'password'];
        foreach ($fields as $field) {
            if ($request->filled($field)) {
                if ($field === 'password') {
                    $userToUpdate->password = Hash::make($request->password);
                } else {
                    $userToUpdate->$field = $request->$field;
                }
            }
        }

        if ($user->isAdmin() && $request->filled('role')) {
            $userToUpdate->role = $request->role;
        }

        if ($request->boolean('remove_image') && $userToUpdate->image) {
            if (Storage::disk('public')->exists($userToUpdate->image)) {
                Storage::disk('public')->delete($userToUpdate->image);
            }

            $userToUpdate->image = null;
        }

        if ($request->hasFile('image')) {
            if ($userToUpdate->image && Storage::disk('public')->exists($userToUpdate->image)) {
                Storage::disk('public')->delete($userToUpdate->image);
            }

            $userToUpdate->image = $request->file('image')->store('avatars', 'public');
        }

        $userToUpdate->save();
        $userToUpdate->image = $this->resolveImageUrl($userToUpdate->image);

        return response()->json([
            'message' => 'Profile updated',
            'user' => $userToUpdate,
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $userToDelete = User::findOrFail($id);
        $userToDelete->delete();

        return response()->json(['message' => 'User deleted']);
    }

    private function resolveImageUrl(?string $path): ?string
    {
        if ($path && Storage::disk('public')->exists($path)) {
            return asset('storage/' . $path);
        }

        return null;
    }
}
