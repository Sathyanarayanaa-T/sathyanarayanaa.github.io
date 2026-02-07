import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: "#0a0a0a",
                offwhite: "#ededed",
                "neon-purple": "#b000ff",
                "neon-blue": "#001eff",
                "neon-pink": "#ff0080",
            },
            fontFamily: {
                syne: ["var(--font-syne)", "sans-serif"],
                manrope: ["var(--font-manrope)", "sans-serif"],
            },
            borderRadius: {
                "4xl": "2.5rem",
                "5xl": "3rem",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "kinetic-gradient":
                    "linear-gradient(to bottom right, #b000ff, #001eff, #ff0080)",
            },
        },
    },
    plugins: [],
};
export default config;
