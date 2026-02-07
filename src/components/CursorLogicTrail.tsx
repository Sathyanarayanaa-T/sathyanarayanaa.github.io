"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    color: string;
    rotation: number;
    rotationSpeed: number;
    life: number;
    maxLife: number;
    size: number;
}

// Special characters - most common (85%)
const SPECIAL_CHARS = [
    "{", "}", "</>", "[]", "()", "=>", "&&", "||", "!=", "===", "#", "::",
    ";", ",", ".", "?", "!", "@", "$", "%", "&", "*", "+", "-", "/",
    "<", ">", "|", "~", "^", "_", ":"
];

// Regular words (will be chunked to max 3 chars) - rare (10%)
const REGULAR_WORDS = [
    "const", "let", "async", "await", "void", "null", "true", "false", "return",
    "import", "export", "class", "function", "type", "interface",
    "sudo", "grep", "vim", "bash", "git", "ssh", "ls", "cd", "rm", "chmod", "cat",
    "pwd", "echo", "kill", "top", "man", "tar", "curl", "wget"
];

// Easter eggs - keep whole, persist longer - very rare (5%)
const EASTER_EGGS = [
    "btw", "arch", "neovim", "hyprland", "i3wm", "btw i use arch", "nvim", "tmux",
    "uwu", "owo", "based", "cringe"
];

const COLORS = ["#00f3ff", "#ff003c", "#0aff00", "#ffffff"];

// Word chunking state
let currentWord = "";
let currentChunkIndex = 0;
let wordChunks: string[] = [];

const getNextChunk = (): { text: string; isEasterEgg: boolean; isWord: boolean } => {
    // If we have remaining chunks from current word, return next chunk
    if (currentChunkIndex < wordChunks.length) {
        const chunk = wordChunks[currentChunkIndex];
        currentChunkIndex++;
        return { text: chunk, isEasterEgg: false, isWord: true };
    }

    const rand = Math.random();

    // 85% special characters, 10% words, 5% Easter eggs
    if (rand < 0.85) {
        const char = SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)];
        return { text: char, isEasterEgg: false, isWord: false };
    } else if (rand < 0.95) {
        // Pick a regular word and chunk it
        currentWord = REGULAR_WORDS[Math.floor(Math.random() * REGULAR_WORDS.length)];
        wordChunks = [];

        // Split into 3-character chunks
        for (let i = 0; i < currentWord.length; i += 3) {
            wordChunks.push(currentWord.substring(i, i + 3));
        }

        currentChunkIndex = 1;
        return { text: wordChunks[0], isEasterEgg: false, isWord: true };
    } else {
        // Easter egg
        const egg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
        return { text: egg, isEasterEgg: true, isWord: true };
    }
};


export const CursorLogicTrail = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
    const lastSpawnRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.lastX = mouseRef.current.x;
            mouseRef.current.lastY = mouseRef.current.y;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;

            const now = Date.now();
            // Spawn rate based on speed - faster movement = more particles
            const dx = e.clientX - mouseRef.current.x;
            const dy = e.clientY - mouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            const spawnInterval = speed > 10 ? 3 : speed > 5 ? 5 : 8;

            if (now - lastSpawnRef.current > spawnInterval) {
                // Spawn 2-3 particles at once for denser trail
                const particleCount = speed > 15 ? 3 : speed > 8 ? 2 : 1;
                for (let i = 0; i < particleCount; i++) {
                    spawnParticle();
                }
                lastSpawnRef.current = now;
            }
        };

        const spawnParticle = () => {
            const { x, y, lastX, lastY } = mouseRef.current;

            // Calculate momentum direction
            const dx = x - lastX;
            const dy = y - lastY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Only spawn if moving
            if (speed < 0.5) return; // Even lower threshold for constant trail

            // Get next chunk/word
            const { text, isEasterEgg, isWord } = getNextChunk();

            const particle: Particle = {
                x,
                y,
                // Drift opposite to movement + some randomness
                vx: -dx * 0.15 + (Math.random() - 0.5) * 3,
                vy: -dx * 0.15 + (Math.random() - 0.5) * 3 - 1, // stronger upward drift
                char: text,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rotation: Math.random() * Math.PI * 2,
                // Words rotate slower, special chars spin faster
                rotationSpeed: isWord
                    ? (Math.random() - 0.5) * 0.03  // Slow rotation for words
                    : (Math.random() - 0.5) * 0.15, // Fast rotation for symbols
                life: 0,
                // Easter eggs persist 3x longer
                maxLife: isEasterEgg
                    ? 3000 + Math.random() * 1000  // 3-4s for Easter eggs
                    : 1200 + Math.random() * 600,  // 1.2-1.8s for regular
                size: 16 + Math.random() * 6, // Even bigger text (16-22px)
            };

            particlesRef.current.push(particle);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        let animationId: number;
        let lastTime = 0;

        const animate = (time: number) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((p) => {
                p.life += deltaTime;
                if (p.life >= p.maxLife) return false;

                // Update position
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;

                // Damping
                p.vx *= 0.98;
                p.vy *= 0.98;

                // Calculate opacity (fade out)
                const progress = p.life / p.maxLife;
                const opacity = 1 - progress;

                // Draw
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.font = `${p.size}px "JetBrains Mono", "Fira Code", monospace`;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = opacity; // Full opacity for maximum visibility
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(p.char, 0, 0);
                ctx.restore();

                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ mixBlendMode: "screen" }}
        />
    );
};
