// import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem, type PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Bell, LayoutGrid, MessageSquare, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';
import FeedbackDialog from './feedback-dialog';

const dashboardNavItem: NavItem = {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
};

const commonNavItems: NavItem[] = [
    {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
        groupTitle: null,
    },
];

const settingsNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
        icon: Settings,
        groupTitle: 'Settings',
    },
];

const roleBasedNavItems: Record<string, NavItem[]> = {
    superadmin: [
        {
            title: 'User Management',
            href: '/admin/users',
            icon: Users,
            groupTitle: 'Administration',
        },
        {
            title: 'Send Notifications',
            href: '/admin/notifications/manage',
            icon: Bell,
            groupTitle: 'Administration',
        },
        {
            title: 'Activity Log',
            href: '/admin/activity',
            icon: Activity,
            groupTitle: 'Administration',
        },
        {
            title: 'Feedback',
            href: '/admin/feedback',
            icon: MessageSquare,
            groupTitle: 'Administration',
        },
    ],
    admin: [
        {
            title: 'User Management',
            href: '/admin/users',
            icon: Users,
            groupTitle: 'Administration',
        },
        {
            title: 'Send Notifications',
            href: '/admin/notifications/manage',
            icon: Bell,
            groupTitle: 'Administration',
        },
        {
            title: 'Activity Log',
            href: '/admin/activity',
            icon: Activity,
            groupTitle: 'Administration',
        },
        {
            title: 'Feedback',
            href: '/admin/feedback',
            icon: MessageSquare,
            groupTitle: 'Administration',
        },
    ],
};

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Github',
//         href: 'https://github.com/codewithwan/tsinertia-starter',
//         icon: Github,
//     }
// ];

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const userRole = auth?.user?.roles?.[0]?.name;
    const page = usePage();
    const isAdminOrSuperadmin = userRole === 'admin' || userRole === 'superadmin';

    const allNavItems = [dashboardNavItem, ...commonNavItems, ...(roleBasedNavItems[userRole] || []), ...settingsNavItems];

    const itemsWithoutGroup = allNavItems.filter((item) => !item.groupTitle);

    const groupedItemsMap = allNavItems.reduce(
        (acc, item) => {
            if (item.groupTitle) {
                const groupTitle = item.groupTitle;
                if (!acc[groupTitle]) {
                    acc[groupTitle] = [];
                }
                acc[groupTitle].push(item);
            }
            return acc;
        },
        {} as Record<string, NavItem[]>,
    );

    const groupTitles = Array.from(new Set(allNavItems.filter((item) => item.groupTitle).map((item) => item.groupTitle!)));

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="pt-2">
                {/* Items without grouping (like Dashboard) */}
                {itemsWithoutGroup.length > 0 && (
                    <SidebarMenu className="px-2 py-0">
                        {itemsWithoutGroup.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.url.startsWith(item.href)}
                                    tooltip={{ children: item.title }}
                                    className="cursor-pointer select-none"
                                >
                                    <Link href={item.href} prefetch className="cursor-pointer select-none">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                )}

                {/* Grouped items */}
                {groupTitles.map((groupTitle) => (
                    <SidebarGroup key={groupTitle} className="px-2 py-0">
                        <SidebarGroupLabel className="pointer-events-none select-none">{groupTitle}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {groupedItemsMap[groupTitle].map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={page.url.startsWith(item.href)}
                                            tooltip={{ children: item.title }}
                                            className="cursor-pointer select-none"
                                        >
                                            <Link href={item.href} prefetch className="cursor-pointer select-none">
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                {!isAdminOrSuperadmin && (
                    <SidebarMenu className="px-2 py-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2">
                        <SidebarMenuItem>
                            <FeedbackDialog
                                trigger={
                                    <div className="rounded-lg border border-sidebar-border transition-colors group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-0 hover:bg-sidebar-accent">
                                        <SidebarMenuButton
                                            tooltip={{ children: 'Give Feedback' }}
                                            className="w-full cursor-pointer border-0 bg-transparent py-7 shadow-none select-none group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center hover:bg-transparent"
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                            <div className="min-w-0 flex-1 text-left group-data-[collapsible=icon]:hidden">
                                                <p className="text-sm leading-tight font-semibold">Give Feedback</p>
                                                <p className="text-xs leading-tight text-muted-foreground">Help us improve!</p>
                                            </div>
                                        </SidebarMenuButton>
                                    </div>
                                }
                                page={typeof window !== 'undefined' ? window.location.pathname : ''}
                            />
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
