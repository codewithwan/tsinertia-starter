import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon } from 'lucide-react';

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
            <div className="w-24 sm:w-48 bg-muted/20 border-r border-border/30 p-1 sm:p-3 space-y-0.5 sm:space-y-1 overflow-auto">
                <div className="text-[8px] sm:text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1 sm:mb-2 text-left">Favorites</div>

                <div>
                    <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]" onClick={() => toggleFolder('Projects')}>
                        <span className="text-foreground/40 text-[6px] sm:text-[8px]">{explorerExpanded.has('Projects') ? '▼' : '▶'}</span>
                        <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                        <span>Projects</span>
                    </div>
                    {explorerExpanded.has('Projects') && (
                        <div className="pl-2 sm:pl-4 space-y-0.5 mt-0.5 sm:mt-1">
                            {['my-website', 'backend-api'].map(f => (
                                <div key={f} className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]">
                                    <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded hover:bg-muted/50 cursor-pointer text-[8px] sm:text-[10px]" onClick={() => toggleFolder('Documents')}>
                        <span className="text-foreground/40 text-[6px] sm:text-[8px]">{explorerExpanded.has('Documents') ? '▼' : '▶'}</span>
                        <Folder className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                        <span>Documents</span>
                    </div>
                    {explorerExpanded.has('Documents') && (
                        <div className="pl-2 sm:pl-4 space-y-0.5 mt-0.5 sm:mt-1">
                            {['notes.txt', 'README.md'].map(f => (
                                <div key={f} className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 rounded hover:bg-muted/50 text-[8px] sm:text-[10px]">
                                    <FileText className="h-2 w-2 sm:h-3 sm:w-3 text-foreground/60" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 p-2 sm:p-4 overflow-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
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
                            className="flex flex-col items-center gap-0.5 sm:gap-1 p-1 sm:p-2 rounded hover:bg-muted/50 cursor-pointer"
                            onDoubleClick={() => {
                                if (item.type === 'file') {
                                    setNotepadFile(item.name);
                                }
                            }}
                        >
                            <item.icon className="h-4 w-4 sm:h-8 sm:w-8 text-foreground" />
                            <span className="text-[8px] sm:text-[10px] text-center text-muted-foreground truncate w-full">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
