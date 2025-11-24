import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Monitor, MapPin, Clock, Trash2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

import DeleteUser from '@/components/delete-user';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import HeadingSmall from '@/components/heading-small';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Session {
    id: string;
    ip_address: string;
    user_agent: string;
    last_activity: number;
    last_activity_human: string;
    is_current: boolean;
    device: string;
    location: string;
}

interface SecurityProps {
    sessions: Session[];
    currentSessionId: string;
    status?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security settings',
        href: '/settings/security',
    },
];

export default function Security({ sessions, currentSessionId, status }: SecurityProps) {
    const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);

    const deleteSession = (sessionId: string) => {
        if (sessionId === currentSessionId) {
            return;
        }

        setDeletingSessionId(sessionId);
        router.delete(route('sessions.destroy', sessionId), {
            preserveScroll: true,
            onFinish: () => setDeletingSessionId(null),
        });
    };

    const deleteAllSessions = () => {
        router.delete(route('sessions.destroyAll'), {
            preserveScroll: true,
        });
    };

    const otherSessions = sessions.filter((session) => !session.is_current);
    const hasOtherSessions = otherSessions.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security settings" />

            <SettingsLayout>
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr]">
                    {/* Left: Active Sessions - Full Width */}
                    <div>
                        <HeadingSmall 
                            title="Active Sessions" 
                            description="Manage and monitor your active sessions across different devices and browsers" 
                        />

                        {status && (
                            <Alert className="mt-4 bg-green-50 dark:bg-green-950/30">
                                <AlertDescription className="text-green-600 dark:text-green-400">{status}</AlertDescription>
                            </Alert>
                        )}

                        <div className="mt-6 space-y-4">
                            {/* Current Session */}
                            {sessions
                                .filter((session) => session.is_current)
                                .map((session) => (
                                    <Card key={session.id} className="border-green-200 dark:border-green-900">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <CardTitle className="text-base">Current Session</CardTitle>
                                                    <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                                        Active
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardDescription>This is your current active session</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-start gap-3 text-sm">
                                                <Monitor className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{session.device}</p>
                                                    <p className="text-muted-foreground text-xs">{session.user_agent}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 text-sm">
                                                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Location</p>
                                                    <p className="text-muted-foreground text-xs">{session.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3 text-sm">
                                                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">Last Activity</p>
                                                    <p className="text-muted-foreground text-xs">{session.last_activity_human}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                            {/* Other Sessions */}
                            {otherSessions.map((session) => (
                                <Card key={session.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base">Other Session</CardTitle>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        disabled={deletingSessionId === session.id}
                                                    >
                                                        {deletingSessionId === session.id ? (
                                                            'Deleting...'
                                                        ) : (
                                                            <>
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Revoke
                                                            </>
                                                        )}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Revoke Session</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to revoke this session? The user will be logged out from this device.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => deleteSession(session.id)}
                                                            className="bg-red-500 hover:bg-red-600"
                                                        >
                                                            Revoke
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-start gap-3 text-sm">
                                            <Monitor className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">{session.device}</p>
                                                <p className="text-muted-foreground text-xs">{session.user_agent}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Location</p>
                                                <p className="text-muted-foreground text-xs">{session.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm">
                                            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium">Last Activity</p>
                                                <p className="text-muted-foreground text-xs">{session.last_activity_human}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {!hasOtherSessions && sessions.length === 1 && (
                                <Card>
                                    <CardContent className="py-6 text-center text-sm text-muted-foreground">
                                        No other active sessions
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {hasOtherSessions && (
                            <div className="mt-6">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" className="w-full">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Revoke All Other Sessions
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Revoke All Other Sessions</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to revoke all other sessions? You will be logged out from all other devices except this one.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={deleteAllSessions}
                                                className="bg-red-500 hover:bg-red-600"
                                            >
                                                Revoke All
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </div>

                    {/* Right: Delete Account */}
                    <div className="lg:sticky lg:top-6 lg:h-fit">
                        <DeleteUser />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
