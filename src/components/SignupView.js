"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, isValidEmail } from "@/context/AuthContext";
import {
  AuthShell,
  Field,
  PasswordField,
  OrDivider,
  GoogleButton,
  SubmitButton,
} from "@/components/auth/AuthUI";

export default function SignupView() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined, form: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.password) next.password = "Password is required.";
    else if (form.password.length < 8)
      next.password = "Password must be at least 8 characters.";
    if (!form.confirm) next.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password)
      next.confirm = "Passwords do not match.";
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const res = signup(form);
    if (!res.ok) {
      setErrors({ email: res.error });
      return;
    }
    router.push("/");
  };

  return (
    <AuthShell
      title="Create Your Account"
      subtitle="Join Primera. Track your orders and save your details."
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="First name"
            value={form.firstName}
            onChange={set("firstName")}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <Field
            label="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
        <PasswordField
          label="Confirm password"
          value={form.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
          autoComplete="new-password"
        />

        <SubmitButton>Create Account</SubmitButton>
      </form>

      <OrDivider />
      <GoogleButton />

      <p className="mt-7 text-center font-sans text-sm text-charcoal/60">
        Already have an account?{" "}
        <Link href="/login" className="text-charcoal underline-offset-2 hover:underline">
          Sign In
        </Link>
      </p>
    </AuthShell>
  );
}
