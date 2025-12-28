import { useState } from 'react';
import { Globe } from 'lucide-react';

export function BrowserWindow() {
    const [browserTab, setBrowserTab] = useState<'localhost' | 'tunnel' | 'fesnuk'>('localhost');

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-1 px-2 py-1 bg-muted/20 border-b border-border/30">
                {[
                    { id: 'localhost', label: 'localhost:3000' },
                    { id: 'tunnel', label: 'tsinertia.local' },
                    { id: 'fesnuk', label: 'fesnuk.com' },
                ].map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex items-center gap-2 px-3 py-1 text-[10px] cursor-pointer rounded-t ${browserTab === tab.id ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                        onClick={() => setBrowserTab(tab.id as any)}
                    >
                        <Globe className="h-3 w-3 text-foreground/60" />
                        <span>{tab.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex-1 p-4 overflow-hidden bg-white dark:bg-gray-900 text-left">
                {(browserTab === 'localhost' || browserTab === 'tunnel') && (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome!</h1>
                            <p className="text-muted-foreground">Your app is running on {browserTab === 'localhost' ? 'localhost:3000' : 'https://tsinertia.local'}</p>
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
                                <div className="text-xs">Built my SaaS in a weekend with TSInertia! Amazing starter kit!</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
