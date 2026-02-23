# site-setup — Implementation Plan

**Created:** 2026-02-23
**Status:** Draft
**Source Spec:** plans/site-setup/02-spec/spec.md

---

## Overview

We are building xexr.com — a dark-first personal blog for Dane Poyzer with a signature "Vibe" accent colour system, particle canvas hero, MDX content via Velite, and Giscus comments. The site is blog-first: the post page is the primary design focus, with supporting pages for About, Projects, Now, and secondary content.

The implementation approach builds on an existing Next.js 16 scaffold that provides App Router routing, Tailwind v4 styling, shadcn/ui components on Base UI React, and Vercel deployment infrastructure. The scaffold contains template defaults (database ORMs, AI SDKs, wrong fonts, placeholder content) that must be stripped before building the blog. Phase 1 performs this cleanup and establishes the new foundation. Subsequent phases build the content pipeline, interactive features, page routes, and finally SEO/testing.

This approach was chosen because the codebase already has the right architectural bones — route groups, component patterns (CVA, Base UI), TypeScript strict mode, Vitest testing infrastructure. Rather than starting from scratch, we strip what doesn't belong and build what the spec requires on top of proven patterns.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content system | Velite + MDX with Zod schemas | Spec requires file-based MDX; Velite provides build-time compilation with type-safe output. No database. |
| Content structure | Directory-based (`content/posts/slug/index.mdx`) | Co-located images per spec requirement; slug from directory name |
| Colour system | CSS custom properties on `<html>` + blocking `<script>` | Spec requires flash-free Vibe persistence; only way to set `--accent` before first paint |
| Component primitives | `@base-ui/react` (existing) | Already in codebase; VibeDrawer wraps `Popover` or `Dialog` primitive |
| Variant system | CVA (existing) | Established pattern in `_components/ui/`; all new components follow this |
| Font stack | `next/font` (Plus Jakarta Sans + JetBrains Mono) | Replaces Geist/Roboto; eliminates FOUT/CLS per spec |
| Comments | Giscus (`@giscus/react`) | Spec requires GitHub Discussions-backed comments; zero backend, lazy-loaded |
| Syntax highlighting | Shiki via `rehype-pretty-code` | Build-time highlighting; spec requires macOS chrome + copy button |
| Tag filtering | Client-side with `nuqs` URL sync | `nuqs` already installed; pattern: server renders all, client component filters |
| State management | `localStorage` + CSS variables | No external state library; Vibe is the only persistent client state |
| Dev server | `next dev` (Turbopack, default) | Velite started via top-level `await` in `next.config.ts` — no webpack plugin needed, fully Turbopack-compatible |
| Dark mode | Forced `.dark` class, no toggle | Spec commits to dark-only; remove `next-themes` entirely |

---

## Shared Abstractions

### 1. Vibe Colour Utilities

- **Name:** `vibe` module
- **Location:** `src/lib/vibe.ts`
- **Purpose:** Colour manipulation, contrast checking, localStorage helpers, preset definitions, CSS variable derivation
- **Consumers:** StatusBar (Phase 3), VibeDrawer (Phase 3), Vibe blocking script (Phase 3), ParticleCanvas (Phase 3), OG route (Phase 5)
- **Key exports:**
  - `VIBE_PRESETS: VibePreset[]` — 8 named presets with hex values
  - `DEFAULT_ACCENT = "#00ff88"` — mint green
  - `STORAGE_KEY = "xexr-vibe"` — localStorage key
  - `loadVibeColour(): string` — try/catch localStorage read with mint fallback
  - `saveVibeColour(hex: string): void` — try/catch localStorage write
  - `deriveAccentVars(hex: string): { dim: string; soft: string; glow: string }` — compute opacity variants
  - `checkContrast(hex: string, bg: string): number` — WCAG contrast ratio calculation
  - `meetsContrastAA(hex: string): boolean` — 4.5:1 against #050505

### 2. Content Helpers

- **Name:** `content` module
- **Location:** `src/lib/content.ts`
- **Purpose:** Re-export Velite collections with helper functions for common queries
- **Consumers:** Every page route, sitemap, RSS, 404, OG images
- **Key exports:**
  - `allPosts` — all non-draft posts sorted by date descending
  - `featuredPosts` — posts with `featured: true`
  - `allTags` — unique tags extracted from all posts
  - `getPostBySlug(slug: string): Post | undefined`
  - `getAdjacentPosts(slug: string): { prev?: Post; next?: Post }`
  - `allProjects` — all projects sorted by status priority
  - `allBooks` — all books grouped by status
  - `formatDate(date: string): string` — "22 Feb 2026" format

### 3. Extended Metadata

- **Name:** `generatePageMetadata` (extended)
- **Location:** `src/lib/metadata.ts`
- **Purpose:** Generate per-page Next.js Metadata with article support
- **Consumers:** Every page route that exports `generateMetadata`
- **Key changes:**
  - Accept optional: `type`, `publishedTime`, `modifiedTime`, `authors`, `tags`, `canonical`
  - Output `openGraph.type: "article"` with `published_time`, `author`, `tags` for post pages

### 4. Shared Types

- **Name:** Feature types
- **Location:** Types come from Velite schemas (auto-generated) and `src/lib/vibe.ts`
- **Key types:** `Post`, `Project`, `Book` (from Velite), `VibePreset`, `PageMetadataOptions`, `TOCItem`, `PostCardProps`

---

## Phased Delivery

### Phase 1: Foundation & Infrastructure Cleanup

**Objective:** Strip template defaults, install correct dependencies, establish the visual and configuration foundation that all subsequent phases build on.
**Prerequisites:** None (first phase)

#### Tasks

**1.1 Clean package.json dependencies**
- **What:** Remove unused template dependencies and add blog-specific packages
- **Files:**
  - Modify: `package.json` — remove packages, add packages, update scripts
- **Key details:**
  - Remove: `geist`, `drizzle-orm`, `@libsql/client`, `drizzle-zod`, `drizzle-kit`, `@trpc/client`, `@trpc/server`, `@trpc/tanstack-react-query`, `@tanstack/react-query`, `next-themes`, `@ai-sdk/openai`, `@ai-sdk/google`, `ai`, `@upstash/ratelimit`, `@upstash/redis`, `sonner`, `@doublezero/sdk`
  - Add: `velite`, `rehype-pretty-code`, `shiki`, `@giscus/react`, `remark-gfm`
  - Update dev script: `"dev": "next dev --port 3005"` (Turbopack is the Next.js 16 default; Velite runs via config-based integration)
  - Keep build script as: `"build": "next build"` (Velite starts via top-level `await` in `next.config.ts`, no `--webpack` needed)
  - Remove the `build:webpack` script (no longer needed)
  - Remove scripts: `db:start`, `db:generate`, `db:migrate`, `db:push`, `db:studio`, `db:seed`
- **Acceptance criteria:**
  - [ ] `pnpm install` succeeds with no missing peer deps
  - [ ] All removed packages absent from `node_modules` (verified via `pnpm ls`)
  - [ ] New packages installed and importable
  - [ ] `pnpm build` succeeds with Turbopack (default) — Velite runs via config integration
- **Dependencies:** None

**1.2 Clean environment variables**
- **What:** Strip database/AI/Redis env vars that block builds, add Giscus config
- **Files:**
  - Modify: `src/env.ts` — rewrite server/client schemas
- **Key details:**
  - Remove server vars: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `DB_TABLE_PREFIX`, `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `DOUBLEZERO_API_TOKEN`, `DOUBLEZERO_BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY`
  - Keep server: `NODE_ENV`
  - Keep client: `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_BRANCH_URL`
  - Add client (all optional): `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
  - Update `runtimeEnv` to match
- **Acceptance criteria:**
  - [ ] Build succeeds without any database/AI/Redis environment variables set
  - [ ] Giscus vars are optional and don't block builds
- **Dependencies:** None (parallel with 1.1)

**1.3 Update site configuration**
- **What:** Replace placeholder values with real site data, add new fields
- **Files:**
  - Modify: `src/lib/siteConfig.ts` — update values, add fields
- **Key details:**
  - `url` → `"https://xexr.com"`
  - `keywords` → `["AI", "indie hacker", "software development", "building in public", "AI orchestration"]`
  - `supportEmail` → real contact email (or remove)
  - Add: `author: { name: "Dane Poyzer", url: "https://xexr.com/about" }`
  - Add: `substackUrl: "https://xexr.substack.com"`
  - Add: `githubUrl: "https://github.com/xexr"`
  - Add: `twitterHandle: "@danepoyzer"`
- **Acceptance criteria:**
  - [ ] No placeholder values remain in siteConfig
  - [ ] New fields are typed and exported
- **Dependencies:** None (parallel with 1.1, 1.2)

**1.4 CSS token migration**
- **What:** Replace OKLCh colour tokens with spec palette, add Vibe CSS variables, update font references
- **Files:**
  - Modify: `src/styles/globals.css` — full colour token replacement
