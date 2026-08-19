import { useEffect, useRef, useState } from "react";

/** Reproduces the [data-timeline] scroll-linked progress computation from the source `wire()`. */
export function useTimelineProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const upd = () => {
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight * 0.5;
      const next = Math.max(0, Math.min(1, (window.innerHeight * 0.85 - r.top) / span));
      setP(next);
    };
    const onScroll = () => {
      raf = requestAnimationFrame(upd);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", upd);
    upd();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", upd);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, p };
}
