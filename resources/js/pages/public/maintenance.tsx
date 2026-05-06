import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, Wrench } from 'lucide-react';

export default function Maintenance() {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <Head title="Under Maintenance" />

            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Neon grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            ></div>

            {/* Scanning line effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="animate-scan-line absolute h-[2px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
            </div>

            {/* Floating gradient orbs - grayscale only */}
            <div className="animate-float-slow absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-foreground/8 blur-[120px]"></div>
            <div className="animate-float-slower absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-foreground/12 blur-[120px]"></div>

            {/* Vignette overlay */}
            <div className="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-background/50"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    {/* Icon with glass background */}
                    <div className="mb-8 inline-flex items-center justify-center">
                        <div className="relative">
                            {/* Outer neon ring */}
                            <div className="animate-neon-pulse absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl"></div>

                            {/* Glass circle */}
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-xl">
                                <Wrench className="h-10 w-10 text-foreground/60" strokeWidth={1.5} />
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 h-8 w-8 rounded-tl-full border-t-2 border-l-2 border-foreground/20"></div>
                            <div className="absolute -right-1 -bottom-1 h-8 w-8 rounded-br-full border-r-2 border-b-2 border-foreground/20"></div>
                        </div>
                    </div>

                    {/* Status badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5"
                    >
                        <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/40"></div>
                        <span className="font-mono text-sm tracking-wider text-muted-foreground uppercase">System Status</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-6 text-5xl leading-tight font-bold text-foreground sm:text-6xl md:text-7xl"
                    >
                        Under Maintenance
                    </motion.h1>

                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-6 flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-foreground/20"></div>
                        <div className="h-1.5 w-1.5 rounded-full bg-foreground/40"></div>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-foreground/20"></div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
                    >
                        We're working hard to improve our services. The system will be back online shortly.
                    </motion.p>

                    {/* Tech badge */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mb-8">
                        <span className="font-mono text-xs tracking-widest text-muted-foreground/40 uppercase">#freepaas</span>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <Button size="lg" className="group relative overflow-hidden px-8 py-6 text-base shadow-lg shadow-primary/25" asChild>
                            <Link href="/">
                                <Home className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-[-2px]" />
                                Back to Home
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-foreground/20 bg-background/40 px-8 py-6 text-base backdrop-blur-xl hover:bg-foreground/5"
                            onClick={handleRefresh}
                        >
                            <RefreshCw className="mr-2 h-5 w-5" />
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
                            <div className="h-2 w-2 rounded-full bg-foreground/40"></div>
                            <span className="font-mono">System Update</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-foreground/60"></div>
                            <span className="font-mono">In Progress</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
