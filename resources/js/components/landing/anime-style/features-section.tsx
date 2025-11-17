'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Shield, BarChart3, Globe, Zap } from 'lucide-react';

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300',
        className,
      )}
    >
      {/* Halftone dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
        backgroundSize: '6px 6px'
      }}></div>

      {/* Cross-hatch shading in corner */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, black 0, black 1px, transparent 0, transparent 3px)',
        backgroundSize: '4px 4px'
      }}></div>

      {/* Large icon background with manga effect */}
      <div className="text-black/[0.04] absolute right-2 bottom-2 scale-[5] transition-all duration-500 group-hover:scale-[5.3]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div>
          {/* Icon in manga style box */}
          <div className="bg-black text-white border-2 border-black mb-4 flex h-14 w-14 items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-300">
            {icon}
          </div>
          <h3 className="mb-3 text-2xl font-black tracking-tight text-black uppercase">{title}</h3>
          <p className="text-black/80 text-sm leading-relaxed font-medium">{description}</p>
        </div>
      </div>

      {/* Manga panel corner markers */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-black"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black"></div>
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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="features" className={`relative py-24 overflow-hidden bg-white ${className}`}>
      {/* Manga Background - Halftone pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
          backgroundSize: '8px 8px'
        }}></div>
      </div>

      {/* Speed lines for dynamic effect */}
      <div className="absolute top-0 left-0 w-full h-2 opacity-30" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, black 0, black 3px, transparent 0, transparent 10px)',
      }}></div>
      <div className="absolute bottom-0 left-0 w-full h-2 opacity-30" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, black 0, black 3px, transparent 0, transparent 10px)',
      }}></div>

      <div className="container mx-auto px-6 relative">
        {/* Section Title - Manga Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          {/* Manga chapter badge */}
          <div className="inline-block mb-6">
            <div className="px-6 py-2 border-4 border-black bg-black text-white font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              CHAPTER 01: FEATURES
            </div>
          </div>

          {/* Big manga title with impact lines */}
          <div className="relative inline-block mb-4">
            {/* Impact/emphasis lines behind */}
            <div className="absolute -inset-6 opacity-20 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, black 0, black 2px, transparent 0, transparent 8px)',
              }}></div>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-black mb-4 relative" style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.1)'
            }}>
              EVERYTHING YOU NEED!
            </h2>
          </div>

          {/* Subtitle in speech bubble */}
          <div className="relative inline-block">
            <div className="px-8 py-3 border-3 border-black bg-white font-bold text-lg text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Deploy and scale your applications with our free platform
            </div>
          </div>
        </motion.div>

        {/* Manga Panels Grid - Chaotic Layout */}
        <motion.div
          className="max-w-6xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Row 1 - Offset */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pl-12">
            <BentoGridItem
              title={items[0].title}
              description={items[0].description}
              icon={items[0].icon}
              size={items[0].size}
              className="md:col-span-2 min-h-[240px] transform md:-rotate-1"
            />
            <BentoGridItem
              title={items[1].title}
              description={items[1].description}
              icon={items[1].icon}
              size={items[1].size}
              className="min-h-[240px] transform md:rotate-2"
            />
          </div>

          {/* Row 2 - Different offset */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:pr-12">
            <BentoGridItem
              title={items[2].title}
              description={items[2].description}
              icon={items[2].icon}
              size={items[2].size}
              className="min-h-[240px] transform md:-rotate-2"
            />
            <BentoGridItem
              title={items[3].title}
              description={items[3].description}
              icon={items[3].icon}
              size={items[3].size}
              className="md:col-span-2 min-h-[240px] transform md:rotate-1"
            />
          </div>

          {/* Row 3 - Centered chaotic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoGridItem
              title={items[4].title}
              description={items[4].description}
              icon={items[4].icon}
              size={items[4].size}
              className="min-h-[240px] transform md:rotate-1"
            />
            <BentoGridItem
              title={items[5].title}
              description={items[5].description}
              icon={items[5].icon}
              size={items[5].size}
              className="md:col-span-2 min-h-[240px] transform md:-rotate-1"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
