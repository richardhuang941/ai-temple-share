import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function getInitialPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(reducedMotionQuery).matches;
}

export function useReducedMotion(): boolean {
  const [isReducedMotion, setIsReducedMotion] = useState(getInitialPreference);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const handleChange = (event: MediaQueryListEvent): void => {
      setIsReducedMotion(event.matches);
    };

    setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isReducedMotion;
}
