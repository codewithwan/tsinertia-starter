import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <AuthLayout title="Reset password" description="Create a new password for your account">
            <Head title="Reset password" />

            <div className="space-y-6">
                <form onSubmit={submit} className="animate-in fade-in-0 slide-in-from-bottom-1">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                className="h-11 transition-colors focus-visible:ring-2"
                                readOnly
                            />
                            <InputError message={errors.email} className="animate-in fade-in-0 zoom-in-95" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Create a new password"
                                className="h-11 transition-colors focus-visible:ring-2"
                            />
                            <InputError message={errors.password} className="animate-in fade-in-0 zoom-in-95" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-medium">
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm your new password"
                                className="h-11 transition-colors focus-visible:ring-2"
                            />
                            <InputError message={errors.password_confirmation} className="animate-in fade-in-0 zoom-in-95" />
                        </div>

                        <Button 
                            className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Reset password
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
