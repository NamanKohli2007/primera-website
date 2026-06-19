import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Shipping Policy — PRIMERA",
  description:
    "Everything you need to know about delivery across India — options, processing, tracking, and more.",
};

const bodyClass =
  "font-sans text-[15px] leading-[1.85] text-[#7a7162] md:text-base";

// Section heading — Cormorant, soft black, with a subtle gold left-border accent
function Heading({ children }) {
  return (
    <h2 className="border-l-2 border-gold pl-4 font-serif text-2xl font-light text-ink md:text-3xl">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="my-12 h-px w-full bg-gold/40 md:my-14" />;
}

function Email() {
  return (
    <a
      href="mailto:support@primera.in"
      className="font-medium text-ink underline decoration-gold underline-offset-2 transition-colors hover:text-gold"
    >
      support@primera.in
    </a>
  );
}

const DELIVERY_OPTIONS = [
  {
    title: "Standard Delivery — ₹89",
    body: "Estimated delivery in 3–7 business days depending on your location. Available across India.",
  },
  {
    title: "Fast Delivery — ₹159",
    body: "Estimated delivery in 1–2 business days. Available across most major cities and pin codes.",
  },
  {
    title: "Free Delivery — ₹0",
    body: "Free standard delivery on all orders above ₹4999. Automatically applied at checkout.",
  },
  {
    title: "Cash on Delivery (COD) — ₹40 handling fee",
    body: "COD is available across India on orders up to ₹5000. A handling fee of ₹40 is added to your order total at checkout.",
  },
];

const NOTES = [
  "Delivery timelines are estimates and may vary during peak periods, sale events, or due to circumstances beyond our control.",
  "Primera currently ships pan India. We do not ship internationally at this time.",
  "COD orders are capped at ₹5000. Orders above this value must be paid online.",
  "Please ensure your delivery address and contact details are accurate at the time of ordering. Primera is not responsible for delays or failed deliveries due to incorrect information provided at checkout.",
];

export default function ShippingPage() {
  return (
    <>
      <Navigation variant="solid" />

      <main className="bg-cream">
        {/* Hero */}
        <section className="px-6 pb-12 pt-36 text-center md:pb-16 md:pt-52">
          <Reveal as="p" className="eyebrow mb-6 text-gold">
            Delivery &amp; Shipping
          </Reveal>
          <Reveal
            as="h1"
            delay={0.05}
            className="font-serif text-5xl font-light leading-[1.05] text-ink md:text-7xl"
          >
            Shipping Policy
          </Reveal>
          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-[#7a7162] md:text-lg"
          >
            Everything you need to know about delivery across India.
          </Reveal>
          <Reveal
            as="div"
            delay={0.18}
            className="mx-auto mt-10 h-px w-16 bg-gold/40"
          />
        </section>

        {/* Body */}
        <article className="mx-auto max-w-[680px] px-6 pb-28 md:pb-36">
          {/* 1 — Delivery Options */}
          <Reveal as="section" amount={0.2}>
            <Heading>Delivery Options</Heading>
            <p className={`mt-6 ${bodyClass}`}>
              We offer three delivery options across India:
            </p>
            <div className="mt-6 space-y-6">
              {DELIVERY_OPTIONS.map((opt) => (
                <div key={opt.title}>
                  <p className="font-sans text-[15px] font-medium text-ink md:text-base">
                    {opt.title}
                  </p>
                  <p className={`mt-1.5 ${bodyClass}`}>{opt.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Divider />

          {/* 2 — Order Processing */}
          <Reveal as="section" amount={0.2}>
            <Heading>Order Processing</Heading>
            <p className={`mt-6 ${bodyClass}`}>
              All orders are processed within 1–2 business days of being placed.
            </p>
            <p className={`mt-5 ${bodyClass}`}>
              Orders placed on weekends or public holidays will be processed on
              the next working business day.
            </p>
            <p className={`mt-5 ${bodyClass}`}>
              Once your order has been dispatched, you will receive a tracking
              link via email so you can follow your delivery in real time.
            </p>
          </Reveal>

          <Divider />

          {/* 3 — Shipping Partner */}
          <Reveal as="section" amount={0.2}>
            <Heading>Shipping Partner</Heading>
            <p className={`mt-6 ${bodyClass}`}>
              Primera ships all orders through Delhivery, one of India&rsquo;s
              most reliable logistics networks, ensuring consistent and
              trackable delivery across all pin codes.
            </p>
          </Reveal>

          <Divider />

          {/* 4 — Tracking Your Order */}
          <Reveal as="section" amount={0.2}>
            <Heading>Tracking Your Order</Heading>
            <p className={`mt-6 ${bodyClass}`}>
              Once your order is dispatched, a tracking link will be sent to your
              registered email address. You can use this link to monitor your
              delivery in real time.
            </p>
            <p className={`mt-5 ${bodyClass}`}>
              For any queries regarding your order or delivery, contact us at{" "}
              <Email />.
            </p>
          </Reveal>

          <Divider />

          {/* 5 — Failed Delivery */}
          <Reveal as="section" amount={0.2}>
            <Heading>Failed Delivery</Heading>
            <p className={`mt-6 ${bodyClass}`}>
              If a delivery attempt is unsuccessful, our courier partner will
              make one additional reattempt. If the second attempt also fails,
              the order will be returned to us.
            </p>
            <p className={`mt-5 ${bodyClass}`}>
              In the case of a returned order, our team will reach out to you at{" "}
              <Email /> to arrange a resolution.
            </p>
          </Reveal>

          <Divider />

          {/* 6 — Important Notes */}
          <Reveal as="section" amount={0.2}>
            <Heading>Important Notes</Heading>
            <ul className="mt-6 space-y-4">
              {NOTES.map((note, i) => (
                <li key={i} className={`flex gap-3 ${bodyClass}`}>
                  <span className="mt-[0.9em] h-px w-3.5 shrink-0 bg-gold/60" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </article>
      </main>

      <Footer />
    </>
  );
}
