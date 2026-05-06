import { AnimatePresence, motion } from 'framer-motion';
import { Music } from 'lucide-react';

interface FloatingMusicWidgetProps {
    showWidget: boolean;
    musicProgress: number;
    isPlaying: boolean;
    togglePlay: () => void;
    setDockWindow: (val: string | null) => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export function FloatingMusicWidget({ showWidget, musicProgress, isPlaying, togglePlay, setDockWindow, containerRef }: FloatingMusicWidgetProps) {
    return (
        <AnimatePresence>
            {showWidget && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    className="group fixed right-6 bottom-8 z-[9999]"
                >
                    <div
                        className="flex cursor-pointer items-center gap-4 rounded-2xl border border-border/50 bg-background/80 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all hover:scale-105 hover:bg-background active:scale-95"
                        onClick={() => {
                            setDockWindow('music');
                            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className="relative">
                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border/20 bg-muted/50"
                            >
                                <Music className="h-6 w-6 text-primary/40" />
                            </motion.div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-transparent"></div>
                            <div className="absolute top-1/2 left-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30 bg-background"></div>
                        </div>

                        <div className="flex flex-col pr-2 text-left">
                            <span className="text-[10px] leading-tight font-bold text-foreground">Back to Friends</span>
                            <span className="text-[9px] text-muted-foreground">Sombr</span>
                            <div className="mt-1.5 h-1 w-24 overflow-hidden rounded-full bg-muted/30">
                                <motion.div
                                    className="h-full bg-primary"
                                    animate={{ width: `${musicProgress}%` }}
                                    transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all hover:scale-110 active:scale-95"
                        >
                            {isPlaying ? (
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg className="ml-0.5 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {isPlaying && (
                        <div className="pointer-events-none absolute -inset-1 animate-ping rounded-[1.25rem] border border-primary/20 opacity-20"></div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
