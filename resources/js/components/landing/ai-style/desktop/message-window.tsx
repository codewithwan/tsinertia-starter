export function MessageWindow() {
    return (
        <div className="h-full flex">
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

            <div className="flex-1 flex flex-col">
                <div className="p-3 border-b border-border/30">
                    <div className="text-xs font-semibold text-left">Eliz</div>
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-auto">
                    {[
                        { type: 'received', msg: 'Hey! Are you using TSInertia?' },
                        { type: 'sent', msg: 'Yes! Perfect for full-stack apps!' },
                        { type: 'received', msg: 'Nice work! 🚀' },
                    ].map((chat, i) => (
                        <div key={i} className={`flex ${chat.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${chat.type === 'sent' ? 'bg-primary/20' : 'bg-muted/50'} rounded-lg px-3 py-2 max-w-[70%]`}>
                                <div className="text-xs text-left">{chat.msg}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-3 border-t border-border/30">
                    <div className="bg-muted/30 rounded-full px-4 py-1.5 text-[10px] text-muted-foreground text-left border border-border/20">
                        Ketik pesan...
                    </div>
                </div>
            </div>
        </div>
    );
}
