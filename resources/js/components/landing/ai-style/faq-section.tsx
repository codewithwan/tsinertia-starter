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
            question: "What's included in the AI SaaS template?",
            answer: "The template includes a complete Laravel + React setup with user authentication, AI integration, admin dashboard, payment system (Stripe), responsive design, and comprehensive documentation."
        },
        {
            question: "Do I need coding experience to use this template?",
            answer: "Basic coding knowledge is helpful, but the template comes with detailed documentation and setup guides to help you customize it for your specific AI SaaS needs."
        },
        {
            question: "Can I customize the template for my business?",
            answer: "Absolutely! The template is fully customizable. You can modify the design, add new features, integrate different AI models, and adapt it to your specific business requirements."
        },
        {
            question: "What AI models are integrated?",
            answer: "The template includes pre-configured integration with popular AI providers like OpenAI, Anthropic, and others. You can easily add more AI models as needed."
        }
    ];

    const rightFaqs = [
        {
            question: "Is payment processing included?",
            answer: "Yes! The Pro template includes Stripe integration for subscription management, billing, and payment processing out of the box."
        },
        {
            question: "How do I deploy the template?",
            answer: "The template includes deployment scripts and documentation for popular hosting platforms like Vercel, Netlify, and traditional VPS hosting."
        },
        {
            question: "What support do you provide?",
            answer: "We provide documentation, setup guides, and email support. Pro template buyers get priority support for faster response times."
        }
    ];

    return (
        <section className={`relative py-24 overflow-hidden ${className}`}>
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
                        Everything you need to know about our AI SaaS template
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
                                Join our community of AI SaaS entrepreneurs ready to share knowledge and experience
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-foreground/10"></div>
                                <span className="text-sm font-mono font-bold text-foreground">#buildwithai</span>
                                <div className="h-px flex-1 bg-foreground/10"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
