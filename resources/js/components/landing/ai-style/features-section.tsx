'use client';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Cpu, HardDrive, Shield, BarChart3, Globe, Zap } from 'lucide-react';
import { useRef } from 'react';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group relative flex h-full min-h-[280px] cursor-pointer flex-col justify-between overflow-hidden bg-background/40 backdrop-blur-xl hover:bg-foreground/5 transition-all duration-500',
        className,
      )}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/0 via-foreground/[0.02] to-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Large icon background */}
      <div className="text-foreground/[0.03] group-hover:text-foreground/[0.06] absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div className="space-y-3">
          <div className="bg-foreground/5 text-foreground/60 border border-foreground/10 group-hover:bg-foreground/10 group-hover:text-foreground group-hover:border-foreground/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm transition-all duration-500">
            {icon}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div className="text-foreground/60 group-hover:text-foreground mt-6 flex items-center text-sm font-medium transition-colors">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

interface FeaturesSectionProps {
  className?: string;
}

const items = [
  {
    title: 'Reverse Tunnel',
    description:
      'Expose local applications to the internet with ease. Similar to Ngrok but faster and more affordable. Simple CLI commands.',
    icon: <Cpu className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'Static Hosting',
    description:
      'Deploy static websites super fast like Vercel/Netlify. No server setup required, instant live.',
    icon: <Globe className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Custom Domain',
    description: 'Custom domain with automatic SSL. No complex DNS configuration needed, instant activation.',
    icon: <Shield className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Modern Dashboard',
    description: "Interactive dashboard to manage tunnels, deployments, domains, and analytics.",
    icon: <BarChart3 className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Simple CLI',
    description: 'Easy-to-use CLI with short commands. Expose local apps and deploy static sites with simple commands.',
    icon: <HardDrive className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Asia Pacific Server',
    description:
      'Servers in Asia Pacific region for low latency. Affordable pricing for developers worldwide.',
    icon: <Zap className="size-6" />,
    size: 'large' as const,
  },
];

export default function FeaturesSection({ className = '' }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Disable parallax animations on mobile (< 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const backgroundY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
  const glowY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section ref={sectionRef} id="features" className={`relative py-24 overflow-hidden ${className}`} style={{ zIndex: 20, marginTop: '-8rem' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-background"></div>
      
      {/* Enhanced depth shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80 pointer-events-none"></div>

      {/* Neon grid overlay */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-[0.02]"
      >
        <div style={{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        height: '150%'
      }}></div>
      </motion.div>

      {/* Decorative glow elements */}
      <motion.div style={{ y: glowY }} className="absolute top-1/2 left-0 w-72 h-72 bg-foreground/10 rounded-full blur-3xl -translate-y-1/2"></motion.div>
      <motion.div style={{ y: glowY }} className="absolute top-1/2 right-0 w-72 h-72 bg-foreground/15 rounded-full blur-3xl -translate-y-1/2"></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 mb-6">
            <span className="text-sm font-medium uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Features Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cloud platform for developers. Reverse tunnel, static hosting, and custom domain made easy.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-6 max-w-6xl mx-auto bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              size={item.size}
              className={cn(
                item.size === 'large'
                  ? 'col-span-4'
                  : item.size === 'medium'
                    ? 'col-span-3'
                    : 'col-span-2',
                'h-full rounded-none', // Ensure no rounded corners on items to fit grid
              )}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
