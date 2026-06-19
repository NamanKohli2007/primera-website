// Coupon / discount engine. The catalogue of valid codes plus pure helpers for
// validating and pricing them, kept framework-agnostic so the cart context,
// cart page and checkout all share one source of truth.
//
// First-order eligibility is tracked in localStorage: a device-wide flag and a
// per-account map, so a "first order only" code (PRIMERA10) can't be reused
// once a customer has placed their first order on this device or account.

import { money } from "./format";

export const PREPAID_DISCOUNT = 50; // ₹ off when paying online (UPI / Card)

export const COUPONS = {
  PRIMERA10: {
    code: "PRIMERA10",
    type: "percent", // "percent" | "flat"
    value: 10, // 10% off the subtotal
    minOrder: 999, // ₹ minimum order subtotal
    firstOrderOnly: true,
    label: "10% off your order",
  },
};

const FIRST_ORDER_KEY = "primera_first_order_used";
const FIRST_ORDER_ACCOUNTS_KEY = "primera_first_order_accounts";

/** Look up a coupon by raw (any-case) code. */
export function getCoupon(rawCode) {
  return COUPONS[String(rawCode || "").trim().toUpperCase()] || null;
}

/** Has a first order already been placed on this device — or by this account? */
export function hasUsedFirstOrder(userEmail) {
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(FIRST_ORDER_KEY) === "true") return true;
    if (userEmail) {
      const map = JSON.parse(
        localStorage.getItem(FIRST_ORDER_ACCOUNTS_KEY) || "{}"
      );
      if (map[String(userEmail).toLowerCase()]) return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/**
 * Record that the first order has been placed — device-wide, and against the
 * signed-in account (if any) so it persists per user as well.
 */
export function markFirstOrderUsed(userEmail) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FIRST_ORDER_KEY, "true");
    if (userEmail) {
      const map = JSON.parse(
        localStorage.getItem(FIRST_ORDER_ACCOUNTS_KEY) || "{}"
      );
      map[String(userEmail).toLowerCase()] = true;
      localStorage.setItem(FIRST_ORDER_ACCOUNTS_KEY, JSON.stringify(map));
    }
  } catch {
    /* ignore */
  }
}

/**
 * Validate a raw code against the catalogue and the current order.
 * Returns { ok: true, coupon } or { ok: false, error }.
 */
export function validateCoupon(
  rawCode,
  { subtotal = 0, hasOrderedBefore = false } = {}
) {
  const coupon = getCoupon(rawCode);
  if (!coupon) return { ok: false, error: "Invalid discount code" };

  if (coupon.firstOrderOnly && hasOrderedBefore) {
    return {
      ok: false,
      error: "This code has already been used on a previous order",
    };
  }
  if (coupon.minOrder && subtotal < coupon.minOrder) {
    return {
      ok: false,
      error: `Minimum order value of ${money(
        coupon.minOrder
      )} required for this code`,
    };
  }
  return { ok: true, coupon };
}

/** The rupee discount a coupon yields for a given subtotal (0 if not applicable). */
export function couponDiscount(coupon, subtotal = 0) {
  if (!coupon) return 0;
  if (coupon.minOrder && subtotal < coupon.minOrder) return 0;
  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100);
  }
  if (coupon.type === "flat") {
    return Math.min(subtotal, coupon.value);
  }
  return 0;
}
