import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Rocket, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';
// import { register } from '@/routes';
import AnimatedCounter from './animated-counter';

interface PricingSectionProps {
    className?: string;
}

export default function PricingSection({ className = '' }: PricingSectionProps) {
    return (
        <section id="pricing" className={`relative py-32 overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Dot matrix pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            {/* Centered glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/5 rounded-full blur-3xl"></div>

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
                        Template Packages
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the perfect template package for your AI SaaS business
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Starter Plan */}
                    <motion.div
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
                                        <CardTitle className="text-2xl mb-2">Starter Template</CardTitle>
                                        <CardDescription>Perfect for MVP and testing</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">$99</div>
                                        <div className="text-sm text-muted-foreground">One-time</div>
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
                                            'Complete Laravel + React setup',
                                            'User authentication system',
                                            'Basic AI integration',
                                            'Admin dashboard',
                                            'Responsive design'
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
                                            { item: 'Source Code', price: '✓' },
                                            { item: 'Documentation', price: '✓' },
                                            { item: 'Setup Guide', price: '✓' }
                                        ].map((option, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-foreground/5 rounded border border-foreground/10">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/60">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-auto" variant="outline" asChild>
                                    <Link href={'/register'}>
                                        Get Starter
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
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
                                        <CardTitle className="text-2xl mb-2">Pro Template</CardTitle>
                                        <CardDescription>Advanced features for serious businesses</CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-foreground">$299</div>
                                        <div className="text-sm text-muted-foreground">One-time</div>
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
                                    <h4 className="font-semibold text-foreground">Everything in Starter, plus:</h4>
                                    <ul className="space-y-2">
                                        {[
                                            'Payment integration (Stripe)',
                                            'Advanced AI models',
                                            'Email notifications',
                                            'API documentation',
                                            'Deployment scripts',
                                            'Priority support'
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
                                            { item: 'Everything in Starter', price: '✓' },
                                            { item: 'Advanced Features', price: '✓' },
                                            { item: 'Priority Support', price: '✓' }
                                        ].map((option, index) => (
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-foreground/10 rounded border border-foreground/20">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-foreground/80">{option.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-auto" asChild>
                                    <Link href={'/register'}>
                                        Get Pro
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
