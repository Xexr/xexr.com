# Codebase Analysis: site-setup

**Generated:** 2026-02-23
**Source:** 3-agent parallel exploration
**Purpose:** Comprehensive context for site-setup feature implementation planning

---

## Architecture Overview

### Project Structure

**Directory layout** (`/home/xexr/gt/xexrcom/crew/deckard/`):

```
├── src/                        — All application source code
│   ├── app/                    — Next.js App Router root
│   │   ├── (app)/              — Route group: main app pages
│   │   ├── _components/        — Shared React components
│   │   ├── api/                — API route handlers
│   │   ├── layout.tsx          — Root layout (fonts, Analytics, JSON-LD, viewport)
│   │   ├── error.tsx           — Root error boundary
│   │   ├── not-found.tsx       — 404 page
│   │   ├── loading.tsx         — Root loading state
│   │   ├── sitemap.ts          — Sitemap generator
│   │   └── robots.ts           — Robots.txt generator
│   ├── lib/                    — Utilities and configuration
│   │   ├── siteConfig.ts       — Central site metadata (URL, name, social, keywords)
│   │   ├── metadata.ts         — Next.js metadata factory (generatePageMetadata)
│   │   ├── lib.ts              — Server URL resolution (multi-environment)
│   │   ├── utils.ts            — cn() className utility (clsx + tailwind-merge)
│   │   └── constants.ts        — Global constants
│   ├── styles/
│   │   └── globals.css         — Tailwind v4 @theme, OKLCh CSS variables, base styles
│   ├── types/
│   │   └── globals.d.ts        — Global TypeScript declarations
│   └── env.ts                  — T3 env with Zod validation (server + client vars)
├── public/                     — Static assets (favicons, manifest, logo)
├── plans/                      — Design/planning documents
├── next.config.ts              — Next.js config (typedRoutes, image domains)
├── tsconfig.json               — TypeScript (strict, noUncheckedIndexedAccess)
├── components.json             — shadcn CLI config (base-vega style)
├── eslint.config.mjs           — ESLint with TypeScript-ESLint + React Compiler plugin
├── prettier.config.js          — Prettier with Tailwind plugin
├── postcss.config.cjs          — PostCSS (@tailwindcss/postcss)
├── vitest.config.ts            — Unit test config (src/**/*.test.ts)
├── vitest.config.integration.ts — Integration test config (__tests__/integration/**)
├── vitest.config.e2e.ts        — E2E test config (__tests__/e2e/**)
├── vitest.config.coverage.ts   — Coverage config
├── vitest.base.ts              — Shared Vitest base (node env, globals, tsconfigPaths)
└── package.json                — pnpm workspace, scripts, dependencies
```

### _components Breakdown

```
src/app/_components/
├── Header.tsx          — Async server component: logo + MainNav (desktop) + mobile nav
├── MainNav.tsx         — Client component: route-aware nav links (navItems array empty)
├── LoadingSpinner.tsx  — SVG spinner with animate-spin
├── LoadingPage.tsx     — Full-page loading placeholder
├── ReturnToTop.tsx     — Client component: scroll-to-top button
├── example.tsx         — ExampleWrapper/Example layout helpers (for dev/storybook use)
└── ui/                 — shadcn/ui components on Base UI React:
    ├── button.tsx          — CVA variants: default/outline/secondary/ghost/destructive/link
    ├── card.tsx            — Card family (Card, CardHeader, CardTitle, etc.)
    ├── badge.tsx           — Badge component
    ├── alert-dialog.tsx    — Alert dialog
    ├── combobox.tsx        — Combobox
    ├── dropdown-menu.tsx   — Dropdown menu
    ├── field.tsx           — Form field with validation
    ├── input.tsx           — Text input
    ├── input-group.tsx     — Grouped inputs
    ├── label.tsx           — Form label
    ├── select.tsx          — Select dropdown
    ├── separator.tsx       — Divider
    └── textarea.tsx        — Textarea
```

### (app) Route Group

```
src/app/(app)/
├── layout.tsx      — Content wrapper: max-w-7xl, flex-col, renders <Header /> + <main>
├── page.tsx        — Home page (placeholder: <div>xexr.com</div>)
└── loading.tsx     — Loading state
```

### API Routes

```
src/app/api/
└── og/
    └── route.tsx   — Edge OG image generation via next/og (ImageResponse)
                      Currently uses #030712 bg + blue gradient — needs rebrand
```

### Decomposition Principles

- **Route groups** (`(app)/`) separate layout concerns from routing URL structure
- **Co-location** of components with their route (page-level components) vs shared components in `_components/`
- **Server/client split**: layouts and pages default to server components; interactive components declare `"use client"`
- **Lib layer** is pure utilities and config — no React, no side effects
- **Prefix convention**: `_components`, `_lib` underscores signal private-to-route directories

---

## Dependency Layers

```
Layer 0: External packages
    next, react, @base-ui/react, tailwindcss, zod, lucide-react,
    class-variance-authority, clsx, tailwind-merge, @vercel/analytics,
    @t3-oss/env-nextjs, geist

Layer 1: Configuration / Foundation  [no app imports]
    src/env.ts                  — validates env vars via Zod
    src/lib/siteConfig.ts       — pure object, no imports
    src/lib/utils.ts            — cn(), pure function
    src/lib/constants.ts        — empty/minimal constants
    src/lib/lib.ts              — imports env.ts
    src/styles/globals.css      — CSS only

Layer 2: Application Infrastructure
    src/lib/metadata.ts         — imports siteConfig
    src/app/layout.tsx          — imports siteConfig, metadata, env, globals.css
    src/app/(app)/layout.tsx    — imports Header
    src/app/sitemap.ts          — imports siteConfig
    src/app/robots.ts           — imports siteConfig
    src/app/api/og/route.tsx    — imports siteConfig

Layer 3: Shared UI Components  [imports from Layer 1]
    src/app/_components/ui/*    — import cn(), @base-ui/react, CVA
    src/app/_components/Header.tsx      — imports MainNav, siteConfig
    src/app/_components/MainNav.tsx     — imports cn(), Route type
    src/app/_components/ReturnToTop.tsx — imports Button

Layer 4: Pages / Features  [imports from all layers]
    src/app/(app)/page.tsx      — currently empty
    src/app/not-found.tsx       — imports Card components
    src/app/error.tsx           — imports Card components
```

### Core Package Dependencies

