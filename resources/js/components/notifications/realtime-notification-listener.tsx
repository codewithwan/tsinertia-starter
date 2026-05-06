import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import '../../echo';
import { type SharedData } from '@/types';

interface BroadcastNotification {
    id: string;
    title: string;
    message: string;
    action_url?: string | null;
    action_text?: string | null;
}

interface RealtimeNotificationListenerProps {
    userId?: number | null;
}

function openNotificationUrl(url: string) {
    try {
        const target = new URL(url, window.location.origin);

        if (target.origin === window.location.origin) {
            router.visit(`${target.pathname}${target.search}${target.hash}`);
            return;
        }
    } catch {
        router.visit(url);
        return;
    }

    window.location.href = url;
}

export function RealtimeNotificationListener({ userId }: RealtimeNotificationListenerProps) {
    const [currentUserId, setCurrentUserId] = useState(userId ?? null);

    useEffect(() => {
        return router.on('navigate', (event) => {
            const pageProps = event.detail.page.props as unknown as SharedData;

            setCurrentUserId(pageProps.auth.user?.id ?? null);
        });
    }, []);

    useEffect(() => {
        if (!currentUserId || !window.Echo) {
            return;
        }

        const channelName = `App.Models.User.${currentUserId}`;

        window.Echo.private(channelName).notification((notification: BroadcastNotification) => {
            toast(notification.title, {
                description: notification.message,
                action: notification.action_url
                    ? {
                          label: notification.action_text || 'Open',
                          onClick: () => openNotificationUrl(notification.action_url as string),
                      }
                    : undefined,
            });

            router.reload({
                only: ['notifications', 'unreadNotificationCount'],
            });
        });

        return () => {
            window.Echo.leave(channelName);
        };
    }, [currentUserId]);

    return null;
}
