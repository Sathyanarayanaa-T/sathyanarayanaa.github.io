import { useTime, useTransform, MotionValue } from 'framer-motion';

interface UseBreathingOptions {
    amplitude?: number;
    duration?: number;
    paused?: boolean;
}

export const useBreathing = ({
    amplitude = 10,
    duration = 3500,
    paused = false,
}: UseBreathingOptions = {}): MotionValue<number> => {
    const time = useTime();

    // Sine wave for gentle vertical breathing
    const y = useTransform(time, (t) => {
        if (paused) return 0;
        return Math.sin(t / duration) * amplitude;
    });

    return y;
};
