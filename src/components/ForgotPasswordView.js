"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell, Field, SubmitButton } from "@/components/auth/AuthUI";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <AuthShell
      title="Reset Your Password"
      subtitle="Enter your email and we will send you a reset link when this feature is available"
    >
      {sent ? (
        <p className="rounded-sm border border-stone bg-ivory/60 px-5 py-4 text-center font-sans text-sm leading-relaxed text-charcoal/70">
          If an account exists with this email, you will hear from us soon.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <SubmitButton>Send Reset Link</SubmitButton>
        </form>
      )}

      <p className="mt-7 text-center font-sans text-sm text-charcoal/60">
        <Link href="/login" className="text-charcoal underline-offset-2 hover:underline">
          Back to Sign In
        </Link>
      </p>
    </AuthShell>
  );
}
