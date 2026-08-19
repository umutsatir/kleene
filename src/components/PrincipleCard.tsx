import { useEffect, useRef } from "react";
import type { RevealMotion } from "../config";
import type { Principle } from "../data/types";
import { Reveal } from "../hooks/Reveal";
import s from "./Principles.module.css";

const BAR_COUNT = 6;

interface PrincipleCardProps {
  p: Principle;
  motion: RevealMotion;
}

export function PrincipleCard({ p, motion }: PrincipleCardProps) {
  const barsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const bars = barsRef.current;
    let t = Math.random() * 5;
    const step = () => {
      t += 0.5;
      bars.forEach((b, i) => {
        if (!b) return;
        const k = (Math.sin(t + i * 0.9) + 1) / 2;
        b.style.height = (3 + k * 9).toFixed(1) + "px";
        b.style.background = k > 0.78 ? "var(--accent)" : "var(--star-mid)";
      });
    };
    step();
    const id = setInterval(step, 620);
    return () => clearInterval(id);
  }, []);

  return (
    <Reveal motion={motion} className={s.card}>
      <div className={s.ghost}>{p.index}</div>
      <div className={s.rule} />

      <div className={s.top}>
        <div className={s.topRow}>
          <span>
            {p.index} / {p.short}
          </span>
          <span className={s.bars}>
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <span
                key={i}
                ref={(el) => {
                  barsRef.current[i] = el;
                }}
                className={s.bar}
              />
            ))}
          </span>
        </div>
        <div className={s.cardTitle}>{p.title}</div>
        <div className={s.cardBody}>{p.body}</div>
      </div>

      <div className={s.test}>
        <div className={s.testHead}>
          <span>{p.test}</span>
          <span className={s.stamp}>PASS</span>
        </div>
        <div className={s.assert}>{p.assert}</div>
      </div>
    </Reveal>
  );
}
