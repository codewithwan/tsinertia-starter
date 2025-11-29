import { Breadcrumbs } from '@/components/breadcrumbs';
import { NotificationBell } from '@/components/notifications/notification-bell';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="sticky top-0 z-[100] flex h-14 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-background px-6 transition-[width,height] ease-linear md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {auth.user && (
                <div className="flex items-center gap-2">
                    <NotificationBell />
                </div>
            )}
        </header>
    );
}
