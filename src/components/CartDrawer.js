"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { money, FREE_DELIVERY_THRESHOLD } from "@/lib/format";
import CartLineItem from "@/components/CartLineItem";
import ShopCollectionButton from "@/components/ShopCollectionButton";

/**
 * CartDrawer — slide-in bag from the right.
 *
 * Always mounted; opens/closes by toggling CSS transforms (panel translateX)
 * and opacity (backdrop) off `isOpen`. Pure CSS transitions are used here
 * rather than Framer Motion's AnimatePresence/animate, which proved unreliable
 * under React Strict Mode in dev (exits hung / animate prop didn't react).
 */
export default function CartDrawer() {
  const { items, subtotal, count, isOpen, closeCart } = useCart();

  // Lock background scroll while open. Compensate for the disappearing
  // scrollbar with padding so the page doesn't jump when the drawer opens.
  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);
  const qualifies = subtotal >= FREE_DELIVERY_THRESHOLD;

  return (
    <div
      className="fixed inset-0 z-[80]"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      aria-hidden={!isOpen}
    >
      {/* Backdrop — fades in separately (0.2s) */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={closeCart}
        style={{
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      />

      {/* Panel — clean fade + subtle scale (0.25s ease-out) */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl will-change-transform"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.98)",
          transition: "opacity 0.25s ease-out, transform 0.25s ease-out",
        }}
        role="dialog"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone/70 px-6 py-5">
          <h2 className="font-serif text-2xl font-light text-charcoal">
            Your Bag{count > 0 ? ` (${count})` : ""}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="text-xl leading-none text-charcoal/55 transition-colors hover:text-charcoal"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="font-serif text-xl italic text-charcoal/55">
              Your bag is empty.
            </p>
            <ShopCollectionButton
              onNavigate={closeCart}
              className="btn-outline border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal/5"
            />
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="no-scrollbar flex-1 space-y-7 overflow-y-auto px-6 py-6">
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} compact />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-stone/70 px-6 py-5">
              {/* Free-delivery progress */}
              <div className="mb-5">
                <p className="mb-2 font-sans text-[12px] leading-relaxed text-charcoal/70">
                  {qualifies ? (
                    "You've unlocked complimentary delivery."
                  ) : (
                    <>
                      You&rsquo;re{" "}
                      <span className="text-charcoal">{money(remaining)}</span>{" "}
                      away from free delivery.
                    </>
                  )}
                </p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-stone">
                  <div
                    className="h-full rounded-full bg-charcoal transition-all duration-700 ease-luxe"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-sans text-[13px] uppercase tracking-[0.15em] text-charcoal/60">
                  Subtotal
                </span>
                <span className="font-sans text-base text-charcoal">
                  {money(subtotal)}
                </span>
              </div>
              <p className="mt-1 font-sans text-[12px] text-charcoal/45">
                Shipping &amp; taxes calculated at checkout.
              </p>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-solid mt-5 w-full bg-ink text-cream hover:bg-charcoal"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 block text-center font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal/55 transition-colors hover:text-charcoal"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
