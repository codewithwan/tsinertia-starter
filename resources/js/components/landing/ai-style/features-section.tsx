'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, HardDrive, Shield, BarChart3, Globe, Zap } from 'lucide-react';

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
        'group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-background/40 backdrop-blur-xl hover:bg-foreground/5 transition-all duration-500',
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

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          <div className="bg-foreground/5 text-foreground/60 border border-foreground/10 group-hover:bg-foreground/10 group-hover:text-foreground group-hover:border-foreground/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl backdrop-blur-sm transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div className="text-foreground/60 group-hover:text-foreground mt-4 flex items-center text-sm font-medium transition-colors">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>

      {/* Bottom neon line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-foreground/10 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-foreground/10 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

interface FeaturesSectionProps {
    className?: string;
}

const items = [
  {
    title: 'Easy Deployment',
    description:
      'Deploy your applications instantly with one-click deployment. No complex setup required.',
    icon: <Cpu className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'Free Hosting',
    description:
      'Free hosting for your applications with generous resources to get you started.',
    icon: <Globe className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Auto Scaling',
    description: 'Automatic scaling to handle traffic spikes without manual configuration.',
    icon: <Shield className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Developer Tools',
    description: "Complete set of tools and APIs to build and manage your applications.",
    icon: <BarChart3 className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Database',
    description: 'Managed database services with automatic backups and scaling.',
    icon: <HardDrive className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'API Access',
    description:
      'Full API access with comprehensive documentation and developer-friendly tools.',
    icon: <Zap className="size-6" />,
    size: 'large' as const,
  },
];

export default function FeaturesSection({ className = '' }: FeaturesSectionProps) {
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
    <section id="features" className={`relative py-24 overflow-hidden ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-background"></div>

      {/* Neon grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }}></div>

      {/* Decorative glow elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-foreground/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-foreground/15 rounded-full blur-3xl -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/20 bg-foreground/5 mb-6">
            <span className="text-sm font-medium uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deploy and scale your applications with our free platform
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 max-w-6xl mx-auto"
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
                'h-full',
              )}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
