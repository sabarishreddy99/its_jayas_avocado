export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

const SESSION_ID_KEY = "jsr_session_id";
const MESSAGES_KEY   = "jsr_chat_messages";

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function saveMessages(messages: StoredMessage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function loadMessages(): StoredMessage[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    return raw ? (JSON.parse(raw) as StoredMessage[]) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MESSAGES_KEY);
}
