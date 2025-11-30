import { Breadcrumbs } from '@/components/breadcrumbs';
import { NotificationBell } from '@/components/notifications/notification-bell';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { CommandPalette } from '@/components/command-palette';
import { cn } from '@/lib/utils';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-[50] flex h-14 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-background px-6 transition-[width,height] ease-linear md:px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                {auth.user && (
                    <div className="flex items-center gap-2">
                        <div
                            className={cn(
                                "relative flex h-9 w-[200px] items-center rounded-md border border-input bg-background px-3 py-1 text-sm transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                "cursor-pointer",
                                "focus-within:ring-1 focus-within:ring-ring"
                            )}
                            onClick={() => setCommandPaletteOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setCommandPaletteOpen(true);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="flex-1 text-left text-muted-foreground">
                                Search...
                            </span>
                            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:inline-flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                        <NotificationBell />
                    </div>
                )}
            </header>
            <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
        </>
    );
}
