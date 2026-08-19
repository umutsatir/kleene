import { useRef } from "react";
import type { RevealMotion } from "../config";
import { stats } from "../data/site";
import { Reveal } from "../hooks/Reveal";
import { useCountUp } from "../hooks/useCountUp";
import { useMagnetic } from "../hooks/useMagnetic";
import { HeroField } from "./HeroField";
import s from "./Hero.module.css";

function StatItem({ to, suffix, label, motion }: { to: number; suffix: string; label: string; motion: RevealMotion }) {
  const valueRef = useCountUp<HTMLDivElement>(to, suffix);
  return (
    <Reveal motion={motion} className={s.stat}>
      <div ref={valueRef} className={s.statValue}>
        0
      </div>
      <div className={s.statLabel}>{label}</div>
    </Reveal>
  );
}

interface HeroProps {
  onBrief: () => void;
  onWork: () => void;
  motion: RevealMotion;
}

export function Hero({ onBrief, onWork, motion }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useMagnetic<HTMLButtonElement>();
  const secondaryCtaRef = useMagnetic<HTMLButtonElement>();

  return (
    <div ref={heroRef} className={s.hero}>
      <HeroField heroRef={heroRef} />
      <div className={s.gridOverlay} />
      <div className={s.inner}>
        <Reveal motion={motion} className={s.chip}>
          <span className={s.chipDot} />
          ENGINEERING STUDIO — TAKING WORK FOR Q4 2026
        </Reveal>

        <Reveal as="h1" motion={motion} className={s.h1}>
          Software that holds under{" "}
          <span className={s.h1Accent}>
            load<span className={s.h1Star}>*</span>
          </span>
        </Reveal>

        <Reveal as="p" motion={motion} className={s.lede}>
          We are a small team of engineers shipping web and mobile products, developer tooling, and the
          distributed infrastructure underneath — blockchain systems among them, never instead of them.
        </Reveal>

        <Reveal motion={motion} className={s.ctaRow}>
          <button ref={primaryCtaRef} type="button" className={s.ctaPrimary} onClick={onBrief}>
            Send a brief →
          </button>
          <button ref={secondaryCtaRef} type="button" className={s.ctaSecondary} onClick={onWork}>
            See selected work
          </button>
        </Reveal>

        <div className={s.statsRow}>
          {stats.map((st) => (
            <StatItem key={st.label} to={st.to} suffix={st.suffix} label={st.label} motion={motion} />
          ))}
        </div>
      </div>
    </div>
  );
}
