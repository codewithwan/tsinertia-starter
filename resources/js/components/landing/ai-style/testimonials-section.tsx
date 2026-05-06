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
        name: 'Sarah Miller',
        role: 'Senior Web Developer',
        content:
            'Absolute time saver! I used to spend hours setting up auth and middleware, now I can focus purely on business logic. The best starter kit out there.',
        initials: 'SM',
        rating: 5,
        avatar: '/assets/illustrations/char/girl (1).png',
    },
    {
        name: 'Alex Rivera',
        role: 'Startup Founder',
        content:
            'The landing page is insane. Premium quality. Investors were impressed by the MVP demo I built in days using this kit. Incredible speed to market!',
        initials: 'AR',
        rating: 5,
        avatar: '/assets/illustrations/char/boy (1).png',
    },
    {
        name: 'Emily Chen',
        role: 'UI/UX Designer',
        content:
            'Not just functional, but the visuals are top-tier. The framer-motion animations are buttery smooth. It feels like a world-class application.',
        initials: 'EC',
        rating: 4,
        avatar: '/assets/illustrations/char/girl (2).png',
    },
    {
        name: 'David Wilson',
        role: 'Full-stack Engineer',
        content:
            'Inertia v2 integration is flawless. The prefetching and polling features make the app feel like a real SPA while staying SEO friendly. Love it!',
        initials: 'DW',
        rating: 5,
        avatar: '/assets/illustrations/char/boy (2).png',
    },
    {
        name: 'Michael Ross',
        role: 'Freelance Developer',
        content:
            'Amazing! The built-in admin dashboard is very complete. Getting dark mode and profile settings out of the box saved me so much work.',
        initials: 'MR',
        rating: 5,
        avatar: '/assets/illustrations/char/boy (3).png',
    },
    {
        name: 'Jessica Lane',
        role: 'Product Manager',
        content:
            "Was looking for a kit that wasn't bloated, and found TSInertia. The TypeScript support is solid, which means fewer bugs during development.",
        initials: 'JL',
        rating: 4,
        avatar: '/assets/illustrations/char/girl (3).png',
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative overflow-hidden border-y border-border/10 py-32">
            {/* Background elements matched to AI Style */}
            <div className="absolute inset-0 bg-background"></div>
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            ></div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1"
                    >
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Trust & Reliability</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
                    >
                        What Developers <span className="text-primary italic">Say?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg text-muted-foreground"
                    >
                        Join <span className="font-semibold text-foreground">thousands of developers</span> and founders building{' '}
                        <span className="font-semibold text-foreground">high-performance applications</span> with TSInertia.
                    </motion.p>
                </div>

                {/* Bento Grid layout for Testimonials */}
                <div className="columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                type: 'spring',
                                stiffness: 50,
                                damping: 20,
                                delay: i * 0.1,
                            }}
                            className="group relative break-inside-avoid rounded-3xl border border-border/50 bg-background/40 p-8 shadow-xl shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:border-primary/30"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 right-12 left-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

                            <div className="relative z-10">
                                {/* Rating/Header */}
                                <div className="mb-6 flex items-start justify-between">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star
                                                key={starI}
                                                size={12}
                                                className={starI < t.rating ? 'fill-primary text-primary' : 'text-muted-foreground/20'}
                                            />
                                        ))}
                                    </div>
                                    <Quote size={24} className="rotate-180 text-primary/10" />
                                </div>

                                {/* Content */}
                                <p className="mb-8 leading-relaxed text-foreground italic">"{t.content}"</p>

                                {/* User Info */}
                                <div className="flex items-center gap-4 border-t border-border/10 pt-6">
                                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold tracking-tight text-foreground uppercase">{t.name}</p>
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
