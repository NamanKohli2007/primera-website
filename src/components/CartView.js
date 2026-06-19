"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  money,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY,
} from "@/lib/format";
import CartLineItem from "@/components/CartLineItem";
import CouponField from "@/components/CouponField";
import ShopCollectionButton from "@/components/ShopCollectionButton";

function Row({ label, value, valueClassName = "text-charcoal" }) {
  return (
    <div className="flex items-center justify-between font-sans text-sm">
      <span className="text-charcoal/65">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}

export default function CartView() {
  const { items, subtotal, hydrated, coupon, couponDiscount } = useCart();

  // Free delivery is judged on the order total AFTER any coupon discount.
  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const qualifiesFree = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = qualifiesFree ? 0 : STANDARD_DELIVERY;
  const total = discountedSubtotal + delivery;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40"
    >
      <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
        Your Bag
      </h1>

      {!hydrated ? (
        <p className="mt-10 font-sans text-sm text-charcoal/50">
          Loading your bag…
        </p>
      ) : items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="font-serif text-xl italic text-charcoal/55">
            Your bag is empty.
          </p>
          <ShopCollectionButton className="btn-solid bg-ink text-cream hover:bg-charcoal" />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Items */}
          <div>
            <div className="space-y-8 border-t border-stone/70 pt-8">
              {items.map((item) => (
                <div key={item.id} className="border-b border-stone/60 pb-8">
                  <CartLineItem item={item} />
                </div>
              ))}
            </div>

            {/* Discount code — below the cart items */}
            <div className="mt-8 max-w-md">
              <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                Discount Code
              </p>
              <CouponField />
            </div>

            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 font-sans text-[12px] uppercase tracking-wide2 text-charcoal/70 transition-colors hover:text-charcoal"
            >
              <span className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1">
                ←
              </span>
              Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <div className="rounded-sm border border-stone/70 bg-ivory/60 p-7">
              <h2 className="font-serif text-2xl font-light text-charcoal">
                Order Summary
              </h2>

              {/* Totals */}
              <div className="mt-6 space-y-3 border-t border-stone/70 pt-6">
                <Row label="Subtotal" value={money(subtotal)} />
                {coupon && couponDiscount > 0 && (
                  <Row
                    label={`Discount (${coupon.code})`}
                    value={`− ${money(couponDiscount)}`}
                    valueClassName="text-green-700"
                  />
                )}
                <Row
                  label="Delivery"
                  value={delivery === 0 ? "Free" : money(delivery)}
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-stone/70 pt-4">
                <span className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal">
                  Total
                </span>
                <span className="font-serif text-2xl text-ink">
                  {money(total)}
                </span>
              </div>

              {qualifiesFree ? (
                <p className="mt-4 font-sans text-[12px] text-charcoal/60">
                  ✓ Your order qualifies for free delivery.
                </p>
              ) : (
                <p className="mt-4 font-sans text-[12px] text-charcoal/60">
                  Spend {money(FREE_DELIVERY_THRESHOLD - discountedSubtotal)} more
                  for free delivery.
                </p>
              )}

              <Link
                href="/checkout"
                className="btn-solid mt-6 w-full bg-ink text-cream hover:bg-charcoal"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
