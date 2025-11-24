import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: '/settings/profile',
        icon: null,
    },
    {
        title: 'Security',
        href: '/settings/security',
        icon: null,
    },
    {
        title: 'Preferences',
        href: '/settings/preferences',
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="w-full px-4 py-6 lg:px-6 xl:px-8">
            <Heading title="Settings" description="Manage your profile and account settings" />

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr]">
                <aside className="lg:sticky lg:top-6 lg:h-fit">
                    <nav className="flex flex-col space-y-1">
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted font-medium': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="min-w-0 w-full">
                    <section className="w-full space-y-6">{children}</section>
                </div>
            </div>
        </div>
    );
}
