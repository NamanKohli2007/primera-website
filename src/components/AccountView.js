"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { money } from "@/lib/format";
import { Field, PasswordField } from "@/components/auth/AuthUI";

const TABS = [
  { id: "orders", label: "My Orders" },
  { id: "details", label: "My Details" },
  { id: "password", label: "Change Password" },
];

function StatusBadge({ status }) {
  const styles = {
    Processing: "border-charcoal/25 text-charcoal/70",
    Shipped: "border-[#3f6f5f]/45 text-[#3f6f5f]",
    Delivered: "border-[#3f6f5f]/45 bg-[#3f6f5f]/10 text-[#3f6f5f]",
  };
  return (
    <span
      className={`shrink-0 rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-wide2 ${
        styles[status] || styles.Processing
      }`}
    >
      {status}
    </span>
  );
}

function OrderCard({ order }) {
  const date = new Date(order.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="rounded-sm border border-stone/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-sans text-sm font-medium text-charcoal">
            {order.number}
          </p>
          <p className="mt-1 font-sans text-[12px] text-charcoal/55">
            Placed {date}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-5 space-y-2 border-t border-stone/60 pt-5">
        {order.items.map((it, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 font-sans text-[13px]"
          >
            <span className="text-charcoal">
              {it.name}{" "}
              <span className="text-charcoal/45">
                · {it.color} · {it.size} · ×{it.quantity}
              </span>
            </span>
            <span className="shrink-0 text-charcoal/70">
              {money(it.price * it.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-stone/60 pt-4">
        <span className="font-sans text-[12px] uppercase tracking-wide2 text-charcoal/55">
          Total
        </span>
        <span className="font-sans text-base text-charcoal">
          {money(order.total)}
        </span>
      </div>

      <button
        type="button"
        className="btn-outline mt-5 w-full border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5"
      >
        Track Order
      </button>
    </div>
  );
}

function MyOrders({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-sm border border-stone/70 px-6 py-16 text-center">
        <p className="font-serif text-xl italic text-charcoal/55">
          No orders yet.
        </p>
        <Link
          href="/shop"
          className="btn-solid mt-6 bg-ink text-cream hover:bg-charcoal"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {orders.map((o) => (
        <OrderCard key={o.number} order={o} />
      ))}
    </div>
  );
}

function MyDetails({ user, updateDetails }) {
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    line1: user.address?.line1 || "",
    line2: user.address?.line2 || "",
    city: user.address?.city || "",
    postcode: user.address?.postcode || "",
  });
  const [saved, setSaved] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setSaved(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateDetails({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      address: {
        line1: form.line1.trim(),
        line2: form.line2.trim(),
        city: form.city.trim(),
        postcode: form.postcode.trim(),
      },
    });
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="First name"
          value={form.firstName}
          onChange={set("firstName")}
        />
        <Field
          label="Last name"
          value={form.lastName}
          onChange={set("lastName")}
        />
      </div>
      <div>
        <Field label="Email" value={user.email} readOnly />
        <p className="mt-1.5 font-sans text-[12px] text-charcoal/40">
          Email cannot be changed.
        </p>
      </div>
      <Field
        label="Phone number (optional)"
        type="tel"
        value={form.phone}
        onChange={set("phone")}
        autoComplete="tel"
      />

      <div className="pt-2">
        <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal/45">
          Default delivery address
        </p>
        <div className="space-y-5">
          <Field
            label="Address line 1"
            value={form.line1}
            onChange={set("line1")}
          />
          <Field
            label="Address line 2"
            value={form.line2}
            onChange={set("line2")}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="City" value={form.city} onChange={set("city")} />
            <Field
              label="Postcode"
              value={form.postcode}
              onChange={set("postcode")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="btn-solid bg-ink text-cream hover:bg-charcoal"
        >
          Save Changes
        </button>
        {saved && (
          <span className="font-sans text-[13px] text-[#3f6f5f]">
            Details updated successfully
          </span>
        )}
      </div>
    </form>
  );
}

function ChangePassword({ changePassword }) {
  const [cur, setCur] = useState("");
  const [nw, setNw] = useState("");
  const [cf, setCf] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const reset = () => {
    setError("");
    setDone(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    reset();
    if (nw.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (nw !== cf) {
      setError("New passwords do not match.");
      return;
    }
    const res = changePassword(cur, nw);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setDone(true);
    setCur("");
    setNw("");
    setCf("");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-5">
      <PasswordField
        label="Current password"
        value={cur}
        onChange={(e) => {
          setCur(e.target.value);
          reset();
        }}
        autoComplete="current-password"
      />
      <PasswordField
        label="New password"
        value={nw}
        onChange={(e) => {
          setNw(e.target.value);
          reset();
        }}
        autoComplete="new-password"
        placeholder="At least 8 characters"
      />
      <PasswordField
        label="Confirm new password"
        value={cf}
        onChange={(e) => {
          setCf(e.target.value);
          reset();
        }}
        autoComplete="new-password"
      />
      {error && (
        <p className="font-sans text-[13px] text-[#b06a5e]">{error}</p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn-solid bg-ink text-cream hover:bg-charcoal"
        >
          Update Password
        </button>
        {done && (
          <span className="font-sans text-[13px] text-[#3f6f5f]">
            Password updated successfully
          </span>
        )}
      </div>
    </form>
  );
}

export default function AccountView() {
  const router = useRouter();
  const { user, hydrated, logout, updateDetails, changePassword } = useAuth();
  const [tab, setTab] = useState("orders");
  const signingOut = useRef(false);

  useEffect(() => {
    // Don't bounce to /login during an intentional sign-out (that goes home).
    if (hydrated && !user && !signingOut.current) router.replace("/login");
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 md:pt-48">
        <p className="font-sans text-sm text-charcoal/50">
          {hydrated ? "Redirecting…" : "Loading…"}
        </p>
      </div>
    );
  }

  const signOut = () => {
    signingOut.current = true;
    logout();
    router.push("/");
  };

  const activeLabel = TABS.find((t) => t.id === tab)?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40"
    >
      <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
        My Account
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-36 lg:self-start">
          <p className="font-sans text-base font-medium text-charcoal">
            {user.firstName} {user.lastName}
          </p>
          <p className="font-sans text-[13px] text-charcoal/55">{user.email}</p>

          <nav className="mt-8 flex flex-col gap-1 border-t border-stone/70 pt-6">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`-mx-3 rounded-sm px-3 py-2.5 text-left font-sans text-sm transition-colors ${
                  tab === t.id
                    ? "bg-ivory text-charcoal"
                    : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={signOut}
            className="mt-6 block w-full border-t border-stone/70 pt-6 text-left font-sans text-[12px] uppercase tracking-wide2 text-charcoal/55 transition-colors hover:text-charcoal"
          >
            Sign Out
          </button>
        </aside>

        {/* Content */}
        <div>
          <h2 className="mb-6 font-serif text-2xl font-light text-charcoal md:mb-8">
            {activeLabel}
          </h2>
          {tab === "orders" && <MyOrders orders={user.orders} />}
          {tab === "details" && (
            <MyDetails user={user} updateDetails={updateDetails} />
          )}
          {tab === "password" && (
            <ChangePassword changePassword={changePassword} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
