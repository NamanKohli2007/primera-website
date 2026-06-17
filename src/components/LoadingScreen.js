"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * LoadingScreen — a one-time intro overlay.
 *
 * On the first visit of a browser session it covers the page with a dark
 * panel and the PRIMERA mark, fades in, holds, then fades out to reveal the
 * homepage. Uses sessionStorage so it only appears once per visit (not on
 * every client navigation or re-render). Pure CSS transitions keep the
 * fade bullet-proof regardless of React Strict Mode.
 */
const SEEN_KEY = "primera_intro_seen";
const HOLD_MS = 1200; // visible time before fade-out begins
const FADE_MS = 700; // fade-out duration

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false); // is the overlay in the DOM
  const [visible, setVisible] = useState(false); // opacity 1 vs 0

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SEEN_KEY)) return; // already shown this visit

    setMounted(true);
    // Next frame: fade in
    const rafId = requestAnimationFrame(() => setVisible(true));
    // After the hold, fade out
    const t1 = setTimeout(() => setVisible(false), HOLD_MS);
    // Once faded out, remove from the DOM and record that we've shown it.
    // The flag is set here (not at the start) so the effect stays safely
    // re-runnable under React Strict Mode's double-invocation in dev.
    const t2 = setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem(SEEN_KEY, "1");
    }, HOLD_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity ease-luxe ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <Image
        src="/Primera-bgremoved.png"
        alt="PRIMERA"
        width={400}
        height={400}
        priority
        className={`h-[260px] w-[260px] transition-all duration-700 ease-luxe md:h-[380px] md:w-[380px] ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      />
    </div>
  );
}