- **Key details:**
  - Dark-only: merge `:root` and `.dark` blocks (or make `:root` the sole source)
  - New token values:
    - `--background: #050505`
    - `--foreground: #e8e8e8` (headings)
    - `--muted-foreground: #8a8a8a` (secondary text, WCAG AA compliant)
    - `--accent: #00ff88` (default mint, overridden by Vibe script)
    - `--accent-dim: color-mix(in srgb, var(--accent) 18%, transparent)`
    - `--accent-soft: color-mix(in srgb, var(--accent) 25%, transparent)`
    - `--accent-glow: color-mix(in srgb, var(--accent) 10%, transparent)`
  - Font variable references: `--font-sans: var(--font-plus-jakarta-sans), sans-serif` and `--font-mono: var(--font-jetbrains-mono), monospace`
  - Add body text colour variable: `--body-text: #a0a0a0`
  - Keep the `@theme inline` block mapping so Tailwind classes like `bg-background`, `text-foreground`, `text-accent` work
  - Update scrollbar styling to match dark palette
  - Add heading letter-spacing: `-0.05em` (spec: "-1.5px in em units for zoom scaling")
  - Add `@media (forced-colors: active)` rules for readability in Windows High Contrast mode (ensure text and interactive elements remain distinguishable)
  - Add scanline overlay utility class:
    ```css
    .scanlines {
      background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px);
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 50;
    }
    ```
    The scanline DOM element (with `aria-hidden="true"`) goes in root layout (task 1.5).
- **Acceptance criteria:**
  - [ ] All colour tokens match spec values exactly
  - [ ] `text-accent` in Tailwind resolves to `#00ff88` by default
  - [ ] Font CSS variables reference new font families
  - [ ] No light-theme tokens remain
  - [ ] Heading letter-spacing is `-0.05em`
  - [ ] `@media (forced-colors: active)` rules present
  - [ ] Scanline overlay CSS utility defined
- **Dependencies:** None (parallel with 1.1, 1.2, 1.3)

**1.5 Root layout rewrite**
- **What:** Font migration, viewport fix, JSON-LD update, darkreader meta, skip-to-content link, remove CustomThemeProvider wrapper
- **Files:**
  - Modify: `src/app/layout.tsx` — major rewrite
  - Delete or gut: `src/app/_components/CustomThemeProvider.tsx`
- **Key details:**
  - Remove imports: `GeistSans`, `GeistMono` from `geist`, `Roboto` from `next/font/google`
  - Add imports: `Plus_Jakarta_Sans` from `next/font/google`, `JetBrains_Mono` from `next/font/google`
  - Configure fonts with CSS variable names: `--font-plus-jakarta-sans`, `--font-jetbrains-mono`
  - Apply font variables on `<html>`: `className={cn(plusJakartaSans.variable, jetbrainsMono.variable, "dark")}`
  - Viewport: remove `maximumScale: 1`, set `colorScheme: "dark"`
  - JSON-LD: replace `Organization` with `WebSite` schema:
    ```json
    { "@context": "https://schema.org", "@type": "WebSite", "name": "xexr.com", "url": "https://xexr.com", "author": { "@type": "Person", "name": "Dane Poyzer" } }
    ```
  - Add `<meta name="darkreader-lock" />` in `<head>`
  - Add skip-to-content link as first child of `<body>`: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to content</a>`
  - Remove `<CustomThemeProvider>` wrapper — the `.dark` class is set statically on `<html>`
  - Delete `CustomThemeProvider.tsx` (or remove its contents and the `next-themes` import)
  - Delete `ThemeToggle` component if it exists as a separate file
  - Add scanline overlay element in `<body>` (after skip-to-content, before content): `<div className="scanlines" aria-hidden="true" />` — uses CSS utility from 1.4
- **Acceptance criteria:**
  - [ ] Page renders with Plus Jakarta Sans for body/headings and JetBrains Mono for code
  - [ ] `maximumScale: 1` removed (verify in rendered `<meta name="viewport">`)
  - [ ] JSON-LD in page source shows `@type: "WebSite"`
  - [ ] `<meta name="darkreader-lock">` present in `<head>`
  - [ ] Skip-to-content link visible on keyboard focus
  - [ ] No `next-themes` ThemeProvider in component tree
  - [ ] `geist` package no longer imported anywhere
  - [ ] Scanline overlay element present with `aria-hidden="true"` and `pointer-events: none`
- **Dependencies:** 1.1 (fonts installed), 1.4 (CSS vars reference new font names)

**1.6 App layout cleanup**
- **What:** Remove tRPC provider, Toaster, add `id="main-content"`
- **Files:**
  - Modify: `src/app/(app)/layout.tsx` — remove providers, add id
- **Key details:**
  - Remove `TRPCReactProviderTanstack` import and wrapper
  - Remove `<Toaster />` (sonner)
  - Keep `NuqsAdapter` — needed for tag filtering URL sync
  - Add `id="main-content"` to `<main>` element
  - Keep flex layout structure but simplify max-width (spec uses 740px prose, not 7xl global)
- **Acceptance criteria:**
  - [ ] No tRPC provider in component tree
  - [ ] `<main id="main-content">` present in rendered HTML
  - [ ] `NuqsAdapter` still wraps content
- **Dependencies:** 1.2 (env.ts cleanup removes tRPC env vars)

**1.7 Next.js config updates**
- **What:** Add config-based Velite integration, CSP headers skeleton, keep existing config
- **Files:**
  - Modify: `next.config.ts` — add Velite build call, headers function
- **Key details:**
  - Start Velite via top-level `await` in config (Turbopack-compatible, no webpack plugin):
    ```typescript
    import { build } from "velite"

    await build({ watch: process.argv.includes("dev"), clean: !process.argv.includes("dev") })

    const nextConfig: NextConfig = {
      // ... existing config
    }
    export default nextConfig
    ```
    This runs Velite before Next.js starts — works with both Turbopack (default) and webpack.
  - Add `headers()` function with CSP: allow `'unsafe-inline'` for Vibe blocking script, `frame-src giscus.app`
  - Add empty `redirects()` function (mechanism for future post renames)
  - Keep `typedRoutes: true`, `images.remotePatterns`
- **Acceptance criteria:**
  - [ ] `pnpm build` succeeds (Velite runs via config, Turbopack bundles)
  - [ ] `pnpm dev` starts with Velite in watch mode and Turbopack HMR
  - [ ] CSP header present in response (verify with curl or browser dev tools)
  - [ ] Existing config preserved (typed routes, image patterns)
- **Dependencies:** 1.1 (velite package installed)

**1.8 Content directory structure**
- **What:** Create the content directories and a seed post for pipeline testing
- **Files:**
  - Create: `content/posts/hello-world/index.mdx` — seed post with all frontmatter fields
  - Create: `content/projects/` — empty directory (placeholder `.gitkeep`)
  - Create: `content/bookshelf/` — empty directory (placeholder `.gitkeep`)
- **Key details:**
  - Seed post exercises all frontmatter fields: title, description, date, tags, draft: false, featured: true
  - Include a code block, a heading, and a paragraph — enough to test the MDX pipeline
  - Add `content/` to `.gitignore` exclusion if needed (Velite output `.velite/` should be gitignored, but content is committed)
  - Add `.velite/` to `.gitignore`
- **Acceptance criteria:**
  - [ ] `content/posts/hello-world/index.mdx` exists with valid frontmatter
  - [ ] `.velite/` in `.gitignore`
  - [ ] Directory structure matches spec: `content/posts/*/index.mdx`
- **Dependencies:** None (parallel with all)

#### Phase 1 Exit Criteria
- [ ] `pnpm install` succeeds
- [ ] `pnpm typecheck` passes (no type errors from removed packages)
- [ ] `pnpm lint` passes
- [ ] Site renders at `localhost:3005` with correct fonts, dark background, mint accent
- [ ] No references to removed packages (geist, drizzle, tRPC, next-themes, AI SDK, Redis) in source

---

### Phase 2: Content Pipeline & Shared Abstractions

**Objective:** Build the Velite content pipeline, shared utility modules, and MDX custom components that all page routes depend on.
**Prerequisites:** Phase 1 — Velite installed, config-based integration working, content directory created

#### Tasks

**2.1 Velite configuration**
- **What:** Create Velite config with Post, Project, and Book collection schemas
- **Files:**
  - Create: `velite.config.ts` — at project root
- **Key details:**
  - Import `defineCollection`, `defineConfig`, `s` from `velite`
  - Posts schema: `pattern: "content/posts/*/index.mdx"`, fields per spec Data Model (title, description, date, updated, tags, draft, featured, image, readingTime)
  - Add `slug` transform (from directory name) and `url` transform (`/posts/${slug}`)
  - Add `readingTime` auto-calculation at 238 WPM if not manually set
  - Projects schema: `pattern: "content/projects/*.yaml"`, fields per spec
  - Books schema: `pattern: "content/bookshelf/*.yaml"`, fields per spec
  - Configure `rehype-pretty-code` with Shiki for syntax highlighting
  - Configure a custom Shiki theme that maps string literal token colour to `var(--accent)` so code blocks reflect the active Vibe. All other token colours should remain theme-neutral (spec: "syntax highlighting independent of Vibe — accent used for string literals only")
  - Configure `remark-gfm` for GitHub Flavored Markdown
  - Output to `.velite/` directory
