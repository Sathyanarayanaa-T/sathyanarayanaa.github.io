import { useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface MagneticPullOptions {
    strength?: number; // Multiplier for pull effect (0-1)
    maxDistance?: number; // Maximum distance in pixels where effect is active
}

export const useMagneticPull = ({
    strength = 0.3,
    maxDistance = 150,
}: MagneticPullOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for magnetic pull
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Only apply effect within maxDistance
        if (distance < maxDistance) {
            const pullStrength = (1 - distance / maxDistance) * strength;
            x.set(deltaX * pullStrength);
            y.set(deltaY * pullStrength);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return {
        ref,
        isHovered,
        magneticProps: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            onMouseEnter: handleMouseEnter,
            style: {
                x: springX,
                y: springY,
            },
        },
    };
};
