import { motion } from 'framer-motion';
import { Music, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface MusicWindowProps {
    isPlaying: boolean;
    musicProgress: number;
    musicTime: string;
    musicDuration: string;
    togglePlay: () => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function MusicWindow({
    isPlaying,
    musicProgress,
    musicTime,
    musicDuration,
    togglePlay,
    audioRef
}: MusicWindowProps) {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [scrubProgress, setScrubProgress] = useState(0);

    // Sync scrub progress when not scrubbing
    useEffect(() => {
        if (!isScrubbing) {
            setScrubProgress(musicProgress);
        }
    }, [musicProgress, isScrubbing]);

    const handleScrubMove = (e: MouseEvent | TouchEvent) => {
        if (!progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setScrubProgress(percentage);
    };

    const handleScrubEnd = () => {
        if (isScrubbing && audioRef.current) {
            const duration = audioRef.current.duration || 0;
            audioRef.current.currentTime = (scrubProgress / 100) * duration;
        }
        setIsScrubbing(false);
    };

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
    }, [isScrubbing, scrubProgress]);

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
        <div className="h-full flex flex-col bg-background p-4 sm:p-5 select-none font-sans">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                {/* Cleanest Rotating Logo */}
                <div className="relative">
                    <div
                        className={`absolute -inset-6 bg-primary/10 blur-[40px] rounded-full transition-opacity duration-1000 ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'}`}
                    ></div>
                    <motion.div
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="w-28 h-28 sm:w-36 sm:h-36 bg-muted/20 border border-border/40 rounded-full flex items-center justify-center relative shadow-sm overflow-hidden"
                    >
                        <Music className={`w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-500 absolute ${isPlaying ? 'text-primary' : 'text-muted-foreground/10'}`} strokeWidth={1} style={{ opacity: isPlaying ? 0.4 : 0.1 }} />
                        <div className="absolute inset-2 border border-border/5 rounded-full"></div>
                    </motion.div>
                </div>

                {/* Small Info */}
                <div className="text-center w-full px-2">
                    <div className="text-sm sm:text-base font-bold text-foreground truncate">Back to Friends</div>
                    <div className="text-[9px] sm:text-[10px] text-primary uppercase tracking-[0.2em] font-medium opacity-70">Sombr</div>
                </div>

                {/* Interactive Progress Bar */}
                <div className="w-full max-w-[240px] space-y-2">
                    <div
                        ref={progressBarRef}
                        className="h-1.5 bg-muted/20 rounded-full cursor-pointer group relative flex items-center"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        <motion.div
                            className="h-full bg-primary rounded-full relative"
                            style={{ width: `${scrubProgress}%` }}
                            transition={isScrubbing ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.5 }}
                        >
                            {/* Knob */}
                            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg transform translate-x-1/2 transition-transform ${isScrubbing ? 'scale-125' : 'scale-0 group-hover:scale-100'}`}></div>
                        </motion.div>
                    </div>
                    <div className="flex justify-between text-[8px] sm:text-[9px] font-mono text-muted-foreground/50 tabular-nums">
                        <span>{isScrubbing ? "Scrubbing..." : musicTime}</span>
                        <span>{musicDuration}</span>
                    </div>
                </div>

                {/* Minimal Controls */}
                <div className="flex items-center justify-center gap-6 sm:gap-8 pt-1">
                    <button className="text-muted-foreground/50 hover:text-foreground transition-all active:scale-75">
                        <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md"
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                        ) : (
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                        )}
                    </button>
                    <button className="text-muted-foreground/50 hover:text-foreground transition-all active:scale-75">
                        <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </button>
                </div>
            </div>

            {/* Micro Visualizer */}
            <div className="flex justify-center gap-0.5 h-2 mt-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <motion.div
                        key={i}
                        animate={isPlaying ? { height: [2, 6, 2] } : { height: 2 }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        className="w-0.5 bg-primary/20 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
