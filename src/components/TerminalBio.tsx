'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBreathing } from '@/hooks/useBreathing';
import { BIO } from '@/lib/constants';

export const TerminalBio = () => {
    const [isHovered, setIsHovered] = useState(false);
    const y = useBreathing({ amplitude: 10, duration: 3800, paused: isHovered });

    return (
        <section className="relative py-20 px-6 max-w-3xl mx-auto" id="about">
            <motion.h2
                className="text-4xl font-bold text-white mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                About
            </motion.h2>

            <motion.div
                className="will-breathe"
                style={{ y }}
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', damping: 20 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="glass-card p-8">
                    <p className="text-white/80 text-lg leading-relaxed text-center">
                        {BIO}
                    </p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-pill px-4 py-3 text-center border-cyan/30">
                            <div className="text-cyan text-xs mb-1">FOCUS</div>
                            <div className="text-white/60 text-xs">UI Architecture</div>
                        </div>
                        <div className="glass-pill px-4 py-3 text-center border-green/30">
                            <div className="text-green text-xs mb-1">STACK</div>
                            <div className="text-white/60 text-xs">React + AI</div>
                        </div>
                        <div className="glass-pill px-4 py-3 text-center border-pink/30">
                            <div className="text-pink text-xs mb-1">GOAL</div>
                            <div className="text-white/60 text-xs">CG Research</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
