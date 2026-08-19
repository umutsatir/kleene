import { useEffect, useRef } from "react";

/** Reproduces the [data-count] cubic ease-out count-up from the source `wire()`. */
export function useCountUp<T extends HTMLElement>(to: number, suffix: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const dur = 1500;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, suffix]);

  return ref;
}
