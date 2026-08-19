import { useEffect, useRef } from "react";

/** Reproduces the [data-progress] top scroll bar from the source `wire()`. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const upd = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      el.style.width = ((window.scrollY / max) * 100).toFixed(2) + "%";
    };
    const onScroll = () => {
      raf = requestAnimationFrame(upd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    upd();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
