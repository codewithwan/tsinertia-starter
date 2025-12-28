import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className={`relative py-32 ${className}`}>
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
                            Ready to ship your <br /> next <span className="italic">big idea</span>?
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Join developers building <span className="text-foreground font-semibold">faster</span> with the modern full-stack starter kit.
                        <span className="text-foreground font-semibold"> Minimalist</span>, <span className="text-foreground font-semibold">powerful</span>, and ready for whatever you throw at it.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        {auth.user ? (
                            <Button size="lg" className="px-10 h-14 text-lg" asChild>
                                <Link href={'/dashboard'}>
                                    Go to Dashboard
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button size="lg" className="px-10 h-14 text-lg" asChild>
                                    <Link href={'/register'}>
                                        Get Started Free
                                        <ArrowRight className="h-5 w-5 ml-2" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="ghost" className="px-10 h-14 text-lg" asChild>
                                    <Link href={'#home'}>
                                        Learn More
                                    </Link>
                                </Button>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
