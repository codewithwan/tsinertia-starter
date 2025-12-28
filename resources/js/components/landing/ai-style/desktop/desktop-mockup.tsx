import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Battery, Search } from 'lucide-react';
import { DesktopMockupProps, deskopIcons, dockApps, mockNotifications } from './desktop-config';
import { WindowWrapper } from './window-wrapper';
import { FolderWindow } from './folder-window';
import { TerminalWindow } from './terminal-window';
import { VSCodeWindow } from './vscode-window';
import { BrowserWindow } from './browser-window';
import { EmailWindow } from './email-window';
import { MessageWindow } from './message-window';
import { MusicWindow } from './music-window';
import { NotepadWindow } from './notepad-window';

interface ActiveWindow {
    id: string;
    title: string;
    type: string;
    offsetX: number;
    offsetY: number;
    notepadFile?: string;
}

export default function DesktopMockup({
    isPlaying,
    musicProgress,
    musicTime,
    musicDuration,
    togglePlay,
    dockWindow,
    setDockWindow,
    audioRef
}: DesktopMockupProps) {
    const [windows, setWindows] = useState<ActiveWindow[]>([]);
    const [currentTime, setCurrentTime] = useState('');
    const [currentNotification, setCurrentNotification] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const mockupRef = useRef<HTMLDivElement>(null);

    const addWindow = (id: string, title: string, type: string, notepadFile?: string) => {
        setWindows(prev => {
            const existingIndex = prev.findIndex(w => w.id === id);

            if (existingIndex !== -1) {
                const existing = prev[existingIndex];
                const rest = prev.filter((_, i) => i !== existingIndex);
                if (type === 'notepad' && notepadFile) {
                    return [...rest, { ...existing, notepadFile, title: notepadFile }];
                }
                return [...rest, existing];
            }

            const offset = (prev.length * 25) % 100;
            const newWindow: ActiveWindow = {
                id,
                title,
                type,
                offsetX: type === 'music' ? 0 : -40 + offset,
                offsetY: type === 'music' ? 0 : -30 + offset,
                notepadFile
            };
            return [...prev, newWindow];
        });
    };

    const closeWindow = (id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
    };

    const focusWindow = (id: string) => {
        setWindows(prev => {
            const win = prev.find(w => w.id === id);
            if (!win) return prev;
            return [...prev.filter(w => w.id !== id), win];
        });
    };

    useEffect(() => {
        if (dockWindow) {
            const titles: Record<string, string> = {
                'browser': 'Chrome',
                'email': 'Mail',
                'message': 'Messages',
                'music': 'Spotify',
                'folder': 'Projects',
                'terminal': 'Terminal',
                'vscode': 'VS Code'
            };
            const type = dockWindow as string;
            addWindow(type, titles[type] || type, type);
            setDockWindow(null);
        }
    }, [dockWindow, setDockWindow]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            setCurrentTime(`${days[now.getDay()]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768) return;
        const initialTimeout = setTimeout(() => setShowNotification(true), 2000);
        const notificationInterval = setInterval(() => {
            setShowNotification(false);
            setTimeout(() => {
                setCurrentNotification((prev) => (prev + 1) % mockNotifications.length);
                setShowNotification(true);
            }, 500);
        }, 6000);
        return () => {
            clearTimeout(initialTimeout);
            clearInterval(notificationInterval);
        };
    }, []);

    return (
        <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl px-4 sm:px-0">
            <div className="relative bg-background rounded-lg sm:rounded-xl border border-border shadow-2xl overflow-hidden h-full">
                {/* Menu Bar */}
                <div className="flex items-center justify-between px-2 sm:px-4 py-1 sm:py-1.5 bg-muted/50 backdrop-blur-xl border-b border-border/50">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="text-[10px] sm:text-xs font-semibold"></span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline font-bold">Finder</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">File</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">Edit</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">View</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3 text-muted-foreground">
                        <Search className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <Wifi className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <Battery className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span className="text-[10px] sm:text-xs tabular-nums">{currentTime || 'Loading...'}</span>
                    </div>
                </div>

                {/* Desktop Content */}
                <div
                    ref={mockupRef}
                    className="relative h-full bg-gradient-to-br from-background via-muted/20 to-background p-2 sm:p-6 pb-24 sm:pb-32 overflow-hidden"
                >
                    {/* Icons Grid */}
                    <div className="grid grid-cols-6 gap-2 sm:gap-6 p-2 sm:p-4 relative z-10">
                        {deskopIcons.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                    if (window.innerWidth >= 768) {
                                        addWindow(item.type, item.label, item.type);
                                    }
                                }}
                                className="flex flex-col items-center gap-0.5 sm:gap-1 md:cursor-pointer group"
                            >
                                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-md sm:rounded-lg bg-muted/30 border border-border/30 backdrop-blur group-hover:border-border transition-colors flex items-center justify-center">
                                    <item.icon className={`h-4 w-4 sm:h-7 sm:w-7 ${item.color}`} />
                                </div>
                                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block whitespace-nowrap">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stacked Windows Rendering */}
                    <AnimatePresence>
                        {windows.map((win, idx) => (
                            <WindowWrapper
                                key={win.id}
                                title={win.title}
                                onClose={() => closeWindow(win.id)}
                                onFocus={() => focusWindow(win.id)}
                                offsetX={win.offsetX}
                                offsetY={win.offsetY}
                                dragConstraints={mockupRef}
                                style={{ zIndex: 30 + idx }}
                                className={win.type === 'music' ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] h-fit bottom-auto right-auto min-h-0' : ''}
                            >
                                {win.type === 'folder' && <FolderWindow setNotepadFile={(file) => file && addWindow('notepad', file, 'notepad', file)} />}
                                {win.type === 'terminal' && <TerminalWindow />}
                                {win.type === 'vscode' && <VSCodeWindow />}
                                {win.type === 'browser' && <BrowserWindow />}
                                {win.type === 'email' && <EmailWindow />}
                                {win.type === 'message' && <MessageWindow />}
                                {win.type === 'music' && (
                                    <MusicWindow
                                        isPlaying={isPlaying}
                                        musicProgress={musicProgress}
                                        musicTime={musicTime}
                                        musicDuration={musicDuration}
                                        togglePlay={togglePlay}
                                        audioRef={audioRef}
                                    />
                                )}
                                {win.type === 'notepad' && win.notepadFile && (
                                    <NotepadWindow file={win.notepadFile} />
                                )}
                            </WindowWrapper>
                        ))}
                    </AnimatePresence>

                    {/* Notifications & Hints */}
                    <AnimatePresence>
                        {showNotification && (
                            <motion.div
                                initial={{ opacity: 0, x: 100, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: 100, y: -20 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                className="hidden md:block absolute top-4 right-4 z-[50]"
                            >
                                <div className="w-64 bg-background/80 backdrop-blur-md border border-border/30 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-3">
                                        <div className="flex items-start gap-2.5">
                                            <div className={`w-8 h-8 rounded-full ${mockNotifications[currentNotification].color} flex items-center justify-center flex-shrink-0`}>
                                                <span className="text-xs font-semibold">{mockNotifications[currentNotification].avatar}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <p className="text-xs font-semibold text-foreground text-left">{mockNotifications[currentNotification].name}</p>
                                                    <span className="text-[10px] text-muted-foreground text-left">{mockNotifications[currentNotification].time}</span>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground leading-relaxed text-left">{mockNotifications[currentNotification].message}</p>
                                            </div>
                                            {(() => {
                                                const Icon = mockNotifications[currentNotification].icon;
                                                return Icon ? <Icon className="w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0 mt-0.5" /> : null;
                                            })()}
                                        </div>
                                    </div>
                                    <div className="h-0.5 bg-muted/20">
                                        <motion.div
                                            className="h-full bg-primary/40"
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 5.5, ease: 'linear' }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="hidden md:flex absolute bottom-24 left-4 items-center gap-2 px-3 py-2 bg-background/60 backdrop-blur-sm border border-border/20 rounded-lg shadow-sm z-[25] pointer-events-none"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <p className="text-[10px] text-muted-foreground">
                            <span className="text-foreground font-medium">Multi-Window!</span> Open multiple apps at once
                        </p>
                    </motion.div>

                    {/* Dock */}
                    <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100]">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-end gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted/40 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl"
                        >
                            {dockApps.map((app, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -8, scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                    className="w-7 h-7 sm:w-11 sm:h-11 rounded-md sm:rounded-lg bg-muted border border-border/30 md:cursor-pointer flex items-center justify-center"
                                    onClick={() => {
                                        if (window.innerWidth >= 768) {
                                            const types = ['folder', 'browser', 'terminal', 'vscode', 'email', 'message', 'music'];
                                            const type = types[i];
                                            const titles: Record<string, string> = {
                                                'folder': 'Projects',
                                                'browser': 'Chrome',
                                                'terminal': 'Terminal',
                                                'vscode': 'VS Code',
                                                'email': 'Mail',
                                                'message': 'Messages',
                                                'music': 'Spotify'
                                            };
                                            addWindow(type, titles[type] || type, type);
                                        }
                                    }}
                                >
                                    <app.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${app.color}`} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
