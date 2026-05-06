import { Globe } from 'lucide-react';
import { useState } from 'react';

type BrowserTab = 'localhost' | 'tunnel' | 'fesnuk';

export function BrowserWindow() {
    const [browserTab, setBrowserTab] = useState<BrowserTab>('localhost');
    const tabs: { id: BrowserTab; label: string }[] = [
        { id: 'localhost', label: 'localhost:3000' },
        { id: 'tunnel', label: 'tsinertia.local' },
        { id: 'fesnuk', label: 'fesnuk.com' },
    ];

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center gap-1 border-b border-border/30 bg-muted/20 px-2 py-1">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex cursor-pointer items-center gap-2 rounded-t px-3 py-1 text-[10px] ${browserTab === tab.id ? 'bg-background/50' : 'hover:bg-muted/30'}`}
                        onClick={() => setBrowserTab(tab.id)}
                    >
                        <Globe className="h-3 w-3 text-foreground/60" />
                        <span>{tab.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex-1 overflow-hidden bg-white p-4 text-left dark:bg-gray-900">
                {(browserTab === 'localhost' || browserTab === 'tunnel') && (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <h1 className="mb-2 text-2xl font-bold text-foreground">Welcome!</h1>
                            <p className="text-muted-foreground">
                                Your app is running on {browserTab === 'localhost' ? 'localhost:3000' : 'https://tsinertia.local'}
                            </p>
                        </div>
                    </div>
                )}
                {browserTab === 'fesnuk' && (
                    <div className="h-full space-y-4 text-foreground">
                        <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-lg">F</div>
                            <div>
                                <div className="text-sm font-semibold">Fesnuk</div>
                                <div className="text-xs text-muted-foreground">What's on your mind?</div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="rounded-lg border border-border/30 p-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-purple-500/20"></div>
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
