import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
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
    const faqs = [
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
        },
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
        <section className={`py-24 bg-muted/30 ${className}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Common Questions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Frequently asked questions about our AI SaaS template
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </motion.div>
                    ))}
                </div>

                {/* CTA di bawah FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                        Still have questions? Let's build together!
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                        Join our community of AI SaaS entrepreneurs ready to share knowledge and experience
                    </p>
                    <div className="text-lg font-mono font-bold text-primary">
                        #buildwithai
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
