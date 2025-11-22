import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
// import { dashboard, register } from '@/routes';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section ref={sectionRef} className={`relative py-32 overflow-hidden ${className}`} style={{ zIndex: 1, marginTop: '-2rem' }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>
            
            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background pointer-events-none"></div>

            {/* Subtle grid pattern */}
            <motion.div 
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-[0.01]" 
            >
                <div style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                height: '150%'
            }}></div>
            </motion.div>

            {/* Subtle floating orbs */}
            <motion.div style={{ y: orb1Y }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></motion.div>
            <motion.div style={{ y: orb2Y }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/8 rounded-full blur-3xl"></motion.div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Main CTA Card - Clean & Elegant */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative"
                    >
                        {/* Subtle glow */}
                        <div className="absolute -inset-px bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 opacity-50 blur-xl rounded-3xl"></div>

                        {/* Card content */}
                        <div className="relative bg-background border border-foreground/10 rounded-3xl p-12 sm:p-16 text-center">
                            
                            {/* Clean Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-foreground/60"></div>
                                <span className="text-xs font-medium uppercase tracking-wider text-foreground/70">Coming Soon</span>
                            </motion.div>

                            {/* Heading - Clean & Bold */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                            >
                                Ready to Get Started?
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                            >
                                Join the waitlist and be the first to experience our cloud platform.
                                <br className="hidden sm:block" />
                                Simple, fast, and built for developers.
                            </motion.p>

                            {/* CTA Buttons - Clean Design */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
                            >
                                {auth.user ? (
                                    <Button size="lg" className="group relative px-10 py-6 text-base font-semibold" asChild>
                                        <Link href={'/dashboard'}>
                                            Go to Dashboard
                                            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" className="group relative px-10 py-6 text-base font-semibold" asChild>
                                            <Link href={'#'}>
                                                Join Waitlist
                                                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" className="px-10 py-6 text-base font-semibold border-foreground/20 hover:bg-foreground/5" asChild>
                                            <Link href={'#features'}>
                                                Learn More
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </motion.div>

                            {/* Simple divider */}
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="h-px w-16 bg-foreground/10"></div>
                                <div className="w-1 h-1 rounded-full bg-foreground/20"></div>
                                <div className="h-px w-16 bg-foreground/10"></div>
                            </div>

                            {/* Trust indicators - Minimal */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40"></div>
                                    <span>Free to Start</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40"></div>
                                    <span>No Credit Card</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/40"></div>
                                    <span>Cancel Anytime</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
