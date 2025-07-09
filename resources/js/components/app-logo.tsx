import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 text-left text-sm flex flex-col">
                <span className="mb-0.5 truncate leading-tight font-semibold">TSInertia</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Starter</span>
            </div>
        </>
    );
}
