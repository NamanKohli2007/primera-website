"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  COUPONS,
  validateCoupon,
  couponDiscount as calcCouponDiscount,
  hasUsedFirstOrder,
} from "@/lib/coupons";

const CartContext = createContext(null);
const STORAGE_KEY = "primera_cart_v1";
const COUPON_KEY = "primera_coupon_v1";

/** A cart line is unique per product + colour + size. */
function makeLineId(slug, color, size) {
  return `${slug}__${color}__${size}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart + applied coupon once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
      // Re-resolve the coupon from the catalogue so persisted data can't go
      // stale (the rate/rules always come from code, not storage).
      const savedCode = localStorage.getItem(COUPON_KEY);
      if (savedCode && COUPONS[savedCode]) setCoupon(COUPONS[savedCode]);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after the initial load)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable */
    }
  }, [items, hydrated]);

  // Persist the applied coupon (code only) so it carries cart → checkout.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (coupon) localStorage.setItem(COUPON_KEY, coupon.code);
      else localStorage.removeItem(COUPON_KEY);
    } catch {
      /* ignore */
    }
  }, [coupon, hydrated]);

  const addItem = useCallback((product, { color, size, quantity = 1 }) => {
    const id = makeLineId(product.slug, color, size);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...prev,
        {
          id,
          slug: product.slug,
          name: product.name,
          href: product.href,
          price: product.price,
          original: product.original,
          category: product.category,
          tone: product.tone,
          cardDark: !!product.cardDark,
          color,
          size,
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const q = Math.max(0, quantity);
        return q === 0 ? [] : [{ ...i, quantity: q }];
      })
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // Clearing the cart (e.g. after an order is placed) also drops the coupon.
  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  // Validate + apply a coupon code against the current subtotal. Callers may
  // pass `hasOrderedBefore` (device flag OR a signed-in account's order
  // history); otherwise we fall back to the device-level localStorage flag.
  // Returns { ok, error?, coupon? } so the UI can show success / error copy.
  const applyCoupon = useCallback(
    (rawCode, opts = {}) => {
      const hasOrderedBefore =
        opts.hasOrderedBefore != null
          ? opts.hasOrderedBefore
          : hasUsedFirstOrder();
      const res = validateCoupon(rawCode, { subtotal, hasOrderedBefore });
      if (res.ok) setCoupon(res.coupon);
      return res;
    },
    [subtotal]
  );

  const removeCoupon = useCallback(() => setCoupon(null), []);

  // Live rupee discount from the applied coupon (0 if none / below minimum).
  const couponDiscount = useMemo(
    () => calcCouponDiscount(coupon, subtotal),
    [coupon, subtotal]
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      coupon,
      couponDiscount,
      applyCoupon,
      removeCoupon,
      isOpen,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      count,
      subtotal,
      coupon,
      couponDiscount,
      applyCoupon,
      removeCoupon,
      isOpen,
      hydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
