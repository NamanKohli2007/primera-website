"use client";

import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/PriceTag";

/**
 * CartLineItem — one row in the bag. Shared by the slide-in drawer
 * (compact) and the full /cart page.
 */
export default function CartLineItem({ item, compact = false }) {
  const { updateQuantity, removeItem } = useCart();
  const thumb = compact ? "h-24 w-[72px]" : "h-28 w-[88px] sm:h-32 sm:w-24";

  return (
    <div className="flex gap-4">
      {/* Thumbnail */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-sm bg-gradient-to-br ${item.tone} ${thumb}`}
      >
        <div className="absolute inset-0 fabric-weave opacity-30" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans text-sm font-medium leading-snug text-charcoal">
              {item.name}
            </h3>
            <p className="mt-1 font-sans text-[12px] text-charcoal/55">
              {item.color} · Size {item.size}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="shrink-0 font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/45 transition-colors hover:text-charcoal"
          >
            Remove
          </button>
        </div>

        <div className="mt-2">
          <PriceTag
            original={item.original ? item.original * item.quantity : undefined}
            current={item.price * item.quantity}
            size="sm"
          />
        </div>

        <div className="mt-auto pt-3">
          {/* Quantity stepper */}
          <div className="inline-flex items-center rounded-full border border-stone">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center font-sans text-charcoal/70 transition-colors hover:text-charcoal disabled:opacity-30"
            >
              −
            </button>
            <span className="w-7 text-center font-sans text-[13px] text-charcoal">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center font-sans text-charcoal/70 transition-colors hover:text-charcoal"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
