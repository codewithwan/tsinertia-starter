import { type SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { NotificationItem } from './notification-item';

export function NotificationList() {
    const { notifications = [] } = usePage<SharedData>().props;

    const notificationArray = Array.isArray(notifications) ? notifications : [];

    const handleMarkAsRead = (notificationId: string) => {
        router.post(
            route('notifications.read', { notification: notificationId }),
            {},
            {
                preserveScroll: true,
                only: ['notifications', 'unreadNotificationCount'],
            },
        );
    };

    if (notificationArray.length === 0) {
        return (
            <div className="flex items-center justify-center py-8">
                <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
        );
    }

    return (
        <div className="divide-y">
            {notificationArray.slice(0, 10).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onMarkAsRead={() => handleMarkAsRead(notification.id)} />
            ))}
        </div>
    );
}
