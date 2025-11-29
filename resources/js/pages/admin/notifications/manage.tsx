import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserSelector } from '@/components/admin/user-selector';
import AppLayout from '@/layouts/app-layout';
import NotificationsLayout from '@/layouts/admin/notifications-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Send, Radio } from 'lucide-react';
import { FormEventHandler, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface Props {
    users: User[];
    isSuperadmin: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Notifications',
        href: '/admin/notifications/manage',
    },
];

export default function Manage({ users, isSuperadmin }: Props) {
    const page = usePage<PageProps>();
    
    const activeTab = useMemo(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('tab') || 'send';
        }
        return 'send';
    }, [page.url]);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const tab = urlParams.get('tab');
            if (!tab || (tab === 'broadcast' && !isSuperadmin)) {
                router.visit('/admin/notifications/manage?tab=send', { replace: true, preserveScroll: true });
            }
        }
    }, [isSuperadmin, page.url]);

    const sendForm = useForm({
        user_ids: [] as string[],
        title: '',
        message: '',
        action_url: '',
        action_text: '',
    });

    const broadcastForm = useForm({
        title: '',
        message: '',
        action_url: '',
        action_text: '',
    });

    useEffect(() => {
        const flash = (page.props as any).flash || {};
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [page.props]);

    const handleSendSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (sendForm.data.user_ids.length === 0) {
            toast.error('Please select at least one user');
            return;
        }
        sendForm.post(route('admin.notifications.send'), {
            preserveScroll: true,
            onSuccess: () => {
                sendForm.reset();
            },
            onError: () => {
                toast.error('Failed to send notification');
            },
        });
    };

    const handleBroadcastSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        broadcastForm.post(route('admin.notifications.broadcast'), {
            preserveScroll: true,
            onSuccess: () => {
                broadcastForm.reset();
            },
            onError: () => {
                toast.error('Failed to broadcast notification');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Notifications" />
            <NotificationsLayout isSuperadmin={isSuperadmin}>
                {activeTab === 'send' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Send Notification to User</CardTitle>
                            <CardDescription>
                                Send a notification to specific users
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSendSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user_ids">Users *</Label>
                                    <UserSelector
                                        users={users}
                                        selectedUserIds={sendForm.data.user_ids}
                                        onSelectionChange={(userIds) => sendForm.setData('user_ids', userIds)}
                                        placeholder="Select users..."
                                    />
                                    {sendForm.errors.user_ids && (
                                        <p className="text-sm text-destructive">{sendForm.errors.user_ids}</p>
                                    )}
                                    {sendForm.data.user_ids.length > 0 && (
                                        <p className="text-sm text-muted-foreground">
                                            {sendForm.data.user_ids.length} user(s) selected
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={sendForm.data.title}
                                        onChange={(e) => sendForm.setData('title', e.target.value)}
                                        placeholder="Notification title"
                                        required
                                    />
                                    {sendForm.errors.title && (
                                        <p className="text-sm text-destructive">{sendForm.errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={sendForm.data.message}
                                        onChange={(e) => sendForm.setData('message', e.target.value)}
                                        placeholder="Notification message"
                                        rows={4}
                                        required
                                    />
                                    {sendForm.errors.message && (
                                        <p className="text-sm text-destructive">{sendForm.errors.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="action_url">Action URL (Optional)</Label>
                                    <Input
                                        id="action_url"
                                        type="url"
                                        value={sendForm.data.action_url}
                                        onChange={(e) => sendForm.setData('action_url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    {sendForm.errors.action_url && (
                                        <p className="text-sm text-destructive">{sendForm.errors.action_url}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="action_text">Action Text (Optional)</Label>
                                    <Input
                                        id="action_text"
                                        value={sendForm.data.action_text}
                                        onChange={(e) => sendForm.setData('action_text', e.target.value)}
                                        placeholder="View Details"
                                    />
                                    {sendForm.errors.action_text && (
                                        <p className="text-sm text-destructive">{sendForm.errors.action_text}</p>
                                    )}
                                </div>

                                <Button type="submit" disabled={sendForm.processing}>
                                    <Send className="size-4 mr-2" />
                                    {sendForm.processing ? 'Sending...' : 'Send Notification'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'broadcast' && isSuperadmin && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Broadcast Notification</CardTitle>
                            <CardDescription>
                                Send a notification to all users in the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="broadcast_title">Title *</Label>
                                    <Input
                                        id="broadcast_title"
                                        value={broadcastForm.data.title}
                                        onChange={(e) => broadcastForm.setData('title', e.target.value)}
                                        placeholder="Notification title"
                                        required
                                    />
                                    {broadcastForm.errors.title && (
                                        <p className="text-sm text-destructive">{broadcastForm.errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="broadcast_message">Message *</Label>
                                    <Textarea
                                        id="broadcast_message"
                                        value={broadcastForm.data.message}
                                        onChange={(e) => broadcastForm.setData('message', e.target.value)}
                                        placeholder="Notification message"
                                        rows={4}
                                        required
                                    />
                                    {broadcastForm.errors.message && (
                                        <p className="text-sm text-destructive">
                                            {broadcastForm.errors.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="broadcast_action_url">Action URL (Optional)</Label>
                                    <Input
                                        id="broadcast_action_url"
                                        type="url"
                                        value={broadcastForm.data.action_url}
                                        onChange={(e) => broadcastForm.setData('action_url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    {broadcastForm.errors.action_url && (
                                        <p className="text-sm text-destructive">
                                            {broadcastForm.errors.action_url}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="broadcast_action_text">Action Text (Optional)</Label>
                                    <Input
                                        id="broadcast_action_text"
                                        value={broadcastForm.data.action_text}
                                        onChange={(e) => broadcastForm.setData('action_text', e.target.value)}
                                        placeholder="View Details"
                                    />
                                    {broadcastForm.errors.action_text && (
                                        <p className="text-sm text-destructive">
                                            {broadcastForm.errors.action_text}
                                        </p>
                                    )}
                                </div>

                                <Button type="submit" disabled={broadcastForm.processing}>
                                    <Radio className="size-4 mr-2" />
                                    {broadcastForm.processing ? 'Broadcasting...' : 'Broadcast Notification'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </NotificationsLayout>
        </AppLayout>
    );
}

