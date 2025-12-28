import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    return (
        <section className={`relative py-24 overflow-hidden ${className}`} style={{ zIndex: 10, marginTop: '-4rem' }}>
            {/* Modern background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/95 pointer-events-none"></div>

            {/* Neon scan lines */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
                    backgroundSize: '100% 40px',
                    height: '100%'
                }}></div>
            </div>

            {/* Decorative neon lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-5xl mx-auto relative z-20"
                >
                    {/* Premium Icon - Like Maintenance Page */}
                    <div className="relative mb-12 inline-block">
                        {/* Outer neon ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl animate-neon-pulse"></div>

                        {/* Glass circle */}
                        <div className="relative w-24 h-24 rounded-full bg-background/40 backdrop-blur-xl border border-primary/20 flex items-center justify-center shadow-2xl">
                            <Sparkles className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
                        </div>

                        {/* Corner accents - Stylized AI/Maintenance mode feel */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-full"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-full"></div>

                        {/* Orbiting particles */}
                        <div className="absolute inset-0 border border-primary/10 rounded-full animate-[spin_10s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full blur-[1px]"></div>
                        </div>
                    </div>

                    {/* Main quote */}
                    <blockquote className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight px-4">
                        Build apps with <span className="font-semibold">TypeScript</span>,{' '}
                        <span className="font-semibold">Inertia.js</span>, and{' '}
                        <span className="font-semibold italic text-primary">elegance</span>
                    </blockquote>

                    {/* Attribution */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/30"></div>
                        <cite className="text-sm text-muted-foreground font-mono not-italic uppercase tracking-wider">
                            <span className="text-foreground">tsinertia</span> / Starter Kit
                        </cite>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/30"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pb-20"
                    >
                        The <span className="text-foreground font-semibold">ultimate foundation</span> for your <span className="text-foreground font-semibold">next big idea</span>. We've combined the power of{' '}
                        <span className="text-foreground font-bold">Laravel 12+</span>, the speed of{' '}
                        <span className="text-foreground font-bold">Vite</span>, and the flexibility of{' '}
                        <span className="text-foreground font-bold">React 19</span> into a <span className="text-foreground font-semibold">seamless experience</span> for{' '}
                        <span className="text-foreground font-bold whitespace-nowrap">modern full-stack developers</span> who just want to ship.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