```
src/lib/siteConfig.ts
    ↑ referenced by: layout.tsx, metadata.ts, sitemap.ts, robots.ts, api/og/route.tsx

src/lib/utils.ts (cn function)
    ↑ referenced by: every component file

src/lib/metadata.ts (generatePageMetadata, metadata object)
    ↑ referenced by: layout.tsx (metadata export), any page with custom metadata

src/env.ts
    ↑ referenced by: src/lib/lib.ts (getServerUrl)
    — Validates NEXT_PUBLIC_URL, NEXT_PUBLIC_VERCEL_ENV, etc.
```

### Key Dependency Facts

- **Zero circular dependencies** — clean layered architecture
- **No database layer** — intentional, content is file-based (Velite-based)
- **No state management library** — React state + localStorage for Vibe system
- **No data-fetching library** (no SWR/React Query) — Next.js built-in fetch + React Server Components
- **No ORM** — no database at all
- **Dependency injection**: none formal — siteConfig is a singleton module import pattern
- The `cn()` utility is the single most-imported internal function

### Wiring Patterns

- **siteConfig** module: imported directly wherever needed (no context, no injection)
- **env**: imported by lib.ts; pages should use lib.ts not env.ts directly
- **Metadata**: root layout exports `metadata` from lib/metadata.ts; pages export their own via `generatePageMetadata`
- **Client components**: declared with `"use client"` at file top; must be leaf nodes or wrap children explicitly
- **React Compiler plugin** is enabled in ESLint — enforces Rules of React strictly

---

## Integration Surface

### Files That Will Need Modification

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/layout.tsx`

**Current state:**
- Imports `GeistSans`, `GeistMono` from `geist` package and `Roboto` from `next/font/google`
- Applies font variables: `cn(GeistSans.variable, GeistMono.variable, roboto.variable)`
- Sets `--font-sans` CSS variable via `roboto.variable`
- `viewport` export has `maximumScale: 1` (WCAG violation)
- `colorScheme: "light dark"` (should be dark-only)
- JSON-LD is `@type: "Organization"` — needs to become `@type: "WebSite"`
- `<body>` has no `id="main-content"` anchor or skip link
- No `<meta name="darkreader-lock">` in `<head>`
- No Vibe blocking script in `<head>`
- No status bar rendered at root level

**Required changes:**

1. **Font migration** — Remove `GeistSans`, `GeistMono`, and `Roboto` imports. Add:
   ```typescript
   import { Plus_Jakarta_Sans } from "next/font/google";
   import localFont from "next/font/local"; // for JetBrains Mono, or also via google
   ```
   Apply as `plusJakartaSans.variable` and `jetbrainsMono.variable` on `<html>`.

2. **Viewport fix** — Remove `maximumScale: 1`. Change `colorScheme` to `"dark"` only.

3. **JSON-LD** — Replace `Organization` schema with `WebSite`:
   ```typescript
   const jsonLd = {
     "@context": "https://schema.org",
     "@type": "WebSite",
     "@id": siteConfig.url,
     name: siteConfig.name,
     url: siteConfig.url,
     description: siteConfig.description,
     author: { "@type": "Person", name: "Dane Poyzer" },
   };
   ```

4. **Head additions** — Add inside `<head>`:
   - `<meta name="darkreader-lock" />`
   - Blocking Vibe script: reads `localStorage.getItem("xexr-vibe")`, sets `document.documentElement.style.setProperty("--accent", ...)` before first paint. Wrapped in try/catch with mint fallback.

5. **Skip-to-content link** — First child of `<body>` before `<CustomThemeProvider>`:
   ```tsx
   <a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>
   ```

6. **Status bar** — Render `<StatusBar />` client component as last child of `<body>` (outside `(app)` layout), so it's full-viewport-width fixed.

7. **`CustomThemeProvider` replacement** — The current `CustomThemeProvider` uses `next-themes` with `defaultTheme="light"` and supports theme toggling. Since the spec commits to dark-only, this provider will be replaced or gutted. The Vibe system owns accent colour; the light/dark toggle (`ThemeToggle`) is removed entirely.

#### `/home/xexr/gt/xexrcom/crew/deckard/src/lib/siteConfig.ts`

**Current state:**
- `url: "https://xexrcom.vercel.app"` — wrong domain
- `supportEmail: "support@example.com"` — placeholder
- `keywords: ["keyword 1", ...]` — all placeholders
- `topics: ["Primary Topic", ...]` — all placeholders
- `ogImage` points to CDN path that may not match spec branding

**Required changes:**
- `url` → `"https://xexr.com"`
- `keywords` → real SEO terms (AI, indie hacker, software development, etc.)
- `topics` → real Schema.org topics
- `supportEmail` → real contact email
- Add new fields consumed by Velite-generated pages:
  - `author: { name: "Dane Poyzer", url: "https://xexr.com/about" }` — for BlogPosting JSON-LD
  - `substackUrl: string` — for Subscribe CTA links
  - `githubUrl: string` — for Giscus config and Colophon
  - `twitterUrl: string` — for share buttons
- Remove `company` block if not used on public pages (or keep for legal footer)

#### `/home/xexr/gt/xexrcom/crew/deckard/src/lib/metadata.ts`

**Current state:**
- `generatePageMetadata()` accepts `{ title, description, image, noIndex }`
- Root `metadata` export sets `openGraph.type: "website"` globally
- No support for article metadata (`published_time`, `author`, `tags`)
- No `alternates.canonical` field

**Required changes:**
- Extend `generatePageMetadata()` to accept optional article fields:
  ```typescript
  export function generatePageMetadata({
    title,
    description,
    image,
    noIndex,
    // New fields for post pages:
    type,        // "article" | "website"
    publishedTime,
    modifiedTime,
    authors,
    tags,
    canonical,
  }: PageMetadataOptions): Metadata
  ```
- For post pages, `openGraph.type` must be `"article"` with `published_time`, `author`, and `tags` set.
- Add `alternates: { canonical }` support for cross-posts.

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/sitemap.ts`

**Current state:**
- Static array with `/signin`, `/signup`, `/forgot-password` — all irrelevant
- Commented-out dynamic post slug logic

**Required changes:**
- Full rewrite. Import Velite collections once available:
  ```typescript
  import { allPosts } from "velite/generated"; // or wherever Velite outputs
  ```
- Generate entries for: `/`, `/posts`, `/about`, `/projects`, `/now`, and one entry per published post slug at `/posts/[slug]`
- Use post `date` field for `lastModified` on post entries
- Remove all `/signin`, `/signup`, `/forgot-password`, `/admin`, `/dashboard` entries

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/robots.ts`

**Current state:**
- `disallow: ["/admin", "/dashboard"]` — irrelevant for a blog

**Required changes:**
- `disallow: ["/api"]` — only block API internals
- Remove `/admin` and `/dashboard` blocks

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/not-found.tsx`

**Current state:**
- Minimal card with "404" heading and "Sorry, this page could not be found."
- No recovery paths

