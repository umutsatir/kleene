import type { RevealMotion } from "../config";
import { showTicker } from "../config";
import type { PageId } from "../data/types";
import { Capabilities } from "./Capabilities";
import { Hero } from "./Hero";
import { Principles } from "./Principles";
import { SelectedWork } from "./SelectedWork";
import { Ticker } from "./Ticker";
import { Timeline } from "./Timeline";

interface HomePageProps {
  tab: number;
  onSelectTab: (i: number) => void;
  workHover: number;
  onWorkHover: (i: number) => void;
  onNavigate: (page: PageId) => void;
  motion: RevealMotion;
}

export function HomePage({ tab, onSelectTab, workHover, onWorkHover, onNavigate, motion }: HomePageProps) {
  const goWork = () => onNavigate("work");
  const goBrief = () => onNavigate("brief");

  return (
    <div>
      <Hero onBrief={goBrief} onWork={goWork} motion={motion} />
      {showTicker && <Ticker />}
      <Capabilities tab={tab} onSelectTab={onSelectTab} onWork={goWork} motion={motion} />
      <SelectedWork hover={workHover} onHover={onWorkHover} onWork={goWork} motion={motion} />
      <Timeline motion={motion} />
      <Principles motion={motion} />
    </div>
  );
}
