import AppLogo from '@/components/app-logo';

interface FooterSectionProps {
    className?: string;
}

export default function FooterSection({ className = '' }: FooterSectionProps) {
    return (
        <footer className={`bg-muted/50 border-t border-border ${className}`}>
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <AppLogo />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Complete AI SaaS template for building and launching your AI-powered software business.
                            Everything you need to start your AI SaaS journey.
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2025 AI SaaS Template. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
