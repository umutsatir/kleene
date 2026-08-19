import { useEffect, useRef, type RefObject } from "react";

const COLS = 22;
const ROWS = 12;

interface HeroFieldProps {
  heroRef: RefObject<HTMLDivElement | null>;
}

/** Reproduces the [data-herofield] ascii star field from the source `wire()`. */
export function HeroField({ heroRef }: HeroFieldProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    const cells = cellsRef.current;
    if (!hero) return;

    let t = 0;
    let mx = -9999;
    let my = -9999;
    let pending = false;

    const paint = () => {
      pending = false;
      cells.forEach((d, i) => {
        if (!d) return;
        const x = i % COLS;
        const y = Math.floor(i / COLS);
        const wave = (Math.sin(x * 0.42 + t) + Math.cos(y * 0.5 - t * 0.75) + 2) / 4;
        let k = wave * 0.6;
        let cursor = 0;
        if (mx > -9000) {
          const r = d.getBoundingClientRect();
          const dx = r.left + r.width / 2 - mx;
          const dy = r.top + r.height / 2 - my;
          cursor = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 260);
          k = Math.min(1, wave * 0.5 + cursor * 1.1);
        }
        d.style.color =
          cursor > 0.6
            ? "var(--accent)"
            : cursor > 0.3
              ? "var(--star-glow)"
              : k > 0.82
                ? "var(--star-warm)"
                : k > 0.55
                  ? "var(--star-mid)"
                  : "var(--star-base)";
        d.style.transform = `scale(${0.72 + k * 1.05}) rotate(${cursor * 135}deg)`;
      });
    };

    const step = () => {
      t += 0.07;
      paint();
    };
    step();
    const id = setInterval(step, 420);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!pending) {
        pending = true;
        requestAnimationFrame(paint);
      }
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      requestAnimationFrame(paint);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      clearInterval(id);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, [heroRef]);

  return (
    <div
      ref={fieldRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "grid",
        gridTemplateColumns: `repeat(${COLS},1fr)`,
        gridTemplateRows: `repeat(${ROWS},1fr)`,
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
            fontSize: 24,
            color: "var(--star-base)",
            transition: "color 360ms linear,transform 460ms cubic-bezier(0.2,0,0,1)",
            willChange: "transform",
          }}
        >
          *
        </div>
      ))}
    </div>
  );
}
