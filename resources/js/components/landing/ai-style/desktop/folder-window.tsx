import { FileText, Folder, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface FolderWindowProps {
    setNotepadFile: (file: string | null) => void;
}

export function FolderWindow({ setNotepadFile }: FolderWindowProps) {
    const [explorerExpanded, setExplorerExpanded] = useState<Set<string>>(new Set(['Projects']));

    const toggleFolder = (folder: string) => {
        const newExpanded = new Set(explorerExpanded);
        if (explorerExpanded.has(folder)) {
            newExpanded.delete(folder);
        } else {
            newExpanded.add(folder);
        }
        setExplorerExpanded(newExpanded);
    };

    return (
        <div className="flex h-full">
            <div className="w-24 space-y-0.5 overflow-auto border-r border-border/30 bg-muted/20 p-1 sm:w-48 sm:space-y-1 sm:p-3">
                <div className="mb-1 text-left text-[8px] font-semibold tracking-wider text-muted-foreground/60 uppercase sm:mb-2 sm:text-[10px]">
                    Favorites
                </div>

                <div>
                    <div
                        className="flex cursor-pointer items-center gap-0.5 rounded px-1 py-0.5 text-[8px] hover:bg-muted/50 sm:gap-1 sm:px-2 sm:py-1 sm:text-[10px]"
                        onClick={() => toggleFolder('Projects')}
                    >
                        <span className="text-[6px] text-foreground/40 sm:text-[8px]">{explorerExpanded.has('Projects') ? '▼' : '▶'}</span>
                        <Folder className="h-2 w-2 text-foreground/60 sm:h-3 sm:w-3" />
                        <span>Projects</span>
                    </div>
                    {explorerExpanded.has('Projects') && (
                        <div className="mt-0.5 space-y-0.5 pl-2 sm:mt-1 sm:pl-4">
                            {['my-website', 'backend-api'].map((f) => (
                                <div
                                    key={f}
                                    className="flex cursor-pointer items-center gap-0.5 rounded px-1 py-0.5 text-[8px] hover:bg-muted/50 sm:gap-1 sm:px-2 sm:text-[10px]"
                                >
                                    <Folder className="h-2 w-2 text-foreground/60 sm:h-3 sm:w-3" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div
                        className="flex cursor-pointer items-center gap-0.5 rounded px-1 py-0.5 text-[8px] hover:bg-muted/50 sm:gap-1 sm:px-2 sm:py-1 sm:text-[10px]"
                        onClick={() => toggleFolder('Documents')}
                    >
                        <span className="text-[6px] text-foreground/40 sm:text-[8px]">{explorerExpanded.has('Documents') ? '▼' : '▶'}</span>
                        <Folder className="h-2 w-2 text-foreground/60 sm:h-3 sm:w-3" />
                        <span>Documents</span>
                    </div>
                    {explorerExpanded.has('Documents') && (
                        <div className="mt-0.5 space-y-0.5 pl-2 sm:mt-1 sm:pl-4">
                            {['notes.txt', 'README.md'].map((f) => (
                                <div
                                    key={f}
                                    className="flex items-center gap-0.5 rounded px-1 py-0.5 text-[8px] hover:bg-muted/50 sm:gap-1 sm:px-2 sm:text-[10px]"
                                >
                                    <FileText className="h-2 w-2 text-foreground/60 sm:h-3 sm:w-3" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
                    {[
                        { icon: Folder, name: 'my-website', type: 'folder' },
                        { icon: Folder, name: 'backend-api', type: 'folder' },
                        { icon: FileText, name: 'README.md', type: 'file' },
                        { icon: Folder, name: 'frontend', type: 'folder' },
                        { icon: FileText, name: 'package.json', type: 'file' },
                        { icon: ImageIcon, name: 'logo.png', type: 'file' },
                        { icon: FileText, name: 'notes.txt', type: 'file' },
                        { icon: ImageIcon, name: 'banner.png', type: 'file' },
                        { icon: ImageIcon, name: 'my-bini.png', type: 'file' },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex cursor-pointer flex-col items-center gap-0.5 rounded p-1 hover:bg-muted/50 sm:gap-1 sm:p-2"
                            onDoubleClick={() => {
                                if (item.type === 'file') {
                                    setNotepadFile(item.name);
                                }
                            }}
                        >
                            <item.icon className="h-4 w-4 text-foreground sm:h-8 sm:w-8" />
                            <span className="w-full truncate text-center text-[8px] text-muted-foreground sm:text-[10px]">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
