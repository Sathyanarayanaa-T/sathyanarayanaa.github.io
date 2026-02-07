export interface Project {
    id: string;
    title: string;
    tags: string[];
    feature: string;
    description: string;
    gradient: string;
}

export const PROJECTS: Project[] = [
    {
        id: 'qivora',
        title: 'Qivora',
        tags: ['Fintech AI', 'React Dashboards', 'Data Visualization'],
        feature: 'AI-driven financial analytics',
        description: 'Intelligent financial analytics platform with real-time data processing and AI-powered insights for smarter decision making.',
        gradient: 'from-indigo-500 to-purple-600',
    },
    {
        id: 'deshran',
        title: 'Deshran',
        tags: ['Edge AI', 'PWA', 'Offline-First'],
        feature: 'Offline-first athletic training with local ML inference',
        description: 'Edge AI-powered athletic training application. Optimized for offline usage, low-cost devices, and minimal compute availability.',
        gradient: 'from-purple-500 to-pink-600',
    },
    {
        id: 'she-power-chain',
        title: 'She Power Chain',
        tags: ['System Architecture', 'Backend Systems', 'Data Integrity'],
        feature: 'Secure backend systems & data integrity',
        description: 'Robust backend systems supporting structured data validation, rule enforcement, and transparent record handling with a focus on scalability.',
        gradient: 'from-cyan-500 to-blue-600',
    },
    {
        id: 'uld-optimizer',
        title: 'ULD Optimizer',
        tags: ['Spatial UI', 'Computer Graphics', 'Python + React'],
        feature: '3D cargo space visualization',
        description: 'Web-based visualization and control interface for cargo space optimization. Designed to represent spatial layouts and complex AI-generated outputs intuitively.',
        gradient: 'from-teal-500 to-emerald-600',
    },
];

export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'tools' | 'ai';
}

export const SKILLS: Skill[] = [
    // Frontend
    { name: 'React', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'Framer Motion', category: 'frontend' },

    // Backend
    { name: 'Python', category: 'backend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'REST APIs', category: 'backend' },

    // Tools & OS
    { name: 'Arch Linux', category: 'tools' },
    { name: 'CachyOS', category: 'tools' },
    { name: 'Hyprland', category: 'tools' },
    { name: 'Git', category: 'tools' },

    // AI
    { name: 'TensorFlow', category: 'ai' },
    { name: 'PyTorch', category: 'ai' },
    { name: 'Computer Vision', category: 'ai' },
];

export const BIO = `21-year-old developer bridging UI and AI. Arch Linux enthusiast. Future CG Researcher.`;

export const PERSONAL_INFO = {
    name: 'Sathyanarayanaa T.',
    title: 'Frontend & AI Engineer',
    location: 'India',
    email: 'contact@sathyanarayanaa.dev',
    github: 'https://github.com/sathyanarayanaa',
    linkedin: 'https://linkedin.com/in/sathyanarayanaa',
};
