import { NotificationItem } from './notification-item';
import { router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export function NotificationList() {
    const { notifications = [] } = usePage<SharedData>().props;
    
    const notificationArray = Array.isArray(notifications) ? notifications : [];

    const handleMarkAsRead = (notificationId: string) => {
        router.post(route('notifications.read', { notification: notificationId }), {}, {
            preserveScroll: true,
            only: ['notifications', 'unreadNotificationCount'],
        });
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
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => handleMarkAsRead(notification.id)}
                />
            ))}
        </div>
    );
}

