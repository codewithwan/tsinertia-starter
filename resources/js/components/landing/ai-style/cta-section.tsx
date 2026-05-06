import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className={`relative py-32 ${className}`}>
            <div className="container mx-auto px-6">
                <div className="mx-auto max-w-4xl space-y-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                            Ready to ship your <br /> next <span className="italic">big idea</span>?
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl text-xl text-muted-foreground"
                    >
                        Join developers building <span className="font-semibold text-foreground">faster</span> with the modern full-stack starter kit.
                        <span className="font-semibold text-foreground"> Minimalist</span>,{' '}
                        <span className="font-semibold text-foreground">powerful</span>, and ready for whatever you throw at it.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        {auth.user ? (
                            <Button size="lg" className="h-14 px-10 text-lg" asChild>
                                <Link href={'/dashboard'}>
                                    Go to Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button size="lg" className="h-14 px-10 text-lg" asChild>
                                    <Link href={'/register'}>
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="ghost" className="h-14 px-10 text-lg" asChild>
                                    <Link href={'#home'}>Learn More</Link>
                                </Button>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