- **Acceptance criteria:**
  - [ ] `pnpm build` runs Velite and generates `.velite/` output
  - [ ] Generated types match spec Data Model
  - [ ] Seed post compiles without errors
  - [ ] Code blocks in seed post have syntax highlighting
  - [ ] String literals in code blocks render in `var(--accent)` colour; other tokens are theme-neutral
- **Dependencies:** Phase 1 complete

**2.2 Content helper module**
- **What:** Create barrel re-export with query helpers for Velite collections
- **Files:**
  - Create: `src/lib/content.ts`
- **Key details:**
  - Import collections from Velite generated output (e.g., `import { posts, projects, books } from ".velite"` — exact path depends on Velite config output)
  - Export `allPosts`: filter out `draft: true` in production, sort by date descending
  - Export `featuredPosts`: `allPosts.filter(p => p.featured)`
  - Export `allTags`: `[...new Set(allPosts.flatMap(p => p.tags))]` sorted alphabetically
  - Export `getPostBySlug(slug: string): Post | undefined`
  - Export `getAdjacentPosts(slug: string): { prev?: Post; next?: Post }` — prev/next in date order
  - Export `allProjects`, `allBooks` sorted appropriately
  - Export `formatDate(date: string): string` — formats to "22 Feb 2026" using `Intl.DateTimeFormat`
  - Handle `noUncheckedIndexedAccess` — all array access uses `.find()` or null-checks
- **Acceptance criteria:**
  - [ ] All exports are properly typed
  - [ ] `getPostBySlug` returns `Post | undefined` (not `Post`)
  - [ ] `formatDate("2026-02-22")` returns `"22 Feb 2026"`
  - [ ] Draft posts excluded in production builds
- **Dependencies:** 2.1 (Velite generates collections)

**2.3 Vibe colour utilities**
- **What:** Create utility module for Vibe colour manipulation, storage, presets
- **Files:**
  - Create: `src/lib/vibe.ts`
