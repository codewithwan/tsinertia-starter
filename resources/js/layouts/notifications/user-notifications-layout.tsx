import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useState, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'All',
        href: '/notifications',
        query: 'all',
        icon: Bell,
    },
    {
        title: 'Unread',
        href: '/notifications',
        query: 'unread',
        icon: CheckCheck,
    },
];

interface UserNotificationsLayoutProps extends PropsWithChildren {
    unreadCount?: number;
}

export default function UserNotificationsLayout({ children, unreadCount = 0 }: UserNotificationsLayoutProps) {
    const page = usePage();
    const [currentQuery, setCurrentQuery] = useState(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('filter') || 'all';
        }
        return 'all';
    });
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            setCurrentQuery(urlParams.get('filter') || 'all');
        }
    }, [page.url]);

    return (
        <div className="w-full px-4 py-6 lg:px-6 xl:px-8">
            <Heading 
                title="Notifications" 
                description={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'View your notifications'} 
            />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr]">
                <aside className="lg:sticky lg:top-6 lg:h-fit">
                    <nav className="flex flex-col space-y-1">
                        {sidebarNavItems.map((item) => {
                            const isActive = currentQuery === item.query;
                            return (
                                <Button
                                    key={item.query}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted font-medium': isActive,
                                    })}
                                >
                                    <Link href={`${item.href}?filter=${item.query}`} prefetch>
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                        {item.title}
                                        {item.query === 'unread' && unreadCount > 0 && (
                                            <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="min-w-0 w-full">
                    <section className="w-full space-y-6">{children}</section>
                </div>
            </div>
        </div>
    );
}

