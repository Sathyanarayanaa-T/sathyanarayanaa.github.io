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
];

export const CodeBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Create multiple columns of scrolling code
        const columns = 8;
        const columnWidth = 100 / columns;

        for (let i = 0; i < columns; i++) {
            const column = document.createElement("div");
            column.className = "code-column";
            column.style.cssText = `
        position: absolute;
        left: ${i * columnWidth}%;
        width: ${columnWidth}%;
        top: 0;
        font-family: "JetBrains Mono", monospace;
        font-size: 10px;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.03);
        white-space: pre;
        overflow: hidden;
        pointer-events: none;
        animation: scrollCode ${20 + i * 5}s linear infinite;
        animation-delay: ${-i * 3}s;
      `;

            // Shuffle and repeat lines
            const shuffled = [...CODE_LINES].sort(() => Math.random() - 0.5);
            const repeated = [...shuffled, ...shuffled, ...shuffled];
            column.textContent = repeated.join("\n");

            container.appendChild(column);
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
        @keyframes scrollCode {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
      `}</style>
            <div
                ref={containerRef}
                className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
                style={{ height: "300vh" }}
            />
        </>
    );
};
