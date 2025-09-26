import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart, FileText, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-blue-100">Administrative control and reporting access</p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-green-500 to-green-600 text-white p-4">
                        <BarChart className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Reports</h3>
                        <p className="text-sm text-green-100">View and generate reports</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
                        <FileText className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Documentation</h3>
                        <p className="text-sm text-purple-100">Manage system documentation</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4">
                        <TrendingUp className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Analytics</h3>
                        <p className="text-sm text-orange-100">View performance metrics</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Administrative Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Reports Generated</h3>
                                <p className="text-2xl font-bold text-blue-600">45</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Active Users</h3>
                                <p className="text-2xl font-bold text-green-600">156</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">System Uptime</h3>
                                <p className="text-2xl font-bold text-green-600">99.8%</p>
                            </div>
                        </div>
                        
                        {/* Recent Activity */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Report generated: Monthly Analytics</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">User login: john.doe@example.com</p>
                                    <p className="text-xs text-gray-500">4 hours ago</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">System backup completed</p>
                                    <p className="text-xs text-gray-500">6 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
