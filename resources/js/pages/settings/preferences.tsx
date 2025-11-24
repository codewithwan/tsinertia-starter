import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preferences',
        href: '/settings/preferences',
    },
];

export default function Preferences() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preferences" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Preferences" description="Update your account's appearance and preferences" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
