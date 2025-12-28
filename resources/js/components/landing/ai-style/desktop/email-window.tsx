export function EmailWindow() {
    return (
        <div className="h-full flex">
            <div className="w-48 bg-muted/20 border-r border-border/30 p-3 space-y-2">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase text-left">Mailboxes</div>
                <div className="space-y-1">
                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-left">Inbox (3)</div>
                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Sent</div>
                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Drafts</div>
                    <div className="text-xs px-2 py-1 rounded hover:bg-muted/50 cursor-pointer text-muted-foreground text-left">Trash</div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="divide-y divide-border/30">
                    {[
                        { from: 'TSInertia Team', time: '10:30 AM', subject: 'Welcome to TSInertia!', body: 'Get started with your first project...', unread: true },
                        { from: 'GitHub', time: 'Yesterday', subject: 'New pull request', body: '@username opened a new PR...', unread: true },
                        { from: 'Newsletter', time: '2 days ago', subject: 'Weekly tech updates', body: "Check out this week's highlights...", unread: false },
                    ].map((mail, i) => (
                        <div key={i} className={`p-3 hover:bg-muted/20 cursor-pointer text-left ${!mail.unread ? 'opacity-60' : ''}`}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="text-xs font-semibold text-left">{mail.from}</div>
                                <div className="text-[10px] text-muted-foreground text-left">{mail.time}</div>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1 text-left">{mail.subject}</div>
                            <div className="text-[10px] text-muted-foreground text-left font-mono">{mail.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
