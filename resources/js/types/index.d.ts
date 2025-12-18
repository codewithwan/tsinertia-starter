import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    groupTitle?: string | null; // Optional group title for sidebar grouping
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    isDemo: boolean;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    unreadNotificationCount?: number;
    notifications?: Array<{
        id: string;
        data: {
            title: string;
            message: string;
            type?: string;
            action_url?: string;
            action_text?: string;
        };
        read_at: string | null;
        created_at: string;
    }>;
    flash?: {
        success?: string;
        error?: string;
        redirect_url?: string;
    };
    [key: string]: unknown;
}

export interface UserRole {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: UserRole[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface PageProps {
    auth: {
        user: User;
    };
    [key: string]: unknown;
}
