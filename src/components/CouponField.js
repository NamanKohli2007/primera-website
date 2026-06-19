"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { hasUsedFirstOrder } from "@/lib/coupons";

/**
 * CouponField — the shared discount-code input + Apply button, plus the
 * applied / error states. Used on both the cart page and the checkout order
 * summary so the experience is identical and the applied coupon (held in the
 * cart context) stays in sync everywhere.
 *
 * Deliberately NOT a <form>: the checkout page is itself a <form>, and nesting
 * forms is invalid HTML. Apply is a plain button and Enter is handled on the
 * input (preventing the outer checkout form from submitting / placing an order).
 */
export default function CouponField() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const applyNow = () => {
    // "Ordered before" = device-level flag OR the signed-in account's history.
    const orderedBefore =
      hasUsedFirstOrder(user?.email) || (user?.orders?.length || 0) > 0;
    const res = applyCoupon(code, { hasOrderedBefore: orderedBefore });
    if (res.ok) {
      setError("");
      setCode("");
    } else {
      setError(res.error);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              applyNow();
            }
          }}
          placeholder="Enter discount code"
          aria-label="Discount code"
          className="w-full flex-1 rounded-sm border border-stone bg-cream px-4 py-3 font-sans text-sm uppercase tracking-wide text-charcoal placeholder:normal-case placeholder:tracking-normal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none"
        />
        <button
          type="button"
          onClick={applyNow}
          className="shrink-0 rounded-sm border border-ink bg-ink px-5 font-sans text-[12px] uppercase tracking-wide2 text-cream transition-colors hover:bg-charcoal"
        >
          Apply
        </button>
      </div>

      {coupon && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-sans text-[12px] font-medium text-green-700">
            {coupon.code} applied — {coupon.label}
          </p>
          <button
            type="button"
            onClick={() => {
              removeCoupon();
              setError("");
            }}
            className="shrink-0 font-sans text-[11px] uppercase tracking-wide2 text-charcoal/50 underline underline-offset-2 transition-colors hover:text-charcoal"
          >
            Remove
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 font-sans text-[12px] text-red-600">{error}</p>
      )}
    </div>
  );
}
