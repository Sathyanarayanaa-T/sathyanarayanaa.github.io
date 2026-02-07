'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';

interface TerminalWindowProps {
    title: string;
    children: ReactNode;
    accentColor?: 'cyan' | 'green' | 'pink';
    className?: string;
}

export const TerminalWindow = ({
    title,
    children,
    accentColor = 'cyan',
    className = '',
}: TerminalWindowProps) => {
    const glowClass = {
        cyan: 'hover:glow-cyan',
        green: 'hover:glow-green',
        pink: 'hover:glow-pink',
    }[accentColor];

    const borderClass = {
        cyan: 'border-[#00f3ff]/20',
        green: 'border-[#0aff00]/20',
        pink: 'border-[#ff003c]/20',
    }[accentColor];

    return (
        <div className={`terminal-window ${glowClass} ${borderClass} ${className}`}>
            {/* Title Bar */}
            <div className="terminal-titlebar">
                <div className="flex items-center gap-2">
                    <div className="terminal-controls">
                        <motion.div
                            className="terminal-control"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Minus size={8} className="text-white/40" />
                        </motion.div>
                        <motion.div
                            className="terminal-control"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Square size={6} className="text-white/40" />
                        </motion.div>
                        <motion.div
                            className="terminal-control"
                            whileHover={{ scale: 1.1 }}
                        >
                            <X size={8} className="text-white/40" />
                        </motion.div>
                    </div>
                    <span className="text-xs text-white/60 font-mono ml-2">{title}</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
