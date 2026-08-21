import { createElement, useEffect, useRef } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import type { RevealMotion } from "../config";

// Single shared IntersectionObserver, mirroring the source's one `this._io` instance for
// every [data-word] element on the page. Batches that enter together get the same
// staggered `min(i*60, 300)ms` transition delay the original computed per-callback.
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.transitionDelay = Math.min(i * 60, 300) + "ms";
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
        el.style.clipPath = "inset(0 0 0 0)";
        sharedObserver!.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return sharedObserver;
}

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  motion: RevealMotion;
  children: ReactNode;
}

/** Reproduces the [data-word] reveal-on-scroll behavior from the source `wire()`. */
export function Reveal({ as: Tag = "div", motion, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (motion === "Off") {
      el.style.opacity = "1";
      el.style.filter = "none";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = motion === "Mask wipe" ? "translateY(0)" : "translateY(18px)";
    el.style.clipPath = motion === "Mask wipe" ? "inset(0 0 100% 0)" : "none";
    el.style.filter = motion === "Blur rise" ? "blur(6px)" : "none";
    el.style.transition =
      "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1), filter 700ms linear, clip-path 800ms cubic-bezier(0.16,1,0.3,1)";

    const observer = getSharedObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [motion]);

  return createElement(Tag, { ref, ...rest }, children);
}
