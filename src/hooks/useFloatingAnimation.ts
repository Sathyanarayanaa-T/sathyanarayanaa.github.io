import { useMemo } from 'react';

interface FloatingAnimationOptions {
    amplitude?: number; // Vertical distance in pixels
    duration?: number; // Duration of one full cycle in seconds
    delay?: number; // Initial delay before animation starts
}

export const useFloatingAnimation = ({
    amplitude = 10,
    duration = 3,
    delay,
}: FloatingAnimationOptions = {}) => {
    // Generate random phase offset for natural, non-robotic movement
    const phaseOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    // Calculate actual delay: use provided delay or random delay if not specified
    const animationDelay = useMemo(() => {
        return delay !== undefined ? delay : Math.random() * 0.5;
    }, [delay]);

    return {
        animate: {
            y: [
                -amplitude,
                amplitude,
                -amplitude
            ],
        },
        transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: animationDelay,
            times: [0, 0.5, 1],
        },
    };
};
