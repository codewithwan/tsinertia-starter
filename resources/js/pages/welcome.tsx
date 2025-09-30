import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { ArrowRight } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    TeamSection,
    QuoteSection,
    CtaSection,
    FooterSection,
} from '@/components/landing/nutantra';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Nutantra - AI-Powered Nutrition Tracker">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="Track your nutrition with AI precision. Nutantra uses AI Vision to identify food and calculate nutrition automatically. Start your healthy journey today!" />
            </Head>

            <div className="min-h-screen bg-background text-foreground relative">

                {/* Sticky Header */}
                <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
                        <nav className="flex items-center justify-between">
                            {/* Logo - Always visible */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <AppLogo />
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden sm:flex items-center gap-4">
                                <AppearanceToggleDropdown />
                                {auth.user ? (
                                    <Button variant="outline" asChild className="shadow-sm">
                                        <Link href={'/dashboard'}>
                                            Dashboard
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" asChild>
                                            <Link href={'/login'}>Login</Link>
                                        </Button>
                                        <Button asChild className="shadow-lg">
                                            <Link href={'/register'}>
                                                Get Started
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Navigation */}
                            <div className="flex sm:hidden items-center gap-2">
                                <AppearanceToggleDropdown />
                                {auth.user ? (
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href={'/dashboard'}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button size="sm" asChild>
                                        <Link href={'/register'}>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Nutantra Landing Page Sections */}
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <TeamSection />
                <QuoteSection />
                <CtaSection />
                <FooterSection />
            </div>
        </>
    );
}