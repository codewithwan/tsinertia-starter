import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, BarChart3 } from 'lucide-react';

interface ProductFeaturesSectionProps {
    className?: string;
}

export default function ProductFeaturesSection({ className = '' }: ProductFeaturesSectionProps) {
    return (
        <section id="platform" className={`relative py-24 overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Neon vertical lines pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, currentColor 100px, currentColor 101px)',
            }}></div>

            {/* Top/Bottom neon lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-3">
                        <div className="h-px w-16 bg-foreground/20"></div>
                        <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">Platform</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                        Free Platform for Developers
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Everything you need to deploy, run, and scale your applications
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 group"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative flex-shrink-0 mt-1">
                                    {/* Neon blur ring */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Glass icon container */}
                                    <div className="relative w-14 h-14 bg-foreground/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-foreground/10 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                                        <Cpu className="h-7 w-7 text-foreground/60 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Instant Deployment</h3>
                                    <p className="text-muted-foreground">Deploy your applications in seconds with our streamlined deployment process</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 group"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative flex-shrink-0 mt-1">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative w-14 h-14 bg-foreground/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-foreground/10 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                                        <Globe className="h-7 w-7 text-foreground/60 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Free Hosting</h3>
                                    <p className="text-muted-foreground">Free hosting with generous resources to get your projects up and running</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 group"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative flex-shrink-0 mt-1">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative w-14 h-14 bg-foreground/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-foreground/10 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                                        <Shield className="h-7 w-7 text-foreground/60 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Auto Scaling</h3>
                                    <p className="text-muted-foreground">Automatic scaling to handle traffic spikes and ensure optimal performance</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 group"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative flex-shrink-0 mt-1">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative w-14 h-14 bg-foreground/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-foreground/10 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                                        <BarChart3 className="h-7 w-7 text-foreground/60 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 w-4 h-4 border-t border-l border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b border-r border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Developer Tools</h3>
                                    <p className="text-muted-foreground">Complete set of tools and APIs to build, deploy, and manage your applications</p>
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
                        className="space-y-4"
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
                                className="text-muted-foreground mb-4"
                            >
                                Modern, scalable technology stack for developers
                            </motion.p>

                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50"
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
                                    className="flex items-center justify-between p-3 rounded-lg bg-foreground/5 border border-foreground/20"
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
                                    className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/50"
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
                            className="rounded-xl p-6 border border-foreground/20 bg-foreground/5"
                        >
                            <div className="mb-2">
                                <div className="inline-flex items-center gap-2 mb-2">
                                    <div className="h-px w-8 bg-foreground/30"></div>
                                    <div className="w-2 h-2 rounded-full bg-foreground/50"></div>
                                </div>
                                <h4 className="text-lg font-semibold text-foreground">Ready to Deploy</h4>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Deploy your applications in minutes. Start building today with our free platform.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
