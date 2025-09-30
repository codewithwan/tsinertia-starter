import { motion } from 'framer-motion';
import { Camera, Brain, ChartBar, Zap, Shield, Target } from 'lucide-react';

interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Camera,
        title: 'AI Food Recognition',
        description: 'Ambil foto makanan dan biarkan AI kami mengidentifikasi jenis makanan serta kandungan nutrisinya secara otomatis',
    },
    {
        icon: Brain,
        title: 'Smart Analysis',
        description: 'Dapatkan rekomendasi nutrisi personal berdasarkan kebutuhan tubuh dan target kesehatan Anda',
    },
    {
        icon: ChartBar,
        title: 'Detailed Analytics',
        description: 'Monitor perkembangan nutrisi dengan grafik interaktif harian, mingguan, dan bulanan',
    },
    {
        icon: Target,
        title: 'Goal Tracking',
        description: 'Tetapkan target nutrisi dan pantau progress Anda dengan reminder yang membantu',
    },
    {
        icon: Zap,
        title: 'Instant Results',
        description: 'Hasil analisis nutrisi dalam hitungan detik tanpa perlu input manual yang merepotkan',
    },
    {
        icon: Shield,
        title: 'Data Privacy',
        description: 'Data kesehatan Anda aman dengan enkripsi end-to-end dan privacy protection terbaik',
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-muted/30">
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
                        Fitur{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Unggulan
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                    >
                        Teknologi AI terdepan untuk tracking nutrisi yang lebih mudah dan akurat
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative h-full bg-background border-2 border-border rounded-3xl p-8 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                {/* Gradient Glow Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-4 shadow-lg">
                                        <feature.icon className="w-full h-full text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}