**Required changes:**
- Complete redesign to match spec:
  - "Page not found" heading
  - Link to homepage (`/`)
  - Link to blog index (`/posts`)
  - List of 3 recent posts (fetched from Velite `allPosts` at build time — server component)
- Apply site visual design (dark background, accent colour links)

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/Header.tsx`

**Current state:**
- Logo renders `siteConfig.name.charAt(0).toUpperCase()` in a rounded badge + full site name
- Includes `<ThemeToggle />` (light/dark toggle — to be removed)
- Mobile nav: renders `<MainNav className="p-3" />` directly below header (not a drawer)
- Logo uses `bg-primary text-primary-foreground` classes

**Required changes:**

1. **Logo redesign** — Spec requires: "accent-coloured square icon with 'x' + monospace 'xexr' text". Replace current badge with:
   - A square element styled with `--accent` background (or border) containing the letter "x"
   - Followed by "xexr" in JetBrains Mono font

2. **Remove `<ThemeToggle />`** — Dark-only site has no theme toggle

3. **Mobile nav** — Replace the bare `<MainNav className="p-3" />` with a hamburger button that opens a drawer/sheet component. The current pattern renders MainNav directly on mobile, which is not a drawer.

4. **Nav items** — Populate `navItems` in `MainNav.tsx` with the 4 primary nav items

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/MainNav.tsx`

**Current state:**
- `navItems` array: `[{ href: "/dashboard", label: "Dashboard" }]` — wrong content
- Active state uses `bg-primary text-primary-foreground` highlight
- No external link handling

**Required changes:**

1. **Populate navItems:**
   ```typescript
   const navItems: { href: Route; label: string }[] = [
     { href: "/posts", label: "Posts" },
     { href: "/about", label: "About" },
     { href: "/projects", label: "Projects" },
     { href: "/now", label: "Now" },
   ];
   ```

2. **Active state styling** — Replace `bg-primary` highlight with accent-driven underline or colour change matching the Vibe system (use `--accent` CSS variable)

3. **Font** — Nav links should use JetBrains Mono per spec typography ("Code & UI: JetBrains Mono for nav links")

4. The `MainNavItem` active detection logic (`pathname === href`) is fine as-is for exact matching; may need `startsWith` for `/posts/[slug]` to highlight "Posts"

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/CustomThemeProvider.tsx`

**Current state:**
- Wraps children in `next-themes` `ThemeProvider` with `defaultTheme="light"` and `enableSystem`
- Forces light theme on `/example` route
- Manages `theme-color` meta tag via MutationObserver

**Required changes:**
- The Vibe system replaces the light/dark theme system entirely. This component either:
  - Gets replaced with a simpler wrapper that just ensures `dark` class stays on `<html>` permanently (since the site is dark-only), or
  - Gets stripped back to only manage the `theme-color` meta tag (always set to `#050505`)
- The `ThemeProvider` from `next-themes` can be removed since there's no light/dark toggle
- The forced-route logic for `/example` is irrelevant and can be deleted

#### `/home/xexr/gt/xexrcom/crew/deckard/src/styles/globals.css`

**Current state:**
- `:root` block defines light theme tokens in OKLCh (near-white background, etc.)
- `.dark` block defines dark theme tokens
- `--background: oklch(0.147 0.004 49.25)` in `.dark` — close to spec's `#050505` but not exact
- `--primary` / `--accent` both set to amber-ish `oklch(0.77 0.16 70)` — not mint
- `--font-sans` references `var(--font-geist-sans)`, `--font-mono` references `var(--font-geist-mono)`
- No Vibe CSS variables (`--accent-dim`, `--accent-soft`, `--accent-glow`)
- No scanline overlay
- No prose max-width utilities

**Required changes:**

1. **Color token overhaul** — Since site is dark-only, the `:root` block becomes the single source of truth (no `.dark` block needed, or `.dark` is same as `:root`). New values:
   ```css
   :root {
     --background: #050505;
     --foreground: #e8e8e8;       /* headings */
     --body-text: #a0a0a0;        /* body */
     --muted-foreground: #8a8a8a; /* secondary text, WCAG AA compliant */
     --accent: #00ff88;           /* default mint — overridden by Vibe script */
     --accent-dim: color-mix(in srgb, var(--accent) 18%, transparent);
     --accent-soft: color-mix(in srgb, var(--accent) 25%, transparent);
     --accent-glow: color-mix(in srgb, var(--accent) 10%, transparent);
     --border: oklch(1 0 0 / 10%); /* keep subtle border */
     ...
   }
   ```
   Note: The `@theme inline` block maps `--color-accent` to `var(--accent)`, which is already in place — so Tailwind's `text-accent`, `bg-accent` classes will automatically reflect the Vibe variable.

2. **Font variable references** — Update:
   ```css
   --font-sans: var(--font-plus-jakarta-sans), sans-serif;
   --font-mono: var(--font-jetbrains-mono), monospace;
   ```

3. **New utilities:**
   ```css
   @layer utilities {
     .prose-container { max-width: 740px; }
     .scanlines {
       background-image: repeating-linear-gradient(...);
       pointer-events: none;
     }
   }
   ```

4. **Scrollbar styling** — Update to match dark palette.

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/ReturnToTop.tsx`

**Current state:**
- Fixed bottom-right button with `bg-primary` styling
- Conflicts with the new Status Bar's fixed bottom positioning

**Required changes:**
- Remove from `(app)` layout or reposition — the Status Bar occupies the fixed bottom zone
- If retained, move to bottom-right with sufficient margin to clear the status bar
- Update styling to use accent variables instead of `bg-primary`

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/(app)/layout.tsx`

**Current state:**
- Wraps content in `TRPCReactProviderTanstack` and `NuqsAdapter`
- Has `<Toaster />` for sonner notifications
- No `id="main-content"` on `<main>`

**Required changes:**
- Remove `TRPCReactProviderTanstack` — no tRPC needed for a static blog
- Keep `NuqsAdapter` — it handles URL query params (needed for tag filtering: `/posts?tag=ai&page=2`)
- Remove `<Toaster />` — no server notifications needed for a static blog
- Add `id="main-content"` to the `<main>` element for skip-link accessibility
- Simplify max-width container: the spec uses a narrower design (740px prose, no 7xl max-width global container)

#### `/home/xexr/gt/xexrcom/crew/deckard/next.config.ts`

**Current state:**
- `typedRoutes: true` — keep
- `images.remotePatterns` points to `poyzer.download` CDN — keep
- No custom headers (CSP, security)
- No redirects
- No Velite webpack/turbopack plugin

**Required changes:**

