import { motion } from 'framer-motion';
import { MapPin, Package, Clock, ShieldCheck, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CateringFeature {
    icon: React.ElementType;
    title: string;
    description: string;
}

const cateringFeatures: CateringFeature[] = [
    {
        icon: Package,
        title: 'Paket Mingguan',
        description: 'Menu sudah diatur per hari dengan kalori yang tepat sesuai kebutuhan',
    },
    {
        icon: MapPin,
        title: 'Cari Terdekat',
        description: 'Temukan catering sehat terdekat dari lokasi Anda dengan maps integration',
    },
    {
        icon: Clock,
        title: 'Pengiriman Terjadwal',
        description: 'Makanan dikirim sesuai jadwal, fresh dan siap dikonsumsi',
    },
    {
        icon: ShieldCheck,
        title: 'Partner Terpercaya',
        description: 'Hanya bekerja sama dengan catering sehat bersertifikat',
    },
];

export default function PartnershipSection() {
    return (
        <section className="py-24 sm:py-32 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm mb-6">
                            <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="font-semibold text-green-600 dark:text-green-400">Fitur Pro</span>
                        </div> */}

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
                            Pesan{' '}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                Catering Sehat
                            </span>
                            <br />
                            Langsung dari App
                        </h2>

                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
                            Partnership dengan catering sehat terbaik seperti{' '}
                            <strong className="text-green-600 dark:text-green-400">Healthy Go</strong>. Menu sudah
                            dihitung kalorinya, tinggal pilih dan pesan!
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            {cateringFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="px-10 py-7 text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl"
                        >
                            <Crown className="h-5 w-5 mr-2" />
                            Lihat Paket Catering
                        </Button>
                    </motion.div>

                    {/* Right - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Mockup Catering Card */}
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-20 translate-x-20"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
                            </div>

                            <div className="relative space-y-4">
                                {/* Catering Package Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-orange-400 to-red-400"></div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg mb-1">Paket Diet Sehat</h4>
                                            <p className="text-sm text-muted-foreground">Healthy Go Catering</p>
                                            <div className="flex items-center gap-1 mt-2">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-600">2.5 km</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-green-600">450</div>
                                            <div className="text-xs text-muted-foreground">kkal</div>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-blue-600">30g</div>
                                            <div className="text-xs text-muted-foreground">protein</div>
                                        </div>
                                        <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-amber-600">45g</div>
                                            <div className="text-xs text-muted-foreground">karbo</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">Paket 7 hari</div>
                                        <div className="text-xl font-bold">Rp 350.000</div>
                                    </div>
                                </div>

                                {/* Another Package */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400"></div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg mb-1">Paket Bulking</h4>
                                            <p className="text-sm text-muted-foreground">FitMeal Catering</p>
                                            <div className="flex items-center gap-1 mt-2">
                                                <MapPin className="w-4 h-4 text-green-600" />
                                                <span className="text-sm font-medium text-green-600">4.2 km</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
