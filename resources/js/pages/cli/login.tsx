import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Terminal } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import AuthLayout from '@/layouts/auth-layout';

interface CliLoginProps {
    callback: string;
    errors?: {
        email?: string;
        password?: string;
        callback?: string;
    };
}

export default function CliLogin({ callback, errors: propErrors }: CliLoginProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        callback: callback,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('cli.login.submit'));
    };

    const allErrors = { ...propErrors, ...errors };

    return (
        <AuthLayout 
            title="CLI Authentication" 
            description="Login to authorize your CLI tool"
        >
            <Head title="CLI Login" />

            <div className="mb-6 rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
                <div className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Authorize CLI Access</p>
                        <p className="mt-1 text-xs opacity-90">
                            Enter your credentials to authorize your CLI tool. This will redirect back to your terminal.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
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
                        required
                    />
                    <InputError message={allErrors.email} className="animate-in fade-in-0 zoom-in-95" />
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
                        required
                    />
                    <InputError message={allErrors.password} className="animate-in fade-in-0 zoom-in-95" />
                </div>

                {allErrors.callback && (
                    <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30">
                        {allErrors.callback}
                    </div>
                )}

                <Button 
                    className="h-11 w-full transition-all duration-200 hover:shadow-md disabled:opacity-50 cursor-pointer" 
                    disabled={processing}
                    type="submit"
                >
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Authorize CLI
                </Button>
            </form>
        </AuthLayout>
    );
}

