import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, Zap } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className={`relative py-32 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                backgroundSize: '10px 10px'
            }}></div>

            {/* Manga panel borders */}
            <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-black"></div>

            {/* Speed lines from center */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                            width: '600px',
                            height: '3px',
                            background: 'black',
                            transform: `rotate(${i * 30}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Main CTA Panel - manga style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main panel */}
                        <div className="relative border-6 border-black bg-white p-8 sm:p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                            {/* Halftone pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]" style={{
                                backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                                backgroundSize: '8px 8px'
                            }}></div>

                            {/* Lightning icon with effect */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center justify-center mb-8"
                            >
                                <div className="relative">
                                    {/* Icon container */}
                                    <div className="w-24 h-24 border-4 border-black bg-black flex items-center justify-center transform rotate-12">
                                        <Zap className="h-12 w-12 text-white fill-white" strokeWidth={2} />
                                    </div>

                                    {/* Impact lines */}
                                    <div className="absolute -inset-4 opacity-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute top-1/2 left-1/2 origin-left"
                                                style={{
                                                    width: '60px',
                                                    height: '3px',
                                                    background: 'black',
                                                    transform: `rotate(${i * 45}deg)`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Heading - manga style */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-6 leading-tight"
                            >
                                READY TO DEPLOY
                                <br />
                                <span className="inline-block px-4 py-1 bg-black text-white transform -rotate-2 my-2">
                                    YOUR NEXT PROJECT?
                                </span>
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-lg sm:text-xl font-medium text-black/80 mb-8 max-w-2xl mx-auto"
                            >
                                Join developers building and deploying applications for <span className="font-black">FREE</span>.
                                Start your journey today!
                            </motion.p>

                            {/* Hashtag badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-2 border-3 border-black bg-white font-black text-sm transform rotate-1 mb-8 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            >
                                #FREEPAAS
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                {auth.user ? (
                                    <Link href={'/dashboard'} className="group">
                                        <div className="px-10 py-4 border-4 border-black bg-black text-white font-black uppercase tracking-wide text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                            <span className="flex items-center gap-2">
                                                GO TO DASHBOARD
                                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={'/register'} className="group">
                                            <div className="px-10 py-4 border-4 border-black bg-black text-white font-black uppercase tracking-wide text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                                <span className="flex items-center gap-2">
                                                    GET STARTED FREE
                                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            </div>
                                        </Link>
                                        <Link href={'/login'} className="group">
                                            <div className="px-10 py-4 border-4 border-black bg-white text-black font-black uppercase tracking-wide text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                                VIEW DEMO
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </motion.div>

                            {/* Trust badges - manga style */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-black/70 uppercase"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black"></div>
                                    <span>PRODUCTION READY</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black"></div>
                                    <span>FULL DOCS</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-black"></div>
                                    <span>REGULAR UPDATES</span>
                                </div>
                            </motion.div>

                            {/* Panel corner markers */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-black"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-black"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-black"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-black"></div>
                        </div>

                        {/* Sound effect text */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.9 }}
                            viewport={{ once: true }}
                            className="absolute -top-8 -right-8 px-6 py-3 border-4 border-black bg-white font-black text-3xl transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            NOW!
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
