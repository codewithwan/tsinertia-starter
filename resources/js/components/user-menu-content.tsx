import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, User as UserIcon, Sun, Moon, Monitor } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const { appearance, updateAppearance } = useAppearance();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        cleanup();
        router.post(route('logout'));
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href={route('profile.edit')} className="block w-full">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">Theme</span>
                    <div className="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                        <button
                            onClick={() => updateAppearance('light')}
                            className={cn(
                                'flex items-center justify-center rounded-md px-2 py-1.5 transition-colors',
                                appearance === 'light'
                                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            )}
                            type="button"
                        >
                            <Sun className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => updateAppearance('dark')}
                            className={cn(
                                'flex items-center justify-center rounded-md px-2 py-1.5 transition-colors',
                                appearance === 'dark'
                                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            )}
                            type="button"
                        >
                            <Moon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => updateAppearance('system')}
                            className={cn(
                                'flex items-center justify-center rounded-md px-2 py-1.5 transition-colors',
                                appearance === 'system'
                                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            )}
                            type="button"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            <DropdownMenuSeparator />
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                        className="cursor-pointer hover:text-foreground"
                        onSelect={(e) => {
                            e.preventDefault();
                            setShowLogoutDialog(true);
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
                        Log out
                    </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Log out</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to log out? You will need to log in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Log out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
