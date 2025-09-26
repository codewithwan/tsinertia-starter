import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
    value: string | number;
    suffix?: string;
    duration?: number;
    showUnit?: boolean;
}

export default function AnimatedCounter({ 
    value, 
    suffix = '', 
    duration = 2000, 
    showUnit = true 
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState('');
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            // Special handling for different value types
            if (typeof value === 'string' && (value === '∞' || value === '24/7')) {
                setDisplayValue(value);
                return;
            }

            if (typeof value === 'string' && value.includes('$')) {
                // For dollar amounts
                const startTime = Date.now();
                const animate = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    setDisplayValue(`${Math.floor(0 * easeOutCubic)}$`);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                animate();
                return;
            }

            // Handle memory values (MB to GB conversion)
            if (suffix === 'MB' || suffix === 'GB') {
                const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9.]/g, ''));
                const startTime = Date.now();

                const animate = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    const currentValue = numericValue * easeOutCubic;

                    if (suffix === 'MB' && numericValue >= 1000) {
                        // Convert MB to GB when it gets to 1000+
                        if (currentValue >= 1000) {
                            const gbValue = (currentValue / 1024);
                            // Remove .0 if it's a whole number
                            const displayGB = gbValue % 1 === 0 ? Math.floor(gbValue) : gbValue.toFixed(1);
                            setDisplayValue(`${displayGB}GB`);
                        } else {
                            setDisplayValue(`${Math.floor(currentValue)}MB`);
                        }
                    } else if (suffix === 'GB') {
                        const displayGB = currentValue % 1 === 0 ? Math.floor(currentValue) : currentValue.toFixed(1);
                        setDisplayValue(`${displayGB}GB`);
                    } else {
                        setDisplayValue(`${Math.floor(currentValue)}${suffix}`);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                animate();
                return;
            }

            // Handle CPU values (with decimal, start from 0.1)
            // Check for CPU context: either has CPU suffix, contains decimal, or is a whole number for CPU
            if (suffix === 'CPU' || value.toString().includes('.') ||
                (typeof value === 'number' && (value === 1 || value === 0.5))) {
                const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ''));
                const startTime = Date.now();

                const animate = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                    // Start from 0.1 instead of 0
                    const currentValue = 0.1 + (numericValue - 0.1) * easeOutCubic;

                    if (numericValue >= 1 && currentValue >= 1) {
                        // Show whole number when it reaches 1 or more
                        setDisplayValue(Math.floor(currentValue).toString());
                    } else {
                        setDisplayValue(currentValue.toFixed(1));
                    }

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                animate();
                return;
            }

            // Default integer counter
            const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9]/g, ''));
            const startTime = Date.now();

            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentValue = Math.floor(numericValue * easeOutCubic);
                setDisplayValue(currentValue.toString());

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            animate();
        }
    }, [inView, value, duration, suffix]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-foreground"
        >
            {displayValue}{showUnit && suffix && !displayValue.includes(suffix) ? suffix : ''}
        </motion.div>
    );
}
