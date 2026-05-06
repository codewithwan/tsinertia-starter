import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Layers, Package, Shield } from 'lucide-react';
import { useRef } from 'react';

interface ProductFeaturesSectionProps {
    className?: string;
}

export default function ProductFeaturesSection({ className = '' }: ProductFeaturesSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    // Disable parallax animations on mobile (< 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const yLeft = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [200, -200]);
    const yRight = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-150, 150]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0.95, 1.02, 1, 0.98]);

    return (
        <section ref={sectionRef} id="platform" className={`relative overflow-hidden py-24 md:py-32 ${className}`} style={{ zIndex: 1 }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>

            {/* Neon vertical lines pattern with parallax - reduced on mobile */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 hidden opacity-[0.015] md:block">
                <div
                    style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 100px, currentColor 100px, currentColor 101px)',
                        height: '200%',
                    }}
                ></div>
            </motion.div>

            {/* Top/Bottom neon lines */}
            <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>

            <div className="relative container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="mb-8"
                >
                    <div className="mb-3 flex items-center gap-4">
                        <div className="h-px w-16 bg-foreground/20"></div>
                        <span className="font-mono text-sm tracking-wider text-muted-foreground uppercase">Tech Stack</span>
                    </div>
                    <h2 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
                        Modern <span className="italic">Full-Stack</span> Development
                    </h2>
                    <p className="max-w-2xl text-xl text-muted-foreground">
                        Built with the <span className="font-semibold text-foreground">latest technologies</span> for{' '}
                        <span className="font-semibold text-foreground">maximum developer productivity</span>
                    </p>
                </motion.div>

                <div className="grid items-start gap-12 lg:grid-cols-2">
                    {/* Left Side - Features with parallax - reduced on mobile */}
                    <motion.div style={{ y: yLeft, opacity, scale }} className="space-y-5">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="group flex items-start gap-4"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative mt-1 flex-shrink-0">
                                    {/* Neon blur ring */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>

                                    {/* Glass icon container */}
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10">
                                        <Package
                                            className="h-7 w-7 text-foreground/60 transition-colors group-hover:text-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    {/* Corner accents */}
                                    <div className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-tl-xl border-t border-l border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-br-xl border-r border-b border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xl font-semibold text-foreground">Laravel 12 Backend</h3>
                                    <p className="text-muted-foreground">
                                        Modern PHP framework with elegant syntax, powerful ORM, and extensive ecosystem
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="group flex items-start gap-4"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative mt-1 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10">
                                        <Layers
                                            className="h-7 w-7 text-foreground/60 transition-colors group-hover:text-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-tl-xl border-t border-l border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-br-xl border-r border-b border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xl font-semibold text-foreground">React 19 + Inertia.js</h3>
                                    <p className="text-muted-foreground">
                                        Build modern SPAs without API complexity. TypeScript-first with full type safety
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="group flex items-start gap-4"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative mt-1 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10">
                                        <Shield
                                            className="h-7 w-7 text-foreground/60 transition-colors group-hover:text-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-tl-xl border-t border-l border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-br-xl border-r border-b border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xl font-semibold text-foreground">Complete Auth System</h3>
                                    <p className="text-muted-foreground">
                                        Login, register, email verification, password reset, and social auth ready
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="group flex items-start gap-4"
                            >
                                {/* PREMIUM ICON DESIGN */}
                                <div className="relative mt-1 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10">
                                        <Code2
                                            className="h-7 w-7 text-foreground/60 transition-colors group-hover:text-foreground"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 h-4 w-4 rounded-tl-xl border-t border-l border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    <div className="absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-br-xl border-r border-b border-foreground/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-xl font-semibold text-foreground">UI Components Library</h3>
                                    <p className="text-muted-foreground">50+ accessible components with Radix UI, Tailwind CSS, and dark mode</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Tech Stack with parallax - reduced on mobile */}
                    <motion.div style={{ y: yRight, opacity, scale }} className="space-y-4">
                        <div className="rounded-xl border border-border/50 bg-muted/30 p-6">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="mb-4 text-2xl font-bold text-foreground"
                            >
                                What's Included
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="mb-4 text-muted-foreground"
                            >
                                Everything you need to build production-ready applications
                            </motion.p>

                            <div className="space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between rounded-lg border border-border/50 bg-background p-3"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">TypeScript</div>
                                        <div className="text-sm text-muted-foreground">Full type safety</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">✓</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between rounded-lg border border-foreground/20 bg-foreground/5 p-3"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">Admin Panel</div>
                                        <div className="text-sm text-muted-foreground">User & role management</div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">✓</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    viewport={{ once: true }}
                                    className="flex items-center justify-between rounded-lg border border-border/50 bg-background p-3"
                                >
                                    <div>
                                        <div className="font-semibold text-foreground">Dark Mode</div>
                                        <div className="text-sm text-muted-foreground">Built-in theme</div>
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
                            className="rounded-xl border border-foreground/20 bg-foreground/5 p-6"
                        >
                            <div className="mb-2">
                                <div className="mb-2 inline-flex items-center gap-2">
                                    <div className="h-px w-8 bg-foreground/30"></div>
                                    <div className="h-2 w-2 rounded-full bg-foreground/50"></div>
                                </div>
                                <h4 className="text-lg font-semibold text-foreground">Production Ready</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Pre-configured with ESLint, Prettier, and Laravel Pint. Docker support included for easy deployment.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
