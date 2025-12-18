import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Code2, Layers, Shield, Zap } from 'lucide-react';

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
                            Modern Full-Stack <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Starter Kit</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            TypeScript, Laravel, React, and Inertia.js pre-configured with authentication, admin panel, and beautiful UI components.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Code2 className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">TypeScript First</h3>
                                <p className="text-sm text-muted-foreground">Full type safety across the stack</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Layers className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Modern Stack</h3>
                                <p className="text-sm text-muted-foreground">Laravel 12, React 19, Inertia.js 2.0</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Shield className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Complete Auth</h3>
                                <p className="text-sm text-muted-foreground">Login, register, and OAuth ready</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <Zap className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">UI Components</h3>
                                <p className="text-sm text-muted-foreground">50+ components with dark mode</p>
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