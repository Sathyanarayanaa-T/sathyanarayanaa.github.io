"use client";

import { useEffect, useRef } from "react";

const CODE_LINES = [
    "const App = () => {",
    "  const [state, setState] = useState(null);",
    "  useEffect(() => {",
    "    fetchData().then(setData);",
    "  }, []);",
    "  return <Component {...props} />;",
    "};",
    "",
    "export async function loader() {",
    "  const res = await fetch(API_URL);",
    "  return res.json();",
    "}",
    "",
    "interface Props {",
    "  data: DataType[];",
    "  onSubmit: (e: Event) => void;",
    "}",
    "",
    "model.fit(X_train, y_train)",
    "predictions = model.predict(X_test)",
    "accuracy = accuracy_score(y_test, predictions)",
    "",
    "const neuralNet = tf.sequential({",
    "  layers: [",
    "    tf.layers.dense({ units: 128 }),",
    "    tf.layers.dropout({ rate: 0.2 }),",
    "  ]",
    "});",
    "",
    "git commit -m 'feat: add new feature'",
    "docker build -t app:latest .",
    "kubectl apply -f deployment.yaml",
    "",
    "SELECT * FROM users",
    "WHERE created_at > NOW() - INTERVAL '7 days'",
    "ORDER BY score DESC LIMIT 10;",
    "",
    "fn main() {",
    "  let result = compute().await?;",
    "  println!('{:?}', result);",
    "}",
    "npm install @types/react",
    "const slice = createSlice({ name: 'user', initialState })",
    "while (true) { process.nextTick(loop); }",
];

const COLORS = [
    "#00f3ff", // Neon Cyan
    "#bd00ff", // Neon Purple
    "#00ff94", // Neon Green
    "#ff0055", // Neon Red/Pink
    "#ffff00", // Neon Yellow
];

export const CodeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create multiple rows of scrolling code
        const rows = 15;
        const rowHeight = 100 / rows;

        for (let i = 0; i < rows; i++) {
            const row = document.createElement("div");
            row.className = "code-row";

            // Random parameters for variety
            const direction = i % 2 === 0 ? 1 : -1; // Alternate direction
            const duration = 60 + Math.random() * 60; // Much slower speed (60-120s)
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];

            row.style.cssText = `
        position: absolute;
        top: ${i * rowHeight}%;
        height: ${rowHeight}%;
        left: 0;
        right: 0;
        font-family: "JetBrains Mono", monospace;
        font-size: 14px;
        line-height: ${window.innerHeight / rows}px; 
        color: ${color};
        white-space: nowrap;
        overflow: hidden;
        pointer-events: none;
        opacity: 0.15;
        display: flex;
        align-items: center;
      `;

            // Shuffle and repeat lines to ensure it covers width + scrolling
            const shuffled = [...CODE_LINES].sort(() => Math.random() - 0.5);
            // Repeat enough times to ensure smooth scrolling loop
            const content = Array(10).fill(shuffled).flat().join("  //  ");

            const span = document.createElement("span");
            span.textContent = content;
            span.style.cssText = `
                display: inline-block;
                padding-left: 100%;
                animation: scrollCode${direction > 0 ? 'Right' : 'Left'} ${duration}s linear infinite;
            `;

            row.appendChild(span);
            container.appendChild(row);
        }

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return (
        <>
            <style jsx global>{`
        @keyframes scrollCodeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollCodeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
            <div
                ref={containerRef}
                className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black/5"
            />
        </>
    );
};
