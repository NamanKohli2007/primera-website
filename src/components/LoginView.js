"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  AuthShell,
  Field,
  PasswordField,
  OrDivider,
  GoogleButton,
  SubmitButton,
} from "@/components/auth/AuthUI";

export default function LoginView() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.password) next.password = "Password is required.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const res = login(form);
    if (!res.ok) {
      setErrors({ form: res.error });
      return;
    }
    router.push("/");
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Sign in to your Primera account">
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <Field
          label="Email address"
          type="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <PasswordField
          label="Password"
          value={form.password}
          onChange={set("password")}
          error={errors.password}
          autoComplete="current-password"
          labelRight={
            <Link
              href="/forgot-password"
              className="font-sans text-[11px] normal-case tracking-normal text-charcoal/55 underline-offset-2 hover:text-charcoal hover:underline"
            >
              Forgot your password?
            </Link>
          }
        />

        {errors.form && (
          <p className="font-sans text-[13px] text-[#b06a5e]">{errors.form}</p>
        )}

        <SubmitButton>Sign In</SubmitButton>
      </form>

      <OrDivider />
      <GoogleButton />

      <p className="mt-7 text-center font-sans text-sm text-charcoal/60">
        Don&rsquo;t have an account?{" "}
        <Link href="/signup" className="text-charcoal underline-offset-2 hover:underline">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
