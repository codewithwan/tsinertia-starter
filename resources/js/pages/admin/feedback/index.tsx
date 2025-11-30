import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Calendar, User, Star, Bug, Sparkles, Lightbulb, HelpCircle } from 'lucide-react';
import { route } from 'ziggy-js';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';

interface Feedback {
    id: number;
    type: string;
    subject: string | null;
    message: string;
    rating: number | null;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    } | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props extends PageProps {
    feedbacks: {
        data: Feedback[];
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
    types: string[];
    filters: {
        type?: string;
        user_id?: string;
        search?: string;
        rating?: string;
        date_from?: string;
        date_to?: string;
    };
    stats: {
        total: number;
        by_type: Record<string, number>;
        avg_rating: number | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Feedback',
        href: '/admin/feedback',
    },
];

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'bug':
            return Bug;
        case 'feature':
            return Sparkles;
        case 'improvement':
            return Lightbulb;
        case 'rating':
            return Star;
        default:
            return HelpCircle;
    }
};

const getTypeColor = (type: string): string => {
    const colorMap: Record<string, string> = {
        bug: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
        feature: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
        improvement: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
        rating: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        other: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
    };
    return colorMap[type] || colorMap.other;
};

const getTypeLabel = (type: string): string => {
    const labelMap: Record<string, string> = {
        bug: 'Bug Report',
        feature: 'Feature Request',
        improvement: 'Improvement',
        rating: 'Rating',
        other: 'Other',
    };
    return labelMap[type] || 'Other';
};

