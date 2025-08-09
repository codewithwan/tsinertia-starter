/**
 * Welcome Template Component
 * 
 * This is the landing page template for TSInertia Starter.
 * To remove this template and use your own content:
 * 1. Delete this file: resources/js/components/welcome-template.tsx
 * 2. Replace <WelcomeTemplate /> in resources/js/pages/welcome.tsx with your content
 * 3. The navbar and basic layout structure will remain intact
 */

import {
    Github,
    Copy,
    Check,
    Sparkles,
    Code2,
    MonitorPlay,
    ServerCog,
    Boxes,
    ShieldCheck,
    Route,
    Database,
    Mail,
    FileCode,
    Lock,
    KeyRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Simple Icons imports
import {
    SiLaravel,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiDocker,
    SiMysql,
    SiPhp,
    SiInertia,
    SiShadcnui
} from 'react-icons/si';
import { useState, type ReactNode, type ComponentType, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Small helper for Bento grid cards
function BentoCard({
    title,
    subtitle,
    icon: Icon,
    className = '',
    children,
}: {
    title: string;
    subtitle?: string;
    icon: ComponentType<{ className?: string }>;
    className?: string;
    children?: ReactNode;
}) {
    return (
        <div
            className={`group/bento relative overflow-hidden rounded-2xl border border-gray-200/40 dark:border-gray-800/50 [@supports(backdrop-filter:blur(0))]:bg-white/50 bg-white/60 dark:bg-white/5 backdrop-blur-xl p-5 flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 ${className}`}
        >
            <div className="bento-gradient" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,.25),transparent_60%)] blur-2xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-24 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,.22),transparent_60%)] blur-2xl" />

            <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 dark:from-blue-500/25 dark:to-cyan-500/10 border border-blue-300/30 dark:border-blue-500/20 ring-1 ring-inset ring-white/10 grid place-items-center">
                    <Icon className="h-4 w-4 text-blue-600 dark:text-cyan-300" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{title}</h3>
                    {subtitle && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-400">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="relative flex-1">
                {children}
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-12 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,.12),transparent_60%)]" />
            </div>
        </div>
    );
}

// Visual subcomponents
function VSCodeMock() {
    const files = ['dashboard.tsx', 'web.php', 'app.blade.php'];
    const [active, setActive] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setActive((v) => (v + 1) % files.length), 2500);
        return () => clearInterval(id);
    }, [files.length]);

    return (
        <div className="h-64 rounded-xl border border-gray-200/60 dark:border-gray-800/60 overflow-hidden grid grid-cols-[180px_1fr]">
            {/* sidebar */}
            <div className="bg-gray-100/70 dark:bg-gray-800/40 border-r border-gray-200/60 dark:border-gray-800/60 p-2">
                <div className="text-[11px] text-gray-500 mb-2">Explorer</div>
                <div className="space-y-1">
                    {files.map((f, i) => (
                        <div
                            key={f}
                            className={`flex items-center gap-2 px-2 py-1 rounded-md text-[12px] cursor-default ${
                                i === active
                                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                            <span className="truncate">{f}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* code panes */}
            <div className="grid grid-cols-2">
                <div className="code-pane border-r border-gray-200/60 dark:border-gray-800/60">
                    {active === 0 ? (
                        <pre className="code"><code>{`export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </div>
  );
}`}</code></pre>
                    ) : (
                        <pre className="code"><code>{`<div className="p-6">
  <h1>Welcome</h1>
</div>`}</code></pre>
                    )}
                </div>
                <div className="code-pane">
                    {active === 1 ? (
                        <pre className="code"><code>{`Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');`}</code></pre>
                    ) : (
                        <pre className="code"><code>{`<!doctype html>
<html>
  <body>@inertia</body>
</html>`}</code></pre>
                    )}
                </div>
            </div>
        </div>
    );
}

