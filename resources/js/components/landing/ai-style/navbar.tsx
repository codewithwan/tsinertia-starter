import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

export default function Navbar() {
    const { auth } = usePage<SharedData>().props;
    const page = usePage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
    const resourcesDropdownRef = useRef<HTMLDivElement>(null);
    const { appearance, updateAppearance } = useAppearance();
    const isDarkMode = appearance === 'dark' || (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const nonLandingPaths = ['/changelog', '/docs', '/dashboard', '/login', '/register'];
    const isChangelogPage = page.url.startsWith('/changelog');
    const isLandingPage = page.url === '/' || !nonLandingPaths.some(path => page.url.startsWith(path));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target as Node)) {
                setIsResourcesDropdownOpen(false);
            }
        };

        if (isResourcesDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isResourcesDropdownOpen]);

    const toggleDarkMode = () => {
        if (appearance === 'system') {
            updateAppearance('light');
        } else if (appearance === 'light') {
            updateAppearance('dark');
        } else {
            updateAppearance('system');
        }
    };

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

    const resourcesMenuItems = [
        { label: 'Changelog', href: '/changelog' },
        { label: 'Docs', href: '/docs' },
    ];

    return (
        <>
            <header className={`fixed z-[100] w-full transition-all duration-500 ${isScrolled
                ? 'top-4'
                : 'top-0'
                }`}>
                <nav className={`mx-auto transition-all duration-500 ${isScrolled
                    ? 'max-w-4xl px-4 sm:px-6'
                    : 'container px-4 sm:px-6'
                    }`}>
                    <div className={`transition-all duration-500 ${isScrolled
                        ? 'bg-background/80 backdrop-blur-2xl border border-border/40 shadow-2xl shadow-primary/10 rounded-2xl'
                        : 'bg-background/80 backdrop-blur-md border-b border-border/20'
                        }`}>
                        <div className={`flex items-center justify-between transition-all duration-500 px-4 sm:px-6 ${isScrolled ? 'h-14' : 'h-16 sm:h-20'
                            }`}>
                            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                                <AppLogo />
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                {!isChangelogPage && ['features', 'pricing', 'faq'].map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => scrollToSection(section)}
                                        className={`relative font-semibold text-sm tracking-wide text-muted-foreground hover:text-foreground transition-all capitalize ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                                            }`}
                                    >
                                        {section}
                                    </button>
                                ))}

                                {isLandingPage ? (
                                    <div className="relative" ref={resourcesDropdownRef}>
                                        <button
                                            onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
                                            className={`relative font-semibold text-sm tracking-wide text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                                                } ${isResourcesDropdownOpen ? 'text-foreground' : ''}`}
                                        >
                                            Resources
                                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isResourcesDropdownOpen ? 'rotate-180' : ''
                                                }`} />
                                        </button>

                                        <div className={`absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-out ${isResourcesDropdownOpen
                                            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                                            : 'opacity-0 -translate-y-2 pointer-events-none scale-95'
                                            }`}>
                                            <div className="py-1">
                                                {resourcesMenuItems.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setIsResourcesDropdownOpen(false)}
                                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    resourcesMenuItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`relative font-semibold text-sm tracking-wide text-muted-foreground hover:text-foreground transition-all ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'
                                                } ${page.url.startsWith(item.href) ? 'text-foreground' : ''}`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))
                                )}
                            </div>

                            <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'gap-2' : 'gap-3'
                                }`}>
                                <button
                                    onClick={toggleDarkMode}
                                    className={`rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all ${isScrolled ? 'p-2' : 'p-2.5'
                                        }`}
                                    aria-label="Toggle dark mode"
                                >
                                    {isDarkMode ? (
                                        <Sun className={`text-foreground ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                                    ) : (
                                        <Moon className={`text-foreground ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                                    )}
                                </button>

                                {auth.user ? (
                                    <Link href={'/dashboard'}>
                                        <div className={`bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 ${isScrolled ? 'px-4 py-1.5' : 'px-6 py-2.5'
                                            }`}>
                                            Dashboard
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={'/login'}>
                                            <div className={`font-semibold text-sm text-muted-foreground hover:text-foreground transition-all ${isScrolled ? 'px-3 py-1.5' : 'px-6 py-2.5'
                                                }`}>
                                                Login
                                            </div>
                                        </Link>
                                        <Link href={'/register'}>
                                            <div className={`bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 ${isScrolled ? 'px-4 py-1.5' : 'px-6 py-2.5'
                                                }`}>
                                                Get Started
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="md:hidden flex items-center gap-2">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-all"
                                    aria-label="Toggle dark mode"
                                >
                                    {isDarkMode ? (
                                        <Sun className="h-5 w-5 text-foreground" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-foreground" />
                                    )}
                                </button>

                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[90] md:hidden">
                    <div
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    <div className={`absolute right-4 left-4 bg-background/95 backdrop-blur-xl border border-border/40 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ${isScrolled ? 'top-20' : 'top-20'
                        }`}>
                        <div className="relative px-4 py-6 space-y-3">
                            {!isChangelogPage && ['features', 'pricing', 'faq'].map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className="w-full text-left px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg font-semibold text-sm capitalize transition-colors"
                                >
                                    {section}
                                </button>
                            ))}

                            {resourcesMenuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full text-left px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg font-semibold text-sm transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="h-px bg-border/40 my-4"></div>

                            {auth.user ? (
                                <Link href={'/dashboard'} className="block">
                                    <div className="w-full text-center px-4 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-lg shadow-primary/25">
                                        Dashboard
                                    </div>
                                </Link>
                            ) : (
                                <div className="space-y-3">
                                    <Link href={'/login'} className="block">
                                        <div className="w-full text-center px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-lg font-semibold text-sm transition-colors">
                                            Login
                                        </div>
                                    </Link>
                                    <Link href={'/register'} className="block">
                                        <div className="w-full text-center px-4 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg shadow-lg shadow-primary/25">
                                            Get Started
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
