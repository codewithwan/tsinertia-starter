// import AppLogoIcon from '@/components/app-logo-icon';
import AppLogo from '@/components/app-logo';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <AppLogo />
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-neutral-300">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        {/* <AppLogoIcon className="h-10 fill-current text-black dark:text-white sm:h-12" /> */}
                        <AppLogo />
                    </Link>
                    <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/30">
                        <div className="flex flex-col items-start gap-3 text-left sm:items-center sm:text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                            <p className="text-sm text-balance text-muted-foreground">{description}</p>
                        </div>
                        <div className="mt-6">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
