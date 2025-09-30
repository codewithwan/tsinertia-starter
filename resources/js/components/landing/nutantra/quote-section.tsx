import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "Nutantra benar-benar mengubah cara saya tracking nutrisi. AI-nya sangat akurat dan mudah digunakan. Sekarang saya bisa fokus pada kesehatan tanpa ribet menghitung kalori manual.",
        author: "Dr. Sarah Williams",
        role: "Nutritionist",
        company: "Health Plus Clinic",
        avatar: "/assets/avatar/girl2.png",
    },
    {
        quote: "Sebagai atlet, tracking nutrisi sangat penting untuk performa saya. Nutantra memberikan analisis yang detail dan rekomendasi yang tepat sasaran. Highly recommended!",
        author: "Marcus Johnson",
        role: "Professional Athlete",
        company: "Team Indonesia",
        avatar: "/assets/avatar/boy1.png",
    },
    {
        quote: "Aplikasi ini sangat membantu saya yang sibuk dengan pekerjaan. Cukup foto makanan, langsung dapat analisis nutrisi lengkap. Time-saving banget!",
        author: "Lisa Chen",
        role: "Marketing Director",
        company: "TechCorp",
        avatar: "/assets/avatar/girl1.png",
    },
];

export default function QuoteSection() {
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
                        Kata{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            Mereka
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                    >
                        Testimoni dari pengguna yang sudah merasakan manfaat Nutantra
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group"
                        >
                            {/* Testimonial Card */}
                            <div className="relative bg-background border-2 border-border rounded-3xl p-8 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
                                {/* Quote Icon */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                                    <Quote className="h-6 w-6 text-white" />
                                </div>

                                {/* Quote Text */}
                                <blockquote className="text-lg leading-relaxed mb-6 font-medium italic">
                                    "{testimonial.quote}"
                                </blockquote>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-green-500/20 group-hover:border-green-500/50 transition-colors">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 scale-x-[-1]"
                                        />
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-bold text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-muted-foreground font-medium">
                                            {testimonial.role}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Decorative Element */}
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Stats */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                            10,000+ pengguna puas dengan Nutantra
                        </span>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
}