"use client";

import { useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

interface ScrollingTextProps {
    text: string;
    speed?: number; // pixels per second
    className?: string;
}

export const ScrollingText = ({ text, speed = 50, className = "" }: ScrollingTextProps) => {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useAnimationFrame((time, delta) => {
        if (!containerRef.current) return;

        // Get the width of one text instance
        const firstChild = containerRef.current.firstChild as HTMLElement;
        if (!firstChild) return;

        const textWidth = firstChild.offsetWidth;

        // Move right to left
        const movement = -(speed * delta) / 1000;
        let newX = x.get() + movement;

        // Reset when we've scrolled one full text width
        // Since we have 4 copies, reset every time we move one copy width
        if (newX <= -textWidth) {
            newX = newX + textWidth;
        }

        x.set(newX);
    });

    return (
        <div className="overflow-hidden w-full relative">
            <motion.div
                ref={containerRef}
                className="flex whitespace-nowrap"
                style={{ x }}
            >
                {/* Repeat text 4 times for seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <span key={i} className={`${className} inline-block`}>
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
