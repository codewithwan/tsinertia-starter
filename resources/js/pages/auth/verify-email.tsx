// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { route } from 'ziggy-js';

export default function VerifyEmail({ status }: { status?: string }) {
    const [showOtpForm, setShowOtpForm] = useState(status === 'verification-otp-sent');
    
    const sendOtpForm = useForm({});
    const verifyOtpForm = useForm({
        otp_code: '',
    });

    const sendOtp: FormEventHandler = (e) => {
        e.preventDefault();
        sendOtpForm.post(route('verification.send'), {
            onSuccess: () => {
                setShowOtpForm(true);
            },
        });
    };

    const verifyOtp: FormEventHandler = (e) => {
        e.preventDefault();
        // Remove any dashes before submitting (OTP should be 6 digits only)
        const cleanOtp = verifyOtpForm.data.otp_code.replace(/-/g, '');
        verifyOtpForm.setData('otp_code', cleanOtp);
        verifyOtpForm.post(route('verification.verify.otp'));
    };

    return (
        <AuthLayout 
            title="Email verification" 
            description={showOtpForm 
                ? "Enter the 6-digit verification code we sent to your email address." 
                : "Thanks for signing up! Before getting started, please verify your email address by entering the code we'll send to you."
            }
        >
            <Head title="Email verification" />

            {status === 'verification-otp-sent' && (
                <div className="mb-6 rounded-md bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-600 dark:bg-emerald-950/30">
                    A verification code has been sent to your email address. Please check your inbox.
                </div>
            )}

            <div className="space-y-6">
                {!showOtpForm ? (
                    <form onSubmit={sendOtp} className="animate-in fade-in-0 slide-in-from-bottom-1">
                        <Button 
                            className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50" 
                            disabled={sendOtpForm.processing}
                        >
                            {sendOtpForm.processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Send verification code
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={verifyOtp} className="animate-in fade-in-0 slide-in-from-bottom-1 space-y-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-center block">
                                    Verification Code
                                </Label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        value={verifyOtpForm.data.otp_code.replace(/-/g, '')}
                                        onChange={(value) => {
                                            // Store without dashes internally
                                            verifyOtpForm.setData('otp_code', value);
                                        }}
                                        containerClassName="gap-0"
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} className="h-12 w-12 text-lg font-semibold" />
                                            <InputOTPSlot index={1} className="h-12 w-12 text-lg font-semibold" />
                                            <InputOTPSlot index={2} className="h-12 w-12 text-lg font-semibold" />
                                        </InputOTPGroup>
                                        <InputOTPSeparator className="mx-3" />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} className="h-12 w-12 text-lg font-semibold" />
                                            <InputOTPSlot index={4} className="h-12 w-12 text-lg font-semibold" />
                                            <InputOTPSlot index={5} className="h-12 w-12 text-lg font-semibold" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <InputError message={verifyOtpForm.errors.otp_code} className="animate-in fade-in-0 zoom-in-95 text-center" />
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter the 6-digit code sent to your email
                                </p>
                            </div>
                        </div>

                        <Button 
                            className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50" 
                            disabled={verifyOtpForm.processing}
                        >
                            {verifyOtpForm.processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Verify Email
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowOtpForm(false);
                                    verifyOtpForm.setData('otp_code', '');
                                }}
                                className="text-sm text-muted-foreground hover:text-foreground underline"
                            >
                                Resend code
                            </button>
                        </div>
                    </form>
                )}

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <TextLink 
                        href={route('logout')} 
                        method="post" 
                        as="button"
                        className="font-medium hover:underline"
                    >
                        Log out
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
