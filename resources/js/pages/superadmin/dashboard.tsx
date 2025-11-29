import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Shield, Users, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Superadmin Dashboard',
        href: '/superadmin/dashboard',
    },
];

export default function SuperadminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Superadmin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 overflow-x-auto">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">Superadmin Dashboard</h1>
                    <p className="text-red-100">Full system control and management access</p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
                        <Users className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">User Management</h3>
                        <p className="text-sm text-blue-100">Manage all users and permissions</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
                        <Shield className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Role Management</h3>
                        <p className="text-sm text-purple-100">Configure roles and permissions</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4">
                        <Settings className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">System Settings</h3>
                        <p className="text-sm text-orange-100">Configure system-wide settings</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Total Users</h3>
                                <p className="text-2xl font-bold text-blue-600">1,234</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Active Sessions</h3>
                                <p className="text-2xl font-bold text-green-600">89</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">System Health</h3>
                                <p className="text-2xl font-bold text-green-600">99.9%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
