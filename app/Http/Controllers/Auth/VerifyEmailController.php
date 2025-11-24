<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified via link (legacy).
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $user */
            $user = $request->user();

            event(new Verified($user));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }

    /**
     * Verify email using OTP code.
     */
    public function verifyOtp(Request $request): RedirectResponse
    {
        $request->validate([
            'otp_code' => ['required', 'string', 'size:6'],
        ]);

        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }

        // Check if OTP exists and is valid
        if (!$user->otp_code || $user->otp_code !== $request->otp_code) {
            return back()->withErrors(['otp_code' => 'Invalid verification code.']);
        }

        // Check if OTP is expired
        if (!$user->otp_expires_at || $user->otp_expires_at->isPast()) {
            return back()->withErrors(['otp_code' => 'Verification code has expired. Please request a new one.']);
        }

        // Verify email
        if ($user->markEmailAsVerified()) {
            // Clear OTP
            $user->otp_code = null;
            $user->otp_expires_at = null;
            $user->save();

            event(new Verified($user));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }
}
