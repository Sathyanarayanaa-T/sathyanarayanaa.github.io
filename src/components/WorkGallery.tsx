"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { LineChart, Wifi, Shield, ArrowUpRight } from "lucide-react";
import { VelocityText } from "./VelocityText";

// Updated Project Data
const PROJECTS = [
    {
        id: 'qivora',
        title: 'Qivora',
        tags: ['Fintech AI', 'React Dashboards', 'Data Visualization'],
        description: 'Intelligent financial analytics platform with real-time data processing and AI-powered insights for smarter decision making.',
        link: 'https://qivora.fit'
    },
    {
        id: 'she-power-chain', // Moved up as second project per request physics
        title: 'She Power Chain',
        tags: ['System Architecture', 'Backend Systems', 'Data Integrity'],
        description: 'Robust backend systems supporting structured data validation, rule enforcement, and transparent record handling with a focus on scalability.',
        link: 'https://shepowerchain.github.io'
    },
    {
        id: 'deshran',
        title: 'Deshran',
        tags: ['Edge AI', 'PWA', 'Offline-First'],
        description: 'Edge AI-powered athletic training application. Optimized for offline usage, low-cost devices, and minimal compute availability.',
        link: 'https://deshran.tech'
    },
];

const QivoraVisual = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-charcoal to-black flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/grid.svg')" }} />

        {/* Floating Card 1 - Moves Up on Hover */}
        <motion.div
            className="absolute w-64 h-40 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center"
            style={{ top: "35%", left: "25%" }}
            whileHover={{ y: -20, rotateX: 10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
            <div className="text-neon-blue font-syne font-bold text-4xl">$24.5k</div>
        </motion.div>

        {/* Floating Card 2 - Moves Down on Hover */}
        <motion.div
            className="absolute w-56 h-32 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl z-10 flex flex-col justify-center px-6"
            style={{ top: "50%", left: "45%" }}
            whileHover={{ y: 20, rotateX: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
            <div className="w-full h-2 bg-white/20 rounded-full mb-3" />
            <div className="w-2/3 h-2 bg-white/20 rounded-full" />
        </motion.div>
    </div>
);

const ShePowerChainVisual = () => (
    <div className="relative w-full h-full bg-charcoal flex items-center justify-center overflow-hidden">
        {/* Interlocking Rings */}
        <motion.div
            className="absolute border-[20px] border-neon-pink/20 rounded-full w-64 h-64"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            whileHover={{ rotate: 720, scale: 1.1, borderColor: "rgba(255, 0, 128, 0.4)" }}
        />
        <motion.div
            className="absolute border-[15px] border-neon-pink/40 rounded-full w-48 h-48"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            whileHover={{ rotate: -720, scale: 0.9, borderColor: "rgba(255, 0, 128, 0.6)" }}
        />
        <Shield className="text-neon-pink w-20 h-20 z-10" />
    </div>
);


const DeshranVisual = () => (
    <div className="relative w-full h-full bg-charcoal flex items-center justify-center overflow-hidden group">
        {/* Energy Ripple */}
        {[1, 2, 3].map((i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border border-neon-purple/50"
                initial={{ width: 100, height: 100, opacity: 0 }}
                whileInView={{
                    width: [100, 300],
                    height: [100, 300],
                    opacity: [0.8, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut"
                }}
            />
        ))}
        <Wifi className="text-neon-purple w-32 h-32 z-10 relative drop-shadow-[0_0_25px_rgba(176,0,255,0.6)] group-hover:scale-110 transition-transform duration-500" />
    </div>
);


const ParallaxProject = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const VisualComponent = () => {
        switch (project.id) {
            case 'qivora': return <QivoraVisual />;
            case 'she-power-chain': return <ShePowerChainVisual />; // Correct order
            case 'deshran': return <DeshranVisual />;
            default: return null;
        }
    }

    return (
        <motion.div
            ref={container}
            style={{ scale }}
            className="h-[80vh] w-full flex items-center justify-center sticky top-0 md:top-10 mb-20 origin-top"
        >
            <div className="relative w-full max-w-6xl h-[600px] flex flex-col md:flex-row bg-charcoal rounded-4xl overflow-hidden border border-white/5 shadow-2xl">

                {/* Visual Half */}
                <div className="w-full md:w-2/3 h-full relative overflow-hidden group">
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                        <VisualComponent />
                    </div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent pointer-events-none" />
                </div>

                {/* Text Half */}
                <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-charcoal/50 backdrop-blur-sm border-l border-white/5">
                    <motion.div style={{ y }}>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-xs font-manrope text-white/50">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="font-syne font-bold text-4xl md:text-5xl text-offwhite mb-4">
                            {project.title}
                        </h2>
                        <p className="font-manrope text-white/60 leading-relaxed text-sm md:text-base">
                            {project.description}
                        </p>
                    </motion.div>

                    <div className="mt-8 self-end md:self-start">
                        <Magnetic>
                            <a
                                href={project.link}
                                target="_blank"
                                className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-charcoal hover:scale-110 transition-all duration-300 group bg-charcoal"
                            >
                                <ArrowUpRight className="w-8 h-8 group-hover:rotate-45 transition-transform" />
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const WorkGallery = () => {
    return (
        <section className="relative px-4 py-16 bg-transparent" id="work">

            <div className="flex flex-col gap-16">
                {PROJECTS.map((project, index) => (
                    <ParallaxProject key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
};
