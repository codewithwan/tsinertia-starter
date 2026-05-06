import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    return (
        <section className={`relative overflow-hidden py-24 ${className}`} style={{ zIndex: 10, marginTop: '-4rem' }}>
            {/* Modern background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/95"></div>

            {/* Neon scan lines */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
                        backgroundSize: '100% 40px',
                        height: '100%',
                    }}
                ></div>
            </div>

            {/* Decorative neon lines */}
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="relative z-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 mx-auto max-w-5xl text-center"
                >
                    {/* Premium Icon - Like Maintenance Page */}
                    <div className="relative mb-12 inline-block">
                        {/* Outer neon ring */}
                        <div className="animate-neon-pulse absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-2xl"></div>

                        {/* Glass circle */}
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-background/40 shadow-2xl backdrop-blur-xl">
                            <Sparkles className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
                        </div>

                        {/* Corner accents - Stylized AI/Maintenance mode feel */}
                        <div className="absolute -top-2 -left-2 h-8 w-8 rounded-tl-full border-t-2 border-l-2 border-primary/30"></div>
                        <div className="absolute -right-2 -bottom-2 h-8 w-8 rounded-br-full border-r-2 border-b-2 border-primary/30"></div>

                        {/* Orbiting particles */}
                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border border-primary/10">
                            <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[1px]"></div>
                        </div>
                    </div>

                    {/* Main quote */}
                    <blockquote className="relative z-10 mb-8 px-4 text-3xl leading-tight font-light text-foreground sm:text-4xl md:text-5xl">
                        Build apps with <span className="font-semibold">TypeScript</span>, <span className="font-semibold">Inertia.js</span>, and{' '}
                        <span className="font-semibold text-primary italic">elegance</span>
                    </blockquote>

                    {/* Attribution */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mb-8 flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/30"></div>
                        <cite className="font-mono text-sm tracking-wider text-muted-foreground uppercase not-italic">
                            <span className="text-foreground">tsinertia</span> / Starter Kit
                        </cite>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/30"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-3xl pb-20 text-lg leading-relaxed text-muted-foreground sm:text-xl"
                    >
                        The <span className="font-semibold text-foreground">ultimate foundation</span> for your{' '}
                        <span className="font-semibold text-foreground">next big idea</span>. We've combined the power of{' '}
                        <span className="font-bold text-foreground">Laravel 12+</span>, the speed of{' '}
                        <span className="font-bold text-foreground">Vite</span>, and the flexibility of{' '}
                        <span className="font-bold text-foreground">React 19</span> into a{' '}
                        <span className="font-semibold text-foreground">seamless experience</span> for{' '}
                        <span className="font-bold whitespace-nowrap text-foreground">modern full-stack developers</span> who just want to ship.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
