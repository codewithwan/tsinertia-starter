import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    return (
        <section className={`relative py-24 overflow-hidden ${className}`}>
            {/* Modern background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Neon scan lines */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
                backgroundSize: '100% 40px'
            }}></div>

            {/* Decorative neon lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center max-w-5xl mx-auto"
                >
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
                        The <span className="font-semibold">future</span> of business is{' '}
                        <span className="font-semibold">AI-powered</span> and{' '}
                        <span className="font-semibold">data-driven</span>
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
                            <span className="text-foreground">AI Leaders</span> / 2030
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
                        Every <span className="text-foreground font-medium">AI SaaS</span> you build today shapes{' '}
                        <span className="text-foreground font-medium">tomorrow's digital economy</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