1. **CSP headers** — Add `headers()` function:
   ```typescript
   async headers() {
     return [{
       source: "/(.*)",
       headers: [
         {
           key: "Content-Security-Policy",
           value: `
             default-src 'self';
             script-src 'self' 'nonce-{NONCE}' 'unsafe-inline';
             frame-src giscus.app;
             ...
           `.trim()
         }
       ]
     }]
   }
   ```
   The Vibe blocking script in `<head>` requires either a nonce or `'unsafe-inline'` for scripts.

2. **Redirects** — Add `redirects()` for any renamed post URLs (empty at launch, but the mechanism must exist).

3. **Velite integration** — Velite requires a webpack plugin. Add to config:
   ```typescript
   import { VeliteWebpackPlugin } from "velite";
   // In config:
   webpack(config) {
     config.plugins.push(new VeliteWebpackPlugin());
     return config;
   }
   ```

#### `/home/xexr/gt/xexrcom/crew/deckard/src/env.ts`

**Current state:**
- Server env: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `DB_TABLE_PREFIX`, `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `DOUBLEZERO_API_TOKEN`, `DOUBLEZERO_BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY`
- All database/AI/Redis env vars are required — this blocks builds without them

**Required changes:**
- This is a static blog. All server-side env vars for DB, Redis, AI, and third-party APIs should be removed or made optional.
- Keep: `NODE_ENV`, `VERCEL_ENV`, `VERCEL_BRANCH_URL`
- Keep client: `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_BRANCH_URL`
- Add if needed: `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID` — Giscus configuration is all public

#### `/home/xexr/gt/xexrcom/crew/deckard/src/app/api/og/route.tsx`

**Current state:**
- Background: `#030712` (wrong — spec says `#050505`)
- Accent colour: `rgba(59, 130, 246, 0.15)` (blue — wrong, spec is mint `#00ff88`)
- Font: system default (no custom font loaded — spec requires Plus Jakarta Sans)
- Badge border: `rgba(59, 130, 246, 0.2)` (blue)
- Text colours: `#f9fafb` (close), `#9ca3af` (close)

**Required changes:**
- Background → `#050505`
- Accent/gradient → `rgba(0, 255, 136, 0.15)` (mint)
- Badge border/colour → mint variants
- Add Plus Jakarta Sans font loading via `next/og` font fetch
- Post OG images will need a new template that accepts: `title`, `description`, `date`, `tags`
- All OG images use default mint (not user's Vibe — static images can't know user preference)
- Long titles truncated at ~80 chars

#### `/home/xexr/gt/xexrcom/crew/deckard/package.json`

**Current state:**
- Has `geist` package (fonts to remove)
- Has `drizzle-orm`, `@libsql/client`, `drizzle-zod` (database — to remove)
- Has `@trpc/client`, `@trpc/server`, `@trpc/tanstack-react-query` (tRPC — to remove)
- Has `@tanstack/react-query` (may remove with tRPC, or keep for Giscus/other client queries)
- Has `next-themes` (to remove when Vibe replaces it)
- Has `@ai-sdk/*`, `ai` packages (AI — to remove)
- Has `@upstash/ratelimit`, `@upstash/redis` (Redis — to remove)
- Has `sonner` (toast notifications — to remove)
- Has `nuqs` — keep (URL param sync for tag filtering)
- Db scripts in `scripts`: `db:start`, `db:generate`, etc. — remove or keep inert

**New dependencies to add:**
- `velite` — MDX content compilation
- `rehype-pretty-code` — code block syntax highlighting
- `shiki` — syntax highlighter (Shiki runs at build time via rehype-pretty-code)
- `@giscus/react` — comments component
- `remark-gfm` — GitHub Flavored Markdown in MDX

---

## Patterns & Conventions

### Component Precedents

The closest existing interactive component to what the spec describes is **`ReturnToTop`** — a fixed, viewport-positioned client component that tracks scroll position and conditionally renders. It is the best structural template for the **StatusBar** and **VibeSystem** client components.

File: `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/ReturnToTop.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export default function ReturnToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => { ... };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-4 right-4 z-50 ..."
      onClick={scrollToTop}
      aria-label="Return to top"
    >
      <ArrowUpCircle className="h-6 w-6" />
    </Button>
  );
}
```

**Pattern template it establishes:**
- `"use client"` directive at top of file for any component needing browser APIs or state
- Fixed viewport positioning uses inline Tailwind (`fixed bottom-4 right-4 z-50`)
- Event listener setup in `useEffect` with cleanup return
- Conditional render via early `return null` (not conditional JSX wrapping)
- Uses the project's `Button` component with `cn()`-compatible className prop

The closest existing feature to **navigation** is `MainNav` + `Header`. This is the template for building the hamburger/mobile nav replacement.

File: `/home/xexr/gt/xexrcom/crew/deckard/src/app/_components/Header.tsx`

```tsx
// Async server component — no "use client"
export default async function Header() {
  return (
    <>
      <header className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-5 md:gap-10">
          <Link href="/" className="flex items-center gap-2 ...">
            ...
          </Link>
          <MainNav className="hidden md:flex" />
        </div>
      </header>
      <nav className="md:hidden">
        <MainNav className="p-3" />
      </nav>
    </>
  );
}
```

**Pattern:** Server component wrapper renders the layout shell; client component (`MainNav`) handles interactivity. Mobile/desktop split uses `hidden md:flex` / `md:hidden` Tailwind pattern.

### Coding Patterns

#### Component Structure

**Server components** (default): No `"use client"` directive, can be `async`, used for all page-level and layout components.

```tsx
// src/app/(app)/layout.tsx
export default async function RootLayout({ children }: ...) {
  return (
    <div className="flex grow flex-col items-center p-1">
      <div className="w-full max-w-7xl grow">
        <Header />
        <main className="h-full w-full grow">{children}</main>
      </div>
    </div>
  );
}
```

**Client components**: `"use client"` at top, hooks allowed.

```tsx
// src/app/_components/MainNav.tsx
"use client";
import { usePathname } from "next/navigation";
```

#### CVA Pattern (primary UI component pattern)

All UI components use **class-variance-authority (CVA)** for variants. This is the authoritative pattern for new components:

```tsx
// src/app/_components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base-classes-here ...",
  {
    variants: {
      variant: { default: "...", outline: "...", ghost: "..." },
      size: { default: "...", sm: "...", lg: "...", icon: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

**Key rules from this pattern:**
- Export both the component AND the `variants` object (for composition)
- Use `data-slot="component-name"` on root element (enables parent-level targeting)
- Always wrap className with `cn(variantFn({ ..., className }))`
- Props typed as `ComponentProps & VariantProps<typeof variantsFn>`
- Named function declarations, not arrow functions for components

#### Base UI Integration

The project uses **`@base-ui/react`** as the headless primitive layer. New interactive components should wrap Base UI primitives:

```tsx
// src/app/_components/ui/dropdown-menu.tsx
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

