<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CliController extends Controller
{
    public function showLogin(Request $request): Response
    {
        $callback = $request->query('callback');

        if (!$callback) {
            abort(400, 'Missing callback parameter');
        }

        $parsed = parse_url($callback);
        if (!$parsed || !in_array($parsed['host'] ?? '', ['127.0.0.1', 'localhost', '::1'])) {
            abort(400, 'Invalid callback URL. Must be localhost.');
        }

        if (Auth::check()) {
            $user = Auth::user();
            return Inertia::render('cli/authorize', [
                'callback' => $callback,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                ],
            ]);
        }

        return Inertia::render('cli/login', [
            'callback' => $callback,
        ]);
    }

    public function authorize(Request $request)
    {
        $request->validate([
            'callback' => 'required|url',
        ]);

        if (!Auth::check()) {
            return redirect()->route('cli.login', ['callback' => $request->input('callback')]);
        }

        $callback = $request->input('callback');
        
        $parsed = parse_url($callback);
        if (!$parsed || !in_array($parsed['host'] ?? '', ['127.0.0.1', 'localhost', '::1'])) {
            return back()->withErrors(['callback' => 'Invalid callback URL']);
        }

        $user = Auth::user();

        $code = Str::random(32);
        
        Cache::put("cli_code:{$code}", [
            'user_id' => $user->id,
            'email' => $user->email,
        ], now()->addMinutes(5));

        $encryptedCode = Crypt::encryptString($code);

        $redirectUrl = $callback . '?code=' . urlencode($encryptedCode);

        if ($request->header('X-Inertia')) {
            return back()->with('redirect_url', $redirectUrl);
        }

        return redirect($redirectUrl);
    }

    public function handleLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'callback' => 'required|url',
        ]);

        $callback = $request->input('callback');
        
        $parsed = parse_url($callback);
        if (!$parsed || !in_array($parsed['host'] ?? '', ['127.0.0.1', 'localhost', '::1'])) {
            return back()->withErrors(['callback' => 'Invalid callback URL']);
        }

        $credentials = $request->only('email', 'password');
        
        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        $user = Auth::user();

        $code = Str::random(32);
        
        Cache::put("cli_code:{$code}", [
            'user_id' => $user->id,
            'email' => $user->email,
        ], now()->addMinutes(5));

        $encryptedCode = Crypt::encryptString($code);

        $redirectUrl = $callback . '?code=' . urlencode($encryptedCode);

        if ($request->header('X-Inertia')) {
            return back()->with('redirect_url', $redirectUrl);
        }

        return redirect($redirectUrl);
    }

    public function exchangeCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        try {
            $code = Crypt::decryptString($request->input('code'));
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Invalid or expired authorization code',
            ], 400);
        }

        $data = Cache::get("cli_code:{$code}");
        
        if (!$data) {
            return response()->json([
                'error' => 'Authorization code expired or invalid',
            ], 400);
        }

        Cache::forget("cli_code:{$code}");

        $user = User::find($data['user_id']);
        
        if (!$user) {
            return response()->json([
                'error' => 'User not found',
            ], 404);
        }

        $token = hash('sha256', $user->id . ':' . $user->email . ':' . now()->timestamp . ':' . Str::random(32));
        
        Cache::put("cli_token:{$token}", [
            'user_id' => $user->id,
            'email' => $user->email,
            'created_at' => now()->toIso8601String(),
        ], now()->addYear());

        return response()->json([
            'token' => $token,
            'email' => $user->email,
        ]);
    }

    public function successPage(Request $request)
    {
        return Inertia::render('cli/success', [
            'message' => 'You can close this window and return to your terminal.',
            'redirect_url' => null,
            'autoClose' => true,
        ]);
    }
}