export default function FeedbackIndex({ feedbacks, users, types, filters: initialFilters, stats }: Props) {
    const getInitials = useInitials();

    // Ensure props have default values
    const safeFeedbacks = {
        data: feedbacks?.data || [],
        links: feedbacks?.links || [],
        meta: {
            current_page: feedbacks?.meta?.current_page || 1,
            last_page: feedbacks?.meta?.last_page || 1,
            per_page: feedbacks?.meta?.per_page || 20,
            total: feedbacks?.meta?.total || 0,
            from: feedbacks?.meta?.from || 0,
            to: feedbacks?.meta?.to || 0,
        },
    };
    const safeUsers = users || [];
    const safeTypes = types || [];
    const safeStats = {
        total: stats?.total || 0,
        by_type: stats?.by_type || {},
        avg_rating: stats?.avg_rating ?? null,
    };

    const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
    const [selectedType, setSelectedType] = useState(initialFilters.type || '');
    const [selectedUserId, setSelectedUserId] = useState(initialFilters.user_id || '');
    const [selectedRating, setSelectedRating] = useState(initialFilters.rating || '');
    const [dateFrom, setDateFrom] = useState(initialFilters.date_from || '');
    const [dateTo, setDateTo] = useState(initialFilters.date_to || '');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const applyFilters = useCallback(() => {
        const params = new URLSearchParams();

        if (searchQuery) params.set('search', searchQuery);
        if (selectedType) params.set('type', selectedType);
        if (selectedUserId) params.set('user_id', selectedUserId);
        if (selectedRating) params.set('rating', selectedRating);
        if (dateFrom) params.set('date_from', dateFrom);
        if (dateTo) params.set('date_to', dateTo);

        router.get(route('admin.feedback.index'), Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [searchQuery, selectedType, selectedUserId, selectedRating, dateFrom, dateTo]);

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
            applyFilters();
        }, 500);
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery, applyFilters]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('');
        setSelectedUserId('');
        setSelectedRating('');
        setDateFrom('');
        setDateTo('');
        router.get(route('admin.feedback.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const hasActiveFilters = !!(
        searchQuery ||
        selectedType ||
        selectedUserId ||
        selectedRating ||
        dateFrom ||
        dateTo
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Feedback Management" />
            <div className="w-full px-4 py-6 lg:px-6 xl:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Feedback Management</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        View and manage all user feedback
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Total Feedback</CardDescription>
                            <CardTitle className="text-3xl">{safeStats.total}</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Average Rating</CardDescription>
                            <CardTitle className="text-3xl">
                                {safeStats.avg_rating ? Number(safeStats.avg_rating).toFixed(1) : 'N/A'}
                                {safeStats.avg_rating && <Star className="inline h-5 w-5 ml-1 fill-yellow-400 text-yellow-400" />}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>By Type</CardDescription>
                            <CardTitle className="text-sm space-y-1">
                                {Object.entries(safeStats.by_type).map(([type, count]) => {
                                    const Icon = getTypeIcon(type);
                                    return (
                                        <div key={type} className="flex items-center gap-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{getTypeLabel(type)}: {count}</span>
                                        </div>
                                    );
                                })}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Filter feedback by type, user, rating, date, or search</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="search"
                                        placeholder="Search subject or message..."
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <div className="flex gap-2">
                                    <Select value={selectedType || undefined} onValueChange={(value) => {
                                        setSelectedType(value);
                                        setTimeout(applyFilters, 100);
                                    }}>
                                        <SelectTrigger id="type" className="flex-1">
                                            <SelectValue placeholder="All types" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {safeTypes.map((type) => {
                                                const Icon = getTypeIcon(type);
                                                return (
                                                    <SelectItem key={type} value={type}>
                                                        <div className="flex items-center gap-2">
                                                            <Icon className="h-4 w-4" />
                                                            {getTypeLabel(type)}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {selectedType && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedType('');
                                                setTimeout(applyFilters, 100);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {safeUsers.length > 0 && (
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
                                                {safeUsers.map((user) => (
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

                            <div className="space-y-2">
                                <Label htmlFor="rating">Rating</Label>
                                <div className="flex gap-2">
                                    <Select value={selectedRating || undefined} onValueChange={(value) => {
                                        setSelectedRating(value);
                                        setTimeout(applyFilters, 100);
                                    }}>
                                        <SelectTrigger id="rating" className="flex-1">
                                            <SelectValue placeholder="All ratings" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <SelectItem key={rating} value={String(rating)}>
                                                    <div className="flex items-center gap-2">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={cn(
                                                                    'h-4 w-4',
                                                                    i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                )}
                                                            />
                                                        ))}
                                                        ({rating} stars)
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {selectedRating && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedRating('');
                                                setTimeout(applyFilters, 100);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

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
                                <CardTitle>Feedbacks</CardTitle>
                                <CardDescription>
                                    {safeFeedbacks.meta.total} total feedback{safeFeedbacks.meta.total !== 1 ? 's' : ''}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-500px)]">
                            {!safeFeedbacks.data || safeFeedbacks.data.length === 0 ? (
                                <div className="flex items-center justify-center py-12">
                                    <p className="text-sm text-muted-foreground">No feedback found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {safeFeedbacks.data.map((feedback) => {
                                        const TypeIcon = getTypeIcon(feedback.type);
                                        return (
                                            <div key={feedback.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <Badge variant="outline" className={getTypeColor(feedback.type)}>
                                                                <TypeIcon className="h-3 w-3 mr-1" />
                                                                {getTypeLabel(feedback.type)}
                                                            </Badge>
                                                            {feedback.rating && (
                                                                <div className="flex items-center gap-1">
                                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={cn(
                                                                                'h-4 w-4',
                                                                                i < feedback.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                                            )}
                                                                        />
                                                                    ))}
                                                                    <span className="text-sm text-muted-foreground ml-1">({feedback.rating})</span>
                                                                </div>
                                                            )}
                                                            <span className="text-sm text-muted-foreground">
                                                                {new Date(feedback.created_at).toLocaleDateString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </span>
                                                        </div>
                                                        {feedback.subject && (
                                                            <p className="text-sm font-semibold">{feedback.subject}</p>
                                                        )}
                                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{feedback.message}</p>
                                                        {feedback.user && (
                                                            <div className="flex items-center gap-2 text-sm">
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage src={feedback.user.avatar || undefined} alt={feedback.user.name} />
                                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                                        {getInitials(feedback.user.name)}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span className="font-medium">{feedback.user.name}</span>
                                                                <span className="text-xs text-muted-foreground">({feedback.user.email})</span>
                                                            </div>
                                                        )}
                                                        {!feedback.user && (
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <User className="h-4 w-4" />
                                                                <span>Anonymous</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollArea>

                        {safeFeedbacks.meta.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {safeFeedbacks.meta.from} to {safeFeedbacks.meta.to} of {safeFeedbacks.meta.total} results
                                </p>
                                <div className="flex gap-2">
                                    {safeFeedbacks.links.map((link, index) => (
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
        </AppLayout>
    );
}

