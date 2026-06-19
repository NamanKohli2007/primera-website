"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  money,
  FREE_DELIVERY_THRESHOLD,
  STANDARD_DELIVERY,
  FAST_DELIVERY,
  COD_FEE,
} from "@/lib/format";
import { markFirstOrderUsed, PREPAID_DISCOUNT } from "@/lib/coupons";
import CouponField from "@/components/CouponField";
import ShopCollectionButton from "@/components/ShopCollectionButton";
import PriceTag from "@/components/PriceTag";

function Section({ step, title, children }) {
  return (
    <section>
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-sans text-[12px] tracking-wide text-charcoal/40">
          {step}
        </span>
        <h2 className="font-serif text-xl font-light text-charcoal">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  placeholder,
  autoComplete,
  defaultValue,
  className = "",
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
        {label}
        {optional && <span className="text-charcoal/35"> (optional)</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-stone bg-cream px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/35 focus:border-charcoal focus:outline-none"
      />
    </label>
  );
}

// Shared radio row, used for both delivery method and payment method.
function OptionRow({
  name,
  value,
  selected,
  onSelect,
  title,
  desc,
  price,
  priceStrike,
  disabled,
  note,
}) {
  const active = selected === value;
  return (
    <div>
      <label
        className={`flex items-center gap-3 rounded-sm border px-5 py-4 transition-colors ${
          disabled
            ? "cursor-not-allowed border-stone/60 opacity-55"
            : active
            ? "cursor-pointer border-ink bg-cream"
            : "cursor-pointer border-stone hover:border-charcoal/50"
        }`}
      >
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            active && !disabled ? "border-ink" : "border-stone"
          }`}
        >
          {active && !disabled && (
            <span className="h-2 w-2 rounded-full bg-ink" />
          )}
        </span>
        <span className="flex-1">
          <span className="block font-sans text-sm text-charcoal">{title}</span>
          <span className="block font-sans text-[12px] text-charcoal/50">
            {desc}
          </span>
        </span>
        {price && (
          <span
            className={`font-sans text-sm ${
              priceStrike ? "text-charcoal/40 line-through" : "text-charcoal"
            }`}
          >
            {price}
          </span>
        )}
        <input
          type="radio"
          name={name}
          value={value}
          checked={active}
          disabled={disabled}
          onChange={() => !disabled && onSelect(value)}
          className="sr-only"
        />
      </label>
      {note && (
        <p className="mt-1.5 px-1 font-sans text-[12px] text-charcoal/55">
          {note}
        </p>
      )}
    </div>
  );
}

function Row({ label, value, valueClassName = "text-charcoal" }) {
  return (
    <div className="flex items-center justify-between font-sans text-sm">
      <span className="text-charcoal/65">{label}</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}

export default function CheckoutView() {
  const { items, subtotal, hydrated, clearCart, coupon, couponDiscount } =
    useCart();
  const { user, hydrated: authHydrated, addOrder } = useAuth();
  const [method, setMethod] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  // Free delivery is judged on the subtotal AFTER any coupon discount.
  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const qualifiesFree = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;

  // Auto-select Free Shipping once the cart qualifies; revert to Standard if
  // the cart drops back below the threshold.
  useEffect(() => {
    if (qualifiesFree) setMethod("free");
    else setMethod((m) => (m === "free" ? "standard" : m));
  }, [qualifiesFree]);

  const deliveryCost =
    method === "free"
      ? 0
      : method === "fast"
      ? FAST_DELIVERY
      : STANDARD_DELIVERY;
  const codFee = payment === "cod" ? COD_FEE : 0;
  // Paying online (UPI / Card) earns a flat prepaid discount; COD does not.
  const prepaidDiscount =
    payment === "upi" || payment === "card" ? PREPAID_DISCOUNT : 0;
  const total = Math.max(
    0,
    subtotal - couponDiscount - prepaidDiscount + deliveryCost + codFee
  );

  const placeOrder = (e) => {
    e.preventDefault();
    // Save the order to the signed-in user's account so it appears in My Orders.
    if (user) {
      addOrder({
        items: items.map((i) => ({
          name: i.name,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal,
        couponCode: coupon?.code || null,
        discount: couponDiscount,
        prepaidDiscount,
        delivery: deliveryCost,
        codFee,
        total,
      });
    }
    // Mark the first order as used — device-wide and against the signed-in
    // account — so a first-order-only code (PRIMERA10) can't be reused.
    markFirstOrderUsed(user?.email);
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Confirmation
  if (placed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl px-6 pb-28 pt-40 text-center md:pt-48"
      >
        <p className="eyebrow mb-5">Order Confirmed</p>
        <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
          Thank you.
        </h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-sm font-light leading-relaxed text-charcoal/65">
          Your order has been placed and a confirmation is on its way. This is a
          demo checkout — no payment was taken.
        </p>
        <Link
          href="/"
          className="btn-solid mt-9 bg-ink text-cream hover:bg-charcoal"
        >
          Back to Home
        </Link>
      </motion.div>
    );
  }

  if (!hydrated || !authHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 md:pt-48">
        <p className="font-sans text-sm text-charcoal/50">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-28 pt-40 text-center md:pt-48">
        <h1 className="font-serif text-4xl font-light text-ink">
          Your bag is empty
        </h1>
        <p className="mt-4 font-sans text-sm text-charcoal/60">
          Add a piece or two before checking out.
        </p>
        <ShopCollectionButton className="btn-solid mt-8 bg-ink text-cream hover:bg-charcoal" />
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={placeOrder}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40"
    >
      <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
        Checkout
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* Form */}
        <div className="space-y-12">
          <Section step="01" title="Contact">
            <Field
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              defaultValue={user?.email || ""}
              required
            />
          </Section>

          <Section step="02" title="Delivery">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                autoComplete="name"
                defaultValue={
                  user ? `${user.firstName} ${user.lastName}`.trim() : ""
                }
                required
                className="sm:col-span-2"
              />
              <Field
                label="Address line 1"
                name="address1"
                defaultValue={user?.address?.line1 || ""}
                required
                className="sm:col-span-2"
              />
              <Field
                label="Address line 2"
                name="address2"
                defaultValue={user?.address?.line2 || ""}
                optional
                className="sm:col-span-2"
              />
              <Field
                label="City"
                name="city"
                defaultValue={user?.address?.city || ""}
                required
              />
              <Field
                label="Postcode"
                name="postcode"
                defaultValue={user?.address?.postcode || ""}
                required
              />
              <Field
                label="Country"
                name="country"
                defaultValue="India"
                required
                className="sm:col-span-2"
              />
            </div>
          </Section>

          <Section step="03" title="Delivery Method">
            <div className="space-y-3">
              <OptionRow
                name="delivery"
                value="free"
                selected={method}
                onSelect={setMethod}
                title="Free Shipping"
                desc="On orders above ₹4999"
                price="Free"
                disabled={!qualifiesFree}
                priceStrike={!qualifiesFree}
                note={
                  qualifiesFree
                    ? null
                    : `Add ${money(
                        FREE_DELIVERY_THRESHOLD - subtotal
                      )} more to unlock free shipping`
                }
              />
              <OptionRow
                name="delivery"
                value="standard"
                selected={method}
                onSelect={setMethod}
                title="Standard Delivery"
                desc="3–7 days depending on city"
                price={money(STANDARD_DELIVERY)}
              />
              <OptionRow
                name="delivery"
                value="fast"
                selected={method}
                onSelect={setMethod}
                title="Fast Delivery"
                desc="1–2 days"
                price={money(FAST_DELIVERY)}
              />
            </div>
          </Section>

          <Section step="04" title="Payment">
            <div className="space-y-3">
              <OptionRow
                name="payment"
                value="upi"
                selected={payment}
                onSelect={setPayment}
                title="UPI"
                desc="GPay · PhonePe · Paytm & more"
              />
              <OptionRow
                name="payment"
                value="card"
                selected={payment}
                onSelect={setPayment}
                title="Credit / Debit Card"
                desc="Visa, Mastercard, RuPay"
              />
              <OptionRow
                name="payment"
                value="cod"
                selected={payment}
                onSelect={setPayment}
                title="Cash on Delivery"
                desc="Pay in cash when your order arrives"
                price={`+ ${money(COD_FEE)}`}
                note={
                  payment === "cod"
                    ? "Pay online via UPI or Card and save ₹50 on this order"
                    : null
                }
              />
            </div>

            {payment === "upi" && (
              <div className="mt-5">
                <Field label="UPI ID" name="upi" placeholder="name@upi" />
                <p className="mt-2 font-sans text-[12px] leading-relaxed text-charcoal/50">
                  You&rsquo;ll receive a payment request in your UPI app. Demo
                  only — no payment is taken.
                </p>
              </div>
            )}

            {payment === "card" && (
              <div className="mt-5">
                <p className="mb-4 font-sans text-[12px] leading-relaxed text-charcoal/50">
                  Demo only — Stripe will be connected later. Please don&rsquo;t
                  enter real card details.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field
                    label="Card number"
                    name="card"
                    placeholder="1234 5678 9012 3456"
                    className="sm:col-span-2"
                  />
                  <Field label="Expiry" name="expiry" placeholder="MM / YY" />
                  <Field label="CVV" name="cvv" placeholder="123" />
                </div>
              </div>
            )}

            {payment === "cod" && (
              <p className="mt-5 font-sans text-[13px] leading-relaxed text-charcoal/60">
                A COD handling fee of {money(COD_FEE)} will be added to your
                order.
              </p>
            )}
          </Section>
        </div>

        {/* Order summary */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-sm border border-stone/70 bg-ivory/60 p-7">
            <h2 className="font-serif text-2xl font-light text-charcoal">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5 border-t border-stone/70 pt-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div
                    className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-gradient-to-br ${item.tone}`}
                  >
                    <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-charcoal px-1 font-sans text-[10px] text-cream">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[13px] font-medium text-charcoal">
                      {item.name}
                    </p>
                    <p className="font-sans text-[11px] text-charcoal/55">
                      {item.color} · {item.size}
                    </p>
                  </div>
                  <PriceTag
                    original={
                      item.original ? item.original * item.quantity : undefined
                    }
                    current={item.price * item.quantity}
                    size="sm"
                    badge={false}
                    className="shrink-0 justify-end"
                  />
                </div>
              ))}
            </div>

            {/* Discount code */}
            <div className="mt-6 border-t border-stone/70 pt-6">
              <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
                Discount Code
              </p>
              <CouponField />
            </div>

            <div className="mt-6 space-y-3 border-t border-stone/70 pt-6">
              <Row label="Subtotal" value={money(subtotal)} />
              {coupon && couponDiscount > 0 && (
                <Row
                  label={`Discount (${coupon.code})`}
                  value={`− ${money(couponDiscount)}`}
                  valueClassName="text-green-700"
                />
              )}
              {prepaidDiscount > 0 && (
                <Row
                  label="Prepaid Discount"
                  value={`− ${money(prepaidDiscount)}`}
                  valueClassName="text-green-700"
                />
              )}
              <Row
                label="Delivery"
                value={deliveryCost === 0 ? "Free" : money(deliveryCost)}
              />
              {codFee > 0 && (
                <Row label="Cash on Delivery (COD)" value={money(codFee)} />
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-stone/70 pt-4">
              <span className="font-sans text-sm uppercase tracking-[0.15em] text-charcoal">
                Total
              </span>
              <span className="font-serif text-2xl text-ink">
                {money(total)}
              </span>
            </div>

            <button
              type="submit"
              className="btn-solid mt-6 w-full bg-ink text-cream hover:bg-charcoal"
            >
              Place Order
            </button>
            <Link
              href="/cart"
              className="mt-3 block text-center font-sans text-[12px] uppercase tracking-[0.18em] text-charcoal/55 transition-colors hover:text-charcoal"
            >
              Back to Bag
            </Link>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
