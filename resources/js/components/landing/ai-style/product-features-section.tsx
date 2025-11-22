import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, Globe, Shield, BarChart3 } from 'lucide-react';
import { useRef } from 'react';

interface ProductFeaturesSectionProps {
    className?: string;
}

export default function ProductFeaturesSection({ className = '' }: ProductFeaturesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-150, 150]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1.02, 1, 0.98]);

    return (
        <section ref={sectionRef} id="platform" className={`relative py-24 md:py-32 overflow-hidden ${className}`} style={{ zIndex: 1 }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>
            
            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none"></div>

            {/* Neon vertical lines pattern with parallax - reduced on mobile */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-[0.015] hidden md:block"
            >
                <div style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, currentColor 100px, currentColor 101px)',
                    height: '200%'
                }}></div>
            </motion.div>

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
                        Cloud Platform for Developers
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Reverse tunnel, static hosting, and custom domain with automatic SSL
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side - Features with parallax - reduced on mobile */}
                    <motion.div
                        style={{ y: yLeft, opacity, scale }}
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
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Reverse Tunnel</h3>
                                    <p className="text-muted-foreground">Expose local applications to the internet with ease. Similar to Ngrok but faster and more affordable</p>
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
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Static Hosting</h3>
                                    <p className="text-muted-foreground">Deploy static websites super fast like Vercel/Netlify. No server setup required</p>
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
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Custom Domain + SSL</h3>
                                    <p className="text-muted-foreground">Custom domain with automatic SSL. No complex DNS configuration needed</p>
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
                                    <h3 className="text-xl font-semibold text-foreground mb-2">CLI & Dashboard</h3>
                                    <p className="text-muted-foreground">Simple CLI and modern dashboard to manage tunnels & deployments</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Tech Stack with parallax - reduced on mobile */}
                    <motion.div
                        style={{ y: yRight, opacity, scale }}
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
                                        <div className="font-semibold text-foreground">Reverse Tunnel</div>
                                        <div className="text-sm text-muted-foreground">Expose local apps</div>
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
                                        <div className="font-semibold text-foreground">Static Hosting</div>
                                        <div className="text-sm text-muted-foreground">Deploy websites</div>
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
                                        <div className="font-semibold text-foreground">Custom Domain</div>
                                        <div className="text-sm text-muted-foreground">SSL otomatis</div>
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
                                <h4 className="text-lg font-semibold text-foreground">Coming Soon</h4>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                Cloud platform for developers. Reverse tunnel, static hosting, and custom domain made easy.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
