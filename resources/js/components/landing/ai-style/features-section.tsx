'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, HardDrive, Zap, Shield, BarChart3, Globe } from 'lucide-react';

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
        'group border-primary/10 bg-background hover:border-primary/30 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500',
        className,
      )}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

      <div className="text-primary/5 group-hover:text-primary/10 absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-primary/10 text-primary shadow-primary/10 group-hover:bg-primary/20 group-hover:shadow-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="text-primary mt-4 flex items-center text-sm">
          <span className="mr-1">Learn more</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>
      <div className="from-primary to-primary/30 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 group-hover:blur-lg" />
    </motion.div>
  );
};

interface FeaturesSectionProps {
    className?: string;
}

const items = [
  {
    title: 'AI Integration',
    description:
      'Pre-configured AI model endpoints with OpenAI, Anthropic, and other providers for seamless AI functionality.',
    icon: <Cpu className="size-6" />,
    size: 'large' as const,
  },
  {
    title: 'User Management',
    description:
      'Complete user registration, authentication, and management system built-in.',
    icon: <Globe className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'Payment System',
    description: 'Built-in Stripe integration for subscriptions and billing management.',
    icon: <Shield className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Admin Dashboard',
    description: "Complete admin panel for business management and analytics.",
    icon: <BarChart3 className="size-6" />,
    size: 'medium' as const,
  },
  {
    title: 'Database',
    description: 'Scalable data storage with unlimited capacity for user data.',
    icon: <HardDrive className="size-6" />,
    size: 'small' as const,
  },
  {
    title: 'API Ready',
    description:
      'RESTful API endpoints with complete documentation and developer tools.',
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
    <section className={`py-24 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            <strong className="text-primary">AI SaaS</strong> Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <strong className="text-foreground">Complete</strong> AI-powered platform with <strong className="text-primary">modern tech stack</strong> and <strong className="text-foreground">scalable architecture</strong>
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
