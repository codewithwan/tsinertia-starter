import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Smartphone, Apple } from 'lucide-react';
import { FaGooglePlay } from 'react-icons/fa';

export default function CtaSection() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 sm:p-12 md:p-16"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-6"
                        >
                            <Smartphone className="h-4 w-4" />
                            <span className="font-semibold">Available Now</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
                        >
                            Mulai Perjalanan{' '}
                            <br className="hidden sm:block" />
                            Hidup Sehat Anda
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto"
                        >
                            Download Nutantra sekarang dan rasakan kemudahan tracking nutrisi dengan teknologi AI
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <Button
                                size="lg"
                                className="px-8 py-6 text-base sm:text-lg bg-white text-green-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
                            >
                                <FaGooglePlay className="h-5 w-5 mr-2" />
                                Download di Play Store
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="px-8 py-6 text-base sm:text-lg bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-xl"
                            >
                                <Apple className="h-5 w-5 mr-2" />
                                Segera di App Store
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-8 text-white/80 text-sm"
                        >
                            <p>✓ Gratis selamanya  •  ✓ Tanpa iklan  •  ✓ Privacy terjamin</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
