import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Security settings',
        href: '/settings/security',
    },
];

export default function Security() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Security settings" />

            <SettingsLayout>
                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}

