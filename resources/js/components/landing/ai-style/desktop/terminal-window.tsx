export function TerminalWindow() {
    return (
        <div className="p-2 sm:p-4 h-full font-mono text-[8px] sm:text-xs bg-black dark:bg-black overflow-hidden">
            <div className="space-y-0.5 sm:space-y-1 text-white dark:text-white text-left">
                <div>$ composer dev</div>
                <div className="mt-1 sm:mt-2">Starting Laravel development server...</div>
                <div className="mt-0.5 sm:mt-1">✓ Server started: http://localhost:8000</div>
                <div>✓ Vite dev server: http://localhost:5173</div>
                <div className="mt-1 sm:mt-2">TSInertia Starter ready! 🚀</div>
                <div className="opacity-50 mt-1.5 sm:mt-3">─────────────────────────────</div>
                <div className="mt-1 sm:mt-2">[INFO] Inertia SSR server started</div>
                <div>[INFO] Vite 6.0 build tool running</div>
                <div>[INFO] Laravel 12 framework loaded</div>
                <div>[INFO] React 19 with TypeScript ready</div>
                <div className="text-green-400">[SUCCESS] All systems operational ✓</div>
                <div className="mt-1 sm:mt-2 flex items-center gap-1">
                    <span>$</span>
                    <span className="animate-pulse">_</span>
                </div>
            </div>
        </div>
    );
}
