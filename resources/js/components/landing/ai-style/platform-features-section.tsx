import { motion } from 'framer-motion';
import { Globe, Shield, BarChart3, Zap } from 'lucide-react';

interface PlatformFeaturesSectionProps {
    className?: string;
}

export default function PlatformFeaturesSection({ className = '' }: PlatformFeaturesSectionProps) {
    const features = [
        {
            icon: <Globe className="h-6 w-6" />,
            title: "Easy Deployment",
            description: "Deploy your applications with just a few clicks"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Free Hosting",
            description: "Free hosting with generous resources included"
        },
        {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "Auto Scaling",
            description: "Automatic scaling to handle traffic spikes"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Developer Tools",
            description: "Complete set of tools and APIs for developers"
        }
    ];

    return (
        <section className={`relative py-32 overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Diagonal neon lines pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 120px, currentColor 120px, currentColor 121px)',
            }}></div>

            {/* Subtle glow */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase border border-foreground/10 px-4 py-1.5 rounded-full">Features</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        Platform Features
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to deploy and scale your applications
                    </p>
                </motion.div>

                {/* Horizontal scroll cards */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Glass card */}
                                <div className="relative h-full p-6 rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-xl hover:bg-foreground/5 transition-all duration-300">
                                    {/* Neon glow on hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/0 to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* PREMIUM Icon with glass bg + neon ring */}
                                        <div className="relative mb-6 inline-flex">
                                            {/* Neon glow ring */}
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/15 to-foreground/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* Glass icon container */}
                                            <div className="relative w-16 h-16 rounded-xl bg-foreground/5 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground/60 group-hover:text-foreground group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300">
                                                {feature.icon}
                                            </div>

                                            {/* Icon corner accents */}
                                            <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-2 border-l-2 border-foreground/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-2 border-r-2 border-foreground/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                            {feature.description}
                                        </p>

                                        {/* Bottom accent line */}
                                        <div className="h-px w-full bg-gradient-to-r from-foreground/20 via-foreground/40 to-transparent group-hover:via-foreground/60 transition-all duration-300"></div>
                                    </div>

                                    {/* Card Corner accents */}
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-foreground/10 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-foreground/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