function UIShowcase() {
    const variants = ['Default', 'Muted', 'Neon'] as const;
    const [active, setActive] = useState(0);
    const [previewDark, setPreviewDark] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setActive((v) => (v + 1) % variants.length), 2600);
        return () => clearInterval(id);
    }, [variants.length]);

    const neon = active === 2;
    const muted = active === 1;

    return (
        <div className="h-64 grid grid-rows-[auto_1fr_auto] gap-2">
            <div className="flex items-center gap-3 text-[11px]">
                {variants.map((v, i) => (
                    <button
                        key={v}
                        onClick={() => setActive(i)}
                        className={`px-2 py-1 rounded-md border ${i === active ? 'border-blue-500/40 text-blue-600 dark:text-cyan-300' : 'border-gray-300/50 dark:border-gray-700/60 text-gray-600 dark:text-gray-300'}`}
                    >
                        {v}
                    </button>
                ))}
                <div className="ml-auto inline-flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">Dark preview</span>
                    <Switch checked={previewDark} onCheckedChange={setPreviewDark} />
                </div>
            </div>

            <div className={`${previewDark ? 'dark' : ''} rounded-lg border border-gray-200/60 dark:border-gray-700/60 bg-white/70 dark:bg-background/40 p-3 grid grid-cols-6 gap-2.5`}>
                <div className="col-span-3 flex flex-wrap items-center gap-2">
                    <Button className={`${neon ? '!bg-cyan-500 !text-white shadow-[0_0_18px_#22d3ee]' : ''} ${muted ? '!bg-gray-700 !text-white' : ''}`}>Primary</Button>
                    <Button variant="secondary" className={`${neon ? 'shadow-[0_0_10px_#22d3ee80]' : ''}`}>Secondary</Button>
                    <Button variant="outline" className={`${neon ? 'border-cyan-400 text-cyan-300' : ''}`}>Outline</Button>
                    <Button variant="destructive" className={`${neon ? 'shadow-[0_0_12px_#f43f5e]' : ''}`}>Destructive</Button>
                </div>

                <div className="col-span-3 rounded-md border border-gray-200/60 dark:border-gray-700/60 p-3">
                    <div className="text-[11px] text-gray-600 dark:text-gray-400">Avatar + Badge</div>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="relative">
                            <Avatar>
                                <AvatarImage src="https://i.pravatar.cc/64?img=13" alt="JD" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Badge variant={neon ? 'default' : 'secondary'} className={`absolute -right-2 -bottom-2 ${neon ? '' : ''}`}>New</Badge>
                        </div>
                        <Badge variant="outline">member</Badge>
                        <Badge variant="destructive">blocked</Badge>
                    </div>
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-[11px] text-gray-600 dark:text-gray-300">Assignee</label>
                    <Select defaultValue="alice">
                        <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="alice">Alice</SelectItem>
                            <SelectItem value="bob">Bob</SelectItem>
                            <SelectItem value="carol">Carol</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="col-span-2">
                    <Tabs defaultValue="one" className="w-full">
                        <TabsList>
                            <TabsTrigger value="one">One</TabsTrigger>
                            <TabsTrigger value="two">Two</TabsTrigger>
                        </TabsList>
                        <TabsContent value="one" className="text-[11px] text-gray-700 dark:text-gray-200">Tab one content</TabsContent>
                        <TabsContent value="two" className="text-[11px] text-gray-700 dark:text-gray-200">Tab two content</TabsContent>
                    </Tabs>
                </div>

                <div className="col-span-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className={`${neon ? 'border-cyan-400 text-cyan-300' : ''}`}>Open dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Hello</DialogTitle>
                                <DialogDescription>Shadcn dialog preview with Tailwind.</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="text-[11px] text-gray-600 dark:text-gray-400">Auto‑cycling variants + local dark preview</div>
        </div>
    );
}