function DropdownMenuContent({ className, ...props }: ...) {
  return (
    <MenuPrimitive.Popup
      data-slot="dropdown-menu-content"
      className={cn("...", className)}
      {...props}
    />
  );
}
```

The Vibe drawer (bottom sheet / popover) should follow this pattern using Base UI's `Popover` or `Dialog` primitive.

#### Data Attribute Pattern

Every component uses `data-slot` for semantic targeting and `data-[state]` for conditional styling:

```tsx
data-slot="card"
data-size={size}                    // passed as prop, styled via data-[size=sm]
data-variant={variant}              // enables variant-targeted parent selectors
data-open:animate-in                // Base UI state attributes for animations
data-closed:animate-out
data-disabled:pointer-events-none
```

#### Component Prop Interface Pattern

Simple interface for props with optional `className`:

```tsx
// LoadingSpinner pattern (simple)
interface Props {
  className?: string;
}

// MainNav pattern (with HTML attrs spread)
interface Props {
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}

// Card pattern (extending HTML element props)
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) { ... }
```

Prefer `React.ComponentProps<"div">` extension over manual prop interfaces when wrapping HTML elements. Use `interface Props` for simple named prop sets.

#### File Naming

- Component files: PascalCase (`Header.tsx`, `MainNav.tsx`, `LoadingSpinner.tsx`)
- Utility files: camelCase (`utils.ts`, `siteConfig.ts`, `metadata.ts`, `lib.ts`, `constants.ts`)
- Route files: Next.js convention (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`)
- API routes: kebab-case directory + `route.tsx` (`/api/og/route.tsx`)
- UI subcomponents: kebab-case (`dropdown-menu.tsx`, `alert-dialog.tsx`, `input-group.tsx`)

#### Import Aliases

```typescript
// tsconfig.json paths:
"@/*"           → "src/*"               // General src imports
"@components/*" → "src/app/_components/*"  // Component shortcut
"@test/*"       → "__tests__/shared/*"  // Test helpers (test files only)
"@mocks/*"      → "__mocks__/*"         // Mocks (test files only)
```

Examples from the codebase:
```tsx
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/siteConfig"
import Header from "@components/Header"
import { Button } from "@/app/_components/ui/button"
import type { Route } from "next"
```

#### Configuration Management

**Central config object** in `src/lib/siteConfig.ts` — a plain exported `const` object. No class, no function. All site-wide values go here:

```typescript
export const siteConfig = {
  name: "xexr.com",
  tagline: "by Dane Poyzer",
  url: "https://xexr.com",
  cdnDomain: "poyzer.download",
  company: { ... },
  twitter: { creator: "@danepoyzer" },
  keywords: [...],
  topics: [...],
};
```

**Environment variables** via `@t3-oss/env-nextjs` with Zod in `src/env.ts`. Server-side vars in `server: {}`, client-accessible in `client: {}` with `NEXT_PUBLIC_` prefix enforced:

```typescript
export const env = createEnv({
  server: { NODE_ENV: z.enum(["development", "test", "production"]).default("development") },
  client: { NEXT_PUBLIC_URL: z.string() },
  runtimeEnv: { NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL, ... },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
```

**Constants** in `src/lib/constants.ts` — currently minimal (`HELLO_WORLD`). This is the intended location for shared string constants. The spec mentions i18n deferred, so centralised strings go here.

#### Metadata Pattern

```typescript
// src/lib/metadata.ts — generates per-page metadata
export function generatePageMetadata({ title, description, image, noIndex }): Metadata {
  return {
    title,
    openGraph: { title, description, images: [pageImage] },
    twitter: { title, description, images: [pageImage] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

// Usage in page.tsx:
export const metadata = generatePageMetadata({ title: "About" });
```

#### Tailwind CSS Patterns

CSS tokens are defined in `globals.css` via `@theme inline` block. Colors use **OKLCh** values:

```css
:root {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.77 0.16 70);
  --accent: oklch(0.77 0.16 70);
}
```

These are referenced in Tailwind as `bg-background`, `text-foreground`, `bg-primary`, `text-accent`, etc. The Vibe system will override `--accent` (and new `--accent-dim`, `--accent-soft`, `--accent-glow` variables) on `<html>` directly.

**Mobile-first responsive** pattern: `hidden md:flex` (hide on mobile, show on md+). Never use desktop-first.

**Dark mode** is forced via the `dark` class on `<html>`, not via `prefers-color-scheme`. The CSS uses `@custom-variant dark (&:is(.dark *))`.

**Scrollbar styling** lives in `@layer utilities` in globals.css — follow this pattern for any custom CSS utilities.

### Error Handling Patterns

**Route error boundary** (`src/app/error.tsx`):
```tsx
"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return ( <Card>...</Card> );
}
```
- Logs errors to console (`console.error`)
- Provides reset button
- No custom error types — uses native `Error` with optional `digest`

**404 page** (`src/app/not-found.tsx`):
```tsx
export function generateMetadata() { return { title: "404" }; }
export default function NotFound() {
  return <Card><CardHeader><CardTitle>404</CardTitle></CardHeader>...</Card>;
}
```

**Environment error** — `@t3-oss/env-nextjs` throws at build/startup if env vars fail Zod validation. `skipValidation` flag for test environments.

**Patterns to apply for new features:**

**Vibe localStorage** — the spec requires try/catch with silent fallback:
```typescript
function loadVibeColour(): string {
  try {
    return localStorage.getItem("xexr-vibe") ?? DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}
```

**Particle canvas** — check for canvas support, skip silently:
```typescript
const canvas = ref.current;
if (!canvas) return; // Skip silently
const ctx = canvas.getContext("2d");
if (!ctx) return;    // Skip silently
```

**Giscus** — error state via conditional render, show fallback text. No thrown errors.

**Tag filter with no results** — empty state in component JSX, not an error condition.

**General pattern:** No custom error classes exist. The project uses simple try/catch with fallback values for progressive enhancement features. Errors are console-logged internally, not surfaced to users for non-critical failures.

### Testing & Quality

**Vitest** framework (v4) with multiple config files for test type separation:

```typescript
// vitest.base.ts
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    fileParallelism: false,
    env: { SKIP_ENV_VALIDATION: "true" },
  },
});
```

**Test organization:**

