import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1.05, 1, 0.9]);

    return (
        <section ref={sectionRef} className={`relative py-24 overflow-hidden ${className}`} style={{ zIndex: 10, marginTop: '-4rem' }}>
            {/* Modern background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/95 pointer-events-none"></div>

            {/* Neon scan lines */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                className="absolute inset-0 opacity-[0.02]"
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
                    backgroundSize: '100% 40px',
                    height: '100%'
                }}></div>
            </motion.div>

            {/* Decorative neon lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-20">
                <motion.div style={{ y, opacity, scale }} className="text-center max-w-5xl mx-auto relative z-20">
                    {/* Premium Icon - Like Maintenance Page */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center mb-8"
                    >
                        <div className="relative">
                            {/* Outer neon ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-2xl animate-neon-pulse"></div>

                            {/* Glass circle */}
                            <div className="relative w-20 h-20 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                                <Sparkles className="h-9 w-9 text-foreground/60" strokeWidth={1.5} />
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 w-7 h-7 border-t-2 border-l-2 border-foreground/20 rounded-tl-full"></div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-2 border-r-2 border-foreground/20 rounded-br-full"></div>
                        </div>
                    </motion.div>

                    {/* Main quote */}
                    <blockquote className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight px-4">
                        Build apps with <span className="font-semibold">TypeScript</span>,{' '}
                        <span className="font-semibold">Inertia.js</span>, and{' '}
                        <span className="font-semibold">elegance</span>
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

                    {/* Sub quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Simple, fast, and production-ready stack for{' '}
                        <span className="text-foreground font-medium">full-stack developers</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
