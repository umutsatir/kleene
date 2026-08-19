import type { RevealMotion } from "../config";
import { branchDefs } from "../data/branches";
import { Reveal } from "../hooks/Reveal";
import { BranchPanel } from "./BranchPanel";
import s from "./Capabilities.module.css";

interface CapabilitiesProps {
  tab: number;
  onSelectTab: (i: number) => void;
  onWork: () => void;
  motion: RevealMotion;
}

export function Capabilities({ tab, onSelectTab, onWork, motion }: CapabilitiesProps) {
  const active = Math.min(tab, branchDefs.length - 1);

  return (
    <div className={s.section}>
      <div className={s.inner}>
        <Reveal motion={motion} className={s.header}>
          <div>
            <div className={s.kicker}>01 / CAPABILITIES</div>
            <div className={s.title}>Three branches, one engineering standard</div>
          </div>
          <div className={s.sub}>
            Pick a branch — the same review discipline, testing culture and handoff applies to all of them.
          </div>
        </Reveal>

        <div className={s.row}>
          {branchDefs.map((def, i) => (
            <BranchPanel
              key={def.index}
              def={def}
              active={i === active}
              onSelect={() => {
                if (tab !== i) onSelectTab(i);
              }}
              onWork={onWork}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
