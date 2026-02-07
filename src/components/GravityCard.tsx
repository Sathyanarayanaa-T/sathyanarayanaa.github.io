'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useFloatingAnimation } from '@/hooks/useFloatingAnimation';
import { useMagneticPull } from '@/hooks/useMagneticPull';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface GravityCardProps {
    children: ReactNode;
    className?: string;
    floatAmplitude?: number;
    floatDuration?: number;
}

export const GravityCard = ({
    children,
    className = '',
    floatAmplitude = 10,
    floatDuration = 3,
}: GravityCardProps) => {
    const isMobile = useIsMobile();
    const floatingProps = useFloatingAnimation({
        amplitude: floatAmplitude,
        duration: floatDuration,
    });
    const { ref, isHovered, magneticProps } = useMagneticPull({
        strength: 0.25,
        maxDistance: 120,
    });

    return (
        <motion.div
            ref={ref}
            className={`glass glass-hover will-float ${className}`}
            {...(!isMobile && floatingProps)} // Disable floating on mobile
            {...(!isMobile && magneticProps)} // Disable magnetic on mobile
            whileHover={
                !isMobile
                    ? {
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
};
