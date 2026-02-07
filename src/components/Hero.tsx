"use client";

import { motion } from "framer-motion";
import { ScrollingText } from "./ScrollingText";

export const Hero = () => {
    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal">
            <div className="relative z-10 flex flex-col items-center w-full">
                <motion.div
                    className="w-full overflow-hidden"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                >
                    <ScrollingText
                        text="SATHYANARAYANAA THIRUNAVUKKARASU — "
                        speed={55}
                        className="font-syne font-extrabold text-[13vw] leading-none text-offwhite mix-blend-difference"
                    />
                </motion.div>

                <motion.p
                    className="font-manrope text-xl md:text-2xl text-offwhite/60 mt-4 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Frontend Engineer × AI Researcher
                </motion.p>

            </div>

            {/* Kinetic Background Gradient */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20 blur-3xl opacity-50"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-neon-purple/30 rounded-full blur-[100px] animate-pulse" />
            </div>
        </section>
    );
};
