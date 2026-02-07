'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

    useEffect(() => {
        let trailId = 0;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add trail point
            setTrail((prev) => {
                const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
                // Keep only last 10 points
                return newTrail.slice(-10);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* Cursor Trail */}
            {trail.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="fixed w-1 h-1 bg-[#00f3ff] rounded-full pointer-events-none z-[10000]"
                    style={{
                        left: point.x,
                        top: point.y,
                    }}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                />
            ))}

            {/* Main Crosshair Cursor */}
            <div
                className="fixed pointer-events-none z-[10001] mix-blend-screen"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {/* Vertical line */}
                <div className="absolute w-[1px] h-4 bg-[#00f3ff] left-1/2 -translate-x-1/2 -top-2" />
                <div className="absolute w-[1px] h-4 bg-[#00f3ff] left-1/2 -translate-x-1/2 top-2" />

                {/* Horizontal line */}
                <div className="absolute h-[1px] w-4 bg-[#00f3ff] top-1/2 -translate-y-1/2 -left-2" />
                <div className="absolute h-[1px] w-4 bg-[#00f3ff] top-1/2 -translate-y-1/2 left-2" />

                {/* Center dot */}
                <div className="absolute w-1 h-1 bg-[#00f3ff] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </div>
        </>
    );
};
