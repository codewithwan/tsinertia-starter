import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/ai-style/navbar';
import FooterSection from '@/components/landing/ai-style/footer-section';
import { Filter, Code, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


interface ChangelogEntry {
    date: string;
    title: string;
    data?: string;
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking';
}

interface ChangelogProps {
    changelogs?: ChangelogEntry[];
}

const sampleChangelogs: ChangelogEntry[] = [
    {
        date: '2025-01-15',
        title: 'Command Palette & Power User Features',
        data: `We've introduced a powerful command palette that transforms how you navigate and interact with the platform.

## Features

- Introduced powerful command palette accessible via CMD+K (or CTRL+K)
- Command palette supports fuzzy search and keyboard navigation
- Complete dark mode overhaul with better color contrast
- Improved scrollbar styling and consistent theme application
- Feedback submission directly from sidebar with ratings and detailed messages
- Redesigned all error pages (404, 403, 500, 503, 419, 429) with modern animations
- Glass morphism effects and floating gradient orbs
- Fixed scrollbar styling in dark mode for better visibility

## Code Example

\`\`\`tsx {3,5-7}
import { CommandPalette } from '@/components/command-palette';
import { useState } from 'react';

function MyComponent() {
    const [open, setOpen] = useState(false);
    
    return (
        <>
            <button onClick={() => setOpen(true)}>
                Open Command Palette
            </button>
            <CommandPalette open={open} onOpenChange={setOpen} />
        </>
    );
}
\`\`\`

## Code Changes Example

\`\`\`tsx
- const oldFunction = () => {
-     return 'old code';
- }
+ const newFunction = () => {
+     return 'new code';
+     console.log('Added feature');
+ }
\`\`\`

Check out the [documentation](https://example.com/docs) for more details. You can also use inline \`code\` highlighting.`,
        type: 'feature',
    },
    {
        date: '2025-01-01',
        title: 'Activity Logs & Enhanced Admin Tools',
        data: `We've implemented a comprehensive activity log system that tracks every user action throughout the application.

## What's New

- Comprehensive activity log system tracking all user actions
- Automatic logging of login/logout, password changes, profile updates, avatar changes
- Powerful filtering by user, action type, and date range
- Role-based log access (users see own logs, admins see scope logs, superadmins see all)
- Export functionality for CSV and JSON formats
- Automated cleanup for old logs

## Improvements

- Improved notification center with better organization
- Read/unread status indicators and clean sidebar navigation
- Redesigned settings profile page with card-based layout
- Enhanced user menu with Profile link and theme selector
- Fixed multiple sidebar collapse issues`,
        type: 'improvement',
    },
    {
        date: '2024-12-15',
        title: 'Initial Launch - Built For You!',
        data: `Hey everyone! We're super excited to finally launch this platform - literally built just for you!

This is our initial release where we've packed everything we could think of:

- Complete authentication system with email verification
- Secure password reset functionality
- Role-based access control (user, admin, superadmin)
- AI-style landing page showcasing all features
- Dashboard system with role-specific views
- Built with Laravel and Inertia.js for fast, smooth experience
- Admin panel for user management and role assignment
- Full dark mode support across all pages
- Responsive design for mobile, tablet, and desktop

This is just the beginning, and we can't wait to see what you'll build with us!`,
        type: 'feature',
    },
];

type CategoryType = 'all' | 'feature' | 'improvement' | 'bugfix' | 'breaking';

export default function Changelog({ changelogs = sampleChangelogs }: ChangelogProps) {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Parse line highlight from code block meta (e.g., ```tsx {1,3-5})
    // Also parse diff lines (lines starting with + or -)
    const parseCodeBlock = (code: string, language?: string, meta?: string) => {
        const highlightLines: number[] = [];
        const addedLines: number[] = [];
        const deletedLines: number[] = [];
        const lines = code.split('\n');
        
        // Check if it's a diff format - detect by line content (lines starting with + or -)
        // This works regardless of language, so tsx can still have diff highlighting
        const hasDiffLines = lines.some(line => {
            const trimmed = line.trim();
            return (trimmed.startsWith('+') || trimmed.startsWith('-')) && 
                   !trimmed.startsWith('+++') && 
                   !trimmed.startsWith('---');
        });
        
        if (hasDiffLines) {
            lines.forEach((line, index) => {
                const lineNum = index + 1;
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('+') && !trimmedLine.startsWith('+++')) {
                    addedLines.push(lineNum);
                } else if (trimmedLine.startsWith('-') && !trimmedLine.startsWith('---')) {
                    deletedLines.push(lineNum);
                }
            });
        }
        
        // Parse highlight meta - format: {3,5-7}
        if (meta && meta.trim()) {
            const cleanMeta = meta.replace(/[{}]/g, '').trim();
            if (cleanMeta) {
                cleanMeta.split(',').forEach((part) => {
                    const trimmed = part.trim();
                    if (trimmed.includes('-') && !trimmed.startsWith('-')) {
                        const [start, end] = trimmed.split('-').map(Number);
                        if (!isNaN(start) && !isNaN(end)) {
                            for (let i = start; i <= end; i++) {
                                highlightLines.push(i);
                            }
                        }
                    } else if (trimmed && !trimmed.startsWith('-')) {
                        const lineNum = Number(trimmed);
                        if (!isNaN(lineNum) && lineNum > 0) {
                            highlightLines.push(lineNum);
                        }
                    }
                });
            }
        }
        
        return { code, language: language || 'text', highlightLines, addedLines, deletedLines };
    };

    // Pre-process markdown to extract code block meta and store in a map
    const processMarkdown = (markdown: string) => {
        const codeBlockMap = new Map<string, { language: string; meta: string }>();
        // Updated regex to capture meta with curly braces - match {3,5-7} format
        // Pattern: ```language {meta}\ncode```
        const codeBlockRegex = /```(\w+)(\s*\{[^}]+\})?\s*\n([\s\S]*?)```/g;
        let match;
        let processedMarkdown = markdown;
        let index = 0;

        while ((match = codeBlockRegex.exec(markdown)) !== null) {
            const [fullMatch, language, meta = '', code] = match;
            const cleanMeta = meta ? meta.trim() : '';
            codeBlockMap.set(`__CODE_BLOCK_${index}__`, { language, meta: cleanMeta });
            // Remove meta from processed markdown so ReactMarkdown doesn't see it
            processedMarkdown = processedMarkdown.replace(fullMatch, `\`\`\`${language}\n${code}\`\`\``);
            index++;
        }

        return { processedMarkdown, codeBlockMap };
    };

    const filteredChangelogs = changelogs.filter((entry) => {
        if (selectedCategory !== 'all' && entry.type !== selectedCategory) {
            return false;
        }
        return true;
    });

    const categoryLabels = {
        feature: 'Feature',
        improvement: 'Improvement',
        bugfix: 'Bug Fix',
        breaking: 'Breaking Change',
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            full: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            short: date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
        };
    };


    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
            <Head title="Changelog" />

            {/* AI-style Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                ></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Changelog
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Stay up to date with the latest features, improvements, and bug fixes
                        </p>
                    </motion.div>

                    {/* Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8 flex justify-end"
                    >
                        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as CategoryType)}>
                            <SelectTrigger className="w-full sm:w-[200px] bg-background/50 backdrop-blur-xl border-border/40">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="feature">Features</SelectItem>
                                <SelectItem value="improvement">Improvements</SelectItem>
                                <SelectItem value="bugfix">Bug Fixes</SelectItem>
                                <SelectItem value="breaking">Breaking Changes</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {/* Single Big Card with Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-background/50 backdrop-blur-xl border border-border/40 p-4 sm:p-8 md:p-12 shadow-lg shadow-primary/5"
                    >
                        <div className="relative">
                            <div className="hidden md:block absolute left-28 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-border/40 to-border/20"></div>

                            <div className="space-y-0">
                                {filteredChangelogs.length === 0 ? (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>No changelog entries found matching your criteria.</p>
                                    </div>
                                ) : (
                                    filteredChangelogs.map((entry, entryIndex) => {
                                        const dateInfo = formatDate(entry.date);
                                        const label = categoryLabels[entry.type];
                                        const changeId = entry.date;

                                        return (
                                            <motion.div
                                                key={entry.date}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: entryIndex * 0.1 }}
                                                className="relative md:pl-36 pb-8 md:pb-12 group"
                                            >
                                                <div className="hidden md:block absolute left-[104px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20 group-hover:scale-125 transition-transform"></div>

                                                <div className="hidden md:block absolute left-0 top-2 w-24 text-left">
                                                    <div className="text-xs font-semibold text-muted-foreground">
                                                        {dateInfo.short}
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                                                        <div className="flex-1">
                                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                                                                        {entry.title}
                                                                    </h3>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs font-medium shrink-0"
                                                                    >
                                                                        {label}
                                                                    </Badge>
                                                                </div>
                                                                <div className="md:hidden text-xs font-semibold text-muted-foreground">
                                                                    {dateInfo.short}
                                                                </div>
                                                            </div>
                                                            {entry.data && (() => {
                                                                const { processedMarkdown, codeBlockMap } = processMarkdown(entry.data || '');
                                                                const codeBlockInfos = Array.from(codeBlockMap.values());
                                                                const codeBlockIndexRef = { current: 0 };
                                                                
                                                                return (
                                                                    <div className="text-sm text-muted-foreground leading-relaxed mt-2 [&_h2]:text-sm sm:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-4 [&_h2]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:space-y-1 [&_li]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80 [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-foreground [&_code]:text-xs [&_pre]:my-4">
                                                                        <ReactMarkdown
                                                                            remarkPlugins={[remarkGfm]}
                                                                            components={{
                                                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                                code({ inline, className, children, ...props }: any) {
                                                                                    const match = /language-(\w+)/.exec(className || '');
                                                                                    const language = match ? match[1] : '';
                                                                                    const codeString = String(children).replace(/\n$/, '');
                                                                                    const currentIndex = codeBlockIndexRef.current++;
                                                                                    const codeBlockInfo = codeBlockInfos[currentIndex];
                                                                                    const meta = codeBlockInfo?.meta || '';
                                                                                    const { highlightLines, addedLines, deletedLines } = parseCodeBlock(codeString, language, meta);
                                                                                    const codeId = `${changeId}-${codeString.slice(0, 10)}`;
                                                                                    const isCopiedCode = copiedCode === codeId;

                                                                                if (!inline && language) {
                                                                                    return (
                                                        <div className="mt-4">
                                                                                            <div className="bg-background/80 border border-border/40 overflow-hidden">
                                                                <div className="flex items-center justify-between px-2 sm:px-4 py-2 bg-background/40 border-b border-border/40">
                                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                        <Code className="h-3 w-3 shrink-0" />
                                                                                                        <span className="truncate">{language}</span>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="h-7 px-2 text-xs shrink-0"
                                                                                                        onClick={() => {
                                                                                                            navigator.clipboard.writeText(codeString);
                                                                                                            setCopiedCode(codeId);
                                                                                                            setTimeout(() => setCopiedCode(null), 2000);
                                                                                                        }}
                                                                    >
                                                                                                        {isCopiedCode ? (
                                                                            <>
                                                                                <Check className="h-3 w-3 mr-1" />
                                                                                <span className="hidden sm:inline">Copied</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Copy className="h-3 w-3 mr-1" />
                                                                                <span className="hidden sm:inline">Copy</span>
                                                                            </>
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                                                                <div className="relative overflow-x-auto code-block-scroll">
                                                                    <div className="p-2 sm:p-4">
                                                                        <SyntaxHighlighter
                                                                            language={language}
                                                                            style={vscDarkPlus}
                                                                            customStyle={{
                                                                                margin: 0,
                                                                                padding: 0,
                                                                                background: 'transparent',
                                                                                fontSize: '0.875rem',
                                                                            }}
                                                                            showLineNumbers
                                                                            wrapLines={true}
                                                                            wrapLongLines={false}
                                                                            lineNumberStyle={{
                                                                                minWidth: '2em',
                                                                                paddingRight: '0.5em',
                                                                                paddingLeft: '0',
                                                                                color: 'rgba(156, 163, 175, 0.3)',
                                                                                userSelect: 'none',
                                                                                textAlign: 'right',
                                                                                fontSize: '0.75rem',
                                                                            }}
                                                                            lineProps={(lineNumber) => {
                                                                                const isHighlighted = highlightLines.includes(lineNumber);
                                                                                const isAdded = addedLines.includes(lineNumber);
                                                                                const isDeleted = deletedLines.includes(lineNumber);
                                                                                
                                                                                let backgroundColor = 'transparent';
                                                                                let borderLeft = 'none';
                                                                                
                                                                                // Priority: added > deleted > highlighted
                                                                                if (isAdded) {
                                                                                    backgroundColor = 'rgba(34, 197, 94, 0.2)';
                                                                                    borderLeft = '3px solid rgba(34, 197, 94, 0.5)';
                                                                                } else if (isDeleted) {
                                                                                    backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                                                                    borderLeft = '3px solid rgba(239, 68, 68, 0.5)';
                                                                                } else if (isHighlighted) {
                                                                                    backgroundColor = 'rgba(59, 130, 246, 0.25)';
                                                                                    borderLeft = '3px solid rgba(59, 130, 246, 0.7)';
                                                                                }
                                                                                
                                                                                return {
                                                                                    style: {
                                                                                        backgroundColor,
                                                                                        paddingLeft: '1rem',
                                                                                        paddingRight: '1rem',
                                                                                        paddingTop: '0.125rem',
                                                                                        paddingBottom: '0.125rem',
                                                                                        marginLeft: isHighlighted || isAdded || isDeleted ? '-1rem' : '0',
                                                                                        marginRight: isHighlighted || isAdded || isDeleted ? '-1rem' : '0',
                                                                                        borderLeft,
                                                                                        display: 'block',
                                                                                        width: isHighlighted || isAdded || isDeleted ? 'calc(100% + 2rem)' : '100%',
                                                                                    },
                                                                                };
                                                                            }}
                                                                        >
                                                                            {codeString}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                                return (
                                                                                    <code className={className} {...props}>
                                                                                        {children}
                                                                                    </code>
                                                                                );
                                                                            },
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            a({ href, children, ...props }: any) {
                                                                                return (
                                                                                    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                                                                                        {children}
                                                                                    </a>
                                                                                );
                                                                            },
                                                                        }}
                                                                        >
                                                                            {processedMarkdown}
                                                                        </ReactMarkdown>
                                                            </div>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <FooterSection />
        </div>
    );
}
