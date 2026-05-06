import { motion } from 'framer-motion';
import { Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MusicWindowProps {
    isPlaying: boolean;
    musicProgress: number;
    musicTime: string;
    musicDuration: string;
    togglePlay: () => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function MusicWindow({ isPlaying, musicProgress, musicTime, musicDuration, togglePlay, audioRef }: MusicWindowProps) {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubProgress, setScrubProgress] = useState(0);

    // Sync scrub progress when not scrubbing
    useEffect(() => {
        if (!isScrubbing) {
            setScrubProgress(musicProgress);
        }
    }, [musicProgress, isScrubbing]);

    const handleScrubMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setScrubProgress(percentage);
    }, []);

    const handleScrubEnd = useCallback(() => {
        if (isScrubbing && audioRef.current) {
            const duration = audioRef.current.duration || 0;
            audioRef.current.currentTime = (scrubProgress / 100) * duration;
        }
        setIsScrubbing(false);
    }, [audioRef, isScrubbing, scrubProgress]);

    useEffect(() => {
        if (isScrubbing) {
            window.addEventListener('mousemove', handleScrubMove);
            window.addEventListener('mouseup', handleScrubEnd);
            window.addEventListener('touchmove', handleScrubMove);
            window.addEventListener('touchend', handleScrubEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleScrubMove);
            window.removeEventListener('mouseup', handleScrubEnd);
            window.removeEventListener('touchmove', handleScrubMove);
            window.removeEventListener('touchend', handleScrubEnd);
        };
    }, [handleScrubEnd, handleScrubMove, isScrubbing]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsScrubbing(true);
        // Initial jump
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
            const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
            const percentage = (x / rect.width) * 100;
            setScrubProgress(percentage);
        }
    };

    return (
        <div className="flex h-full flex-col bg-background p-4 font-sans select-none sm:p-5">
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                {/* Cleanest Rotating Logo */}
                <div className="relative">
                    <div
                        className={`absolute -inset-6 rounded-full bg-primary/10 blur-[40px] transition-opacity duration-1000 ${isPlaying ? 'animate-pulse opacity-100' : 'opacity-0'}`}
                    ></div>
                    <motion.div
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-muted/20 shadow-sm sm:h-36 sm:w-36"
                    >
                        <Music
                            className={`absolute h-12 w-12 transition-colors duration-500 sm:h-16 sm:w-16 ${isPlaying ? 'text-primary' : 'text-muted-foreground/10'}`}
                            strokeWidth={1}
                            style={{ opacity: isPlaying ? 0.4 : 0.1 }}
                        />
                        <div className="absolute inset-2 rounded-full border border-border/5"></div>
                    </motion.div>
                </div>

                {/* Small Info */}
                <div className="w-full px-2 text-center">
                    <div className="truncate text-sm font-bold text-foreground sm:text-base">Back to Friends</div>
                    <div className="text-[9px] font-medium tracking-[0.2em] text-primary uppercase opacity-70 sm:text-[10px]">Sombr</div>
                </div>

                {/* Interactive Progress Bar */}
                <div className="w-full max-w-[240px] space-y-2">
                    <div
                        ref={progressBarRef}
                        className="group relative flex h-1.5 cursor-pointer items-center rounded-full bg-muted/20"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        <motion.div
                            className="relative h-full rounded-full bg-primary"
                            style={{ width: `${scrubProgress}%` }}
                            transition={isScrubbing ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.5 }}
                        >
                            {/* Knob */}
                            <div
                                className={`absolute top-1/2 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary shadow-lg transition-transform ${isScrubbing ? 'scale-125' : 'scale-0 group-hover:scale-100'}`}
                            ></div>
                        </motion.div>
                    </div>
                    <div className="flex justify-between font-mono text-[8px] text-muted-foreground/50 tabular-nums sm:text-[9px]">
                        <span>{isScrubbing ? 'Scrubbing...' : musicTime}</span>
                        <span>{musicDuration}</span>
                    </div>
                </div>

                {/* Minimal Controls */}
                <div className="flex items-center justify-center gap-6 pt-1 sm:gap-8">
                    <button className="text-muted-foreground/50 transition-all hover:text-foreground active:scale-75">
                        <SkipBack className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-all hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
                    >
                        {isPlaying ? (
                            <Pause className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                        ) : (
                            <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
                        )}
                    </button>
                    <button className="text-muted-foreground/50 transition-all hover:text-foreground active:scale-75">
                        <SkipForward className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                    </button>
                </div>
            </div>

            {/* Micro Visualizer */}
            <div className="mt-2 flex h-2 justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        animate={isPlaying ? { height: [2, 6, 2] } : { height: 2 }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-0.5 rounded-full bg-primary/20"
                    />
                ))}
            </div>
        </div>
    );
}
