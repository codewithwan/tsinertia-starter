import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
            <div className="flex h-full flex-1 flex-col gap-4 p-4 overflow-x-auto">

                <div>
                    <h1>User Dashboard</h1>
                </div>

            </div>
        </AppLayout>
    );
}
