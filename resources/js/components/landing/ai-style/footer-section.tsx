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
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }}></div>

            {/* Top neon line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="container mx-auto px-6 py-16 relative">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Brand */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <AppLogo />
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Cloud platform for developers. Reverse tunnel, static hosting, custom domain.
                        </p>
                    </div>

                    {/* Divider with dot */}
                    <div className="flex items-center justify-center gap-3 my-12">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-foreground/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40"></div>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-foreground/20"></div>
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                            © 2025 / All rights reserved
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                                Terms
                            </a>
                            <div className="w-px h-3 bg-foreground/20"></div>
                            <a href="#" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                                Privacy
                            </a>
                            <div className="w-px h-3 bg-foreground/20"></div>
                            <a href="#" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
                                Cookies
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
