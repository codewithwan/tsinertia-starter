import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Question - Speech bubble style */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left group"
            >
                <div className="relative">
                    {/* Speech bubble for question */}
                    <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
                        {/* Halftone pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                            backgroundSize: '5px 5px'
                        }}></div>

                        <div className="flex items-start justify-between gap-4 relative">
                            {/* Q marker */}
                            <div className="flex-shrink-0 w-10 h-10 border-3 border-black bg-black text-white flex items-center justify-center font-black text-lg">
                                Q
                            </div>

                            <h3 className="flex-1 text-lg font-black text-black uppercase leading-tight pt-2">
                                {question}
                            </h3>

                            {/* Toggle icon */}
                            <div className="flex-shrink-0 w-8 h-8 border-2 border-black bg-white flex items-center justify-center">
                                {isOpen ? (
                                    <Minus className="h-5 w-5 text-black" strokeWidth={3} />
                                ) : (
                                    <Plus className="h-5 w-5 text-black" strokeWidth={3} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Speech bubble tail pointing down when closed */}
                    {!isOpen && (
                        <div className="absolute -bottom-2 left-16 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black"></div>
                    )}
                </div>
            </button>

            {/* Answer - Appears below */}
            <motion.div
                initial={false}
                animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <div className="mt-4 relative">
                    {/* Answer box */}
                    <div className="border-4 border-black bg-gray-50 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {/* Cross-hatch pattern for answer */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 1px, transparent 0, transparent 4px)',
                            backgroundSize: '6px 6px'
                        }}></div>

                        <div className="flex gap-4 relative">
                            {/* A marker */}
                            <div className="flex-shrink-0 w-10 h-10 border-3 border-black bg-white text-black flex items-center justify-center font-black text-lg">
                                A
                            </div>

                            <p className="flex-1 text-base font-bold text-black leading-relaxed pt-2">
                                {answer}
                            </p>
                        </div>
                    </div>

                    {/* Answer bubble tail pointing up */}
                    <div className="absolute -top-2 left-16 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black"></div>
                </div>
            </motion.div>
        </div>
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
        <section id="faq" className={`relative py-24 overflow-hidden bg-white ${className}`}>
            {/* Manga Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                    backgroundSize: '8px 8px'
                }}></div>
            </div>

            {/* Decorative speed lines */}
            <div className="absolute top-0 left-0 w-full h-2 opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, black 0, black 2px, transparent 0, transparent 8px)',
            }}></div>

            <div className="container mx-auto px-6 relative">
                {/* Header - Manga Style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-6">
                        <div className="px-6 py-2 border-4 border-black bg-black text-white font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                            CHAPTER 03: FAQ
                        </div>
                    </div>

                    <div className="relative inline-block mb-4">
                        {/* Emphasis lines */}
                        <div className="absolute -inset-8 opacity-15 pointer-events-none">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, black 0, black 2px, transparent 0, transparent 10px)',
                            }}></div>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-black text-black relative" style={{
                            textShadow: '3px 3px 0px rgba(0,0,0,0.1)'
                        }}>
                            GOT QUESTIONS?
                        </h2>
                    </div>

                    <div className="relative inline-block">
                        <div className="px-8 py-3 border-3 border-black bg-white font-bold text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Everything you need to know about our free platform
                        </div>
                    </div>
                </motion.div>

                {/* Two Column Layout */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-6"
                    >
                        {leftFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <FAQItem question={faq.question} answer={faq.answer} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-6"
                    >
                        {rightFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <FAQItem question={faq.question} answer={faq.answer} index={index + leftFaqs.length} />
                            </motion.div>
                        ))}

                        {/* Bottom CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <div className="relative p-8 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                {/* Halftone background */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                    backgroundImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                                    backgroundSize: '6px 6px'
                                }}></div>

                                <div className="relative">
                                    <h3 className="text-3xl font-black text-black mb-3 uppercase">
                                        STILL HAVE QUESTIONS?
                                    </h3>
                                    <p className="text-black/80 font-bold mb-6">
                                        Join our community of developers building amazing applications!
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-[3px] flex-1 bg-black"></div>
                                        <span className="px-4 py-1 border-2 border-black bg-white text-sm font-black">#FREEPAAS</span>
                                        <div className="h-[3px] flex-1 bg-black"></div>
                                    </div>
                                </div>

                                {/* Corner markers */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-black"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
