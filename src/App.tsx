import { useCallback, useEffect, useState } from "react";
import { revealMotion } from "./config";
import type { PageId, ProjectFilter } from "./data/types";
import { useTheme } from "./hooks/useTheme";
import { BriefPage } from "./components/BriefPage";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { NavBar } from "./components/NavBar";
import { ProgressBar } from "./components/ProgressBar";
import { WorkPage } from "./components/WorkPage";

function pathForPage(page: PageId): string {
  return page === "home" ? "/" : `/${page}`;
}

function pageFromPath(): PageId {
  const p = window.location.pathname.replace(/\/+$/, "");
  return p === "/work" ? "work" : p === "/brief" ? "brief" : "home";
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromPath);
  const { theme, toggleTheme } = useTheme();

  const [tab, setTab] = useState(0);
  const [homeWorkHover, setHomeWorkHover] = useState(0);

  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [workPageHover, setWorkPageHover] = useState(0);

  const navigate = useCallback((next: PageId) => {
    setPage(next);
    const path = pathForPage(next);
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleFilter = (f: ProjectFilter) => {
    setFilter(f);
    setWorkPageHover(0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative", overflowX: "hidden" }}>
      <ProgressBar />
      <NavBar page={page} theme={theme} onNavigate={navigate} onToggleTheme={toggleTheme} />

      {page === "home" && (
        <HomePage
          tab={tab}
          onSelectTab={setTab}
          workHover={homeWorkHover}
          onWorkHover={setHomeWorkHover}
          onNavigate={navigate}
          motion={revealMotion}
        />
      )}

      {page === "work" && (
        <WorkPage
          filter={filter}
          onFilter={handleFilter}
          hover={workPageHover}
          onHover={setWorkPageHover}
          onBrief={() => navigate("brief")}
          motion={revealMotion}
        />
      )}

      {page === "brief" && <BriefPage motion={revealMotion} />}

      <Footer onNavigate={navigate} />
    </div>
  );
}
