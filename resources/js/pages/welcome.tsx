import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import WelcomeTemplate from '@/components/welcome-template';
import {
    ArrowRight,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
// import { SiLaravel } from 'react-icons/si';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="TSInertia Starter">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
                <meta name="description" content="Laravel + React + TypeScript starter that just works" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900 relative overflow-hidden">

                {/* Header - Always stays */}
                <header className="relative backdrop-blur-xl bg-white/80 dark:bg-black/20 border-b border-slate-200/50 dark:border-gray-800/30 z-50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AppLogo />
                            </div>

                            <div className="flex items-center gap-4">
                                <AppearanceToggleDropdown />
                                {auth.user ? (
                                    <Button variant="outline" asChild className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400">
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild className="text-gray-300 hover:text-white hover:bg-white/10">
                                            <Link href={route('login')}>Login</Link>
                                        </Button>
                                        <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
                                            <Link href={route('register')}>
                                                Get Started
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Welcome Template Content - Easy to remove */}
                <main>
                    <WelcomeTemplate />
                </main>
            </div>
        </>
    );
}
