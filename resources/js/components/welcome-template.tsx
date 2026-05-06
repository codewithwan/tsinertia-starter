/**
 * Welcome Template Component
 *
 * This is the landing page template for TSInertia Starter.
 * To remove this template and use your own content:
 * 1. Delete this file: resources/js/components/welcome-template.tsx
 * 2. Replace <WelcomeTemplate /> in resources/js/pages/welcome.tsx with your content
 * 3. The navbar and basic layout structure will remain intact
 */

import { Button } from '@/components/ui/button';
import { Check, Copy, Github } from 'lucide-react';

// Simple Icons imports
import { useState } from 'react';
import { SiDocker, SiInertia, SiLaravel, SiMysql, SiPhp, SiReact, SiShadcnui, SiTailwindcss, SiTypescript } from 'react-icons/si';

export default function WelcomeTemplate() {
    const [copied, setCopied] = useState(false);
    const [activeIcon, setActiveIcon] = useState<number | null>(null);

    const gitCommand = 'git clone https://github.com/codewithwan/tsinertia-starter.git';
    const gitUrl = 'https://github.com/codewithwan/tsinertia-starter.git';

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(gitCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const techIcons = [
        {
            icon: SiLaravel,
            name: 'Laravel',
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            description: 'Elegant PHP framework',
            position: { x: 30, y: 50 },
            tooltipClass: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
        },
        {
            icon: SiReact,
            name: 'React',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            description: 'Modern UI library',
            position: { x: 70, y: 50 },
            tooltipClass: 'right-full top-1/2 -translate-y-1/2 mr-4',
        },
        {
            icon: SiTypescript,
            name: 'TypeScript',
            color: 'text-blue-600',
            bgColor: 'bg-blue-600/10',
            description: 'Type-safe JavaScript',
            position: { x: 65, y: 80 },
            tooltipClass: 'right-full top-1/2 -translate-y-1/2 mr-4',
        },
        {
            icon: SiInertia,
            name: 'Inertia.js',
            color: 'text-purple-600',
            bgColor: 'bg-purple-600/10',
            description: 'Modern monolith',
            position: { x: 50, y: 50 },
            tooltipClass: 'top-full left-1/2 -translate-x-1/2 mt-4',
        },
        {
            icon: SiTailwindcss,
            name: 'Tailwind',
            color: 'text-cyan-500',
            bgColor: 'bg-cyan-500/10',
            description: 'Utility-first CSS',
            position: { x: 80, y: 25 },
            tooltipClass: 'left-full top-1/2 -translate-y-1/2 ml-4',
        },
        {
            icon: SiDocker,
            name: 'Docker',
            color: 'text-blue-600',
            bgColor: 'bg-blue-600/10',
            description: 'Containerization',
            position: { x: 15, y: 25 },
            tooltipClass: 'left-full top-1/2 -translate-y-1/2 ml-4',
        },
        {
            icon: SiMysql,
            name: 'MySQL',
            color: 'text-orange-600',
            bgColor: 'bg-orange-600/10',
            description: 'Reliable database',
            position: { x: 35, y: 10 },
            tooltipClass: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
        },
        {
            icon: SiPhp,
            name: 'FrankenPHP',
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-600/10',
            description: 'Modern PHP runtime',
            position: { x: 15, y: 75 },
            tooltipClass: 'left-full top-1/2 -translate-y-1/2 ml-4',
        },
        {
            icon: SiShadcnui,
            name: 'Shadcn UI',
            color: 'text-purple-600',
            bgColor: 'bg-purple-600/10',
            description: 'Modern UI library',
            position: { x: 85, y: 70 },
            tooltipClass: 'bottom-full left-1/2 -translate-x-1/2 mb-4',
        },
    ];

    // Static connections that make sense
    const connections = [
        { from: 0, to: 6 }, // Laravel -> MySQL
        { from: 1, to: 2 }, // React -> TypeScript
        { from: 1, to: 4 }, // React -> Tailwind
        { from: 0, to: 3 }, // Laravel -> Inertia
        { from: 3, to: 1 }, // Inertia -> React
        { from: 5, to: 0 }, // Docker -> Laravel
        { from: 7, to: 0 }, // FrankenPHP -> Laravel
        { from: 6, to: 5 }, // MySQL -> Docker
        { from: 8, to: 1 }, // Shadcn UI -> React
        { from: 2, to: 8 }, // TypeScript -> Shadcn UI
        { from: 4, to: 8 }, // Tailwind -> Shadcn UI
        { from: 5, to: 7 }, // Docker -> FrankenPHP
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="container mx-auto flex min-h-[520px] items-center px-6 py-12 md:min-h-[560px]">
                <div className="grid w-full items-center gap-14 lg:grid-cols-2">
                    {/* Left Side - Typography & Command */}
                    <div className="space-y-8">
                        <div className="space-y-5">
                            <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl xl:text-7xl dark:text-white">
                                Laravel + React + TypeScript
                            </h1>

                            <p className="text-2xl font-medium text-gray-600 lg:text-3xl dark:text-gray-400">Make it simple</p>

                            <p className="max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                Everything you need to build modern applications. No setup headaches.
                            </p>
                        </div>

                        {/* Git Clone Command */}
                        <div className="space-y-5">
                            <div className="relative">
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="mb-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">GET STARTED</div>
                                            <code className="block font-mono text-sm break-all text-gray-900 lg:text-base dark:text-green-400">
                                                {gitCommand}
                                            </code>
                                        </div>
                                        <Button
                                            onClick={copyToClipboard}
                                            size="sm"
                                            variant="ghost"
                                            className="h-9 w-9 shrink-0 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                                        >
                                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Single CTA Button */}
                            <Button
                                size="lg"
                                className="bg-black px-7 py-5 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                onClick={() => window.open(gitUrl, '_blank')}
                            >
                                <Github className="h-5 w-5" />
                                Start on GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Connected Tech Diagram */}
                    <div className="relative hidden h-[520px] lg:block">
                        <div className="absolute inset-0 rounded-2xl border border-gray-200/30 bg-gray-50/30 dark:border-gray-800/30 dark:bg-gray-900/20">
                            {/* Static Connection Lines */}
                            <svg className="pointer-events-none absolute inset-0 h-full w-full">
                                {connections.map((connection, index) => {
                                    const from = techIcons[connection.from].position;
                                    const to = techIcons[connection.to].position;

                                    return (
                                        <line
                                            key={index}
                                            x1={`${from.x}%`}
                                            y1={`${from.y}%`}
                                            x2={`${to.x}%`}
                                            y2={`${to.y}%`}
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className={`transition-all duration-300 ${
                                                activeIcon === connection.from || activeIcon === connection.to
                                                    ? 'text-blue-500 opacity-80'
                                                    : 'text-gray-300 opacity-40 dark:text-gray-600'
                                            }`}
                                            strokeDasharray="4 4"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Tech Icons */}
                            {techIcons.map((tech, index) => {
                                const IconComponent = tech.icon;
                                const isActive = activeIcon === index;

                                return (
                                    <div
                                        key={index}
                                        className="group absolute cursor-pointer"
                                        style={{
                                            left: `${tech.position.x}%`,
                                            top: `${tech.position.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: isActive ? 50 : 10,
                                        }}
                                        onMouseEnter={() => setActiveIcon(index)}
                                        onMouseLeave={() => setActiveIcon(null)}
                                    >
                                        {/* Pulse Effect */}
                                        {isActive && (
                                            <div className="absolute inset-0 animate-ping">
                                                <div
                                                    className={`h-18 w-18 rounded-full ${tech.bgColor} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                                                ></div>
                                            </div>
                                        )}

                                        {/* Icon Container */}
                                        <div
                                            className={`relative h-15 w-15 rounded-xl ${tech.bgColor} flex items-center justify-center border border-gray-200 backdrop-blur-sm transition-all duration-300 group-hover:border-gray-300 hover:scale-110 hover:shadow-xl dark:border-gray-700 dark:group-hover:border-gray-600 ${isActive ? 'scale-115 shadow-xl' : ''} `}
                                        >
                                            <IconComponent className={`h-7 w-7 ${tech.color} transition-all duration-300`} />

                                            {/* Glow Effect */}
                                            {isActive && (
                                                <div className={`absolute inset-0 rounded-xl ${tech.bgColor} -z-10 opacity-50 blur-lg`}></div>
                                            )}
                                        </div>

                                        {/* Fixed Tooltip Positioning */}
                                        {isActive && (
                                            <div
                                                className={`absolute z-50 min-w-max rounded-md border border-gray-200 bg-white px-2.5 py-1.5 shadow-xl transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 ${tech.tooltipClass} `}
                                            >
                                                <div className="text-xs font-semibold text-gray-900 dark:text-white">{tech.name}</div>
                                                <div className="text-[11px] text-gray-600 dark:text-gray-400">{tech.description}</div>

                                                {/* Fixed Tooltip Arrow */}
                                                <div
                                                    className={`absolute h-2 w-2 rotate-45 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${tech.tooltipClass.includes('bottom-full') ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0' : ''} ${tech.tooltipClass.includes('top-full') ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-r-0 border-b-0' : ''} ${tech.tooltipClass.includes('right-full') ? 'top-1/2 left-full -translate-x-1/2 -translate-y-1/2 border-b-0 border-l-0' : ''} ${tech.tooltipClass.includes('left-full') ? 'top-1/2 right-full translate-x-1/2 -translate-y-1/2 border-t-0 border-r-0' : ''} `}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
