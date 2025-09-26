import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';
// import { register } from '@/routes';
import AnimatedCounter from './animated-counter';

interface PricingSectionProps {
    className?: string;
}

export default function PricingSection({ className = '' }: PricingSectionProps) {
    return (
        <section className={`py-24 bg-background ${className}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-foreground mb-4">
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
                        <Card className="relative overflow-hidden border-2 border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                            <CardHeader className="pb-8">
                                <div className="flex items-center justify-between">
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
                                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
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
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-primary">{option.price}</span>
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
                        <Card className="relative overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 h-full flex flex-col">
                            <CardHeader className="pb-8">
                                <div className="flex items-center justify-between">
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
                                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                                        <AnimatedCounter value="100%" />
                                        <div className="text-xs text-muted-foreground">Complete</div>
                                    </div>
                                    <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
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
                                                <Star className="h-4 w-4 text-primary flex-shrink-0" />
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
                                            <div key={index} className="flex justify-between items-center py-2 px-3 bg-primary/10 rounded border border-primary/20">
                                                <span className="text-sm text-foreground">{option.item}</span>
                                                <span className="text-sm font-medium text-primary">{option.price}</span>
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
