import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, BarChart3 } from 'lucide-react';

interface ProductFeaturesSectionProps {
    className?: string;
}

export default function ProductFeaturesSection({ className = '' }: ProductFeaturesSectionProps) {
    return (
        <section id="platform" className={`relative py-24 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '10px 10px'
            }}></div>

            {/* Panel borders */}
            <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>

            <div className="container mx-auto px-6 relative">
                {/* Chapter title - manga style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12 md:pl-12 transform -rotate-1"
                >
                    <div className="inline-block px-4 py-1 border-3 border-black bg-white font-black uppercase tracking-wider text-xs mb-4 transform rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        PLATFORM
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-black mb-2">
                        FREE PLATFORM FOR DEVELOPERS
                    </h2>
                    <p className="text-lg font-medium text-black/70 max-w-2xl">
                        Everything you need to deploy, run, and scale your applications
                    </p>
                </motion.div>

                {/* Chaotic manga panel layout */}
                <div className="space-y-8">
                    {/* Row 1 - offset left */}
                    <div className="md:pl-16">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Panel 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:-rotate-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 border-3 border-black bg-black flex items-center justify-center flex-shrink-0">
                                        <Cpu className="h-7 w-7 text-white" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-black mb-2">INSTANT DEPLOYMENT</h3>
                                        <p className="text-black/70 font-medium">Deploy your applications in seconds with our streamlined deployment process</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Panel 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:rotate-2"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 border-3 border-black bg-black flex items-center justify-center flex-shrink-0">
                                        <Globe className="h-7 w-7 text-white" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-black mb-2">FREE HOSTING</h3>
                                        <p className="text-black/70 font-medium">Free hosting with generous resources to get your projects up and running</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Row 2 - offset right */}
                    <div className="md:pr-16">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Panel 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:-rotate-2"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 border-3 border-black bg-black flex items-center justify-center flex-shrink-0">
                                        <Shield className="h-7 w-7 text-white" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-black mb-2">AUTO SCALING</h3>
                                        <p className="text-black/70 font-medium">Automatic scaling to handle traffic spikes and ensure optimal performance</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Panel 4 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform md:rotate-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 border-3 border-black bg-black flex items-center justify-center flex-shrink-0">
                                        <BarChart3 className="h-7 w-7 text-white" strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-black mb-2">DEVELOPER TOOLS</h3>
                                        <p className="text-black/70 font-medium">Complete set of tools and APIs to build, deploy, and manage your applications</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
