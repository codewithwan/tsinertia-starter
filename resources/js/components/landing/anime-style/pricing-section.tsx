import { motion } from 'framer-motion';
import { Check, Rocket, Zap } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface PricingSectionProps {
    className?: string;
}

export default function PricingSection({ className = '' }: PricingSectionProps) {
    return (
        <section id="pricing" className={`relative py-32 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                    backgroundSize: '8px 8px'
                }}></div>
            </div>

            {/* Speed lines decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-[2px] bg-black transform -rotate-45"></div>
                <div className="absolute top-40 right-0 w-80 h-[2px] bg-black transform -rotate-45"></div>
                <div className="absolute top-60 right-0 w-72 h-[2px] bg-black transform -rotate-45"></div>
            </div>

            <div className="container mx-auto px-6 relative">
                {/* Title - Manga Chapter Style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <div className="px-6 py-2 border-4 border-black bg-black text-white font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                            CHAPTER 02: PRICING
                        </div>
                    </div>

                    <div className="relative inline-block mb-4">
                        {/* Emphasis lines */}
                        <div className="absolute -inset-8 opacity-15 pointer-events-none">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, black 0, black 2px, transparent 0, transparent 10px)',
                            }}></div>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-black text-black relative" style={{
                            textShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                        }}>
                            FREE FOREVER!
                        </h2>
                    </div>

                    <div className="relative inline-block">
                        <div className="px-8 py-3 border-3 border-black bg-white font-bold text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Start building now. No credit card required.
                        </div>
                    </div>
                </motion.div>

                {/* Pricing Cards - Manga Panels */}
                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    {/* Free Tier Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <div className="relative h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300">
                            {/* Halftone background */}
                            <div className="absolute inset-0 opacity-[0.02]" style={{
                                backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                                backgroundSize: '6px 6px'
                            }}></div>

                            {/* Manga icon badge - top right */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                                <Rocket className="h-8 w-8 text-black" strokeWidth={2.5} />
                            </div>

                            <div className="p-8 relative">
                                {/* Header */}
                                <div className="mb-6 pb-6 border-b-4 border-black">
                                    <div className="text-3xl font-black text-black uppercase mb-2">FREE TIER</div>
                                    <div className="text-sm font-bold text-black/70 uppercase">Perfect for getting started</div>
                                </div>

                                {/* Price */}
                                <div className="mb-8 text-center py-6 border-4 border-black bg-black text-white">
                                    <div className="text-5xl font-black">FREE</div>
                                    <div className="text-sm font-bold uppercase tracking-wider mt-1">FOREVER</div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="text-center p-4 border-3 border-black bg-white">
                                        <div className="text-3xl font-black text-black">100%</div>
                                        <div className="text-xs font-bold uppercase tracking-wider mt-1">Complete</div>
                                    </div>
                                    <div className="text-center p-4 border-3 border-black bg-white">
                                        <div className="text-3xl font-black text-black">∞</div>
                                        <div className="text-xs font-bold uppercase tracking-wider mt-1">Unlimited</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    <div className="font-black text-black uppercase text-sm mb-4 border-b-2 border-black pb-2">FEATURES:</div>
                                    <ul className="space-y-3">
                                        {[
                                            'Free hosting for your apps',
                                            'Easy deployment process',
                                            'Auto scaling included',
                                            'Developer dashboard',
                                            'API access'
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-0.5 w-5 h-5 border-2 border-black bg-black flex items-center justify-center flex-shrink-0">
                                                    <Check className="h-3 w-3 text-white" strokeWidth={4} />
                                                </div>
                                                <span className="text-sm font-bold text-black">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button */}
                                <Link href={'/register'} className="block">
                                    <div className="w-full px-6 py-4 border-4 border-black bg-white text-black text-center font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                        GET STARTED FREE →
                                    </div>
                                </Link>
                            </div>

                            {/* Panel corner markers */}
                            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-black"></div>
                            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-black"></div>
                        </div>
                    </motion.div>

                    {/* Premium Panel - Featured */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="group"
                    >
                        <div className="relative h-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300">
                            {/* Cross-hatch background for emphasis */}
                            <div className="absolute inset-0 opacity-[0.04]" style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 1px, transparent 0, transparent 4px)',
                                backgroundSize: '6px 6px'
                            }}></div>

                            {/* Featured badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 border-4 border-black bg-black text-white font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                                ★ RECOMMENDED ★
                            </div>

                            {/* Manga icon badge - top right */}
                            <div className="absolute -top-3 -right-3 w-16 h-16 border-4 border-black bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                                <Zap className="h-8 w-8 text-white" strokeWidth={2.5} />
                            </div>

                            <div className="p-8 relative pt-10">
                                {/* Header */}
                                <div className="mb-6 pb-6 border-b-4 border-black">
                                    <div className="text-3xl font-black text-black uppercase mb-2">FREE PLATFORM</div>
                                    <div className="text-sm font-bold text-black/70 uppercase">Everything you need</div>
                                </div>

                                {/* Price - Emphasized */}
                                <div className="mb-8 text-center py-6 border-4 border-black bg-black text-white relative">
                                    {/* Emphasis effect */}
                                    <div className="absolute -inset-1 border-2 border-black"></div>
                                    <div className="text-5xl font-black relative">FREE</div>
                                    <div className="text-sm font-bold uppercase tracking-wider mt-1 relative">NO LIMITS!</div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="text-center p-4 border-3 border-black bg-black text-white">
                                        <div className="text-3xl font-black">100%</div>
                                        <div className="text-xs font-bold uppercase tracking-wider mt-1">Complete</div>
                                    </div>
                                    <div className="text-center p-4 border-3 border-black bg-black text-white">
                                        <div className="text-3xl font-black">∞</div>
                                        <div className="text-xs font-bold uppercase tracking-wider mt-1">Advanced</div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-8">
                                    <div className="font-black text-black uppercase text-sm mb-4 border-b-2 border-black pb-2">ALL FEATURES:</div>
                                    <ul className="space-y-3">
                                        {[
                                            'Unlimited deployments',
                                            'Managed databases',
                                            'Auto scaling',
                                            'Full API access',
                                            'Developer tools',
                                            'Community support'
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="mt-0.5 w-5 h-5 border-2 border-black bg-black flex items-center justify-center flex-shrink-0">
                                                    <Check className="h-3 w-3 text-white" strokeWidth={4} />
                                                </div>
                                                <span className="text-sm font-bold text-black">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Button - Emphasized */}
                                <Link href={'/register'} className="block">
                                    <div className="w-full px-6 py-4 border-4 border-black bg-black text-white text-center font-black uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                        START NOW! →
                                    </div>
                                </Link>
                            </div>

                            {/* Panel corner markers - thicker for emphasis */}
                            <div className="absolute top-3 left-3 w-8 h-8 border-t-3 border-l-3 border-black"></div>
                            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-3 border-r-3 border-black"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
