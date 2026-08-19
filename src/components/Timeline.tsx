import type { RevealMotion } from "../config";
import { steps } from "../data/process";
import { Reveal } from "../hooks/Reveal";
import { useTimelineProgress } from "../hooks/useTimelineProgress";
import s from "./Timeline.module.css";

interface TimelineProps {
  motion: RevealMotion;
}

export function Timeline({ motion }: TimelineProps) {
  const { ref, p } = useTimelineProgress<HTMLDivElement>();

  return (
    <div ref={ref} className={s.section}>
      <div className={s.inner}>
        <Reveal motion={motion} className={s.header}>
          <div>
            <div className={s.kicker}>03 / HOW WE WORK</div>
            <div className={s.title}>Four weeks from brief to something running</div>
          </div>
          <div className={s.statBox}>
            <div className={s.statCell}>
              <div className={`${s.statValue} ${s.statValueAccent}`}>{Math.round(p * 100)}%</div>
              <div className={s.statLabel}>ENGAGEMENT ELAPSED</div>
            </div>
            <div className={s.statCell}>
              <div className={s.statValue}>Fixed</div>
              <div className={s.statLabel}>SCOPE &amp; FEE PER PHASE</div>
            </div>
          </div>
        </Reveal>

        <div className={s.scrollWrap}>
          <div className={s.minWidth}>
            <Reveal motion={motion} className={s.axis}>
              <div className={s.axisLine} />
              <div className={s.axisFill} style={{ width: (p * 100).toFixed(1) + "%" }} />
              <div className={s.axisGrid}>
                {steps.map((st, i) => {
                  const on = p >= (i + 0.25) / steps.length;
                  return (
                    <div key={st.n} className={s.axisCol}>
                      <div className={`${s.axisDot} ${on ? s.axisDotOn : ""}`} />
                      <div className={s.axisWeek}>{st.week}</div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <div className={s.cardsGrid}>
              {steps.map((st, i) => {
                const on = p >= (i + 0.25) / steps.length;
                return (
                  <Reveal key={st.n} motion={motion} className={s.card}>
                    <div className={`${s.ghost} ${on ? s.ghostOn : ""}`}>{st.n}</div>
                    <div className={s.cardTop}>
                      <div className={s.cardTopRow}>
                        <span>{st.week}</span>
                        <span>{st.days}</span>
                      </div>
                      <div className={s.cardTitle}>{st.title}</div>
                      <div className={s.cardBody}>{st.body}</div>
                    </div>
                    <div className={s.checks}>
                      {st.checks.map((c) => (
                        <div key={c} className={s.check}>
                          <span className={`${s.checkTick} ${on ? s.checkTickOn : ""}`}>✓</span>
                          <span>{c}</span>
                        </div>
                      ))}
                      <div className={s.deliverable}>
                        <span className={s.deliverableLabel}>DELIVERABLE</span>
                        <span className={s.deliverableValue}>{st.out}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
