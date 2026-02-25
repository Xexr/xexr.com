"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { loadVibeColour } from "@/lib/vibe";
import VibeDrawer from "./VibeDrawer";

const VIBE_CHANGE_EVENT = "vibe-change";

function subscribeAccent(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(VIBE_CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(VIBE_CHANGE_EVENT, cb);
  };
}

export default function VibePill() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const accent = useSyncExternalStore(
    subscribeAccent,
    loadVibeColour,
    () => null as string | null,
  );

  if (!accent) return null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        aria-label={`Change vibe colour, currently ${accent}`}
      >
        <span
          className="inline-block size-2 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        vibe
      </button>
      <VibeDrawer
        open={open}
        onOpenChange={setOpen}
        anchorRef={buttonRef}
      />
    </>
  );
}
