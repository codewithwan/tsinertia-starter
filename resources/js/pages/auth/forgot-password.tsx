// Components
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type SharedData } from '@/types';

export default function ForgotPassword({ status }: { status?: string }) {
    const { isDemo } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isDemo) return;
        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && (
                <div className="mb-6 rounded-md bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-600 dark:bg-emerald-950/30">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                {isDemo && (
                    <Alert className="border-amber-500/50 bg-amber-500/10">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <AlertDescription className="text-amber-600 dark:text-amber-400">
                            Password reset is disabled in demo mode.
                        </AlertDescription>
                    </Alert>
                )}
                <form onSubmit={submit} className="animate-in fade-in-0 slide-in-from-bottom-1">
                    <div className="grid gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="h-11 transition-colors focus-visible:ring-2"
                                disabled={isDemo}
                            />
                            <InputError message={errors.email} className="animate-in fade-in-0 zoom-in-95" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50"
                            disabled={processing || isDemo}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Or, return to</span>
                    <TextLink href={route('login')} className="font-medium hover:underline">
                        log in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
