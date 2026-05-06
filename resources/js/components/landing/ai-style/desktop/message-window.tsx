export function MessageWindow() {
    return (
        <div className="flex h-full">
            <div className="w-48 space-y-2 border-r border-border/30 bg-muted/20 p-3">
                <div className="mb-3 text-left text-[10px] font-semibold text-muted-foreground uppercase">Messages</div>
                <div className="space-y-2">
                    <div className="flex cursor-pointer items-center gap-2 rounded bg-muted/30 p-2 hover:bg-muted/50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs">JD</div>
                        <div className="min-w-0 flex-1 text-left">
                            <div className="truncate text-left text-xs font-semibold">Eliz</div>
                            <div className="truncate text-left text-[10px] text-muted-foreground">Nice work!</div>
                        </div>
                    </div>
                    <div className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-muted/50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-xs">AS</div>
                        <div className="min-w-0 flex-1 text-left">
                            <div className="truncate text-left text-xs font-semibold">Alice Smith</div>
                            <div className="truncate text-left text-[10px] text-muted-foreground">See you tomorrow</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col">
                <div className="border-b border-border/30 p-3">
                    <div className="text-left text-xs font-semibold">Eliz</div>
                </div>
                <div className="flex-1 space-y-2 overflow-auto p-3">
                    {[
                        { type: 'received', msg: 'Hey! Are you using TSInertia?' },
                        { type: 'sent', msg: 'Yes! Perfect for full-stack apps!' },
                        { type: 'received', msg: 'Nice work! 🚀' },
                    ].map((chat, i) => (
                        <div key={i} className={`flex ${chat.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${chat.type === 'sent' ? 'bg-primary/20' : 'bg-muted/50'} max-w-[70%] rounded-lg px-3 py-2`}>
                                <div className="text-left text-xs">{chat.msg}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-border/30 p-3">
                    <div className="rounded-full border border-border/20 bg-muted/30 px-4 py-1.5 text-left text-[10px] text-muted-foreground">
                        Ketik pesan...
                    </div>
                </div>
            </div>
        </div>
    );
}
