'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Waybar = () => {
    const [time, setTime] = useState(new Date());
    const [cpu, setCpu] = useState(0);
    const [workspace, setWorkspace] = useState('MAIN');

    // Update clock every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Simulate CPU usage based on scroll velocity
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let lastTime = Date.now();

        const handleScroll = () => {
            const now = Date.now();
            const deltaY = Math.abs(window.scrollY - lastScrollY);
            const deltaTime = now - lastTime;

            if (deltaTime > 0) {
                const velocity = (deltaY / deltaTime) * 100;
                setCpu(Math.min(99, Math.round(velocity)));

                // Decay CPU usage
                setTimeout(() => {
                    setCpu((prev) => Math.max(0, prev - 10));
                }, 100);
            }

            lastScrollY = window.scrollY;
            lastTime = now;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Detect active section
    useEffect(() => {
        const handleSectionChange = () => {
            const scrollPosition = window.scrollY + 200;

            if (scrollPosition < window.innerHeight) {
                setWorkspace('INIT');
            } else if (scrollPosition < window.innerHeight * 2) {
                setWorkspace('PROJECTS');
            } else if (scrollPosition < window.innerHeight * 3) {
                setWorkspace('ABOUT');
            } else {
                setWorkspace('SKILLS');
            }
        };

        window.addEventListener('scroll', handleSectionChange);
        handleSectionChange();

        return () => window.removeEventListener('scroll', handleSectionChange);
    }, []);

    return (
        <motion.div
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="cyber-glass px-6 py-2 border-b-2 border-[#00f3ff] flex items-center gap-8">
                {/* Clock */}
                <div className="flex items-center gap-2">
                    <span className="text-[#00f3ff] text-xs">⏱</span>
                    <span className="text-white/80 text-sm font-mono tabular-nums">
                        {time.toLocaleTimeString('en-US', {
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}
                    </span>
                </div>

                {/* CPU Usage */}
                <div className="flex items-center gap-2">
                    <span className="text-[#0aff00] text-xs">CPU</span>
                    <span className="text-white/80 text-sm font-mono tabular-nums">
                        {cpu.toString().padStart(2, '0')}%
                    </span>
                </div>

                {/* Workspace */}
                <div className="flex items-center gap-2">
                    <span className="text-[#ff003c] text-xs">⬜</span>
                    <span className="text-white/80 text-sm font-mono">
                        {workspace}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