| Type | Config | File Pattern | Location |
|------|--------|-------------|----------|
| Unit | `vitest.config.ts` | `src/**/*.test.ts` | Co-located with source |
| Integration | `vitest.config.integration.ts` | `__tests__/integration/**/*.integration.test.ts` | Separate `__tests__` dir |
| E2E | `vitest.config.e2e.ts` | `__tests__/e2e/**/*.e2e.test.ts` | Separate `__tests__` dir |

**Coverage targets** (from `vitest.config.coverage.ts`):
```typescript
coverage: {
  include: ["src/server/**/*.ts", "src/lib/**/*.ts"],  // lib + server code only
  thresholds: {
    branches: 50,
    functions: 60,
    lines: 55,
    statements: 55,
  },
}
```

Coverage applies only to `src/lib/**` and `src/server/**` — not React components. React components are not expected to have unit test coverage.

**What to test per spec:**
- **Vibe persistence/sync logic** → `src/lib/vibe.ts` unit tests (pure functions for colour parsing, localStorage read/write, OKLCh calculation)
- **Velite schema validation** → integration test (validates MDX frontmatter against Zod schema)
- **Colour utilities** → `src/lib/colour.ts` unit tests (contrast ratio calculation, OKLCh conversion)
- Components are not unit tested

**TypeScript Strictness** (`tsconfig.json`):
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,  // Array/object access returns T | undefined
  "checkJs": true,
  "moduleDetection": "force",
  "isolatedModules": true
}
```

`noUncheckedIndexedAccess` is notable — array index access returns `T | undefined`, requiring null checks.

**ESLint Key Rules** (from `eslint.config.mjs`):
- `react-compiler/react-compiler: "error"` — React Compiler compliance required
- `@typescript-eslint/consistent-type-imports` — Use `import type` for type-only imports
- `no-restricted-imports` — No test helpers (`@test/*`, `@mocks/*`) in production code

**React Compiler** is enforced as an error. All components must be compliant with the React Compiler.

**Prettier** enforces Tailwind class ordering via `prettier-plugin-tailwindcss`.

---

## Key Files Reference

### Infrastructure & Configuration

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout (fonts, Analytics, JSON-LD, viewport, Vibe script) |
| `src/app/(app)/layout.tsx` | App group layout (header, main, skip-to-content) |
| `src/app/error.tsx` | Root error boundary |
| `src/app/not-found.tsx` | 404 page with recovery paths |
| `src/app/sitemap.ts` | Sitemap generator (to be rewritten from Velite) |
| `src/app/robots.ts` | Robots.txt generator |
| `src/app/api/og/route.tsx` | OG image generation (to be rebranded) |
| `src/lib/siteConfig.ts` | Site metadata and configuration (URL, name, socials) |
| `src/lib/metadata.ts` | Metadata helpers (generatePageMetadata) |
| `src/lib/lib.ts` | Server URL resolution |
| `src/lib/utils.ts` | className utility (cn function) |
| `src/lib/constants.ts` | Global constants |
| `src/env.ts` | Environment variables (T3 env + Zod) |
| `src/styles/globals.css` | Tailwind tokens, global styles, utilities |
| `next.config.ts` | Next.js config (Velite plugin, CSP headers) |
| `tsconfig.json` | TypeScript configuration |
| `eslint.config.mjs` | ESLint rules and plugins |
| `prettier.config.js` | Code formatting (Tailwind plugin) |
| `package.json` | Dependencies and scripts |

### Component Library & UI

| File | Purpose |
|------|---------|
| `src/app/_components/Header.tsx` | Site header (logo + navigation) |
| `src/app/_components/MainNav.tsx` | Navigation items (populated, typed routes) |
| `src/app/_components/Footer.tsx` | Site footer (NEW) |
| `src/app/_components/StatusBar.tsx` | Fixed bottom Vibe pill (NEW) |
| `src/app/_components/VibeDrawer.tsx` | Colour picker drawer (NEW) |
| `src/app/_components/ParticleCanvas.tsx` | Hero particle animation (NEW) |
| `src/app/_components/ReturnToTop.tsx` | Scroll-to-top button |
| `src/app/_components/LoadingSpinner.tsx` | Loading spinner SVG |
| `src/app/_components/LoadingPage.tsx` | Full-page loading placeholder |
| `src/app/_components/ui/button.tsx` | Button (CVA, Base UI) |
| `src/app/_components/ui/card.tsx` | Card family |
| `src/app/_components/ui/badge.tsx` | Badge |
| `src/app/_components/ui/dropdown-menu.tsx` | Dropdown |
| `src/app/_components/ui/select.tsx` | Select |
| `src/app/_components/ui/alert-dialog.tsx` | Alert dialog |
| Other UI primitives | Input, label, field, textarea, separator, combobox, input-group |

### Content & Posts (NEW)

| File | Purpose |
|------|---------|
| `src/app/_components/PostCard.tsx` | Post card for lists (NEW) |
| `src/app/_components/PostList.tsx` | Post list with tag filtering (NEW, client component) |
| `src/app/_components/TableOfContents.tsx` | Sticky/collapsible TOC (NEW) |
| `src/app/_components/GiscusComments.tsx` | Lazy-loaded comments (NEW) |
| `src/app/_components/mdx/CodeBlock.tsx` | Shiki code block + copy (NEW) |
| `src/app/_components/mdx/Callout.tsx` | MDX callout block (NEW) |
| `src/app/_components/mdx/MDXImage.tsx` | Next.js Image wrapper (NEW) |
| `src/app/(app)/posts/page.tsx` | Blog index page (NEW) |
| `src/app/(app)/posts/[slug]/page.tsx` | Post page (NEW) |
| `src/app/(app)/about/page.tsx` | About page (NEW) |
| `src/app/(app)/projects/page.tsx` | Projects page (NEW) |
| `src/app/(app)/now/page.tsx` | Now page (NEW) |
| `src/app/(app)/uses/page.tsx` | Uses page — deferred (NEW) |
| `src/app/(app)/bookshelf/page.tsx` | Bookshelf page — deferred (NEW) |
| `src/app/(app)/colophon/page.tsx` | Colophon page — deferred (NEW) |
| `src/app/api/rss/route.ts` | RSS feed (NEW) |

### Utilities & Helpers (NEW)

| File | Purpose |
|------|---------|
| `src/lib/vibe.ts` | Vibe colour utilities (OKLCh conversion, contrast checking) |
| `src/lib/content.ts` | Re-export barrel for Velite collections |

### Build & Config (NEW)

| File | Purpose |
|------|---------|
| `velite.config.ts` | Velite content pipeline (MDX schemas) |
| `mdx-components.tsx` | MDX component overrides (Next.js convention) |
| `content/posts/*/index.mdx` | Post content files |
| `content/projects/*.yaml` | Project data files |
| `content/bookshelf/*.yaml` | Book data files |

### Testing

| File | Purpose |
|------|---------|
| `vitest.config.ts` | Unit test config |
| `vitest.config.integration.ts` | Integration test config |
| `vitest.config.e2e.ts` | E2E test config |
| `vitest.config.coverage.ts` | Coverage config |
| `vitest.base.ts` | Shared Vitest base |
| `__tests__/shared/` | Test helpers (location for `@test/*`) |
| `__mocks__/` | Mock files (location for `@mocks/*`) |

---

## Constraints & Considerations

### Architectural Boundaries to Respect

1. **Server/client boundary**: All data fetching and content access (Velite) happens in server components. Client components receive pre-fetched data as props. No Velite imports in client components.

2. **Route group boundary**: All user-facing pages inside `(app)/` share the `(app)/layout.tsx` which adds Header and max-width container. StatusBar lives outside this in root layout — correct for full-viewport-width fixed positioning.

3. **Import alias boundary**: `@/*` resolves to `src/*`; `@components/*` to `src/app/_components/*`. New components follow these aliases. Velite-generated content is imported via its own generated path (e.g., `import { posts } from '.velite'`).

4. **Test isolation**: `@test/*` and `@mocks/*` are forbidden in production code (enforced by ESLint `no-restricted-imports`). Test utilities live in `__tests__/` and `__mocks__/` at project root.

5. **React Compiler**: The ESLint plugin enforces Rules of React strictly. Components must be pure, hooks must follow the rules. The Vibe system's imperative DOM manipulation (setting CSS variables on `<html>`) should happen inside `useEffect`, not during render.

6. **TypedRoutes**: `typedRoutes: true` in `next.config.ts` means all `href` values must be typed `Route` strings. When adding new pages, the route type definitions update automatically via `next typegen`.

### Architectural Constraints Shaping Implementation

1. **No SSR for Vibe colour**: The blocking `<script>` in `<head>` is the only way to avoid a flash of default colour on return visits. This is a raw `<script>` tag with a `dangerouslySetInnerHTML` string — the script must be a self-contained IIFE reading localStorage and setting `document.documentElement.style.setProperty('--accent', ...)`. It cannot import modules.

2. **Velite and webpack**: Next.js 16 uses Turbopack by default in dev (`next dev`). Velite requires webpack integration via a custom plugin. The `package.json` already has `"build:webpack": "next build --webpack"` which confirms awareness of this. Dev workflow may need `next dev --webpack` until Turbopack compatibility is available, or Velite's `experimental.turbopack` option if supported.

3. **Tag filtering as client component**: The `/posts` page must be a server component for SEO and static rendering, but tag filtering is client-side. The pattern is: server page renders all posts as static HTML; a `PostList` client component wraps the list and handles filter state. URL sync (`/posts?tag=ai`) requires `useSearchParams()` inside a client component wrapped in `<Suspense>`.

4. **`noUncheckedIndexedAccess`**: TypeScript is configured with this strict flag. Array access like `posts[0]` returns `Post | undefined`, not `Post`. All content access from Velite collections must handle this (e.g., `posts.find(...)` or null-check array access).

5. **Build commands**:
   ```bash
   pnpm build           # next build (Turbopack by default in Next.js 16)
   pnpm build:webpack   # next build --webpack (needed for Velite integration)
   pnpm dev             # next dev --port 3005
   pnpm start           # next start --port 3000
   pnpm typecheck       # next typegen && tsc --noEmit
   pnpm lint            # eslint .
   ```

6. **Test environment**: `node` (not jsdom). Integration tests have 30s timeout; E2E tests have 60s timeout and run sequentially. `SKIP_ENV_VALIDATION=true` in test env to bypass T3 env validation.

### Data Layer: Velite & Content Pipeline

**No Database:** The spec is explicit — "No database. All content is file-based MDX compiled at build time." The existing database infrastructure (Drizzle ORM, libSQL client, migrations) should be removed.

**Velite configuration file to create:** `velite.config.ts` at project root.

**Schema definitions:**

```typescript
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "content/posts/*/index.mdx",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    date: s.isodate(),
    updated: s.isodate().optional(),
    tags: s.array(s.string()),
    draft: s.boolean().default(false),
    featured: s.boolean().default(false),
    image: s.string().optional(),
    readingTime: s.number().optional(),
  })
  .transform((data) => ({
    ...data,
    slug: data.slug, // derived from directory name by Velite
    url: `/posts/${data.slug}`,
    readingTime: data.readingTime ?? calculateReadingTime(data.body, 238),
  })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "content/projects/*.yaml",
  schema: s.object({
    name: s.string(),
    description: s.string(),
    url: s.string().url().optional(),
    repo: s.string().url().optional(),
    techStack: s.array(s.string()),
    status: s.enum(["active", "maintained", "shelved", "archived"]),
    featured: s.boolean().default(false),
    tags: s.array(s.string()),
  }),
});

