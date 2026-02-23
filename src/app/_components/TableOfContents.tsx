"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// External store for headings — avoids setState-in-effect
let cachedHeadings: TocItem[] = [];
const listeners = new Set<() => void>();

function getSnapshot() {
  return cachedHeadings;
}

function getServerSnapshot() {
  return [] as TocItem[];
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function refreshHeadings() {
  const elements = document.querySelectorAll("article h2, article h3");
  const next = Array.from(elements)
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? (2 as const) : (3 as const),
    }));
  if (
    next.length !== cachedHeadings.length ||
    next.some((h, i) => h.id !== cachedHeadings[i]?.id)
  ) {
    cachedHeadings = next;
    for (const cb of listeners) cb();
  }
}

export default function TableOfContents({
  variant,
}: {
  variant: "mobile" | "desktop";
}) {
  const headings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    refreshHeadings();

    const items = cachedHeadings;
    if (items.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const tocLinks = (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(h.id)
                ?.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            }}
            className={`block transition-colors duration-200 hover:text-accent ${
              activeId === h.id
                ? "font-medium text-accent"
                : "text-muted-foreground"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "mobile") {
    return (
      <div className="mb-8 rounded-lg border border-border p-4 min-[1200px]:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-2 text-sm font-medium text-foreground"
          aria-expanded={isOpen}
        >
          <List className="size-4" aria-hidden="true" />
          Table of Contents
          <span className="ml-auto text-muted-foreground">
            {isOpen ? "\u2212" : "+"}
          </span>
        </button>
        {isOpen && (
          <nav aria-label="Table of contents" className="mt-3">
            {tocLinks}
          </nav>
        )}
      </div>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto min-[1200px]:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      {tocLinks}
    </nav>
  );
}
