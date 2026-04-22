import profileJson from "@/data/knowledge/profile.json";

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  summary: string;
  obsession: string;
  previous: string;
  prev_domain: string;
  interested_domain: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resume: string;
}

export const profile = profileJson as Profile;
