import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Rocket, Zap } from 'lucide-react';
import { useRef } from 'react';
// import { register } from '@/routes';
import AnimatedCounter from './animated-counter';

interface PricingSectionProps {
    className?: string;
}

export default function PricingSection({ className = '' }: PricingSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

    return (
        <section ref={sectionRef} id="pricing" className={`relative overflow-hidden py-24 md:py-32 ${className}`} style={{ zIndex: 1 }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90"></div>

            {/* Dot matrix pattern with parallax - reduced on mobile */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), rotate }}
                className="absolute inset-0 hidden opacity-[0.02] md:block"
            >
                <div
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                        height: '150%',
                    }}
                ></div>
            </motion.div>

            {/* Centered glow with parallax - reduced on mobile */}
            <motion.div
                style={{ scale }}
                className="absolute top-1/2 left-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/5 blur-3xl md:block"
            ></motion.div>

            <div className="relative container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-20 text-center"
                >
                    <div className="mb-6 inline-flex items-center gap-3">
                        <div className="h-px w-8 bg-foreground/20"></div>
                        <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">Pricing</span>
                        <div className="h-px w-8 bg-foreground/20"></div>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
                        Free & <span className="italic">Open Source</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        TSInertia Starter is <span className="font-semibold text-foreground">completely free</span> and{' '}
                        <span className="font-semibold text-foreground">open source</span>. Start building today!
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                    {/* Starter Plan with parallax - reduced on mobile */}
                    <motion.div
                        style={{ y: yLeft }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-foreground/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20">
                            <CardHeader className="pb-8">
                                {/* PREMIUM ICON BADGE */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/15 to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all group-hover:bg-foreground/10">
                                            <Rocket className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-tl-full border-t border-l border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pr-16">
                                    <div>
                                        <CardTitle className="mb-2 text-2xl">Open Source</CardTitle>
                                        <CardDescription>Everything included</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">Free</div>
                                        <div className="text-sm text-muted-foreground">Forever</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col space-y-6">
                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-muted/30 p-3 text-center">
                                        <AnimatedCounter value="100%" />
                                        <div className="text-xs text-muted-foreground">Complete</div>
                                    </div>
                                    <div className="rounded-lg bg-muted/30 p-3 text-center">
                                        <AnimatedCounter value="∞" />
                                        <div className="text-xs text-muted-foreground">Customizable</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex-1 space-y-3">
                                    <h4 className="font-semibold text-foreground">Features</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'All features included',
                                            'TypeScript + React + Laravel',
                                            'Authentication system',
                                            'Admin dashboard',
                                            'UI component library',
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <Check className="h-4 w-4 flex-shrink-0 text-foreground/60" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* What's Included */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-foreground">What's Included</h4>
                                    <div className="space-y-2">
                                        {[
                                            { item: 'Complete Source Code', price: '✓' },
                                            { item: 'MIT Licensed', price: '✓' },
                                            { item: 'Free Updates', price: '✓' },
                                        ].map((option, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded border border-foreground/10 bg-foreground/5 px-3 py-2"
                                            >
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/60">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="mt-auto w-full" asChild>
                                    <Link href={'/register'}>
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Pro Plan with parallax - reduced on mobile */}
                    <motion.div
                        style={{ y: yRight }}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-foreground/20 bg-gradient-to-br from-foreground/5 to-foreground/10 backdrop-blur-sm">
                            <CardHeader className="pb-8">
                                {/* PREMIUM ICON BADGE - ZAP FOR PRO */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative">
                                        <div className="animate-neon-pulse absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl"></div>
                                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-sm transition-all group-hover:bg-foreground/15">
                                            <Zap className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -top-0.5 -left-0.5 h-5 w-5 rounded-tl-full border-t-2 border-l-2 border-foreground/30 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                        <div className="absolute -right-0.5 -bottom-0.5 h-5 w-5 rounded-br-full border-r-2 border-b-2 border-foreground/30 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pr-20">
                                    <div>
                                        <CardTitle className="mb-2 text-2xl">Pro Support</CardTitle>
                                        <CardDescription>Custom development & consulting</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">Custom</div>
                                        <div className="text-sm text-muted-foreground">Contact us</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col space-y-6">
                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg border border-foreground/20 bg-foreground/10 p-3 text-center">
                                        <AnimatedCounter value="100%" />
                                        <div className="text-xs text-muted-foreground">Complete</div>
                                    </div>
                                    <div className="rounded-lg border border-foreground/20 bg-foreground/10 p-3 text-center">
                                        <AnimatedCounter value="∞" />
                                        <div className="text-xs text-muted-foreground">Advanced</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex-1 space-y-3">
                                    <h4 className="font-semibold text-foreground">What's Included:</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'Priority email support',
                                            'Custom feature development',
                                            'Code review & consulting',
                                            'Training sessions',
                                            'Dedicated Slack channel',
                                            'SLA guarantee',
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <Check className="h-4 w-4 flex-shrink-0 text-foreground/80" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* What's Included */}
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-foreground">What's Included</h4>
                                    <div className="space-y-2">
                                        {[
                                            { item: 'Custom Development', price: '✓' },
                                            { item: 'Consulting', price: '✓' },
                                            { item: 'Training', price: '✓' },
                                        ].map((option, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded border border-foreground/20 bg-foreground/10 px-3 py-2"
                                            >
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/80">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="mt-auto w-full" variant="outline" asChild>
                                    <Link href={'mailto:support@tsinertia.com'}>
                                        Contact Us
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
