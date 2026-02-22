# site-setup — Design Specification

**Created:** 2026-02-22
**Status:** Validated
**Brainstorming Mode:** With scope questions (142 questions, all priorities)

---

## Overview

xexr.com is a personal blog and digital home for Dane Poyzer — indie hacker, chartered accountant turned solo builder, deep in AI orchestration. The site is **blog-first**: writing is the centrepiece, driving SEO, social sharing, and reputation. Projects and About pages provide supporting context.

The primary audience is **developer peers** — other devs, indie hackers, and AI practitioners who value technical depth, honest takes, and real experience. The site should feel like visiting the workshop of someone who takes their craft seriously: clean, confident, opinionated, and unmistakably high-quality.

The core value proposition is a premium dark-first reading experience with a signature interactive feature (the "Vibe" accent colour system) that signals craft and taste. Content is practitioner-level — practical tutorials and opinions for devs integrating AI, framed as "here's what I built and learned." The brand identity is personal: xexr is Dane's online handle/alias, byline is "Dane Poyzer", brand is "xexr."

---

## Scope Questions & Answers

### Summary

- **Questions addressed:** 142 (all priorities: P0-P3)
- **Auto-answered (best practices):** 97
- **Human decisions:** 44 (across 3 interview rounds; 1 branch point resolved via cascading)
- **Deferred to future:** 6

### Foundational Decisions (Round 1)

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q23 | Site identity: digital home vs blog vs portfolio | **Blog-first** — Writing is the centrepiece. Posts drive SEO, social sharing, and reputation. | Human choice — this is the highest-cascade decision |
| Q10 | Primary target audience | **Developer peers** — Other devs, indie hackers, AI practitioners. | Human choice — shapes content tone and IA |
| Q24 | xexr vs Dane Poyzer relationship | **Personal handle/alias** — xexr = Dane. Byline is "Dane Poyzer", brand is "xexr". | Human choice — brand identity |
| Q5 | Homepage primary CTA | **Read a featured post** — Optimise for engagement, get visitors into best content immediately. | Human choice — content strategy |
| Q18 | Primary action after reading a post | **Subscribe to newsletter** — Capture warm readers. | Human choice — retention strategy |
| Q55 | Vibe system purpose | **Brand differentiator** — Signals craft and taste. "This developer cares about details." | Human choice — feature positioning |
| Q9 | MVP scope vs timeline | **1 week is achievable** — Full MVP as specified in the brief. | Human choice — project management |
| Q67 | Content strategy: SEO vs social | **Audience-driven** — Write for community (Twitter, Gastown, indie hackers). Growth via word of mouth. | Human choice — distribution strategy |

### Cascaded Confirmations (Round 2)

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q8 | Post page as primary design focus | **Yes** | Cascades from blog-first identity (Q23) |
| Q28 | Navigation structure | **4-5 items in header** — Posts, About, Projects, Now | Human choice — more discoverable than 3 |
| Q7 | Ship placeholder pages or hide | **Ship what's ready, hide the rest** — Only show pages with real content. | Human choice — pragmatic launch |
| Q33 | Hero height | **Partial with content peek (~60-70vh)** — Particles + name + descriptor, featured posts visible below. | Human choice — invites scrolling |
| Q52 | About page style | **Narrative-first** — Tell the story: ACA to tech to indie hacker. Show personality. | Human choice — aligned with peer audience |
| Q44 | Vibe button placement | **Status bar at bottom** — Dedicated bar with Vibe pill. Distinctive, as specified in brief. | Human choice — prominent but non-intrusive |
| Q6 | Subscribe mechanism | **Substack redirect** — Link opens Substack page. Zero implementation complexity. | Human choice — simplest approach |
| Q26 | Publishing cadence | **2x per month** — Roughly every 2 weeks. Sustainable pace for quality long-form. | Human choice — realistic commitment |
| Q17 | First-time social visitor flow | Post -> Subscribe CTA -> Next/prev posts -> About page link as tertiary. | Human choice — cascades from Q5, Q18 |
| Q58 | Definition of "shipped" | **Deployed + first post live** — Site on Vercel, one real post published, linked from social profiles. | Human choice — clear milestone |
| Q60 | Design success evaluation | **Personal satisfaction** — "You know quality when you see it." | Human choice — taste-driven |
| Q21 | Empty state for n=1 posts | **Single "Latest" section, no labels** — Show the post without "Featured" or "Recent" labels. | Human choice — avoids sparse labelling |

### Standalone Decisions (Round 3)

