"use client";

import { useRouter, usePathname } from "next/navigation";

/**
 * ShopCollectionButton — used in empty-cart states.
 * On the homepage it smooth-scrolls to the #collection section; on any other
 * page it navigates home first, then scrolls once the section has mounted.
 * `onNavigate` lets callers (e.g. the drawer) close themselves first.
 */
export default function ShopCollectionButton({
  className,
  children = "Shop Collection",
  onNavigate,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    onNavigate?.();

    if (pathname === "/") {
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Navigate home (suppress Next's auto scroll-to-top), then scroll to
    // #collection ourselves once it has rendered.
    router.push("/", { scroll: false });
    const started = Date.now();
    const attempt = () => {
      const el = document.getElementById("collection");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (Date.now() - started < 2500) {
        requestAnimationFrame(attempt);
      }
    };
    setTimeout(() => requestAnimationFrame(attempt), 120);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