- **Key details:**
  - `DEFAULT_ACCENT = "#00ff88"`
  - `STORAGE_KEY = "xexr-vibe"`
  - `VIBE_PRESETS: VibePreset[]` — 8 presets: Mint (#00ff88), Amber (#ffb300), Cyan (#00e5ff), Coral (#ff6b6b), Ice (#88ccff), Green (#44ff44), Orange (#ff8800), Pink (#ff44aa). Exact hex values TBD (open question in spec — use these as starting point, tune for WCAG AA contrast)
  - `loadVibeColour(): string` — try/catch localStorage read, return `DEFAULT_ACCENT` on failure
  - `saveVibeColour(hex: string): void` — try/catch localStorage write, silent skip on failure
  - `deriveAccentVars(hex: string): Record<string, string>` — returns `{ "--accent": hex, "--accent-dim": ..., "--accent-soft": ..., "--accent-glow": ... }`
  - `checkContrast(fg: string, bg: string): number` — relative luminance + WCAG contrast ratio formula
  - `meetsContrastAA(hex: string): boolean` — checks 4.5:1 against `#050505`
  - `hexToOklch(hex: string): { l: number; c: number; h: number }` — for spectrum slider
  - `oklchToHex(l: number, c: number, h: number): string` — for spectrum slider output
  - Export `VibePreset` type: `{ name: string; hex: string }`
- **Acceptance criteria:**
  - [ ] All functions are pure (no side effects except localStorage helpers)
  - [ ] `meetsContrastAA("#00ff88")` returns `true`
  - [ ] `loadVibeColour` returns `DEFAULT_ACCENT` when localStorage is empty
  - [ ] All 8 presets pass `meetsContrastAA`
- **Dependencies:** None (parallel with 2.1, 2.2)

**2.4 Extend metadata helpers**
- **What:** Add article metadata support to `generatePageMetadata`
- **Files:**
  - Modify: `src/lib/metadata.ts` — extend interface and function
- **Key details:**
  - Extend `PageMetadataOptions` with optional fields: `type?: "website" | "article"`, `publishedTime?: string`, `modifiedTime?: string`, `authors?: string[]`, `tags?: string[]`, `canonical?: string`
  - When `type === "article"`: set `openGraph.type: "article"`, include `article:published_time`, `article:author`, `article:tag`
  - When `canonical` provided: set `alternates: { canonical }`
  - Keep backward compatibility — existing calls without new fields still work
- **Acceptance criteria:**
  - [ ] Existing usage (no new fields) produces same output as before
  - [ ] Post page metadata includes `openGraph.type: "article"` with published_time
  - [ ] Canonical URL appears in metadata when provided
- **Dependencies:** None (parallel with 2.1-2.3)

**2.5 MDX components**
- **What:** Create MDX custom components and the mdx-components.tsx registry
- **Files:**
  - Create: `mdx-components.tsx` — at project root (Next.js convention)
  - Create: `src/app/_components/mdx/CodeBlock.tsx` — Shiki code block with macOS chrome + copy button
  - Create: `src/app/_components/mdx/Callout.tsx` — info/warning/tip callout
  - Create: `src/app/_components/mdx/MDXImage.tsx` — Next.js Image wrapper with caption
- **Key details:**
  - `mdx-components.tsx`: map `pre` → `CodeBlock`, custom components available in MDX
  - **CodeBlock:**
    - `"use client"` (copy button needs browser API)
    - macOS window chrome: three dots (red/yellow/green), `aria-hidden="true"`, filename tab if provided
    - Copy button: always visible (not hover-only for mobile), 44x44px touch target
    - Copy action: strips line numbers, diff markers, decorative elements from copied text
    - Icon changes to checkmark for 2s on copy
    - Long lines: horizontal scroll (never wrap)
    - Lines >30: collapse with expand button
    - Accent colour for line highlighting background (`var(--accent-dim)`)
    - Rounded corners (10px), elevated background (`#0d0d0d` or similar)
  - **Callout:**
    - Server component (no interactivity)
    - Variants via CVA: `info`, `warning`, `tip`
    - Left border in variant colour + icon (Lucide icons) + text label
    - Follow CVA pattern from `button.tsx`: export both component and `calloutVariants`
    - `data-slot="callout"`
  - **MDXImage:**
    - Server component wrapping `next/image`
    - Props: `src`, `alt` (required), `caption` (optional)
    - Blur placeholder via `plaiceholder` or Next.js built-in
    - Caption renders as `<figcaption>` inside `<figure>`
- **Acceptance criteria:**
  - [ ] Code blocks render with macOS chrome, syntax highlighting, and working copy button
  - [ ] Copy strips decorative elements (line numbers, diff markers)
  - [ ] Callout renders with correct variant styling and icon
  - [ ] Images render via Next.js Image with blur placeholder
  - [ ] All components follow CVA/`data-slot` patterns from existing codebase
- **Dependencies:** 2.1 (Velite compiles MDX with rehype-pretty-code)

#### Phase 2 Exit Criteria
- [ ] `pnpm build` compiles seed post through Velite pipeline successfully
- [ ] Content helpers return typed data (import in a test page to verify)
- [ ] All MDX custom components render correctly in seed post
- [ ] Vibe utilities pass basic smoke test (import and call functions)
- [ ] `pnpm typecheck` passes

---

### Phase 3: Components & Interactive Features

**Objective:** Build all shared UI components: navigation, footer, Vibe system (status bar + drawer + blocking script), and particle canvas.
**Prerequisites:** Phase 2 — Vibe utilities available, content helpers available

#### Tasks

**3.1 Footer component**
- **What:** Create site footer with branding, navigation, social links
- **Files:**
  - Create: `src/app/_components/Footer.tsx` — server component
- **Key details:**
  - Monospace "xexr" in accent colour (JetBrains Mono)
  - Two-column link layout:
    - Primary: Posts, About, Projects, Now
    - Secondary: Uses, Bookshelf, Colophon (hidden until content ready per Q7)
  - Social links: GitHub, Twitter/X (from siteConfig)
  - RSS icon linking to `/api/rss` (visible per spec: "RSS icon visible in footer for developer audience")
  - Subscribe link to Substack (from `siteConfig.substackUrl`)
  - Copyright line
  - Follow existing component patterns: `cn()` for classes, `data-slot="footer"`
- **Acceptance criteria:**
  - [ ] Footer renders at bottom of page (flexbox `flex-grow: 1` on content area pushes it down)
  - [ ] "xexr" text in accent colour, JetBrains Mono font
  - [ ] Links use accent underline decoration
  - [ ] RSS icon present and links to feed
- **Dependencies:** None within Phase 3 (parallel start)

**3.2 Header redesign**
- **What:** New logo, remove ThemeToggle, prepare for mobile nav
- **Files:**
  - Modify: `src/app/_components/Header.tsx` — redesign logo, remove toggle, restructure for mobile drawer
- **Key details:**
  - Logo: accent-coloured square with "x" character + monospace "xexr" text (JetBrains Mono)
  - The square uses `var(--accent)` for background/border — changes with Vibe
  - Remove `<ThemeToggle />` import and render
  - Desktop: logo + `<MainNav className="hidden md:flex" />` (keep pattern)
  - Mobile: replace bare `<MainNav className="p-3" />` with hamburger button that triggers `<MobileNav />`
  - Hamburger icon from Lucide (`Menu`)
- **Acceptance criteria:**
  - [ ] Logo shows accent square + monospace "xexr"
  - [ ] No theme toggle anywhere in header
  - [ ] Desktop shows inline nav links
  - [ ] Mobile shows hamburger icon (drawer built in 3.4)
- **Dependencies:** None within Phase 3 (parallel start)

**3.3 MainNav update**
- **What:** Populate nav items, update active state styling, apply JetBrains Mono
- **Files:**
  - Modify: `src/app/_components/MainNav.tsx` — nav items, styling
- **Key details:**
  - Replace empty `navItems` with:
    ```typescript
    const navItems: { href: Route; label: string }[] = [
      { href: "/posts", label: "Posts" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/now", label: "Now" },
    ];
    ```
  - Active state: accent-coloured underline or text colour using `var(--accent)` CSS variable (replace `bg-primary text-primary-foreground`)
  - Font: add `font-mono` class (maps to JetBrains Mono via CSS variables)
  - Active detection: use `pathname.startsWith(href)` for `/posts/[slug]` to highlight "Posts" parent
- **Acceptance criteria:**
  - [ ] Four nav items visible: Posts, About, Projects, Now
  - [ ] Active item highlighted with accent colour
  - [ ] Nav links in JetBrains Mono font
  - [ ] Post pages highlight "Posts" nav item
- **Dependencies:** 3.2 (Header renders MainNav)

**3.4 Mobile navigation drawer**
- **What:** Hamburger-triggered full-screen or slide-out mobile nav
- **Files:**
  - Create: `src/app/_components/MobileNav.tsx` — client component
- **Key details:**
  - `"use client"` — manages open/close state
  - Wrap Base UI `Dialog` primitive (follows existing `alert-dialog.tsx` pattern)
  - Trigger: hamburger button in Header (mobile only)
  - Content: same nav items as MainNav, larger touch targets (44x44px minimum)
  - Close on: backdrop click, Escape key, nav item click, close button
  - Focus trap when open
  - Animation: slide from right or fade (0.3s ease-out open, 0.2s ease-in close per spec)
  - `data-slot="mobile-nav"`
- **Acceptance criteria:**
  - [ ] Hamburger button opens drawer on mobile viewports
  - [ ] All four nav items present with accent styling
  - [ ] Drawer closes on nav item click (navigates to page)
  - [ ] Focus trapped inside drawer when open
  - [ ] Escape key closes drawer
- **Dependencies:** 3.2 (Header provides trigger), 3.3 (nav items defined)

**3.5 StatusBar component**
- **What:** Fixed bottom bar with Vibe pill
- **Files:**
  - Create: `src/app/_components/StatusBar.tsx` — client component
- **Key details:**
  - `"use client"` — reads Vibe colour, manages drawer open state
  - Fixed at viewport bottom, full width, rendered in root layout (outside `(app)` group)
  - Contains Vibe pill: text "vibe #[hex]" with coloured dot showing current accent
  - Pill click opens VibeDrawer (pass state setter as prop or use context)
  - First-visit discoverability: gentle CSS pulse/glow animation on the pill (no modal, no tooltip)
  - Pulse animation respects `prefers-reduced-motion`: disable animation, keep static glow
  - Follow `ReturnToTop.tsx` pattern: fixed positioning, z-50, `useEffect` for client-side state
  - `data-slot="status-bar"`
  - Offset `ReturnToTop` button to clear StatusBar (add margin-bottom)
- **Acceptance criteria:**
  - [ ] Bar visible at bottom of viewport on all pages
  - [ ] Pill shows current accent colour hex and coloured dot
  - [ ] Pill click opens Vibe drawer
  - [ ] Gentle pulse on first visit (animation)
  - [ ] `prefers-reduced-motion` disables pulse
- **Dependencies:** 2.3 (vibe utilities for colour reading)

**3.6 VibeDrawer component**
- **What:** Colour picker with 8 presets + continuous spectrum slider
- **Files:**
  - Create: `src/app/_components/VibeDrawer.tsx` — client component
- **Key details:**
  - `"use client"` — manages colour state, localStorage writes
  - Mobile: bottom sheet (slide up from bottom). Desktop: popover from pill.
  - Use Base UI `Dialog` for mobile bottom sheet, `Popover` for desktop. Switch based on viewport width or use a single responsive approach.
  - 8 preset buttons: each shows colour swatch + name, click applies colour
  - Continuous spectrum slider: horizontal bar showing colour range, drag to pick custom colour
  - On colour select (preset or slider):
    - Update CSS variables on `document.documentElement` via `style.setProperty`
    - Save to localStorage via `saveVibeColour()` from vibe.ts
    - Derive accent variants via `deriveAccentVars()` and set all 4 CSS vars
    - Transition: 0.4s cubic-bezier for preset clicks, instant during slider drag
  - WCAG AA enforcement: if picked colour fails `meetsContrastAA()`, show warning or snap to nearest passing colour
  - Tab sync: `StorageEvent` listener updates UI if another tab changes colour
  - Close via: backdrop/Escape/close button/re-click pill
  - Focus trap, keyboard accessible: Tab to presets, Arrow keys to navigate, Escape to close
  - Reset to default: re-selecting the Mint preset (or a dedicated Reset button) returns colour to `DEFAULT_ACCENT` (#00ff88) and clears/resets localStorage
  - `data-slot="vibe-drawer"`
- **Acceptance criteria:**
  - [ ] 8 preset buttons render with correct swatches and names
  - [ ] Clicking preset changes site-wide accent colour in real-time
  - [ ] Spectrum slider produces continuous colour selection
  - [ ] Colour persists across page reloads (localStorage)
  - [ ] Tab sync works (change in one tab reflects in another)
  - [ ] Keyboard fully navigable (Tab, Arrow, Escape)
  - [ ] WCAG AA contrast enforced (low-contrast colours rejected or warned)
  - [ ] Reset to default mint is available (re-selecting Mint preset or dedicated reset action)
- **Dependencies:** 2.3 (vibe utilities), 3.5 (StatusBar triggers drawer)

**3.7 Vibe blocking script**
- **What:** Inject blocking `<script>` in `<head>` for flash-free Vibe colour on page load
- **Files:**
  - Modify: `src/app/layout.tsx` — add `<script>` in `<head>` section
- **Key details:**
  - Self-contained IIFE — cannot import modules:
    ```javascript
    (function(){try{var c=localStorage.getItem("xexr-vibe");if(c){var h=document.documentElement;h.style.setProperty("--accent",c);/* derive dim/soft/glow inline */}}catch(e){}})();
    ```
  - Must derive `--accent-dim`, `--accent-soft`, `--accent-glow` inline (can't import vibe.ts)
  - Use `dangerouslySetInnerHTML` for the script content
  - Script must execute before React hydration — placed in `<head>` via Next.js metadata or direct JSX
  - Derivation logic: since `color-mix()` is in CSS, the script only needs to set `--accent`. The CSS `color-mix()` declarations in globals.css will derive the variants automatically. Simpler approach.
  - Fallback: if localStorage read fails, do nothing (CSS defaults to mint via globals.css)
- **Acceptance criteria:**
  - [ ] Return visit with saved Vibe colour shows correct colour immediately (no mint flash)
  - [ ] First visit shows mint (no script interference)
  - [ ] Script error doesn't break page load (try/catch)
  - [ ] CSP allows the inline script (configured in Phase 1 next.config.ts)
- **Dependencies:** Phase 1 (layout structure, CSP headers)

**3.8 Particle canvas**
- **What:** Atmospheric particle background in hero section
- **Files:**
  - Create: `src/app/_components/ParticleCanvas.tsx` — client component
- **Key details:**
  - `"use client"` — canvas + requestAnimationFrame
  - Full-width canvas behind hero content, `z-index` below text, `position: absolute`
  - ~60-100 nodes on desktop, ~40 on mobile (check `window.innerWidth` on mount)
  - Lines connect particles within 90px proximity
  - Particles match current accent colour (`getComputedStyle(document.documentElement).getPropertyValue("--accent")`) — re-read on Vibe change
  - Mouse repulsion within 100px radius on desktop (disabled on touch: check `'ontouchstart' in window`)
  - Radial gradient mask fades canvas edges to background
  - `prefers-reduced-motion`: disable particle animation, show static arrangement or hide entirely
  - Pause via `document.addEventListener("visibilitychange", ...)` when tab backgrounded
  - Progressive enhancement: if canvas or 2d context unavailable, render nothing (`return null`)
  - Cleanup: cancel `requestAnimationFrame` in `useEffect` cleanup, remove event listeners
  - `aria-hidden="true"` on canvas element
  - `data-slot="particle-canvas"`
- **Acceptance criteria:**
  - [ ] Particles render and animate smoothly in hero section
  - [ ] Particle colour matches current Vibe accent
  - [ ] Mouse repulsion works on desktop, disabled on touch
  - [ ] Animation pauses when tab is backgrounded
  - [ ] `prefers-reduced-motion` disables animation
  - [ ] No errors when canvas is unavailable
  - [ ] `aria-hidden="true"` on canvas
- **Dependencies:** 2.3 (reads `--accent` CSS variable set by Vibe system)

**3.9 ReturnToTop repositioning**
- **What:** Adjust ReturnToTop to clear the new StatusBar
- **Files:**
  - Modify: `src/app/_components/ReturnToTop.tsx` — adjust positioning, update styling
- **Key details:**
  - Change `bottom-4` to `bottom-16` (or similar) to clear StatusBar height
  - Update colours from `bg-primary` to accent-driven: `bg-accent/10 text-accent hover:bg-accent/20`
  - Keep same scroll detection logic and conditional render pattern
- **Acceptance criteria:**
  - [ ] ReturnToTop button doesn't overlap StatusBar
  - [ ] Button uses accent colour styling
- **Dependencies:** 3.5 (StatusBar exists to measure clearance)

#### Phase 3 Exit Criteria
- [ ] Full navigation works: header with logo, desktop nav, mobile hamburger drawer
- [ ] Footer renders at page bottom with links, RSS icon, social links
- [ ] Vibe system end-to-end: pill → drawer → colour change → persist → reload → correct colour
- [ ] Particle canvas animates in hero area with accent colour
- [ ] All interactive components keyboard-accessible
- [ ] `prefers-reduced-motion` respected by particles and Vibe pill animation

---

### Phase 4: Page Routes

**Objective:** Build all page routes — the homepage, blog index, post page (primary design focus), and supporting pages.
**Prerequisites:** Phase 2 (content pipeline, MDX components, metadata), Phase 3 (navigation, footer, Vibe components)

#### Tasks

**4.1 Homepage**
- **What:** Hero section with particles + featured posts below
- **Files:**
  - Modify: `src/app/(app)/page.tsx` — replace placeholder with full homepage
- **Key details:**
  - Server component — imports `featuredPosts`, `allPosts` from content helpers
  - Hero section (~60-70vh, 50-60vh on mobile):
    - `<ParticleCanvas />` as background (absolute positioned)
    - Name: "Dane Poyzer" (Plus Jakarta Sans 800, large)
    - Descriptor: static text — "Building AI-powered tools. Writing about what I learn."
    - Avatar: placeholder with initials "DP", static conic gradient ring in accent colour
  - Below hero — featured posts section:
    - n=1 (launch): single "Latest" section, no "Featured"/"Recent" labels (per Q21)
    - n=2+: featured card(s) at top, recent list below
    - Use `PostCard` component for each entry
  - Quick links to About, Projects, Subscribe (Substack)
  - Metadata: `openGraph.type: "website"`, title: "xexr.com — Dane Poyzer"
- **Acceptance criteria:**
  - [ ] Hero renders with particles, name, descriptor, avatar
  - [ ] Featured posts display below hero
  - [ ] n=1 case: no "Featured" label, just shows the post
  - [ ] Quick links present and functional
  - [ ] Page is a server component (no "use client")
- **Dependencies:** 2.2 (content helpers), 3.8 (ParticleCanvas), 4.2 (PostCard component)

**4.2 PostCard and PostList components**
- **What:** Reusable post display components for homepage and blog index
- **Files:**
  - Create: `src/app/_components/PostCard.tsx` — server component
  - Create: `src/app/_components/PostList.tsx` — client component (for tag filtering)
- **Key details:**
  - **PostCard** (server component):
    - Compact list item: title, date ("22 Feb 2026"), tags (max 3 pills + "+N more"), reading time
    - Hover effect: 1px accent line grows left-to-right along bottom border (0.4s ease) + title transitions to accent colour
    - Touch devices: no hover animation, subtle tap feedback via `:active`
    - Link wraps entire card (`<Link href={post.url}>`)
    - Tags as small `<Badge>` components with accent styling
    - `data-slot="post-card"`
  - **PostList** (client component):
    - `"use client"` — manages tag filter state via `nuqs` (`useQueryState`)
    - Receives all posts as props (server-rendered, passed down)
    - Tag filter pills at top: each tag is a toggle button, active = accent filled
    - Client-side filtering: `posts.filter(p => !selectedTag || p.tags.includes(selectedTag))`
    - URL sync: `/posts?tag=ai` via `nuqs`
    - Pagination (simple, not infinite scroll): page size ~10, URL sync `/posts?page=2`
    - Filter resets pagination to page 1
    - Empty state: "No posts tagged [tag]" with link to clear filter
    - Wrapped in `<Suspense>` for `useSearchParams` (Next.js requirement)
- **Acceptance criteria:**
  - [ ] PostCard renders title, date, tags, reading time in compact layout
  - [ ] Hover effect works on desktop (accent line + title colour)
  - [ ] Tag filtering works: click tag → list filters, URL updates
  - [ ] Pagination works within filtered set
  - [ ] Empty state shows when no posts match filter
  - [ ] URL reflects current state (`/posts?tag=ai&page=2`)
- **Dependencies:** 2.2 (content helpers, formatDate)

**4.3 Blog index page**
- **What:** `/posts` page with all posts and tag filtering
- **Files:**
  - Create: `src/app/(app)/posts/page.tsx` — server component wrapping client PostList
- **Key details:**
  - Server component: fetches `allPosts` and `allTags` from content helpers
  - Passes data to `<PostList>` client component
  - Page metadata: title "Posts", description "Writing about AI, indie hacking, and building in public"
  - Wrap `<PostList>` in `<Suspense>` (required for `useSearchParams`)
- **Acceptance criteria:**
  - [ ] All non-draft posts listed in date descending order
  - [ ] Tag filter pills visible at top
  - [ ] Page is SEO-friendly (server-rendered post list)
  - [ ] Metadata correct for the page
- **Dependencies:** 4.2 (PostList, PostCard components)

**4.4 Post page (primary design focus)**
- **What:** Individual post page — the core reading experience
- **Files:**
  - Create: `src/app/(app)/posts/[slug]/page.tsx` — server component
  - Create: `src/app/_components/TableOfContents.tsx` — client component
  - Create: `src/app/_components/ShareButtons.tsx` — client component
  - Create: `src/app/_components/SubscribeCTA.tsx` — server component
  - Create: `src/app/_components/GiscusComments.tsx` — client component
  - Create: `src/app/_components/PostNavigation.tsx` — server component
- **Key details:**
  - **Post page (`[slug]/page.tsx`):**
    - `generateStaticParams` from `allPosts` for static generation
    - `generateMetadata` using extended metadata helper with `type: "article"`, `publishedTime`, tags
    - JSON-LD: `BlogPosting` schema with author, datePublished, description
    - Layout: centred prose column (740px max-width), generous line-height (1.7-1.8)
    - Title: Plus Jakarta Sans 800, large, tight letter-spacing
    - Metadata bar: date, reading time, tags (clickable, link to `/posts?tag=X`)
    - "Published [date] / Updated [date]" if `updated` field present
    - MDX content rendered via Velite's compiled body
    - Post-reading sequence (in order):
      1. `<SubscribeCTA />` — "Enjoyed this? Subscribe for more" + Substack link
      2. `<ShareButtons />` — Copy link + Twitter share
      3. `<GiscusComments />` — lazy-loaded
      4. `<PostNavigation />` — prev/next with title + date
    - External links: `target="_blank"` + `rel="noopener noreferrer"` + small external link icon (configure via MDX or rehype plugin)

  - **TableOfContents:**
    - `"use client"` — IntersectionObserver for active section highlighting
    - Desktop (1200px+): sticky right margin, fixed position alongside prose
    - Mobile (<1200px): collapsible disclosure at top of article
    - Extract headings from MDX content (h2, h3 only)
    - Active heading highlighted with accent colour
    - Click scrolls to section with smooth scroll

  - **ShareButtons:**
    - `"use client"` — clipboard API, Web Share API
    - Copy link: copies current URL, icon changes to checkmark for 2s
    - Twitter: opens new tab with pre-filled tweet text (post title + URL)
    - Mobile: use Web Share API if available (navigator.share)

  - **SubscribeCTA:**
    - Server component — simple banner with Substack link
    - Text: "Enjoyed this? Get new posts in your inbox" (or similar)
    - Link to `siteConfig.substackUrl`
    - Accent-styled border/background

  - **GiscusComments:**
    - `"use client"` — wraps `@giscus/react` component
    - Lazy-load via IntersectionObserver: render only when scrolled into view
    - Config from environment variables (`NEXT_PUBLIC_GISCUS_*`) or siteConfig
    - Dark theme matching site palette
    - Fallback if Giscus unavailable: "Comments temporarily unavailable" text
    - `data-slot="giscus-comments"`

  - **PostNavigation:**
    - Server component — receives prev/next posts as props
    - Two-column layout: "← Previous" on left, "Next →" on right
    - Each shows post title + date
    - Accent hover effects

- **Acceptance criteria:**
  - [ ] Post renders with correct title, metadata, content, and reading flow
  - [ ] ToC works: desktop sticky, mobile collapsible, active section highlighted
  - [ ] Subscribe CTA links to Substack
  - [ ] Share: copy link works (checkmark confirmation), Twitter opens pre-filled tweet
  - [ ] Giscus comments load lazily when scrolled into view
  - [ ] Prev/next navigation shows correct adjacent posts
  - [ ] JSON-LD BlogPosting schema in page source
  - [ ] `generateStaticParams` generates all post slugs
  - [ ] 404 returned for non-existent slugs
- **Dependencies:** 2.2 (content helpers), 2.4 (extended metadata), 2.5 (MDX components)

**4.5 About page**
- **What:** Narrative about page with structured CTAs
- **Files:**
  - Create: `src/app/(app)/about/page.tsx` — server component (MDX or hardcoded)
- **Key details:**
  - Narrative-first: Who Dane is, path (ACA → tech → indie hacker), what he's building, beliefs
  - Photo placeholder (initials avatar for now, real photo when available)
  - Structured CTAs for credibility evaluators:
    - "See what I've built" → `/projects`
    - "Read my thinking" → `/posts`
  - Social links: GitHub, Twitter, email, Substack
  - JSON-LD: `Person` schema with name, url, sameAs (social links)
  - Metadata: title "About", description about Dane
  - Content can be MDX (from `content/about.mdx`) or hardcoded JSX for launch
- **Acceptance criteria:**
  - [ ] Narrative content renders with proper typography
  - [ ] CTAs link to Projects and Posts
  - [ ] Social links present
  - [ ] JSON-LD Person schema in page source
- **Dependencies:** None within Phase 4 (parallel with other pages)

**4.6 Projects page**
- **What:** Stacked list of projects with status badges
- **Files:**
  - Create: `src/app/(app)/projects/page.tsx` — server component
- **Key details:**
  - Import `allProjects` from content helpers
  - Stacked list layout: full-width rows
  - Each project: name, one-liner description, tech stack badges, status badge (active/maintained/shelved/archived), external link
  - Status badge styling: active=accent, maintained=muted accent, shelved=grey, archived=dim grey
  - Tags shared with posts for cross-discovery (link tags to `/posts?tag=X`)
  - Works well with n=1-2 projects at launch
  - Metadata: title "Projects"
- **Acceptance criteria:**
  - [ ] Projects render in stacked list with all fields
  - [ ] Status badges styled per status type
  - [ ] Tech stack renders as badge pills
  - [ ] External links open in new tab
- **Dependencies:** 2.2 (content helpers)

**4.7 Now page**
- **What:** Ephemeral "now" page with staleness indicator
- **Files:**
  - Create: `src/app/(app)/now/page.tsx` — server component (MDX or hardcoded)
- **Key details:**
  - Content from MDX file (`content/now.mdx`) or hardcoded for launch
  - "Last updated: 22 Feb 2026 (7 days ago)" — prominent, calculated from frontmatter date
  - If >90 days old: subtle "This page may be out of date" note
  - Sections: Current projects, learning, reading, life updates
  - Replace content on update — git history preserves old versions (no archive UI)
  - Metadata: title "Now"
- **Acceptance criteria:**
  - [ ] Last updated date shown with relative time ("X days ago")
  - [ ] Staleness warning appears when >90 days old
  - [ ] Content renders with proper typography
- **Dependencies:** None within Phase 4 (parallel)

#### Phase 4 Exit Criteria
- [ ] All 6 page routes render correctly: `/`, `/posts`, `/posts/[slug]`, `/about`, `/projects`, `/now`
- [ ] Post page reading flow works end-to-end: content → subscribe CTA → share → comments → prev/next
- [ ] Tag filtering on `/posts` syncs with URL
- [ ] Table of contents works on desktop and mobile
- [ ] All pages have correct metadata and JSON-LD schemas
- [ ] Navigation between pages works (links, nav, footer)

---

### Phase 5: SEO, Feeds, Testing & Polish

**Objective:** Complete SEO infrastructure, add feeds, write tests, perform accessibility audit, and create sample content.
**Prerequisites:** Phase 4 — all pages built, content pipeline working

#### Tasks

**5.1 Sitemap rewrite**
- **What:** Generate sitemap from Velite collections instead of static array
- **Files:**
  - Modify: `src/app/sitemap.ts` — full rewrite
- **Key details:**
  - Import `allPosts` from content helpers
  - Generate entries for: `/`, `/posts`, `/about`, `/projects`, `/now`
  - One entry per published post: `/posts/[slug]` with `lastModified` from post date
  - Remove all `/signin`, `/signup`, `/forgot-password`, `/admin`, `/dashboard` entries
- **Acceptance criteria:**
  - [ ] `/sitemap.xml` lists all pages and posts
  - [ ] No stale/irrelevant URLs in sitemap
  - [ ] `lastModified` set correctly on post entries
- **Dependencies:** None within Phase 5

**5.2 Robots.txt cleanup**
- **What:** Remove irrelevant disallow rules
- **Files:**
  - Modify: `src/app/robots.ts` — simplify rules
- **Key details:**
  - `disallow: ["/api"]` — block API routes only
  - Remove `/admin`, `/dashboard` blocks
  - Add `sitemap: "https://xexr.com/sitemap.xml"`
- **Acceptance criteria:**
  - [ ] `/robots.txt` only blocks `/api`
  - [ ] Sitemap URL present
- **Dependencies:** None (parallel)

**5.3 404 page redesign**
- **What:** Enhanced 404 with recovery paths and recent posts
- **Files:**
  - Modify: `src/app/not-found.tsx` — redesign
- **Key details:**
  - Server component — imports `allPosts` for recent posts
  - "Page not found" heading
  - Recovery paths: link to homepage, link to blog index
  - List of 3 most recent posts (from `allPosts.slice(0, 3)`)
  - Dark theme styling matching site design
- **Acceptance criteria:**
  - [ ] 404 page shows recovery links (home, posts)
  - [ ] 3 recent posts displayed
  - [ ] Styling matches site design
- **Dependencies:** 2.2 (content helpers)

**5.4 OG image route rebrand**
- **What:** Update OG image generation to match site branding
- **Files:**
  - Modify: `src/app/api/og/route.tsx` — colours, font, template
- **Key details:**
  - Background: `#050505`
  - Accent/gradient: mint `rgba(0, 255, 136, 0.15)` (always mint — OG images don't know user's Vibe)
  - Load Plus Jakarta Sans font via `next/og` font fetch
  - Accept query params: `title`, `description`, `date`, `tags` — for post-specific OG images
  - Long titles truncated at ~80 characters
  - Badge styling: mint border/colour
- **Acceptance criteria:**
  - [ ] OG images use #050505 background and mint accent
  - [ ] Plus Jakarta Sans renders in OG images
  - [ ] Post-specific OG images include title, description, date
  - [ ] Long titles truncate gracefully
- **Dependencies:** None (parallel)

**5.5 RSS feed**
- **What:** Full-content RSS feed
- **Files:**
  - Create: `src/app/api/rss/route.ts` — RSS XML generator
- **Key details:**
  - Import `allPosts` from content helpers
  - Generate RSS 2.0 XML with full content (not excerpts)
  - Strip/convert custom MDX components to plain HTML equivalents in feed content
  - Set `Content-Type: application/rss+xml`
  - Include: title, description, link, pubDate, guid for each post
  - Channel: site title, description, link from siteConfig
- **Acceptance criteria:**
  - [ ] `/api/rss` returns valid RSS 2.0 XML
  - [ ] All published posts included with full content
  - [ ] Custom MDX components converted to plain HTML
  - [ ] Feed validates in an RSS validator
- **Dependencies:** 2.2 (content helpers)

**5.6 Unit tests for vibe utilities**
- **What:** Test colour manipulation, localStorage, contrast checking
- **Files:**
  - Create: `src/lib/vibe.test.ts` — co-located unit tests
- **Key details:**
  - Test `loadVibeColour()`: returns default when localStorage empty, returns stored value when present, returns default when localStorage throws
  - Test `saveVibeColour()`: writes to localStorage, doesn't throw when localStorage unavailable
  - Test `meetsContrastAA()`: mint passes, dark colours fail, edge cases
  - Test `checkContrast()`: known contrast ratio values
  - Test `hexToOklch()` / `oklchToHex()`: round-trip accuracy
  - Test all 8 presets pass contrast check
  - Mock localStorage for tests (jsdom or manual mock)
- **Acceptance criteria:**
  - [ ] All vibe utility functions have test coverage
  - [ ] Tests pass: `pnpm test:unit -- src/lib/vibe.test.ts`
  - [ ] Edge cases covered (empty storage, throws, boundary contrast values)
- **Dependencies:** 2.3 (vibe.ts exists)

**5.7 Unit tests for content helpers**
- **What:** Test content query functions
- **Files:**
  - Create: `src/lib/content.test.ts` — co-located unit tests
- **Key details:**
  - Test `formatDate()`: various date strings produce correct format
  - Test `getPostBySlug()`: returns post for valid slug, undefined for invalid
  - Test `getAdjacentPosts()`: correct prev/next for middle, first, last posts
  - Test draft filtering: drafts excluded in production
  - Test `allTags`: correct unique tag extraction
  - May need to mock Velite collections for unit tests
- **Acceptance criteria:**
  - [ ] Content helper functions have test coverage
  - [ ] Tests pass: `pnpm test:unit -- src/lib/content.test.ts`
- **Dependencies:** 2.2 (content.ts exists)

**5.8 Accessibility audit**
- **What:** Verify WCAG AA compliance across all pages
- **Files:**
  - May modify multiple files for fixes
- **Key details:**
  - Verify skip-to-content link works (keyboard focus → Enter → scrolls to main)
  - Verify all Vibe presets meet 4.5:1 contrast against #050505
  - Verify `aria-hidden` on: particle canvas, traffic light dots (code blocks), scanline overlay
  - Verify `prefers-reduced-motion`: particles disabled, Vibe transitions instant
  - Verify keyboard navigation: Vibe drawer (Tab/Arrow/Escape), mobile nav (focus trap), ToC links
  - Verify code block copy button: 44x44px touch target, accessible label
  - Verify external links: `rel="noopener noreferrer"`, external link icon
  - Verify `<time datetime="...">` on all dates
  - Verify all body links have underline decoration (not colour-only)
  - Verify `pointer-events: none` on scanline overlay
  - Verify `@media (forced-colors: active)` rules produce readable output
  - Run automated accessibility check (axe-core or similar)
- **Acceptance criteria:**
  - [ ] All WCAG AA requirements from spec verified
  - [ ] No critical accessibility violations from automated scanning
  - [ ] Keyboard-only navigation works for all interactive features
  - [ ] Forced-colors mode renders readable content
- **Dependencies:** All phases (audit runs on complete site)

**5.9 Sample content and final cleanup**
- **What:** Create real seed content, clean up unused files, restyle error page, update README
- **Files:**
  - Modify: `content/posts/hello-world/index.mdx` — flesh out into a real first post
  - Create: `content/projects/gas-town.yaml` (or similar real project) — seed project
  - Modify: `src/app/error.tsx` — restyle to match new dark palette and accent colours
  - Modify: `README.md` — remove references to `pnpm db:start`, `pnpm db:studio`; update to reflect blog architecture
  - Delete: any unused files from template (check for orphaned tRPC files, unused provider files)
- **Key details:**
  - First post should exercise all MDX features: headings, code blocks, callout, image, links
  - Project data should be real (at least 1 project with all fields)
  - Restyle `error.tsx`: update Card styling to match new dark palette (#050505 background, accent colours), keep the existing error/reset pattern
  - Verify all removed packages have no remaining imports in source (`grep` for package names)
  - Update README with correct setup instructions
- **Acceptance criteria:**
  - [ ] First post renders correctly with all MDX features
  - [ ] At least 1 project displays on `/projects`
  - [ ] Error page (`error.tsx`) renders with correct dark palette and accent styling
  - [ ] No references to removed packages in source code
  - [ ] README reflects actual project architecture
- **Dependencies:** All phases complete

**5.10 Dead link checking in CI**
- **What:** Set up automated dead link detection
- **Files:**
  - Create: `.github/workflows/links.yml` (or add to existing CI) — dead link checker
- **Key details:**
  - Install `lychee` (or similar tool) as a CI step
  - Run against built site output to catch broken internal and external links
  - Can run as a GitHub Action on push/PR
  - Exclude known-dynamic URLs (e.g., `localhost`, placeholder domains)
- **Acceptance criteria:**
  - [ ] Dead link check runs in CI
  - [ ] Broken links fail the check (non-zero exit code)
  - [ ] No false positives on known-good URLs
- **Dependencies:** 5.9 (content exists to check)

#### Phase 5 Exit Criteria
- [ ] `/sitemap.xml` and `/robots.txt` are correct
- [ ] 404 page shows recovery paths
- [ ] OG images render with correct branding
- [ ] RSS feed is valid and includes all posts
- [ ] All unit tests pass
- [ ] Accessibility audit passes with no critical issues
- [ ] First post and project content live
- [ ] `pnpm build` succeeds end-to-end
- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO

---

## Cross-Cutting Concerns

### Error Handling

Follow the existing codebase pattern: simple try/catch with fallback values for progressive enhancement features. No custom error classes.

- **Vibe localStorage:** try/catch with mint fallback (pattern in `src/lib/vibe.ts`)
- **Particle canvas:** check for canvas/context support, `return null` if unavailable
- **Giscus:** conditional render, show "Comments temporarily unavailable" on load failure
- **Tag filter empty state:** render inline message, not an error condition
- **Post not found:** `notFound()` from `next/navigation` triggers 404 page
- **Console logging:** `console.error` for internal issues only; no user-facing error modals for non-critical features
- **Build errors:** Velite schema validation fails loudly at build time (correct behaviour — invalid content shouldn't deploy)

### Testing Strategy

- **Unit tests** (Phase 5): co-located `*.test.ts` in `src/lib/` for pure utility functions
  - `src/lib/vibe.test.ts` — colour utilities, localStorage helpers, contrast checking
  - `src/lib/content.test.ts` — date formatting, query helpers
  - Framework: Vitest with `node` environment, `SKIP_ENV_VALIDATION=true`
  - Coverage targets: branches 50%, functions 60%, lines 55% (existing thresholds in `vitest.config.coverage.ts`)
- **React components:** not unit tested per existing codebase convention (coverage config excludes React components)
- **Integration tests:** deferred to post-launch. Velite schema validation is the primary integration test (runs at build time).
- **Manual testing:** verify all user flows from spec (social visitor, returning reader, credibility evaluator, Vibe customisation, content authoring)

### Migration

No data migration needed. The site has no existing production data. The "migration" is strictly removing template defaults from the scaffold:

- Remove unused dependencies (Phase 1.1)
- Remove database/AI environment variables (Phase 1.2)
- Replace placeholder config values (Phase 1.3)
- Replace colour tokens (Phase 1.4)
- Replace fonts (Phase 1.5)
- Remove tRPC provider (Phase 1.6)

All migration work is in Phase 1. No feature flags or backward compatibility needed.

---

## Technical Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Velite config-based integration breaks in future Next.js | Low | High | Config-based `await build()` is Velite's recommended approach. Falls back to npm script orchestration (`npm-run-all`) or `contentlayer2` if needed. |
| Vibe blocking script blocked by CSP | Medium | Medium | Use `'unsafe-inline'` in CSP for scripts, or generate nonce per request. Test CSP with browser dev tools. |
| Colour contrast failures for custom Vibe colours | Low | Medium | `meetsContrastAA()` enforces 4.5:1 in drawer; spectrum slider snaps to nearest passing value. |
| Particle canvas performance on low-end devices | Medium | Low | Reduce count on mobile, pause when backgrounded, `prefers-reduced-motion` disables entirely. Canvas is progressive enhancement. |
| `noUncheckedIndexedAccess` causes many `T | undefined` issues | Medium | Low | Use `.find()` instead of array index access. Pattern already handled in codebase. Minor developer friction, not a risk to functionality. |
| Giscus configuration complexity (repo, category setup) | Low | Low | All config is public env vars. Document setup steps. Falls back to hidden comments section. |
| OKLCh colour space browser support | Low | Low | `color-mix()` has 95%+ browser support. The blocking script sets hex directly; OKLCh is only used for the spectrum slider UI. Fallback to hex-based slider if needed. |
| Velite watch mode reliability under Turbopack | Low | Low | Config-based integration starts Velite in watch mode during `next dev`. If file watching conflicts arise, fall back to npm script orchestration with parallel processes. |

---

## Spec Coverage Matrix

| Spec Section | Plan Section | Phase |
|-------------|-------------|-------|
| Overview | Overview, Architecture Decisions | All |
| Scope Questions & Answers (all) | Decisions inform all tasks | All |
| Architecture Overview | Architecture Decisions, Phase 1 (foundation) | 1 |
| Component 1: Vibe System | 2.3 (utilities), 3.5 (StatusBar), 3.6 (VibeDrawer), 3.7 (blocking script) | 2, 3 |
| Component 2: Particle Canvas | 3.8 (ParticleCanvas) | 3 |
| Component 3: MDX Content Pipeline | 2.1 (Velite config), 2.5 (MDX components) | 2 |
| Component 4: Post Page | 4.4 (Post page + sub-components) | 4 |
| Component 5: Navigation | 3.2 (Header), 3.3 (MainNav), 3.4 (MobileNav), 3.1 (Footer) | 3 |
| Component 6: Status Bar | 3.5 (StatusBar) | 3 |
| Data Model — Posts | 2.1 (Velite schema) | 2 |
| Data Model — Projects | 2.1 (Velite schema) | 2 |
| Data Model — Bookshelf | 2.1 (Velite schema) | 2 |
| Data Model — localStorage | 2.3 (vibe utilities), 3.7 (blocking script) | 2, 3 |
| User Flow 1: Social visitor | 4.4 (Post page), 4.2 (PostCard), 3.5/3.6 (Vibe discovery) | 3, 4 |
| User Flow 2: Returning reader | 4.1 (Homepage), 4.3 (Blog index), 4.7 (Now page) | 4 |
| User Flow 3: Credibility evaluator | 4.5 (About), 4.6 (Projects), 4.3 (Posts) | 4 |
| User Flow 4: Vibe customisation | 3.5 (StatusBar), 3.6 (VibeDrawer), 3.7 (blocking script) | 3 |
| User Flow 5: Content authoring | 2.1 (Velite pipeline), 1.8 (content structure) | 1, 2 |
| Error Handling | Cross-Cutting: Error Handling | All |
| Integration Points — existing codebase | Phase 1 (leverage existing patterns) | 1 |
| Integration Points — new dependencies | 1.1 (package.json) | 1 |
| Integration Points — font migration | 1.5 (root layout) | 1 |
| Page: Homepage | 4.1 | 4 |
| Page: Blog Index | 4.3 (page), 4.2 (PostList/PostCard) | 4 |
| Page: Post Page | 4.4 (page + sub-components) | 4 |
| Page: About | 4.5 | 4 |
| Page: Projects | 4.6 | 4 |
| Page: Now | 4.7 | 4 |
| Page: Uses | Deferred — create placeholder route when content ready | Post-launch |
| Page: Bookshelf | Deferred — create placeholder route when content ready | Post-launch |
| Page: Colophon | Deferred — create placeholder route when content ready | Post-launch |
| Visual Design: Colour System | 1.4 (CSS tokens), 2.3 (Vibe utilities) | 1, 2 |
| Visual Design: Typography | 1.4 (CSS), 1.5 (fonts) | 1 |
| Visual Design: Spacing | 1.4 (CSS), 4.4 (prose width) | 1, 4 |
| Visual Design: Hover Effects | 4.2 (PostCard), 3.3 (MainNav) | 3, 4 |
| Visual Design: Code Blocks | 2.5 (CodeBlock MDX component) | 2 |
| Visual Design: Branding | 3.2 (Header logo), 3.1 (Footer) | 3 |
| Out of Scope | N/A — explicitly excluded from plan | N/A |
| Codebase Migration: viewport fix | 1.5 (root layout) | 1 |
| Codebase Migration: JSON-LD | 1.5 (root layout), 4.4 (BlogPosting), 4.5 (Person) | 1, 4 |
| Codebase Migration: sitemap/robots | 5.1, 5.2 | 5 |
| Codebase Migration: siteConfig | 1.3 | 1 |
| Codebase Migration: OG route | 5.4 | 5 |
| Codebase Migration: darkreader-lock | 1.5 (root layout) | 1 |
| Codebase Migration: skip-to-content | 1.5 (root layout) | 1 |
| Codebase Migration: CSS tokens | 1.4 | 1 |
| Codebase Migration: content structure | 1.8 | 1 |
| Codebase Migration: route organisation | Phase 4 (all pages in (app)) | 4 |
| Codebase Migration: CSP headers | 1.7 (next.config.ts) | 1 |
| Codebase Migration: README cleanup | 5.9 | 5 |
| Accessibility: WCAG AA contrast | 2.3 (meetsContrastAA), 5.8 (audit) | 2, 5 |
| Accessibility: prefers-reduced-motion | 3.8 (particles), 3.5 (StatusBar), 5.8 (audit) | 3, 5 |
| Accessibility: skip-to-content | 1.5 (root layout) | 1 |
| Accessibility: keyboard navigation | 3.4 (MobileNav), 3.6 (VibeDrawer), 5.8 (audit) | 3, 5 |
| Accessibility: aria-hidden | 3.8 (canvas), 2.5 (CodeBlock dots), 5.8 (audit) | 2, 3, 5 |
| Progressive Enhancement | 3.8 (particles), 3.5/3.6 (Vibe), 4.4 (Giscus), 2.5 (copy button) | 2, 3, 4 |
| Performance: next/font | 1.5 (root layout) | 1 |
| Performance: Next.js Image | 2.5 (MDXImage) | 2 |
| RSS | 5.5 | 5 |
| Open Questions | Architecture Decisions (presets), 2.3 (preset hex values) | 2 |

**Deferred pages (Uses, Bookshelf, Colophon):** Per spec Q7 — "Ship what's ready, hide the rest." These pages are not visible in navigation until content exists. The Velite schemas for projects and books are created in Phase 2, and placeholder routes can be added post-launch when content is ready. Footer links to these pages are hidden until populated.

---

## Appendix: Key File Paths

### New Files

| Path | Phase | Purpose |
|------|-------|---------|
| `velite.config.ts` | 2.1 | Velite content pipeline configuration |
| `mdx-components.tsx` | 2.5 | MDX component overrides (Next.js convention) |
| `content/posts/hello-world/index.mdx` | 1.8 | Seed blog post |
| `content/projects/.gitkeep` | 1.8 | Project data directory |
| `content/bookshelf/.gitkeep` | 1.8 | Book data directory |
| `src/lib/vibe.ts` | 2.3 | Vibe colour utilities |
| `src/lib/vibe.test.ts` | 5.6 | Vibe utility tests |
| `src/lib/content.ts` | 2.2 | Velite collection re-exports and helpers |
| `src/lib/content.test.ts` | 5.7 | Content helper tests |
| `src/app/_components/Footer.tsx` | 3.1 | Site footer |
| `src/app/_components/MobileNav.tsx` | 3.4 | Hamburger nav drawer |
| `src/app/_components/StatusBar.tsx` | 3.5 | Fixed bottom Vibe pill |
| `src/app/_components/VibeDrawer.tsx` | 3.6 | Colour picker drawer |
| `src/app/_components/ParticleCanvas.tsx` | 3.8 | Hero particle animation |
| `src/app/_components/PostCard.tsx` | 4.2 | Post card for lists |
| `src/app/_components/PostList.tsx` | 4.2 | Post list with filtering |
| `src/app/_components/TableOfContents.tsx` | 4.4 | Sticky/collapsible TOC |
| `src/app/_components/ShareButtons.tsx` | 4.4 | Copy link + Twitter share |
| `src/app/_components/SubscribeCTA.tsx` | 4.4 | Subscribe call-to-action |
| `src/app/_components/GiscusComments.tsx` | 4.4 | Lazy-loaded Giscus comments |
| `src/app/_components/PostNavigation.tsx` | 4.4 | Prev/next post navigation |
| `src/app/_components/mdx/CodeBlock.tsx` | 2.5 | Shiki code block + copy button |
| `src/app/_components/mdx/Callout.tsx` | 2.5 | MDX callout block |
| `src/app/_components/mdx/MDXImage.tsx` | 2.5 | Next.js Image wrapper |
| `src/app/(app)/posts/page.tsx` | 4.3 | Blog index page |
| `src/app/(app)/posts/[slug]/page.tsx` | 4.4 | Post page |
| `src/app/(app)/about/page.tsx` | 4.5 | About page |
| `src/app/(app)/projects/page.tsx` | 4.6 | Projects page |
| `src/app/(app)/now/page.tsx` | 4.7 | Now page |
| `src/app/api/rss/route.ts` | 5.5 | RSS feed |

### Modified Files

| Path | Phase | Changes |
|------|-------|---------|
| `package.json` | 1.1 | Remove 15+ unused deps, add 5 new deps, update scripts |
| `src/env.ts` | 1.2 | Strip DB/AI/Redis vars, add optional Giscus vars |
| `src/lib/siteConfig.ts` | 1.3 | Replace placeholders, add author/social fields |
| `src/styles/globals.css` | 1.4 | Full colour token replacement, font vars, Vibe vars |
| `src/app/layout.tsx` | 1.5, 3.7 | Font migration, viewport fix, JSON-LD, darkreader, skip-link, Vibe script, StatusBar render |
| `src/app/(app)/layout.tsx` | 1.6 | Remove tRPC/Toaster, add main-content id |
| `next.config.ts` | 1.7 | Velite config-based integration, CSP headers, redirects |
| `src/app/_components/Header.tsx` | 3.2 | Logo redesign, remove ThemeToggle, mobile nav trigger |
| `src/app/_components/MainNav.tsx` | 3.3 | Populate nav items, accent styling, font |
| `src/app/_components/ReturnToTop.tsx` | 3.9 | Reposition for StatusBar, update colours |
| `src/lib/metadata.ts` | 2.4 | Extend for article metadata (publishedTime, tags, canonical) |
| `src/app/(app)/page.tsx` | 4.1 | Replace placeholder with full homepage |
| `src/app/sitemap.ts` | 5.1 | Rewrite from Velite collections |
| `src/app/robots.ts` | 5.2 | Remove stale disallow rules |
| `src/app/not-found.tsx` | 5.3 | Redesign with recovery paths + recent posts |
| `src/app/api/og/route.tsx` | 5.4 | Rebrand: mint accent, #050505 bg, Plus Jakarta Sans |

### Deleted Files

| Path | Phase | Reason |
|------|-------|--------|
| `src/app/_components/CustomThemeProvider.tsx` | 1.5 | Dark-only site; next-themes removed |
