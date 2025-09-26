import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { User, FileText, Calendar, Bell } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Dashboard',
        href: '/user/dashboard',
    },
];

export default function UserDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
                    <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
                    <p className="text-green-100">Manage your account and view your information</p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
                        <User className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Profile</h3>
                        <p className="text-sm text-blue-100">Update your profile</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
                        <FileText className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Documents</h3>
                        <p className="text-sm text-purple-100">View your documents</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4">
                        <Calendar className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Schedule</h3>
                        <p className="text-sm text-orange-100">View your schedule</p>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-gradient-to-br from-red-500 to-red-600 text-white p-4">
                        <Bell className="w-8 h-8 mb-2" />
                        <h3 className="font-semibold">Notifications</h3>
                        <p className="text-sm text-red-100">View notifications</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Account Status</h3>
                                <p className="text-lg font-bold text-green-600">Active</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">Last Login</h3>
                                <p className="text-lg font-bold text-blue-600">Today</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                            <div className="space-y-2">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Profile updated successfully</p>
                                    <p className="text-xs text-gray-500">1 hour ago</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Password changed</p>
                                    <p className="text-xs text-gray-500">2 days ago</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Account created</p>
                                    <p className="text-xs text-gray-500">1 week ago</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-100">Quick Tips</h3>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                <li>• Keep your profile information up to date</li>
                                <li>• Check your notifications regularly</li>
                                <li>• Use strong passwords for security</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
