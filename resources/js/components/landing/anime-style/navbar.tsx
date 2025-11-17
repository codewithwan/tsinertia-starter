import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* Manga-style Navbar */}
            <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? 'bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-white/95 backdrop-blur-sm border-b-2 border-black/20'
            }`}>
                <nav className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <AppLogo />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {['features', 'pricing', 'faq'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className="relative px-4 py-2 font-bold uppercase text-sm tracking-wider text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all"
                                >
                                    {section}
                                </button>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            {auth.user ? (
                                <Link href={'/dashboard'}>
                                    <div className="px-6 py-2 border-3 border-black bg-black text-white font-black uppercase text-sm tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                        DASHBOARD
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <Link href={'/login'}>
                                        <div className="px-6 py-2 font-bold uppercase text-sm tracking-wider text-black hover:underline decoration-2 underline-offset-4 transition-all">
                                            LOGIN
                                        </div>
                                    </Link>
                                    <Link href={'/register'}>
                                        <div className="px-6 py-2 border-3 border-black bg-black text-white font-black uppercase text-sm tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                                            GET STARTED
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" strokeWidth={3} />
                            ) : (
                                <Menu className="h-6 w-6" strokeWidth={3} />
                            )}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    {/* Menu Panel */}
                    <div className="absolute top-16 sm:top-20 right-0 left-0 bg-white border-b-4 border-black shadow-[0_6px_0px_0px_rgba(0,0,0,1)]">
                        {/* Halftone background */}
                        <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                            backgroundSize: '6px 6px'
                        }}></div>

                        <div className="relative container mx-auto px-4 py-6 space-y-4">
                            {/* Navigation Links */}
                            {['features', 'pricing', 'faq'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className="w-full text-left px-6 py-3 border-3 border-black bg-white hover:bg-black hover:text-white font-black uppercase text-sm tracking-wider transition-all"
                                >
                                    {section}
                                </button>
                            ))}

                            {/* Divider */}
                            <div className="h-[3px] bg-black"></div>

                            {/* Auth Buttons */}
                            {auth.user ? (
                                <Link href={'/dashboard'} className="block">
                                    <div className="w-full text-center px-6 py-3 border-3 border-black bg-black text-white font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                                        DASHBOARD
                                    </div>
                                </Link>
                            ) : (
                                <div className="space-y-3">
                                    <Link href={'/login'} className="block">
                                        <div className="w-full text-center px-6 py-3 border-3 border-black bg-white font-black uppercase text-sm tracking-wider">
                                            LOGIN
                                        </div>
                                    </Link>
                                    <Link href={'/register'} className="block">
                                        <div className="w-full text-center px-6 py-3 border-3 border-black bg-black text-white font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                                            GET STARTED
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
