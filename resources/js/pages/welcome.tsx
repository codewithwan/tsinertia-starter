import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { ArrowRight } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { useState, useEffect } from 'react';
import {
    HeroSection,
    QuoteSection,
    FeaturesSection,
    ProductFeaturesSection,
    PlatformFeaturesSection,
    PricingSection,
    CTASection,
    FAQSection,
    FooterSection
} from '@/components/landing/ai-style';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        // Add smooth scroll behavior
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="AI SaaS Platform - Build Your AI Business">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800,900" rel="stylesheet" />
                <meta name="description" content="Complete AI SaaS platform template. Build, launch, and scale your AI-powered software business with our ready-to-use template." />
            </Head>

            <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
                {/* Futuristic Neon 2030 Background */}
                <div className="absolute inset-0">
                    {/* Base dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>

                    {/* Neon grid lines */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}></div>

                    {/* Scanning line effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-scan-line"></div>
                    </div>

                    {/* Subtle glow orbs - grayscale only */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[120px] animate-float-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-foreground/8 rounded-full blur-[120px] animate-float-slower"></div>
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-foreground/6 rounded-full blur-[120px] animate-float-medium"></div>

                    {/* Vignette overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
                </div>

                {/* Sticky Header with Floating Effect */}
                <header className="fixed top-0 z-50 w-full transition-all duration-500 ease-in-out">
                    <div className={`transition-all duration-500 ease-in-out ${
                        isScrolled
                            ? 'container mx-auto px-4 sm:px-6 pt-4'
                            : 'w-full px-4 sm:px-6'
                    }`}>
                        <div className={`transition-all duration-500 ease-in-out ${
                            isScrolled
                                ? 'max-w-4xl mx-auto rounded-full border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/5'
                                : 'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
                        }`}>
                            <nav className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
                                isScrolled ? 'px-6 py-3' : 'container mx-auto py-5 sm:py-6'
                            }`}>
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
                    </div>
                </header>

                {/* Spacer to prevent content jump */}
                <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'h-24' : 'h-0'}`}></div>

                {/* AI Style Welcome Page Sections */}
                <HeroSection />
                <QuoteSection />
                <FeaturesSection />
                <ProductFeaturesSection />
                <PlatformFeaturesSection />
                <PricingSection />
                <CTASection />
                <FAQSection />
                <FooterSection />
            </div>
        </>
    );
}