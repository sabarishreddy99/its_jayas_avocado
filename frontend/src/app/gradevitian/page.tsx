import type { Metadata } from "next";
import GVHome from "@/components/gradevitian/GVHome";
import GVJsonLd from "@/components/gradevitian/GVJsonLd";
import GVFaq, { type FaqItem } from "@/components/gradevitian/GVFaq";
import { gvUrl, toolListLd, GV_AUTHOR, GV_TITLE } from "@/lib/gradevitian/seo";

// The home targets the brand query ("gradevitian"); each tool page owns its head
// term ("VIT GPA calculator"). `absolute` stops the ROOT layout's
// "%s | Jaya Sabarish Reddy Remala" template from being appended here.
export const metadata: Metadata = {
  title: { absolute: GV_TITLE },
  alternates: { canonical: gvUrl("/") },
};

const TOOLS = [
  { path: "/gpa", name: "VIT GPA Calculator", description: "Compute your semester GPA from grades and credits on VIT's 10-point scale." },
  { path: "/cgpa", name: "VIT CGPA Calculator", description: "Build your cumulative CGPA semester by semester, or get it instantly." },
  { path: "/grade-predictor", name: "VIT Grade Predictor", description: "Predict your final grade from CAT, DA, FAT, lab and J-component marks." },
  { path: "/cgpa-estimator", name: "VIT CGPA Estimator", description: "Find the GPA you need next semester to reach your target CGPA." },
  { path: "/attendance", name: "VIT Attendance Calculator", description: "Track your attendance percentage and stay above VIT's 75% line." },
  { path: "/planner", name: "VIT Semester Planner", description: "Plan courses, credits, grades and attendance for a whole semester with live GPA." },
  { path: "/cgpa-goal", name: "VIT CGPA Goal Tracker", description: "Set a target CGPA and see the GPA each remaining semester needs." },
  { path: "/rules", name: "VIT Academic Regulations", description: "Grade scale, attendance, CGPA and academic rules from VIT's official regulations." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "gradeVITian",
  url: gvUrl("/"),
  description:
    "Free GPA, CGPA, grade prediction, CGPA estimation and attendance calculators for VIT students. A high-traffic PWA scaled to 17K+ monthly active users.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any (web browser)",
  browserRequirements: "Requires JavaScript",
  inLanguage: "en",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: GV_AUTHOR,
  featureList: TOOLS.map((t) => t.name),
};

// Mirrors the questions VITians actually type into Google. Visible on the page
// (Google requires it) and emitted as FAQPage JSON-LD by GVFaq.
const FAQ: FaqItem[] = [
  { q: "How do I calculate my GPA at VIT?", a: "Multiply each course's grade point (S=10, A=9, B=8, C=7, D=6, E=5, F/N=0) by its credits, add those up, and divide by your total credits for the semester. The gradeVITian GPA calculator does it as you type." },
  { q: "How do I calculate my CGPA at VIT?", a: "CGPA is the same credit-weighted average, taken across every semester you've completed rather than just one. Enter each semester's GPA and credits in the CGPA calculator and it updates instantly." },
  { q: "What is the VIT grading scale?", a: "VIT uses a 10-point scale: S=10, A=9, B=8, C=7, D=6, E=5, and F or N=0. An N means reported but not cleared, and counts as 0 until you clear it." },
  { q: "How much attendance do I need at VIT?", a: "75% in every course. Fall below that and you can be debarred from that course's FAT. The attendance calculator shows exactly how many classes you can still afford to miss." },
  { q: "Is gradeVITian free?", a: "Yes. Every calculator is free, needs no sign-up, and has no ads. An optional free account just saves your calculations across devices." },
  { q: "Does gradeVITian work offline?", a: "Yes. It is an installable progressive web app, so once you add it to your home screen the calculators keep working without a connection." },
];

export default function GradeVITianHome() {
  return (
    <>
      <GVJsonLd data={[jsonLd, toolListLd(TOOLS)]} />
      <GVHome />
      <section className="mx-auto max-w-3xl px-5 pb-24">
        <GVFaq items={FAQ} title="VIT GPA, CGPA & attendance questions" />
      </section>
    </>
  );
}
