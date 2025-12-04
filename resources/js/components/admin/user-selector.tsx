import { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface UserSelectorProps {
    users: User[];
    selectedUserIds: string[];
    onSelectionChange: (userIds: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function UserSelector({
    users,
    selectedUserIds,
    onSelectionChange,
    placeholder = 'Select users...',
    className,
}: UserSelectorProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selectedUsers = users.filter((user) =>
        selectedUserIds.includes(String(user.id))
    );

    const filteredUsers = users.filter((user) => {
        const searchLower = search.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
    });

    const handleSelect = (userId: string) => {
        const newSelection = selectedUserIds.includes(userId)
            ? selectedUserIds.filter((id) => id !== userId)
            : [...selectedUserIds, userId];
        onSelectionChange(newSelection);
    };

    const handleRemove = (userId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectionChange(selectedUserIds.filter((id) => id !== userId));
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between min-h-10 h-auto py-2',
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1 flex-1">
                        {selectedUsers.length === 0 ? (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        ) : (
                            selectedUsers.map((user) => (
                                <Badge
                                    key={user.id}
                                    variant="secondary"
                                    className="mr-1 mb-1"
                                >
                                    {user.name}
                                    <button
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRemove(String(user.id), e as unknown as React.MouseEvent);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={(e) => handleRemove(String(user.id), e)}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            ))
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search users..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandGroup>
                            {filteredUsers.map((user) => {
                                const isSelected = selectedUserIds.includes(String(user.id));
                                return (
                                    <CommandItem
                                        key={user.id}
                                        value={`${user.name} ${user.email}`}
                                        onSelect={() => handleSelect(String(user.id))}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                isSelected ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                        <div className="flex flex-col flex-1">
                                            <span>{user.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {user.email}
                                            </span>
                                        </div>
                                        {user.roles.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {user.roles[0].name}
                                            </Badge>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

