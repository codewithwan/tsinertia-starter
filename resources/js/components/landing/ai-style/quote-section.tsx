import { motion } from 'framer-motion';

interface QuoteSectionProps {
    className?: string;
}

export default function QuoteSection({ className = '' }: QuoteSectionProps) {
    return (
        <section className={`py-16 bg-gradient-to-r from-muted/50 to-muted/30 ${className}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="text-6xl text-primary/20 mb-4 font-serif">"</div>
                    <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-foreground mb-6 leading-relaxed">
                        The <strong className="text-primary">future</strong> of business is <strong className="text-foreground">AI-powered</strong> and <strong className="text-primary">data-driven</strong>
                    </blockquote>
                    <cite className="text-lg text-muted-foreground font-medium">
                        — <strong className="text-foreground">AI Industry Leaders</strong>, Technology Visionaries
                    </cite>
                    <div className="mt-8 text-sm text-muted-foreground italic">
                        Every <strong className="text-primary">AI SaaS</strong> you build today shapes <strong className="text-foreground">tomorrow's digital economy</strong>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
