import React from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
  streaming?: boolean;
}

// ── Inline formatter ─────────────────────────────────────────────────────────
// Handles: **bold**, *italic*, `code`, [text](url), bare URLs

const INLINE = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+))/g;

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  INLINE.lastIndex = 0;

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${match.index}`;

    if (match[2] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold text-zinc-900">{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      nodes.push(<em key={key}>{match[3]}</em>);
    } else if (match[4] !== undefined) {
      nodes.push(<code key={key} className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] font-mono text-zinc-700">{match[4]}</code>);
    } else if (match[5] !== undefined) {
      nodes.push(<a key={key} href={match[6]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-indigo-600 hover:text-indigo-800 transition-colors">{match[5]}</a>);
    } else if (match[7] !== undefined) {
      nodes.push(<a key={key} href={match[7]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-indigo-600 hover:text-indigo-800 break-all transition-colors">{match[7]}</a>);
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// ── Block renderer ────────────────────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line — skip
    if (line.trim() === "") { i++; continue; }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <p key={k++} className="font-semibold text-zinc-900 mt-2 mb-0.5 text-[13px]">
          {inline(line.slice(4), String(k))}
        </p>
      );
      i++; continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <p key={k++} className="font-bold text-zinc-950 mt-2 mb-1 text-sm">
          {inline(line.slice(3), String(k))}
        </p>
      );
      i++; continue;
    }

    // Bullet list
    if (/^[-*]\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        const idx = i;
        items.push(
          <li key={idx} className="flex gap-2">
            <span className="mt-[5px] w-1 h-1 rounded-full bg-zinc-400 shrink-0" />
            <span>{inline(lines[i].replace(/^[-*]\s/, ""), `li-${idx}`)}</span>
          </li>
        );
        i++;
      }
      elements.push(<ul key={k++} className="space-y-1 my-1 text-zinc-700">{items}</ul>);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = [];
      let num = 1;
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const idx = i;
        items.push(
          <li key={idx} className="flex gap-2">
            <span className="shrink-0 text-zinc-400 text-[11px] font-mono mt-px">{num++}.</span>
            <span>{inline(lines[i].replace(/^\d+\.\s/, ""), `ol-${idx}`)}</span>
          </li>
        );
        i++;
      }
      elements.push(<ol key={k++} className="space-y-1 my-1 text-zinc-700">{items}</ol>);
      continue;
    }

    // Divider
    if (line.trim() === "---") {
      elements.push(<hr key={k++} className="border-zinc-200 my-2" />);
      i++; continue;
    }

    // Paragraph — collect consecutive plain lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3}\s|[-*]\s|\d+\.\s|---)/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      const combined = paraLines.join("\n");
      const parts: React.ReactNode[] = [];
      combined.split("\n").forEach((ln, li) => {
        if (li > 0) parts.push(<br key={`br-${k}-${li}`} />);
        parts.push(...inline(ln, `p-${k}-${li}`));
      });
      elements.push(<p key={k++} className="leading-relaxed">{parts}</p>);
    }
  }

  return <div className="space-y-1.5">{elements}</div>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatMessage({ message, streaming }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] sm:max-w-[70%] rounded-2xl rounded-tr-sm bg-zinc-950 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-base mt-0.5" title="Avocado">
        🥑
      </div>
      <div className="max-w-[80%] sm:max-w-[75%] rounded-2xl rounded-tl-sm border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 shadow-sm">
        {streaming && !message.content ? (
          <span className="inline-flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <>
            {renderMarkdown(message.content)}
            {streaming && <span className="cursor-blink ml-0.5 text-zinc-400">|</span>}
          </>
        )}
      </div>
    </div>
  );
}
