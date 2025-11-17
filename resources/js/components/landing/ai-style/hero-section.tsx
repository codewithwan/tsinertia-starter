import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronDown, ArrowRight, Code2, Brain, Layers } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';
// import { dashboard, register } from '@/routes';
import AnimatedCounter from './animated-counter';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const { auth } = usePage<SharedData>().props;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0], {
        clamp: false
    });
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.98, 0.96], {
        clamp: false
    });

    return (
        <main id="home" ref={containerRef} className={`relative flex items-center justify-center min-h-[calc(100vh-80px)] py-20 overflow-hidden ${className}`}>
            {/* Futuristic Background */}
            <div className="absolute inset-0">
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>

                {/* Gradient lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(var(--primary), 0.05) 25%, rgba(var(--primary), 0.05) 26%, transparent 27%, transparent 74%, rgba(var(--primary), 0.05) 75%, rgba(var(--primary), 0.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Diagonal Lines - Top Left - Adjusted to avoid navbar */}
            <motion.div
                className="absolute top-20 left-0 w-1/3 h-1/3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-20 left-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45"></div>
                <div className="absolute top-32 left-10 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45"></div>
                <div className="absolute top-10 left-32 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent rotate-45"></div>
            </motion.div>

            {/* Diagonal Lines - Top Right - Adjusted to avoid navbar */}
            <motion.div
                className="absolute top-20 right-0 w-1/3 h-1/3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="absolute top-20 right-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -rotate-45"></div>
                <div className="absolute top-32 right-10 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-45"></div>
                <div className="absolute top-10 right-32 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent -rotate-45"></div>
            </motion.div>

            {/* Corner Accents - Adjusted position to avoid navbar */}
            <motion.div
                className="absolute top-24 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
                className="absolute top-24 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            />
            <motion.div
                className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
            />

            {/* Floating Elements - Left Side - PREMIUM DESIGN */}
            <motion.div
                className="absolute left-[10%] top-1/4 hidden lg:block"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    {/* Outer neon ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>

                    {/* Glass circle */}
                    <div className="relative w-20 h-20 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                        <Brain className="w-9 h-9 text-foreground/60" strokeWidth={1.5} />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-foreground/20 rounded-tl-2xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-foreground/20 rounded-br-2xl"></div>
                </div>
            </motion.div>

            {/* Floating Elements - Right Side - PREMIUM DESIGN */}
            <motion.div
                className="absolute right-[10%] top-1/3 hidden lg:block"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    {/* Outer neon ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>

                    {/* Glass circle */}
                    <div className="relative w-20 h-20 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                        <Code2 className="w-9 h-9 text-foreground/60" strokeWidth={1.5} />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-foreground/20 rounded-tr-2xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-foreground/20 rounded-bl-2xl"></div>
                </div>
            </motion.div>

            {/* Bottom Floating Element - PREMIUM DESIGN */}
            <motion.div
                className="absolute left-[15%] bottom-1/4 hidden lg:block"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    {/* Outer neon ring */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>

                    {/* Glass circle */}
                    <div className="relative w-20 h-20 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                        <Layers className="w-9 h-9 text-foreground/60" strokeWidth={1.5} />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-foreground/20 rounded-tl-2xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-foreground/20 rounded-br-2xl"></div>
                </div>
            </motion.div>

            <motion.div
                className="text-center max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
                style={{ 
                    opacity, 
                    scale,
                    willChange: 'opacity, transform'
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-6 mt-4"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
                        <div className="relative px-4 py-1.5 border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-medium uppercase tracking-wider">Free PaaS for Dev</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Title - Stacked */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8 space-y-1 sm:space-y-2"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <div className="relative inline-block">
                            <span className="block text-foreground">Free</span>
                        </div>
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <div className="relative inline-block">
                            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Platform
                            </span>
                            <motion.div
                                className="absolute -inset-2 bg-primary/5 blur-2xl -z-10"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="block text-foreground">for Developers</span>
                    </h1>
                </motion.div>

                {/* Subtitle with Tech Look */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-10 relative mt-4"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
                        Deploy & Scale Your Apps, <span className="text-foreground font-medium">Instantly</span>
                        <br className="hidden sm:block" />
                        No Credit Card Required. Start <span className="text-primary font-medium">Building</span> Today
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    {auth.user ? (
                        <Button size="lg" className="group relative overflow-hidden px-8 py-6 text-base" asChild>
                            <Link href={'/dashboard'}>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Go to Dashboard
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button size="lg" className="group relative overflow-hidden px-8 py-6 text-base" asChild>
                                <Link href={'/register'}>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-primary/20" asChild>
                                <Link href={'/login'}>
                                    View Demo
                                </Link>
                            </Button>
                        </>
                    )}
                </motion.div>

                {/* Stats - Modern Card Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="inline-flex flex-row items-center gap-0 border border-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm bg-background/30"
                >
                    <div className="px-4 sm:px-8 py-4 sm:py-6 text-center border-r border-primary/20 flex-1 sm:flex-none sm:w-auto">
                        <AnimatedCounter value="100%" />
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Ready</div>
                    </div>
                    <div className="px-4 sm:px-8 py-4 sm:py-6 text-center border-r border-primary/20 flex-1 sm:flex-none sm:w-auto">
                        <AnimatedCounter value="24/7" />
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Always On</div>
                    </div>
                    <div className="px-4 sm:px-8 py-4 sm:py-6 text-center flex-1 sm:flex-none sm:w-auto">
                        <AnimatedCounter value="∞" />
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Scalable</div>
                    </div>
                </motion.div>

                {/* Tech Hashtag */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-12"
                >
                    <div className="text-sm font-mono text-muted-foreground/60">
                        {/* plis jangan abuse */}
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                >
                    <span className="text-xs">Scroll to explore</span>
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </motion.div>
        </main>
    );
}
