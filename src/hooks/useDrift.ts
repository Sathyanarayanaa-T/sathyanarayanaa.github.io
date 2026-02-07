import { useTime, useTransform, MotionValue } from 'framer-motion';

interface UseDriftOptions {
    intensity?: number;
    frequency1?: number;
    frequency2?: number;
    enabled?: boolean;
}

export const useDrift = ({
    intensity = 15,
    frequency1 = 0.0005,
    frequency2 = 0.0003,
    enabled = true,
}: UseDriftOptions = {}): { x: MotionValue<number>; y: MotionValue<number> } => {
    const time = useTime();

    // Create dual sine wave superposition for organic, non-repetitive motion
    const x = useTransform(time, (t) => {
        if (!enabled) return 0;
        const sine1 = Math.sin(t * frequency1) * intensity;
        const sine2 = Math.sin(t * frequency2) * intensity * 0.5;
        return sine1 + sine2;
    });

    const y = useTransform(time, (t) => {
        if (!enabled) return 0;
        const cosine1 = Math.cos(t * frequency1) * intensity;
        const cosine2 = Math.cos(t * frequency2 * 1.3) * intensity * 0.5;
        return cosine1 + cosine2;
    });

    return { x, y };
};
