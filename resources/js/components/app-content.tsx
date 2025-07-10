import { SidebarInset } from '@/components/ui/sidebar';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, className, ...props }: AppContentProps) {
    if (variant === 'sidebar') {
        return (
            <SidebarInset className={cn('bg-neutral-50/50 dark:bg-neutral-900/50', className)} {...props}>
                {children}
            </SidebarInset>
        );
    }

    return (
        <main 
            className={cn(
                "mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 p-4",
                "bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm",
                className
            )} 
            {...props}
        >
            {children}
        </main>
    );
}
