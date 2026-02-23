"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  VIBE_PRESETS,
  DEFAULT_ACCENT,
  STORAGE_KEY,
  loadVibeColour,
  saveVibeColour,
  meetsContrastAA,
  oklchToHex,
  hexToOklch,
} from "@/lib/vibe";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VIBE_CHANGE_EVENT = "vibe-change";

/** Apply accent colour to :root — only sets --accent so CSS color-mix() formulas derive the rest */
function applyAccent(hex: string) {
  const el = document.documentElement;
  el.style.setProperty("--accent", hex);
  // Keep related vars in sync so Tailwind classes using these tokens update
  el.style.setProperty("--primary", hex);
  el.style.setProperty("--ring", hex);
  el.style.setProperty("--chart-1", hex);
  el.style.setProperty("--sidebar-primary", hex);
  el.style.setProperty("--sidebar-accent", hex);
  el.style.setProperty("--sidebar-ring", hex);
}

/** Generate a spectrum of hues at fixed lightness/chroma for the slider track */
function buildSpectrumGradient(): string {
  const stops: string[] = [];
  const { l, c } = hexToOklch(DEFAULT_ACCENT);
  for (let h = 0; h <= 360; h += 15) {
    stops.push(oklchToHex(l, c, h));
  }
  return `linear-gradient(to right, ${stops.join(", ")})`;
}

const SPECTRUM_GRADIENT = buildSpectrumGradient();

// ---------------------------------------------------------------------------
// External-store hook for accent colour (syncs across tabs + same tab)
// ---------------------------------------------------------------------------

function subscribeAccent(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(VIBE_CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(VIBE_CHANGE_EVENT, cb);
  };
}

function useAccent() {
  return useSyncExternalStore(subscribeAccent, loadVibeColour, () => DEFAULT_ACCENT);
}

// ---------------------------------------------------------------------------
// useMediaQuery – SSR-safe via useSyncExternalStore
// ---------------------------------------------------------------------------

function subscribeMediaQuery(cb: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribeMediaQuery, getDesktopSnapshot, () => false);
}

// ---------------------------------------------------------------------------
// Shared drawer content
// ---------------------------------------------------------------------------

