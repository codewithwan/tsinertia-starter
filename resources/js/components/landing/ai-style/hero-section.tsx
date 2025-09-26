import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
// import { dashboard, register } from '@/routes';
import AnimatedCounter from './animated-counter';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <main className={`flex items-center justify-center min-h-[calc(100vh-80px)] py-8 sm:py-12 ${className}`}>
            <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm mb-6 sm:mb-8"
                >
                    <Sparkles className="h-4 w-4" />
                    <strong className="text-primary">AI-Powered</strong> SaaS Template
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
                >
                    Build <strong className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">AI-Powered</strong>
                    <br />
                    <span className="text-muted-foreground">SaaS Business</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
                >
                    <strong className="text-foreground">Launch & Scale</strong> Your AI SaaS, <strong className="text-foreground">Faster</strong>. With <strong className="text-primary">Complete Template</strong>. Ready to <strong className="text-green-600 dark:text-green-400">Customize</strong>
                </motion.p>

                {/* Hashtag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-8 sm:mb-12 px-4"
                >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-primary">
                        #buildwithai
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex justify-center mb-12 sm:mb-16 px-4"
                >
                    {auth.user ? (
                        <Button size="lg" className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg" asChild>
                            <Link href={'/dashboard'}>
                                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Launch Your SaaS
                            </Link>
                        </Button>
                    ) : (
                        <Button size="lg" className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg" asChild>
                                <Link href={'/register'}>
                                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Start Building
                            </Link>
                        </Button>
                    )}
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto px-4">
                    <div className="text-center">
                        <AnimatedCounter value="100%" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="text-xs sm:text-sm text-muted-foreground"
                        >
                            Ready to Use
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <AnimatedCounter value="24/7" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                            className="text-xs sm:text-sm text-muted-foreground"
                        >
                            Always On
                        </motion.div>
                    </div>
                    <div className="text-center">
                        <AnimatedCounter value="∞" />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.8 }}
                            className="text-xs sm:text-sm text-muted-foreground"
                        >
                            Scalable
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
