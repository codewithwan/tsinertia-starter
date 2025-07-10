// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Email verification" description="Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-6 rounded-md bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-600 dark:bg-emerald-950/30">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <div className="space-y-6">
                <form onSubmit={submit} className="animate-in fade-in-0 slide-in-from-bottom-1">
                    <Button 
                        className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50" 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Resend verification email
                    </Button>
                </form>

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
