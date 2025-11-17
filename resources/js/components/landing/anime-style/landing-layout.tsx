import Navbar from './navbar';
import HeroSection from './hero-section';
import QuoteSection from './quote-section';
import FeaturesSection from './features-section';
import ProductFeaturesSection from './product-features-section';
import PlatformFeaturesSection from './platform-features-section';
import PricingSection from './pricing-section';
import CTASection from './cta-section';
import FAQSection from './faq-section';
import FooterSection from './footer-section';

interface LandingLayoutProps {
    className?: string;
}

export default function LandingLayout({ className = '' }: LandingLayoutProps) {
    return (
        <div className={`min-h-screen bg-white text-black relative overflow-hidden ${className}`}>
            {/* Manga Background - Light Mode */}
            <div className="absolute inset-0">
                {/* Base white with subtle paper texture */}
                <div className="absolute inset-0 bg-white"></div>

                {/* Subtle halftone pattern overlay */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'radial-gradient(circle, black 0.5px, transparent 0.5px)',
                    backgroundSize: '12px 12px'
                }}></div>

                {/* Panel divider lines - very subtle */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-black opacity-5"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black opacity-5"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Manga Style Landing Page Sections */}
            <HeroSection />
            <QuoteSection />
            <FeaturesSection />
            <ProductFeaturesSection />
            <PlatformFeaturesSection />
            <PricingSection />
            <CTASection />
            <FAQSection />
            <FooterSection />
        </div>
    );
}

