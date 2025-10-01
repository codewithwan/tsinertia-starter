import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface HeroSectionProps {
    className?: string;
}

// iPhone Mockup Component
function IPhoneMockup({ delay = 0, image }: { delay?: number; image: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            className="relative"
        >
            {/* iPhone Frame */}
            <div className="relative w-64 h-[520px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl border-8 border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                
                {/* Screen */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* App Screenshot placeholder */}
                    <div className={`w-full h-full ${image}`}></div>
                </div>
            </div>
        </motion.div>
    );
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <main className={`flex items-center justify-center min-h-[calc(100vh-80px)] py-12 sm:py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[1.1]"
                        >
                            Track Your{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                Nutrition
                            </span>
                            <br />
                            <span className="text-muted-foreground font-black">With AI Precision</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
                        >
                            Nutantra menggunakan{' '}
                            <strong className="text-green-600 dark:text-green-400 font-extrabold">AI Vision</strong> untuk{' '}
                            <strong className="text-foreground font-bold">mengidentifikasi makanan</strong> dan{' '}
                            <strong className="text-foreground font-bold">menghitung nutrisi</strong> secara{' '}
                            <strong className="text-green-600 dark:text-green-400 font-extrabold">akurat & otomatis</strong>
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button
                                size="lg"
                                className="px-10 sm:px-14 py-7 sm:py-8 text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all"
                                asChild
                            >
                                <Link href={'/download'}>
                                    <Download className="h-5 w-5 mr-2" />
                                    Download Sekarang
                                </Link>
                            </Button>
                            {auth.user && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="px-10 sm:px-14 py-7 sm:py-8 text-base sm:text-lg font-bold border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                    asChild
                                >
                                    <Link href={'/dashboard'}>
                                        <Smartphone className="h-5 w-5 mr-2" />
                                        Admin Dashboard
                                    </Link>
                                </Button>
                            )}
                        </motion.div>
                    </div>

                    {/* Right iPhone Mockups */}
                    <div className="hidden lg:flex justify-center items-center gap-4 relative h-[600px]">
                        {/* Center iPhone (Main) */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30">
                            <IPhoneMockup
                                delay={0.4}
                                image="bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400"
                            />
                        </div>
                        
                        {/* Left iPhone */}
                        <div className="absolute left-4 top-12 z-20 opacity-70 scale-90">
                            <IPhoneMockup
                                delay={0.6}
                                image="bg-gradient-to-br from-blue-400 via-cyan-400 to-sky-400"
                            />
                        </div>
                        
                        {/* Right iPhone */}
                        <div className="absolute right-4 top-12 z-20 opacity-70 scale-90">
                            <IPhoneMockup
                                delay={0.8}
                                image="bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}