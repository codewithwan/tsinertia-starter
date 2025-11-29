import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useMemo } from 'react';
import { Send, Radio } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Send to User',
        href: '/admin/notifications/manage',
        query: 'send',
        icon: Send,
    },
    {
        title: 'Broadcast',
        href: '/admin/notifications/manage',
        query: 'broadcast',
        icon: Radio,
    },
];

interface NotificationsLayoutProps extends PropsWithChildren {
    isSuperadmin?: boolean;
}

export default function NotificationsLayout({ children, isSuperadmin = false }: NotificationsLayoutProps) {
    const page = usePage();
    
    const currentQuery = useMemo(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('tab') || 'send';
        }
        return 'send';
    }, [page.url]);

    const visibleNavItems = sidebarNavItems.filter((item) => {
        if (item.query === 'broadcast' && !isSuperadmin) {
            return false;
        }
        return true;
    });

    return (
        <div className="w-full px-4 py-6 lg:px-6 xl:px-8">
            <Heading title="Manage Notifications" description="Send notifications to users or broadcast to all users" />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr]">
                <aside className="lg:sticky lg:top-6 lg:h-fit">
                    <nav className="flex flex-col space-y-1">
                        {visibleNavItems.map((item) => {
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
                                    <Link href={`${item.href}?tab=${item.query}`} prefetch>
                                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                        {item.title}
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

