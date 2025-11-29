import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { CheckCircle2, LoaderCircle, Terminal, RefreshCw } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CliAuthorizeProps {
    callback: string;
    user: {
        name: string;
        email: string;
        avatar?: string | null;
    };
}

export default function CliAuthorize({ callback, user }: CliAuthorizeProps) {
    const { post, processing, errors } = useForm({
        callback: callback || '',
    });
    const { props } = usePage();
    const [showPageExpired, setShowPageExpired] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    
    useEffect(() => {
        const handleError = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail?.status === 419 || customEvent.detail?.errors?.message?.includes('expired')) {
                setShowPageExpired(true);
            }
        };
        
        window.addEventListener('inertia:error', handleError);
        return () => window.removeEventListener('inertia:error', handleError);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (!callback) {
            console.error('Callback is missing');
            return;
        }

        if (isRetrying) {
            return;
        }

        setShowPageExpired(false);

        const performSubmit = () => {
            post(route('cli.authorize'), {
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = (page?.props as { flash?: { redirect_url?: string } })?.flash;
                    const redirectUrl = flash?.redirect_url;
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        const sessionRedirectUrl = (props as { flash?: { redirect_url?: string } }).flash?.redirect_url;
                        if (sessionRedirectUrl) {
                            window.location.href = sessionRedirectUrl;
                        }
                    }
                },
                onError: (errors) => {
                    const errorStatus = (errors as { status?: number }).status;
                    const errorMessage = (errors as { message?: string }).message || '';
                    
                    if (errorStatus === 419 || errorMessage.includes('expired') || errorMessage.includes('419')) {
                        setIsRetrying(true);
                        router.reload({
                            only: [],
                            onFinish: () => {
                                setIsRetrying(false);
                                setTimeout(() => {
                                    performSubmit();
                                }, 500);
                            },
                        });
                    } else {
                        console.error('Authorization errors:', errors);
                    }
                },
            });
        };

        performSubmit();
    };

    const handleRefresh = () => {
        router.reload({
            only: [],
            onSuccess: () => {
                setShowPageExpired(false);
            },
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AuthLayout 
            title="Authorize CLI Access" 
            description="Confirm authorization for your CLI tool"
        >
            <Head title="Authorize CLI" />

            <div className="mb-6 rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">
                <div className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                        <p className="font-medium">CLI Authorization Request</p>
                        <p className="mt-1 text-xs opacity-90">
                            A CLI tool is requesting access to your account. Click "Authorize" to continue.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar || undefined} alt={user.name} />
                            <AvatarFallback className="text-lg">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
                        <p className="font-medium mb-1">What this allows:</p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Access your IDLabs Cloud account via CLI</li>
                            <li>Manage tunnels and deployments</li>
                            <li>View and manage your resources</li>
                        </ul>
                    </div>

                    {showPageExpired && (
                        <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200">
                            <div className="flex items-start gap-2">
                                <RefreshCw className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium">Session Expired</p>
                                    <p className="mt-1 text-xs opacity-90">
                                        Your session has expired. Please refresh the page and try again.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={handleRefresh}
                                    >
                                        <RefreshCw className="mr-2 h-3 w-3" />
                                        Refresh Page
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {errors.callback && !showPageExpired && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/30 dark:text-red-200">
                            {errors.callback}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button 
                            type="button"
                            variant="outline"
                            className="flex-1"
                            asChild
                        >
                            <Link method="post" href={route('logout')} as="button">
                                Use Different Account
                            </Link>
                        </Button>
                        <Button 
                            className="flex-1 transition-all duration-200 hover:shadow-md disabled:opacity-50 cursor-pointer" 
                            disabled={processing}
                            type="submit"
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Authorize CLI
                        </Button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

