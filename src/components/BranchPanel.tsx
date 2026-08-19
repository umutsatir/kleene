import { useLayoutEffect, useRef } from "react";
import type { BranchDef } from "../data/types";
import { BranchField } from "./BranchField";
import s from "./Capabilities.module.css";

interface BranchPanelProps {
  def: BranchDef;
  active: boolean;
  onSelect: () => void;
  onWork: () => void;
}

export function BranchPanel({ def, active, onSelect, onWork }: BranchPanelProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  // Mirrors the source sync(): switching on sets display:grid then fades opacity in on the
  // next frame; switching off drops opacity and display:none in the same tick (no fade-out).
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (active) {
      body.style.display = "grid";
      body.style.pointerEvents = "auto";
      requestAnimationFrame(() => {
        body.style.opacity = "1";
      });
    } else {
      body.style.opacity = "0";
      body.style.pointerEvents = "none";
      body.style.display = "none";
    }
  }, [active]);

  return (
    <div
      className={`${s.panel} ${active ? s.panelActive : ""}`}
      style={{ flexGrow: active ? 5.2 : 0.55 }}
      onClick={onSelect}
      onMouseEnter={onSelect}
    >
      <div className={s.spine} style={{ opacity: active ? 0 : 1 }}>
        <div className={s.spineNum}>{def.index}</div>
        <div className={s.spineName}>{def.name}</div>
        <div className={s.spineStar}>*</div>
      </div>

      <div ref={bodyRef} className={s.body}>
        <BranchField />
        <div className={s.bodyHead}>
          <div className={s.bodyHeadRow}>
            <span className={s.bodyHeadBadge}>
              {def.index} / {def.badge}
            </span>
            <span>{def.load}</span>
          </div>
          <div className={s.bodyTitle}>{def.title}</div>
          <div className={s.bodyText}>{def.body}</div>
        </div>

        <div className={s.bodyMid}>
          <div className={s.deliverables}>
            {def.deliverables.map((d) => (
              <div key={d.name} className={s.deliverable}>
                <span>{d.name}</span>
                <span className={s.deliverableNote}>{d.note}</span>
              </div>
            ))}
          </div>
          <div className={s.terminal}>
            <div className={s.terminalHead}>
              <span>{def.fileName}</span>
              <span className={s.terminalDot}>●</span>
            </div>
            <div className={s.terminalBody}>
              {def.lines.map((l) => (
                <div key={l.n} className={s.terminalLine}>
                  <span className={s.terminalLineNum}>{l.n}</span>
                  <span>{l.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.bodyFoot}>
          <div className={s.chips}>
            {def.chips.map((c) => (
              <div key={c} className={s.chip}>
                {c}
              </div>
            ))}
          </div>
          <button type="button" className={s.seeWork} onClick={onWork}>
            SEE THE WORK →
          </button>
        </div>
      </div>
    </div>
  );
}
