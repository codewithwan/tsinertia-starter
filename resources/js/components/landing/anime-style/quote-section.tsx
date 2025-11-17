import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    return (
        <section className={`relative py-32 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                    backgroundSize: '10px 10px'
                }}></div>
            </div>

            {/* Manga panel borders top/bottom */}
            <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>

            <div className="container mx-auto px-6 relative">
                <div className="max-w-6xl mx-auto">
                    {/* Manga Character Speaking Layout */}
                    <div className="grid md:grid-cols-12 gap-8 items-start">
                        {/* Character Avatar - Left Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="md:col-span-3 flex justify-center md:justify-end"
                        >
                            <div className="relative">
                                {/* Character placeholder - nanti bisa diganti */}
                                <div className="w-32 h-32 md:w-40 md:h-40 border-6 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-3">
                                    {/* Halftone bg */}
                                    <div className="absolute inset-0 opacity-[0.05]" style={{
                                        backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                                        backgroundSize: '8px 8px'
                                    }}></div>

                                    {/* Icon user - nanti bisa diganti gambar character */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <User className="w-20 h-20 md:w-24 md:h-24 text-black" strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Name tag */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 border-3 border-black bg-black text-white font-black text-xs uppercase tracking-wider whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
                                    DEVELOPER
                                </div>

                                {/* Impact lines behind character */}
                                <div className="absolute -inset-6 -z-10 opacity-10">
                                    {[...Array(8)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute top-1/2 left-1/2 origin-left"
                                            style={{
                                                width: '100px',
                                                height: '3px',
                                                background: 'black',
                                                transform: `rotate(${i * 45}deg)`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Speech Bubble - Right Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="md:col-span-9"
                        >
                            <div className="relative">
                                {/* Speech bubble tail */}
                                <div className="absolute top-12 -left-6 w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[30px] border-r-black"></div>
                                <div className="absolute top-12 -left-4 w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-r-[28px] border-r-white"></div>

                                {/* Main speech bubble */}
                                <div className="border-4 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                                    {/* Cross-hatch pattern */}
                                    <div className="absolute top-4 right-4 w-20 h-20 opacity-5" style={{
                                        backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 2px, transparent 0, transparent 6px)',
                                    }}></div>

                                    {/* Quote text - manga style */}
                                    <div className="relative">
                                        {/* Opening quote mark */}
                                        <div className="absolute -top-4 -left-4 text-6xl font-black text-black/20">"</div>

                                        <p className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-black relative z-10">
                                            This platform is <span className="inline-block px-3 py-1 bg-black text-white transform -rotate-1">AMAZING!</span>
                                            <br />
                                            Deploy apps in seconds, <span className="underline decoration-4 underline-offset-4">NO COST!</span>
                                        </p>

                                        {/* Closing quote mark */}
                                        <div className="absolute -bottom-4 -right-4 text-6xl font-black text-black/20">"</div>
                                    </div>

                                    {/* Manga emphasis sfx */}
                                    <div className="mt-6 flex gap-3 items-center">
                                        <div className="px-4 py-2 border-3 border-black bg-white font-black text-sm transform -rotate-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                                            ★ IMPRESSED
                                        </div>
                                        <div className="px-4 py-2 border-3 border-black bg-black text-white font-black text-sm transform rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                                            FREE FOREVER
                                        </div>
                                    </div>
                                </div>

                                {/* Sound effect text - typical manga */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="absolute -top-6 -right-6 px-4 py-2 border-4 border-black bg-white font-black text-2xl transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    WOW!
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
