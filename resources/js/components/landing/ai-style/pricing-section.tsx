import { motion, useScroll, useTransform } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Rocket, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';
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
        offset: ["start end", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

    return (
        <section ref={sectionRef} id="pricing" className={`relative py-24 md:py-32 overflow-hidden ${className}`} style={{ zIndex: 1 }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90 pointer-events-none"></div>

            {/* Dot matrix pattern with parallax - reduced on mobile */}
            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]), rotate }}
                className="absolute inset-0 opacity-[0.02] hidden md:block"
            >
                <div style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    height: '150%'
                }}></div>
            </motion.div>

            {/* Centered glow with parallax - reduced on mobile */}
            <motion.div
                style={{ scale }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-3xl hidden md:block"
            ></motion.div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-foreground/20"></div>
                        <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">Pricing</span>
                        <div className="h-px w-8 bg-foreground/20"></div>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        Free & Open Source
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        TSInertia Starter is completely free and open source. Start building today!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Starter Plan with parallax - reduced on mobile */}
                    <motion.div
                        style={{ y: yLeft }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group relative overflow-hidden border-2 border-foreground/10 hover:border-foreground/20 transition-all duration-300 h-full flex flex-col bg-background/50 backdrop-blur-sm">
                            <CardHeader className="pb-8">
                                {/* PREMIUM ICON BADGE */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/15 to-foreground/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="relative w-12 h-12 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-all">
                                            <Rocket className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pr-16">
                                    <div>
                                        <CardTitle className="text-2xl mb-2">Open Source</CardTitle>
                                        <CardDescription>Everything included</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">Free</div>
                                        <div className="text-sm text-muted-foreground">Forever</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 flex-1 flex flex-col">
                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                                        <AnimatedCounter value="100%" />
                                        <div className="text-xs text-muted-foreground">Complete</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                                        <AnimatedCounter value="∞" />
                                        <div className="text-xs text-muted-foreground">Customizable</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 flex-1">
                                    <h4 className="font-semibold text-foreground">Features</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'All features included',
                                            'TypeScript + React + Laravel',
                                            'Authentication system',
                                            'Admin dashboard',
                                            'UI component library'
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <Check className="h-4 w-4 text-foreground/60 flex-shrink-0" />
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
                                            { item: 'Free Updates', price: '✓' }
                                        ].map((option, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-foreground/5 rounded border border-foreground/10">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/60">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-auto" asChild>
                                    <Link href={'/register'}>
                                        Get Started Free
                                        <ArrowRight className="h-4 w-4 ml-2" />
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
                        <Card className="group relative overflow-hidden border-2 border-foreground/20 bg-gradient-to-br from-foreground/5 to-foreground/10 h-full flex flex-col backdrop-blur-sm">
                            <CardHeader className="pb-8">
                                {/* PREMIUM ICON BADGE - ZAP FOR PRO */}
                                <div className="absolute top-4 right-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>
                                        <div className="relative w-14 h-14 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center group-hover:bg-foreground/15 transition-all">
                                            <Zap className="h-6 w-6 text-foreground/70" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-2 border-l-2 border-foreground/30 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-2 border-r-2 border-foreground/30 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pr-20">
                                    <div>
                                        <CardTitle className="text-2xl mb-2">Pro Support</CardTitle>
                                        <CardDescription>Custom development & consulting</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">Custom</div>
                                        <div className="text-sm text-muted-foreground">Contact us</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 flex-1 flex flex-col">
                                {/* Specs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-3 bg-foreground/10 rounded-lg border border-foreground/20">
                                        <AnimatedCounter value="100%" />
                                        <div className="text-xs text-muted-foreground">Complete</div>
                                    </div>
                                    <div className="text-center p-3 bg-foreground/10 rounded-lg border border-foreground/20">
                                        <AnimatedCounter value="∞" />
                                        <div className="text-xs text-muted-foreground">Advanced</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 flex-1">
                                    <h4 className="font-semibold text-foreground">What's Included:</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'Priority email support',
                                            'Custom feature development',
                                            'Code review & consulting',
                                            'Training sessions',
                                            'Dedicated Slack channel',
                                            'SLA guarantee'
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <Check className="h-4 w-4 text-foreground/80 flex-shrink-0" />
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
                                            { item: 'Training', price: '✓' }
                                        ].map((option, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-foreground/10 rounded border border-foreground/20">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/80">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-auto" variant="outline" asChild>
                                    <Link href={'mailto:support@tsinertia.com'}>
                                        Contact Us
                                        <ArrowRight className="h-4 w-4 ml-2" />
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
