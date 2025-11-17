import AppLogo from '@/components/app-logo';
import { motion } from 'framer-motion';

interface FooterSectionProps {
    className?: string;
}

export default function FooterSection({ className = '' }: FooterSectionProps) {
    return (
        <footer className={`relative overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '10px 10px'
            }}></div>

            {/* Top panel border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>

            <div className="container mx-auto px-6 py-16 relative">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Brand panel */}
                    <div className="text-center mb-12">
                        <div className="inline-block border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 mb-6">
                            <div className="flex items-center justify-center gap-3">
                                <AppLogo />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-black/70 max-w-md mx-auto uppercase tracking-wide">
                            Free Platform as a Service for developers
                        </p>
                    </div>

                    {/* Manga divider */}
                    <div className="flex items-center justify-center gap-4 my-12">
                        <div className="h-1 w-32 bg-black"></div>
                        <div className="w-3 h-3 bg-black transform rotate-45"></div>
                        <div className="h-1 w-32 bg-black"></div>
                    </div>

                    {/* Bottom section - rotated panels */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Copyright panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 border-3 border-black bg-white font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform md:-rotate-1"
                        >
                            © 2025 / ALL RIGHTS RESERVED
                        </motion.div>

                        {/* Links panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 transform md:rotate-1"
                        >
                            <a href="#" className="px-3 py-1 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Terms
                            </a>
                            <div className="w-px h-6 bg-black"></div>
                            <a href="#" className="px-3 py-1 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Privacy
                            </a>
                            <div className="w-px h-6 bg-black"></div>
                            <a href="#" className="px-3 py-1 border-2 border-black bg-white text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Cookies
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
