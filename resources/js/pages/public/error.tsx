import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Clock, Home, Lock, RefreshCw, Search, Server, Shield, XCircle } from 'lucide-react';

interface ErrorProps {
    status: number;
    message?: string;
}

interface ErrorConfig {
    icon: typeof Home;
    title: string;
    description: string;
    color: string;
}

const errorConfigs: Record<number, ErrorConfig> = {
    404: {
        icon: Search,
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist or has been moved.',
        color: 'text-blue-500/60',
    },
    403: {
        icon: Shield,
        title: 'Access Forbidden',
        description: 'You do not have permission to access this resource.',
        color: 'text-orange-500/60',
    },
    500: {
        icon: Server,
        title: 'Server Error',
        description: 'Something went wrong on our end. We are working to fix it.',
        color: 'text-red-500/60',
    },
    503: {
        icon: AlertTriangle,
        title: 'Service Unavailable',
        description: 'The service is temporarily unavailable. Please try again later.',
        color: 'text-yellow-500/60',
    },
    419: {
        icon: Clock,
        title: 'Session Expired',
        description: 'Your session has expired. Please refresh the page and try again.',
        color: 'text-purple-500/60',
    },
    429: {
        icon: Lock,
        title: 'Too Many Requests',
        description: 'You have made too many requests. Please wait a moment and try again.',
        color: 'text-amber-500/60',
    },
};

export default function Error({ status = 500, message }: ErrorProps) {
    const config = errorConfigs[status] || {
        icon: XCircle,
        title: `Error ${status}`,
        description: message || 'Something went wrong. Please try again later.',
        color: 'text-foreground/60',
    };

    const Icon = config.icon;

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <Head title={`${config.title} - Error ${status}`} />

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

            {/* Floating gradient orbs */}
            <div className="animate-float-slow absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-foreground/8 blur-[120px]"></div>
            <div className="animate-float-slower absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-foreground/12 blur-[120px]"></div>

            {/* Vignette overlay */}
            <div className="bg-gradient-radial absolute inset-0 from-transparent via-transparent to-background/50"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    {/* Status Code Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5"
                    >
                        <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/40"></div>
                        <span className="font-mono text-sm tracking-wider text-muted-foreground uppercase">Error {status}</span>
                    </motion.div>

                    {/* Icon with glass background */}
                    <div className="mb-8 inline-flex items-center justify-center">
                        <div className="relative">
                            {/* Outer neon ring */}
                            <div className="animate-neon-pulse absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl"></div>

                            {/* Glass circle */}
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-xl">
                                <Icon className={`h-10 w-10 ${config.color}`} strokeWidth={1.5} />
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-1 -left-1 h-8 w-8 rounded-tl-full border-t-2 border-l-2 border-foreground/20"></div>
                            <div className="absolute -right-1 -bottom-1 h-8 w-8 rounded-br-full border-r-2 border-b-2 border-foreground/20"></div>
                        </div>
                    </div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-6 text-5xl leading-tight font-bold text-foreground sm:text-6xl md:text-7xl"
                    >
                        {config.title}
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
                        {config.description}
                    </motion.p>

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

                        {status === 419 && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-foreground/20 bg-background/40 px-8 py-6 text-base backdrop-blur-xl hover:bg-foreground/5"
                                onClick={handleRefresh}
                            >
                                <RefreshCw className="mr-2 h-5 w-5" />
                                Refresh Page
                            </Button>
                        )}

                        {(status === 404 || status === 403) && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-foreground/20 bg-background/40 px-8 py-6 text-base backdrop-blur-xl hover:bg-foreground/5"
                                onClick={handleGoBack}
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Go Back
                            </Button>
                        )}

                        {(status === 500 || status === 503 || status === 429) && (
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-foreground/20 bg-background/40 px-8 py-6 text-base backdrop-blur-xl hover:bg-foreground/5"
                                onClick={handleRefresh}
                            >
                                <RefreshCw className="mr-2 h-5 w-5" />
                                Try Again
                            </Button>
                        )}
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
                            <span className="font-mono">Error Code</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-foreground/60"></div>
                            <span className="font-mono">{status}</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
