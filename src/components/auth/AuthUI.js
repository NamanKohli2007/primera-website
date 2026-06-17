"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Muted, on-brand error red (not harsh).
export const ERROR = "#b06a5e";

const inputBase =
  "w-full rounded-sm border bg-cream px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/35 transition-colors focus:outline-none";

/** Full-screen dark auth page with a centered warm-white card. */
export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[480px] rounded-sm bg-cream px-7 py-10 shadow-2xl sm:px-10 sm:py-12"
      >
        <div className="flex justify-center">
          <Image
            src="/Primera-bgremoved.png"
            alt="PRIMERA"
            width={60}
            height={60}
            priority
            className="h-[60px] w-[60px]"
          />
        </div>
        <h1 className="mt-6 text-center font-serif text-3xl font-light text-ink md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-sm text-center font-sans text-sm font-light leading-relaxed text-charcoal/60">
            {subtitle}
          </p>
        )}
        <div className="mt-8">{children}</div>
      </motion.div>
    </main>
  );
}

export function Field({ label, error, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
        {label}
      </span>
      <input
        {...props}
        className={`${inputBase} ${
          error ? "border-[#b06a5e]" : "border-stone focus:border-charcoal"
        }`}
      />
      {error && (
        <span className="mt-1.5 block font-sans text-[12px] text-[#b06a5e]">
          {error}
        </span>
      )}
    </label>
  );
}

export function PasswordField({ label, error, labelRight, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
          {label}
        </span>
        {labelRight}
      </span>
      <span className="relative block">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`${inputBase} pr-16 ${
            error ? "border-[#b06a5e]" : "border-stone focus:border-charcoal"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[11px] uppercase tracking-wide2 text-charcoal/50 transition-colors hover:text-charcoal"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </span>
      {error && (
        <span className="mt-1.5 block font-sans text-[12px] text-[#b06a5e]">
          {error}
        </span>
      )}
    </label>
  );
}

export function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-stone" />
      <span className="font-sans text-[11px] uppercase tracking-wide2 text-charcoal/40">
        or
      </span>
      <span className="h-px flex-1 bg-stone" />
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.94H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.06l3.01-2.34Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

export function GoogleButton({ children = "Continue with Google" }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-sm border border-stone bg-cream px-6 py-3.5 font-sans text-sm text-charcoal transition-colors hover:border-charcoal"
    >
      <GoogleG />
      {children}
    </button>
  );
}

/** Full-width dark submit button used across the auth forms. */
export function SubmitButton({ children, ...props }) {
  return (
    <button
      type="submit"
      {...props}
      className="w-full rounded-sm bg-ink px-6 py-3.5 font-sans text-[13px] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-charcoal"
    >
      {children}
    </button>
  );
}
