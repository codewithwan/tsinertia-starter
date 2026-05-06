'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, Cpu, Globe, HardDrive, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';

interface BentoGridItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({ title, description, icon, className }: BentoGridItemProps) => {
    return (
        <div
            className={cn(
                'group relative flex h-full min-h-[280px] cursor-pointer flex-col justify-between overflow-hidden bg-background/40 backdrop-blur-xl transition-all duration-500 hover:bg-foreground/5',
                className,
            )}
        >
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 via-foreground/[0.02] to-foreground/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            ></div>

            {/* Large icon background */}
            <div className="absolute right-1 bottom-3 scale-[6] text-foreground/[0.03] transition-all duration-700 group-hover:scale-[6.2] group-hover:text-foreground/[0.06]">
                {icon}
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div className="space-y-3">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-foreground/60 backdrop-blur-sm transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/10 group-hover:text-foreground">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <div className="mt-6 flex items-center text-sm font-medium text-foreground/60 transition-colors group-hover:text-foreground">
                    <span className="mr-1">Learn more</span>
                    <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
                </div>
            </div>

            {/* Bottom neon line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
    );
};

interface FeaturesSectionProps {
    className?: string;
}

const items = [
    {
        title: 'TypeScript First',
        description:
            'Full TypeScript support with strict type checking. Auto-completion, type safety, and better developer experience out of the box.',
        icon: <Cpu className="size-6" />,
        size: 'large' as const,
    },
    {
        title: 'Modern Stack',
        description: 'Laravel 12 + React 19 + Inertia.js 2.0 + Tailwind CSS 4. The perfect combination for building modern web apps.',
        icon: <Globe className="size-6" />,
        size: 'small' as const,
    },
    {
        title: 'Authentication Ready',
        description: 'Complete auth system with login, register, password reset, email verification, and social authentication.',
        icon: <Shield className="size-6" />,
        size: 'medium' as const,
    },
    {
        title: 'Admin Dashboard',
        description: 'Pre-built admin panel with user management, role & permission system using Spatie Laravel Permission.',
        icon: <BarChart3 className="size-6" />,
        size: 'medium' as const,
    },
    {
        title: 'UI Components',
        description: '50+ accessible UI components built with Radix UI and styled with Tailwind CSS. Dark mode included.',
        icon: <HardDrive className="size-6" />,
        size: 'small' as const,
    },
    {
        title: 'Developer Experience',
        description: 'ESLint, Prettier, Laravel Pint configured. Hot reload, TypeScript types, and excellent DX for maximum productivity.',
        icon: <Zap className="size-6" />,
        size: 'large' as const,
    },
];

export default function FeaturesSection({ className = '' }: FeaturesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Disable parallax animations on mobile (< 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const backgroundY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
    const glowY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);

    return (
        <section ref={sectionRef} id="features" className={`relative overflow-hidden py-24 ${className}`} style={{ zIndex: 20, marginTop: '-8rem' }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80"></div>

            {/* Neon grid overlay */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-[0.02]">
                <div
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                        height: '150%',
                    }}
                ></div>
            </motion.div>

            {/* Decorative glow elements */}
            <motion.div
                style={{ y: glowY }}
                className="absolute top-1/2 left-0 h-72 w-72 -translate-y-1/2 rounded-full bg-foreground/10 blur-3xl"
            ></motion.div>
            <motion.div
                style={{ y: glowY }}
                className="absolute top-1/2 right-0 h-72 w-72 -translate-y-1/2 rounded-full bg-foreground/15 blur-3xl"
            ></motion.div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="relative z-10 mb-16 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5">
                        <span className="text-sm font-medium tracking-wider uppercase">Features</span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
                        Everything You <span className="italic">Need</span> to Build
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        <span className="font-semibold text-foreground">Production-ready</span> starter kit with all the{' '}
                        <span className="font-semibold text-foreground">modern tools</span> and{' '}
                        <span className="font-semibold text-foreground">best practices</span> configured for you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 md:grid-cols-6"
                >
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={cn(item.size === 'large' ? 'col-span-4' : item.size === 'medium' ? 'col-span-3' : 'col-span-2', 'h-full')}
                        >
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                size={item.size}
                                className="rounded-none border-0"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
