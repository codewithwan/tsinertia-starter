import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ChevronDown, ArrowRight, User } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useRef } from 'react';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const { auth } = usePage<SharedData>().props;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0], {
        clamp: false
    });

    return (
        <main id="home" ref={containerRef} className={`relative min-h-screen py-20 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                    backgroundSize: '12px 12px'
                }}></div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10 min-h-[calc(100vh-160px)] flex items-center">
                <motion.div className="max-w-7xl mx-auto w-full" style={{ opacity }}>
                    {/* Manga Dialogue Layout - Two Characters Talking */}
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        {/* Left Character - Developer 1 (Question) */}
                        <div className="lg:col-span-5 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                {/* Character avatar */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center flex-shrink-0 transform -rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <User className="w-10 h-10 text-black" strokeWidth={2} />
                                    </div>
                                    <div className="px-3 py-1 border-3 border-black bg-black text-white font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] transform rotate-2">
                                        DEVELOPER
                                    </div>
                                </div>

                                {/* Speech bubble */}
                                <div className="relative">
                                    {/* Bubble tail pointing to character */}
                                    <div className="absolute top-4 -left-6 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[24px] border-r-black"></div>
                                    <div className="absolute top-4 -left-4 w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-r-[22px] border-r-white"></div>

                                    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                                        <p className="text-xl font-black text-black leading-tight mb-3">
                                            "Where can I deploy my apps for FREE?"
                                        </p>
                                        <p className="text-base font-medium text-black/70">
                                            I need a platform that's actually free, no hidden costs...
                                        </p>
                                    </div>
                                </div>

                                {/* Thought lines */}
                                <div className="absolute -right-8 top-1/2 opacity-20">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1 h-1 bg-black rounded-full mb-2"
                                            style={{ marginLeft: `${i * 8}px` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Center - Impact Effect */}
                        <div className="lg:col-span-2 hidden lg:flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="relative"
                            >
                                {/* Speed lines */}
                                <div className="absolute inset-0 opacity-30">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute top-1/2 left-1/2 origin-left"
                                            style={{
                                                width: '60px',
                                                height: '2px',
                                                background: 'black',
                                                transform: `rotate(${i * 45}deg)`,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Center symbol */}
                                <div className="relative w-20 h-20 border-4 border-black bg-black flex items-center justify-center transform rotate-45">
                                    <ArrowRight className="h-10 w-10 text-white transform -rotate-45" strokeWidth={3} />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Character - Platform Response */}
                        <div className="lg:col-span-5 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="relative"
                            >
                                {/* Character avatar - right side */}
                                <div className="flex items-start gap-4 mb-4 justify-end">
                                    <div className="px-3 py-1 border-3 border-black bg-white font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                                        IDCLOUDLABS
                                    </div>
                                    <div className="w-16 h-16 border-4 border-black bg-black flex items-center justify-center flex-shrink-0 transform rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            <div className="text-white font-black text-2xl">ID</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Speech bubble - right aligned */}
                                <div className="relative">
                                    {/* Bubble tail pointing to character */}
                                    <div className="absolute top-4 -right-6 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[24px] border-l-black"></div>
                                    <div className="absolute top-4 -right-4 w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[22px] border-l-white"></div>

                                    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                                        <p className="text-xl font-black text-black leading-tight mb-3">
                                            "RIGHT HERE! Deploy instantly, scale infinitely!"
                                        </p>
                                        <p className="text-base font-medium text-black/70 mb-4">
                                            100% FREE PAAS. No credit card. No limits. Just deploy.
                                        </p>

                                        {/* Emphasized badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <div className="px-3 py-1 border-2 border-black bg-black text-white font-bold text-xs transform -rotate-1">
                                                ∞ SCALE
                                            </div>
                                            <div className="px-3 py-1 border-2 border-black bg-white font-bold text-xs transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                24/7 UPTIME
                                            </div>
                                            <div className="px-3 py-1 border-2 border-black bg-black text-white font-bold text-xs">
                                                $0 COST
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Excited effect */}
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute -top-6 -right-4 px-3 py-1 border-3 border-black bg-white font-black text-sm transform rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    FREE!
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* CTA Section - Bottom of conversation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        {/* Divider */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-1 w-24 bg-black"></div>
                            <div className="w-2 h-2 bg-black transform rotate-45"></div>
                            <div className="h-1 w-24 bg-black"></div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {auth.user ? (
                                <Link href={'/dashboard'} className="group">
                                    <div className="px-8 py-3 border-3 border-black bg-black text-white font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                        <span className="flex items-center gap-2">
                                            DASHBOARD
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ) : (
                                <>
                                    <Link href={'/register'} className="group">
                                        <div className="px-8 py-3 border-3 border-black bg-black text-white font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                            <span className="flex items-center gap-2">
                                                GET STARTED
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </Link>
                                    <Link href={'/login'} className="group">
                                        <div className="px-8 py-3 border-3 border-black bg-white text-black font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                            VIEW DEMO
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Hashtag */}
                        <div className="mt-6 inline-block px-4 py-1 border-2 border-black bg-white font-black text-xs uppercase tracking-wider transform -rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            #FREEPAAS
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                >
                    <span className="text-xs font-bold uppercase tracking-wider text-black/60">SCROLL</span>
                    <div className="border-2 border-black bg-white p-1.5">
                        <ChevronDown className="h-4 w-4 text-black" strokeWidth={2.5} />
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
