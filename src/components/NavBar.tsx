import type { PageId } from "../data/types";
import { useMagnetic } from "../hooks/useMagnetic";
import s from "./NavBar.module.css";

const NAV_ITEMS: { label: string; page: PageId }[] = [
  { label: "Home", page: "home" },
  { label: "Work", page: "work" },
  { label: "Brief", page: "brief" },
];

interface NavBarProps {
  page: PageId;
  theme: "dark" | "light";
  onNavigate: (page: PageId) => void;
  onToggleTheme: () => void;
}

export function NavBar({ page, theme, onNavigate, onToggleTheme }: NavBarProps) {
  const ctaRef = useMagnetic<HTMLButtonElement>();

  return (
    <div className={s.wrap}>
      <div className={s.pill}>
        <button type="button" className={s.logo} onClick={() => onNavigate("home")}>
          Kleene<span className={s.logoStar}>*</span>
        </button>
        <div className={s.nav}>
          {NAV_ITEMS.map((n) => (
            <button
              key={n.page}
              type="button"
              className={`${s.navItem} ${page === n.page ? s.navItemActive : ""}`}
              onClick={() => onNavigate(n.page)}
            >
              {n.label}
            </button>
          ))}
        </div>
        <button type="button" className={s.themeToggle} title="Toggle theme" onClick={onToggleTheme}>
          <span className={s.themeStar}>*</span>
          <span>{theme === "light" ? "LIGHT" : "DARK"}</span>
        </button>
        <button
          ref={ctaRef}
          type="button"
          className={s.cta}
          onClick={() => onNavigate("brief")}
        >
          Start a project
        </button>
      </div>
    </div>
  );
}
