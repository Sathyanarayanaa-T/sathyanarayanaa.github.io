'use client';

import { motion } from 'framer-motion';
import { useBreathing } from '@/hooks/useBreathing';
import { useState } from 'react';

export const WireframeGlobe = () => {
    const y = useBreathing({ amplitude: 15, duration: 4000 });

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <motion.div
                className="relative w-64 h-64"
                style={{ y }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {/* Wireframe Globe SVG */}
                <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Outer circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />

                    {/* Latitude lines */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="80"
                        ry="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="80"
                        ry="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />

                    {/* Longitude lines */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="40"
                        ry="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="20"
                        ry="80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />

                    {/* Center vertical line */}
                    <line
                        x1="100"
                        y1="20"
                        x2="100"
                        y2="180"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-cyan"
                    />
                </svg>
            </motion.div>
        </div>
    );
};
