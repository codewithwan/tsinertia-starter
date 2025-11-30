'use client';

import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
} from '@/components/ui/command';
import { type SharedData } from '@/types';
import { searchCommandPaletteItems, type CommandPaletteItem } from '@/lib/command-palette-config';
import { route } from 'ziggy-js';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommandPaletteProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth?.user?.roles?.[0]?.name;
    const [searchQuery, setSearchQuery] = useState('');
    const cleanupMobileNavigation = useMobileNavigation();
    const [isOpen, setIsOpen] = useState(open ?? false);
    const isMobile = useIsMobile();

    const handleLogout = () => {
        cleanupMobileNavigation();
        router.post(route('logout'));
    };

    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
        }
    }, [open]);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        if (!newOpen) {
            setSearchQuery('');
        }
        onOpenChange?.(newOpen);
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
                const target = e.target as HTMLElement;
                const isInput = 
                    target.tagName === 'INPUT' || 
                    target.tagName === 'TEXTAREA' || 
                    target.isContentEditable ||
                    target.closest('[contenteditable="true"]') !== null ||
                    target.closest('input, textarea') !== null;
                
                if (!isInput) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    setIsOpen(true);
                    onOpenChange?.(true);
                    return false;
                }
            }

            if (e.key === 'Escape' && isOpen) {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
                onOpenChange?.(false);
                setSearchQuery('');
                return false;
            }
        };

        document.addEventListener('keydown', down, { capture: true, passive: false });
        return () => document.removeEventListener('keydown', down, { capture: true });
    }, [isOpen, onOpenChange]);

    const filteredItems = searchCommandPaletteItems(searchQuery, userRole, handleLogout);
    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, CommandPaletteItem[]>);

    const categoryLabels: Record<string, string> = {
        navigation: 'Navigation',
        settings: 'Settings',
        administration: 'Administration',
        actions: 'Actions',
    };

    const handleSelect = (item: CommandPaletteItem) => {
        if (item.action) {
            item.action();
        } else if (item.href) {
            router.visit(item.href);
        }
        handleOpenChange(false);
        setSearchQuery('');
    };

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={handleOpenChange}
            title="Command Palette"
            description="Search for pages, settings, and actions. Press ⌘K to open."
        >
            <CommandInput
                placeholder="Search commands..."
                value={searchQuery}
                onValueChange={setSearchQuery}
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {Object.entries(groupedItems).map(([category, items]) => (
                    <CommandGroup key={category} heading={categoryLabels[category]}>
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={() => handleSelect(item)}
                                    className="cursor-pointer"
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        {item.description && (
                                            <span className="text-xs text-muted-foreground">
                                                {item.description}
                                            </span>
                                        )}
                                    </div>
                                    {item.shortcut && (
                                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                                    )}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                ))}
            </CommandList>
            {!isMobile && (
                <div className="border-t px-4 py-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <span>Press <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">⌘K</kbd> to open, <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">Esc</kbd> to close</span>
                        <div className="flex items-center gap-4">
                            <span><kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">↑↓</kbd> Navigate</span>
                            <span><kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono text-[10px]">Enter</kbd> Select</span>
                        </div>
                    </div>
                </div>
            )}
        </CommandDialog>
    );
}

