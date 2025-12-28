import { ImageIcon } from 'lucide-react';

interface NotepadWindowProps {
    file: string | null;
}

export function NotepadWindow({ file }: NotepadWindowProps) {
    if (!file) return null;

    return (
        <div className="h-full overflow-auto p-4 font-mono text-xs text-left">
            {file === 'notes.txt' && (
                <div className="space-y-2 text-foreground/80">
                    <p>Personal Notes - 2025</p>
                    <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p className="mt-2 text-primary font-bold">TODO:</p>
                    <p>- Build full-stack app 🚀</p>
                    <p>- Fix API endpoints 🛠️</p>
                    <p>- Update documentation 📝</p>
                </div>
            )}
            {file === 'README.md' && (
                <div className="space-y-2 text-foreground/80">
                    <p className="font-semibold text-lg text-foreground"># My Project</p>
                    <p className="mt-2 italic">Welcome to my awesome project!</p>
                    <p className="mt-4 text-primary font-bold">## Installation</p>
                    <p className="bg-muted/50 p-2 rounded">npm install</p>
                    <p className="mt-4 text-primary font-bold">## Usage</p>
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
                <div className="flex flex-col items-center justify-center h-full pb-16">
                    <div className={`${file === 'banner.png' ? 'w-64 h-32' : 'w-48 h-48'} bg-gradient-to-br from-primary/30 to-primary/10 ${file === 'logo.svg' ? 'rounded-full border-2' : 'rounded-lg border'} border-primary/20 flex items-center justify-center`}>
                        <ImageIcon className="w-20 h-20 text-primary/40" />
                    </div>
                </div>
            )}
            {file === 'my-bini.png' && (
                <div className="flex items-center justify-center h-full pb-16">
                    <img
                        src="/assets/my_bini.jpg"
                        alt="my-bini"
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>
            )}
        </div>
    );
}
