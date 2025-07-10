import AppLogoIcon from './app-logo-icon';
import { cn } from '@/lib/utils';

interface AppLogoProps {
    className?: string;
}

export default function AppLogo({ className }: AppLogoProps) {
    return (
        <>
            <div className={cn("flex aspect-square size-8 items-center justify-center rounded-md bg-primary/10", className)}>
                <AppLogoIcon className="size-5 fill-current text-primary" />
            </div>
            <div className="ml-1 text-left text-sm flex flex-col">
                <span className="mb-0.5 truncate leading-tight font-semibold">TSInertia</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Starter</span>
            </div>
        </>
    );
}
