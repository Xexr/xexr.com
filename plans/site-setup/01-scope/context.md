# Codebase Context: site-setup

## App Structure

**Directory Layout:**
- `/src/app/` — Next.js App Router pages
  - `(app)/` — Grouped route for main app pages
  - `layout.tsx` — Root layout with fonts (Geist Sans/Mono, Roboto), Vercel Analytics, JSON-LD schema
  - `_components/` — Shared components (Header, MainNav, UI library)
  - `_components/ui/` — shadcn/ui components from Base UI React: button, card, dropdown-menu, combobox, select, input, field, alert-dialog, badge, separator, textarea
- `/src/lib/` — Utilities and configuration
  - `siteConfig.ts` — Central site metadata (name, description, URL, CDN domain, company info, social links, SEO keywords)
  - `metadata.ts` — Next.js metadata configuration
  - `lib.ts` — Server URL resolution for multi-environment (dev, preview, production)
  - `utils.ts` — `cn()` utility combining clsx + tailwind-merge
  - `constants.ts` — Global constants
- `/src/styles/` — Tailwind CSS with theme variables
- `/src/env.ts` — T3 env validation with Zod (server + client environment variables)

**Entry Point:**
- `src/app/layout.tsx` (root layout) wraps all pages with dark color scheme, custom fonts
- `src/app/(app)/page.tsx` — Home page (currently minimal placeholder)

## Existing UI Patterns

**Component Library:**
- **Base:** shadcn/ui on Base UI React (accessible, headless component library)
- **Design System:** OKLCh color space with CSS variables for semantic tokens
  - Primary/secondary/muted/accent/destructive pairs
  - Sidebar variants, chart colors (5 palette)
  - Shadow system (2xs to 2xl), radius scales (sm/md/lg/xl/2xl/3xl/4xl)

**Styling Patterns:**
- Tailwind CSS v4 with @theme inline declarations
- class-variance-authority (CVA) for component variants (e.g., button: default/outline/secondary/ghost/destructive/link with xs/sm/default/lg/icon sizes)
- Custom @layer utilities for scrollbar styling
- Dark mode forced via `dark` class on html

**Navigation:**
- `<Header />` — Logo + nav (desktop visible, mobile hidden)
- `<MainNav />` — Client component with active state detection via `usePathname()`
- Navigation items array currently empty (`const navItems: { href: Route; label: string }[] = []`)
- Responsive: header on desktop, nav drawer on mobile

**Existing Components:**
- Header (async, displays site config branding)
- MainNav + MainNavItem (client-side, route-aware highlighting)
- LoadingSpinner (SVG with animate-spin)
- LoadingPage (placeholder)
- ReturnToTop (scroll helper)
- Card component family (Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter)

**Color Scheme:**
- Background: oklch(0.147 0.004 49.25) — near-black
- Foreground: oklch(0.985 0.001 106.423) — off-white
- Primary/Accent: oklch(0.77 0.16 70) — mint/yellow tones
- Uses OKLCh for perceptual color consistency

**Fonts:**
- Geist Sans (display) and Mono (monospace) from `geist` package
- Roboto from `next/font/google`
- Plus Jakarta Sans mentioned in design brief but not yet imported

## Related Features

**Features That Exist:**
1. Error handling — `error.tsx` (error boundary)
2. Not found — `not-found.tsx` (404 page)
3. Layout components — Header, navigation structure ready for expansion
4. API routes — Empty `/api` directory ready for route handlers
5. Environment management — Multi-environment support via NEXT_PUBLIC_* variables

**Adjacent User Flows:**
- Sitemap generation (`src/app/sitemap.ts` exists but needs content data)
- Robots.txt generation (`src/app/robots.ts` exists but needs config)
- Vercel Analytics integration already set up

**Data Available:**
- `siteConfig` exported globally (site name, URL, CDN domain, company details, social links, SEO keywords, topics)
- Environment variables typed via Zod
- Static site generation ready (no dynamic data sources configured yet)

