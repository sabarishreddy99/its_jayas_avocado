"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Form primitives for VRF Bricks.
 *
 * The calculator and the quote composer previously used bare `<select>` and
 * `<input>` elements, which render as OS widgets and looked nothing like the
 * rest of the site. These match the portfolio's vocabulary instead: pill and
 * rounded-xl geometry, `ring-1 ring-border` edges, `bg-surface-raised` fills,
 * and the same glassy `bg-surface/95 backdrop-blur-[14px]` dropdown panel the
 * nav menus use.
 *
 * VRFSelect is a real listbox rather than a styled native select, because a
 * native one cannot show a second line per option, and a brick is chosen by
 * its dimensions as much as by its name.
 */

// ── Label ────────────────────────────────────────────────────────────────────

export function VRFLabel({
  htmlFor, children, hint,
}: { htmlFor?: string; children: React.ReactNode; hint?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-baseline justify-between gap-3 text-nano font-semibold uppercase tracking-[0.14em] text-fg-subtle"
    >
      <span>{children}</span>
      {hint && <span className="font-medium normal-case tracking-normal text-fg-faint">{hint}</span>}
    </label>
  );
}

// ── Input, with an optional trailing unit ────────────────────────────────────

export function VRFInput({
  id, value, onChange, placeholder, unit, type = "text", inputMode, min, step, autoComplete,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** Trailing unit chip, e.g. "square feet". */
  unit?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "decimal";
  min?: string;
  step?: string;
  autoComplete?: string;
}) {
  return (
    <div className="group flex items-stretch overflow-hidden rounded-xl bg-surface-raised ring-1 ring-border transition-all duration-200 focus-within:ring-2 focus-within:ring-accent hover:ring-fg-muted">
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        min={min}
        step={step}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-4 py-3.5 text-[1rem] font-medium text-fg outline-none placeholder:text-fg-faint"
      />
      {unit && (
        <span className="flex shrink-0 items-center whitespace-nowrap border-l border-border px-3.5 text-[0.85rem] font-medium text-fg-subtle">
          {unit}
        </span>
      )}
    </div>
  );
}

// ── Select ───────────────────────────────────────────────────────────────────

export interface VRFOption {
  value: string;
  /** Primary line. */
  label: string;
  /** Optional second line, e.g. the brick's dimensions. */
  sub?: string;
}

export function VRFSelect({
  id, value, onChange, options, placeholder = "Select",
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: VRFOption[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const listId = `${uid}-list`;

  const selectedIdx = options.findIndex((o) => o.value === value);
  const selected = selectedIdx >= 0 ? options[selectedIdx] : null;

  // Open on the current selection rather than the top of the list.
  const openList = () => {
    setActiveIdx(selectedIdx >= 0 ? selectedIdx : 0);
    setOpen(true);
  };

  const commit = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the active option in view while arrowing through a long list
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIdx]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIdx((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIdx((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIdx(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIdx(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(activeIdx);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl bg-surface-raised px-4 py-3.5 text-left ring-1 transition-all duration-200 ${
          open ? "ring-2 ring-accent" : "ring-border hover:ring-fg-muted"
        }`}
      >
        <span className="min-w-0">
          <span className={`block truncate text-[1rem] font-medium ${selected ? "text-fg" : "text-fg-faint"}`}>
            {selected ? selected.label : placeholder}
          </span>
          {selected?.sub && (
            <span className="mt-0.5 block truncate text-[0.8rem] tabular-nums text-fg-subtle">
              {selected.sub}
            </span>
          )}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-fg-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Panel. Same glass treatment as the nav dropdowns. */}
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-activedescendant={open ? `${uid}-opt-${activeIdx}` : undefined}
        tabIndex={-1}
        className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-72 origin-top overflow-y-auto rounded-xl bg-surface/95 p-1.5 ring-1 ring-border backdrop-blur-[14px] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] [box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.12),0_2px_8px_-2px_rgb(0_0_0/0.06)] dark:[box-shadow:0_8px_32px_-8px_rgb(0_0_0/0.5),0_2px_8px_-2px_rgb(0_0_0/0.3)] ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {options.map((o, i) => {
          const isSelected = o.value === value;
          const isActive = i === activeIdx;
          return (
            <li
              key={o.value}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => commit(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                isActive ? "bg-surface-raised" : ""
              }`}
            >
              <span className="min-w-0">
                <span className={`block truncate text-[0.92rem] leading-tight ${isSelected ? "font-semibold text-fg" : "font-medium text-fg-muted"}`}>
                  {o.label}
                </span>
                {o.sub && (
                  <span className="mt-0.5 block truncate text-[0.78rem] leading-tight tabular-nums text-fg-faint">
                    {o.sub}
                  </span>
                )}
              </span>
              {isSelected && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className="shrink-0 text-accent" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
