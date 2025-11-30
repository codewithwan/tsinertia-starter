import { type LucideIcon } from 'lucide-react';
import {
    LayoutGrid,
    Users,
    Bell,
    Activity,
    MessageSquare,
    Settings,
    User,
    Lock,
    Shield,
    LogOut,
} from 'lucide-react';

export type CommandPaletteItem = {
    id: string;
    title: string;
    description?: string;
    icon: LucideIcon;
    href?: string;
    action?: () => void;
    shortcut?: string;
    keywords?: string[];
    roles?: string[];
    category: 'navigation' | 'actions' | 'settings' | 'administration';
};

// Navigation items
const navigationItems: CommandPaletteItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Go to dashboard',
        icon: LayoutGrid,
        href: '/dashboard',
        category: 'navigation',
        keywords: ['dashboard', 'home', 'main'],
    },
    {
        id: 'notifications',
        title: 'Notifications',
        description: 'View all notifications',
        icon: Bell,
        href: '/notifications',
        category: 'navigation',
        keywords: ['notifications', 'alerts', 'messages'],
    },
];

// Settings items
const settingsItems: CommandPaletteItem[] = [
    {
        id: 'settings-profile',
        title: 'Profile Settings',
        description: 'Edit your profile information',
        icon: User,
        href: '/settings/profile',
        category: 'settings',
        keywords: ['profile', 'settings', 'account', 'personal'],
    },
    {
        id: 'settings-password',
        title: 'Password',
        description: 'Change your password',
        icon: Lock,
        href: '/settings/password',
        category: 'settings',
        keywords: ['password', 'security', 'change password', 'reset'],
    },
    {
        id: 'settings-security',
        title: 'Security',
        description: 'Manage security settings',
        icon: Shield,
        href: '/settings/security',
        category: 'settings',
        keywords: ['security', 'sessions', 'devices'],
    },
    {
        id: 'settings-activity',
        title: 'Activity Log',
        description: 'View your activity history',
        icon: Activity,
        href: '/settings/activity',
        category: 'settings',
        keywords: ['activity', 'log', 'history', 'audit'],
    },
    {
        id: 'settings-preferences',
        title: 'Preferences',
        description: 'Manage your preferences',
        icon: Settings,
        href: '/settings/preferences',
        category: 'settings',
        keywords: ['preferences', 'settings', 'options'],
    },
];

// Administration items (admin & superadmin)
const administrationItems: CommandPaletteItem[] = [
    {
        id: 'admin-users',
        title: 'User Management',
        description: 'Manage users',
        icon: Users,
        href: '/admin/users',
        category: 'administration',
        roles: ['admin', 'superadmin'],
        keywords: ['users', 'manage', 'admin'],
    },
    {
        id: 'admin-notifications',
        title: 'Send Notifications',
        description: 'Send notifications to users',
        icon: Bell,
        href: '/admin/notifications/manage',
        category: 'administration',
        roles: ['admin', 'superadmin'],
        keywords: ['notifications', 'send', 'broadcast', 'admin'],
    },
    {
        id: 'admin-activity',
        title: 'Activity Log',
        description: 'View all user activities',
        icon: Activity,
        href: '/admin/activity',
        category: 'administration',
        roles: ['admin', 'superadmin'],
        keywords: ['activity', 'log', 'admin', 'audit'],
    },
    {
        id: 'admin-feedback',
        title: 'Feedback',
        description: 'Manage user feedback',
        icon: MessageSquare,
        href: '/admin/feedback',
        category: 'administration',
        roles: ['admin', 'superadmin'],
        keywords: ['feedback', 'reviews', 'admin'],
    },
];

// Action items - actions will be set dynamically in component
const getActionItems = (logoutAction: () => void): CommandPaletteItem[] => [
    {
        id: 'logout',
        title: 'Logout',
        description: 'Sign out of your account',
        icon: LogOut,
        category: 'actions',
        action: logoutAction,
        keywords: ['logout', 'sign out', 'exit'],
    },
];

/**
 * Get all command palette items filtered by user role
 * @param userRole - Current user role (user, admin, superadmin)
 * @param logoutAction - Function to handle logout action
 * @returns Filtered array of command palette items
 */
export function getCommandPaletteItems(userRole?: string, logoutAction?: () => void): CommandPaletteItem[] {
    const actionItemsList = logoutAction ? getActionItems(logoutAction) : [];
    
    const allItems = [
        ...navigationItems,
        ...settingsItems,
        ...administrationItems,
        ...actionItemsList,
    ];

    // Filter by role
    return allItems.filter((item) => {
        if (!item.roles) return true; // No role restriction
        if (!userRole) return false;
        return item.roles.includes(userRole);
    });
}

/**
 * Search command palette items by query
 * @param query - Search query
 * @param userRole - Current user role
 * @param logoutAction - Function to handle logout action
 * @returns Filtered array of items matching the query
 */
export function searchCommandPaletteItems(query: string, userRole?: string, logoutAction?: () => void): CommandPaletteItem[] {
    const items = getCommandPaletteItems(userRole, logoutAction);
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return items;

    return items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery);
        const descriptionMatch = item.description?.toLowerCase().includes(lowerQuery);
        const keywordMatch = item.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(lowerQuery)
        );

        return titleMatch || descriptionMatch || keywordMatch;
    });
}

