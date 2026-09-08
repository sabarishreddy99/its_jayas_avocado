import experienceJson from "@/data/knowledge/experience.json";

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  description: string;
  bullets: string[];
  tech?: string;
  /**
   * Surface this role in the home page's selected-experience strip. Curated,
   * not derived: the strip is meant to be two-to-four roles that map to the
   * work he wants next, so a real-but-off-target role (the TA post) is left
   * for /experience rather than promoted to the front page.
   */
  featured?: boolean;
}

export const experience = experienceJson as Experience[];
