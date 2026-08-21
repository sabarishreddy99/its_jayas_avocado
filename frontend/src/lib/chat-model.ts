/**
 * The backend reports the answering model as a raw `provider:model` id
 * (`gemini:gemini-2.5-flash`). That string is a deploy detail, not something to
 * show a recruiter, and it was rendering verbatim in two places at once.
 * One formatter, one presentation.
 */
export function formatModel(raw: string | null | undefined, fallback = "Gemini"): string {
  if (!raw) return fallback;
  const model = raw.includes(":") ? raw.slice(raw.indexOf(":") + 1) : raw;
  return model
    .split("-")
    .filter(Boolean)
    .map((part) => (/^\d/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");
}
