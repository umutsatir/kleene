import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "kleene-theme";

function readInitialTheme(): Theme {
  try {
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "dark";
  } catch {
    return "dark";
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore write failures (private mode, etc.)
      }
      return next;
    });
  };

  return { theme, toggleTheme };
}
