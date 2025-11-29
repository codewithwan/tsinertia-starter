// import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { type NavItem, type PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Shield, BarChart, Settings, Bell } from 'lucide-react';
import AppLogo from './app-logo';

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
            title: 'Role Management',
            href: '/admin/roles',
            icon: Shield,
            groupTitle: 'Administration',
        },
        {
            title: 'Send Notifications',
            href: '/admin/notifications/manage',
            icon: Bell,
            groupTitle: 'Administration',
        }
    ],
    admin: [
        {
            title: 'User Management',
            href: '/admin/users',
            icon: Users,
            groupTitle: 'Administration',
        },
        {
            title: 'Reports',
            href: '/admin/reports',
            icon: BarChart,
            groupTitle: 'Administration',
        },
        {
            title: 'Send Notifications',
            href: '/admin/notifications/manage',
            icon: Bell,
            groupTitle: 'Administration',
        }
    ]
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
    
    const allNavItems = [
        dashboardNavItem,
        ...commonNavItems,
        ...(roleBasedNavItems[userRole] || []),
        ...settingsNavItems,
    ];

    const itemsWithoutGroup = allNavItems.filter(item => !item.groupTitle);
    
    const groupedItemsMap = allNavItems.reduce((acc, item) => {
        if (item.groupTitle) {
            const groupTitle = item.groupTitle;
            if (!acc[groupTitle]) {
                acc[groupTitle] = [];
            }
            acc[groupTitle].push(item);
        }
        return acc;
    }, {} as Record<string, NavItem[]>);

    const groupTitles = Array.from(new Set(
        allNavItems
            .filter(item => item.groupTitle)
            .map(item => item.groupTitle!)
    ));

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
                                <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }} className="cursor-pointer select-none">
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
                        <SidebarGroupLabel className="select-none pointer-events-none">{groupTitle}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {groupedItemsMap[groupTitle].map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={page.url.startsWith(item.href)} tooltip={{ children: item.title }} className="cursor-pointer select-none">
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
