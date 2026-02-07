'use client';

import { motion } from 'framer-motion';
import { useMouseDisplacement } from '@/hooks/useMouseDisplacement';

export const MatrixGrid = () => {
    const { mousePosition, getDisplacement } = useMouseDisplacement(0.05);

    // Create grid points
    const gridSize = 30; // spacing in pixels
    const cols = Math.ceil(window.innerWidth / gridSize) + 2;
    const rows = Math.ceil(window.innerHeight / gridSize) + 2;

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1]">
            <svg className="w-full h-full">
                <defs>
                    <pattern
                        id="grid"
                        width={gridSize}
                        height={gridSize}
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                            fill="none"
                            stroke="rgba(255,255,255,0.03)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Displaced grid lines near mouse */}
                {Array.from({ length: 5 }).map((_, i) => {
                    const angle = (i / 5) * Math.PI * 2;
                    const distance = 150;
                    const x1 = mousePosition.x + Math.cos(angle) * distance;
                    const y1 = mousePosition.y + Math.sin(angle) * distance;
                    const x2 = mousePosition.x + Math.cos(angle + Math.PI) * distance;
                    const y2 = mousePosition.y + Math.sin(angle + Math.PI) * distance;

                    return (
                        <motion.line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(0,243,255,0.1)"
                            strokeWidth="0.5"
                            animate={{
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};
