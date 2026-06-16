"use client";

import { useEffect, useRef } from "react";

/**
 * FabricCanvas — a subtle, luxurious flowing-fabric animation.
 *
 * Renders a field of slowly drifting horizontal threads whose vertical
 * displacement is driven by layered sine waves, simulating the soft folds
 * of draped silk. A travelling highlight band suggests light catching the
 * cloth. Tuned to be calm and premium rather than flashy.
 */
export default function FabricCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const LINES = 46; // number of fabric threads
    const STEP = 8; // horizontal sampling resolution (px)

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.00016;
      // Travelling sheen position (0..1 across the canvas height)
      const sheen = (Math.sin(time * 0.0002) * 0.5 + 0.5) * height;

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1); // 0..1 top→bottom
        const yBase = p * height * 1.08 - height * 0.04;

        // Amplitude grows toward the centre to fake gathered folds
        const fold = Math.sin(p * Math.PI); // 0 at edges, 1 mid
        const amp = 16 + fold * 46;

        ctx.beginPath();
        for (let x = -STEP; x <= width + STEP; x += STEP) {
          const wave =
            Math.sin(x * 0.0021 + t * 6 + p * 8) * amp +
            Math.sin(x * 0.0011 - t * 4.4 + p * 4) * (amp * 0.5) +
            Math.sin(x * 0.0039 + t * 9 + i) * (amp * 0.18);
          const y = yBase + wave;
          if (x === -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Light catching the fold — brighter near the travelling sheen band
        const dist = Math.abs(yBase - sheen) / height;
        const glow = Math.max(0, 1 - dist * 2.6);
        const baseAlpha = 0.04 + fold * 0.05;
        const alpha = baseAlpha + glow * 0.16;

        ctx.strokeStyle = `rgba(245, 242, 238, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1 + glow * 0.6;
        ctx.stroke();
      }
    };

    let raf;
    const loop = (time) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) {
      // Render a single calm frame, no animation
      draw(4200);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
