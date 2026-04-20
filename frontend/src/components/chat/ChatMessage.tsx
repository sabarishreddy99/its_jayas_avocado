export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: Message;
  streaming?: boolean;
}

const URL_PATTERN = /https?:\/\/[^\s]+/g;

function renderWithLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  URL_PATTERN.lastIndex = 0;

  while ((match = URL_PATTERN.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const url = match[0];
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 text-indigo-600 hover:text-indigo-800 break-all transition-colors"
      >
        {url}
      </a>
    );
    last = match.index + url.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts;
}

export default function ChatMessage({ message, streaming }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] sm:max-w-[70%] rounded-2xl rounded-tr-sm bg-zinc-950 px-4 py-2.5 text-sm leading-relaxed text-white shadow-sm">
          {renderWithLinks(message.content)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-base mt-0.5" title="Avocado">
        🥑
      </div>
      <div className="max-w-[80%] sm:max-w-[75%] rounded-2xl rounded-tl-sm border border-zinc-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-800 shadow-sm">
        {streaming && !message.content ? (
          <span className="inline-flex gap-1 items-center h-4">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
          </span>
        ) : (
          <>
            {renderWithLinks(message.content)}
            {streaming && <span className="cursor-blink ml-0.5 text-zinc-400">|</span>}
          </>
        )}
      </div>
    </div>
  );
}
