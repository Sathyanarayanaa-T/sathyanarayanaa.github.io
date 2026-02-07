import { useEffect, useState, useRef } from 'react';

export const useMouseDisplacement = (strength: number = 0.1) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const requestRef = useRef<number>();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }

            requestRef.current = requestAnimationFrame(() => {
                setMousePosition({
                    x: e.clientX,
                    y: e.clientY,
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    // Calculate displacement based on distance from mouse
    const getDisplacement = (x: number, y: number, maxDistance: number = 200) => {
        const dx = mousePosition.x - x;
        const dy = mousePosition.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > maxDistance) return { x: 0, y: 0 };

        const factor = (1 - distance / maxDistance) * strength;
        return {
            x: dx * factor,
            y: dy * factor,
        };
    };

    return { mousePosition, getDisplacement };
};
