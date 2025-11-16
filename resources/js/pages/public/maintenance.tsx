import { Head, Link } from '@inertiajs/react';
import { Wrench, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Maintenance() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Head title="Under Maintenance" />

            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Neon grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '80px 80px'
            }}></div>

            {/* Scanning line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-scan-line"></div>
            </div>

            {/* Floating gradient orbs - grayscale only */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-foreground/8 rounded-full blur-[120px] animate-float-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-foreground/12 rounded-full blur-[120px] animate-float-slower"></div>

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Icon with glass background */}
                    <div className="inline-flex items-center justify-center mb-8">
                        <div className="relative">
                            {/* Outer neon ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>

                            {/* Glass circle */}
                            <div className="relative w-24 h-24 rounded-full bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                                <Wrench className="h-10 w-10 text-foreground/60" strokeWidth={1.5} />
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-foreground/20 rounded-tl-full"></div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-foreground/20 rounded-br-full"></div>
                        </div>
                    </div>

                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-foreground/40 animate-pulse"></div>
                        <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">System Status</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                    >
                        Under Maintenance
                    </motion.h1>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-foreground/20"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/40"></div>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-foreground/20"></div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        We're working hard to improve our services. The system will be back online shortly.
                    </motion.p>

                    {/* Tech badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-8"
                    >
                        <span className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest">#buildwithai / 2030</span>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button size="lg" className="group relative overflow-hidden px-8 py-6 text-base shadow-lg shadow-primary/25" asChild>
                            <Link href="/">
                                <Home className="h-5 w-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 py-6 text-base border-foreground/20 bg-background/40 backdrop-blur-xl hover:bg-foreground/5"
                            onClick={handleRefresh}
                        >
                            <RefreshCw className="h-5 w-5 mr-2" />
                            Check Again
                        </Button>
                    </motion.div>

                    {/* Bottom decorative elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-foreground/40"></div>
                            <span className="font-mono">System Update</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-foreground/60"></div>
                            <span className="font-mono">In Progress</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
