import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem, type PageProps, type SharedData } from '@/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Calendar, User, Download, Trash2 } from 'lucide-react';
import SettingsLayout from '@/layouts/settings/layout';
import { route } from 'ziggy-js';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
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

interface ActivityLog {
    id: number;
    action: string;
    description: string;
    ip_address: string | null;
    user_agent: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
    created_at_raw: string;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Action {
    value: string;
    label: string;
}

interface Props extends PageProps {
    activityLogs: {
        data: ActivityLog[];
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
    users: User[];
    actions: Action[];
    filters: {
        user_id?: string;
        action?: string;
        search?: string;
        date_from?: string;
        date_to?: string;
    };
    isSuperadmin: boolean;
    isAdmin: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
    },
    {
        title: 'Activity Log',
        href: '/settings/activity',
    },
];

const getActionColor = (action: string): string => {
    const actionMap: Record<string, string> = {
        login: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
        logout: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
        password_changed: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        profile_updated: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        avatar_updated: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    };
    return actionMap[action] || 'bg-muted text-muted-foreground border-border';
};

export default function ActivityIndex({ activityLogs = { data: [], links: [], meta: { current_page: 1, last_page: 1, per_page: 20, total: 0, from: 0, to: 0 } }, users = [], actions = [], filters = {}, isSuperadmin = false, isAdmin = false }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [selectedUserId, setSelectedUserId] = useState(filters?.user_id || '');
    const [selectedAction, setSelectedAction] = useState(filters?.action || '');
    const [dateFrom, setDateFrom] = useState(filters?.date_from || '');
    const [dateTo, setDateTo] = useState(filters?.date_to || '');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const applyFilters = useCallback(() => {
        const params = new URLSearchParams();
        
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (selectedUserId) params.set('user_id', selectedUserId);
        if (selectedAction) params.set('action', selectedAction);
        if (dateFrom) params.set('date_from', dateFrom);
        if (dateTo) params.set('date_to', dateTo);

        const url = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.visit(url, { preserveState: false, preserveScroll: false });
    }, [searchQuery, selectedUserId, selectedAction, dateFrom, dateTo]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        searchTimeoutRef.current = setTimeout(() => {
            applyFilters();
        }, 500);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedUserId('');
        setSelectedAction('');
        setDateFrom('');
        setDateTo('');
        router.visit(window.location.pathname, { preserveState: false, preserveScroll: false });
    };

    const handleExportCSV = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (selectedUserId) params.set('user_id', selectedUserId);
        if (selectedAction) params.set('action', selectedAction);
        if (dateFrom) params.set('date_from', dateFrom);
        if (dateTo) params.set('date_to', dateTo);
        params.set('export', 'csv');
        window.location.href = `${window.location.pathname}?${params.toString()}`;
    };