## Tech Stack

**Core:**
- Next.js 16.0.10 (App Router, React 19.2.3)
- React 19.2.3 with React DOM 19.2.3
- TypeScript 5.9.3 (strict mode, noUncheckedIndexedAccess)
- Tailwind CSS 4.1.18 (@tailwindcss/postcss) with typography plugin

**UI & Styling:**
- @base-ui/react 1.0.0 — Headless, accessible component primitives
- class-variance-authority 0.7.1 — Component variant pattern library
- clsx 2.1.1 + tailwind-merge 3.4.0 — className utility composition
- lucide-react 0.561.0 — SVG icons
- tw-animate-css 1.4.0 — Animation utilities
- geist 1.5.1 — Vercel's default font family

**Environment & Config:**
- @t3-oss/env-nextjs 0.13.10 — Type-safe environment variables
- zod 4.2.1 — Schema validation
- sharp 0.34.5 — Image optimization

**Analytics & Tools:**
- @vercel/analytics 1.6.1 — Vercel analytics integration
- shadcn 3.6.2 — Component CLI/registry

**Linting & Testing:**
- ESLint 9.39.2 with TypeScript ESLint, React Compiler plugin
- Vitest 4.0.0 with coverage (v8)
- Prettier 3.7.4 with Tailwind CSS plugin

**Constraints:**
- No MDX/Velite configured yet (needed for blog)
- No comment system configured (Giscus planned)
- No database (content will be file-based MDX)
- No dynamic data fetching frameworks beyond native Next.js

## Project Conventions

**From Design Brief:**
1. Dark-first design — Single dark theme with dynamic accent color customization
2. Developer-centric aesthetic — Premium dev tool feel, clean confidence
3. Colour system: Near-black backgrounds (#050505), accent-driven UI, subtle scanlines
4. Typography: Plus Jakarta Sans 800 for headings (tight letter-spacing), JetBrains Mono for code/UI
5. Spacing: Generous with 740px prose max-width
6. Interactive elements: Particle effects, smooth transitions (0.4s cubic-bezier), hover animations

**From Stack:**
- Import path aliases: `@/*` -> `src/*`, `@components/*` -> `src/app/_components/*`
- Typed routes: Next.js `typedRoutes: true` (enforce type-safe navigation)
- Environment variables validated via Zod in `/src/env.ts`, prefixed `NEXT_PUBLIC_*` for client
- Responsive approach: Mobile-first Tailwind (e.g., `hidden md:flex`)

**Code Organization:**
- Components in `/src/app/_components/` with `/ui` subdirectory
- Utilities in `/src/lib/`
- Styles in `/src/styles/globals.css`
- Configuration in root `next.config.ts`, `components.json` (shadcn CLI config)

## Key Files to Reference

**Configuration:**
- `/src/lib/siteConfig.ts` — Site name, URL, company, social links, keywords
- `/src/env.ts` — Environment variables
- `/src/app/layout.tsx` — Root layout, fonts, head config
- `/src/styles/globals.css` — Theme tokens in @theme inline block

**Components to Extend:**
- `/src/app/_components/Header.tsx` — Navigation hub
- `/src/app/_components/MainNav.tsx` — Populate `navItems` array for routing
- `/src/app/_components/ui/button.tsx` — CVA patterns to follow for new components
- `/src/app/_components/ui/card.tsx` — Layout card patterns

**Entry Points:**
- `/src/app/(app)/layout.tsx` — Wraps main content with max-width container, flex layout
- `/src/app/(app)/page.tsx` — Home page template
- `/src/app/layout.tsx` — Root; add new global fonts here

**Status:**
This codebase is in early MVP stage. All core infrastructure (routing, styling, components, environment) is ready. The next phase is content structure (MDX + blog routes) and interactive features (Vibe system, particles, code blocks).
