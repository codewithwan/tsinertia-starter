export function EmailWindow() {
    return (
        <div className="flex h-full">
            <div className="w-48 space-y-2 border-r border-border/30 bg-muted/20 p-3">
                <div className="text-left text-[10px] font-semibold text-muted-foreground uppercase">Mailboxes</div>
                <div className="space-y-1">
                    <div className="cursor-pointer rounded px-2 py-1 text-left text-xs hover:bg-muted/50">Inbox (3)</div>
                    <div className="cursor-pointer rounded px-2 py-1 text-left text-xs text-muted-foreground hover:bg-muted/50">Sent</div>
                    <div className="cursor-pointer rounded px-2 py-1 text-left text-xs text-muted-foreground hover:bg-muted/50">Drafts</div>
                    <div className="cursor-pointer rounded px-2 py-1 text-left text-xs text-muted-foreground hover:bg-muted/50">Trash</div>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="divide-y divide-border/30">
                    {[
                        {
                            from: 'TSInertia Team',
                            time: '10:30 AM',
                            subject: 'Welcome to TSInertia!',
                            body: 'Get started with your first project...',
                            unread: true,
                        },
                        { from: 'GitHub', time: 'Yesterday', subject: 'New pull request', body: '@username opened a new PR...', unread: true },
                        {
                            from: 'Newsletter',
                            time: '2 days ago',
                            subject: 'Weekly tech updates',
                            body: "Check out this week's highlights...",
                            unread: false,
                        },
                    ].map((mail, i) => (
                        <div key={i} className={`cursor-pointer p-3 text-left hover:bg-muted/20 ${!mail.unread ? 'opacity-60' : ''}`}>
                            <div className="mb-1 flex items-center justify-between">
                                <div className="text-left text-xs font-semibold">{mail.from}</div>
                                <div className="text-left text-[10px] text-muted-foreground">{mail.time}</div>
                            </div>
                            <div className="mb-1 text-left text-xs text-muted-foreground">{mail.subject}</div>
                            <div className="text-left font-mono text-[10px] text-muted-foreground">{mail.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