function SecuritySim() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((v) => v + 1), 1200);
        return () => clearInterval(id);
    }, []);
    const events = [
        'Attempt: CSRF missing → blocked',
        'Attempt: brute force rate‑limited',
        'Attempt: cookie tamper → invalid',
        'argon2id hash verified ✓',
    ];
    const idx = tick % events.length;
    return (
        <div className="h-64 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-200/60 dark:border-gray-800/60 p-3 font-mono text-[11px] text-emerald-400">
                <div className="text-gray-500 dark:text-gray-400 mb-1">Intrusion log</div>
                {events.map((e, i) => (
                    <div key={e} className={`${i === idx ? 'text-emerald-400' : 'text-emerald-700/70 dark:text-emerald-400/60'} flex items-center gap-2`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${i === idx ? 'bg-red-500 animate-ping' : 'bg-emerald-500/40'}`} />
                        <span>{e}</span>
                    </div>
                ))}
            </div>
            <div className="rounded-lg border border-gray-200/60 dark:border-gray-800/60 p-3 text-[11px]">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200"><KeyRound className="h-3.5 w-3.5"/> CSRF token</div>
                <div className="mt-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-gray-800/60 font-mono">_token=4d5f...9ab</div>
                <div className="mt-3 text-gray-700 dark:text-gray-200">RBAC roles</div>
                <div className="mt-1 flex flex-wrap gap-1">
                    {['admin','manager','member'].map((r)=> (
                        <span key={r} className="px-2 py-0.5 rounded-full text-[10px] border bg-white/70 dark:bg-white/5 border-gray-200/60 dark:border-gray-700/60">{r}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FormSim() {
    const [phase, setPhase] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setPhase((v) => (v + 1) % 3), 1800);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="h-64 p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-gray-200/60 dark:border-gray-800/60 grid grid-rows-[1fr_auto]">
            <div className="grid gap-2 text-[11px]">
                <label className="text-gray-600 dark:text-gray-300">Email</label>
                <input className={`input ${phase===1?'ring-1 ring-red-400':''}`} placeholder={phase===0? 'typing...' : 'user@mail.com'} />
                {phase===1 && <div className="text-red-500">Email not registered</div>}
                <label className="text-gray-600 dark:text-gray-300 mt-2">Password</label>
                <input type="password" className={`input ${phase===2?'ring-1 ring-red-400':''}`} placeholder="••••••••" />
                {phase===2 && <div className="text-red-500">Password must contain symbols</div>}
            </div>
            <div className="mt-3 flex items-center gap-2">
                <button className={`btn-primary ${phase!==0?'animate-button-pulse':''}`}>Submit</button>
                <div className="text-gray-600 dark:text-gray-300">Zod + server errors wired</div>
            </div>
        </div>
    );
}

function PipelineViz() {
    return (
        <div className="h-64 rounded-xl bg-black/85 text-white/90 p-5 text-[11px]">
            <div className="flex items-center justify-between gap-2">
                {['Docker','Caddy','Laravel','Inertia','React'].map((n, i)=> (
                    <div key={n} className="flex-1 flex flex-col items-center">
                        <div className="node">{i+1}</div>
                        <div className="mt-2 opacity-80">{n}</div>
                    </div>
                ))}
            </div>
            <svg className="mt-3 w-full h-6" viewBox="0 0 600 40" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="pipe" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#22d3ee"/>
                        <stop offset="100%" stopColor="#60a5fa"/>
                    </linearGradient>
                </defs>
                <path d="M10,20 L590,20" stroke="url(#pipe)" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="60" cy="20" r="3" fill="#ffffff" className="animate-progress-dot"/>
            </svg>
            <div className="mt-2 grid grid-cols-3 gap-2 text-emerald-400">
                <div>$ docker compose up -d</div>
                <div>TLS: Caddy auto‑https</div>
                <div>HMR + SSR wired</div>
            </div>
        </div>
    );
}

function SchemaER() {
    return (
        <div className="h-64 relative p-3">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-cyan-400/70" />
                    </marker>
                </defs>
            </svg>
            <div className="er-box" style={{left:'8%', top:'12%'}}>
                <div className="er-title">users</div>
                <div className="er-field">id PK</div>
                <div className="er-field">name</div>
                <div className="er-field">email</div>
            </div>
            <div className="er-box" style={{right:'8%', top:'12%'}}>
                <div className="er-title">roles</div>
                <div className="er-field">id PK</div>
                <div className="er-field">name</div>
            </div>
            <div className="er-box" style={{left:'28%', bottom:'8%'}}>
                <div className="er-title">permissions</div>
                <div className="er-field">id PK</div>
                <div className="er-field">name</div>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="25%" y1="28%" x2="75%" y2="28%" stroke="currentColor" className="text-cyan-400/70" strokeWidth="1.5" markerEnd="url(#arrow)"/>
                <line x1="35%" y1="80%" x2="20%" y2="38%" stroke="currentColor" className="text-cyan-400/70" strokeWidth="1.5" markerEnd="url(#arrow)"/>
                <line x1="35%" y1="80%" x2="80%" y2="38%" stroke="currentColor" className="text-cyan-400/70" strokeWidth="1.5" markerEnd="url(#arrow)"/>
            </svg>
        </div>
    );
}

function MailTabs() {
    const variants = ['Verify', 'Reset', 'OTP'] as const;
    const [active, setActive] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const id = setInterval(() => setActive((v) => (v + 1) % variants.length), 2400);
        return () => clearInterval(id);
    }, [variants.length]);

    return (
        <div className="h-64 rounded-xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-white/5 overflow-hidden relative">
            <div className="px-4 py-2 border-b border-gray-200/60 dark:border-gray-800/60 text-[11px] flex items-center gap-2">
                {variants.map((v, i) => (
                    <button key={v} onClick={() => setActive(i)} className={`px-2 py-1 rounded-md border ${i===active?'border-blue-500/40 text-blue-600 dark:text-cyan-300':'border-gray-300/50 dark:border-gray-700/60'}`}>{v}</button>
                ))}
            </div>
            <div className="p-4 text-sm text-gray-700 dark:text-gray-200">
                {active===0 && (<>
                    <div className="font-semibold mb-1">Welcome to TSInertia Starter</div>
                    <div className="text-xs mb-3">Thanks for signing up! Confirm your email to get started.</div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white text-[11px] animate-button-pulse cursor-pointer">Verify Email</div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Email verified</DialogTitle>
                                <DialogDescription>You can now sign in.</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>)}
                {active===1 && (<>
                    <div className="font-semibold mb-1">Reset your password</div>
                    <div className="text-xs mb-3">Use this link to set a new password.</div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500 text-white text-[11px] cursor-pointer">Reset Password</div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Reset email sent</DialogTitle>
                                <DialogDescription>Check your inbox for the reset link.</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </>)}
                {active===2 && (<>
                    <div className="font-semibold mb-1">One‑time passcode</div>
                    <div className="text-xs mb-3">Enter the OTP below to continue.</div>
                    <div className="flex gap-2">
                        {Array.from({length:6}).map((_,i)=>(<div key={i} className="h-8 w-8 rounded-md grid place-items-center border border-gray-300/60 dark:border-gray-700/60">{i===3? '7':'3'}</div>))}
                    </div>
                </>)}
            </div>
            <div className="cursor-dot animate-cursor-click" />
        </div>
    );
}

function RBACGraph() {
    const permissions = ['users.create','users.read','roles.manage','reports.view'] as const;
    const [role, setRole] = useState<'admin' | 'manager' | 'member'>('admin');
    const rolePerms: Record<typeof role, ReadonlyArray<typeof permissions[number]>> = {
        admin: permissions,
        manager: ['users.read','reports.view','roles.manage'],
        member: ['users.read','reports.view']
    } as const;

    return (
        <div className="h-64 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-200/60 dark:border-gray-800/60 p-3">
                <div className="text-[11px] text-gray-600 dark:text-gray-400 mb-2">Roles</div>
                {(['admin','manager','member'] as const).map((r)=> (
                    <button
                        key={r}
                        onClick={() => setRole(r)}
                        className={`w-full text-left px-2 py-1 rounded-md border mb-1 ${role===r ? 'border-blue-500/40 text-blue-700 dark:text-blue-300 bg-blue-500/10' : 'bg-white/70 dark:bg-white/5 border-gray-200/60 dark:border-gray-700/60'}`}
                    >
                        {r}
                    </button>
                ))}
            </div>
            <div className="rounded-lg border border-gray-200/60 dark:border-gray-800/60 p-3 relative">
                <div className="text-[11px] text-gray-600 dark:text-gray-400 mb-2">Permissions</div>
                <div className="flex flex-wrap gap-1">
                    {permissions.map((p)=> (
                        <span
                            key={p}
                            className={`px-1.5 py-1 rounded-md border text-[10px] ${rolePerms[role].includes(p) ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/40 dark:text-emerald-300' : 'bg-white/70 dark:bg-white/5 border-gray-200/60 dark:border-gray-700/60'}`}
                        >
                            {p}
                        </span>
                    ))}
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M20,40 C140,10 220,10 320,48" stroke="currentColor" className="text-cyan-400/60" strokeWidth="1.5" fill="none"/>
                    <path d="M20,70 C140,40 220,40 320,78" stroke="currentColor" className="text-cyan-400/60" strokeWidth="1.5" fill="none"/>
                </svg>
            </div>
        </div>
    );
}

function BuildFlow() {
    return (
        <div className="h-64 rounded-xl bg-black/85 p-4 text-white/90 text-[11px] grid grid-rows-[auto_1fr]">
            <div className="flex items-center gap-2">
                {['Save','Transform','HMR','Browser'].map((s)=> (
                    <div key={s} className="px-2 py-1 rounded-md bg-white/10 border border-white/15">{s}</div>
                ))}
            </div>
            <div className="mt-3 font-mono space-y-1">
                <div>save → transform → update (42ms)</div>
                <div>[vite] connected • ssr: resources/js/ssr.tsx</div>
                <div>✓ HMR ready • ✓ Source maps • ✓ Inertia SSR</div>
            </div>
        </div>
    );
}

export default function WelcomeTemplate() {
    const [copied, setCopied] = useState(false);
    const [activeIcon, setActiveIcon] = useState<number | null>(null);

    const gitCommand = "git clone https://github.com/codewithwan/tsinertia-starter.git";
    const gitUrl = "https://github.com/codewithwan/tsinertia-starter.git";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(gitCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const techIcons = [
        {
            icon: SiLaravel,
            name: "Laravel",
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            description: "Elegant PHP framework",
            position: { x: 30, y: 50 },
            tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-4"
        },
        {
            icon: SiReact,
            name: "React",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            description: "Modern UI library",
            position: { x: 70, y: 50 },
            tooltipClass: "right-full top-1/2 -translate-y-1/2 mr-4"
        },
        {
            icon: SiTypescript,
            name: "TypeScript",
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
            description: "Type-safe JavaScript",
            position: { x: 65, y: 80 },
            tooltipClass: "right-full top-1/2 -translate-y-1/2 mr-4"
        },
        {
            icon: SiInertia,
            name: "Inertia.js",
            color: "text-purple-600",
            bgColor: "bg-purple-600/10",
            description: "Modern monolith",
            position: { x: 50, y: 50 },
            tooltipClass: "top-full left-1/2 -translate-x-1/2 mt-4"
        },
        {
            icon: SiTailwindcss,
            name: "Tailwind",
            color: "text-cyan-500",
            bgColor: "bg-cyan-500/10",
            description: "Utility-first CSS",
            position: { x: 80, y: 25 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        },
        {
            icon: SiDocker,
            name: "Docker",
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
            description: "Containerization",
            position: { x: 15, y: 25 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        },
        {
            icon: SiMysql,
            name: "MySQL",
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
            description: "Reliable database",
            position: { x: 35, y: 10 },
            tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-4"
        },
        {
            icon: SiPhp,
            name: "FrankenPHP",
            color: "text-indigo-600",
            bgColor: "bg-indigo-600/10",
            description: "Modern PHP runtime",
            position: { x: 15, y: 75 },
            tooltipClass: "left-full top-1/2 -translate-y-1/2 ml-4"
        },
        {
            icon: SiShadcnui,
            name: "Shadcn UI",
            color: "text-purple-600",
            bgColor: "bg-purple-600/10",
            description: "Modern UI library",
            position: { x: 85, y: 70 },
            tooltipClass: "bottom-full left-1/2 -translate-x-1/2 mb-4"
        }
    ];

    // Static connections that make sense
    const connections = [
        { from: 0, to: 6 }, // Laravel -> MySQL
        { from: 1, to: 2 }, // React -> TypeScript
        { from: 1, to: 4 }, // React -> Tailwind
        { from: 0, to: 3 }, // Laravel -> Inertia
        { from: 3, to: 1 }, // Inertia -> React
        { from: 5, to: 0 }, // Docker -> Laravel
        { from: 7, to: 0 }, // FrankenPHP -> Laravel
        { from: 6, to: 5 }, // MySQL -> Docker
        { from: 8, to: 1 }, // Shadcn UI -> React
        { from: 2, to: 8 }, // TypeScript -> Shadcn UI
        { from: 4, to: 8 }, // Tailwind -> Shadcn UI
        { from: 5, to: 7 }, // Docker -> FrankenPHP
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-12 min-h-[520px] md:min-h-[560px] flex items-center">
                <div className="grid lg:grid-cols-2 gap-14 items-center w-full">

                    {/* Left Side - Typography & Command */}
                    <div className="space-y-8">
                        <div className="space-y-5">
                            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                                Laravel + React + TypeScript
                            </h1>

                            <p className="text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-medium">
                                Make it simple
                            </p>

                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                                Everything you need to build modern applications. No setup headaches.
                            </p>
                        </div>

                        {/* Git Clone Command */}
                        <div className="space-y-5">
                            <div className="relative">
                                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="text-[11px] text-gray-500 dark:text-gray-400 mb-2 font-medium">GET STARTED</div>
                                            <code className="text-gray-900 dark:text-green-400 font-mono text-sm lg:text-base block break-all">
                                                {gitCommand}
                                            </code>
                                        </div>
                                        <Button
                                            onClick={copyToClipboard}
                                            size="sm"
                                            variant="ghost"
                                            className="shrink-0 h-9 w-9 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                                        >
                                            {copied ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Single CTA Button */}
                            <Button size="lg" className="px-7 py-5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black" onClick={() => window.open(gitUrl, '_blank')}>
                                <Github className="h-5 w-5" />
                                Start on GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Connected Tech Diagram */}
                    <div className="relative h-[520px] hidden lg:block">
                        <div className="absolute inset-0 rounded-2xl bg-gray-50/30 dark:bg-gray-900/20 border border-gray-200/30 dark:border-gray-800/30">

                            {/* Static Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {connections.map((connection, index) => {
                                    const from = techIcons[connection.from].position;
                                    const to = techIcons[connection.to].position;

                                    return (
                                        <line
                                            key={index}
                                            x1={`${from.x}%`}
                                            y1={`${from.y}%`}
                                            x2={`${to.x}%`}
                                            y2={`${to.y}%`}
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className={`transition-all duration-300 ${activeIcon === connection.from || activeIcon === connection.to
                                                ? "text-blue-500 opacity-80"
                                                : "text-gray-300 dark:text-gray-600 opacity-40"
                                                }`}
                                            strokeDasharray="4 4"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Tech Icons */}
                            {techIcons.map((tech, index) => {
                                const IconComponent = tech.icon;
                                const isActive = activeIcon === index;

                                return (
                                    <div
                                        key={index}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            left: `${tech.position.x}%`,
                                            top: `${tech.position.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            zIndex: isActive ? 50 : 10
                                        }}
                                        onMouseEnter={() => setActiveIcon(index)}
                                        onMouseLeave={() => setActiveIcon(null)}
                                    >
                                        {/* Pulse Effect */}
                                        {isActive && (
                                            <div className="absolute inset-0 animate-ping">
                                                <div className={`w-18 h-18 rounded-full ${tech.bgColor} -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2`}></div>
                                            </div>
                                        )}

                                        {/* Icon Container */}
                                        <div className={`
                                            relative w-15 h-15 rounded-xl ${tech.bgColor} border border-gray-200 dark:border-gray-700
                                            flex items-center justify-center transition-all duration-300 backdrop-blur-sm
                                            hover:scale-110 hover:shadow-xl group-hover:border-gray-300 dark:group-hover:border-gray-600
                                            ${isActive ? 'scale-115 shadow-xl' : ''}
                                        `}>
                                            <IconComponent className={`h-7 w-7 ${tech.color} transition-all duration-300`} />

                                            {/* Glow Effect */}
                                            {isActive && (
                                                <div className={`absolute inset-0 rounded-xl ${tech.bgColor} blur-lg opacity-50 -z-10`}></div>
                                            )}
                                        </div>

                                        {/* Fixed Tooltip Positioning */}
                                        {isActive && (
                                            <div className={`
                                                absolute bg-white dark:bg-gray-800 rounded-md px-2.5 py-1.5 shadow-xl 
                                                border border-gray-200 dark:border-gray-700 min-w-max z-50 
                                                transition-all duration-200 ${tech.tooltipClass}
                                            `}>
                                                <div className="text-xs font-semibold text-gray-900 dark:text-white">{tech.name}</div>
                                                <div className="text-[11px] text-gray-600 dark:text-gray-400">{tech.description}</div>

                                                {/* Fixed Tooltip Arrow */}
                                                <div className={`
                                                    absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rotate-45
                                                    ${tech.tooltipClass.includes('bottom-full') ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0' : ''}
                                                    ${tech.tooltipClass.includes('top-full') ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-b-0 border-r-0' : ''}
                                                    ${tech.tooltipClass.includes('right-full') ? 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-0 border-b-0' : ''}
                                                    ${tech.tooltipClass.includes('left-full') ? 'right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-r-0 border-t-0' : ''}
                                                `}></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Section - creative & relevant */}
            <section className="container mx-auto px-6 pb-16 overflow-x-hidden">
                <div className="mb-5 flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">React + Inertia boilerplate features</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(16rem,auto)]">
                    {/* Topology map (richer) */}
                    <BentoCard
                        title="App topology"
                        subtitle="Laravel ↔ Inertia ↔ React"
                        icon={Route}
                        className="xl:col-span-7 md:col-span-6"
                    >
                        <div className="relative h-64 rounded-xl border border-cyan-500/25 dark:border-cyan-500/25 bg-gradient-to-b from-slate-50/60 to-white/20 dark:from-slate-900/40 dark:to-slate-900/10 overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full">
                                <defs>
                                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="0%" stopColor="#60a5fa" />
                                        <stop offset="100%" stopColor="#22d3ee" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50%" cy="50%" r="110" fill="none" stroke="url(#g1)" strokeOpacity="0.25" strokeWidth="1" className="animate-spin-slow origin-center" />
                                <circle cx="50%" cy="50%" r="70" fill="none" stroke="url(#g1)" strokeOpacity="0.25" strokeWidth="1" />
                                <path d="M25,90 C200,0 320,140 520,40" fill="none" stroke="url(#g1)" strokeOpacity="0.35" strokeWidth="1.5" className="animate-flowline" />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="px-3 py-2 rounded-xl bg-black/80 text-white text-xs border border-white/10 shadow-lg shadow-cyan-500/20">Inertia Bridge</div>
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 top-2"><span className="chip">React</span></div>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2"><span className="chip">TypeScript</span></div>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2"><span className="chip">MySQL</span></div>
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-2"><span className="chip-danger">Laravel</span></div>

                            {/* extra nodes */}
                            <div className="absolute right-6 bottom-6 flex gap-2">
                                <span className="chip">Tailwind</span>
                                <span className="chip">Shadcn</span>
                                <span className="chip">FrankenPHP</span>
                            </div>

                            <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(90deg,#0ea5e933_1px,transparent_1px),linear-gradient(0deg,#0ea5e933_1px,transparent_1px)] bg-[size:32px_32px]" />
                        </div>
                    </BentoCard>

                    {/* Editor + Routes with VSCode-like UI */}
                    <BentoCard
                        title="Editor + Routes"
                        subtitle="React page + Laravel route"
                        icon={FileCode}
                        className="xl:col-span-5 md:col-span-6"
                    >
                        <VSCodeMock />
                    </BentoCard>

                    {/* Component gallery with variants */}
                    <BentoCard
                        title="Shadcn UI components"
                        subtitle="Tailwind + shadcn/ui"
                        icon={Boxes}
                        className="xl:col-span-4 md:col-span-6"
                    >
                        <UIShowcase />
                    </BentoCard>

                    {/* Auth deep-dive */}
                    <BentoCard
                        title="Auth security"
                        subtitle="Session • CSRF • Hashing • RBAC"
                        icon={Lock}
                        className="xl:col-span-4 md:col-span-6"
                    >
                        <SecuritySim />
                    </BentoCard>

                    {/* Type-safe form (richer) */}
                    <BentoCard
                        title="Type‑safe form"
                        subtitle="Server validation + typed props"
                        icon={Code2}
                        className="xl:col-span-4 md:col-span-6"
                    >
                        <FormSim />
                    </BentoCard>

                    {/* Dev pipeline diagram */}
                    <BentoCard
                        title="Dev pipeline"
                        subtitle="Docker → Caddy → Laravel → Inertia → React"
                        icon={ServerCog}
                        className="xl:col-span-6 md:col-span-6"
                    >
                        <PipelineViz />
                    </BentoCard>

                    {/* DB schema ER-style */}
                    <BentoCard
                        title="Database schema"
                        subtitle="Users • Roles • Permissions (ER)"
                        icon={Database}
                        className="xl:col-span-3 md:col-span-3"
                    >
                        <SchemaER />
                    </BentoCard>

                    {/* Mail preview with cursor click */}
                    <BentoCard
                        title="Mail & notifications"
                        subtitle="Blade templates"
                        icon={Mail}
                        className="xl:col-span-3 md:col-span-3"
                    >
                        <MailTabs />
                    </BentoCard>

                    {/* RBAC visualization */}
                    <BentoCard
                        title="Roles & permissions (Spatie)"
                        subtitle="RBAC across UI and backend"
                        icon={ShieldCheck}
                        className="xl:col-span-6 md:col-span-6"
                    >
                        <RBACGraph />
                    </BentoCard>

                    {/* SSR + HMR console simplified */}
                    <BentoCard
                        title="SSR + Vite HMR"
                        subtitle="Instant refresh"
                        icon={MonitorPlay}
                        className="xl:col-span-6 md:col-span-6"
                    >
                        <BuildFlow />
                    </BentoCard>
                </div>
            </section>

            {/* Template Component CSS */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fade-in { 0% { opacity: 0; transform: translateY(-10px) translateX(-50%); } 100% { opacity: 1; transform: translateY(0) translateX(-50%); } }
                    .animate-fade-in { animation: fade-in 0.3s ease-out; }

                    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    .animate-spin-slow { animation: spin-slow 18s linear infinite; }

                    @keyframes typing { from { width: 0 } to { width: 100% } }
                    .typing { display: inline-block; white-space: nowrap; overflow: hidden; animation: typing 3s steps(28,end) infinite alternate; }

                    @keyframes gradient-slide { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
                    .animate-gradient-slide { background-size: 200% 200%; animation: gradient-slide 4s linear infinite; }

                    @keyframes progress { 0% { transform: translateX(-33%); } 100% { transform: translateX(133%); } }
                    .animate-progress { animation: progress 2.5s ease-in-out infinite; }

                    @keyframes flowline { 0% { stroke-dasharray: 4 8; stroke-dashoffset: 0; } 100% { stroke-dasharray: 4 8; stroke-dashoffset: -60; } }
                    .animate-flowline { animation: flowline 6s linear infinite; }

                    .chip { padding: 4px 8px; border-radius: 9999px; font-size: 11px; background: rgba(255,255,255,.7); color: #0e7490; border: 1px solid rgba(34,211,238,.3); }
                    .chip-danger { padding: 4px 8px; border-radius: 9999px; font-size: 11px; background: rgba(255,255,255,.7); color: #b91c1c; border: 1px solid rgba(248,113,113,.3); }

                    /* VSCode-like */
                    .tab { padding: 2px 8px; border-radius: 6px; color: rgba(55,65,81,.9); }
                    .tab.active { background: rgba(59,130,246,.15); color: #1d4ed8; border: 1px solid rgba(59,130,246,.3); }
                    .code-pane { background: #0b1220; color: #e5e7eb; }
                    .code { margin: 0; padding: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; line-height: 1.5; }
                    .tok-key { color: #93c5fd; }
                    .tok-fn { color: #bef264; }
                    .tok-str { color: #fca5a5; }
                    .tok-tag { color: #60a5fa; }
                    .tok-attr { color: #fde68a; }

                    /* UI kit */
                    .btn-primary { padding: 6px 10px; border-radius: 8px; background: #111827; color: white; }
                    .btn-outline { padding: 6px 10px; border-radius: 8px; border: 1px solid rgba(31,41,55,.5); }
                    .btn-ghost { padding: 6px 10px; border-radius: 8px; background: transparent; }
                    .btn-danger { padding: 6px 10px; border-radius: 8px; background: #dc2626; color: white; }
                    .input { height: 32px; border: 1px solid rgba(148,163,184,.5); border-radius: 8px; padding: 0 8px; background: rgba(255,255,255,.95); color: #111827; }
                    .dark .input { background: transparent; color: #e5e7eb; }

                    /* pipeline */
                    .node { height: 32px; width: 32px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15); }
                    @keyframes progress-dot { 0% { transform: translateX(0); } 100% { transform: translateX(520px); } }
                    .animate-progress-dot { animation: progress-dot 3s linear infinite; }

                    /* ER diagram */
                    .er-box { position: absolute; min-width: 120px; border-radius: 10px; border: 1px solid rgba(34,211,238,.35); background: rgba(255,255,255,.6); padding: 8px; }
                    .dark .er-box { background: rgba(255,255,255,.06); }
                    .er-title { font-size: 11px; font-weight: 600; color: #0369a1; margin-bottom: 4px; }
                    .er-field { font-size: 11px; color: #334155; }
                    .dark .er-field { color: #e5e7eb; opacity: .8 }

                    /* Mail interactions */
                    .cursor-dot { position: absolute; left: 18px; top: 22px; height: 14px; width: 14px; border-radius: 50%; background: white; box-shadow: 0 0 0 2px rgba(0,0,0,.5); }
                    @keyframes cursor-click { 0% { transform: translate(0,0) scale(1); } 70% { transform: translate(120px,64px) scale(.9); } 100% { transform: translate(120px,64px) scale(1); } }
                    .animate-cursor-click { animation: cursor-click 2.6s ease-in-out infinite; }
                    @keyframes button-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
                    .animate-button-pulse { animation: button-pulse 1.8s ease-in-out infinite; }

                    /* Bento polish */
                    .bento-gradient { position: absolute; inset: -1px; border-radius: 22px; background: conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,.22), rgba(96,165,250,.22), rgba(167,139,250,.22), rgba(34,211,238,.22)); filter: blur(12px); opacity: 0; transition: opacity .5s ease; pointer-events: none; }
                    .group/bento:hover .bento-gradient { opacity: 1; }
                    @keyframes subtle-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
                    .animate-subtle-float { animation: subtle-float 7s ease-in-out infinite; }
                `
            }} />
        </>
    );
} 