function DrawerContent({
  accent,
  onSelect,
  onClose,
  onPresetKeyDown,
}: {
  accent: string;
  onSelect: (hex: string) => void;
  onClose: () => void;
  onPresetKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [contrastWarning, setContrastWarning] = useState<string | null>(null);

  // Derive slider hue from current accent
  const currentHue = hexToOklch(accent).h;

  const handlePresetClick = useCallback(
    (hex: string) => {
      if (!meetsContrastAA(hex)) {
        setContrastWarning(`${hex} does not meet WCAG AA contrast requirements`);
        return;
      }
      setContrastWarning(null);
      onSelect(hex);
    },
    [onSelect],
  );

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const hue = Number(e.target.value);
      const { l, c } = hexToOklch(DEFAULT_ACCENT);
      let hex = oklchToHex(l, c, hue);

      if (!meetsContrastAA(hex)) {
        let testL = l;
        while (!meetsContrastAA(hex) && testL < 0.95) {
          testL += 0.02;
          hex = oklchToHex(testL, c, hue);
        }
        if (!meetsContrastAA(hex)) {
          setContrastWarning("No accessible colour found at this hue");
          return;
        }
        setContrastWarning("Adjusted for WCAG AA contrast");
      } else {
        setContrastWarning(null);
      }

      onSelect(hex);
    },
    [onSelect],
  );

  const isDefault = accent.toLowerCase() === DEFAULT_ACCENT.toLowerCase();

  return (
    <div data-slot="vibe-drawer" className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Choose your vibe</h3>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          aria-label="Close vibe drawer"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Preset grid */}
      <div
        className="grid grid-cols-4 gap-2"
        role="radiogroup"
        aria-label="Colour presets"
        onKeyDown={onPresetKeyDown}
      >
        {VIBE_PRESETS.map((preset) => {
          const isActive = accent.toLowerCase() === preset.hex.toLowerCase();
          return (
            <button
              key={preset.hex}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => handlePresetClick(preset.hex)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors outline-none",
                "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                isActive
                  ? "border-white/20 bg-white/10 text-foreground"
                  : "border-transparent bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground",
              )}
            >
              <span
                className="inline-block size-5 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: preset.hex }}
                aria-hidden="true"
              />
              <span className="font-mono leading-none">{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Spectrum slider */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="vibe-spectrum"
          className="text-xs text-muted-foreground"
        >
          Custom colour
        </label>
        <div className="relative h-8 rounded-full" style={{ background: SPECTRUM_GRADIENT }}>
          <input
            ref={sliderRef}
            id="vibe-spectrum"
            type="range"
            min={0}
            max={360}
            step={1}
            value={Math.round(currentHue < 0 ? currentHue + 360 : currentHue)}
            onChange={handleSliderChange}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-current [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-current"
            style={{ color: accent }}
            aria-label="Colour spectrum"
          />
        </div>
      </div>

      {/* Contrast warning */}
      {contrastWarning && (
        <p className="text-xs text-amber-400" role="alert">
          {contrastWarning}
        </p>
      )}

      {/* Current colour display + reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-3 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <span className="font-mono text-xs text-muted-foreground">
            {accent.toLowerCase()}
          </span>
        </div>
        {!isDefault && (
          <button
            type="button"
            onClick={() => onSelect(DEFAULT_ACCENT)}
            className="text-xs text-muted-foreground underline decoration-transparent transition-colors hover:text-foreground hover:decoration-current outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded"
          >
            Reset to Mint
          </button>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VibeDrawer (responsive: Dialog on mobile, Popover on desktop)
// ---------------------------------------------------------------------------

export default function VibeDrawer({
  open,
  onOpenChange,
  anchorRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
}) {
  const accent = useAccent();
  const isDesktop = useIsDesktop();

  // Apply stored accent on mount so colours persist across page reloads
  useEffect(() => {
    const stored = loadVibeColour();
    if (stored !== DEFAULT_ACCENT) {
      applyAccent(stored);
    }
  }, []);

  const handleSelect = useCallback(
    (hex: string) => {
      applyAccent(hex);
      saveVibeColour(hex);
      // Notify same-tab subscribers (StorageEvent only fires in other tabs)
      window.dispatchEvent(new Event(VIBE_CHANGE_EVENT));
    },
    [],
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Tab sync: listen for storage events to update CSS vars from other tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY && e.newValue) {
        applyAccent(e.newValue);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Keyboard: arrow keys navigate presets when focused
  const handlePresetKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.role !== "radio") return;
      const buttons = Array.from(
        target.parentElement?.querySelectorAll<HTMLElement>('[role="radio"]') ?? [],
      );
      const idx = buttons.indexOf(target);
      if (idx === -1) return;

      let next = -1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next = (idx + 1) % buttons.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        next = (idx - 1 + buttons.length) % buttons.length;
      }

      const btn = next !== -1 ? buttons[next] : undefined;
      if (btn) {
        e.preventDefault();
        btn.focus();
        btn.click();
      }
    },
    [],
  );

  const content = (
    <DrawerContent
      accent={accent}
      onSelect={handleSelect}
      onClose={handleClose}
      onPresetKeyDown={handlePresetKeyDown}
    />
  );

  // ---- Mobile: Dialog bottom sheet ----
  if (!isDesktop) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop
            data-slot="vibe-drawer-backdrop"
            className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/60 duration-200"
          />
          <DialogPrimitive.Popup
            data-slot="vibe-drawer-popup"
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#0a0a0a] p-5 pb-8",
              "ring-1 ring-white/10",
              "data-open:animate-in data-closed:animate-out",
              "data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
              "data-open:duration-300 data-open:ease-out",
              "data-closed:duration-200 data-closed:ease-in",
              "max-h-[80dvh] overflow-y-auto",
            )}
          >
            <DialogPrimitive.Title className="sr-only">
              Vibe colour picker
            </DialogPrimitive.Title>
            {content}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }

  // ---- Desktop: Popover ----
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="top"
          align="center"
          sideOffset={12}
          anchor={anchorRef}
        >
          <PopoverPrimitive.Popup
            data-slot="vibe-drawer-popup"
            className={cn(
              "z-50 w-72 rounded-xl bg-[#0a0a0a] p-5",
              "ring-1 ring-white/10",
              "data-open:animate-in data-closed:animate-out",
              "data-open:fade-in-0 data-open:zoom-in-95",
              "data-closed:fade-out-0 data-closed:zoom-out-95",
              "duration-150",
            )}
          >
            <PopoverPrimitive.Title className="sr-only">
              Vibe colour picker
            </PopoverPrimitive.Title>
            {content}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
