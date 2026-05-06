export function TerminalWindow() {
    return (
        <div className="h-full overflow-hidden bg-black p-2 font-mono text-[8px] sm:p-4 sm:text-xs dark:bg-black">
            <div className="space-y-0.5 text-left text-white sm:space-y-1 dark:text-white">
                <div>$ composer dev</div>
                <div className="mt-1 sm:mt-2">Starting Laravel development server...</div>
                <div className="mt-0.5 sm:mt-1">✓ Server started: http://localhost:8000</div>
                <div>✓ Vite dev server: http://localhost:5173</div>
                <div className="mt-1 sm:mt-2">TSInertia Starter ready! 🚀</div>
                <div className="mt-1.5 opacity-50 sm:mt-3">─────────────────────────────</div>
                <div className="mt-1 sm:mt-2">[INFO] Inertia SSR server started</div>
                <div>[INFO] Vite 6.0 build tool running</div>
                <div>[INFO] Laravel 12 framework loaded</div>
                <div>[INFO] React 19 with TypeScript ready</div>
                <div className="text-green-400">[SUCCESS] All systems operational ✓</div>
                <div className="mt-1 flex items-center gap-1 sm:mt-2">
                    <span>$</span>
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
}
