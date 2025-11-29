import { Head } from '@inertiajs/react';
import { CheckCircle2, Terminal } from 'lucide-react';
import { useEffect } from 'react';

import AuthLayout from '@/layouts/auth-layout';

interface CliSuccessProps {
    message?: string;
    redirect_url?: string;
    autoClose?: boolean;
}

export default function CliSuccess({ message, redirect_url, autoClose = true }: CliSuccessProps) {
    useEffect(() => {
        // Redirect to callback URL if provided
        if (redirect_url) {
            // Wait a bit for user to see the success message, then redirect
            const timer = setTimeout(() => {
                window.location.href = redirect_url;
            }, 1500);

            return () => clearTimeout(timer);
        } else if (autoClose) {
            // Auto close after 3 seconds if no redirect URL
            const timer = setTimeout(() => {
                window.close();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [redirect_url, autoClose]);

    return (
        <AuthLayout 
            title="Authorization Successful" 
            description="You can close this window and return to your terminal"
        >
            <Head title="CLI Authorization Success" />

            <div className="space-y-6 flex flex-col items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Login Successful!</h2>
                        <p className="text-muted-foreground">
                            {message || 'You can close this window and return to your terminal.'}
                        </p>
                    </div>

                    <div className="mt-4 rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
                        <div className="flex items-start gap-2">
                            <Terminal className="mt-0.5 h-4 w-4 flex-shrink-0" />
                            <div className="text-left">
                                <p className="font-medium">CLI Authorization Complete</p>
                                <p className="mt-1 text-xs opacity-90">
                                    Your CLI tool has been successfully authorized. You can now use it from your terminal.
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </AuthLayout>
    );
}

