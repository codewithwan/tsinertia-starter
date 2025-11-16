import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 py-2 hover:bg-muted/30 transition-colors cursor-pointer"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground pr-4">
                        {question}
                    </h3>
                    <div className="flex-shrink-0">
                        {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                    </div>
                </div>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="px-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {answer}
                    </p>
                </div>
            </motion.div>
        </Card>
    );
};

interface FAQSectionProps {
    className?: string;
}

export default function FAQSection({ className = '' }: FAQSectionProps) {
    const leftFaqs = [
        {
            question: "Is it really free?",
            answer: "Yes! Our platform is completely free to use. No credit card required, no hidden fees. Start building and deploying your applications right away."
        },
        {
            question: "What can I build on this platform?",
            answer: "You can deploy any type of application - web apps, APIs, microservices, and more. The platform supports multiple programming languages and frameworks."
        },
        {
            question: "Are there any limits?",
            answer: "Our free tier includes generous resources to get you started. You can deploy multiple applications and scale as needed."
        },
        {
            question: "How do I get started?",
            answer: "Simply sign up for a free account and start deploying. No complex setup or configuration required."
        }
    ];

    const rightFaqs = [
        {
            question: "What technologies are supported?",
            answer: "We support a wide range of technologies and frameworks. Deploy applications built with Node.js, Python, PHP, and more."
        },
        {
            question: "How does auto scaling work?",
            answer: "Our platform automatically scales your applications based on traffic. No manual configuration needed - it just works."
        },
        {
            question: "What support is available?",
            answer: "We provide comprehensive documentation, community support, and resources to help you build and deploy successfully."
        }
    ];

    return (
        <section id="faq" className={`relative py-24 overflow-hidden ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Circuit board pattern */}
            <div className="absolute inset-0 opacity-[0.01]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='2' fill='currentColor'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='currentColor' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
            }}></div>

            {/* Decorative glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/6 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-foreground/8 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <div className="h-px w-12 bg-foreground/20 mb-4 mx-auto"></div>
                        <span className="text-sm font-mono text-muted-foreground tracking-wider uppercase">FAQ</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                        Common Questions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about our free platform
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-4"
                    >
                        {leftFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <FAQItem question={faq.question} answer={faq.answer} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-4"
                    >
                        {rightFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <FAQItem question={faq.question} answer={faq.answer} />
                            </motion.div>
                        ))}

                        {/* Bottom CTA Card in right column */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-6 p-8 rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm"
                        >
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                                Still have questions?
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Join our community of developers building amazing applications
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-foreground/10"></div>
                                <span className="text-sm font-mono font-bold text-foreground">#freepaas</span>
                                <div className="h-px flex-1 bg-foreground/10"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
