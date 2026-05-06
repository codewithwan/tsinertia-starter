import CTASection from './cta-section';
import DeveloperSection from './developer-section';
import FAQSection from './faq-section';
import FeaturesSection from './features-section';
import FooterSection from './footer-section';
import HeroSection from './hero-section';
import Navbar from './navbar';
import PricingSection from './pricing-section';
import ProductFeaturesSection from './product-features-section';
import QuoteSection from './quote-section';
import TestimonialsSection from './testimonials-section';

interface LandingLayoutProps {
    className?: string;
}

export default function LandingLayout({ className = '' }: LandingLayoutProps) {
    return (
        <div className={`relative min-h-screen overflow-hidden bg-background text-foreground ${className}`}>
            {/* AI-style Background */}
            <div className="absolute inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                ></div>

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* AI-style Landing Page Sections */}
            <HeroSection />
            <QuoteSection />
            <FeaturesSection />
            <ProductFeaturesSection />
            <TestimonialsSection />
            <DeveloperSection />
            <PricingSection />
            <CTASection />
            <FAQSection />
            <FooterSection />
        </div>
    );
}
