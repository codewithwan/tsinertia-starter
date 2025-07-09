import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import WelcomeTemplate from '@/components/welcome-template';
import {
    ArrowRight,
    // Terminal,
    TerminalIcon
} from 'lucide-react';
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

            <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">

                {/* Header - Always stays */}
                <header className="relative backdrop-blur-sm bg-white/90 dark:bg-black/90 border-b border-gray-200/50 dark:border-gray-800/50 z-50">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-9 w-9 rounded-xl bg-black dark:bg-white flex items-center justify-center">
                                    <TerminalIcon className="h-5 w-5 text-white dark:text-black" />
                                </div>
                                <div className='flex flex-col'>
                                    <span className="font-bold text-l text-gray-900 dark:text-white">TSInertia</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Starter</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <AppearanceToggleDropdown />
                                {auth.user ? (
                                    <Button variant="outline" asChild>
                                        <Link href={route('dashboard')}>
                                            Dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild>
                                            <Link href={route('login')}>Login</Link>
                                        </Button>
                                        <Button asChild>
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