const books = defineCollection({
  name: "Book",
  pattern: "content/bookshelf/*.yaml",
  schema: s.object({
    title: s.string(),
    author: s.string(),
    status: s.enum(["reading", "finished", "want-to-read"]),
    thoughts: s.string().optional(),
    link: s.string().url().optional(),
    dateFinished: s.isodate().optional(),
  }),
});
```

**Content directory structure to create:**
```
content/
  posts/
    my-first-post/
      index.mdx
      hero.png
  projects/
    project-name.yaml
  bookshelf/
    books.yaml
```

**Velite output:** Generates `.velite/` (gitignored) with typed collections for import.

### Vibe System: localStorage & CSS Variables

**localStorage schema:** Single key `"xexr-vibe"` storing a hex colour string.

**Access patterns:**
- **Write:** `localStorage.setItem("xexr-vibe", "#00ff88")` — wrapped in try/catch
- **Read (blocking):** Raw script in `<head>` before React hydration:
  ```javascript
  (function() {
    try {
      var c = localStorage.getItem("xexr-vibe");
      if (c) document.documentElement.style.setProperty("--accent", c);
    } catch(e) {}
  })();
  ```
- **Read (React):** `localStorage.getItem("xexr-vibe")` in `useEffect` for Vibe drawer initial state
- **Tab sync:** `window.addEventListener("storage", handler)` — StorageEvent fires when another tab writes

**CSS variables on `<html>`:**
- `--accent` — current Vibe colour (default #00ff88 mint)
- `--accent-dim` — lowered opacity variant
- `--accent-soft` — soft appearance
- `--accent-glow` — glow/shadow variant

### Type System

#### Velite-Generated Types

```typescript
interface Post {
  title: string;
  description: string;
  date: string;          // "YYYY-MM-DD"
  updated?: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  image?: string;
  readingTime: number;   // auto-calculated at 238 WPM
  slug: string;          // derived from directory name
  body: string;          // compiled MDX body
  url: string;           // "/posts/[slug]"
  excerpt?: string;
}

