import { PageProps, SharedData } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import { FormEventHandler, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface Role {
    id: number;
    name: string;
}

interface Props extends PageProps {
    user: User;
    roles: Role[];
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
        title: 'Edit User',
        href: '#',
    },
];

export default function Edit({ user, roles }: Props) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const isSuperadmin = auth.user.roles?.some(role => role.name === 'superadmin') || false;
    const isOwnAccount = user.id === auth.user.id;

    useEffect(() => {
        if (isSuperadmin && isOwnAccount) {
            router.visit('/admin/users');
        }
    }, [isSuperadmin, isOwnAccount]);

    const { data, setData, put, processing, errors } = useForm({
        role_id: user.roles.length > 0 ? user.roles[0].id : (roles.length > 0 ? roles[0].id : null),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('users.update.roles', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/admin/users">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <CardTitle className="text-xl">{user.name}</CardTitle>
                                <CardDescription>
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
                        {isSuperadmin && isOwnAccount && (
                            <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
                                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                                    You cannot edit your own account roles. Redirecting...
                                </AlertDescription>
                            </Alert>
                        )}
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-base font-semibold mb-4 block">User Role</Label>
                                    <RadioGroup
                                        value={data.role_id ? data.role_id.toString() : ''}
                                        onValueChange={(value) => setData('role_id', parseInt(value, 10))}
                                    >
                                        <div className="space-y-3">
                                            {roles.map((role) => {
                                                const isCurrent = user.roles.some(r => r.id === role.id);
                                                return (
                                                    <div key={role.id} className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value={role.id.toString()}
                                                            id={`role-${role.id}`}
                                                        />
                                                        <Label
                                                            htmlFor={`role-${role.id}`}
                                                            className="text-sm font-normal cursor-pointer flex items-center gap-2"
                                                        >
                                                            <span>{role.name}</span>
                                                            {isCurrent && (
                                                                <Badge variant="secondary" className="text-xs">Current</Badge>
                                                            )}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </RadioGroup>
                                    {errors.role_id && (
                                        <p className="text-sm text-destructive mt-2">{errors.role_id}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/admin/users">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

