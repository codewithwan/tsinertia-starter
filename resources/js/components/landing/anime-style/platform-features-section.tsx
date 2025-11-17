import { motion } from 'framer-motion';
import { Globe, Shield, BarChart3, Zap } from 'lucide-react';

interface PlatformFeaturesSectionProps {
    className?: string;
}

export default function PlatformFeaturesSection({ className = '' }: PlatformFeaturesSectionProps) {
    const features = [
        {
            icon: <Globe className="h-8 w-8" strokeWidth={2.5} />,
            title: "EASY DEPLOYMENT",
            description: "Deploy your applications with just a few clicks",
            rotation: "-rotate-2"
        },
        {
            icon: <Shield className="h-8 w-8" strokeWidth={2.5} />,
            title: "FREE HOSTING",
            description: "Free hosting with generous resources included",
            rotation: "rotate-1"
        },
        {
            icon: <BarChart3 className="h-8 w-8" strokeWidth={2.5} />,
            title: "AUTO SCALING",
            description: "Automatic scaling to handle traffic spikes",
            rotation: "-rotate-1"
        },
        {
            icon: <Zap className="h-8 w-8" strokeWidth={2.5} />,
            title: "DEVELOPER TOOLS",
            description: "Complete set of tools and APIs for developers",
            rotation: "rotate-2"
        }
    ];

    return (
        <section className={`relative py-32 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '10px 10px'
            }}></div>

            {/* Panel border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

            <div className="container mx-auto px-6 relative">
                {/* Chapter heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 transform md:-rotate-1 md:pr-12"
                >
                    <div className="inline-block px-4 py-1 border-3 border-black bg-black text-white font-black uppercase tracking-wider text-xs mb-4 transform rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
                        FEATURES
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-black mb-4">
                        PLATFORM FEATURES
                    </h2>
                    <p className="text-lg font-medium text-black/70 max-w-2xl">
                        Everything you need to deploy and scale your applications
                    </p>
                </motion.div>

                {/* Chaotic manga card grid */}
                <div className="space-y-6">
                    {/* Row 1 - 2 panels, offset left */}
                    <div className="md:pl-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.slice(0, 2).map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:${feature.rotation}`}
                                >
                                    {/* Halftone accent */}
                                    <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.05]" style={{
                                        backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                                        backgroundSize: '6px 6px'
                                    }}></div>

                                    {/* Icon box */}
                                    <div className="w-16 h-16 border-3 border-black bg-black flex items-center justify-center mb-4 text-white">
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-black mb-2">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-black/70 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Corner accent */}
                                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-black/20"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - 2 panels, offset right */}
                    <div className="md:pr-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.slice(2, 4).map((feature, index) => (
                                <motion.div
                                    key={index + 2}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:${feature.rotation}`}
                                >
                                    {/* Halftone accent */}
                                    <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.05]" style={{
                                        backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                                        backgroundSize: '6px 6px'
                                    }}></div>

                                    {/* Icon box */}
                                    <div className="w-16 h-16 border-3 border-black bg-black flex items-center justify-center mb-4 text-white">
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-black mb-2">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-black/70 font-medium leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Corner accent */}
                                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-black/20"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
