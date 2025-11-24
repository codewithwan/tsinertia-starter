// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Users, Shield, BarChart } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

// Add role-specific menu items
const roleBasedNavItems: Record<string, NavItem[]> = {
    superadmin: [
        {
            title: 'User Management',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Role Management',
            href: '/admin/roles',
            icon: Shield,
        }
    ],
    admin: [
        {
            title: 'Reports',
            href: '/admin/reports',
            icon: BarChart,
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
    
    // Combine base menu items with role-specific items
    const combinedNavItems = [
        ...mainNavItems,
        ...(roleBasedNavItems[userRole] || [])
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
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

            <SidebarContent>
                <NavMain items={combinedNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
