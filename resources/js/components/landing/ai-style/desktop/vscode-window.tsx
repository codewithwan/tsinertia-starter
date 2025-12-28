import { useState } from 'react';
import { Folder, Code, FileText } from 'lucide-react';

export function VSCodeWindow() {
    const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['my-website']));

    return (
        <div className="h-full flex bg-muted/20 overflow-hidden">
            <div className="w-20 sm:w-48 bg-muted/30 border-r border-border/30 p-1 sm:p-2 space-y-0.5 sm:space-y-1 overflow-hidden">
                <div className="text-[8px] sm:text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1 sm:mb-2 text-left px-2">File</div>
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

            <div className="flex-1 flex flex-col overflow-hidden">
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
                        </>
                    )}
                    {activeTab === 'js' && (
                        <>
                            <div className="flex gap-3">
                                <span className="text-muted-foreground/40 select-none w-6 text-right">1</span>
                                <div><span className="text-blue-400">console</span><span className="text-foreground/60">.</span><span className="text-yellow-400">log</span><span className="text-foreground/60">(</span><span className="text-green-400">'TSInertia Starter!'</span><span className="text-foreground/60">);</span></div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
