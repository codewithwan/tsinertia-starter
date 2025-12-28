import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

interface FloatingMusicWidgetProps {
    showWidget: boolean;
    musicProgress: number;
    isPlaying: boolean;
    togglePlay: () => void;
    setDockWindow: (val: string | null) => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export function FloatingMusicWidget({
    showWidget,
    musicProgress,
    isPlaying,
    togglePlay,
    setDockWindow,
    containerRef
}: FloatingMusicWidgetProps) {
    return (
        <AnimatePresence>
            {showWidget && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.8 }}
                    className="fixed bottom-8 right-6 z-[9999] group"
                >
                    <div
                        className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 cursor-pointer hover:bg-background transition-all hover:scale-105 active:scale-95"
                        onClick={() => {
                            setDockWindow('music');
                            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className="relative">
                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 rounded-full bg-muted/50 border border-border/20 flex items-center justify-center overflow-hidden"
                            >
                                <Music className="w-6 h-6 text-primary/40" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background border border-border/30 rounded-full z-10"></div>
                        </div>

                        <div className="flex flex-col pr-2 text-left">
                            <span className="text-[10px] font-bold text-foreground leading-tight">Back to Friends</span>
                            <span className="text-[9px] text-muted-foreground">Sombr</span>
                            <div className="mt-1.5 h-1 w-24 bg-muted/30 rounded-full overflow-hidden">
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
                            className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                        >
                            {isPlaying ? (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>
                    </div>

                    {isPlaying && (
                        <div className="absolute -inset-1 border border-primary/20 rounded-[1.25rem] animate-ping opacity-20 pointer-events-none"></div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
