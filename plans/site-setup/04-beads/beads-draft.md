# Beads Draft: site-setup

**Generated:** 2026-02-23
**Source:** plans/site-setup/03-plan/plan.md
**Plan review status:** Reviewed (all P0/P1/P2 findings resolved)
**Post-review consolidation:** 9 beads merged → 30 open task beads (was 39)

> **Note:** This draft reflects the original 1:1 plan-to-bead mapping. After review,
> beads were consolidated to reduce execution units. Merged issues are marked
> with `[MERGED → target]`. The beads database is the source of truth for
> current descriptions and acceptance criteria. See `beads-report.md` for the
> current state.

---

## Structure

### Feature Epic: site-setup

**Type:** epic
**Priority:** P1
**Description:** Build xexr.com — a dark-first personal blog with Vibe accent colour system, particle canvas hero, MDX content via Velite, and Giscus comments. 5 phases: foundation cleanup, content pipeline, interactive components, page routes, SEO/testing/polish.

---

### Sub-Epic: Phase 1 — Foundation & Infrastructure Cleanup

**Type:** epic
**Priority:** P1
**Parent:** Feature epic
**Description:** Strip template defaults, install correct dependencies, establish the visual and configuration foundation that all subsequent phases build on.

#### Issue: Foundation config cleanup (1.1) [CONSOLIDATED: absorbed 1.2, 1.3]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Remove unused template dependencies, strip database/AI env vars, and update site configuration with real data. See beads database for current merged description.

**Files:**
- Modify: `package.json`

**Key details:**
- Remove: `geist`, `drizzle-orm`, `@libsql/client`, `drizzle-zod`, `drizzle-kit`, `@trpc/client`, `@trpc/server`, `@trpc/tanstack-react-query`, `@tanstack/react-query`, `next-themes`, `@ai-sdk/openai`, `@ai-sdk/google`, `ai`, `@upstash/ratelimit`, `@upstash/redis`, `sonner`, `@doublezero/sdk`
- Add: `velite`, `rehype-pretty-code`, `shiki`, `@giscus/react`, `remark-gfm`
- Update dev script: `"dev": "next dev --port 3005"` (Turbopack is Next.js 16 default; Velite runs via config-based integration)
- Keep build script as: `"build": "next build"` (Velite starts via top-level `await` in `next.config.ts`)
- Remove the `build:webpack` script
- Remove scripts: `db:start`, `db:generate`, `db:migrate`, `db:push`, `db:studio`, `db:seed`

**Acceptance Criteria:**
- [ ] `pnpm install` succeeds with no missing peer deps
- [ ] All removed packages absent from `node_modules` (verified via `pnpm ls`)
- [ ] New packages installed and importable
- [ ] `pnpm build` succeeds with Turbopack (default) — Velite runs via config integration

#### ~~Issue: Clean environment variables (1.2)~~ [MERGED → 1.1]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Strip database/AI/Redis env vars that block builds, add Giscus config.

**Files:**
- Modify: `src/env.ts`

**Key details:**
- Remove server vars: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `DB_TABLE_PREFIX`, `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `DOUBLEZERO_API_TOKEN`, `DOUBLEZERO_BASE_URL`, `GOOGLE_GENERATIVE_AI_API_KEY`
- Keep server: `NODE_ENV`
- Keep client: `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_BRANCH_URL`
- Add client (all optional): `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY`, `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- Update `runtimeEnv` to match

**Acceptance Criteria:**
- [ ] Build succeeds without any database/AI/Redis environment variables set
- [ ] Giscus vars are optional and don't block builds

#### ~~Issue: Update site configuration (1.3)~~ [MERGED → 1.1]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Replace placeholder values with real site data, add new fields.

**Files:**
- Modify: `src/lib/siteConfig.ts`

**Key details:**
- `url` → `"https://xexr.com"`
- `keywords` → `["AI", "indie hacker", "software development", "building in public", "AI orchestration"]`
- Remove `supportEmail` field entirely (not needed for launch)
- Add: `author: { name: "Dane Poyzer", url: "https://xexr.com/about" }`
- Add: `substackUrl: "https://xexr.substack.com"`
- Add: `githubUrl: "https://github.com/xexr"`
- Add: `twitterHandle: "@danepoyzer"`

**Acceptance Criteria:**
- [ ] No placeholder values remain in siteConfig
- [ ] New fields are typed and exported

#### Issue: CSS token migration (1.4)

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Replace OKLCh colour tokens with spec palette, add Vibe CSS variables, update font references.

**Files:**
- Modify: `src/styles/globals.css`

**Key details:**
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
- Keep `@theme inline` block so Tailwind classes work
- Update scrollbar styling to match dark palette
- Add heading letter-spacing: `-0.05em`
- Add `@media (forced-colors: active)` rules for Windows High Contrast mode
- Add scanline overlay utility class (`.scanlines` with repeating-linear-gradient, pointer-events: none, fixed inset 0, z-50)

**Acceptance Criteria:**
- [ ] All colour tokens match spec values exactly
- [ ] `text-accent` in Tailwind resolves to `#00ff88` by default
- [ ] Font CSS variables reference new font families
- [ ] No light-theme tokens remain
- [ ] Heading letter-spacing is `-0.05em`
- [ ] `@media (forced-colors: active)` rules present
- [ ] Scanline overlay CSS utility defined

#### Issue: Root layout rewrite (1.5) [CONSOLIDATED: absorbed 3.7]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** Task 1.1, Task 1.4, Task 1.7
**Description:**
Font migration, viewport fix, JSON-LD update, darkreader meta, skip-to-content link, remove CustomThemeProvider wrapper, and inject Vibe blocking script. See beads database for current merged description.

**Files:**
- Modify: `src/app/layout.tsx`
- Delete or gut: `src/app/_components/CustomThemeProvider.tsx`

**Key details:**
- Remove imports: `GeistSans`, `GeistMono` from `geist`, `Roboto` from `next/font/google`
- Add imports: `Plus_Jakarta_Sans` from `next/font/google`, `JetBrains_Mono` from `next/font/google`
- Configure fonts with CSS variable names: `--font-plus-jakarta-sans`, `--font-jetbrains-mono`
- Apply font variables on `<html>`: `className={cn(plusJakartaSans.variable, jetbrainsMono.variable, "dark")}`
- Viewport: remove `maximumScale: 1`, set `colorScheme: "dark"`
- JSON-LD: replace `Organization` with `WebSite` schema
- Add `<meta name="darkreader-lock" />` in `<head>`
- Add skip-to-content link as first child of `<body>`
- Remove `<CustomThemeProvider>` wrapper
- Delete `CustomThemeProvider.tsx`
- Delete `ThemeToggle` component if it exists as a separate file
- Add scanline overlay element: `<div className="scanlines" aria-hidden="true" />`

