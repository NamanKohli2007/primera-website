"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const SEEN_KEY = "primera_email_popup_seen";
const SCROLL_TRIGGER = 30; // % down the page

export default function EmailPopup() {
  const { user, hydrated } = useAuth();
  const [mounted, setMounted] = useState(false); // in the DOM
  const [shown, setShown] = useState(false); // drives the fade
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Trigger once the user scrolls 30% down — but not when logged in or already seen.
  useEffect(() => {
    if (!hydrated || user) return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* ignore */
    }

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (pct >= SCROLL_TRIGGER) {
        try {
          localStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* ignore */
        }
        setMounted(true);
        requestAnimationFrame(() => setShown(true));
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hydrated, user]);

  // Lock background scroll while open
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  const close = () => {
    setShown(false);
    setTimeout(() => setMounted(false), 320); // unmount after the fade-out
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(close, 2000); // close 2s after success
  };

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={close}
    >
      <motion.div
        className="relative w-full max-w-[480px] rounded-sm bg-cream px-7 py-10 shadow-2xl sm:px-10 sm:py-12"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{
          opacity: shown ? 1 : 0,
          y: shown ? 0 : 18,
          scale: shown ? 1 : 0.98,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Email sign-up"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl leading-none text-charcoal/45 transition-colors hover:text-charcoal"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/Primera-bgremoved.png"
            alt="PRIMERA"
            width={60}
            height={60}
            className="h-[60px] w-[60px]"
          />
        </div>

        {submitted ? (
          <p className="mt-7 text-center font-sans text-[15px] leading-relaxed text-charcoal/75">
            Your discount code has been sent to your email
          </p>
        ) : (
          <>
            <h2 className="mt-6 text-center font-serif text-3xl font-light leading-tight text-ink md:text-[2rem]">
              Get 10% Off Your First Order
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-center font-sans text-sm font-light leading-relaxed text-charcoal/60">
              Join Primera and receive an exclusive discount on your first
              purchase. No spam, ever.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-sm border border-stone bg-cream px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/35 transition-colors focus:border-charcoal focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-sm bg-ink px-6 py-3.5 font-sans text-[13px] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-charcoal"
              >
                Claim My 10% Off
              </button>
            </form>

            <p className="mt-4 text-center font-sans text-[11px] text-charcoal/40">
              By signing up you agree to our privacy policy
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