    const handleExportJSON = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set('search', searchQuery.trim());
        if (selectedUserId) params.set('user_id', selectedUserId);
        if (selectedAction) params.set('action', selectedAction);
        if (dateFrom) params.set('date_from', dateFrom);
        if (dateTo) params.set('date_to', dateTo);
        params.set('export', 'json');
        window.location.href = `${window.location.pathname}?${params.toString()}`;
    };

    const handleDeleteOldLogs = () => {
        router.post(route('admin.activity.delete-old'), {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const hasActiveFilters = searchQuery || selectedUserId || selectedAction || dateFrom || dateTo;

    const page = usePage<PageProps & SharedData>();

    useEffect(() => {
        const flash = (page.props as SharedData).flash;
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [page.props]);

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    const isAdminRoute = window.location.pathname.startsWith('/admin/activity');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Log" />
            {isAdminRoute ? (
                <div className="w-full px-4 py-6 lg:px-6 xl:px-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">Activity Log</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            View and filter all user activities
                        </p>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                            <CardDescription>Filter activity logs by user, action, date, or search</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="search">Search</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="search"
                                            placeholder="Search description..."
                                            value={searchQuery}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                                
                                {(isSuperadmin || isAdmin) && users.length > 0 && (
                                    <div className="space-y-2">
                                        <Label htmlFor="user">User</Label>
                                        <div className="flex gap-2">
                                            <Select value={selectedUserId || undefined} onValueChange={(value) => {
                                                setSelectedUserId(value);
                                                setTimeout(applyFilters, 100);
                                            }}>
                                                <SelectTrigger id="user" className="flex-1">
                                                    <SelectValue placeholder="All users" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={String(user.id)}>
                                                            {user.name} ({user.email})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {selectedUserId && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setSelectedUserId('');
                                                        setTimeout(applyFilters, 100);
                                                    }}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {actions.length > 0 && (
                                    <div className="space-y-2">
                                        <Label htmlFor="action">Action</Label>
                                        <div className="flex gap-2">
                                            <Select value={selectedAction || undefined} onValueChange={(value) => {
                                                setSelectedAction(value);
                                                setTimeout(applyFilters, 100);
                                            }}>
                                                <SelectTrigger id="action" className="flex-1">
                                                    <SelectValue placeholder="All actions" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {actions.map((action) => (
                                                        <SelectItem key={action.value} value={action.value}>
                                                            {action.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {selectedAction && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setSelectedAction('');
                                                        setTimeout(applyFilters, 100);
                                                    }}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="date_from">Date From</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="date_from"
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => {
                                                setDateFrom(e.target.value);
                                                setTimeout(applyFilters, 100);
                                            }}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date_to">Date To</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="date_to"
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => {
                                                setDateTo(e.target.value);
                                                setTimeout(applyFilters, 100);
                                            }}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>

                                {hasActiveFilters && (
                                    <div className="space-y-2 flex items-end">
                                        <Button variant="outline" onClick={clearFilters} className="w-full">
                                            <X className="h-4 w-4 mr-2" />
                                            Clear Filters
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Activity Logs</CardTitle>
                                    <CardDescription>
                                        {activityLogs?.meta?.total ?? 0} total activity log{(activityLogs?.meta?.total ?? 0) !== 1 ? 's' : ''}
                                    </CardDescription>
                                </div>
                                {(isSuperadmin || isAdmin) && (
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={handleExportCSV}>
                                            <Download className="h-4 w-4 mr-2" />
                                            Export CSV
                                        </Button>
                                        {isSuperadmin && (
                                            <>
                                                <Button variant="outline" size="sm" onClick={handleExportJSON}>
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Export JSON
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete Old Logs
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Old Activity Logs</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete activity logs older than 90 days? This action cannot be undone and will permanently remove all logs older than 90 days.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={handleDeleteOldLogs}
                                                                className="bg-red-500 hover:bg-red-600"
                                                            >
                                                                Delete Old Logs
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-500px)]">
                                {!activityLogs?.data || activityLogs.data.length === 0 ? (
                                    <div className="flex items-center justify-center py-12">
                                        <p className="text-sm text-muted-foreground">No activity logs found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {activityLogs.data.map((log) => (
                                            <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Badge variant="outline" className={getActionColor(log.action)}>
                                                                {log.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </Badge>
                                                            <span className="text-sm text-muted-foreground">{log.created_at}</span>
                                                        </div>
                                                        <p className="text-sm font-medium">{log.description}</p>
                                                        {log.user && (
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <User className="h-4 w-4" />
                                                                <span>{log.user.name}</span>
                                                                <span className="text-xs">({log.user.email})</span>
                                                            </div>
                                                        )}
                                                        {log.ip_address && (
                                                            <p className="text-xs text-muted-foreground">IP: {log.ip_address}</p>
                                                        )}
                                                        {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                            <details className="text-xs">
                                                                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                                                    View metadata
                                                                </summary>
                                                                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                                                    {JSON.stringify(log.metadata, null, 2)}
                                                                </pre>
                                                            </details>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>

                            {activityLogs?.meta?.last_page && activityLogs.meta.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {activityLogs.meta.from ?? 0} to {activityLogs.meta.to ?? 0} of {activityLogs.meta.total ?? 0} results
                                    </p>
                                    <div className="flex gap-2">
                                        {activityLogs?.links?.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <SettingsLayout>
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                            <CardDescription>
                                View your activity history and track your account actions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                {!activityLogs?.data || activityLogs.data.length === 0 ? (
                                    <div className="flex items-center justify-center py-12">
                                        <p className="text-sm text-muted-foreground">No activity logs found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {activityLogs.data.map((log) => (
                                            <div key={log.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Badge variant="outline" className={getActionColor(log.action)}>
                                                                {log.action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </Badge>
                                                            <span className="text-sm text-muted-foreground">{log.created_at}</span>
                                                        </div>
                                                        <p className="text-sm font-medium">{log.description}</p>
                                                        {log.ip_address && (
                                                            <p className="text-xs text-muted-foreground">IP: {log.ip_address}</p>
                                                        )}
                                                        {log.metadata && Object.keys(log.metadata).length > 0 && (
                                                            <details className="text-xs">
                                                                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                                                    View metadata
                                                                </summary>
                                                                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                                                                    {JSON.stringify(log.metadata, null, 2)}
                                                                </pre>
                                                            </details>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>

                            {activityLogs?.meta?.last_page && activityLogs.meta.last_page > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {activityLogs.meta.from ?? 0} to {activityLogs.meta.to ?? 0} of {activityLogs.meta.total ?? 0} results
                                    </p>
                                    <div className="flex gap-2">
                                        {activityLogs?.links?.map((link, index) => (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                disabled={!link.url}
                                                onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </SettingsLayout>
            )}
        </AppLayout>
    );
}