**Identity & Brand:**

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q4 | Dark-only acceptable | **Yes, commit to dark** — Vibe system IS the personalisation story. Accept the trade-off. | Human choice — conscious exclusion |
| Q56 | Building in public definition | **Process blogging** — Write about what you're building and learning. The blog IS the public building. | Human choice — operational definition |
| Q115 | Indie hacker definition | **Solo builder shipping products** — Build and ship real products as a solo dev. Revenue is a goal. | Human choice — identity scoping |
| Q116 | AI content depth | **Practitioner-level** — Practical tutorials and opinions for devs integrating AI. | Human choice — content scoping |
| Q117 | xexr.com vs products relationship | **Personal hub, products are portfolio items** — Products appear on Projects page. Their own sites handle marketing. | Human choice — brand architecture |

**Content Policy:**

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q135 | Low-output life phases | **Silence is fine** — No apologies, no filler. Now page explains. Content resumes when it resumes. | Human choice — personal preference |
| Q137 | Family content boundaries | **Occasional colour** — Brief mentions adding personality. Never the main topic. No names or photos. | Human choice — privacy decision |
| Q139 | AI editorial stance | **Take strong positions** — Authentic, accept disagreement. | Human choice — editorial policy |
| Q140 | Failed/abandoned projects | **Show with honest status** — Status badge ('Shelved', 'Archived'). Aligns with building-in-public. | Human choice — transparency |
| Q66 | Staleness handling | **Dates only on Now page** — Other evergreen pages stand without timestamps. | Human choice — low maintenance |
| Q94 | Colophon perf stats | **No** — Stick to tech stack, tools, design philosophy. | Human choice — avoids maintenance obligation |

**Design Preferences:**

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q92 | Hero descriptor animation | **Static text** — Clean, fast, accessible. | Human choice — taste |
| Q96 | Projects page layout | **Stacked list** — Full-width rows. Works well even with 1-2 projects. | Human choice — scales from n=1 |
| Q98 | Blog index density | **Compact list** — Title, date, tags, reading time. Efficient scanning. Like chrisgregori.dev. | Human choice — developer aesthetic |
| Q105 | Hover effects | **Accent-driven feedback** — Borders light up, backgrounds shift. Vibe colour comes alive on interaction. | Human choice — makes Vibe feel interactive |

**Feature Scope:**

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q79 | Returning reader new-content detection | **RSS/newsletter is enough** — No in-site tracking or 'New' badges. | Human choice — zero implementation |
| Q81 | Shareable Vibe URLs | **Not for MVP** — Build later if demand exists. | Human choice — scope control |
| Q78 | Recruiter optimisation | **Subtle professional signals** — About and Projects structured for assessment, but don't compromise personal voice. | Human choice — secondary audience |

**Content Details:**

| # | Question | Answer | How Decided |
|---|----------|--------|-------------|
| Q74 | Now page archiving | **Git history is enough** — Replace content. Git preserves old versions. No UI for archives. | Human choice — simple, ephemeral |
| Q75 | Bookshelf external links | **Link to neutral source** — OpenLibrary, Goodreads, or publisher pages. | Human choice — helpful without commercial bias |
| Q111 | Credibility evaluation flow | **Structured journey** — About explicitly guides: 'See what I've built' -> Projects, 'Read my thinking' -> Posts. | Human choice — deliberate funnel |
| Q112 | Projects-to-Posts cross-linking | **Tag-based discovery** — Shared tags bridge projects and posts automatically. | Human choice — lower maintenance than manual links |

### Key Auto-Answered Decisions (97 total)

Full auto-answers with rationale preserved in `plans/site-setup/01-scope/question-triage.md`. Key decisions:

**Accessibility (WCAG AA):**
- Enforce minimum 4.5:1 contrast ratio on Vibe colours against #050505 background
- `prefers-reduced-motion`: disable particles, replace transitions with instant swaps
- Secondary text #555555 fails contrast — lighten to at least #8a8a8a
- Keyboard-accessible Vibe system: Tab to pill, Arrow keys for presets/slider, Escape to close
- `aria-hidden` on particle canvas, traffic light dots, scanline overlay
- Skip-to-content link as first focusable element
- `pointer-events: none` on scanline overlay for text selection
- All body links have underline decoration (accent colour is secondary signal)

**Vibe System Technical:**
- CSS custom property swap: set `--accent` on `<html>`, all elements reference variables
- Blocking `<script>` in `<head>` reads localStorage, sets CSS variable before first paint (no flash)
- localStorage fallback: try/catch, default to mint on failure, silent skip on write failure
- Tab sync via StorageEvent listener (~5 lines of code)
- 0.4s cubic-bezier for preset clicks; instant during slider drag
- Screen readers unaffected by colour changes (CSS variable changes are silent to AT)
- Three user-visible states: Default (mint), Customised (colour dot shows choice), Reset (back to mint)
- Drawer: bottom sheet on mobile, popover on desktop. Close via backdrop/Escape/button/re-click pill

