"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

interface ParallaxTextProps {
    children: string;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
    const baseX = useRef(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.current += moveBy;
    });

    return (
        <div className="parallax overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div
                className="scroller font-syne font-bold text-8xl md:text-[12rem] uppercase flex whitespace-nowrap flex-nowrap"
                style={{ x: useTransform(() => `${baseX.current % 100}%`) }}
            >
                <span className="block mr-12 text-outline-skills text-transparent hover:text-neon-purple transition-colors duration-300">{children} </span>
                <span className="block mr-12 text-outline-skills text-transparent hover:text-neon-purple transition-colors duration-300">{children} </span>
                <span className="block mr-12 text-outline-skills text-transparent hover:text-neon-purple transition-colors duration-300">{children} </span>
                <span className="block mr-12 text-outline-skills text-transparent hover:text-neon-purple transition-colors duration-300">{children} </span>
            </motion.div>
        </div>
    );
}

export const SkillsMarquee = () => {
    // Frontend & AI skills (no Next.js)
    const row1 = "REACT • TYPESCRIPT • TAILWIND • FRAMER MOTION • ";
    const row2 = "PYTHON • TENSORFLOW • PYTORCH • COMPUTER VISION • ";
    const row3 = "WEBGL • THREE.JS • GSAP • FIGMA • ";

    return (
        <section className="py-32 overflow-hidden bg-charcoal">
            <div className="-rotate-2 py-10 scale-110">
                <ParallaxText baseVelocity={2}>{row1}</ParallaxText>
                <ParallaxText baseVelocity={-2}>{row2}</ParallaxText>
                <ParallaxText baseVelocity={2}>{row3}</ParallaxText>
            </div>
        </section>
    );
};
