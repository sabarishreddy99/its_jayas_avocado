import type { ReactNode } from "react";
import type { T } from "@/data/vrfbricks/copy";

/**
 * Single source of truth for VRF Bricks navigation.
 *
 * Mirrors `lib/gradevitian/nav.tsx`: the nav, the mobile drawer, the footer and
 * the 404 recovery grid all derive from this one list, so a page added here
 * appears everywhere automatically.
 *
 * Hrefs are written CLEAN ("/bricks/"). `VRFLink` prepends the "/vrfbricks"
 * prefix only when the page is mounted under the main domain.
 */
export interface VRFNavItem {
  href: string;
  label: T;
  /** One line, shown under the label in the desktop dropdown and drawer. */
  desc: T;
  icon: ReactNode;
}

const ic = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const VRF_NAV: VRFNavItem[] = [
  {
    href: "/",
    label: { en: "Home", te: "హోమ్" },
    desc: { en: "The yard, and how we make a brick", te: "ప్రాంగణం, ఇటుక తయారీ విధానం" },
    icon: (
      <svg {...ic}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    href: "/bricks/",
    label: { en: "Our Bricks", te: "మా ఇటుకలు" },
    desc: { en: "Sizes, specs and a quantity calculator", te: "కొలతలు, వివరాలు, కాలిక్యులేటర్" },
    icon: (
      <svg {...ic}>
        <rect x="2" y="6" width="9" height="5.5" rx="0.5" />
        <rect x="13" y="6" width="9" height="5.5" rx="0.5" />
        <rect x="7.5" y="13" width="9" height="5.5" rx="0.5" />
      </svg>
    ),
  },
  {
    href: "/why-fly-ash/",
    label: { en: "Why Fly Ash", te: "ఫ్లై యాష్ ఎందుకు" },
    desc: { en: "The honest comparison with red clay", te: "ఎర్ర ఇటుకతో నిజాయితీ పోలిక" },
    icon: (
      <svg {...ic}>
        <path d="M12 3v18" />
        <path d="M5 8H3l3-5 3 5H7" />
        <path d="M17 8h-2l3-5 3 5h-2" />
        <path d="M3 21h18" />
        <path d="M6 3v5M18 3v5" />
      </svg>
    ),
  },
  {
    href: "/delivery/",
    label: { en: "Delivery", te: "డెలివరీ" },
    desc: { en: "Truck loads, lead time and charges", te: "ట్రక్కు లోడ్లు, సమయం, ఛార్జీలు" },
    icon: (
      <svg {...ic}>
        <path d="M1 4h13v12H1z" />
        <path d="M14 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2" />
        <circle cx="17.5" cy="18.5" r="2" />
      </svg>
    ),
  },
  {
    href: "/visit/",
    label: { en: "Visit Us", te: "సందర్శించండి" },
    desc: { en: "Address, hours and how to reach us", te: "చిరునామా, సమయాలు, సంప్రదింపు" },
    icon: (
      <svg {...ic}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];
