import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { NotificationList } from './notification-list';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { type SharedData } from '@/types';

export function NotificationBell() {
    const { unreadNotificationCount = 0 } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['unreadNotificationCount', 'notifications'] });
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (open) {
            router.reload({ only: ['unreadNotificationCount', 'notifications'] });
        }
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg">
                    <Bell className="h-5 w-5 opacity-80" />
                    {unreadNotificationCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                            {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 !z-[110]" align="end">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold">Notifications</h3>
                    <div className="flex items-center gap-2">
                        {unreadNotificationCount > 0 && (
                            <>
                                <span className="text-xs text-muted-foreground">{unreadNotificationCount} unread</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={() => {
                                        router.post(route('notifications.read-all'), {}, {
                                            preserveScroll: true,
                                            only: ['notifications', 'unreadNotificationCount'],
                                        });
                                    }}
                                >
                                    <CheckCheck className="h-3 w-3 mr-1" />
                                    Mark all
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <ScrollArea className="h-96">
                    <NotificationList />
                </ScrollArea>
                <div className="border-t px-4 py-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs h-8"
                        onClick={() => {
                            router.visit(route('notifications.index'));
                            setOpen(false);
                        }}
                    >
                        View all notifications
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

