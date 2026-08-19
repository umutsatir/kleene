import { useEffect, useRef } from "react";

/** Reproduces the [data-magnetic] mousemove/mouseleave behavior from the source `wire()`. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate(${dx * 6}px,${dy * 4}px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 320ms cubic-bezier(0.2,0,0,1), background 140ms linear";
      el.style.transform = "none";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
