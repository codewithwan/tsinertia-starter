import AppLogo from '@/components/app-logo';
import { motion } from 'framer-motion';

interface FooterSectionProps {
    className?: string;
}

export default function FooterSection({ className = '' }: FooterSectionProps) {
    return (
        <footer className={`relative overflow-hidden ${className}`}>
            {/* Neon grid background */}
            <div className="absolute inset-0 bg-background"></div>
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            ></div>

            {/* Top neon line */}
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="relative container mx-auto px-6 py-16">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-4xl"
                >
                    {/* Brand */}
                    <div className="mb-12 text-center">
                        <div className="mb-4 flex items-center justify-center gap-3">
                            <AppLogo />
                        </div>
                        <p className="mx-auto max-w-md text-sm text-muted-foreground">
                            The <span className="font-semibold text-foreground">ultimate Laravel & React starter kit</span> with premium components
                            and <span className="font-semibold text-foreground">best-in-class developer experience</span>.
                        </p>
                    </div>

                    {/* Divider with dot */}
                    <div className="my-12 flex items-center justify-center gap-3">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-foreground/20"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground/40"></div>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-foreground/20"></div>
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                            © {new Date().getFullYear()} / All rights reserved
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                                Terms
                            </a>
                            <div className="h-3 w-px bg-foreground/20"></div>
                            <a
                                href="#"
                                className="font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                                Privacy
                            </a>
                            <div className="h-3 w-px bg-foreground/20"></div>
                            <a
                                href="#"
                                className="font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
