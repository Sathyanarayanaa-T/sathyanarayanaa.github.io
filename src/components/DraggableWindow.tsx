'use client';

import { ReactNode, useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useDrift } from '@/hooks/useDrift';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface DraggableWindowProps {
    children: ReactNode;
    initialX?: number;
    initialY?: number;
    driftIntensity?: number;
    className?: string;
}

export const DraggableWindow = ({
    children,
    initialX = 0,
    initialY = 0,
    driftIntensity = 15,
    className = '',
}: DraggableWindowProps) => {
    const isMobile = useIsMobile();
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef(null);

    // Drift physics - disabled when hovering or dragging
    const { x: driftX, y: driftY } = useDrift({
        intensity: driftIntensity,
        enabled: !isHovered && !isDragging && !isMobile,
    });

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        setIsDragging(false);
    };

    return (
        <motion.div
            ref={constraintsRef}
            className={`will-drift gpu-accelerated ${className}`}
            style={{
                x: isDragging || isHovered ? 0 : driftX,
                y: isDragging || isHovered ? 0 : driftY,
                position: 'relative',
            }}
            drag={!isMobile}
            dragMomentum
            dragElastic={0.1}
            dragConstraints={{
                top: -200,
                left: -200,
                right: 200,
                bottom: 200,
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={
                !isMobile
                    ? {
                        scale: 1.05,
                        zIndex: 50,
                        transition: { duration: 0.2 },
                    }
                    : undefined
            }
            animate={
                isHovered || isDragging
                    ? { x: 0, y: 0 }
                    : { x: initialX, y: initialY }
            }
            transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
            }}
        >
            {children}
        </motion.div>
    );
};