**Acceptance Criteria:**
- [ ] Page renders with Plus Jakarta Sans for body/headings and JetBrains Mono for code
- [ ] `maximumScale: 1` removed
- [ ] JSON-LD in page source shows `@type: "WebSite"`
- [ ] `<meta name="darkreader-lock">` present in `<head>`
- [ ] Skip-to-content link visible on keyboard focus
- [ ] No `next-themes` ThemeProvider in component tree
- [ ] `geist` package no longer imported anywhere
- [ ] Scanline overlay element present with `aria-hidden="true"` and `pointer-events: none`

#### ~~Issue: App layout cleanup (1.6)~~ [MERGED → 1.7]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Remove tRPC provider, Toaster, add `id="main-content"`.

**Files:**
- Modify: `src/app/(app)/layout.tsx`

**Key details:**
- Remove `TRPCReactProviderTanstack` import and wrapper
- Remove `<Toaster />` (sonner)
- Keep `NuqsAdapter` — needed for tag filtering URL sync
- Add `id="main-content"` to `<main>` element
- Do not apply a global max-width in this layout file; max-width constraints (740px prose) are applied per page component in Phase 4

**Acceptance Criteria:**
- [ ] No tRPC provider in component tree
- [ ] `<main id="main-content">` present in rendered HTML
- [ ] `NuqsAdapter` still wraps content

#### Issue: Next.js config and app layout cleanup (1.7) [CONSOLIDATED: absorbed 1.6]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** Task 1.1
**Description:**
Add config-based Velite integration, CSP headers, and clean up app layout by removing tRPC/Toaster wrappers. See beads database for current merged description.

**Files:**
- Modify: `next.config.ts`

**Key details:**
- Start Velite via top-level `await` in config (Turbopack-compatible):
  ```typescript
  import { build } from "velite"
  await build({ watch: process.argv.includes("dev"), clean: !process.argv.includes("dev") })
  ```
- Add `headers()` function with CSP: allow `'unsafe-inline'` for Vibe blocking script, `frame-src giscus.app`
- Add empty `redirects()` function
- Keep `typedRoutes: true`, `images.remotePatterns`

**Acceptance Criteria:**
- [ ] `pnpm build` succeeds (Velite runs via config, Turbopack bundles)
- [ ] `pnpm dev` starts with Velite in watch mode and Turbopack HMR
- [ ] CSP header present in response
- [ ] Existing config preserved (typed routes, image patterns)

#### Issue: Content initialization (1.8) [CONSOLIDATED: absorbed 5.9]

**Type:** task
**Priority:** P1
**Parent:** Phase 1
**Dependencies:** None
**Description:**
Create content directories, seed post, sample project data, restyle error page, and update README. See beads database for current merged description.

**Files:**
- Create: `content/posts/hello-world/index.mdx`
- Create: `content/projects/.gitkeep`
- Create: `content/bookshelf/.gitkeep`

**Key details:**
- Seed post exercises all frontmatter fields: title, description, date, tags, draft: false, featured: true
- Include a code block, a heading, and a paragraph — enough to test the MDX pipeline
- Add `.velite/` to `.gitignore`

**Acceptance Criteria:**
- [ ] `content/posts/hello-world/index.mdx` exists with valid frontmatter
- [ ] `.velite/` in `.gitignore`
- [ ] Directory structure matches spec: `content/posts/*/index.mdx`

---

### Sub-Epic: Phase 2 — Content Pipeline & Shared Abstractions

**Type:** epic
**Priority:** P2
**Parent:** Feature epic
**Description:** Build the Velite content pipeline, shared utility modules, and MDX custom components that all page routes depend on. Requires Phase 1 — Velite installed, config-based integration working, content directory created.

#### Issue: Content pipeline (2.1) [CONSOLIDATED: absorbed 2.2]

**Type:** task
**Priority:** P2
**Parent:** Phase 2
**Dependencies:** Task 1.1, Task 1.7, Task 1.8
**Description:**
Create Velite configuration with collection schemas and content helper module with query functions. See beads database for current merged description.

**Files:**
- Create: `velite.config.ts`

**Key details:**
- Import `defineCollection`, `defineConfig`, `s` from `velite`
- Posts schema: `pattern: "content/posts/*/index.mdx"`, fields per spec Data Model (title, description, date, updated, tags, draft, featured, image, readingTime)
- Add `slug` transform (from directory name) and `url` transform (`/posts/${slug}`)
- Add `readingTime` auto-calculation at 238 WPM if not manually set
- Projects schema: `pattern: "content/projects/*.yaml"`, fields: `name: string`, `description: string`, `url?: string` (external project URL), `repo?: string` (GitHub repo URL), `techStack: string[]` (tech badges), `status: 'active' | 'maintained' | 'shelved' | 'archived'`, `featured: boolean`, `tags: string[]` (shared with posts for cross-discovery)
- Books schema: `pattern: "content/bookshelf/*.yaml"`, fields: `title: string`, `author: string`, `status: 'reading' | 'finished' | 'want-to-read'`, `thoughts?: string` (2-3 sentence review), `link?: string` (OpenLibrary/Goodreads link), `dateFinished?: string`
- Configure `rehype-pretty-code` with Shiki for syntax highlighting
- Configure a custom Shiki theme that maps string literal token colour to `var(--accent)` so code blocks reflect the active Vibe. All other token colours should remain theme-neutral
- Configure `remark-gfm` for GitHub Flavored Markdown
- Output to `.velite/` directory

**Acceptance Criteria:**
- [ ] `pnpm build` runs Velite and generates `.velite/` output
- [ ] Generated types match spec Data Model
- [ ] Seed post compiles without errors
- [ ] Code blocks in seed post have syntax highlighting
- [ ] String literals in code blocks render in `var(--accent)` colour; other tokens are theme-neutral

#### ~~Issue: Content helper module (2.2)~~ [MERGED → 2.1]

**Type:** task
**Priority:** P2
**Parent:** Phase 2
**Dependencies:** Task 2.1 (Velite configuration)
**Description:**
Create barrel re-export with query helpers for Velite collections.

**Files:**
- Create: `src/lib/content.ts`

**Key details:**
- Import collections from Velite generated output
- Export `allPosts`: filter out `draft: true` in production, sort by date descending
- Export `featuredPosts`: `allPosts.filter(p => p.featured)`
- Export `allTags`: `[...new Set(allPosts.flatMap(p => p.tags))]` sorted alphabetically
- Export `getPostBySlug(slug: string): Post | undefined`
- Export `getAdjacentPosts(slug: string): { prev?: Post; next?: Post }`
- Export `allProjects`, `allBooks` sorted appropriately
- Export `formatDate(date: string): string` — "22 Feb 2026" using `Intl.DateTimeFormat`
- Handle `noUncheckedIndexedAccess` — use `.find()` or null-checks

