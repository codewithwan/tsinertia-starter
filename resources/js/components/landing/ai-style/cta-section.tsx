import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Play, Rocket, Sparkles } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
// import { dashboard, register } from '@/routes';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className={`relative py-32 overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Hexagonal pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 25L100 75L50 100L0 75L0 25Z' fill='none' stroke='currentColor' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
            }}></div>

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/8 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/12 rounded-full blur-3xl animate-float-slower"></div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Main CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-foreground/20 via-foreground/30 to-foreground/20 opacity-20 blur-2xl"></div>

                        {/* Card content */}
                        <div className="relative bg-background/95 backdrop-blur-sm border border-foreground/10 rounded-3xl p-8 sm:p-12 text-center">
                            {/* PREMIUM ICON - LIKE MAINTENANCE PAGE */}
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
                                    <div className="relative w-24 h-24 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                                        <Sparkles className="h-11 w-11 text-foreground/60" strokeWidth={1.5} />
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-foreground/20 rounded-tl-full"></div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-foreground/20 rounded-br-full"></div>
                                </div>
                            </motion.div>

                            {/* Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                            >
                                Ready to Deploy Your
                                <br />
                                <span className="text-foreground/90">
                                    Next Project?
                                </span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                            >
                                Join developers building and deploying applications for free.
                                Start your journey today with our free platform.
                            </motion.p>

                            {/* Hashtag */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8"
                            >
                                <span className="text-sm font-mono font-bold text-foreground">#freepaas</span>
                                <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse"></div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                {auth.user ? (
                                    <Button size="lg" className="group relative overflow-hidden px-10 py-7 text-lg shadow-lg shadow-primary/25" asChild>
                                        <Link href={'/dashboard'}>
                                            <Rocket className="h-5 w-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                                            Go to Dashboard
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button size="lg" className="group relative overflow-hidden px-10 py-7 text-lg shadow-lg shadow-primary/25" asChild>
                                            <Link href={'/register'}>
                                                <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                                                Get Started Free
                                            </Link>
                                        </Button>
                                        <Button size="lg" variant="outline" className="px-10 py-7 text-lg border-primary/20" asChild>
                                            <Link href={'/login'}>
                                                View Demo
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </motion.div>

                            {/* Trust indicators */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-foreground/40"></div>
                                    <span>Production Ready</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-foreground/60"></div>
                                    <span>Full Documentation</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-foreground/80"></div>
                                    <span>Regular Updates</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
