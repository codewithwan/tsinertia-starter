import { ImageIcon } from 'lucide-react';

interface NotepadWindowProps {
    file: string | null;
}

export function NotepadWindow({ file }: NotepadWindowProps) {
    if (!file) return null;

    return (
        <div className="h-full overflow-auto p-4 text-left font-mono text-xs">
            {file === 'notes.txt' && (
                <div className="space-y-2 text-foreground/80">
                    <p>Personal Notes - 2025</p>
                    <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p className="mt-2 font-bold text-primary">TODO:</p>
                    <p>- Build full-stack app 🚀</p>
                    <p>- Fix API endpoints 🛠️</p>
                    <p>- Update documentation 📝</p>
                </div>
            )}
            {file === 'README.md' && (
                <div className="space-y-2 text-foreground/80">
                    <p className="text-lg font-semibold text-foreground"># My Project</p>
                    <p className="mt-2 italic">Welcome to my awesome project!</p>
                    <p className="mt-4 font-bold text-primary">## Installation</p>
                    <p className="rounded bg-muted/50 p-2">npm install</p>
                    <p className="mt-4 font-bold text-primary">## Usage</p>
                    <p>Run `composer dev` to start development server.</p>
                </div>
            )}
            {file === 'package.json' && (
                <div className="space-y-1 text-foreground/80">
                    <p>{`{`}</p>
                    <p className="pl-4">"name": "my-awesome-app",</p>
                    <p className="pl-4">"version": "1.0.0",</p>
                    <p className="pl-4">"scripts": {`{`}</p>
                    <p className="pl-8">"dev": "composer dev",</p>
                    <p className="pl-4">{`}`}</p>
                    <p>{`}`}</p>
                </div>
            )}
            {(file === 'logo.png' || file === 'banner.png' || file === 'logo.svg') && (
                <div className="flex h-full flex-col items-center justify-center pb-16">
                    <div
                        className={`${file === 'banner.png' ? 'h-32 w-64' : 'h-48 w-48'} bg-gradient-to-br from-primary/30 to-primary/10 ${file === 'logo.svg' ? 'rounded-full border-2' : 'rounded-lg border'} flex items-center justify-center border-primary/20`}
                    >
                        <ImageIcon className="h-20 w-20 text-primary/40" />
                    </div>
                </div>
            )}
            {file === 'my-bini.png' && (
                <div className="flex h-full items-center justify-center pb-16">
                    <img src="/assets/my_bini.jpg" alt="my-bini" className="max-h-full max-w-full rounded-lg object-contain" />
                </div>
            )}
        </div>
    );
}
