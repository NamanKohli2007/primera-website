import { money } from "@/lib/format";

const SIZES = {
  sm: { orig: "text-[12px]", cur: "text-sm", badge: "text-[9px] px-1.5 py-[1px]" },
  base: { orig: "text-[13px]", cur: "text-[15px]", badge: "text-[10px] px-2 py-0.5" },
  lg: { orig: "text-base", cur: "text-lg", badge: "text-[10px] px-2 py-0.5" },
};

/**
 * PriceTag — shows a slashed original price, the current price, and a subtle
 * "% off" badge. Pass raw amounts (works for unit prices and line totals).
 * `dark` flips the palette for use on dark cards / surfaces.
 */
export default function PriceTag({
  original,
  current,
  dark = false,
  badge = true,
  size = "base",
  className = "",
}) {
  const s = SIZES[size] || SIZES.base;
  const hasDiscount = original && original > current;
  const off = hasDiscount ? Math.round((1 - current / original) * 100) : 0;

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      {hasDiscount && (
        <span
          className={`${s.orig} line-through ${
            dark ? "text-cream/40" : "text-charcoal/40"
          }`}
        >
          {money(original)}
        </span>
      )}
      <span className={`${s.cur} ${dark ? "text-cream" : "text-charcoal"}`}>
        {money(current)}
      </span>
      {badge && off > 0 && (
        <span
          className={`self-center rounded-full border font-sans uppercase tracking-wide2 ${
            s.badge
          } ${
            dark ? "border-cream/25 text-cream/65" : "border-charcoal/20 text-charcoal/55"
          }`}
        >
          {off}% off
        </span>
      )}
    </span>
  );
}
