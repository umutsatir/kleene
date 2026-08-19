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

function pageFromHash(): PageId {
  const h = window.location.hash.replace("#", "");
  return h === "work" || h === "brief" ? h : "home";
}

export default function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const { theme, toggleTheme } = useTheme();

  const [tab, setTab] = useState(0);
  const [homeWorkHover, setHomeWorkHover] = useState(0);

  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [workPageHover, setWorkPageHover] = useState(0);

  const navigate = useCallback((next: PageId) => {
    setPage(next);
    window.location.hash = next === "home" ? "" : next;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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
        />
      )}

      {page === "brief" && <BriefPage />}

      <Footer onNavigate={navigate} />
    </div>
  );
}
