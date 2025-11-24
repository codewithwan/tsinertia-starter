import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Code2, Brain, Wifi, Battery, Search, Folder, Terminal, Code, Mail, MessageSquare, Music, Globe, Minus, FileText, Image as ImageIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeroSectionProps {
    className?: string;
}

const deskopIcons = [
    { icon: Folder, label: 'Projects', color: 'text-foreground', type: 'folder' },
    { icon: Terminal, label: 'Terminal', color: 'text-foreground', type: 'terminal' },
    { icon: Code, label: 'VS Code', color: 'text-foreground', type: 'vscode' },
];

const dockApps = [
    { icon: Folder, color: 'text-foreground' },
    { icon: Globe, color: 'text-foreground' },
    { icon: Terminal, color: 'text-foreground' },
    { icon: Code, color: 'text-foreground' },
    { icon: Mail, color: 'text-foreground' },
    { icon: MessageSquare, color: 'text-foreground' },
    { icon: Music, color: 'text-foreground' },
];

function DesktopMockup() {
    const [openWindow, setOpenWindow] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['my-website']));
    const [explorerExpanded, setExplorerExpanded] = useState<Set<string>>(new Set(['Projects']));
    const [notepadFile, setNotepadFile] = useState<string | null>(null);
    const [dockWindow, setDockWindow] = useState<string | null>(null);
    const [browserTab, setBrowserTab] = useState<'localhost' | 'tunnel' | 'fesnuk'>('localhost');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = days[now.getDay()];
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${day} ${hours}:${minutes}`);
        };
        
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl px-4 sm:px-0">
            {/* MacOS Screen */}
            <div className="relative bg-background rounded-lg sm:rounded-xl border border-border shadow-2xl overflow-hidden h-full">
                {/* Menu Bar */}
                <div className="flex items-center justify-between px-2 sm:px-4 py-1 sm:py-1.5 bg-muted/50 backdrop-blur-xl border-b border-border/50">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="text-[10px] sm:text-xs font-semibold"></span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">Finder</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">File</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">Edit</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground hidden md:inline">View</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-3">
                        <Search className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                        <Wifi className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                        <Battery className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{currentTime || 'Loading...'}</span>
                    </div>
                </div>

                {/* Desktop Wallpaper/Background */}
                <div className="relative h-full bg-gradient-to-br from-background via-muted/20 to-background p-2 sm:p-6">
                    {/* Desktop Icons Grid */}
                    <div className="grid grid-cols-6 gap-2 sm:gap-6 p-2 sm:p-4">
                        {deskopIcons.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => {
                                    // Only allow interaction on tablet and desktop
                                    if (window.innerWidth >= 768) {
                                        setOpenWindow(i);
                                    }
                                }}
                                className="flex flex-col items-center gap-0.5 sm:gap-1 md:cursor-pointer group"
                            >
                                <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-md sm:rounded-lg bg-muted/30 border border-border/30 backdrop-blur group-hover:border-border transition-colors flex items-center justify-center">
                                    <item.icon className={`h-4 w-4 sm:h-7 sm:w-7 ${item.color}`} />
                                </div>
                                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Window - Only show on tablet and desktop */}
                    <AnimatePresence>
                        {openWindow !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="hidden md:block absolute top-8 sm:top-16 left-2 sm:left-8 right-2 sm:right-8 bottom-12 sm:bottom-20 bg-background/95 backdrop-blur-xl border border-border rounded-lg sm:rounded-xl shadow-2xl overflow-hidden z-20"
                            >
                                {/* Window Header */}
                                <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted/30 border-b border-border/50">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <button onClick={() => setOpenWindow(null)} className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors border border-red-500/30"></button>
                                        <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 transition-colors border border-yellow-500/30"></button>
                                        <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/20 hover:bg-green-500/40 transition-colors border border-green-500/30"></button>
                                    </div>
                                    <span className="text-[10px] sm:text-xs font-medium">{deskopIcons[openWindow].label}</span>
                                    <div className="flex items-center gap-2 opacity-0">
                                        <Minus className="h-2 w-2 sm:h-3 sm:w-3 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Window Content */}
                                <div className="h-full overflow-hidden pb-4 sm:pb-8">
                                    {deskopIcons[openWindow].type === 'folder' && (
                                        <div className="flex h-full">
                                            {/* Sidebar */}
                                            <div className="w-24 sm:w-48 bg-muted/20 border-r border-border/30 p-1 sm:p-3 space-y-0.5 sm:space-y-1 overflow-auto">
                                                <div className="text-[8px] sm:text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1 sm:mb-2">Favorites</div>

                                                {/* Projects */}
                                                <div>
                                                    <div
                                                        className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]"
                                                        onClick={() => {
                                                            const newExpanded = new Set(explorerExpanded);
                                                            if (explorerExpanded.has('Projects')) {
                                                                newExpanded.delete('Projects');
                                                            } else {
                                                                newExpanded.add('Projects');
                                                            }
                                                            setExplorerExpanded(newExpanded);
                                                        }}
                                                    >
                                                        <span className="text-foreground/40 text-[6px] sm:text-[8px]">{explorerExpanded.has('Projects') ? '▼' : '▶'}</span>
                                                        <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                                                        <span className="hidden sm:inline">Projects</span>
                                                        <span className="sm:hidden">Proj</span>
                                                    </div>
                                                    {explorerExpanded.has('Projects') && (
                                                        <div className="pl-2 sm:pl-4 space-y-0.5 mt-0.5 sm:mt-1">
                                                            <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]">
                                                                <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                                                                <span className="hidden sm:inline">my-website</span>
                                                            </div>
                                                            <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]">
                                                                <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                                                                <span className="hidden sm:inline">backend-api</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Documents */}
                                                <div>
                                                    <div
                                                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-[10px]"
                                                        onClick={() => {
                                                            const newExpanded = new Set(explorerExpanded);
                                                            if (explorerExpanded.has('Documents')) {
                                                                newExpanded.delete('Documents');
                                                            } else {
                                                                newExpanded.add('Documents');
                                                            }
                                                            setExplorerExpanded(newExpanded);
                                                        }}
                                                    >
                                                        <span className="text-foreground/40 text-[8px]">{explorerExpanded.has('Documents') ? '▼' : '▶'}</span>
                                                        <Folder className="h-3 w-3 text-foreground/60" />
                                                        <span>Documents</span>
                                                    </div>
                                                    {explorerExpanded.has('Documents') && (
                                                        <div className="pl-4 space-y-0.5 mt-1">
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 text-[10px]">
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>notes.txt</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 text-[10px]">
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>README.md</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Images */}
                                                <div>
                                                    <div
                                                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-[10px]"
                                                        onClick={() => {
                                                            const newExpanded = new Set(explorerExpanded);
                                                            if (explorerExpanded.has('Images')) {
                                                                newExpanded.delete('Images');
                                                            } else {
                                                                newExpanded.add('Images');
                                                            }
                                                            setExplorerExpanded(newExpanded);
                                                        }}
                                                    >
                                                        <span className="text-foreground/40 text-[8px]">{explorerExpanded.has('Images') ? '▼' : '▶'}</span>
                                                        <ImageIcon className="h-3 w-3 text-foreground/60" />
                                                        <span>Images</span>
                                                    </div>
                                                    {explorerExpanded.has('Images') && (
                                                        <div className="pl-4 space-y-0.5 mt-1">
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 text-[10px]">
                                                                <ImageIcon className="h-3 w-3 text-foreground/60" />
                                                                <span>banner.png</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 text-[10px]">
                                                                <ImageIcon className="h-3 w-3 text-foreground/60" />
                                                                <span>logo.svg</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Downloads */}
                                                <div>
                                                    <div
                                                        className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-[10px]"
                                                        onClick={() => {
                                                            const newExpanded = new Set(explorerExpanded);
                                                            if (explorerExpanded.has('Downloads')) {
                                                                newExpanded.delete('Downloads');
                                                            } else {
                                                                newExpanded.add('Downloads');
                                                            }
                                                            setExplorerExpanded(newExpanded);
                                                        }}
                                                    >
                                                        <span className="text-foreground/40 text-[8px]">{explorerExpanded.has('Downloads') ? '▼' : '▶'}</span>
                                                        <FileText className="h-3 w-3 text-foreground/60" />
                                                        <span>Downloads</span>
                                                    </div>
                                                    {explorerExpanded.has('Downloads') && (
                                                        <div className="pl-4 space-y-0.5 mt-1">
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[10px]">
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>waifu_collection.zip</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[10px]">
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>neko_paradise_v2.rar</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[10px]">
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>totally_not_hentai.mp4</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Main Content - Always show file list */}
                                            <div className="flex-1 p-2 sm:p-4 overflow-auto">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                                                    {[
                                                        { icon: Folder, name: 'my-website', type: 'folder' },
                                                        { icon: Folder, name: 'backend-api', type: 'folder' },
                                                        { icon: FileText, name: 'README.md', type: 'file' },
                                                        { icon: Folder, name: 'frontend', type: 'folder' },
                                                        { icon: FileText, name: 'package.json', type: 'file' },
                                                        { icon: ImageIcon, name: 'logo.png', type: 'file' },
                                                        { icon: FileText, name: 'notes.txt', type: 'file' },
                                                        { icon: ImageIcon, name: 'banner.png', type: 'file' },
                                                        { icon: ImageIcon, name: 'my-bini.png', type: 'file' },
                                                    ].map((item, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex flex-col items-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded hover:bg-muted/50 cursor-pointer"
                                                            onDoubleClick={() => {
                                                                if (item.type === 'file') {
                                                                    setNotepadFile(item.name);
                                                                }
                                                            }}
                                                        >
                                                            <item.icon className="h-4 w-4 sm:h-8 sm:w-8 text-foreground" />
                                                            <span className="text-[8px] sm:text-[10px] text-center text-muted-foreground truncate w-full">{item.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {deskopIcons[openWindow].type === 'terminal' && (
                                        <div className="p-2 sm:p-4 h-full font-mono text-[8px] sm:text-xs bg-black dark:bg-black overflow-hidden">
                                            <div className="space-y-0.5 sm:space-y-1 text-white dark:text-white text-left">
                                                <div>$ idl http 3000</div>
                                                <div className="mt-1 sm:mt-2">Starting IDCloudlabs HTTP tunnel...</div>
                                                <div className="mt-0.5 sm:mt-1">✓ Tunnel established</div>
                                                <div>✓ Public URL: https://abc123.idl.dev</div>
                                                <div className="mt-1 sm:mt-2">Listening on port 3000...</div>
                                                <div className="opacity-50 mt-1.5 sm:mt-3">─────────────────────────────</div>
                                                <div className="mt-1 sm:mt-2">[12:34:15] GET / - 200 OK (12ms)</div>
                                                <div>[12:34:18] GET /api/users - 200 OK (45ms)</div>
                                                <div>[12:34:22] POST /api/login - 201 Created (89ms)</div>
                                                <div>[12:34:25] GET /assets/style.css - 200 OK (5ms)</div>
                                                <div>[12:34:28] GET /api/data - 200 OK (23ms)</div>
                                                <div className="mt-1 sm:mt-2 flex items-center gap-1">
                                                    <span>$</span>
                                                    <span className="animate-pulse">_</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {deskopIcons[openWindow].type === 'vscode' && (
                                        <div className="h-full flex bg-muted/20 overflow-hidden">
                                            {/* VSCode Sidebar */}
                                            <div className="w-20 sm:w-48 bg-muted/30 border-r border-border/30 p-1 sm:p-2 space-y-0.5 sm:space-y-1 overflow-hidden">
                                                <div className="text-[8px] sm:text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1 sm:mb-2">File</div>
                                                <div className="space-y-0.5">
                                                    <div
                                                        className="flex items-center gap-1 px-1 py-0.5 hover:bg-muted/50 cursor-pointer text-[10px]"
                                                        onClick={() => {
                                                            const newExpanded = new Set(expandedFolders);
                                                            if (expandedFolders.has('my-website')) {
                                                                newExpanded.delete('my-website');
                                                            } else {
                                                                newExpanded.add('my-website');
                                                            }
                                                            setExpandedFolders(newExpanded);
                                                        }}
                                                    >
                                                        <span className="text-foreground/40">{expandedFolders.has('my-website') ? '▼' : '▶'}</span>
                                                        <Folder className="h-3 w-3 text-foreground/60" />
                                                        <span>my-website</span>
                                                    </div>
                                                    {expandedFolders.has('my-website') && (
                                                        <div className="pl-4 space-y-0.5">
                                                            <div
                                                                className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer text-[10px] ${activeTab === 'html' ? 'bg-muted/70' : 'hover:bg-muted/50'}`}
                                                                onClick={() => setActiveTab('html')}
                                                            >
                                                                <Code className="h-3 w-3 text-foreground/60" />
                                                                <span>index.html</span>
                                                            </div>
                                                            <div
                                                                className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer text-[10px] ${activeTab === 'css' ? 'bg-muted/70' : 'hover:bg-muted/50'}`}
                                                                onClick={() => setActiveTab('css')}
                                                            >
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>style.css</span>
                                                            </div>
                                                            <div
                                                                className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer text-[10px] ${activeTab === 'js' ? 'bg-muted/70' : 'hover:bg-muted/50'}`}
                                                                onClick={() => setActiveTab('js')}
                                                            >
                                                                <FileText className="h-3 w-3 text-foreground/60" />
                                                                <span>main.js</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Main Editor */}
                                            <div className="flex-1 flex flex-col overflow-hidden">
                                                {/* Tab Bar */}
                                                <div className="flex items-center gap-px bg-muted/40 border-b border-border/30">
                                                    <div
                                                        className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer border-r border-border/20 ${activeTab === 'html' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                        onClick={() => setActiveTab('html')}
                                                    >
                                                        <Code className="h-3 w-3 text-foreground/60" />
                                                        <span className="text-foreground/80">index.html</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer border-r border-border/20 ${activeTab === 'css' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                        onClick={() => setActiveTab('css')}
                                                    >
                                                        <FileText className="h-3 w-3 text-foreground/60" />
                                                        <span className="text-foreground/80">style.css</span>
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer ${activeTab === 'js' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                        onClick={() => setActiveTab('js')}
                                                    >
                                                        <FileText className="h-3 w-3 text-foreground/60" />
                                                        <span className="text-foreground/80">main.js</span>
                                                    </div>
                                                </div>

                                                {/* Code Editor */}
                                                <div className="flex-1 p-4 font-mono text-xs space-y-1 overflow-hidden">
                                                    {activeTab === 'html' && (
                                                        <>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">1</span>
                                                                <div><span className="text-red-400">&lt;!DOCTYPE</span> <span className="text-orange-400">html</span><span className="text-red-400">&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">2</span>
                                                                <div><span className="text-red-400">&lt;html</span> <span className="text-yellow-400">lang</span>=<span className="text-green-400">"en"</span><span className="text-red-400">&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">3</span>
                                                                <div><span className="text-red-400">&lt;head&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">4</span>
                                                                <div className="pl-4"><span className="text-red-400">&lt;link</span> <span className="text-yellow-400">rel</span>=<span className="text-green-400">"stylesheet"</span> <span className="text-yellow-400">href</span>=<span className="text-green-400">"style.css"</span><span className="text-red-400">&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">5</span>
                                                                <div><span className="text-red-400">&lt;/head&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">6</span>
                                                                <div><span className="text-red-400">&lt;body&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">7</span>
                                                                <div className="pl-4"><span className="text-red-400">&lt;h1&gt;</span><span className="text-foreground/80">Welcome!</span><span className="text-red-400">&lt;/h1&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">8</span>
                                                                <div className="pl-4"><span className="text-red-400">&lt;script</span> <span className="text-yellow-400">src</span>=<span className="text-green-400">"main.js"</span><span className="text-red-400">&gt;&lt;/script&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">9</span>
                                                                <div><span className="text-red-400">&lt;/body&gt;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">10</span>
                                                                <div><span className="text-red-400">&lt;/html&gt;</span></div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {activeTab === 'css' && (
                                                        <>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">1</span>
                                                                <div><span className="text-yellow-400">body</span> <span className="text-foreground/60">{`{`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">2</span>
                                                                <div className="pl-4"><span className="text-blue-400">font-family</span><span className="text-foreground/60">:</span> <span className="text-orange-400">sans-serif</span><span className="text-foreground/60">;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">3</span>
                                                                <div className="pl-4"><span className="text-blue-400">margin</span><span className="text-foreground/60">:</span> <span className="text-purple-400">0</span><span className="text-foreground/60">;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">4</span>
                                                                <div><span className="text-foreground/60">{`}`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">5</span>
                                                                <div></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">6</span>
                                                                <div><span className="text-yellow-400">h1</span> <span className="text-foreground/60">{`{`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">7</span>
                                                                <div className="pl-4"><span className="text-blue-400">color</span><span className="text-foreground/60">:</span> <span className="text-green-400">#333</span><span className="text-foreground/60">;</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">8</span>
                                                                <div><span className="text-foreground/60">{`}`}</span></div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {activeTab === 'js' && (
                                                        <>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">1</span>
                                                                <div><span className="text-blue-400">console</span><span className="text-foreground/60">.</span><span className="text-yellow-400">log</span><span className="text-foreground/60">(</span><span className="text-green-400">'Hello IDL!'</span><span className="text-foreground/60">);</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">2</span>
                                                                <div></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">3</span>
                                                                <div><span className="text-purple-400">const</span> <span className="text-blue-300">app</span> <span className="text-foreground/60">=</span> <span className="text-foreground/60">{`{`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">4</span>
                                                                <div className="pl-4"><span className="text-blue-300">init</span><span className="text-foreground/60">:</span> <span className="text-purple-400">function</span><span className="text-foreground/60">() {`{`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">5</span>
                                                                <div className="pl-8"><span className="text-blue-400">console</span><span className="text-foreground/60">.</span><span className="text-yellow-400">log</span><span className="text-foreground/60">(</span><span className="text-green-400">'App started'</span><span className="text-foreground/60">);</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">6</span>
                                                                <div className="pl-4"><span className="text-foreground/60">{`}`}</span></div>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <span className="text-muted-foreground/40 select-none w-6 text-right">7</span>
                                                                <div><span className="text-foreground/60">{`}`};</span></div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Notepad Window */}
                    <AnimatePresence>
                        {notepadFile && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="absolute top-12 left-16 right-16 bottom-16 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-30"
                            >
                                {/* Notepad Header */}
                                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setNotepadFile(null)} className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors border border-red-500/30"></button>
                                        <button className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 transition-colors border border-yellow-500/30"></button>
                                        <button className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500/40 transition-colors border border-green-500/30"></button>
                                    </div>
                                    <span className="text-xs font-medium">{notepadFile}</span>
                                    <div className="flex items-center gap-2 opacity-0">
                                        <Minus className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Notepad Content */}
                                <div className="h-full overflow-auto p-4 font-mono text-xs text-left">
                                    {notepadFile === 'notes.txt' && (
                                        <div className="space-y-2 text-foreground/80">
                                            <p>Personal Notes - 2025</p>
                                            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <p className="mt-2">TODO:</p>
                                            <p>- Deploy website to IDL</p>
                                            <p>- Fix API endpoints</p>
                                            <p>- Update documentation</p>
                                        </div>
                                    )}
                                    {notepadFile === 'README.md' && (
                                        <div className="space-y-2 text-foreground/80">
                                            <p className="font-semibold"># My Project</p>
                                            <p className="mt-2">Welcome to my awesome project!</p>
                                            <p className="mt-2">## Installation</p>
                                            <p>npm install</p>
                                            <p className="mt-2">## Usage</p>
                                            <p>Run `idl http 3000` to start development server.</p>
                                            <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    )}
                                    {notepadFile === 'package.json' && (
                                        <div className="space-y-1 text-foreground/80">
                                            <p>{`{`}</p>
                                            <p className="pl-4">"name": "my-awesome-app",</p>
                                            <p className="pl-4">"version": "1.0.0",</p>
                                            <p className="pl-4">"description": "A simple web application",</p>
                                            <p className="pl-4">"scripts": {`{`}</p>
                                            <p className="pl-8">"dev": "idl http 3000",</p>
                                            <p className="pl-8">"build": "vite build"</p>
                                            <p className="pl-4">{`}`},</p>
                                            <p className="pl-4">"dependencies": {`{`}</p>
                                            <p className="pl-8">"react": "^18.2.0",</p>
                                            <p className="pl-8">"vite": "^5.0.0"</p>
                                            <p className="pl-4">{`}`}</p>
                                            <p>{`}`}</p>
                                        </div>
                                    )}
                                    {notepadFile === 'my-bini.png' && (
                                        <div className="flex items-center justify-center h-full pb-16">
                                            <img
                                                src="/assets/my_bini.jpg"
                                                alt="my-bini"
                                                className="max-w-full max-h-full object-contain rounded-lg"
                                            />
                                        </div>
                                    )}
                                    {(notepadFile === 'logo.png' || notepadFile === 'banner.png' || notepadFile === 'logo.svg') && (
                                        <div className="flex flex-col items-center justify-center h-64">
                                            <div className={`${notepadFile === 'banner.png' ? 'w-64 h-32' : 'w-48 h-48'} bg-gradient-to-br from-primary/30 to-primary/10 ${notepadFile === 'logo.svg' ? 'rounded-full border-2' : 'rounded-lg border'} border-primary/20 flex items-center justify-center`}>
                                                <ImageIcon className="w-20 h-20 text-primary/40" />
                                            </div>
                                            <p className="mt-4 text-center text-foreground/70">
                                                {notepadFile === 'logo.svg' ? 'SVG Vector - Scalable' :
                                                 notepadFile === 'banner.png' ? 'PNG Image - 1920 x 400 px' :
                                                 'PNG Image - 800 x 600 px'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Dock App Windows - Only show on tablet and desktop */}
                    <AnimatePresence>
                        {dockWindow && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="hidden md:block absolute top-12 left-16 right-16 bottom-16 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-40"
                            >
                                {/* Window Header */}
                                <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/50">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setDockWindow(null)} className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors border border-red-500/30"></button>
                                        <button className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 transition-colors border border-yellow-500/30"></button>
                                        <button className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500/40 transition-colors border border-green-500/30"></button>
                                    </div>
                                    <span className="text-xs font-medium">
                                        {dockWindow === 'browser' && 'Chrome'}
                                        {dockWindow === 'email' && 'Mail'}
                                        {dockWindow === 'message' && 'Messages'}
                                        {dockWindow === 'music' && 'Spotify'}
                                    </span>
                                    <div className="flex items-center gap-2 opacity-0">
                                        <Minus className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Window Content */}
                                <div className="h-full overflow-hidden">
                                    {dockWindow === 'browser' && (
                                        <div className="h-full flex flex-col">
                                            {/* Browser Tabs */}
                                            <div className="flex items-center gap-1 px-2 py-1 bg-muted/20 border-b border-border/30">
                                                <div
                                                    className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer rounded-t ${browserTab === 'localhost' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                    onClick={() => setBrowserTab('localhost')}
                                                >
                                                    <Globe className="h-3 w-3 text-foreground/60" />
                                                    <span>localhost:3000</span>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer rounded-t ${browserTab === 'tunnel' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                    onClick={() => setBrowserTab('tunnel')}
                                                >
                                                    <Globe className="h-3 w-3 text-foreground/60" />
                                                    <span>abc123.idl.dev</span>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer rounded-t ${browserTab === 'fesnuk' ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                                                    onClick={() => setBrowserTab('fesnuk')}
                                                >
                                                    <Globe className="h-3 w-3 text-foreground/60" />
                                                    <span>fesnuk.com</span>
                                                </div>
                                            </div>

                                            {/* Browser Content */}
                                            <div className="flex-1 p-4 overflow-hidden bg-white dark:bg-gray-900">
                                                {(browserTab === 'localhost' || browserTab === 'tunnel') && (
                                                    <div className="h-full flex items-center justify-center">
                                                        <div className="text-center">
                                                            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome!</h1>
                                                            <p className="text-muted-foreground">Your app is running on {browserTab === 'localhost' ? 'localhost:3000' : 'https://abc123.idl.dev'}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {browserTab === 'fesnuk' && (
                                                    <div className="h-full space-y-4 text-foreground">
                                                        <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-lg">F</div>
                                                            <div>
                                                                <div className="font-semibold text-sm">Fesnuk</div>
                                                                <div className="text-xs text-muted-foreground">What's on your mind?</div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="border border-border/30 rounded-lg p-3">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="w-8 h-8 rounded-full bg-purple-500/20"></div>
                                                                    <div className="text-xs font-semibold">codewithwan</div>
                                                                </div>
                                                                <div className="text-xs">It works on my machine... oh wait, it works everywhere with IDL!</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {dockWindow === 'email' && (
                                        <div className="h-full flex">
                                            {/* Email Sidebar */}
                                            <div className="w-48 bg-muted/20 border-r border-border/30 p-3 space-y-2">
                                                <div className="text-[10px] font-semibold text-muted-foreground uppercase text-left">Mailboxes</div>
                                                <div className="space-y-1">
                                                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-left">Inbox (3)</div>
                                                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Sent</div>
                                                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Drafts</div>
                                                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Trash</div>
                                                </div>
                                            </div>

                                            {/* Email List */}
                                            <div className="flex-1 overflow-auto">
                                                <div className="divide-y divide-border/30">
                                                    <div className="p-3 hover:bg-muted/20 cursor-pointer text-left">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="text-xs font-semibold text-left">IDCloudlabs Team</div>
                                                            <div className="text-[10px] text-muted-foreground text-left">10:30 AM</div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mb-1 text-left">Welcome to IDL!</div>
                                                        <div className="text-[10px] text-muted-foreground text-left">Get started with your first tunnel...</div>
                                                    </div>
                                                    <div className="p-3 hover:bg-muted/20 cursor-pointer text-left">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="text-xs font-semibold text-left">GitHub</div>
                                                            <div className="text-[10px] text-muted-foreground text-left">Yesterday</div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mb-1 text-left">New pull request</div>
                                                        <div className="text-[10px] text-muted-foreground text-left">@username opened a new PR...</div>
                                                    </div>
                                                    <div className="p-3 hover:bg-muted/20 cursor-pointer opacity-60 text-left">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="text-xs text-left">Newsletter</div>
                                                            <div className="text-[10px] text-muted-foreground text-left">2 days ago</div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mb-1 text-left">Weekly tech updates</div>
                                                        <div className="text-[10px] text-muted-foreground text-left">Check out this week's highlights...</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {dockWindow === 'message' && (
                                        <div className="h-full flex">
                                            {/* Contacts Sidebar */}
                                            <div className="w-48 bg-muted/20 border-r border-border/30 p-3 space-y-2">
                                                <div className="text-[10px] font-semibold text-muted-foreground uppercase mb-3 text-left">Messages</div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer bg-muted/30">
                                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">JD</div>
                                                        <div className="flex-1 min-w-0 text-left">
                                                            <div className="text-xs font-semibold truncate text-left">Eliz</div>
                                                            <div className="text-[10px] text-muted-foreground truncate text-left">Nice work!</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer">
                                                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-xs">AS</div>
                                                        <div className="flex-1 min-w-0 text-left">
                                                            <div className="text-xs font-semibold truncate text-left">Alice Smith</div>
                                                            <div className="text-[10px] text-muted-foreground truncate text-left">See you tomorrow</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chat Window */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="p-3 border-b border-border/30">
                                                    <div className="text-xs font-semibold text-left">Eliz</div>
                                                </div>
                                                <div className="flex-1 p-3 space-y-2 overflow-auto">
                                                    <div className="flex justify-start">
                                                        <div className="bg-muted/50 rounded-lg px-3 py-2 max-w-[70%]">
                                                            <div className="text-xs text-left">Hey! Did you try IDL yet?</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <div className="bg-primary/20 rounded-lg px-3 py-2 max-w-[70%]">
                                                            <div className="text-xs text-left">Yes! It's amazing for tunneling!</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-start">
                                                        <div className="bg-muted/50 rounded-lg px-3 py-2 max-w-[70%]">
                                                            <div className="text-xs text-left">Nice work! 🚀</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {dockWindow === 'music' && (
                                        <div className="h-full flex flex-col bg-background p-6">
                                            <div className="flex-1 flex flex-col items-center justify-center">
                                                <div className="w-48 h-48 bg-muted/30 border border-border/30 rounded-lg mb-6 flex items-center justify-center">
                                                    <Music className="w-24 h-24 text-foreground/40" />
                                                </div>
                                                <div className="text-center mb-6">
                                                    <div className="text-2xl font-bold mb-2">Back to Friends</div>
                                                    <div className="text-sm text-muted-foreground">Sombr</div>
                                                </div>
                                                <div className="w-full max-w-md">
                                                    <div className="h-1 bg-muted/30 rounded-full mb-2">
                                                        <div className="h-full w-1/3 bg-foreground rounded-full"></div>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-muted-foreground mb-4">
                                                        <span>1:23</span>
                                                        <span>3:45</span>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button className="text-muted-foreground hover:text-foreground">
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                                                        </button>
                                                        <button className="w-12 h-12 rounded-full bg-foreground hover:bg-foreground/80 flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                        </button>
                                                        <button className="text-muted-foreground hover:text-foreground">
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 18h2V6h-2zm-3.5-6L4 6v12z"/></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Dock */}
                    <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
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
                                        // Only allow interaction on tablet and desktop
                                        if (window.innerWidth >= 768) {
                                            if (i === 0) {
                                                // Folder icon - open existing file explorer
                                                setOpenWindow(0);
                                                setDockWindow(null);
                                            } else if (i === 2) {
                                                // Terminal - open existing terminal window
                                                setOpenWindow(1);
                                                setDockWindow(null);
                                            } else if (i === 3) {
                                                // VSCode - open existing vscode window
                                                setOpenWindow(2);
                                                setDockWindow(null);
                                            } else {
                                                // Other dock apps open in dockWindow
                                                const windowTypes = ['folder', 'browser', 'terminal', 'vscode', 'email', 'message', 'music'];
                                                setDockWindow(windowTypes[i]);
                                            }
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

export default function HeroSection({ className = '' }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Disable animations on mobile (< 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], isMobile ? [1, 1, 1] : [1, 0.7, 0], {
        clamp: false
    });
    const scale = useTransform(scrollYProgress, [0, 0.6, 1], isMobile ? [1, 1, 1] : [1, 0.98, 0.96], {
        clamp: false
    });
    const yLines = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -100]);
    const yMockup = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 50]);

    // Desktop mockup scale effect: grow then shrink (disabled on mobile)
    const mockupScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], isMobile ? [1, 1, 1, 1] : [0.95, 1.08, 1.05, 0.92]);
    const mockupRotate = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [0, -1, -2]);

    return (
        <main id="home" ref={containerRef} className={`relative flex flex-col items-center justify-start min-h-screen py-20 pb-32 overflow-visible ${className}`} style={{ zIndex: 1, paddingTop: '6rem' }}>
            {/* Futuristic Background */}
            <div className="absolute inset-0">
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>

                {/* Gradient lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(var(--primary), 0.05) 25%, rgba(var(--primary), 0.05) 26%, transparent 27%, transparent 74%, rgba(var(--primary), 0.05) 75%, rgba(var(--primary), 0.05) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Diagonal Lines - Top Left */}
            <motion.div
                style={{ y: yLines }}
                className="absolute top-20 left-0 w-1/3 h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-20 left-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45"></div>
                <div className="absolute top-32 left-10 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45"></div>
                <div className="absolute top-10 left-32 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent rotate-45"></div>
            </motion.div>

            {/* Diagonal Lines - Top Right */}
            <motion.div
                style={{ y: yLines }}
                className="absolute top-20 right-0 w-1/3 h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="absolute top-20 right-20 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -rotate-45"></div>
                <div className="absolute top-32 right-10 w-40 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-45"></div>
                <div className="absolute top-10 right-32 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent -rotate-45"></div>
            </motion.div>

            {/* Corner Accents - Top only */}
            <motion.div
                className="absolute top-24 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.div
                className="absolute top-24 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            />

            {/* Floating Elements - Left Side */}
            <motion.div
                className="absolute left-[10%] top-1/4 hidden lg:block"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>
                    <div className="relative w-20 h-20 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                        <Brain className="w-9 h-9 text-foreground/60" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-foreground/20 rounded-tl-2xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-foreground/20 rounded-br-2xl"></div>
                </div>
            </motion.div>

            {/* Floating Elements - Right Side */}
            <motion.div
                className="absolute right-[10%] top-1/3 hidden lg:block"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 blur-xl animate-neon-pulse"></div>
                    <div className="relative w-20 h-20 rounded-2xl bg-foreground/5 backdrop-blur-xl border border-foreground/20 flex items-center justify-center">
                        <Code2 className="w-9 h-9 text-foreground/60" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-foreground/20 rounded-tr-2xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-foreground/20 rounded-bl-2xl"></div>
                </div>
            </motion.div>

            <motion.div
                className="text-center max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full"
                style={{
                    opacity,
                    scale,
                    willChange: 'opacity, transform'
                }}
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-6 mt-4"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
                        <div className="relative px-4 py-1.5 border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <span className="text-xs font-medium uppercase tracking-wider">Coming Soon</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8 space-y-2 sm:space-y-3"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="text-foreground">Cloud Platform </span>
                        <div className="relative inline-block">
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                for Developers
                            </span>
                            <motion.div
                                className="absolute -inset-2 bg-primary/5 blur-2xl -z-10"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="block text-foreground">Made Simple</span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-16 relative mt-4"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
                    </div>

                    <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground leading-relaxed">
                        Reverse Tunnel, <span className="text-foreground font-medium">Static Hosting</span>, & Custom Domain
                        <br className="hidden sm:block" />
                        With Automatic SSL. <span className="text-primary font-medium">Coming Soon</span>
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50"></div>
                    </div>
                </motion.div>

                {/* Desktop Mockup */}
                <motion.div
                    style={{ 
                        y: yMockup,
                        scale: mockupScale,
                        rotateX: mockupRotate
                    }}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative z-10"
                >
                    <DesktopMockup />
                </motion.div>
            </motion.div>
        </main>
    );
}
