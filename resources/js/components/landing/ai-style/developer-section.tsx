import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeveloperSectionProps {
    className?: string;
}

export default function DeveloperSection({ className = '' }: DeveloperSectionProps) {
    return (
        <section id="developers" className={`relative py-32 overflow-hidden ${className}`}>
            {/* Consistent AI Background */}
            <div className="absolute inset-0 bg-background"></div>
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }}></div>

            {/* Ambient Glows matched to other sections */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Behind the Code</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                        Development <span className="italic">Team</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Meet the <span className="text-foreground font-semibold">passionate developers</span> who built this <span className="text-foreground font-semibold">modern starter kit</span> to help you ship faster.
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    {/* Simplified Natural Flow Layout */}
                    <div className="flex flex-col gap-12 sm:gap-16">

                        {/* 1. Speech Bubbles Section */}
                        <div className="flex flex-col gap-8 w-full">
                            {/* Bubble 1: Ridwan */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-start md:pl-[10%]"
                            >
                                <div className="max-w-xs md:max-w-md bg-background/40 backdrop-blur-xl border border-border/50 p-6 rounded-3xl rounded-bl-none shadow-2xl relative">
                                    <Quote className="absolute -top-3 -left-3 size-8 text-primary/20" />
                                    <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                                        "I'm so tired of setting up auth... and these hosting bills are killing me. I wish I could just reincarnate as a Slime."
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bubble 2: Aziz */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-end md:pr-[10%]"
                            >
                                <div className="max-w-xs md:max-w-md bg-background/60 backdrop-blur-xl border border-primary/20 p-6 rounded-3xl rounded-br-none shadow-2xl relative">
                                    <Quote className="absolute -top-3 -right-3 size-8 text-primary/20 rotate-180" />
                                    <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                                        "Hold on! If you become a slime, who's gonna fix the CSS? At least build a starter kit first so we can both relax!"
                                    </p>
                                </div>
                            </motion.div>

                            {/* Bubble 3: Ridwan Again */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-start md:pl-[15%]"
                            >
                                <div className="max-w-xs md:max-w-md bg-primary/10 backdrop-blur-xl border border-primary/30 p-6 rounded-3xl rounded-bl-none shadow-2xl relative">
                                    <p className="text-xl md:text-2xl font-bold text-foreground leading-tight italic">
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
                            className="flex flex-col md:flex-row justify-around items-center gap-12 pt-8 border-t border-border/20"
                        >

                            {/* Portrait 1: Ridwan */}
                            <div className="flex flex-col items-center group text-center">
                                <div className="relative w-32 h-32 md:w-44 md:h-44 group-hover:scale-105 transition-transform duration-500">
                                    {/* Premium Circular Border */}
                                    <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-primary/20 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute -inset-0.5 border-2 border-primary/20 rounded-full"></div>

                                    <div className="relative w-full h-full bg-muted/30 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                                        <img src="/assets/illustrations/char/boy (4).png" className="w-full h-full object-cover -scale-x-100 transition-all duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">codewithwan</span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-foreground tracking-tight mt-4">codewithwan</h4>
                                <p className="text-xs text-muted-foreground font-mono max-w-[220px] mt-2">dev yang pengen reinkarnasi jadi slime biar ga usah bayar tagihan hosting</p>
                            </div>

                            {/* Portrait 2: Aziz */}
                            <div className="flex flex-col items-center group text-center">
                                <div className="relative w-32 h-32 md:w-44 md:h-44 group-hover:scale-105 transition-transform duration-500">
                                    {/* Premium Circular Border */}
                                    <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-primary/20 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="absolute -inset-0.5 border-2 border-primary/20 rounded-full"></div>

                                    <div className="relative w-full h-full bg-muted/30 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                                        <img src="/assets/illustrations/char/boy (5).png" className="w-full h-full object-cover transition-all duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">tahu cryptsi</span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-foreground tracking-tight mt-4">Tahu Cryptsi</h4>
                                <p className="text-xs text-muted-foreground font-mono max-w-[220px] mt-2">pemain cr yang katanya jago main 2.6 tapi thropy dibawah 10k</p>
                            </div>

                        </motion.div>
                    </div>
                </div>

                {/* Final Simple Badge */}
                <div className="mt-32 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-background rounded-full font-bold text-sm uppercase tracking-widest shadow-xl">
                        <span>Join our Adventure</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
