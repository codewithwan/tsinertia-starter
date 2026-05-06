import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Brain, Code2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DesktopMockup from './desktop/desktop-mockup';
import { FloatingMusicWidget } from './desktop/floating-music-widget';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mockupRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [musicProgress, setMusicProgress] = useState(0);
    const [musicTime, setMusicTime] = useState('0:00');
    const [musicDuration, setMusicDuration] = useState('0:00');
    const [dockWindow, setDockWindow] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const isInView = useInView(mockupRef, { amount: 0.3 });

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], isMobile ? [1, 1, 1] : [1, 0.7, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], isMobile ? [1, 1, 1] : [1, 0.98, 0.96]);
    const yLines = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
    const yMockup = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 50]);

    const mockupScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0.95, 1.08, 1.05, 0.92]);
    const mockupRotate = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [0, -1, -2]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(console.error);
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (!audioRef.current) return;
        const audio = audioRef.current;
        const updateProgress = () => {
            const current = audio.currentTime || 0;
            const duration = audio.duration || 0;
            setMusicProgress((current / duration) * 100);
            const formatTime = (time: number) => {
                const mins = Math.floor(time / 60);
                const secs = Math.floor(time % 60);
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            };
            setMusicTime(formatTime(current));
            if (!isNaN(duration) && duration > 0) setMusicDuration(formatTime(duration));
        };
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateProgress);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    // Show widget ONLY IF we are playing AND (Desktop is NOT in view OR Music window is Closed)
    const showWidget = isPlaying && (!isInView || dockWindow !== 'music');

    return (
        <>
            <main
                id="home"
                ref={containerRef}
                className={`relative flex min-h-[110vh] flex-col items-center justify-center overflow-visible py-24 sm:min-h-[120vh] sm:py-32 ${className}`}
                style={{ zIndex: 1, marginTop: '2rem' }}
            >
                {/* Futuristic Background Layers from MCP */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div
                        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }}
                    ></div>
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                'linear-gradient(0deg, transparent 24%, rgba(var(--primary), 0.05) 25%, rgba(var(--primary), 0.05) 26%, transparent 27%, transparent 74%, rgba(var(--primary), 0.05) 75%, rgba(var(--primary), 0.05) 76%, transparent 77%, transparent)',
                            backgroundSize: '50px 50px',
                        }}
                    ></div>
                </div>

                {/* Diagonal Parallax Lines */}
                <motion.div style={{ y: yLines }} className="pointer-events-none absolute top-20 left-0 h-64 w-1/3 opacity-40">
                    <div className="absolute top-20 left-20 h-[1px] w-32 rotate-45 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    <div className="absolute top-32 left-10 h-[1px] w-40 rotate-45 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </motion.div>
                <motion.div style={{ y: yLines }} className="pointer-events-none absolute top-20 right-0 h-64 w-1/3 opacity-40">
                    <div className="absolute top-20 right-20 h-[1px] w-32 -rotate-45 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                    <div className="absolute top-32 right-10 h-[1px] w-40 -rotate-45 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </motion.div>

                {/* Corner Accents */}
                <div className="pointer-events-none absolute top-24 left-8 h-12 w-12 border-t-2 border-l-2 border-primary/20"></div>
                <div className="pointer-events-none absolute top-24 right-8 h-12 w-12 border-t-2 border-r-2 border-primary/20"></div>

                {/* Floating Decorative Icons */}
                <motion.div
                    className="pointer-events-none absolute top-1/4 left-[10%] hidden lg:block"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="relative flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl border border-foreground/20 bg-foreground/5 backdrop-blur-xl">
                        <Brain className="h-9 w-9 text-foreground/40" />
                    </div>
                </motion.div>
                <motion.div
                    className="pointer-events-none absolute top-1/3 right-[10%] hidden lg:block"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="relative flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl border border-foreground/20 bg-foreground/5 backdrop-blur-xl">
                        <Code2 className="h-9 w-9 text-foreground/40" />
                    </div>
                </motion.div>

                {/* Main Text Content */}
                <motion.div style={{ opacity, scale }} className="relative z-10 mx-auto mb-16 w-full max-w-6xl px-4 text-center sm:px-6">
                    {/* Gradient Title */}
                    <div className="mb-8 space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                            Build{' '}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text pr-3 text-transparent italic">Faster</span> Than
                        </h1>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">Ever Before</h1>
                    </div>

                    {/* Subtitle with lines */}
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-4 flex items-center justify-center gap-2">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
                            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
                        </div>
                        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                            <span className="font-semibold text-foreground">Laravel 12</span> +{' '}
                            <span className="font-semibold text-foreground">React 19</span> +{' '}
                            <span className="font-semibold text-foreground">Tailwind 4</span>. Pre-configured with{' '}
                            <span className="font-bold text-primary">Inertia v2</span>,
                            <span className="font-semibold text-foreground"> TypeScript</span>, and{' '}
                            <span className="font-semibold text-foreground">premium components</span>.
                        </p>
                    </div>
                </motion.div>

                {/* Desktop Mockup Section */}
                <motion.div
                    ref={mockupRef}
                    style={{ y: yMockup, scale: mockupScale, rotateX: mockupRotate }}
                    className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-0"
                >
                    <DesktopMockup
                        isPlaying={isPlaying}
                        musicProgress={musicProgress}
                        musicTime={musicTime}
                        musicDuration={musicDuration}
                        togglePlay={togglePlay}
                        dockWindow={dockWindow}
                        setDockWindow={setDockWindow}
                        audioRef={audioRef}
                    />
                </motion.div>
            </main>

            <FloatingMusicWidget
                showWidget={showWidget}
                musicProgress={musicProgress}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                setDockWindow={setDockWindow}
                containerRef={containerRef}
            />

            <audio ref={audioRef} src="/assets/music/back-to-friends.mp3" loop />
        </>
    );
}
