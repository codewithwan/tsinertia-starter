import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Smartphone, Check, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AppLogo from '@/components/app-logo';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';

export default function DownloadPage() {
    return (
        <>
            <Head title="Download Nutantra - AI Nutrition Tracker">
                <meta
                    name="description"
                    content="Download Nutantra APK untuk Android. Track nutrisi Anda dengan AI Vision secara gratis!"
                />
            </Head>

            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto px-4 sm:px-6 py-5 sm:py-6">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <AppLogo />
                            </div>
                            <div className="flex items-center gap-4">
                                <AppearanceToggleDropdown />
                                <Button variant="ghost" asChild>
                                    <Link href={'/'}>
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Kembali
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="max-w-6xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-black mb-4"
                            >
                                Download{' '}
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Nutantra
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
                            >
                                Mulai perjalanan hidup sehat Anda dengan tracking nutrisi powered by AI
                            </motion.p>
                        </div>

                        {/* Tip Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Tips Memilih Versi</h4>
                                    <p className="text-muted-foreground">
                                        Jika tidak yakin HP Anda tipe apa, pilih versi{' '}
                                        <strong className="text-green-600 dark:text-green-400">ARM64</strong> terlebih
                                        dahulu (untuk HP keluaran 2016 ke atas)
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Download Card - Green Gradient */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-12"
                        >
                            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* ARM64 - Recommended */}
                                        <div className="relative">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                                <div className="px-3 py-1 rounded-full bg-white text-green-600 text-xs font-bold shadow-lg flex items-center gap-1">
                                                    <Check className="h-3 w-3" />
                                                    Recommended
                                                </div>
                                            </div>
                                            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/50 hover:scale-105 transition-transform duration-300">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-3 mb-4">
                                                    <Smartphone className="w-full h-full text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">ARM64 (64-bit)</h3>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    HP modern (2016+)
                                                </p>
                                                <div className="text-sm text-muted-foreground mb-4">Size: 18.2 MB</div>
                                                <Button
                                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold"
                                                    asChild
                                                >
                                                    <a href="/apk/app-arm64-v8a-release.apk" download>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* ARMv7 */}
                                        <div>
                                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300 h-full">
                                                <div className="w-12 h-12 rounded-xl bg-muted p-3 mb-4">
                                                    <Smartphone className="w-full h-full text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">ARMv7 (32-bit)</h3>
                                                <p className="text-sm text-muted-foreground mb-3">HP lama (32-bit)</p>
                                                <div className="text-sm text-muted-foreground mb-4">Size: 15.9 MB</div>
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                                    asChild
                                                >
                                                    <a href="/apk/app-armeabi-v7a-release.apk" download>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* x86_64 */}
                                        <div>
                                            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-gray-900/90 transition-all duration-300 h-full">
                                                <div className="w-12 h-12 rounded-xl bg-muted p-3 mb-4">
                                                    <Smartphone className="w-full h-full text-green-600" />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">x86_64</h3>
                                                <p className="text-sm text-muted-foreground mb-3">Emulator & Tablet</p>
                                                <div className="text-sm text-muted-foreground mb-4">Size: 19.4 MB</div>
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                                                    asChild
                                                >
                                                    <a href="/apk/app-x86_64-release.apk" download>
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coming Soon Badge */}
                                    <div className="mt-8 text-center">
                                        <p className="text-white/90 font-medium">
                                            Segera hadir di <strong>Google Play Store</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Features & System Requirements - Side by Side */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Features Highlight */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-background border-2 border-border rounded-2xl p-8"
                            >
                                <h3 className="text-2xl font-bold mb-6">Yang Anda Dapatkan</h3>
                                <div className="space-y-3">
                                    {[
                                        'AI Food Recognition',
                                        '3 Scan Gratis per Hari',
                                        'Analytics Dashboard',
                                        'Free Trial Meal Plan 1 Minggu',
                                        'BMI & Health Tracking',
                                        'Food Library Database',
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* System Requirements */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="bg-background border-2 border-border rounded-2xl p-8"
                            >
                                <h3 className="text-2xl font-bold mb-6">System Requirements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">
                                            Android 6.0 (Marshmallow) atau lebih tinggi
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">Minimal 100 MB storage kosong</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">Kamera dengan minimal 5 MP</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">Koneksi internet untuk AI processing</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Installation Guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-12 bg-background border-2 border-border rounded-2xl p-8"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2">Cara Install APK di Android</h3>
                                    <p className="text-muted-foreground">
                                        Ikuti langkah berikut untuk install Nutantra di HP Anda
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        step: '1',
                                        text: 'Download file APK sesuai dengan tipe HP Anda',
                                    },
                                    {
                                        step: '2',
                                        text: 'Buka Settings → Security, aktifkan "Install from Unknown Sources"',
                                    },
                                    {
                                        step: '3',
                                        text: 'Buka file APK yang sudah di-download',
                                    },
                                    {
                                        step: '4',
                                        text: 'Klik Install dan tunggu sampai selesai',
                                    },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-bold">{item.step}</span>
                                        </div>
                                        <p className="text-muted-foreground mt-1">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </>
    );
}