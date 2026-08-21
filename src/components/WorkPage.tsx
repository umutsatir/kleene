import { useEffect, useMemo, useRef } from "react";
import type { RevealMotion } from "../config";
import { allProjects } from "../data/work";
import type { ProjectFilter } from "../data/types";
import { projectFilters } from "../data/site";
import { Reveal } from "../hooks/Reveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { BrandLockup } from "./BrandLockup";
import s from "./WorkPage.module.css";

interface WorkPageProps {
  filter: ProjectFilter;
  onFilter: (f: ProjectFilter) => void;
  hover: number;
  onHover: (i: number) => void;
  onBrief: () => void;
  motion: RevealMotion;
}

export function WorkPage({ filter, onFilter, hover, onHover, onBrief, motion }: WorkPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>();

  const projects = useMemo(
    () => allProjects.filter((p) => filter === "All" || p.filter === filter),
    [filter],
  );
  const wh = Math.min(hover, Math.max(0, projects.length - 1));
  const preview = projects[wh] || projects[0];

  // Reproduces the cursor-following [data-work-card] preview from the source `wire()`.
  useEffect(() => {
    const wp = pageRef.current;
    const card = cardRef.current;
    if (!wp || !card) return;

    let pending = false;
    let x = 0;
    let y = 0;
    const apply = () => {
      pending = false;
      const w = card.offsetWidth || 330;
      const h = card.offsetHeight || 380;
      const left = Math.min(Math.max(16, x + 26), window.innerWidth - w - 16);
      const top = Math.min(Math.max(16, y - h / 2), window.innerHeight - h - 16);
      card.style.transform = `translate(${left}px,${top}px)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const overRow = (e.target as HTMLElement).closest?.("[data-work-item]");
      card.style.opacity = overRow ? "1" : "0";
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };
    const onLeave = () => {
      card.style.opacity = "0";
    };

    wp.addEventListener("mousemove", onMove);
    wp.addEventListener("mouseleave", onLeave);
    return () => {
      wp.removeEventListener("mousemove", onMove);
      wp.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={pageRef} className={s.page}>
      <div className={s.inner}>
        <Reveal motion={motion} className={s.masthead}>
          <div className={s.mastheadLeft}>
            <div className={s.kicker}>ARCHIVE / 2021 TO 2026</div>
            <div className={s.title}>
              Everything
              <br />
              still running
            </div>
          </div>
          <div className={s.count}>
            <div className={s.countValue}>{String(projects.length).padStart(2, "0")}</div>
            <div className={s.countLabel}>SYSTEMS SHOWN</div>
          </div>
        </Reveal>

        <Reveal motion={motion} className={s.filterRow}>
          <div className={s.filters}>
            {projectFilters.map((label) => {
              const count = label === "All" ? allProjects.length : allProjects.filter((p) => p.filter === label).length;
              const active = filter === label;
              return (
                <button
                  key={label}
                  type="button"
                  className={`${s.filter} ${active ? s.filterActive : ""}`}
                  onClick={() => onFilter(label)}
                >
                  <span>{label}</span>
                  <span className={s.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className={s.hoverHint}>HOVER A ROW FOR DETAIL</div>
        </Reveal>

        <div className={s.list}>
          {projects.map((p, i) => {
            const on = i === wh;
            return (
              <div
                key={p.num}
                data-work-item="1"
                className={s.item}
                style={{ paddingLeft: on ? 20 : 4 }}
                onMouseEnter={() => {
                  if (hover !== i) onHover(i);
                }}
              >
                <div className={s.itemFill} style={{ width: on ? "100%" : 0 }} />
                <div className={s.itemLeft}>
                  <span className={s.itemNum}>{p.num}</span>
                  <span className={s.itemName} style={{ color: on ? "var(--text)" : "var(--muted3)" }}>
                    {p.brand ? (
                      <BrandLockup
                        name={p.name}
                        markColor={on ? "var(--text)" : "var(--muted3)"}
                        suffixColor={on ? "var(--muted3)" : "var(--dim2)"}
                      />
                    ) : (
                      <span>{p.name}</span>
                    )}
                  </span>
                  <span className={s.itemBranch} style={{ color: on ? "var(--accent-text)" : "var(--dim)" }}>
                    {p.branch}
                  </span>
                </div>
                <div className={s.itemRight}>
                  <span className={s.itemMetric} style={{ color: on ? "var(--text)" : "var(--faint)" }}>
                    {p.headline}
                  </span>
                  <span className={s.itemYear}>{p.year}</span>
                  <span className={s.itemStatus}>{p.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal motion={motion} className={s.footer}>
          <div className={s.footerNote}>
            Client names are withheld where the engagement is under NDA. Each row is a system we still get
            paged about, or would if it broke.
          </div>
          <button ref={ctaRef} type="button" className={s.footerCta} onClick={onBrief}>
            Add yours →
          </button>
        </Reveal>
      </div>

      <div ref={cardRef} className={s.cursorCard}>
        <div className={s.cursorCardHead}>
          <span>
            {preview.num} / {preview.branch}
          </span>
          <span className={s.cursorCardStatus}>{preview.status}</span>
        </div>
        <div className={s.cursorCardShot}>
          <span className={s.cursorCardShotLabel}>{preview.shot}</span>
        </div>
        <div className={s.cursorCardBody}>
          <div className={s.cursorCardDesc}>{preview.desc}</div>
          <div className={s.cursorCardMetrics}>
            {preview.metrics.map((m) => (
              <div key={m.k} className={s.cursorCardMetric}>
                <div className={s.cursorCardMetricValue}>{m.v}</div>
                <div className={s.cursorCardMetricKey}>{m.k}</div>
              </div>
            ))}
          </div>
          <div className={s.cursorCardStack}>
            {preview.stack.map((st) => (
              <div key={st} className={s.cursorCardChip}>
                {st}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
