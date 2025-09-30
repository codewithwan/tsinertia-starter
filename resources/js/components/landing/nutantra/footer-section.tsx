import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function FooterSection() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
                            Nutantra
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            AI-Powered Nutrition Tracker untuk membantu Anda mencapai gaya hidup yang lebih sehat dengan tracking nutrisi yang mudah dan akurat.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-muted hover:bg-green-500 hover:text-white transition-all flex items-center justify-center"
                            >
                                <FaTwitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-muted hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                            >
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-muted hover:bg-gray-800 hover:text-white transition-all flex items-center justify-center"
                            >
                                <FaGithub className="h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Product</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#features" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="#download" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Download
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#about" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#careers" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#blog" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="#press" className="text-muted-foreground hover:text-green-600 transition-colors">
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <a
                                    href="mailto:hello@nutantra.life"
                                    className="text-muted-foreground hover:text-green-600 transition-colors"
                                >
                                    hello@nutantra.life
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">Jakarta, Indonesia</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <p className="text-muted-foreground text-sm text-center sm:text-left">
                        © {currentYear} Nutantra. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for healthier Indonesia
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
