import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface NotificationItemProps {
    notification: {
        id: string;
        data: {
            title: string;
            message: string;
            type?: string;
            action_url?: string;
            action_text?: string;
        };
        read_at: string | null;
        created_at: string;
    };
    onMarkAsRead: () => void;
}

const isExternalUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url, window.location.origin);
        return urlObj.origin !== window.location.origin;
    } catch {
        return false;
    }
};

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
    const isUnread = !notification.read_at;

    const handleClick = () => {
        if (!notification.read_at) {
            onMarkAsRead();
        }
        if (notification.data.action_url) {
            const url = notification.data.action_url;
            if (isExternalUrl(url)) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                router.visit(url);
            }
        }
    };

    return (
        <div
            className={cn(
                'px-4 py-3 transition-colors hover:bg-muted/50',
                notification.data.action_url && 'cursor-pointer'
            )}
            onClick={notification.data.action_url ? handleClick : undefined}
        >
            <div className="flex items-start gap-3">
                <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <p className={cn('text-sm font-medium flex-1', isUnread && 'font-semibold')}>
                            {notification.data.title}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {notification.data.action_url && notification.data.action_text && (
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'text-xs font-medium cursor-pointer hover:bg-accent',
                                        notification.data.action_url && isExternalUrl(notification.data.action_url) && 'flex items-center gap-1'
                                    )}
                                >
                                    {notification.data.action_text}
                                    {notification.data.action_url && isExternalUrl(notification.data.action_url) && (
                                        <ExternalLink className="h-3 w-3" />
                                    )}
                                </Badge>
                            )}
                            {isUnread && (
                                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                            )}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.data.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.created_at}</p>
                </div>
            </div>
        </div>
    );
}

