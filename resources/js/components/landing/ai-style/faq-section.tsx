import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef } from 'react';

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
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const glowY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const glowY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const leftFaqs = [
        {
            question: "What is TSInertia Starter?",
            answer: "TSInertia Starter is a modern, production-ready starter kit for building full-stack web applications using TypeScript, Laravel, Inertia.js, and React. It's completely free and open source."
        },
        {
            question: "What features are available?",
            answer: "Main features include a full Authentication system, an Admin Dashboard, 50+ UI Components, Role & Permission management, and full TypeScript support out of the box."
        },
        {
            question: "Is it suitable for production?",
            answer: "Yes! It's built with security and performance in mind, using the latest stable versions of Laravel and React with production-ready configurations."
        },
        {
            question: "How do I get started?",
            answer: "Simply clone the repository, run `composer install` and `npm install`, setup your environment variables, and you're ready to build your next big idea."
        }
    ];

    const rightFaqs = [
        {
            question: "Can I use it for commercial projects?",
            answer: "Absolutely! TSInertia Starter is released under the MIT license, meaning you can use it for both personal and commercial projects without any restrictions."
        },
        {
            question: "Which UI library is used?",
            answer: "We use Tailwind CSS 4 for styling and Shadcn/UI for accessible, high-quality components. It's fully customizable and supports both Light and Dark modes."
        },
        {
            question: "Does it support Social Authentication?",
            answer: "Yes, Socialite is pre-configured to easily add Google, GitHub, and other social login providers with just a few environment variables."
        },
        {
            question: "Are there regular updates?",
            answer: "We actively maintain the project to ensure compatibility with the latest versions of PHP, Laravel, and React, and frequently add new features and components."
        }
    ];

    return (
        <section ref={sectionRef} id="faq" className={`relative py-24 overflow-hidden ${className}`} style={{ zIndex: 1, marginTop: '-3rem' }}>
            {/* Background */}
            <div className="absolute inset-0 bg-background"></div>

            {/* Enhanced depth shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none"></div>

            {/* Circuit board pattern */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-[0.01]"
            >
                <div style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Ccircle cx='30' cy='30' r='2' fill='currentColor'/%3E%3Cpath d='M30 0v60M0 30h60' stroke='currentColor' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px',
                    height: '150%'
                }}></div>
            </motion.div>

            {/* Decorative glows */}
            <motion.div style={{ y: glowY1 }} className="absolute top-0 right-0 w-96 h-96 bg-foreground/6 rounded-full blur-3xl"></motion.div>
            <motion.div style={{ y: glowY2 }} className="absolute bottom-0 left-0 w-72 h-72 bg-foreground/8 rounded-full blur-3xl"></motion.div>

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
                        Common <span className="italic">Questions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        <span className="text-foreground font-semibold">Everything you need</span> to know about <span className="text-foreground font-semibold">TSInertia Starter</span>
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
                                Join the community of developers building cloud platforms
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-px flex-1 bg-foreground/10"></div>
                                <span className="text-sm font-mono font-bold text-foreground">#tsinertia</span>
                                <div className="h-px flex-1 bg-foreground/10"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
