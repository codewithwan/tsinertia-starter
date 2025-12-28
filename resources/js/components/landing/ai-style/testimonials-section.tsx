import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    content: string;
    initials: string;
    rating: number;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Miller",
        role: "Senior Web Developer",
        content: "Absolute time saver! I used to spend hours setting up auth and middleware, now I can focus purely on business logic. The best starter kit out there.",
        initials: "SM",
        rating: 5,
        avatar: "/assets/illustrations/char/girl (1).png"
    },
    {
        name: "Alex Rivera",
        role: "Startup Founder",
        content: "The landing page is insane. Premium quality. Investors were impressed by the MVP demo I built in days using this kit. Incredible speed to market!",
        initials: "AR",
        rating: 5,
        avatar: "/assets/illustrations/char/boy (1).png"
    },
    {
        name: "Emily Chen",
        role: "UI/UX Designer",
        content: "Not just functional, but the visuals are top-tier. The framer-motion animations are buttery smooth. It feels like a world-class application.",
        initials: "EC",
        rating: 4,
        avatar: "/assets/illustrations/char/girl (2).png"
    },
    {
        name: "David Wilson",
        role: "Full-stack Engineer",
        content: "Inertia v2 integration is flawless. The prefetching and polling features make the app feel like a real SPA while staying SEO friendly. Love it!",
        initials: "DW",
        rating: 5,
        avatar: "/assets/illustrations/char/boy (2).png"
    },
    {
        name: "Michael Ross",
        role: "Freelance Developer",
        content: "Amazing! The built-in admin dashboard is very complete. Getting dark mode and profile settings out of the box saved me so much work.",
        initials: "MR",
        rating: 5,
        avatar: "/assets/illustrations/char/boy (3).png"
    },
    {
        name: "Jessica Lane",
        role: "Product Manager",
        content: "Was looking for a kit that wasn't bloated, and found TSInertia. The TypeScript support is solid, which means fewer bugs during development.",
        initials: "JL",
        rating: 4,
        avatar: "/assets/illustrations/char/girl (3).png"
    }
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative py-32 overflow-hidden border-y border-border/10">
            {/* Background elements matched to AI Style */}
            <div className="absolute inset-0 bg-background"></div>
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6"
                    >
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Trust & Reliability</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6"
                    >
                        What Developers <span className="text-primary italic">Say?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        Join <span className="text-foreground font-semibold">thousands of developers</span> and founders building <span className="text-foreground font-semibold">high-performance applications</span> with TSInertia.
                    </motion.p>
                </div>

                {/* Bento Grid layout for Testimonials */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                type: "spring",
                                stiffness: 50,
                                damping: 20,
                                delay: i * 0.1
                            }}
                            className="break-inside-avoid relative group p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-xl shadow-black/5"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative z-10">
                                {/* Rating/Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star
                                                key={starI}
                                                size={12}
                                                className={starI < t.rating ? "text-primary fill-primary" : "text-muted-foreground/20"}
                                            />
                                        ))}
                                    </div>
                                    <Quote size={24} className="text-primary/10 rotate-180" />
                                </div>

                                {/* Content */}
                                <p className="text-foreground leading-relaxed italic mb-8">
                                    "{t.content}"
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 border-t border-border/10 pt-6">
                                    <div className="w-12 h-12 rounded-full bg-muted border border-border/50 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground text-sm uppercase tracking-tight">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
