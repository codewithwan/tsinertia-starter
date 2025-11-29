import AppLayout from '@/layouts/app-layout';
import UserNotificationsLayout from '@/layouts/notifications/user-notifications-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NotificationItem } from '@/components/notifications/notification-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import { CheckCheck } from 'lucide-react';

interface Notification {
    id: string;
    data: {
        title: string;
        message: string;
        type?: string;
        action_url?: string;
    };
    read_at: string | null;
    created_at: string;
}

interface NotificationsPageProps {
    notifications: {
        data: Notification[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
            from: number;
            to: number;
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: '/notifications',
    },
];

export default function NotificationsIndex({ notifications }: NotificationsPageProps) {
    const page = usePage<PageProps>();
    const [localNotifications, setLocalNotifications] = useState(notifications.data);
    const [filter, setFilter] = useState<'all' | 'unread'>(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return (urlParams.get('filter') || 'all') as 'all' | 'unread';
        }
        return 'all';
    });
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const currentFilter = urlParams.get('filter') || 'all';
            setFilter(currentFilter as 'all' | 'unread');
            if (!urlParams.get('filter')) {
                router.visit('/notifications?filter=all', { replace: true, preserveScroll: true });
            }
        }
    }, [page.url]);

    const handleMarkAsRead = (notificationId: string) => {
        router.post(route('notifications.read', { notification: notificationId }), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setLocalNotifications(prev =>
                    prev.map(n => n.id === notificationId ? { ...n, read_at: new Date().toISOString() } : n)
                );
            },
        });
    };

    const handleMarkAllAsRead = () => {
        router.post(route('notifications.read-all'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                setLocalNotifications(prev =>
                    prev.map(n => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
                );
            },
        });
    };

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return localNotifications.filter(n => !n.read_at);
        }
        return localNotifications;
    }, [localNotifications, filter]);

    const unreadCount = localNotifications.filter(n => !n.read_at).length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />
            <UserNotificationsLayout unreadCount={unreadCount}>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>
                                    {filter === 'unread' ? 'Unread Notifications' : 'All Notifications'}
                                </CardTitle>
                                <CardDescription>
                                    {filter === 'unread' 
                                        ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                                        : `${localNotifications.length} total notification${localNotifications.length !== 1 ? 's' : ''}`
                                    }
                                </CardDescription>
                            </div>
                            {unreadCount > 0 && (
                                <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
                                    <CheckCheck className="h-4 w-4 mr-2" />
                                    Mark all as read
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-300px)]">
                            <div className="space-y-1">
                                {filteredNotifications.length === 0 ? (
                                    <div className="flex items-center justify-center py-12">
                                        <p className="text-sm text-muted-foreground">
                                            {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                                        </p>
                                    </div>
                                ) : (
                                    filteredNotifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={() => handleMarkAsRead(notification.id)}
                                        />
                                    ))
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </UserNotificationsLayout>
        </AppLayout>
    );
}

