import { CheckCircle2, Code, Folder, Globe, Mail, MessageSquare, Music, Terminal, Users, Zap } from 'lucide-react';

export interface DesktopMockupProps {
    isPlaying: boolean;
    musicProgress: number;
    musicTime: string;
    musicDuration: string;
    togglePlay: () => void;
    dockWindow: string | null;
    setDockWindow: (val: string | null) => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const deskopIcons = [
    { icon: Folder, label: 'Projects', color: 'text-foreground', type: 'folder' },
    { icon: Terminal, label: 'Terminal', color: 'text-foreground', type: 'terminal' },
    { icon: Code, label: 'VS Code', color: 'text-foreground', type: 'vscode' },
];

export const dockApps = [
    { icon: Folder, color: 'text-foreground', label: 'Finder' },
    { icon: Globe, color: 'text-foreground', label: 'Browser' },
    { icon: Terminal, color: 'text-foreground', label: 'Terminal' },
    { icon: Code, color: 'text-foreground', label: 'VS Code' },
    { icon: Mail, color: 'text-foreground', label: 'Mail' },
    { icon: MessageSquare, color: 'text-foreground', label: 'Messages' },
    { icon: Music, color: 'text-foreground', label: 'Music' },
];

export const mockNotifications = [
    {
        icon: Users,
        avatar: 'SJ',
        name: 'Sarah Johnson',
        message: 'Found an amazing starter kit on Github! 🚀',
        time: 'Just now',
        color: 'bg-blue-500/20 text-blue-500',
    },
    {
        icon: CheckCircle2,
        avatar: 'MC',
        name: 'Michael Chen',
        message: 'Building dashboards only takes 5 minutes! ⚡',
        time: '2m ago',
        color: 'bg-green-500/20 text-green-500',
    },
    {
        icon: Zap,
        avatar: 'ED',
        name: 'Emily Davis',
        message: 'Really helps my startup speed! 💜',
        time: '5m ago',
        color: 'bg-purple-500/20 text-purple-500',
    },
    {
        name: 'Elizabeth Smith',
        avatar: 'ES',
        message: 'Using TSInertia too? Nice choice!',
        time: '10m ago',
        color: 'bg-pink-500/20 text-pink-500',
        icon: MessageSquare,
    },
];
