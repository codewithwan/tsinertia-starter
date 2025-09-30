import { motion } from 'framer-motion';
import { Camera, Scan, LineChart, CheckCircle } from 'lucide-react';

interface Step {
    icon: React.ElementType;
    number: string;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: Camera,
        number: '01',
        title: 'Ambil Foto Makanan',
        description: 'Cukup foto makanan Anda dengan kamera smartphone. AI kami siap menganalisis dengan cepat dan akurat.',
    },
    {
        icon: Scan,
        number: '02',
        title: 'AI Mengidentifikasi',
        description: 'AI Vision kami akan mengenali jenis makanan dan porsinya dalam hitungan detik menggunakan deep learning.',
    },
    {
        icon: LineChart,
        number: '03',
        title: 'Lihat Analisis Nutrisi',
        description: 'Dapatkan rincian lengkap kalori, protein, karbohidrat, dan lemak dengan visualisasi yang mudah dipahami.',
    },
    {
        icon: CheckCircle,
        number: '04',
        title: 'Track Progress Anda',
        description: 'Monitor perkembangan nutrisi harian dan capai target kesehatan dengan insights yang actionable.',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-24 sm:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 sm:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
                    >
                        Cara{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Kerja
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                    >
                        Hanya 4 langkah sederhana untuk mulai tracking nutrisi Anda
                    </motion.p>
                </div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Connection Line - Desktop only */}
                    <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-1">
                        <div className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-full opacity-30"></div>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Step Card */}
                                <div className="relative bg-background border-2 border-border rounded-3xl p-8 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
                                    {/* Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                                        <span className="text-white font-black text-lg">{step.number}</span>
                                    </div>

                                    {/* Icon */}
                                    <div className="inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-5 shadow-xl mb-6">
                                        <step.icon className="w-full h-full text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                                    {/* Decorative Element */}
                                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                {/* Arrow Connector - Desktop only */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-20 -right-4 w-8 h-8 z-20">
                                        <div className="w-0 h-0 border-t-[16px] border-b-[16px] border-l-[20px] border-transparent border-l-green-500/30"></div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-muted-foreground font-medium">
                        Siap untuk memulai? Download Nutantra sekarang!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}