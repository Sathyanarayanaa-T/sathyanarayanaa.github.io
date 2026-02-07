'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBreathing } from '@/hooks/useBreathing';
import { PROJECTS } from '@/lib/constants';
import { LineChart, Wifi, Shield, Box } from 'lucide-react';

const ProjectIcon = ({ projectId }: { projectId: string }) => {
    switch (projectId) {
        case 'qivora':
            return (
                <div className="relative">
                    <LineChart size={48} className="text-cyan" />
                    {/* Flickering numbers */}
                    <motion.div
                        className="absolute -top-2 -right-2 text-cyan text-xs font-mono"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        $2.4M
                    </motion.div>
                </div>
            );
        case 'deshran':
            return (
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-green rounded-full"
                            animate={{ height: [12, 24, 12] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            );
        case 'she-power-chain':
            return (
                <motion.div
                    animate={{
                        boxShadow: [
                            '0 0 10px rgba(255, 0, 60, 0.3)',
                            '0 0 25px rgba(255, 0, 60, 0.6)',
                            '0 0 10px rgba(255, 0, 60, 0.3)',
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Shield size={48} className="text-pink" />
                </motion.div>
            );
        case 'uld-optimizer':
            return (
                <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <Box size={48} className="text-cyan" />
                </motion.div>
            );
        default:
            return null;
    }
};

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const y = useBreathing({
        amplitude: 8 + index * 2,
        duration: 3500 + index * 300,
        paused: isHovered
    });

    const accentColors = {
        'qivora': 'cyan',
        'deshran': 'green',
        'she-power-chain': 'pink',
        'uld-optimizer': 'cyan',
    };

    const accentColor = accentColors[project.id as keyof typeof accentColors];

    return (
        <motion.div
            className="will-breathe"
            style={{ y }}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: index * 0.1
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="glass-card p-8 relative overflow-hidden min-h-[280px] flex flex-col items-center justify-center">
                {/* Visual Layer - Always Visible */}
                <div className="visual-layer flex flex-col items-center gap-4">
                    <ProjectIcon projectId={project.id} />
                    <h3 className={`text-2xl font-bold text-${accentColor}`}>
                        {project.title}
                    </h3>
                </div>

                {/* Text Layer - Reveal on Hover */}
                <motion.div
                    className="absolute inset-0 bg-black/90 backdrop-blur-sm p-8 flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className={`text-xl font-bold text-${accentColor} mb-3`}>
                        {project.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs border border-white/20 text-white/60"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export const ProjectsGrid = () => {
    return (
        <section className="relative py-20 px-6 max-w-5xl mx-auto" id="projects">
            <motion.h2
                className="text-4xl font-bold text-white mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Featured Projects
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};
