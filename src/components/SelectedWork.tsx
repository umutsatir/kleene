import type { RevealMotion } from "../config";
import { featuredWork } from "../data/work";
import { Reveal } from "../hooks/Reveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { BrandLockup } from "./BrandLockup";
import s from "./SelectedWork.module.css";

interface SelectedWorkProps {
  hover: number;
  onHover: (i: number) => void;
  onWork: () => void;
  motion: RevealMotion;
}

export function SelectedWork({ hover, onHover, onWork, motion }: SelectedWorkProps) {
  const active = Math.min(hover, featuredWork.length - 1);
  const preview = featuredWork[active];
  const fullIndexRef = useMagnetic<HTMLButtonElement>();

  return (
    <div className={s.section}>
      <div className={s.inner}>
        <Reveal motion={motion} className={s.header}>
          <div>
            <div className={s.kicker}>02 / SELECTED WORK</div>
            <div className={s.title}>Twenty-four systems shipped. Four worth showing.</div>
          </div>
          <button ref={fullIndexRef} type="button" className={s.fullIndex} onClick={onWork}>
            Full index →
          </button>
        </Reveal>

        <div className={s.grid}>
          <div className={s.list}>
            {featuredWork.map((w, i) => {
              const on = i === active;
              return (
                <div
                  key={w.num}
                  className={s.row}
                  style={{ background: on ? "var(--fill-hover)" : "transparent", paddingLeft: on ? 18 : 4 }}
                  onClick={() => {
                    if (hover !== i) onHover(i);
                  }}
                  onMouseEnter={() => {
                    if (hover !== i) onHover(i);
                  }}
                >
                  <div className={s.rowHead}>
                    <div className={s.rowLeft}>
                      <span className={s.rowNum}>{w.num}</span>
                      <span
                        className={s.rowTitle}
                        style={{ color: on ? "var(--text)" : "var(--muted3)" }}
                      >
                        {w.brand ? (
                          <BrandLockup name={w.name} suffixColor="var(--muted3)" />
                        ) : (
                          <span>{w.name}</span>
                        )}
                      </span>
                    </div>
                    <span className={s.rowMeta}>{w.meta}</span>
                  </div>
                  <div className={s.rowTease} style={{ opacity: on ? 1 : 0.45 }}>
                    {w.desc}
                  </div>
                  <div className={s.rowBar} style={{ width: on ? "100%" : 0 }} />
                </div>
              );
            })}
          </div>

          <div className={s.preview}>
            <div className={s.previewHead}>
              <span>
                {preview.num} / {preview.branch}
              </span>
              <span className={s.previewStatus}>{preview.status}</span>
            </div>
            <div className={s.previewShot}>
              <span className={s.previewShotLabel}>{preview.shot}</span>
            </div>
            <div className={s.previewBody}>
              <div className={s.previewTitle}>
                {preview.brand ? <BrandLockup name={preview.name} suffixColor="var(--muted3)" /> : preview.name}
              </div>
              <div className={s.previewDesc}>{preview.long}</div>
              <div className={s.previewMetrics}>
                {preview.metrics.map((m) => (
                  <div key={m.k} className={s.metric}>
                    <div className={s.metricValue}>{m.v}</div>
                    <div className={s.metricKey}>{m.k}</div>
                  </div>
                ))}
              </div>
              <div className={s.previewStack}>
                {preview.stack.map((st) => (
                  <div key={st} className={s.stackChip}>
                    {st}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
