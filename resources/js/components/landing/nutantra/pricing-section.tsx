import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, Zap, Crown } from 'lucide-react';

interface PricingTier {
    name: string;
    price: string;
    period: string;
    description: string;
    features: Array<{ text: string; included: boolean }>;
    cta: string;
    popular?: boolean;
    icon: React.ElementType;
}

const pricingTiers: PricingTier[] = [
    {
        name: 'Free',
        price: 'Rp 0',
        period: 'Selamanya',
        description: 'Untuk memulai perjalanan hidup sehat Anda',
        icon: Zap,
        cta: 'Mulai Gratis',
        features: [
            { text: '3 scan makanan per hari', included: true },
            { text: 'AI Food Recognition', included: true },
            { text: 'Basic calorie tracking', included: true },
            { text: 'Grafik nutrisi harian', included: true },
            { text: 'Free trial meal plan 1 minggu', included: true },
            { text: 'Unlimited scan', included: false },
            { text: 'Konsultasi ahli gizi', included: false },
            { text: 'Advanced analytics', included: false },
            { text: 'Catering sehat integration', included: false },
        ],
    },
    {
        name: 'Pro',
        price: 'Rp 49.000',
        period: 'Per bulan',
        description: 'Untuk tracking nutrisi tanpa batas dengan fitur lengkap',
        icon: Crown,
        popular: true,
        cta: 'Upgrade ke Pro',
        features: [
            { text: 'Unlimited scan makanan', included: true },
            { text: 'AI Food Recognition prioritas', included: true },
            { text: 'Smart meal planning harian', included: true },
            { text: 'Menu lengkap (pagi, siang, malam)', included: true },
            { text: 'Konsultasi realtime dengan ahli', included: true },
            { text: 'Video call consultation', included: true },
            { text: 'Pesan catering sehat', included: true },
            { text: 'Advanced analytics & reports', included: true },
            { text: 'Export data nutrisi', included: true },
        ],
    },
];

export default function PricingSection() {
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
                        Pilih{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Plan
                        </span>{' '}
                        Anda
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                    >
                        Mulai gratis, upgrade kapan saja untuk fitur lengkap
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative ${tier.popular ? 'md:-mt-4' : ''}`}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-bold shadow-lg">
                                        Paling Populer
                                    </div>
                                </div>
                            )}

                            {/* Pricing Card */}
                            <div
                                className={`relative bg-background border-2 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 h-full ${
                                    tier.popular
                                        ? 'border-green-500 shadow-xl scale-105 md:scale-110'
                                        : 'border-border hover:border-green-500/30'
                                }`}
                            >
                                {/* Background Glow for Popular */}
                                {tier.popular && (
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 opacity-5 blur-xl" />
                                )}

                                <div className="relative">
                                    {/* Icon & Plan Name */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl ${
                                                tier.popular
                                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                                                    : 'bg-muted'
                                            } p-2.5 flex items-center justify-center`}
                                        >
                                            <tier.icon
                                                className={`w-full h-full ${tier.popular ? 'text-white' : 'text-green-600'}`}
                                            />
                                        </div>
                                        <h3 className="text-2xl font-black">{tier.name}</h3>
                                    </div>

                                    <p className="text-muted-foreground mb-6">{tier.description}</p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                                {tier.price}
                                            </span>
                                            <span className="text-muted-foreground font-medium">/{tier.period}</span>
                                        </div>
                                        {tier.name === 'Pro' && (
                                            <div className="text-sm text-muted-foreground mt-2">
                                                atau Rp 499.000/tahun <span className="text-green-600 font-semibold">(hemat 15%)</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        size="lg"
                                        className={`w-full mb-8 font-bold ${
                                            tier.popular
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg'
                                                : 'bg-muted text-foreground hover:bg-muted/80'
                                        }`}
                                    >
                                        {tier.cta}
                                    </Button>

                                    {/* Features List */}
                                    <ul className="space-y-4">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                    </div>
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <X className="w-3 h-3 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <span
                                                    className={
                                                        feature.included
                                                            ? 'text-foreground font-medium'
                                                            : 'text-muted-foreground line-through'
                                                    }
                                                >
                                                    {feature.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Payment Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground font-medium">
                        Pembayaran aman via Midtrans  •  ✓ Cancel kapan saja  •  ✓ Money-back guarantee
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
