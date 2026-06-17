"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Muted answer colour, per spec.
const ANSWER = "text-[#7a7162]";

const SECTIONS = [
  {
    heading: "The Brand",
    note: null,
    items: [
      {
        q: "What makes Primera different from other basics brands?",
        a: "Most clothing brands compete on logos, trends, and marketing. Very few obsess over the fabric itself. At Primera, the fabric is the product. We spent months sourcing, testing, and washing dozens of fabrics before selecting the ones that made it into our collection. The result is clothing that feels noticeably different the moment you put it on.",
      },
      {
        q: "What fabrics does Primera use?",
        a: "The Primera Tee and Henley are crafted from a premium Modal blend — a plant-based fibre derived from beech tree pulp, known for its exceptional softness, breathability, and shape retention. The Primera Trousers and the entire Motion collection are made from a premium Bamboo blend — highly breathable, moisture-wicking, and smooth against the skin. Each fabric is selected with one question in mind: would we genuinely choose to wear this ourselves?",
      },
      {
        q: "Why did Primera choose plant-based fibres?",
        a: "We wanted clothing that genuinely felt better to wear every day. Modal and bamboo blends offered a level of softness, breathability, and comfort that synthetic fabrics simply could not match. Beyond performance, they align with our belief that what touches your skin every day should be thoughtfully chosen.",
      },
    ],
  },
  {
    heading: "Modal Blend — Primera Essentials",
    note: "Applies to The Primera Tee and The Primera Henley",
    items: [
      {
        q: "What is a Modal blend?",
        a: "Modal is a plant-based fibre derived from the cellulose of beech trees. Our Modal blend is engineered for exceptional softness, breathability, and shape retention — giving you a fabric that feels noticeably different from the moment you put it on.",
      },
      {
        q: "Why is it softer than cotton?",
        a: "Modal fibres have a finer, smoother structure than cotton fibres. This gives the fabric a naturally silky hand feel that cotton cannot replicate. It also drapes more elegantly and feels lighter against the skin.",
      },
      {
        q: "Will it shrink after washing?",
        a: "Our fabric goes through repeated washing and relaxation cycles at the mill before a single garment is cut and sewn. This pre-conditioning process stabilises the fabric so your Primera piece maintains its fit and shape wash after wash, with only minimal shrinkage within normal industry standards.",
      },
      {
        q: "Does it stay soft after multiple washes?",
        a: "Yes. One of Modal's most valued qualities is that it maintains — and in many cases improves — its softness over time. Unlike some fabrics that feel great initially but deteriorate quickly, our Modal blend is designed to last.",
      },
      {
        q: "Will the colour fade over time?",
        a: "Modal fibres have excellent dye uptake due to their smooth fibre structure, meaning colour is absorbed deeply and evenly. We work with mills that use high-quality dyeing and finishing processes to ensure your Primera pieces retain their richness wash after wash. Wash in cold water, turn inside out, and avoid prolonged exposure to direct sunlight or harsh detergents.",
      },
      {
        q: "How long will it last?",
        a: "With proper care, your Primera piece is built to comfortably withstand 100+ washes — approximately 2 to 4 years of regular weekly wear.",
      },
      {
        q: "Does it shed microplastics?",
        a: "No. Modal is derived from beech tree pulp and is not a petroleum-based synthetic fibre. Unlike polyester or nylon, it does not shed plastic microfibres during washing.",
      },
      {
        q: "Does it lose its shape over time?",
        a: "Not with proper care. Our garments are engineered with a knit construction and finishing process specifically designed to maintain structure and drape over time.",
      },
    ],
  },
  {
    heading: "Bamboo Blend — Motion & Trousers",
    note: "Applies to The Primera Trousers, Motion Training Tee, and Motion Training Tee Pro Fit",
    items: [
      {
        q: "What is a Bamboo blend?",
        a: "Our Bamboo blend combines bamboo-derived fibres with carefully selected materials to create a fabric that is highly breathable, moisture-wicking, and smooth against the skin. It is designed to feel elevated while performing reliably through movement and daily wear.",
      },
      {
        q: "Why does Primera use bamboo for Motion and Trousers?",
        a: "We wanted the Motion collection and Trousers to feel as good during activity as they do the rest of the day. Bamboo brought the breathability and moisture management needed for movement, with a softness and natural feel that synthetics cannot replicate.",
      },
      {
        q: "Will sweat marks show easily?",
        a: "This depends more on colour than fabric. The bamboo blend is highly moisture-wicking, meaning it actively moves sweat away from the skin rather than letting it sit on the surface.",
      },
      {
        q: "Will it shrink?",
        a: "Our bamboo blend fabric goes through repeated washing, relaxation, and stabilisation at the mill before production. This significantly reduces post-purchase shrinkage and helps your pieces maintain their intended fit through regular wear.",
      },
      {
        q: "Does it stay soft after washing?",
        a: "Yes. Our Bamboo blend maintains its softness well over time. Proper finishing and quality manufacturing preserve that smooth hand feel even after repeated laundering.",
      },
      {
        q: "How long will it last?",
        a: "With proper care, your Primera piece is built to withstand 100+ washes — roughly 2 to 4 years of regular weekly wear.",
      },
    ],
  },
  {
    heading: "Care & Sizing",
    note: null,
    items: [
      {
        q: "How should I wash my Primera pieces?",
        a: "Machine wash cold, gentle cycle. Turn the garment inside out before washing. Avoid bleach, fabric softeners, and harsh detergents. Tumble dry on low or lay flat to dry. Avoid prolonged exposure to direct sunlight. These simple steps will keep your Primera pieces feeling their best for as long as possible.",
      },
      {
        q: "What sizes do you offer?",
        a: "Primera currently offers XS, S, M, L, and XL across all styles. A detailed size guide is available on each product page to help you find your ideal fit.",
      },
      {
        q: "Do you offer Cash on Delivery?",
        a: "Yes. We offer Cash on Delivery across India. Please note that a COD handling fee of ₹40 is added to your order at checkout.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery takes 3–7 days depending on your city (₹89). Fast delivery takes 1–2 days (₹159). Orders above ₹4999 qualify for free standard delivery.",
      },
    ],
  },
];

function PlusMinus({ open }) {
  return (
    <span className="relative ml-5 mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
      <span className="absolute h-px w-3.5 bg-charcoal" />
      <motion.span
        initial={false}
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute h-3.5 w-px bg-charcoal"
      />
    </span>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-stone/70">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
      >
        <span className="font-sans text-[15px] font-medium leading-snug text-charcoal transition-colors group-hover:text-ink md:text-base">
          {item.q}
        </span>
        <PlusMinus open={open} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p
          className={`max-w-2xl pb-7 pr-6 font-sans text-[15px] font-normal leading-[1.85] ${ANSWER}`}
        >
          {item.a}
        </p>
      </motion.div>
    </div>
  );
}

export default function FaqView() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-28 md:pb-36">
      {SECTIONS.map((section, si) => (
        <div key={section.heading} className={si === 0 ? "" : "mt-16 md:mt-24"}>
          <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
            {section.heading}
          </h2>
          {section.note && (
            <p className="mt-2 font-serif text-[17px] italic text-charcoal/55">
              {section.note}
            </p>
          )}

          <div className="mt-6 border-t border-stone/70 md:mt-8">
            {section.items.map((item, ii) => {
              const id = `${si}-${ii}`;
              return (
                <FaqItem
                  key={id}
                  item={item}
                  open={openId === id}
                  onToggle={() => setOpenId(openId === id ? null : id)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
