import Navbar from './navbar';
import HeroSection from './hero-section';
import QuoteSection from './quote-section';
import FeaturesSection from './features-section';
import ProductFeaturesSection from './product-features-section';
import PricingSection from './pricing-section';
import CTASection from './cta-section';
import FAQSection from './faq-section';
import FooterSection from './footer-section';

interface LandingLayoutProps {
    className?: string;
}

export default function LandingLayout({ className = '' }: LandingLayoutProps) {
    return (
        <div className={`min-h-screen bg-background text-foreground relative overflow-hidden ${className}`}>
            {/* AI-style Background */}
            <div className="absolute inset-0">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}></div>

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* AI-style Landing Page Sections */}
            <HeroSection />
            <QuoteSection />
            <FeaturesSection />
            <ProductFeaturesSection />
            <PricingSection />
            <CTASection />
            <FAQSection />
            <FooterSection />
        </div>
    );
}
