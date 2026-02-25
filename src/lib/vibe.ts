export type VibePreset = { name: string; hex: string };

export const DEFAULT_ACCENT = "#00ff88";
export const STORAGE_KEY = "xexr-vibe";
export const PULSE_VALUE = "pulse";

export const VIBE_PRESETS: VibePreset[] = [
  { name: "Mint", hex: "#00ff88" },
  { name: "Coral", hex: "#ff6b6b" },
  { name: "Gold", hex: "#ffd700" },
  { name: "Cyan", hex: "#00e5ff" },
  { name: "Violet", hex: "#a78bfa" },
  { name: "Rose", hex: "#f472b6" },
  { name: "Lime", hex: "#a3e635" },
  { name: "Sky", hex: "#38bdf8" },
  { name: "Ember", hex: "#fb923c" },
];

// --- localStorage helpers ---

export function loadVibeRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function loadVibeColour(): string {
  const raw = loadVibeRaw();
  return raw === PULSE_VALUE ? DEFAULT_ACCENT : raw;
}

export function isVibePulse(): boolean {
  return loadVibeRaw() === PULSE_VALUE;
}

export function saveVibeColour(hex: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, hex);
  } catch {
    // silent skip on failure (e.g. SSR, private browsing)
  }
}

// --- Colour parsing ---

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// --- sRGB gamma ---

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
}

// --- WCAG contrast ---

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  );
}

export function checkContrast(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsContrastAA(hex: string): boolean {
  return checkContrast(hex, "#050505") >= 4.5;
}

// --- Oklab / Oklch conversion ---

export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const [sr, sg, sb] = hexToRgb(hex);
  const r = srgbToLinear(sr);
  const g = srgbToLinear(sg);
  const b = srgbToLinear(sb);

  // Linear sRGB → LMS
  const l_ = Math.cbrt(
    0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b,
  );
  const m_ = Math.cbrt(
    0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b,
  );
  const s_ = Math.cbrt(
    0.0883024619 * r + 0.2024326663 * g + 0.6892648718 * b,
  );

  // LMS' → Oklab
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const ob = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // Oklab → Oklch
  const C = Math.sqrt(a * a + ob * ob);
  const H = (Math.atan2(ob, a) * 180) / Math.PI;

  return { l: L, c: C, h: H < 0 ? H + 360 : H };
}

export function oklchToHex(l: number, c: number, h: number): string {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const ob = c * Math.sin(hRad);

  // Oklab → LMS'
  const l_ = l + 0.3963377774 * a + 0.2158037573 * ob;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * ob;
  const s_ = l - 0.0894841775 * a - 1.291485548 * ob;

  // LMS' → LMS (cube)
  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;

  // LMS → Linear sRGB
  const r = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const g = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const b = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;

  return rgbToHex(linearToSrgb(r), linearToSrgb(g), linearToSrgb(b));
}

// --- Accent CSS variable derivation ---

export function deriveAccentVars(hex: string): Record<string, string> {
  const { l, c, h } = hexToOklch(hex);

  return {
    "--accent": hex,
    "--accent-dim": oklchToHex(l * 0.7, c * 0.6, h),
    "--accent-soft": oklchToHex(Math.min(l * 1.3, 0.92), c * 0.25, h),
    "--accent-glow": oklchToHex(Math.min(l * 1.1, 0.95), c * 1.2, h),
  };
}
