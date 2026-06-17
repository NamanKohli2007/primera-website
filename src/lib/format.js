// Shared money formatting + commerce constants.
// Kept framework-agnostic (no "use client") so both the cart context and
// plain display components can import it.

export const FREE_DELIVERY_THRESHOLD = 4999; // ₹
export const STANDARD_DELIVERY = 89; // ₹ — Standard Delivery (3–7 days)
export const FAST_DELIVERY = 159; // ₹ — Fast Delivery (1–2 days)
export const COD_FEE = 40; // ₹ — added when Cash on Delivery is chosen

/** Format a number as INR — whole rupees drop the decimals, e.g. ₹1490, ₹89 */
export function money(n) {
  const v = Math.round((Number(n) + Number.EPSILON) * 100) / 100;
  return "₹" + (Number.isInteger(v) ? v.toString() : v.toFixed(2));
}
