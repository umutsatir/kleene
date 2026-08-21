import type { RevealMotion } from "../config";
import { principles } from "../data/process";
import { Reveal } from "../hooks/Reveal";
import { PrincipleCard } from "./PrincipleCard";
import s from "./Principles.module.css";

interface PrinciplesProps {
  motion: RevealMotion;
}

export function Principles({ motion }: PrinciplesProps) {
  return (
    <div className={s.section}>
      <div className={s.inner}>
        <Reveal motion={motion} className={s.header}>
          <div>
            <div className={s.kicker}>04 / PRINCIPLES</div>
            <div className={s.title}>Four rules we don&apos;t negotiate</div>
          </div>
          <div className={s.badge}>
            <span className={s.badgeDot} />
            ENFORCED IN CI, NOT IN A SLIDE
          </div>
        </Reveal>

        <div className={s.scrollWrap}>
          <div className={s.grid}>
            {principles.map((p) => (
              <PrincipleCard key={p.index} p={p} motion={motion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
