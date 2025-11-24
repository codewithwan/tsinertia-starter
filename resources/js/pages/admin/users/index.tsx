import { PageProps, SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Edit, MoreVertical, Trash2, UserX, CheckCircle2, XCircle, Search, X } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import { useCallback, useEffect, useRef, useState } from 'react';

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

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props extends PageProps {
    users: PaginatedUsers;
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
];

export default function Index({ users: paginatedUsers }: Props) {
    const { auth } = usePage<SharedData>().props;
    const getInitials = useInitials();
    const isSuperadmin = auth.user.roles?.some(role => role.name === 'superadmin') || false;
    const isAdmin = auth.user.roles?.some(role => role.name === 'admin') || false;
    const currentUserId = auth.user.id;
    
    const [searchQuery, setSearchQuery] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('search') || '';
    });
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const canDeactivateUser = (user: User) => {
        if (user.id === currentUserId) return false;
        if (isSuperadmin) return true;
        if (isAdmin) {
            const userHasAdminRole = user.roles.some(role => role.name === 'admin');
            const userHasSuperadminRole = user.roles.some(role => role.name === 'superadmin');
            return !userHasAdminRole && !userHasSuperadminRole;
        }
        return false;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getUserRoleType = (user: User) => {
        if (user.roles.some(role => role.name === 'superadmin')) return 'superadmin';
        if (user.roles.some(role => role.name === 'admin')) return 'admin';
        return 'user';
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.visit(url, { preserveState: true, preserveScroll: true });
        }
    };

    const handlePerPageChange = (value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('per_page', value);
        url.searchParams.set('page', '1'); // Reset to first page
        router.visit(url.toString(), { preserveState: true, preserveScroll: false });
    };

    const handleSearch = useCallback(
        (value: string) => {
            const url = new URL(window.location.href);
            if (value.trim()) {
                url.searchParams.set('search', value.trim());
            } else {
                url.searchParams.delete('search');
            }
            url.searchParams.set('page', '1'); // Reset to first page when searching
            router.visit(url.toString(), { preserveState: true, preserveScroll: false });
        },
        []
    );

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        
        // Clear existing timeout
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        
        // Set new timeout for debounce
        searchTimeoutRef.current = setTimeout(() => {
            handleSearch(value);
        }, 500);
    };

    const clearSearch = () => {
        setSearchQuery('');
        const url = new URL(window.location.href);
        url.searchParams.delete('search');
        url.searchParams.set('page', '1');
        router.visit(url.toString(), { preserveState: true, preserveScroll: false });
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4">
                            <div>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Manage users, roles, and permissions</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search by email or username..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if (searchTimeoutRef.current) {
                                                clearTimeout(searchTimeoutRef.current);
                                            }
                                            handleSearch(searchQuery);
                                        }
                                    }}
                                    className="pl-9 pr-9"
                                />
                                {searchQuery && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                        onClick={clearSearch}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Clear search</span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Desktop Table View */}
                        <div className="hidden md:block rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">#</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Roles</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedUsers.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                No users found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginatedUsers.data.map((user, index) => {
                                            const numberIndex = (paginatedUsers.current_page - 1) * paginatedUsers.per_page + index;
                                            const roleType = getUserRoleType(user);
                                            const isAdminOrSuperadmin = roleType === 'admin' || roleType === 'superadmin';
                                            return (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-semibold ${
                                                            isAdminOrSuperadmin 
                                                                ? 'bg-foreground/5 border-foreground/20 text-foreground' 
                                                                : 'bg-muted border-border text-muted-foreground'
                                                        }`}>
                                                            {numberIndex + 1}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                                    {getInitials(user.name)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{user.name}</span>
                                                                <span className="text-sm text-muted-foreground">@{user.name.toLowerCase().replace(/\s+/g, '.')}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span>{user.email}</span>
                                                            {user.email_verified_at ? (
                                                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                                                            ) : (
                                                                <XCircle className="h-4 w-4 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email_verified_at ? (
                                                            <Badge variant="default" className="bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20">
                                                                Verified
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary">Unverified</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1 flex-wrap">
                                                            {user.roles.map((role) => (
                                                                <Badge key={role.id} variant="secondary">
                                                                    {role.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-sm text-muted-foreground">
                                                            {formatDate(user.created_at)}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Link href={`/admin/users/${user.id}`}>
                                                                    <Eye className="h-4 w-4" />
                                                                    <span className="sr-only">View</span>
                                                                </Link>
                                                            </Button>
                                                            {user.id !== currentUserId && isSuperadmin && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <Link href={`/admin/users/${user.id}/edit`}>
                                                                        <Edit className="h-4 w-4" />
                                                                        <span className="sr-only">Edit</span>
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                            {user.id !== currentUserId && (
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-8 w-8 p-0"
                                                                        >
                                                                            <MoreVertical className="h-4 w-4" />
                                                                            <span className="sr-only">More actions</span>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        {canDeactivateUser(user) && (
                                                                            <DropdownMenuItem
                                                                                className="text-muted-foreground"
                                                                                onClick={() => {
                                                                                    // TODO: Implement deactivate
                                                                                    console.log('Deactivate user:', user.id);
                                                                                }}
                                                                            >
                                                                                <UserX className="mr-2 h-4 w-4" />
                                                                                Deactivate
                                                                            </DropdownMenuItem>
                                                                        )}
                                                                        {isSuperadmin && (
                                                                            <>
                                                                                {canDeactivateUser(user) && <DropdownMenuSeparator />}
                                                                                <DropdownMenuItem
                                                                                    variant="destructive"
                                                                                    onClick={() => {
                                                                                        // TODO: Implement delete
                                                                                        console.log('Delete user:', user.id);
                                                                                    }}
                                                                                >
                                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                                    Delete User
                                                                                </DropdownMenuItem>
                                                                            </>
                                                                        )}
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {paginatedUsers.data.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    No users found
                                </div>
                            ) : (
                                paginatedUsers.data.map((user, index) => {
                                    const numberIndex = (paginatedUsers.current_page - 1) * paginatedUsers.per_page + index;
                                    const roleType = getUserRoleType(user);
                                    const isAdminOrSuperadmin = roleType === 'admin' || roleType === 'superadmin';
                                    return (
                                        <Card key={user.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold shrink-0 ${
                                                        isAdminOrSuperadmin 
                                                            ? 'bg-foreground/5 border-foreground/20 text-foreground' 
                                                            : 'bg-muted border-border text-muted-foreground'
                                                    }`}>
                                                        {numberIndex + 1}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2 mb-2">
                                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                                <Avatar className="h-10 w-10 shrink-0">
                                                                    <AvatarImage src={user.avatar || undefined} alt={user.name} />
                                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                                        {getInitials(user.name)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="font-medium truncate">{user.name}</p>
                                                                    <p className="text-sm text-muted-foreground truncate">@{user.name.toLowerCase().replace(/\s+/g, '.')}</p>
                                                                </div>
                                                            </div>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-8 w-8 p-0 shrink-0"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4" />
                                                                        <span className="sr-only">More actions</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/admin/users/${user.id}`}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    {user.id !== currentUserId && isSuperadmin && (
                                                                        <DropdownMenuItem asChild>
                                                                            <Link href={`/admin/users/${user.id}/edit`}>
                                                                                <Edit className="mr-2 h-4 w-4" />
                                                                                Edit
                                                                            </Link>
                                                                        </DropdownMenuItem>
                                                                    )}
                                                                    {canDeactivateUser(user) && (
                                                                        <>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                className="text-muted-foreground"
                                                                                onClick={() => {
                                                                                    // TODO: Implement deactivate
                                                                                    console.log('Deactivate user:', user.id);
                                                                                }}
                                                                            >
                                                                                <UserX className="mr-2 h-4 w-4" />
                                                                                Deactivate
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                    {isSuperadmin && (
                                                                        <>
                                                                            {canDeactivateUser(user) && <DropdownMenuSeparator />}
                                                                            <DropdownMenuItem
                                                                                variant="destructive"
                                                                                onClick={() => {
                                                                                    // TODO: Implement delete
                                                                                    console.log('Delete user:', user.id);
                                                                                }}
                                                                            >
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                Delete User
                                                                            </DropdownMenuItem>
                                                                        </>
                                                                    )}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <span className="text-muted-foreground">Email:</span>
                                                                <span className="truncate">{user.email}</span>
                                                                {user.email_verified_at ? (
                                                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
                                                                ) : (
                                                                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <span className="text-muted-foreground">Status:</span>
                                                                {user.email_verified_at ? (
                                                                    <Badge variant="default" className="bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20">
                                                                        Verified
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge variant="secondary">Unverified</Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <span className="text-muted-foreground">Role:</span>
                                                                <div className="flex gap-1 flex-wrap">
                                                                    {user.roles.map((role) => (
                                                                        <Badge key={role.id} variant="secondary">
                                                                            {role.name}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <span className="text-muted-foreground">Joined:</span>
                                                                <span>{formatDate(user.created_at)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            )}
                        </div>

                        {/* Pagination Controls - Bottom only */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm text-muted-foreground">Show per page:</span>
                                <Select
                                    value={paginatedUsers.per_page.toString()}
                                    onValueChange={handlePerPageChange}
                                >
                                    <SelectTrigger className="w-[80px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">
                                    Showing {paginatedUsers.from} to {paginatedUsers.to} of {paginatedUsers.total} users
                                </span>
                            </div>
                            {paginatedUsers.last_page > 1 && (
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={paginatedUsers.links[0].url || undefined}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (paginatedUsers.links[0].url) handlePageChange(paginatedUsers.links[0].url);
                                                }}
                                                className={!paginatedUsers.links[0].url ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            />
                                        </PaginationItem>
                                        {paginatedUsers.links.slice(1, -1).map((link, index) => {
                                            if (link.label === '...') {
                                                return (
                                                    <PaginationItem key={`ellipsis-${index}`}>
                                                        <PaginationEllipsis />
                                                    </PaginationItem>
                                                );
                                            }
                                            return (
                                                <PaginationItem key={link.label}>
                                                    <PaginationLink
                                                        href={link.url || undefined}
                                                        isActive={link.active}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            if (link.url) handlePageChange(link.url);
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {link.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        })}
                                        <PaginationItem>
                                            <PaginationNext
                                                href={paginatedUsers.links[paginatedUsers.links.length - 1].url || undefined}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (paginatedUsers.links[paginatedUsers.links.length - 1].url) handlePageChange(paginatedUsers.links[paginatedUsers.links.length - 1].url);
                                                }}
                                                className={!paginatedUsers.links[paginatedUsers.links.length - 1].url ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
