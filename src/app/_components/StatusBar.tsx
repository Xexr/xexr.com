"use client";

import { useSyncExternalStore } from "react";
import { loadVibeColour } from "@/lib/vibe";

const FIRST_VISIT_KEY = "xexr-statusbar-seen";

// --- accent store (syncs with localStorage + same-tab vibe changes) ---

const VIBE_CHANGE_EVENT = "vibe-change";

function subscribeAccent(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(VIBE_CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(VIBE_CHANGE_EVENT, cb);
  };
}

// --- pulse store (one-shot first-visit check) ---

let pulseValue: boolean | undefined;

function getPulseSnapshot() {
  if (pulseValue === undefined) {
    try {
      if (!localStorage.getItem(FIRST_VISIT_KEY)) {
        localStorage.setItem(FIRST_VISIT_KEY, "1");
        pulseValue = true;
      } else {
        pulseValue = false;
      }
    } catch {
      pulseValue = false;
    }
  }
  return pulseValue;
}

const noop = () => {
  /* no-op: pulse never changes after initial read */
};
function subscribePulse() {
  return noop;
}

export default function StatusBar({
  onVibeClick,
  buttonRef,
}: {
  onVibeClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const accent = useSyncExternalStore(
    subscribeAccent,
    loadVibeColour,
    () => null as string | null,
  );
  const showPulse = useSyncExternalStore(
    subscribePulse,
    getPulseSnapshot,
    () => false,
  );

  if (!accent) return null;

  const hexLabel = accent.replace("#", "").toLowerCase();

  return (
    <div
      data-slot="status-bar"
      className="fixed bottom-0 left-0 z-50 flex h-10 w-full items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm"
      style={{ borderTop: "1px solid oklch(1 0 0 / 8%)" }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={onVibeClick}
        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--muted-foreground)] transition-colors hover:bg-white/10 hover:text-[var(--foreground)] ${showPulse ? "status-bar-pulse" : ""}`}
      >
        <span
          className="inline-block size-2.5 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        vibe #{hexLabel}
      </button>
    </div>
  );
}
