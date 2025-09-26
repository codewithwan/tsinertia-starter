import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, BarChart3, Zap } from 'lucide-react';

interface ProductFeaturesSectionProps {
    className?: string;
}

export default function ProductFeaturesSection({ className = '' }: ProductFeaturesSectionProps) {
    return (
        <section className={`py-24 bg-gradient-to-b from-background to-muted/20 ${className}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Complete AI SaaS Platform
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Everything you need to build, launch, and scale your AI-powered SaaS business
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Cpu className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">AI Model Integration</h3>
                                    <p className="text-muted-foreground">Pre-configured integration with OpenAI, Anthropic, and other AI providers for seamless AI functionality</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Globe className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">User Authentication</h3>
                                    <p className="text-muted-foreground">Complete user registration, login, and session management system with role-based access control</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Payment Integration</h3>
                                    <p className="text-muted-foreground">Built-in Stripe integration for subscription management, billing, and payment processing</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <BarChart3 className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Admin Dashboard</h3>
                                    <p className="text-muted-foreground">Complete admin panel for user management, analytics, and business insights</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-foreground mb-4"
                            >
                                Tech Stack
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="text-muted-foreground mb-6"
                            >
                                Modern, scalable technology stack for your AI SaaS
                            </motion.p>

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border/50"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">Laravel + React</div>
                                        <div className="text-sm text-muted-foreground">Backend & Frontend</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">✓</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/30"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">TypeScript</div>
                                        <div className="text-sm text-muted-foreground">Type Safety</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">✓</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-background border border-border/50"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">Tailwind CSS</div>
                                        <div className="text-sm text-muted-foreground">Styling</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">✓</div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Zap className="h-6 w-6 text-primary" />
                                <h4 className="text-lg font-semibold text-foreground">Ready to Deploy</h4>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Deploy your AI SaaS in minutes, not months. Complete template ready for customization.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
