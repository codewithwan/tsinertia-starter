import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
// import { dashboard, register } from '@/routes';

interface CTASectionProps {
    className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <section className={`py-24 ${className}`}>
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-foreground mb-4"
                >
                    Ready to Launch Your AI SaaS?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto"
                >
                    Join thousands of entrepreneurs who are already building successful AI SaaS businesses with our template
                </motion.p>

                {/* Hashtag di CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <div className="text-xl sm:text-2xl font-mono font-bold text-primary">
                        #buildwithai
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    {auth.user ? (
                        <Button size="lg" className="px-8 py-4 text-lg" asChild>
                            <Link href={'/dashboard'}>
                                <Play className="h-5 w-5 mr-2" />
                                Launch Your SaaS
                            </Link>
                        </Button>
                    ) : (
                        <Button size="lg" className="px-8 py-4 text-lg" asChild>
                            <Link href={'/register'}>
                                <Play className="h-5 w-5 mr-2" />
                                Start Building
                            </Link>
                        </Button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
