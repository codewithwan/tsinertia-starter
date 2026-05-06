import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface DeveloperSectionProps {
    className?: string;
}

export default function DeveloperSection({ className = '' }: DeveloperSectionProps) {
    return (
        <section id="developers" className={`relative overflow-hidden py-32 ${className}`}>
            {/* Consistent AI Background */}
            <div className="absolute inset-0 bg-background"></div>
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            ></div>

            {/* Ambient Glows matched to other sections */}
            <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>
            <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"></div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Behind the Code</span>
                    </div>
                    <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Development <span className="italic">Team</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Meet the <span className="font-semibold text-foreground">passionate developers</span> who built this{' '}
                        <span className="font-semibold text-foreground">modern starter kit</span> to help you ship faster.
                    </p>
                </motion.div>

                <div className="mx-auto max-w-5xl">
                    {/* Simplified Natural Flow Layout */}
                    <div className="flex flex-col gap-12 sm:gap-16">
                        {/* 1. Speech Bubbles Section */}
                        <div className="flex w-full flex-col gap-8">
                            {/* Bubble 1: Ridwan */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="flex w-full justify-start md:pl-[10%]"
                            >
                                <div className="relative max-w-xs rounded-3xl rounded-bl-none border border-border/50 bg-background/40 p-6 shadow-2xl backdrop-blur-xl md:max-w-md">
                                    <Quote className="absolute -top-3 -left-3 size-8 text-primary/20" />
                                    <p className="text-lg leading-relaxed font-medium text-foreground md:text-xl">
                                        "I'm so tired of setting up auth... and these hosting bills are killing me. I wish I could just reincarnate as
                                        a Slime."
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bubble 2: Aziz */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="flex w-full justify-end md:pr-[10%]"
                            >
                                <div className="relative max-w-xs rounded-3xl rounded-br-none border border-primary/20 bg-background/60 p-6 shadow-2xl backdrop-blur-xl md:max-w-md">
                                    <Quote className="absolute -top-3 -right-3 size-8 rotate-180 text-primary/20" />
                                    <p className="text-lg leading-relaxed font-medium text-foreground md:text-xl">
                                        "Hold on! If you become a slime, who's gonna fix the CSS? At least build a starter kit first so we can both
                                        relax!"
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bubble 3: Ridwan Again */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="flex w-full justify-start md:pl-[15%]"
                            >
                                <div className="relative max-w-xs rounded-3xl rounded-bl-none border border-primary/30 bg-primary/10 p-6 shadow-2xl backdrop-blur-xl md:max-w-md">
                                    <p className="text-xl leading-tight font-bold text-foreground italic md:text-2xl">
                                        "Fine, let's ship TSInertia Starter, then I'm off to find Rimuru! 💨"
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* 2. Character Portraits Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center justify-around gap-12 border-t border-border/20 pt-8 md:flex-row"
                        >
                            {/* Portrait 1: Ridwan */}
                            <div className="group flex flex-col items-center text-center">
                                <div className="relative h-32 w-32 transition-transform duration-500 group-hover:scale-105 md:h-44 md:w-44">
                                    {/* Premium Circular Border */}
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary to-primary/20 opacity-20 blur-sm transition-opacity group-hover:opacity-40"></div>
                                    <div className="absolute -inset-0.5 rounded-full border-2 border-primary/20"></div>

                                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted/30 shadow-2xl backdrop-blur-md">
                                        <img
                                            src="/assets/illustrations/char/boy (4).png"
                                            className="h-full w-full -scale-x-100 object-cover transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="text-[10px] font-bold tracking-wider text-white uppercase">codewithwan</span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mt-4 text-xl font-bold tracking-tight text-foreground">codewithwan</h4>
                                <p className="mt-2 max-w-[220px] font-mono text-xs text-muted-foreground">
                                    dev yang pengen reinkarnasi jadi slime biar ga usah bayar tagihan hosting
                                </p>
                            </div>

                            {/* Portrait 2: Aziz */}
                            <div className="group flex flex-col items-center text-center">
                                <div className="relative h-32 w-32 transition-transform duration-500 group-hover:scale-105 md:h-44 md:w-44">
                                    {/* Premium Circular Border */}
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary to-primary/20 opacity-20 blur-sm transition-opacity group-hover:opacity-40"></div>
                                    <div className="absolute -inset-0.5 rounded-full border-2 border-primary/20"></div>

                                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-border/50 bg-muted/30 shadow-2xl backdrop-blur-md">
                                        <img
                                            src="/assets/illustrations/char/boy (5).png"
                                            className="h-full w-full object-cover transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="text-[10px] font-bold tracking-wider text-white uppercase">tahu cryptsi</span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mt-4 text-xl font-bold tracking-tight text-foreground">Tahu Cryptsi</h4>
                                <p className="mt-2 max-w-[220px] font-mono text-xs text-muted-foreground">
                                    pemain cr yang katanya jago main 2.6 tapi thropy dibawah 10k
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Final Simple Badge */}
                <div className="mt-32 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2 text-sm font-bold tracking-widest text-background uppercase shadow-xl">
                        <span>Join our Adventure</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
