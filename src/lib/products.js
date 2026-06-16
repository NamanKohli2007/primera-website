// Single source of truth for the catalogue. Feeds the homepage Collection
// tabs, the /shop and /motion listing pages, and every individual product
// page. Each product carries both its card data (tone, swatches, note) and
// its detail-page content (why / fabric / fit / care).

// --- Colour swatches -------------------------------------------------------
// `border` is only set where the swatch would otherwise be invisible on a
// light surface (per the brand spec, only White needs one).
const C = {
  black: { name: "Black", hex: "#0a0a0a" },
  white: { name: "White", hex: "#FFFFFF", border: "#dddddd" },
  lightGrey: { name: "Light Grey", hex: "#C8C8C8" },
  skyBlue: { name: "Sky Blue", hex: "#87CEEB" },
  navy: { name: "Navy", hex: "#1B2A4A" },
  grey: { name: "Grey", hex: "#888888" },
  charcoal: { name: "Charcoal", hex: "#2a2926" },
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const CARE =
  "Machine wash cold on a gentle cycle with like colours, inside out to protect the finish. Hang to dry or tumble low. Do not bleach. Cool iron if needed — never directly on any print.";

const ESSENTIALS_FABRIC =
  "Cut from a premium plant-based blend of modal and bamboo. Modal — spun from beechwood pulp — gives a liquid-soft, fluid drape, while bamboo brings natural breathability and a subtle sheen. Together they create a fabric that feels luxurious against the skin and only improves with every wash.";

const MOTION_FABRIC =
  "Built from a technical plant-based blend that pairs bamboo with modal. Bamboo naturally wicks moisture and resists odour, while modal keeps the hand-feel soft and the drape clean. Four-way mechanical stretch is woven in for movement that never restricts, then finished so it feels like an essential — not a piece of kit.";

export const products = [
  // --- Essentials ----------------------------------------------------------
  {
    slug: "primera-tee",
    name: "Primera Tee",
    category: "essentials",
    href: "/shop/primera-tee",
    price: "$48",
    tag: "Modal Blend",
    tone: "from-[#efe9e1] to-[#ddd4c8]",
    cardDark: false,
    summary: "The everyday tee, in a buttery modal blend.",
    colors: [C.black, C.white, C.lightGrey, C.skyBlue, C.navy],
    sizes: SIZES,
    why: [
      "A modal-rich blend that feels impossibly soft from the very first wear.",
      "Holds its shape and colour wash after wash — no sag, no fade.",
      "Breathable and temperature-smart, so it works right through the year.",
    ],
    fabric: ESSENTIALS_FABRIC,
    fitDetails:
      "A clean, modern regular fit. It sits close without clinging, with a mid-weight body that drapes rather than boxes. The ribbed crew neckline recovers its shape, and the length is built to tuck in or wear loose.",
    care: CARE,
  },
  {
    slug: "henley",
    name: "The Henley",
    category: "essentials",
    href: "/shop/henley",
    price: "$62",
    tag: "Bamboo Blend",
    tone: "from-[#e6ded3] to-[#cdbfae]",
    cardDark: false,
    summary: "A quiet upgrade. Bamboo-soft, built to last.",
    colors: [C.black, C.white, C.lightGrey, C.skyBlue, C.navy],
    sizes: SIZES,
    why: [
      "Bamboo-led blend with a refined hand-feel and a soft natural sheen.",
      "A three-button placket that dresses the everyday up just enough.",
      "Breathable and quick to recover, so it stays sharp all day.",
    ],
    fabric: ESSENTIALS_FABRIC,
    fitDetails:
      "A relaxed regular fit through the body, finished with a three-button placket and tonal stitching. Soft ribbed cuffs and a slightly longer hem give it an easy, layered look worn open or closed.",
    care: CARE,
  },
  {
    slug: "trousers",
    name: "The Trousers",
    category: "essentials",
    href: "/shop/trousers",
    price: "$98",
    tag: "Modal Blend",
    tone: "from-[#e2dcd2] to-[#c8bba8]",
    cardDark: false,
    summary: "Refined enough for anywhere. Soft enough for everywhere.",
    colors: [C.black, C.grey],
    sizes: SIZES,
    why: [
      "A tailored line with the comfort of a plant-based blend.",
      "Enough structure to dress up, with a quiet bit of stretch.",
      "A hidden comfort waistband that never digs in.",
    ],
    fabric: ESSENTIALS_FABRIC,
    fitDetails:
      "A tailored straight-leg cut that sits just above the hip and falls clean to a mid-break. Structured enough to dress up, with a hint of stretch and an elasticated comfort waistband concealed beneath a flat front. Finished with slant pockets and a single welt at the back.",
    care: CARE,
  },

  // --- Motion --------------------------------------------------------------
  {
    slug: "training-tee",
    name: "Training Tee",
    category: "motion",
    href: "/motion/training-tee",
    price: "$58",
    tag: "Performance Blend",
    tone: "from-[#33322e] to-[#23211e]",
    cardDark: true,
    cardNote: "Relaxed through the body, fitted through the arms",
    summary: "Relaxed through the body, fitted through the arms.",
    colors: [C.black, C.charcoal],
    sizes: SIZES,
    why: [
      "Plant-based performance fabric that wicks sweat and resists odour.",
      "Four-way stretch that moves through every range of motion.",
      "Soft enough to keep wearing long after the session ends.",
    ],
    fabric: MOTION_FABRIC,
    fitDetails:
      "Relaxed through the body for unrestricted movement, with a slightly fitted arm that keeps a sharp line. Engineered flatlock seams sit flush against the skin to prevent chafing on longer sessions, and a dropped, curved hem stays put through every rep.",
    care: CARE,
  },
  {
    slug: "training-tee-athletic-fit",
    name: "Training Tee — Athletic Fit",
    category: "motion",
    href: "/motion/training-tee-athletic-fit",
    price: "$58",
    tag: "Performance Blend",
    tone: "from-[#312f2b] to-[#211f1c]",
    cardDark: true,
    cardNote: "Fitted through the body and arms",
    summary: "Fitted through the body and arms.",
    colors: [C.black, C.charcoal],
    sizes: SIZES,
    why: [
      "A sharp, close cut that follows the lines of the frame.",
      "Four-way stretch and a tapered torso that never rides up.",
      "Breathable plant-based fabric that performs and recovers fast.",
    ],
    fabric: MOTION_FABRIC,
    fitDetails:
      "A true athletic cut — fitted through both the body and the arms to trace the lines of the frame. Built with four-way stretch and a tapered torso that stays locked in through every rep, with a shorter, straighter hem cut for layering and movement.",
    care: CARE,
  },
];

export const essentials = products.filter((p) => p.category === "essentials");
export const motion = products.filter((p) => p.category === "motion");

export function getProduct(category, slug) {
  return products.find((p) => p.category === category && p.slug === slug);
}
