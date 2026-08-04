"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

/** `useLayoutEffect` on the client, `useEffect` during SSR to avoid hydration warnings. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapFloating(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? -12 : 12,
        duration: 2.5 + index * 0.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    return () => {
      gsap.killTweensOf(selector);
    };
  }, [selector]);
}

export function useGsapReveal(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: undefined // Minimal fallback without complex scrolltrigger
        }
      );
    });
  }, [selector]);
}