**Acceptance Criteria:**
- [ ] All exports are properly typed
- [ ] `getPostBySlug` returns `Post | undefined` (not `Post`)
- [ ] `formatDate("2026-02-22")` returns `"22 Feb 2026"`
- [ ] Draft posts excluded in production builds

#### Issue: Vibe colour utilities (2.3)

**Type:** task
**Priority:** P2
**Parent:** Phase 2
**Dependencies:** None
**Description:**
Create utility module for Vibe colour manipulation, storage, presets.

**Files:**
- Create: `src/lib/vibe.ts`

**Key details:**
- `DEFAULT_ACCENT = "#00ff88"`
- `STORAGE_KEY = "xexr-vibe"`
- `VIBE_PRESETS: VibePreset[]` — 8 presets: Mint (#00ff88), Amber (#ffb300), Cyan (#00e5ff), Coral (#ff6b6b), Ice (#88ccff), Green (#44ff44), Orange (#ff8800), Pink (#ff44aa). Tune for WCAG AA contrast.
- `loadVibeColour(): string` — try/catch localStorage read, return `DEFAULT_ACCENT` on failure
- `saveVibeColour(hex: string): void` — try/catch localStorage write, silent skip on failure
- `deriveAccentVars(hex: string): Record<string, string>` — returns CSS variable map
- `checkContrast(fg: string, bg: string): number` — WCAG contrast ratio formula
- `meetsContrastAA(hex: string): boolean` — checks 4.5:1 against `#050505`
- `hexToOklch(hex: string): { l: number; c: number; h: number }` — for spectrum slider
- `oklchToHex(l: number, c: number, h: number): string` — for spectrum slider output
- Export `VibePreset` type: `{ name: string; hex: string }`

**Acceptance Criteria:**
- [ ] All functions are pure (no side effects except localStorage helpers)
- [ ] `meetsContrastAA("#00ff88")` returns `true`
- [ ] `loadVibeColour` returns `DEFAULT_ACCENT` when localStorage is empty
- [ ] All 8 presets pass `meetsContrastAA`

#### Issue: Extend metadata helpers (2.4)

**Type:** task
**Priority:** P2
**Parent:** Phase 2
**Dependencies:** None
**Description:**
Add article metadata support to `generatePageMetadata`.

**Files:**
- Modify: `src/lib/metadata.ts`

**Key details:**
- Extend `PageMetadataOptions` with optional fields: `type?: "website" | "article"`, `publishedTime?: string`, `modifiedTime?: string`, `authors?: string[]`, `tags?: string[]`, `canonical?: string`
- When `type === "article"`: set `openGraph.type: "article"`, include article metadata
- When `canonical` provided: set `alternates: { canonical }`
- Keep backward compatibility

**Acceptance Criteria:**
- [ ] Existing usage (no new fields) produces same output as before
- [ ] Post page metadata includes `openGraph.type: "article"` with published_time
- [ ] Canonical URL appears in metadata when provided

#### Issue: MDX components (2.5)

**Type:** task
**Priority:** P2
**Parent:** Phase 2
**Dependencies:** Task 2.1 (Velite configuration)
**Description:**
Create MDX custom components and the mdx-components.tsx registry.

**Files:**
- Create: `mdx-components.tsx` (project root)
- Create: `src/app/_components/mdx/CodeBlock.tsx`
- Create: `src/app/_components/mdx/Callout.tsx`
- Create: `src/app/_components/mdx/MDXImage.tsx`

**Key details:**
- `mdx-components.tsx`: map `pre` → `CodeBlock`, custom components available in MDX
- **CodeBlock** (`"use client"`): macOS window chrome (three dots, `aria-hidden`), filename tab, copy button (always visible, 44x44px touch target), strips line numbers/diff markers from copied text, checkmark 2s on copy, horizontal scroll for long lines, collapse >30 lines with expand, accent for line highlighting (`var(--accent-dim)`), rounded corners
- **Callout** (server component): CVA variants: `info`, `warning`, `tip`. Left border + icon + text label. `data-slot="callout"`
- **MDXImage** (server component): wraps `next/image`. Props: `src`, `alt` (required), `caption` (optional). `<figcaption>` inside `<figure>`

**Acceptance Criteria:**
- [ ] Code blocks render with macOS chrome, syntax highlighting, and working copy button
- [ ] Copy strips decorative elements (line numbers, diff markers)
- [ ] Callout renders with correct variant styling and icon
- [ ] Images render via Next.js Image with blur placeholder
- [ ] All components follow CVA/`data-slot` patterns from `src/app/_components/ui/button.tsx` (reference implementation)

---

### Sub-Epic: Phase 3 — Components & Interactive Features

**Type:** epic
**Priority:** P2
**Parent:** Feature epic
**Description:** Build all shared UI components: navigation, footer, Vibe system (status bar + drawer + blocking script), and particle canvas.

#### Issue: Footer component (3.1)

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** None
**Description:**
Create site footer with branding, navigation, social links.

**Files:**
- Create: `src/app/_components/Footer.tsx` (server component)

**Key details:**
- Monospace "xexr" in accent colour (JetBrains Mono)
- Two-column link layout: Primary (Posts, About, Projects, Now), Secondary (Uses, Bookshelf, Colophon — hidden until content ready)
- Social links: GitHub, Twitter/X (from siteConfig)
- RSS icon linking to `/api/rss`
- Subscribe link to Substack
- Copyright line
- `data-slot="footer"`

**Acceptance Criteria:**
- [ ] Footer renders at bottom of page
- [ ] "xexr" text in accent colour, JetBrains Mono font
- [ ] Links use accent underline decoration
- [ ] RSS icon present and links to feed

#### Issue: Desktop navigation (3.2) [CONSOLIDATED: absorbed 3.3]

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** None
**Description:**
Redesign header with new logo and build desktop navigation with active state styling. See beads database for current merged description.

**Files:**
- Modify: `src/app/_components/Header.tsx`

**Key details:**
- Logo: accent-coloured square with "x" character + monospace "xexr" text (JetBrains Mono)
- Square uses `var(--accent)` for background/border — changes with Vibe
- Remove `<ThemeToggle />` import and render
- Desktop: logo + `<MainNav className="hidden md:flex" />`
- Mobile: hamburger button that triggers `<MobileNav />`
- Hamburger icon from Lucide (`Menu`)

**Acceptance Criteria:**
- [ ] Logo shows accent square + monospace "xexr"
- [ ] No theme toggle anywhere in header
- [ ] Desktop shows inline nav links
- [ ] Mobile shows hamburger icon

#### ~~Issue: MainNav update (3.3)~~ [MERGED → 3.2]

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 3.2 (Header redesign)
**Description:**
Populate nav items, update active state styling, apply JetBrains Mono.

**Files:**
- Modify: `src/app/_components/MainNav.tsx`

**Key details:**
- Nav items: Posts, About, Projects, Now
- Active state: accent-coloured underline or text colour using `var(--accent)`
- Font: add `font-mono` class (JetBrains Mono)
- Active detection: `pathname.startsWith(href)` for sub-page highlighting

**Acceptance Criteria:**
- [ ] Four nav items visible: Posts, About, Projects, Now
- [ ] Active item highlighted with accent colour
- [ ] Nav links in JetBrains Mono font
- [ ] Post pages highlight "Posts" nav item

#### Issue: Mobile navigation drawer (3.4)

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 3.2 (Desktop navigation)
**Description:**
Hamburger-triggered full-screen or slide-out mobile nav.

**Files:**
- Create: `src/app/_components/MobileNav.tsx` (`"use client"`)

**Key details:**
- Wrap Base UI `Dialog` primitive (`import * as Dialog from "@base-ui-components/react/dialog"` — follows the pattern in `src/app/_components/ui/alert-dialog.tsx`)
- Same nav items as MainNav, larger touch targets (44x44px minimum)
- Close on: backdrop click, Escape, nav item click, close button
- Focus trap when open
- Animation: slide from right or fade (0.3s ease-out open, 0.2s ease-in close)
- `data-slot="mobile-nav"`

**Acceptance Criteria:**
- [ ] Hamburger button opens drawer on mobile viewports
- [ ] All four nav items present with accent styling
- [ ] Drawer closes on nav item click
- [ ] Focus trapped inside drawer when open
- [ ] Escape key closes drawer

#### Issue: StatusBar and ReturnToTop (3.5) [CONSOLIDATED: absorbed 3.9]

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 2.3 (Vibe colour utilities)
**Description:**
Create fixed bottom StatusBar with Vibe pill, and reposition ReturnToTop to clear it. See beads database for current merged description.

**Files:**
- Create: `src/app/_components/StatusBar.tsx` (`"use client"`)

**Key details:**
- Fixed at viewport bottom, full width, rendered in root layout
- Vibe pill: text "vibe #[hex]" with coloured dot showing current accent
- Pill click opens VibeDrawer
- First-visit discoverability: gentle CSS pulse/glow animation on pill
- Pulse respects `prefers-reduced-motion`: disable animation, keep static glow
- Follow `ReturnToTop.tsx` pattern: fixed positioning, z-50
- `data-slot="status-bar"`
- Note: ReturnToTop button repositioning is handled in task 3.9

**Acceptance Criteria:**
- [ ] Bar visible at bottom of viewport on all pages
- [ ] Pill shows current accent colour hex and coloured dot
- [ ] Pill click opens Vibe drawer
- [ ] Gentle pulse on first visit
- [ ] `prefers-reduced-motion` disables pulse

#### Issue: VibeDrawer component (3.6)

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 2.3 (Vibe colour utilities), Task 3.5 (StatusBar component)
**Description:**
Colour picker with 8 presets + continuous spectrum slider.

**Files:**
- Create: `src/app/_components/VibeDrawer.tsx` (`"use client"`)

**Key details:**
- Mobile: bottom sheet (slide up). Desktop: popover from pill.
- Use Base UI `Dialog` for mobile, `Popover` for desktop
- 8 preset buttons: colour swatch + name, click applies colour
- Continuous spectrum slider: horizontal colour range bar
- On colour select: update CSS vars on `documentElement`, save to localStorage, derive accent variants, transition 0.4s for presets / instant during slider drag
- WCAG AA enforcement: warn or snap if picked colour fails `meetsContrastAA()`
- Tab sync: `StorageEvent` listener
- Close via: backdrop/Escape/close button/re-click pill
- Focus trap, keyboard accessible
- Reset to default: re-selecting Mint preset returns to `DEFAULT_ACCENT` and resets localStorage
- `data-slot="vibe-drawer"`

**Acceptance Criteria:**
- [ ] 8 preset buttons render with correct swatches and names
- [ ] Clicking preset changes site-wide accent colour in real-time
- [ ] Spectrum slider produces continuous colour selection
- [ ] Colour persists across page reloads
- [ ] Tab sync works
- [ ] Keyboard fully navigable (Tab, Arrow, Escape)
- [ ] WCAG AA contrast enforced
- [ ] Reset to default mint is available

#### ~~Issue: Vibe blocking script (3.7)~~ [MERGED → 1.5]

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 1.4 (CSS token migration), Task 1.5 (Root layout rewrite), Task 1.7 (Next.js config updates)
**Description:**
Inject blocking `<script>` in `<head>` for flash-free Vibe colour on page load.

**Files:**
- Modify: `src/app/layout.tsx`

**Key details:**
- Self-contained IIFE: reads localStorage, sets `--accent` on `documentElement`
- CSS `color-mix()` declarations in globals.css derive variants automatically — script only sets `--accent`
- Use `dangerouslySetInnerHTML`
- Script in `<head>` before React hydration
- Fallback: if localStorage read fails, do nothing (CSS defaults to mint)

**Acceptance Criteria:**
- [ ] Return visit with saved Vibe colour shows correct colour immediately (no mint flash)
- [ ] First visit shows mint (no script interference)
- [ ] Script error doesn't break page load (try/catch)
- [ ] CSP allows the inline script

#### Issue: Particle canvas (3.8)

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** None
**Description:**
Atmospheric particle background in hero section.

**Files:**
- Create: `src/app/_components/ParticleCanvas.tsx` (`"use client"`)

**Key details:**
- Full-width canvas behind hero content, `z-index` below text, `position: absolute`
- ~60-100 nodes on desktop, ~40 on mobile
- Lines connect particles within 90px proximity
- Particles match current accent colour (read `--accent` CSS variable)
- Mouse repulsion within 100px radius on desktop (disabled on touch)
- Radial gradient mask fades canvas edges
- `prefers-reduced-motion`: disable animation, show static or hide
- Pause via `visibilitychange` when tab backgrounded
- Progressive enhancement: if canvas unavailable, render nothing
- Cleanup: cancel `requestAnimationFrame` and remove listeners
- `aria-hidden="true"`, `data-slot="particle-canvas"`

**Acceptance Criteria:**
- [ ] Particles render and animate smoothly in hero section
- [ ] Particle colour matches current Vibe accent
- [ ] Mouse repulsion works on desktop, disabled on touch
- [ ] Animation pauses when tab is backgrounded
- [ ] `prefers-reduced-motion` disables animation
- [ ] No errors when canvas is unavailable
- [ ] `aria-hidden="true"` on canvas

#### ~~Issue: ReturnToTop repositioning (3.9)~~ [MERGED → 3.5]

**Type:** task
**Priority:** P2
**Parent:** Phase 3
**Dependencies:** Task 3.5 (StatusBar component)
**Description:**
Adjust ReturnToTop to clear the new StatusBar.

**Files:**
- Modify: `src/app/_components/ReturnToTop.tsx`

**Key details:**
- Change `bottom-4` to `bottom-16` to clear StatusBar height (~48px bar + padding)
- Replace `bg-primary` / `hover:bg-primary` classes with `bg-accent/10 text-accent hover:bg-accent/20` (uses CSS variable `--accent`)
- Keep same scroll detection logic

**Acceptance Criteria:**
- [ ] ReturnToTop button doesn't overlap StatusBar
- [ ] Button uses accent colour styling

---

### Sub-Epic: Phase 4 — Page Routes

**Type:** epic
**Priority:** P2
**Parent:** Feature epic
**Description:** Build all page routes — homepage, blog index, post page (primary design focus), and supporting pages.

#### Issue: Homepage (4.1)

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** Task 2.1 (Content pipeline), Task 3.8 (Particle canvas), Task 4.2 (Blog listing)
**Description:**
Hero section with particles + featured posts below.

**Files:**
- Modify: `src/app/(app)/page.tsx`

**Key details:**
- Server component — imports `featuredPosts`, `allPosts` from content helpers
- Hero section (~60-70vh, 50-60vh on mobile): ParticleCanvas background, "Dane Poyzer" (Plus Jakarta Sans 800), descriptor text, avatar placeholder with conic gradient ring
- Below hero: featured posts section. n=1: single "Latest" section. n=2+: featured cards + recent list
- Quick links to About, Projects, Subscribe
- Metadata: `openGraph.type: "website"`, title: "xexr.com — Dane Poyzer"

**Acceptance Criteria:**
- [ ] Hero renders with particles, name, descriptor, avatar
- [ ] Featured posts display below hero
- [ ] n=1 case: no "Featured" label, just shows the post
- [ ] Quick links present and functional
- [ ] Page is a server component (no "use client")

#### Issue: Blog listing (4.2) [CONSOLIDATED: absorbed 4.3]

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Build PostCard/PostList components and the /posts index page. See beads database for current merged description.

**Files:**
- Create: `src/app/_components/PostCard.tsx` (server component)
- Create: `src/app/_components/PostList.tsx` (`"use client"`)

**Key details:**
- **PostCard**: Compact list item: title, date, tags (max 3 pills + "+N"), reading time. Hover: accent line grows left-to-right + title transitions to accent. Touch: subtle `:active` feedback. Link wraps entire card. `data-slot="post-card"`
- **PostList**: Tag filter state via `nuqs` (`useQueryState`). Tag filter pills at top. Client-side filtering. URL sync: `/posts?tag=ai`. Pagination ~10 per page. Filter resets pagination. Empty state message. Wrap in `<Suspense>`

**Acceptance Criteria:**
- [ ] PostCard renders title, date, tags, reading time
- [ ] Hover effect works on desktop
- [ ] Tag filtering: click tag → list filters, URL updates
- [ ] Pagination works within filtered set
- [ ] Empty state shows when no posts match filter
- [ ] URL reflects current state (`/posts?tag=ai&page=2`)

#### ~~Issue: Blog index page (4.3)~~ [MERGED → 4.2]

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** Task 4.2 (PostCard and PostList components)
**Description:**
`/posts` page with all posts and tag filtering.

**Files:**
- Create: `src/app/(app)/posts/page.tsx` (server component)

**Key details:**
- Fetches `allPosts` and `allTags` from content helpers
- Passes data to `<PostList>` client component
- Metadata: title "Posts", description "Writing about AI, indie hacking, and building in public"
- Wrap `<PostList>` in `<Suspense>`

**Acceptance Criteria:**
- [ ] All non-draft posts listed in date descending order
- [ ] Tag filter pills visible at top
- [ ] Page is SEO-friendly (server-rendered post list)
- [ ] Metadata correct for the page

#### Issue: Post page (4.4)

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** Task 2.1 (Content pipeline), Task 2.4 (Extend metadata helpers), Task 2.5 (MDX components)
**Description:**
Individual post page — the core reading experience (primary design focus).

**Files:**
- Create: `src/app/(app)/posts/[slug]/page.tsx` (server component)
- Create: `src/app/_components/TableOfContents.tsx` (`"use client"`)
- Create: `src/app/_components/ShareButtons.tsx` (`"use client"`)
- Create: `src/app/_components/SubscribeCTA.tsx` (server component)
- Create: `src/app/_components/GiscusComments.tsx` (`"use client"`)
- Create: `src/app/_components/PostNavigation.tsx` (server component)

**Key details:**
- `generateStaticParams` from `allPosts`. `generateMetadata` with `type: "article"`. JSON-LD: `BlogPosting`.
- Layout: 740px max-width prose, line-height 1.7-1.8. Title Plus Jakarta Sans 800.
- Metadata bar: date, reading time, tags (link to `/posts?tag=X`). "Published/Updated" dates.
- Post-reading sequence: SubscribeCTA → ShareButtons → GiscusComments → PostNavigation
- **TableOfContents**: Desktop (1200px+): sticky right margin. Mobile: collapsible disclosure. IntersectionObserver for active section. h2/h3 only.
- **ShareButtons**: Copy link (checkmark 2s), Twitter share. Mobile: Web Share API.
- **SubscribeCTA**: Simple banner with Substack link.
- **GiscusComments**: Lazy-load via IntersectionObserver. Config from env vars. Dark theme. Fallback text.
- **PostNavigation**: Two-column prev/next with title + date.
- External links: apply `target="_blank"` + `rel="noopener noreferrer"` + small external link icon via the `<a>` override in `mdx-components.tsx` (task 2.5) — this task just needs to verify it works in rendered posts

**Acceptance Criteria:**
- [ ] Post renders with correct title, metadata, content, reading flow
- [ ] ToC works: desktop sticky, mobile collapsible, active section highlighted
- [ ] Subscribe CTA links to Substack
- [ ] Share: copy link works, Twitter opens pre-filled tweet
- [ ] Giscus comments load lazily when scrolled into view
- [ ] Prev/next navigation shows correct adjacent posts
- [ ] JSON-LD BlogPosting schema in page source
- [ ] `generateStaticParams` generates all post slugs
- [ ] 404 returned for non-existent slugs

#### Issue: Static content pages (4.5) [CONSOLIDATED: absorbed 4.7]

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** None
**Description:**
Create the About and Now pages — both hardcoded JSX narrative pages. See beads database for current merged description.

**Files:**
- Create: `src/app/(app)/about/page.tsx` (server component)

**Key details:**
- Narrative-first: who Dane is, path, what he's building, beliefs
- Photo placeholder (initials avatar)
- Structured CTAs: "See what I've built" → `/projects`, "Read my thinking" → `/posts`
- Social links: GitHub, Twitter, email, Substack
- JSON-LD: `Person` schema
- Use hardcoded JSX for launch (no MDX pipeline for this page yet)

**Acceptance Criteria:**
- [ ] Narrative content renders with proper typography
- [ ] CTAs link to Projects and Posts
- [ ] Social links present
- [ ] JSON-LD Person schema in page source

#### Issue: Projects page (4.6)

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Stacked list of projects with status badges.

**Files:**
- Create: `src/app/(app)/projects/page.tsx` (server component)

**Key details:**
- Import `allProjects` from content helpers
- Each project: name, one-liner, tech stack badges, status badge (active/maintained/shelved/archived), external link
- Status badge styling: active=accent, maintained=muted accent, shelved=grey, archived=dim grey
- Tags shared with posts for cross-discovery
- Works with n=1-2 at launch

**Acceptance Criteria:**
- [ ] Projects render in stacked list with all fields
- [ ] Status badges styled per status type
- [ ] Tech stack renders as badge pills
- [ ] External links open in new tab

#### ~~Issue: Now page (4.7)~~ [MERGED → 4.5]

**Type:** task
**Priority:** P2
**Parent:** Phase 4
**Dependencies:** None
**Description:**
Ephemeral "now" page with staleness indicator.

**Files:**
- Create: `src/app/(app)/now/page.tsx` (server component)

**Key details:**
- Content from MDX or hardcoded for launch
- "Last updated: [date] ([N] days ago)" — date comes from a `lastUpdated` constant in the page file (hardcoded for launch); relative time computed at render time using `Date.now() - new Date(lastUpdated)`
- If >90 days old: subtle staleness note
- Sections: current projects, learning, reading, life updates

**Acceptance Criteria:**
- [ ] Last updated date shown with relative time
- [ ] Staleness warning appears when >90 days old
- [ ] Content renders with proper typography

---

### Sub-Epic: Phase 5 — SEO, Feeds, Testing & Polish

**Type:** epic
**Priority:** P2
**Parent:** Feature epic
**Description:** Complete SEO infrastructure, add feeds, write tests, perform accessibility audit, and create sample content.

#### Issue: Sitemap rewrite (5.1)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Generate sitemap from Velite collections instead of static array.

**Files:**
- Modify: `src/app/sitemap.ts`

**Key details:**
- Import `allPosts` from content helpers
- Entries for: `/`, `/posts`, `/about`, `/projects`, `/now` + one per post
- Remove all `/signin`, `/signup`, `/forgot-password`, `/admin`, `/dashboard` entries

**Acceptance Criteria:**
- [ ] `/sitemap.xml` lists all pages and posts
- [ ] No stale/irrelevant URLs in sitemap
- [ ] `lastModified` set correctly on post entries

#### Issue: Robots.txt cleanup (5.2)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** None
**Description:**
Remove irrelevant disallow rules.

**Files:**
- Modify: `src/app/robots.ts`

**Key details:**
- `disallow: ["/api"]` only
- Remove `/admin`, `/dashboard` blocks
- Add `sitemap: "https://xexr.com/sitemap.xml"`

**Acceptance Criteria:**
- [ ] `/robots.txt` only blocks `/api`
- [ ] Sitemap URL present

#### Issue: 404 page redesign (5.3)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Enhanced 404 with recovery paths and recent posts.

**Files:**
- Modify: `src/app/not-found.tsx`

**Key details:**
- Server component — imports `allPosts`
- "Page not found" heading, recovery links (home, posts)
- 3 most recent posts
- Dark theme styling

**Acceptance Criteria:**
- [ ] 404 page shows recovery links (home, posts)
- [ ] 3 recent posts displayed
- [ ] Styling matches site design

#### Issue: OG image route rebrand (5.4)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** None
**Description:**
Update OG image generation to match site branding.

**Files:**
- Modify: `src/app/api/og/route.tsx`

**Key details:**
- Background: `#050505`, accent: mint `rgba(0, 255, 136, 0.15)` (always mint)
- Load Plus Jakarta Sans font
- Accept query params: `title`, `description`, `date`, `tags`
- Long titles truncated at ~80 chars
- Badge styling: mint border/colour

**Acceptance Criteria:**
- [ ] OG images use #050505 background and mint accent
- [ ] Plus Jakarta Sans renders in OG images
- [ ] Post-specific OG images include title, description, date
- [ ] Long titles truncate gracefully

#### Issue: RSS feed (5.5)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Full-content RSS feed.

**Files:**
- Create: `src/app/api/rss/route.ts`

**Key details:**
- RSS 2.0 XML with full content (not excerpts)
- Use Velite's compiled HTML output for feed content; strip custom MDX component wrappers (CodeBlock chrome, Callout borders) via regex or string replacement to produce clean HTML
- `Content-Type: application/rss+xml`
- Include: title, description, link, pubDate, guid per post
- Channel info from siteConfig

**Acceptance Criteria:**
- [ ] `/api/rss` returns valid RSS 2.0 XML
- [ ] All published posts included with full content
- [ ] Custom MDX components converted to plain HTML
- [ ] Feed validates in an RSS validator

#### Issue: Unit tests for vibe utilities (5.6)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 2.3 (Vibe colour utilities)
**Description:**
Test colour manipulation, localStorage, contrast checking.

**Files:**
- Create: `src/lib/vibe.test.ts`

**Key details:**
- Test `loadVibeColour()`: default when empty, stored value when present, default when throws
- Test `saveVibeColour()`: writes, doesn't throw when unavailable
- Test `meetsContrastAA()`: mint passes, dark colours fail, edge cases
- Test `checkContrast()`: known ratio values
- Test `hexToOklch()`/`oklchToHex()`: round-trip accuracy
- Test all 8 presets pass contrast check
- Mock localStorage

**Acceptance Criteria:**
- [ ] All vibe utility functions have test coverage
- [ ] Tests pass: `pnpm test:unit -- src/lib/vibe.test.ts`
- [ ] Edge cases covered (empty storage, throws, boundary contrast values)
- [ ] Coverage thresholds met: branches 50%, functions 60%, lines 55% (existing thresholds in `vitest.config.coverage.ts`)

#### Issue: Unit tests for content helpers (5.7)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 2.1 (Content pipeline)
**Description:**
Test content query functions.

**Files:**
- Create: `src/lib/content.test.ts`

**Key details:**
- Test `formatDate()`: various date strings
- Test `getPostBySlug()`: valid slug, invalid slug
- Test `getAdjacentPosts()`: middle, first, last posts
- Test draft filtering
- Test `allTags` extraction
- Mock Velite collections

**Acceptance Criteria:**
- [ ] Content helper functions have test coverage
- [ ] Tests pass: `pnpm test:unit -- src/lib/content.test.ts`
- [ ] Coverage thresholds met: branches 50%, functions 60%, lines 55% (existing thresholds in `vitest.config.coverage.ts`)

#### Issue: Accessibility audit (5.8)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 4.4 (Post page), Task 5.6 (Unit tests for vibe utilities), Task 5.7 (Unit tests for content helpers), Task 1.8 (Content initialization)
**Description:**
Verify WCAG AA compliance across all pages.

**Files:**
- May modify multiple files for fixes

**Key details:**
- Verify skip-to-content link, all Vibe presets 4.5:1 contrast, `aria-hidden` on decorative elements, `prefers-reduced-motion` handling, keyboard navigation for all interactive components, code block copy button touch target, external link attributes, `<time datetime>` on dates, body link underlines, scanline overlay `pointer-events: none`, forced-colors mode output
- Run automated accessibility check using `@axe-core/cli`: `pnpm dlx @axe-core/cli http://localhost:3005 http://localhost:3005/posts http://localhost:3005/about`

**Acceptance Criteria:**
- [ ] All WCAG AA requirements from spec verified
- [ ] No critical accessibility violations from `@axe-core/cli` scanning
- [ ] Keyboard-only navigation works for all interactive features
- [ ] Forced-colors mode renders readable content

#### ~~Issue: Sample content and final cleanup (5.9)~~ [MERGED → 1.8]

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** None
**Description:**
Create real seed content, clean up unused files, restyle error page, update README.

**Files:**
- Modify: `content/posts/hello-world/index.mdx` — flesh into real first post
- Create: `content/projects/gas-town.yaml` (or similar)
- Modify: `src/app/error.tsx` — restyle to match dark palette
- Modify: `README.md` — update for blog architecture
- Delete: any remaining files that import from removed packages (run `grep -r "trpc\|drizzle\|sonner\|next-themes\|@ai-sdk\|@upstash\|@doublezero" src/` to find orphans; delete `src/app/_components/CustomThemeProvider.tsx` if still present after task 1.5)

**Key details:**
- First post exercises all MDX features: headings, code blocks, callout, image, links
- Real project data (at least 1 project)
- Error page: dark palette, accent colours, keep error/reset pattern
- Verify no remaining imports from removed packages
- README with correct setup instructions

**Acceptance Criteria:**
- [ ] First post renders correctly with all MDX features
- [ ] At least 1 project displays on `/projects`
- [ ] Error page renders with correct dark palette and accent styling
- [ ] No references to removed packages in source code
- [ ] README reflects actual project architecture

#### Issue: Dead link checking in CI (5.10)

**Type:** task
**Priority:** P2
**Parent:** Phase 5
**Dependencies:** Task 1.8 (Content initialization)
**Description:**
Set up automated dead link detection.

**Files:**
- Create: `.github/workflows/links.yml`

**Key details:**
- Use `lycheeverse/lychee-action@v2` GitHub Action
- Run against built site output directory (`.next/` or exported HTML) after `pnpm build`
- Trigger on push to main and PRs
- Exclude URLs: `localhost`, `giscus.app`, `twitter.com/intent`, `substack.com` (dynamic/external services that may block CI)

**Acceptance Criteria:**
- [ ] Dead link check runs in CI
- [ ] Broken links fail the check
- [ ] No false positives on known-good URLs

---

## Dependencies (post-consolidation)

| Blocked Task | Blocked By | Reason |
|-------------|------------|--------|
| 1.5 Root layout rewrite | 1.1 Foundation config cleanup | Fonts installed via 1.1 |
| 1.5 Root layout rewrite | 1.4 CSS token migration | CSS vars reference new font names |
| 1.5 Root layout rewrite | 1.7 Next.js config + app layout | CSP unsafe-inline for blocking script |
| 1.7 Next.js config + app layout | 1.1 Foundation config cleanup | Velite package installed via 1.1 |
| 2.1 Content pipeline | 1.1 Foundation config cleanup | Velite, rehype-pretty-code, shiki, remark-gfm installed |
| 2.1 Content pipeline | 1.7 Next.js config + app layout | Config-based Velite integration set up |
| 2.1 Content pipeline | 1.8 Content initialization | Seed content to compile |
| 2.5 MDX components | 2.1 Content pipeline | Velite compiles MDX with rehype-pretty-code |
| 3.4 Mobile navigation drawer | 3.2 Desktop navigation | Header provides trigger, nav items defined |
| 3.5 StatusBar and ReturnToTop | 2.3 Vibe colour utilities | Vibe utilities for colour reading |
| 3.6 VibeDrawer component | 2.3 Vibe colour utilities | Vibe utilities |
| 3.6 VibeDrawer component | 3.5 StatusBar and ReturnToTop | StatusBar triggers drawer |
| 4.1 Homepage | 2.1 Content pipeline | Content helpers |
| 4.1 Homepage | 3.8 Particle canvas | ParticleCanvas component |
| 4.1 Homepage | 4.2 Blog listing | PostCard component |
| 4.2 Blog listing | 2.1 Content pipeline | Content helpers, formatDate |
| 4.4 Post page | 2.1 Content pipeline | Content helpers |
| 4.4 Post page | 2.4 Extend metadata helpers | Extended metadata |
| 4.4 Post page | 2.5 MDX components | MDX components |
| 4.6 Projects page | 2.1 Content pipeline | Content helpers |
| 5.1 Sitemap rewrite | 2.1 Content pipeline | Imports allPosts |
| 5.3 404 page redesign | 2.1 Content pipeline | Content helpers |
| 5.5 RSS feed | 2.1 Content pipeline | Content helpers |
| 5.6 Unit tests for vibe utilities | 2.3 Vibe colour utilities | vibe.ts exists |
| 5.7 Unit tests for content helpers | 2.1 Content pipeline | content.ts exists |
| 5.8 Accessibility audit | 4.4 Post page | Audit targets post page features |
| 5.8 Accessibility audit | 5.6 Unit tests for vibe utilities | Tests verify contrast checking works |
| 5.8 Accessibility audit | 5.7 Unit tests for content helpers | Tests verify content helpers work |
| 5.8 Accessibility audit | 1.8 Content initialization | Complete site to audit |
| 5.10 Dead link checking in CI | 1.8 Content initialization | Content exists to check |

## Coverage Matrix

| Plan Task | Bead Title | Sub-Epic | Status |
|-----------|------------|----------|--------|
| 1.1 Clean package.json dependencies | Foundation config cleanup | Phase 1 | open (absorbed 1.2, 1.3) |
| ~~1.2 Clean environment variables~~ | ~~Clean environment variables~~ | ~~Phase 1~~ | merged → 1.1 |
| ~~1.3 Update site configuration~~ | ~~Update site configuration~~ | ~~Phase 1~~ | merged → 1.1 |
| 1.4 CSS token migration | CSS token migration | Phase 1 | open |
| 1.5 Root layout rewrite | Root layout rewrite | Phase 1 | open (absorbed 3.7) |
| ~~1.6 App layout cleanup~~ | ~~App layout cleanup~~ | ~~Phase 1~~ | merged → 1.7 |
| 1.7 Next.js config updates | Next.js config and app layout cleanup | Phase 1 | open (absorbed 1.6) |
| 1.8 Content directory structure | Content initialization | Phase 1 | open (absorbed 5.9) |
| 2.1 Velite configuration | Content pipeline | Phase 2 | open (absorbed 2.2) |
| ~~2.2 Content helper module~~ | ~~Content helper module~~ | ~~Phase 2~~ | merged → 2.1 |
| 2.3 Vibe colour utilities | Vibe colour utilities | Phase 2 | open |
| 2.4 Extend metadata helpers | Extend metadata helpers | Phase 2 | open |
| 2.5 MDX components | MDX components | Phase 2 | open |
| 3.1 Footer component | Footer component | Phase 3 | open |
| 3.2 Header redesign | Desktop navigation | Phase 3 | open (absorbed 3.3) |
| ~~3.3 MainNav update~~ | ~~MainNav update~~ | ~~Phase 3~~ | merged → 3.2 |
| 3.4 Mobile navigation drawer | Mobile navigation drawer | Phase 3 | open |
| 3.5 StatusBar component | StatusBar and ReturnToTop | Phase 3 | open (absorbed 3.9) |
| 3.6 VibeDrawer component | VibeDrawer component | Phase 3 | open |
| ~~3.7 Vibe blocking script~~ | ~~Vibe blocking script~~ | ~~Phase 3~~ | merged → 1.5 |
| 3.8 Particle canvas | Particle canvas | Phase 3 | open |
| ~~3.9 ReturnToTop repositioning~~ | ~~ReturnToTop repositioning~~ | ~~Phase 3~~ | merged → 3.5 |
| 4.1 Homepage | Homepage | Phase 4 | open |
| 4.2 PostCard and PostList components | Blog listing | Phase 4 | open (absorbed 4.3) |
| ~~4.3 Blog index page~~ | ~~Blog index page~~ | ~~Phase 4~~ | merged → 4.2 |
| 4.4 Post page | Post page | Phase 4 | open |
| 4.5 About page | Static content pages | Phase 4 | open (absorbed 4.7) |
| 4.6 Projects page | Projects page | Phase 4 | open |
| ~~4.7 Now page~~ | ~~Now page~~ | ~~Phase 4~~ | merged → 4.5 |
| 5.1 Sitemap rewrite | Sitemap rewrite | Phase 5 | open |
| 5.2 Robots.txt cleanup | Robots.txt cleanup | Phase 5 | open |
| 5.3 404 page redesign | 404 page redesign | Phase 5 | open |
| 5.4 OG image route rebrand | OG image route rebrand | Phase 5 | open |
| 5.5 RSS feed | RSS feed | Phase 5 | open |
| 5.6 Unit tests for vibe utilities | Unit tests for vibe utilities | Phase 5 | open |
| 5.7 Unit tests for content helpers | Unit tests for content helpers | Phase 5 | open |
| 5.8 Accessibility audit | Accessibility audit | Phase 5 | open |
| ~~5.9 Sample content and final cleanup~~ | ~~Sample content and final cleanup~~ | ~~Phase 5~~ | merged → 1.8 |
| 5.10 Dead link checking in CI | Dead link checking in CI | Phase 5 | open |

**Plan tasks:** 39
**Open beads:** 30
**Merged beads:** 9
**Coverage:** 100% (all 39 plan tasks accounted for)

## Bead ID Mapping

| Plan Ref | Bead ID | Status |
|----------|---------|--------|
| Feature epic | xr-lfk | open |
| Phase 1 | xr-lfk.1 | open |
| Phase 2 | xr-lfk.2 | open |
| Phase 3 | xr-lfk.3 | open |
| Phase 4 | xr-lfk.4 | open |
| Phase 5 | xr-lfk.5 | open |
| Tasks 1.1+1.2+1.3 | xr-lfk.1.1 | open |
| ~~Task 1.2~~ | ~~xr-lfk.1.2~~ | merged → 1.1 |
| ~~Task 1.3~~ | ~~xr-lfk.1.3~~ | merged → 1.1 |
| Task 1.4 | xr-lfk.1.4 | open |
| Tasks 1.5+3.7 | xr-lfk.1.5 | open |
| ~~Task 1.6~~ | ~~xr-lfk.1.6~~ | merged → 1.7 |
| Tasks 1.7+1.6 | xr-lfk.1.7 | open |
| Tasks 1.8+5.9 | xr-lfk.1.8 | open |
| Tasks 2.1+2.2 | xr-lfk.2.1 | open |
| ~~Task 2.2~~ | ~~xr-lfk.2.2~~ | merged → 2.1 |
| Task 2.3 | xr-lfk.2.3 | open |
| Task 2.4 | xr-lfk.2.4 | open |
| Task 2.5 | xr-lfk.2.5 | open |
| Task 3.1 | xr-lfk.3.1 | open |
| Tasks 3.2+3.3 | xr-lfk.3.2 | open |
| ~~Task 3.3~~ | ~~xr-lfk.3.3~~ | merged → 3.2 |
| Task 3.4 | xr-lfk.3.4 | open |
| Tasks 3.5+3.9 | xr-lfk.3.5 | open |
| Task 3.6 | xr-lfk.3.6 | open |
| ~~Task 3.7~~ | ~~xr-lfk.3.7~~ | merged → 1.5 |
| Task 3.8 | xr-lfk.3.8 | open |
| ~~Task 3.9~~ | ~~xr-lfk.3.9~~ | merged → 3.5 |
| Task 4.1 | xr-lfk.4.1 | open |
| Tasks 4.2+4.3 | xr-lfk.4.2 | open |
| ~~Task 4.3~~ | ~~xr-lfk.4.3~~ | merged → 4.2 |
| Task 4.4 | xr-lfk.4.4 | open |
| Tasks 4.5+4.7 | xr-lfk.4.5 | open |
| Task 4.6 | xr-lfk.4.6 | open |
| ~~Task 4.7~~ | ~~xr-lfk.4.7~~ | merged → 4.5 |
| Task 5.1 | xr-lfk.5.1 | open |
| Task 5.2 | xr-lfk.5.2 | open |
| Task 5.3 | xr-lfk.5.3 | open |
| Task 5.4 | xr-lfk.5.4 | open |
| Task 5.5 | xr-lfk.5.5 | open |
| Task 5.6 | xr-lfk.5.6 | open |
| Task 5.7 | xr-lfk.5.7 | open |
| Task 5.8 | xr-lfk.5.8 | open |
| ~~Task 5.9~~ | ~~xr-lfk.5.9~~ | merged → 1.8 |
| Task 5.10 | xr-lfk.5.10 | open |

**Integration branch:** `integration/site-setup`

## Summary

- Feature epic: 1
- Sub-epics (phases): 5
- Open task beads: 30
- Merged task beads: 9
- Blocker dependencies: 28
- Items ready immediately (no blockers): 11 (tasks 1.1, 1.4, 1.8, 2.3, 2.4, 3.1, 3.2, 3.8, 4.5, 5.2, 5.4)
- Dependency waves: 5
- Critical path: 1.1 → 1.7 → 2.1 → 4.2 → 4.1 (5 steps)
