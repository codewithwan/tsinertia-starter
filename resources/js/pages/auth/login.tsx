import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';
import DemoAccounts from '@/components/demo-accounts';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleSelectAccount = (email: string, password: string) => {
        setData((prev) => ({
            ...prev,
            email,
            password,
        }));
    };

    return (
        <AuthLayout title="Welcome back" description="Enter your email to sign in to your account">
            <Head title="Log in" />

            {status && (
                <div className="mb-6 rounded-md bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-600 dark:bg-emerald-950/30">
                    {status}
                </div>
            )}

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
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="h-11 transition-colors focus-visible:ring-2"
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="h-11 transition-colors focus-visible:ring-2"
                            />
                            <InputError message={errors.password} className="animate-in fade-in-0 zoom-in-95" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked === true)}
                                />
                                <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Remember me
                                </Label>
                            </div>

                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-sm font-medium hover:underline">
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>

                        <Button 
                            className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50 cursor-pointer" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Log in
                        </Button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <DemoAccounts onSelectAccount={handleSelectAccount} />

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>Don't have an account?</span>
                    <TextLink href={route('register')} className="font-medium hover:underline">
                        Sign up
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
