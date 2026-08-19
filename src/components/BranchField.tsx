import { useEffect, useRef } from "react";

const COLS = 9;
const ROWS = 16;

/** Reproduces the [data-branchfield] ascii grid from the source `wire()`. */
export function BranchField() {
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cells = cellsRef.current;
    let t = Math.random() * 6;

    const step = () => {
      t += 0.07;
      cells.forEach((d, i) => {
        if (!d) return;
        const x = i % COLS;
        const y = Math.floor(i / COLS);
        const k = (Math.sin(x * 0.7 + t) + Math.cos(y * 0.38 - t * 0.7) + 2) / 4;
        d.style.color = k > 0.88 ? "var(--accent)" : k > 0.66 ? "var(--faint)" : "var(--star-base)";
        d.style.transform = `scale(${0.65 + k * 0.7})`;
      });
    };
    step();
    const id = setInterval(step, 460);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "44%",
        bottom: 0,
        width: "46%",
        pointerEvents: "none",
        opacity: 0.5,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS},1fr)`,
        gridAutoRows: "1fr",
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            cellsRef.current[i] = el;
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Geist Mono',monospace",
            fontSize: 10,
            color: "var(--ghost2)",
            transition: "color 500ms linear,transform 500ms cubic-bezier(0.2,0,0,1)",
          }}
        >
          *
        </div>
      ))}
    </div>
  );
}
