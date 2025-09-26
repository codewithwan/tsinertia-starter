import AppLogoIcon from '@/components/app-logo-icon';
import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Left Side - Branding */}
            <div className="relative hidden h-full flex-col bg-background p-10 text-foreground lg:flex">
                {/* Grid Pattern Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                
                {/* Logo */}
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogo />
                </Link>

                {/* Content */}
                <div className="relative z-20 mt-auto space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-foreground">
                            Build Your <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">AI-Powered</span> SaaS
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Launch and scale your AI-powered software business with our complete template. 
                            Ready to customize, deploy, and grow.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <AppLogoIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">AI Integration Ready</h3>
                                <p className="text-sm text-muted-foreground">Pre-configured AI model endpoints</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <AppLogoIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Complete User System</h3>
                                <p className="text-sm text-muted-foreground">Authentication, registration, and management</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <AppLogoIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Payment Integration</h3>
                                <p className="text-sm text-muted-foreground">Stripe integration for subscriptions</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <AppLogoIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Admin Dashboard</h3>
                                <p className="text-sm text-muted-foreground">Complete business management panel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    {/* Mobile Logo */}
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogo />
                    </Link>
                    
                    {/* Auth Card */}
                    <div className="rounded-xl border bg-card p-8 shadow-lg transition-all duration-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/30">
                        <div className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-sm text-balance text-muted-foreground">{description}</p>
                        </div>
                        <div className="mt-6">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}