**Code Blocks:**
- Shiki runs at build time via rehype-pretty-code — no loading state needed
- Copy button: icon changes to checkmark for 2s, strips line numbers/diff markers/decorative elements
- macOS dots are purely decorative — `aria-hidden="true"`, no alt text needed
- Long lines: horizontal scroll (never wrap). Very long blocks (>30 lines): collapse with expand button
- Syntax highlighting independent of Vibe — accent used for string literals only

**Content & Navigation:**
- Tag filtering: client-side in-place with URL query sync (`/posts?tag=ai`). No separate `/tags/[tag]` pages
- RSS: full-content feed, strip/convert custom MDX to plain HTML equivalents
- External links: `target="_blank"` + `rel="noopener noreferrer"` + small external link icon
- Dates: "22 Feb 2026" format (unambiguous internationally), `<time datetime="...">` for machines
- 404 page: "Page not found" + link to homepage + blog index + 3 recent posts
- Max 3 tags shown per post card, "+N more" if exceeded
- RSS icon visible in footer for developer audience

**Performance & SEO:**
- `next/font` for Plus Jakarta Sans and JetBrains Mono (eliminates FOUT/CLS)
- Next.js Image + sharp for automatic optimisation
- JSON-LD: Person schema on About, BlogPosting on posts, WebSite on homepage
- Vercel OG (Satori): 50-200ms edge generation, cached after first hit
- OG images use default mint accent (not user's Vibe — static images)
- `<meta name="darkreader-lock">` to prevent double-inversion on dark-committed site
- Lighthouse target: 90+ for launch (not 95+ — particles and fonts impact scores)
- Content images co-located with MDX: `/content/posts/my-post/` contains both `index.mdx` and images
- Dead link checking via CI (lychee or similar)

**Responsive & Mobile:**
- Particle count reduced ~40% on mobile, mouse repulsion disabled (passive float only)
- Hero: 50-60vh on mobile (vs 60-70vh desktop)
- Code copy button always visible (not hover-dependent), 44x44px touch target
- ToC: sticky right margin on desktop (1200px+), collapsible disclosure at top on mobile
- No hover states on touch — `:focus-visible` for keyboard, subtle tap feedback
- Prose column stays 740px max-width on wide monitors; dark space is intentional
- Footer pushed to bottom via flexbox `flex-grow: 1` on content area

**Progressive Enhancement:**
- All content readable via SSR with JS disabled
- Particles, Vibe, Giscus, copy buttons are progressive enhancements
- Particle canvas: check for support, skip silently if unavailable
- Pause particles via `document.visibilitychange` when tab backgrounded
- Giscus: lazy-load via IntersectionObserver, expanded once visible

### Deferred Questions

| # | Question | Defer Reason | Revisit When |
|---|----------|--------------|--------------|
| Q77 | Cmd+K search | Brief explicitly defers; <10 posts means no value | 10+ posts published |
| Q109 | Image lightbox | No content demands it at launch | When technical diagrams need zoom |
| Q76 | PWA/offline support | Not industry standard for blogs | Post-launch if requested |
| Q50 | Page transitions | Premature complexity; "alive" feel from Vibe + particles | Post-launch polish |
| Q81 | Shareable Vibe URLs | Adds URL parameter complexity | If social sharing angle proves valuable |
| Q79 | New-content badges | Zero value at launch volume | If returning reader feedback demands it |

---

## Design

### Architecture Overview

**Note:** This section describes the **target architecture**. The current codebase is an early scaffold with placeholder content, empty navigation, and default template styling. All systems described below (Velite, Vibe, particles, Giscus, etc.) need to be built.

A static-first Next.js 16 site using App Router with file-based MDX content via Velite. Server components render all content pages; client components are isolated to interactive features (Vibe system, particle canvas, Giscus comments, code copy buttons). All pages live within the existing `(app)` route group for layout separation.

```
┌─────────────────────────────────────────────┐
│                  Vercel CDN                   │
├─────────────────────────────────────────────┤
│              Next.js 16 App Router            │
│  ┌─────────────┐  ┌──────────────────────┐  │
│  │ Server       │  │ Client Components    │  │
│  │ Components   │  │ - Vibe system        │  │
│  │ - All pages  │  │ - Particle canvas    │  │
│  │ - Layouts    │  │ - Giscus             │  │
│  │ - MDX render │  │ - Code copy buttons  │  │
│  └──────┬──────┘  │ - Status bar         │  │
│         │          └──────────────────────┘  │
│  ┌──────▼──────┐                             │
│  │ Velite       │  Build-time content        │
│  │ MDX + Zod    │  compilation & validation  │
│  └──────┬──────┘                             │
│         │                                     │
│  ┌──────▼──────┐                             │
│  │ /content/    │  File-based MDX + assets   │
│  │ posts/*/     │  Directory per post         │
│  └─────────────┘                             │
├─────────────────────────────────────────────┤
│  External: Giscus (GitHub Discussions)       │
│  External: Vercel Analytics (launch)         │
│  External: Substack (newsletter redirect)    │
└─────────────────────────────────────────────┘
```

### Components

**Component 1: Vibe System**
- Responsibility: User-selectable accent colour that persists across sessions and drives the entire visual identity
- Interface: Status bar pill at page bottom -> drawer with 8 presets + continuous spectrum slider
- Implementation: CSS custom properties (`--accent`, `--accent-dim`, `--accent-soft`, `--accent-glow`) set on `<html>`. Blocking script in `<head>` reads localStorage before first paint. StorageEvent syncs across tabs. OKLCh colour space for perceptual consistency. WCAG AA contrast enforcement (4.5:1 minimum against #050505).
- Drawer: Bottom sheet on mobile, popover from pill on desktop. 0.3s ease-out open, 0.2s ease-in close. Focus trap, Escape to close.
- States: Default (mint #00ff88), Customised (dot shows choice), Reset (returns to mint)

**Component 2: Particle Canvas**
- Responsibility: Atmospheric background effect in the hero section
- Interface: Full-width canvas behind hero content, z-index below text
- Implementation: Canvas + requestAnimationFrame. ~60-100 nodes on desktop (~40 on mobile). Lines connect within 90px proximity. Particles match current accent colour in real-time. Mouse repulsion within 100px radius (disabled on touch). Radial gradient mask fades edges. Pause on tab background via visibilitychange. Progressive enhancement — skip silently if canvas unavailable.

**Component 3: MDX Content Pipeline**
- Responsibility: Type-safe content compilation with custom components
- Interface: Velite + Zod schema validation. Frontmatter: title (required), description (required), date (required), updated (optional), tags (required, allow empty array), draft (boolean), featured (boolean), image (optional), readingTime (auto-calculated at 238 WPM, manual override).
- Custom components (MVP): Callout (info/warning/tip with left border + icon + text label), CodeBlock (Shiki + macOS chrome + copy button), Image (Next.js Image + caption + blur placeholder)
- Custom components (post-MVP): Interactive, Tweet, YouTube, Aside, Steps, Comparison, FileTree

**Component 4: Post Page**
- Responsibility: The primary design focus — the core reading experience
- Layout: Centred prose column (740px max-width) with sticky ToC in right margin (1200px+). ToC collapses to disclosure at top on narrower viewports. IntersectionObserver for active section highlighting.
- Post-reading flow: Subscribe CTA (prime placement, below content) -> Giscus comments (lazy-loaded, expanded) -> Prev/next navigation -> About page link
- Metadata bar: date, reading time, tags (max 3 + "+N more")
- Share: Copy link (checkmark confirmation) + Twitter (new tab with pre-filled text). Web Share API on mobile.
- Updated posts: "Published [date] / Updated [date]" inline

**Component 5: Navigation**
- Header: Logo (accent square with "x" + monospace "xexr") + nav items
- Primary nav (header): Posts, About, Projects, Now
- Secondary nav (footer): Uses, Bookshelf, Colophon
- Hidden pages at launch: Only show pages with real content. Add nav items as pages are populated.
- Mobile: Hamburger menu, always accessible from header

**Component 6: Status Bar**
- Responsibility: Page-bottom bar housing the Vibe pill
- Placement: Fixed at bottom of viewport
- Contents: `vibe #[hex]` pill with coloured dot. Click to open Vibe drawer.
- First-visit discoverability: Gentle pulse/glow on the pill (no modal, no tooltip)

### Data Model

**Content Schema (Velite + Zod):**

```typescript
// velite.config.ts
posts: {
  title: string          // Required
  description: string    // Required — SEO and excerpts
  date: string           // Required — "YYYY-MM-DD"
  updated?: string       // Optional — shows "Updated" badge
  tags: string[]         // Required, allow empty array
  draft: boolean         // Default false — excluded from production build
  featured: boolean      // Default false — appears on homepage
  image?: string         // Optional — OG image path
  readingTime?: number   // Auto-calculated (238 WPM), manual override
}

projects: {
  name: string
  description: string
  url?: string           // External project URL
  repo?: string          // GitHub repo URL
  techStack: string[]    // Tech badges
  status: 'active' | 'maintained' | 'shelved' | 'archived'
  featured: boolean
  tags: string[]         // Shared with posts for cross-discovery
}

bookshelf: {
  title: string
  author: string
  status: 'reading' | 'finished' | 'want-to-read'
  thoughts?: string      // 2-3 sentence review
  link?: string          // Neutral external link (OpenLibrary, Goodreads)
  dateFinished?: string
}
```

**localStorage:**
- `xexr-vibe`: Hex colour string (e.g., `#00ff88`). Read in blocking `<head>` script.

**No database.** All content is file-based MDX compiled at build time. No dynamic data fetching for content pages.

### User Flows

**Flow 1: First-time visitor from social media**
1. Arrives at `/posts/[slug]` (shared link)
2. Reads the post (primary design focus)
3. Sees Subscribe CTA below content -> links to Substack
4. Scrolls to Giscus comments (lazy-loaded)
5. Sees prev/next navigation
6. Notices About page link -> explores further
7. May discover Vibe pill in status bar (gentle pulse)

**Flow 2: Returning reader**
1. Arrives at homepage or `/posts`
2. Scans compact post list for new content (dates prominent)
3. Reads new post -> Subscribe CTA -> prev/next
4. May check Now page for personal updates
5. RSS subscribers already know about new content

**Flow 3: Credibility evaluator (collaborator/recruiter)**
1. Lands on About page (narrative-first)
2. Reads story: ACA -> tech -> indie hacker
3. Follows structured CTA: "See what I've built" -> Projects
4. Projects page: stacked list with status badges, tech stacks
5. Follows CTA: "Read my thinking" -> Posts
6. Reads 1-2 posts to assess depth and voice

**Flow 4: Vibe customisation**
1. Notices gentle pulse on Vibe pill in status bar
2. Clicks pill -> drawer opens (bottom sheet mobile, popover desktop)
3. Taps a preset or drags spectrum slider
4. Sees smooth site-wide colour transition (0.4s cubic-bezier)
5. Closes drawer (backdrop/Escape/button) -> choice persists via localStorage
6. Returns days later -> same colour loaded before first paint

**Flow 5: Content authoring**
1. Write MDX in editor with frontmatter
2. Images co-located in post directory
3. `git commit && git push`
4. Vercel auto-deploys (zero-downtime)
5. Cross-post to Substack (canonical URL -> xexr.com)
6. Share on Twitter linking to xexr.com

### Error Handling

- **Vibe localStorage unavailable:** Fall back to default mint. Wrap in try/catch. Silent skip on write failure.
- **Particle canvas unsupported:** Hero renders normally without particles. Skip silently.
- **Giscus/GitHub unreachable:** Hide comment section with "Comments temporarily unavailable" text.
- **Removed/renamed post URL:** Custom 404 with recovery paths (homepage, blog index, 3 recent posts). Maintain redirects in Next.js config for renamed posts.
- **Draft post URL guessed:** 404 — drafts excluded at build time entirely.
- **Very long post title:** CSS wrapping on page, truncate with ellipsis in OG images after ~80 chars.
- **Tag filtering with no results:** Show empty state with "No posts tagged [tag]" and link to all posts.
- **Forced colours / Dark Reader:** `@media (forced-colors: active)` ensures readability. `<meta name="darkreader-lock">` prevents double-inversion.

### Integration Points

**Existing codebase to leverage:**
- shadcn/ui on Base UI React for accessible component primitives
- CVA pattern for component variants (extend for new components)
- `cn()` utility (clsx + tailwind-merge) for className composition
- Typed routes (`typedRoutes: true`) for type-safe navigation
- `siteConfig.ts` for centralised metadata
- Root layout structure with flex layout (extend for status bar)
- Existing 404 page (enhance with recovery paths)
- Vercel Analytics already integrated

**Patterns to follow:**
- OKLCh colour space (extend for Vibe accent variables)
- Mobile-first responsive (Tailwind `hidden md:flex` pattern)
- Import aliases: `@/*` -> `src/*`, `@components/*` -> `src/app/_components/*`
- Environment variables via `@t3-oss/env-nextjs` with Zod validation

**New dependencies needed:**
- Velite — MDX content compilation
- rehype-pretty-code + Shiki — syntax highlighting
- Giscus React component
- Plus Jakarta Sans + JetBrains Mono (via `next/font`)

**OG image generation:** Already available via `next/og` (built into Next.js 16). No additional package needed. Existing route at `/api/og/route.tsx` needs rebranding (mint accent, #050505 background, Plus Jakarta Sans font).

**Font migration (multi-file):**
1. Remove `geist` package from dependencies and `Roboto` from `next/font/google` imports
2. Add Plus Jakarta Sans and JetBrains Mono via `next/font`
3. Update CSS variable fallbacks in `globals.css` (`--font-sans`, `--font-mono`)
4. Update root layout to apply new font classes

**Analytics:** Vercel Analytics (already integrated) for launch. Plausible self-hosted deferred to post-launch.

### Page Specifications

**Homepage (`/`)**
- Hero: ~60-70vh with particle canvas background
  - Name: "Dane Poyzer"
  - Descriptor: Static text — "Building AI-powered tools. Writing about what I learn."
  - Avatar: Placeholder with initials, static conic gradient ring in accent colour
- Below hero: Featured posts section
  - n=1 at launch: Single "Latest" section, no labels
  - n=2+: Featured card(s) at top, recent list below
- Quick links to About, Projects, Subscribe
- Footer: Monospace "xexr" in accent, two-column links, RSS icon, social links

**Blog Index (`/posts`)**
- Compact list layout (chrisgregori.dev style)
- Each row: title, date ("22 Feb 2026"), tags (max 3 pills), reading time
- Tag filter pills at top, client-side with URL query sync
- No search at MVP (<10 posts)
- Simple pagination (not infinite scroll)

**Post Page (`/posts/[slug]`)**
- Title: large, commanding (Plus Jakarta Sans 800)
- Metadata bar: date, reading time, tags
- Prose column: 740px max-width, generous line-height (1.7-1.8)
- Sticky ToC in right margin (1200px+), collapsible at top (mobile)
- MDX content with custom components
- Post-reading sequence:
  1. Subscribe CTA (prime placement) -> Substack link
  2. Share buttons: Copy link + Twitter
  3. Giscus comments (lazy-loaded via IntersectionObserver)
  4. Prev/next navigation with title + date
- "Updated [date]" shown inline if applicable

**About (`/about`)**
- Narrative-first: Who you are, your path (ACA -> tech -> indie hacker), what you're building, what you believe in
- Photo (important for connection)
- Structured CTAs for credibility evaluators:
  - "See what I've built" -> Projects
  - "Read my thinking" -> Posts
- Social links, email, Substack link

**Projects (`/projects`)**
- Stacked list layout (full-width rows)
- Each project: name, one-liner, tech stack badges, status badge (active/maintained/shelved/archived), link
- Show all projects including abandoned with honest status
- Tags shared with posts for cross-discovery

**Now (`/now`)**
- Single page, ephemeral (replace on update, git history preserves old versions)
- "Last updated: 22 Feb 2026 (7 days ago)" — prominent, below heading
- If >90 days old: subtle "This page may be out of date" note
- Sections: Current projects, learning, reading, life updates

**Uses (`/uses`)** — footer nav, ship when content ready
- Grouped list: Hardware, Dev tools, Stack, Productivity
- Brief commentary on each item (opinions, not just lists)

**Bookshelf (`/bookshelf`)** — footer nav, ship when content ready
- Three sections: Currently Reading, Recently Finished (with thoughts), Want to Read
- Links to neutral external sources (OpenLibrary, Goodreads)
- Include books you bounced off (authenticity)

**Colophon (`/colophon`)** — footer nav, ship when content ready
- Tech stack with reasoning
- Hosting setup, design decisions
- Link to public GitHub repo
- No performance stats (maintenance burden)

### Visual Design

**Colour System:**
- Background: #050505 (near-black)
- Foreground (headings): #e8e8e8 (off-white)
- Body text: #a0a0a0 (muted grey)
- Secondary text: #8a8a8a (was #555555, lightened for WCAG AA compliance)
- Default accent: #00ff88 (mint green)
- Accent variants: `--accent-dim` (18% opacity), `--accent-soft` (25%), `--accent-glow` (10%)
- Dark-only. No light mode. Vibe system IS the personalisation story.

**Typography:**
- Headings: Plus Jakarta Sans 800, tight letter-spacing (-1.5px in em units for zoom scaling)
- Body: Plus Jakarta Sans regular, line-height 1.7-1.8
- Code & UI: JetBrains Mono for nav links, dates, tags, metadata, code blocks
- Minimum: 12px rendered size for all text

**Spacing:**
- Prose max-width: 740px
- Generous padding throughout
- Scanlines: extremely subtle repeating gradient overlay, `pointer-events: none`, `aria-hidden`

**Hover Effects (accent-driven):**
- Post items: 1px accent line grows left-to-right along bottom border (0.4s ease) + title transitions to accent colour
- Interactive elements: accent colour transitions on borders, backgrounds
- Touch devices: no hover states, `:focus-visible` for keyboard, subtle tap feedback
- All links: underline decoration (accent colour), not colour-only

**Code Blocks:**
- macOS window chrome (red/yellow/green dots, `aria-hidden`), filename tab, copy button
- Shiki syntax highlighting, accent colour for string literals only
- Line highlighting with accent-dim background
- Rounded corners (10px), elevated background
- Copy: checkmark icon for 2s, strips all decorative elements
- Long lines: horizontal scroll. >30 lines: collapse with expand button.
- 44x44px touch target on copy button (always visible on mobile)

**Branding:**
- Nav logo: accent-coloured square icon with "x" + monospace "xexr" text
- Avatar: placeholder with initials, static conic gradient ring
- Footer: monospace "xexr" in accent, two-column links

---

## Out of Scope

The following were considered but explicitly excluded from this version:

- **Light mode** — Dark-only is a deliberate commitment. Vibe system provides personalisation.
- **Search (Cmd+K)** — Brief defers this. No value with <10 posts. Add Pagefind at 10+ posts.
- **CMS** — Git-commit-to-publish is appropriate for solo 2x/month publishing.
- **Shareable Vibe URLs** — URL parameter complexity not worth it for MVP.
- **New-content badges** — RSS/newsletter handles return visitor awareness.
- **Image lightbox** — No content demands zoom at launch. Authors can link to full-size.
- **Page transitions** — Framework handles navigation. "Alive" feel from Vibe + particles.
- **PWA/offline** — Not standard for blogs. Manifest can stay, no service worker.
- **i18n** — Brief says don't build yet. Use centralised constants file for strings.
- **Newsletter embed** — Substack redirect is sufficient. Zero implementation.
- **Plausible Analytics at launch** — Use Vercel Analytics for now. Add Plausible self-hosted post-launch.
- **Template marketplace/sharing for Vibe** — No shareable configs at launch.
- **Breadcrumbs** — Site is max 2 levels deep (/posts/[slug]). Header nav suffices.
- **Buffer/scheduled posts** — Silence during quiet periods is the policy.
- **Evergreen page timestamps** — Only Now page shows last-updated date.
- **Colophon performance stats** — Too much maintenance burden.

---

## Codebase Migration

The current codebase is scaffolded from a template and contains defaults that conflict with this spec. These must be cleaned up during implementation:

**Critical cleanup:**
- Remove `maximumScale: 1` from viewport config in `src/app/layout.tsx` (WCAG zoom violation)
- Replace `Organization` JSON-LD schema with `WebSite` schema; add page-level schemas (Person, BlogPosting)
- Rewrite `sitemap.ts` to generate from Velite collections (currently has `/signin`, `/signup`, `/forgot-password`)
- Rewrite `robots.ts` to remove irrelevant `/admin`, `/dashboard` blocks
- Update `siteConfig.ts`: set URL to `https://xexr.com`, replace placeholder keywords/topics/email
- Rebrand OG route (`/api/og/route.tsx`): mint accent (#00ff88), #050505 background, Plus Jakarta Sans
- Add `<meta name="darkreader-lock">` to root layout `<head>`
- Add skip-to-content link as first focusable element; add `id="main-content"` to `<main>`
- Replace mobile nav with hamburger/drawer pattern (currently renders MainNav directly)

**CSS token migration:**
- Replace all OKLCh colour tokens in `globals.css` with spec palette (background #050505, foreground #e8e8e8, etc.)
- The Vibe system will dynamically set `--accent`; base tokens need manual update

**Content structure (directory-based):**
- Each post is a directory: `/content/posts/my-post/index.mdx` with co-located images
- Slug derived from directory name
- Velite glob pattern: `content/posts/*/index.mdx`

**Route organisation:**
- Keep existing `(app)` route group. All new pages go inside `src/app/(app)/`
- Status bar rendered in root layout (`src/app/layout.tsx`) outside `(app)` group for full-width positioning

**Metadata per page type:**
- Homepage: `openGraph.type: "website"`
- Post pages: `openGraph.type: "article"` with `published_time`, `author`, `tags`

**Tag filtering + pagination interaction:**
- Filter resets pagination to page 1
- Pagination operates within the filtered set
- Both sync to URL query params (`/posts?tag=ai&page=2`)

**CSP/security headers:**
- Define Content-Security-Policy in `next.config.ts` headers
- Allow inline script for Vibe colour injection (nonce or hash)
- Allow Giscus embed domain (`giscus.app`)

**README/docs cleanup:**
- Remove references to nonexistent `pnpm db:start` / `pnpm db:studio` scripts
- Update to reflect blog architecture (no database)

---

## Open Questions

- [ ] Vibe preset names and exact hex values (8 presets: Mint, Amber, Cyan, Coral, Ice, Green, Orange, Pink — exact OKLCh values TBD)
- [ ] Particle density tuning: exact counts for desktop/mobile breakpoints (brief says 60-100, need to performance-test)
- [ ] Content for first published post (5 suggestions in brief, but author chooses)
- [ ] About page photo (placeholder with initials for now, replace when photo available)
- [ ] Bookshelf data source (JSON file vs MDX vs Goodreads API — manual is simplest)
- [ ] Shiki theme customisation (custom dark theme matching site palette, with accent for strings)
- [ ] Exact breakpoint for ToC sidebar (suggested 1200px, needs testing)
- [ ] Giscus configuration: which GitHub repo, discussion category, theme

---

## Next Steps

- [x] Spec review (multimodal: Opus 4.6, GPT 5.3, Gemini 3 Pro) — complete
- [ ] Create implementation plan (break into beads epics/issues)
- [ ] Codebase migration (clean up scaffold defaults — see Codebase Migration section)
- [ ] Set up Velite + MDX pipeline with directory-based content structure
- [ ] Implement Vibe system
- [ ] Build post page (primary design focus)
- [ ] Write unit tests for Vibe persistence/sync, Velite schema validation, colour utilities
- [ ] Write and publish first post
- [ ] Deploy to Vercel

---

## Multi-Model Review

**Reviewed:** 2026-02-22
**Models:** Opus 4.6, GPT 5.3 Codex, Gemini 3 Pro
**Issues Found:** 28 (0 critical, 6 high, 9 medium, 13 low)

### Findings Addressed

| # | Issue | Resolution |
|---|-------|------------|
| 1 | Viewport maximumScale blocks zoom | Added to Codebase Migration: remove maximumScale: 1 |
| 2 | JSON-LD schema mismatch | Added to Codebase Migration: replace Organization with WebSite |
| 3 | OG image wrong colours/branding | Added to Codebase Migration: rebrand OG route |
| 4 | Sitemap/robots stale content | Added to Codebase Migration: rewrite from Velite collections |
| 5 | Canonical domain migration | Added to Codebase Migration: update siteConfig URL |
| 6 | Spec blurs current vs target state | Added "target architecture" note to Architecture Overview |
| 7 | Colour token migration | Added to Codebase Migration: CSS token update |
| 8 | Font stack replacement scope | Expanded in Integration Points with full migration steps |
| 9 | (app) route group guidance | Resolved: keep (app) group, new pages go inside it |
| 10 | Content structure ambiguity | Resolved: directory-based, updated architecture diagram |
| 11 | Test strategy missing | Added test step to Next Steps |
| 12 | Analytics strategy | Resolved: Vercel only at launch, Plausible deferred |
| 13 | Tag filtering + pagination | Added interaction rules to Codebase Migration |
| 14 | CSP/security headers | Added CSP requirements to Codebase Migration |
| 15 | "instant" vs "0.4s" wording | Fixed: changed to "smooth" |
| 16 | @vercel/og not needed | Removed from dependencies, noted next/og is built-in |
| 17 | Question accounting | Note: 97 auto + 45 branch points = 142. 44 answered + 1 not asked (inferred from cascades) |
| 18 | Self-review gap count | Superseded by this multi-model review |
| 19-28 | Low-severity items | Addressed via Codebase Migration section and inline fixes |

### Ambiguities Resolved

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Route groups | Keep (app) group | Layout separation, extensibility |
| Analytics | Vercel only at launch | Simpler; add Plausible post-launch |
| Content structure | Directory-based | Better for co-located images |

### Full Review

Detailed 3-model comparison available in: `plans/site-setup/02-spec/spec-review.md`

---

## Appendix: Source Files

- `plans/site-setup/00-prompt/prompt.md` — Original project brief (424 lines)
- `plans/site-setup/01-scope/context.md` — Codebase context analysis
- `plans/site-setup/01-scope/questions.md` — 142 synthesized scope questions (3 models x 3 perspectives)
- `plans/site-setup/01-scope/question-triage.md` — 97 auto-answers + 45 branch points + interview plan
- `plans/site-setup/01-scope/answers.md` — All 44 human answers across 3 interview rounds
- `plans/site-setup/01-scope/gpt-questions.md` — GPT 5.3 consolidated analysis
- `plans/site-setup/01-scope/opus-questions.md` — Opus 4.6 consolidated analysis
- `plans/site-setup/01-scope/gemini-questions.md` — Gemini 3 Pro consolidated analysis
