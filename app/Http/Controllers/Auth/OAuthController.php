<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Role;

class OAuthController extends Controller
{
    /**
     * Redirect to Google OAuth provider.
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            return $this->handleOAuthCallback($googleUser, 'google');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Failed to authenticate with Google.');
        }
    }

    /**
     * Redirect to GitHub OAuth provider.
     */
    public function redirectToGithub(): RedirectResponse
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Handle GitHub OAuth callback.
     */
    public function handleGithubCallback(): RedirectResponse
    {
        try {
            $githubUser = Socialite::driver('github')->user();
            
            return $this->handleOAuthCallback($githubUser, 'github');
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Failed to authenticate with GitHub.');
        }
    }

    /**
     * Handle OAuth callback for both providers.
     */
    private function handleOAuthCallback($socialUser, string $provider): RedirectResponse
    {
        // Check if user exists with this provider
        $user = User::where('provider', $provider)
            ->where('provider_id', $socialUser->getId())
            ->first();

        if ($user) {
            // User exists, log them in
            Auth::login($user, true);
            return redirect()->intended(route('dashboard', absolute: false));
        }

        // Check if user exists with same email (link accounts)
        $existingUser = User::where('email', $socialUser->getEmail())->first();

        if ($existingUser) {
            // Link OAuth account to existing user
            $existingUser->update([
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ]);

            Auth::login($existingUser, true);
            return redirect()->intended(route('dashboard', absolute: false));
        }

        // Create new user
        $user = User::create([
            'name' => $socialUser->getName() ?? $socialUser->getNickname() ?? 'User',
            'email' => $socialUser->getEmail(),
            'password' => null, // OAuth users don't need password
            'avatar' => $socialUser->getAvatar(),
            'provider' => $provider,
            'provider_id' => $socialUser->getId(),
            'email_verified_at' => now(), // OAuth emails are considered verified
        ]);

        // Assign default 'user' role
        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user->assignRole($userRole);

        Auth::login($user, true);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
