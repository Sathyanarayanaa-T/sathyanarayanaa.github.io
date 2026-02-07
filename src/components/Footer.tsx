"use client";

import { Magnetic } from "./Magnetic";
import { Github, Linkedin, Mail } from "lucide-react";
import { ScrollingText } from "./ScrollingText";

export const Footer = () => {
    return (
        <footer className="h-screen py-20 flex flex-col items-center justify-center bg-charcoal relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 to-transparent pointer-events-none" />

            <div className="w-full overflow-hidden mb-12">
                <ScrollingText
                    text="LET'S BUILD — "
                    speed={30}
                    className="font-syne font-extrabold text-[10vw] md:text-[8vw] leading-none text-offwhite"
                />
            </div>

            <div className="flex gap-8 z-10 flex-wrap justify-center">
                <Magnetic>
                    <a href="https://github.com/Sathyanarayanaa-T" target="_blank" className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-125 group-hover:bg-neon-blue group-hover:border-transparent transition-all duration-500 ease-[0.25,1,0.5,1]">
                            <Github className="w-8 h-8 text-offwhite" />
                        </div>
                    </a>
                </Magnetic>
                <Magnetic>
                    <a href="https://linkedin.com/in/sathyanarayanaa" target="_blank" className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-125 group-hover:bg-neon-purple group-hover:border-transparent transition-all duration-500 ease-[0.25,1,0.5,1]">
                            <Linkedin className="w-8 h-8 text-offwhite" />
                        </div>
                    </a>
                </Magnetic>
                <Magnetic>
                    <a href="mailto:contact@sathyanarayanaa.dev" className="relative group">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-125 group-hover:bg-neon-pink group-hover:border-transparent transition-all duration-500 ease-[0.25,1,0.5,1]">
                            <Mail className="w-8 h-8 text-offwhite" />
                        </div>
                    </a>
                </Magnetic>

            </div>

            <div className="absolute bottom-10 text-white/20 font-manrope text-sm uppercase tracking-widest">
                © 2026 Sathyanarayanaa T. // powered by Cachy OS and other oss projects
            </div>
        </footer>
    );
};