interface Project {
  name: string;
  description: string;
  url?: string;
  repo?: string;
  techStack: string[];
  status: "active" | "maintained" | "shelved" | "archived";
  featured: boolean;
  tags: string[];
}

interface Book {
  title: string;
  author: string;
  status: "reading" | "finished" | "want-to-read";
  thoughts?: string;
  link?: string;
  dateFinished?: string;
}
```

#### Vibe System Types

```typescript
interface VibePreset {
  name: string;    // "Mint", "Amber", "Cyan", etc.
  hex: string;     // "#00ff88"
  oklch: string;   // "oklch(0.88 0.28 155)" — for perceptual slider
}

type VibeColour = string; // hex, stored in localStorage
```

#### Shared Component Types

```typescript
interface PostCardProps {
  title: string;
  date: string;       // "22 Feb 2026" formatted
  tags: string[];
  readingTime: number;
  slug: string;
  featured?: boolean;
}

interface TOCItem {
  id: string;
  title: string;
  depth: number;  // 2 or 3 (h2, h3)
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  canonical?: string;
}
```

### Content Consumption Patterns

- **Post** — used by: homepage (featured), blog index, post page, sitemap, 404 (recent), RSS, OG image generation
- **VibePreset[]** — used by: Vibe drawer (preset buttons), Vibe blocking script (default), status bar
- **TOCItem[]** — used by: desktop sticky TOC, mobile collapsible TOC
- **PostCardProps** — used by: PostCard component on homepage and blog index

### Build & Deploy

**Current CI/CD:** No CI configuration found (no `.github/`, `.circleci/`, `vercel.json`). Deployment is Vercel-native: git push triggers automatic build. `VERCEL_ENV` and `VERCEL_BRANCH_URL` env vars already typed in `src/env.ts`.

**Environment variables needed:**
- `NEXT_PUBLIC_URL` — site URL
- `NEXT_PUBLIC_VERCEL_ENV` — Vercel environment (production/preview)
- `NEXT_PUBLIC_VERCEL_BRANCH_URL` — Vercel branch preview URL
- `NEXT_PUBLIC_GISCUS_*` — Giscus configuration (all public)

**Turbopack caveat:** `next dev` uses Turbopack by default. Velite requires webpack. Dev workflow may need `next dev --webpack` until Turbopack support matures. Build uses webpack via `build:webpack` script.

### Feature Scope

The site-setup feature is a full-site build on top of existing infrastructure. The existing codebase provides routing structure, styling foundation, UI primitives, and configuration files. Everything in the spec is net-new:

- **Content Pipeline** (Velite + MDX) — completely new subsystem, no existing foothold
- **Vibe System** — new CSS variables, localStorage sync, UI components
- **Particle Canvas** — new hero animation
- **Page Routes** — 7-8 new routes under `(app)/`
- **Navigation** — redesigned header, new footer, hamburger mobile nav
- **MDX Custom Components** — Callout, CodeBlock, Image wrappers
- **OG Image Route** — modification of existing `api/og/route.tsx` (rebrand only)
- **Infrastructure Files** — modifications to layout, config, styles, types

---

## Modification Priority Map

| File | Change Type | Blocking? |
|------|-------------|-----------|
| `src/app/layout.tsx` | Major rewrite | Yes — root of everything |
| `src/styles/globals.css` | Full token replacement | Yes — visual foundation |
| `src/lib/siteConfig.ts` | Data update + new fields | Yes — consumed everywhere |
| `src/env.ts` | Strip DB/AI vars, add Giscus | Yes — blocks build |
| `package.json` | Add/remove dependencies | Yes — needed before coding |
| `next.config.ts` | Add Velite plugin, CSP | Yes — Velite won't compile |
| `velite.config.ts` | Create new | Yes — all content depends on it |
| `src/app/sitemap.ts` | Rewrite from Velite | No |
| `src/app/robots.ts` | Remove stale rules | No |
| `src/app/not-found.tsx` | Redesign + recovery | No |
| `src/app/_components/Header.tsx` | Logo redesign, remove toggle, mobile drawer | After layout |
| `src/app/_components/MainNav.tsx` | Populate navItems, style | After Header |
| `src/app/_components/CustomThemeProvider.tsx` | Remove or gut | After layout |
| `src/app/(app)/layout.tsx` | Remove tRPC, add id="main-content" | After env.ts |
| `src/app/api/og/route.tsx` | Rebrand colours, font | No |
| `src/lib/metadata.ts` | Extend for article metadata | Before post page |
| `src/app/_components/ReturnToTop.tsx` | Reposition/restyle | After status bar |

---

## New Files to Create

### Pages & Routes
- `src/app/(app)/posts/page.tsx` — blog index
- `src/app/(app)/posts/[slug]/page.tsx` — post page
- `src/app/(app)/about/page.tsx` — about page
- `src/app/(app)/projects/page.tsx` — projects page
- `src/app/(app)/now/page.tsx` — now page
- `src/app/(app)/uses/page.tsx` — uses page (deferred)
- `src/app/(app)/bookshelf/page.tsx` — bookshelf page (deferred)
- `src/app/(app)/colophon/page.tsx` — colophon page (deferred)
- `src/app/api/rss/route.ts` — RSS feed

### Components
- `src/app/_components/StatusBar.tsx` — fixed bottom Vibe pill
- `src/app/_components/VibeDrawer.tsx` — colour picker drawer
- `src/app/_components/ParticleCanvas.tsx` — hero particle effect
- `src/app/_components/Footer.tsx` — site footer
- `src/app/_components/MobileNav.tsx` — hamburger drawer
- `src/app/_components/PostCard.tsx` — post card for lists
- `src/app/_components/PostList.tsx` — post list with filtering
- `src/app/_components/TableOfContents.tsx` — sticky/collapsible TOC
- `src/app/_components/GiscusComments.tsx` — lazy-loaded comments
- `src/app/_components/mdx/CodeBlock.tsx` — Shiki + copy button
- `src/app/_components/mdx/Callout.tsx` — callout block
- `src/app/_components/mdx/MDXImage.tsx` — Next.js Image wrapper

### Utilities & Config
- `src/lib/vibe.ts` — Vibe colour utilities (OKLCh, contrast, localStorage)
- `src/lib/content.ts` — Velite collection re-exports
- `velite.config.ts` — Velite content pipeline
- `mdx-components.tsx` — MDX component overrides

### Content Directories
- `content/posts/` — post MDX files
- `content/projects/` — project data files
- `content/bookshelf/` — book data files
