'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    {
        name: 'GitHub',
        icon: Github,
        href: 'https://github.com/sathyanarayanaa',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        href: 'https://linkedin.com/in/sathyanarayanaa',
    },
    {
        name: 'Email',
        icon: Mail,
        href: 'mailto:contact@sathyanarayanaa.dev',
    },
];

export const Dock = () => {
    return (
        <motion.div
            className="fixed bottom-8 left-1/2 z-50"
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            transition={{ type: 'spring', damping: 20, delay: 1 }}
        >
            <div className="glass-dock px-6 py-3 rounded-full">
                <div className="flex gap-6">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-cyan transition-colors"
                                whileHover={{ scale: 1.3, y: -8 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                            >
                                <Icon size={24} />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};
