"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface VelocityTextProps {
    children: React.ReactNode;
    className?: string;
    baseVelocity?: number;
}

export const VelocityText = ({ children, className }: VelocityTextProps) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-10, 0, 10], {
        clamp: true
    });

    return (
        <motion.div style={{ skewX }} className={className}>
            {children}
        </motion.div>
    );
};
