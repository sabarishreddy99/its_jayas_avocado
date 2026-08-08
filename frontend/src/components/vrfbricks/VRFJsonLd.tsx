/**
 * Emits JSON-LD structured data. Server component — the script tag ships in
 * the static HTML, which is the only way a crawler will ever see it.
 */
export default function VRFJsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // The payload is built from typed constants in this repo, never from
          // user input, so there is nothing here to escape against.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
