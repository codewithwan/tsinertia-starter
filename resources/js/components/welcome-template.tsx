/**
 * Welcome Template Component
 * 
 * This is the landing page template for TSInertia Starter.
 * To remove this template and use your own content:
 * 1. Delete this file: resources/js/components/welcome-template.tsx
 * 2. Replace <WelcomeTemplate /> in resources/js/pages/welcome.tsx with your content
 * 3. The navbar and basic layout structure will remain intact
 */

import { 
    Github,
    Copy,
    Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simple Icons imports
import { 
    SiLaravel,
    SiReact, 
    SiTypescript,
    SiTailwindcss,
    SiDocker,
    SiMysql,
    SiPhp,
    SiInertia
} from 'react-icons/si';
import { useState } from 'react';

export default function WelcomeTemplate() {
    const [copied, setCopied] = useState(false);
    const [activeIcon, setActiveIcon] = useState<number | null>(null);
    
    const gitCommand = "git clone https://github.com/codewithwan/tsinertia-starter.git";
    const gitUrl = "https://github.com/codewithwan/tsinertia-starter.git";

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
            name: "Laravel",
            color: "text-red-500", 
            bgColor: "bg-red-500/10",
            description: "Elegant PHP framework",
            position: { x: 50, y: 20 },
            tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-4"
        },
        { 
            icon: SiReact, 
            name: "React",
            color: "text-blue-500", 
            bgColor: "bg-blue-500/10",
            description: "Modern UI library",
            position: { x: 75, y: 35 },
            tooltipClass: "right-full top-1/2 -translate-y-1/2 mr-4"
        },
        { 
            icon: SiTypescript, 
            name: "TypeScript",
            color: "text-blue-600", 
            bgColor: "bg-blue-600/10",
            description: "Type-safe JavaScript",
            position: { x: 85, y: 65 },
            tooltipClass: "right-full top-1/2 -translate-y-1/2 mr-4"
        },
        { 
            icon: SiInertia, 
            name: "Inertia.js",
            color: "text-purple-600", 
            bgColor: "bg-purple-600/10",
            description: "Modern monolith",
            position: { x: 50, y: 80 },
            tooltipClass: "top-full left-1/2 -translate-x-1/2 mt-4"
        },
        { 
            icon: SiTailwindcss, 
            name: "Tailwind",
            color: "text-cyan-500", 
            bgColor: "bg-cyan-500/10",
            description: "Utility-first CSS",
            position: { x: 15, y: 65 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        },
        { 
            icon: SiDocker, 
            name: "Docker",
            color: "text-blue-600", 
            bgColor: "bg-blue-600/10",
            description: "Containerization",
            position: { x: 25, y: 35 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        },
        { 
            icon: SiMysql, 
            name: "MySQL",
            color: "text-orange-600", 
            bgColor: "bg-orange-600/10",
            description: "Reliable database",
            position: { x: 50, y: 50 },
            tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-4"
        },
        { 
            icon: SiPhp, 
            name: "FrankenPHP",
            color: "text-indigo-600", 
            bgColor: "bg-indigo-600/10",
            description: "Modern PHP runtime",
            position: { x: 35, y: 75 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        }
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
    ];

    return (
        <div className="container mx-auto px-6 py-16 h-[calc(100vh-88px)] flex items-center">
            <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
                
                {/* Left Side - Typography & Command */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                            Laravel + React + TypeScript
                        </h1>
                        
                        <p className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-medium">
                            Make it simple
                        </p>
                        
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                            Everything you need to build modern applications. No setup headaches.
                        </p>
                    </div>

                    {/* Git Clone Command */}
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">GET STARTED</div>
                                        <code className="text-gray-900 dark:text-green-400 font-mono text-sm lg:text-base block break-all">
                                            {gitCommand}
                                        </code>
                                    </div>
                                    <Button
                                        onClick={copyToClipboard}
                                        size="sm"
                                        variant="ghost"
                                        className="shrink-0 h-10 w-10 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Single CTA Button */}
                        <Button size="lg" className="px-8 py-6 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black" onClick={() => window.open(gitUrl, '_blank')}>
                            <Github className="h-5 w-5" />
                            Start on GitHub
                        </Button>
                    </div>
                </div>

                {/* Right Side - Connected Tech Diagram */}
                <div className="relative h-[600px] hidden lg:block">
                    <div className="absolute inset-0 rounded-3xl bg-gray-50/30 dark:bg-gray-900/20 border border-gray-200/30 dark:border-gray-800/30">
                        
                        {/* Static Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
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
                                                ? "text-blue-500 opacity-80" 
                                                : "text-gray-300 dark:text-gray-600 opacity-40"
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
                                    className="absolute group cursor-pointer"
                                    style={{
                                        left: `${tech.position.x}%`,
                                        top: `${tech.position.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: isActive ? 50 : 10
                                    }}
                                    onMouseEnter={() => setActiveIcon(index)}
                                    onMouseLeave={() => setActiveIcon(null)}
                                >
                                    {/* Pulse Effect */}
                                    {isActive && (
                                        <div className="absolute inset-0 animate-ping">
                                            <div className={`w-18 h-18 rounded-full ${tech.bgColor} -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2`}></div>
                                        </div>
                                    )}
                                    
                                    {/* Icon Container */}
                                    <div className={`
                                        relative w-16 h-16 rounded-2xl ${tech.bgColor} border border-gray-200 dark:border-gray-700
                                        flex items-center justify-center transition-all duration-300 backdrop-blur-sm
                                        hover:scale-110 hover:shadow-xl group-hover:border-gray-300 dark:group-hover:border-gray-600
                                        ${isActive ? 'scale-115 shadow-xl' : ''}
                                    `}>
                                        <IconComponent className={`h-8 w-8 ${tech.color} transition-all duration-300`} />
                                        
                                        {/* Glow Effect */}
                                        {isActive && (
                                            <div className={`absolute inset-0 rounded-2xl ${tech.bgColor} blur-lg opacity-50 -z-10`}></div>
                                        )}
                                    </div>

                                    {/* Fixed Tooltip Positioning */}
                                    {isActive && (
                                        <div className={`
                                            absolute bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-xl 
                                            border border-gray-200 dark:border-gray-700 min-w-max z-50 
                                            transition-all duration-200 ${tech.tooltipClass}
                                        `}>
                                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{tech.name}</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{tech.description}</div>
                                            
                                            {/* Fixed Tooltip Arrow */}
                                            <div className={`
                                                absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rotate-45
                                                ${tech.tooltipClass.includes('bottom-full') ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0' : ''}
                                                ${tech.tooltipClass.includes('top-full') ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0' : ''}
                                                ${tech.tooltipClass.includes('right-full') ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-0 border-b-0' : ''}
                                                ${tech.tooltipClass.includes('left-full') ? 'right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-r-0 border-t-0' : ''}
                                            `}></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Template Component CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fade-in {
                        0% { opacity: 0; transform: translateY(-10px) translateX(-50%); }
                        100% { opacity: 1; transform: translateY(0) translateX(-50%); }
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.3s ease-out;
                    }
                `
            }} />
        </div>
    );
} 