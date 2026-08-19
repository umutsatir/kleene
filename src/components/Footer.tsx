import type { FootLink, PageId } from "../data/types";
import { useMagnetic } from "../hooks/useMagnetic";
import s from "./Footer.module.css";

const FOOT_LINKS: FootLink[] = [
  { label: "Selected work", meta: "24 SYSTEMS", page: "work" },
  { label: "Engineering principles", meta: "4 RULES", page: "home" },
  { label: "Send a brief", meta: "2 SLOTS OPEN", page: "brief" },
  { label: "Engineering notes", meta: "MONTHLY", page: "home" },
];

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const ctaRef = useMagnetic<HTMLButtonElement>();

  return (
    <div className={s.section}>
      <div className={s.inner}>
        <div className={s.top}>
          <div>
            <div className={s.headline}>Start with the part that scares you.</div>
            <button ref={ctaRef} type="button" className={s.cta} onClick={() => onNavigate("brief")}>
              hello@kleene.dev <span className={s.ctaArrow}>→</span>
            </button>
          </div>
          <div className={s.links}>
            {FOOT_LINKS.map((f) => (
              <button key={f.label} type="button" className={s.link} onClick={() => onNavigate(f.page)}>
                <span>{f.label}</span>
                <span className={s.linkMeta}>{f.meta}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={s.bottom}>
          <div className={s.wordmark}>
            Kleene<span className={s.wordmarkStar}>*</span>
          </div>
          <div className={s.meta}>
            <div>NAMED FOR STEPHEN KLEENE</div>
            <div>Σ* = {"{ ε, a, aa, aaa, … }"}</div>
            <div>© 2026 KLEENE STUDIO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
