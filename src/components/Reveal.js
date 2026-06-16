"use client";

import { motion } from "framer-motion";

/**
 * Reveal — a reusable scroll-triggered "fade up" wrapper.
 * Elements gently rise and fade in once they enter the viewport.
 * Wraps any children and keeps the animation language consistent
 * across every section of the site.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.9,
  amount = 0.25,
  className = "",
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
