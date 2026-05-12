<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->isAdmin()) {
            $bookings = Booking::with('user')->orderBy('booking_date', 'desc')->get();
        } else {
            $bookings = $user->bookings()->orderBy('booking_date', 'desc')->get();
        }

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required',
            'guests' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        $booking = Booking::create([
            'user_id' => $user->id,
            'booking_date' => $validated['booking_date'],
            'booking_time' => $this->normalizeBookingTime($validated['booking_time']),
            'guests' => $validated['guests'],
            'status' => 'pending',
        ]);

        return response()->json($booking, 201);
    }

    public function show($id)
    {
        $booking = Booking::with('user')->findOrFail($id);
        $user = Auth::user();

        if ($user->isAdmin() || $booking->user_id == $user->id) {
            return response()->json($booking);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $user = Auth::user();

        if (! $user->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
        ]);

        $booking->status = $validated['status'];
        $booking->save();


        return response()->json($booking);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $user = Auth::user();

        if ($user->isAdmin() || $booking->user_id == $user->id) {
            $booking->delete();
            return response()->json(['message' => 'Booking deleted']);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    private function normalizeBookingTime(string $time): string
    {
        $formats = ['H:i:s', 'H:i', 'h:i A', 'g:i A'];

        foreach ($formats as $format) {
            try {
                return Carbon::createFromFormat($format, $time)->format('H:i:s');
            } catch (\Throwable $exception) {
            }
        }

        return Carbon::parse($time)->format('H:i:s');
    }
}
