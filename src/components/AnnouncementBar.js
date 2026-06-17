"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Thin promotional bar pinned above the navigation on every page.
// Alternates between the two messages every few seconds.
const MESSAGES = [
  "End of Season Sale — 25% Off Sitewide",
  "Free Delivery on Orders Above ₹4999",
];
const INTERVAL = 3000;

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center overflow-hidden bg-ink px-4">
      {/* Keyed remount: each new message slides up and fades into place. */}
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 9 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="whitespace-nowrap font-sans text-[10.5px] uppercase tracking-[0.26em] text-cream/80 md:text-[11px]"
      >
        {MESSAGES[index]}
      </motion.p>
    </div>
  );
}
