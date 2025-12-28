import { motion, useDragControls } from 'framer-motion';
import { Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface WindowWrapperProps {
    title: string;
    onClose: () => void;
    onFocus?: () => void;
    children: ReactNode;
    className?: string;
    showControls?: boolean;
    offsetX?: number;
    offsetY?: number;
    dragConstraints?: React.RefObject<Element | null>;
    style?: React.CSSProperties;
}

export function WindowWrapper({
    title,
    onClose,
    onFocus,
    children,
    className = '',
    showControls = true,
    offsetX = 0,
    offsetY = 0,
    dragConstraints,
    style
}: WindowWrapperProps) {
    const dragControls = useDragControls();

    const defaultClasses = "absolute top-12 left-16 right-16 bottom-16 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-30";
    const finalClasses = className.includes('absolute') ? `${className} bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-30` : `${defaultClasses} ${className}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 + offsetY, x: offsetX }}
            animate={{ opacity: 1, scale: 1, y: offsetY, x: offsetX }}
            exit={{ opacity: 0, scale: 0.9, y: 20 + offsetY, x: offsetX }}
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={dragConstraints}
            onPointerDown={() => onFocus?.()}
            style={style}
            className={finalClasses}
        >
            <div
                onPointerDown={(e) => dragControls.start(e)}
                className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-muted/30 border-b border-border/50 cursor-grab active:cursor-grabbing select-none"
            >
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={onClose}
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/20 hover:bg-red-500/40 transition-colors border border-red-500/30"
                    ></button>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500/40 transition-colors border border-yellow-500/30"
                    ></button>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/20 hover:bg-green-500/40 transition-colors border border-green-500/30"
                    ></button>
                </div>
                <span className="text-[10px] sm:text-xs font-medium">{title}</span>
                <div className="flex items-center gap-2 opacity-0">
                    <Minus className="h-2 w-2 sm:h-3 sm:w-3 text-muted-foreground" />
                </div>
            </div>
            <div className="h-full overflow-hidden">
                {children}
            </div>
        </motion.div>
    );
}
