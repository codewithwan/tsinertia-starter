import { PageProps, SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowLeft, Edit, Mail } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface Props extends PageProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'User Management',
        href: '/admin/users',
    },
    {
        title: 'User Details',
        href: '#',
    },
];

export default function Show({ user }: Props) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const isOwnAccount = user.id === auth.user.id;
    const isSuperadmin = auth.user.roles?.some(role => role.name === 'superadmin') || false;
    const isAdmin = auth.user.roles?.some(role => role.name === 'admin') || false;
    const userHasAdminRole = user.roles.some(role => role.name === 'admin');
    const userHasSuperadminRole = user.roles.some(role => role.name === 'superadmin');
    
    const canSendResetPassword = () => {
        if (isOwnAccount) return false;
        if (isSuperadmin) return true;
        if (isAdmin) {
            return !userHasAdminRole && !userHasSuperadminRole;
        }
        return false;
    };

    const handleSendResetPassword = () => {
        router.post(route('users.send-reset-password', user.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Success message will be shown via flash message
            },
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/users">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isOwnAccount && isSuperadmin && (
                            <Button asChild>
                                <Link href={`/admin/users/${user.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit User
                                </Link>
                            </Button>
                        )}
                        {canSendResetPassword() && (
                            <Button variant="outline" onClick={handleSendResetPassword}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Reset Password
                            </Button>
                        )}
                        {isOwnAccount && (
                            <Button variant="outline" asChild>
                                <Link href="/settings/profile">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit My Profile
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <CardTitle className="text-2xl">{user.name}</CardTitle>
                                <CardDescription className="text-base">
                                    <div className="flex items-center gap-2">
                                        <span>{user.email}</span>
                                        {user.email_verified_at ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <XCircle className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </div>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">User Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Username</p>
                                            <p className="font-medium">@{user.name.toLowerCase().replace(/\s+/g, '.')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email Status</p>
                                            {user.email_verified_at ? (
                                                <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">Unverified</Badge>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Roles</p>
                                            <div className="flex gap-1 flex-wrap mt-1">
                                                {user.roles.map((role) => (
                                                    <Badge key={role.id} variant="secondary">
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Joined</p>
                                            <p className="font-medium">{formatDate(user.created_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Last Updated</p>
                                            <p className="font-medium">{formatDate(user.updated_at)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">User ID</p>
                                            <p className="font-medium font-mono text-sm">#{user.id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

