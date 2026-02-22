# xexr.com — Project Brief

## Overview

A personal blog and digital home for **Dane Poyzer** — indie hacker, chartered accountant turned builder, deep in AI orchestration. The site should feel like visiting the workshop of someone who takes their craft seriously: clean, confident, opinionated, and unmistakably high-quality.

**Domain:** xexr.com
**Identity:** Dane Poyzer (byline), xexr (brand/handle)
**Stack:** Next.js 16 (App Router), MDX (Velite), Tailwind CSS, Vercel
**Repo:** Public on GitHub (`xexr/xexr.com`)

---

## Design Direction

### Philosophy

Dark-first. Minimal but not sterile. The site should feel like a premium dev tool with personality — somewhere between the confidence of rauchg.com and the richness of maggieappleton.com, but firmly in a dark palette. Every detail should signal taste: typography, spacing, transitions, code rendering. The site should feel *alive*.

### Design Concept (Refined v3)

A working HTML prototype of the homepage design exists as `blog-refined-v3.html` in the project files. This is the canonical design reference for implementation. Key design decisions:

### Visual Language

- **Background:** Near-black `#050505`, not pure black
- **Text:** Off-white for headings (`#e8e8e8`), muted grey for body (`#a0a0a0`), darker grey for secondary (`#555555`)
- **Accent colour:** User-selectable via the "Vibe" system (see below). Default: mint green `#00ff88`. The accent drives links, hover states, tags, code string highlighting, status indicators, and the particle effect.
- **Accent variants:** Auto-generated from the base accent: `--accent-dim` (18% opacity), `--accent-soft` (25%), `--accent-glow` (10%)
- **Typography:**
  - **Headings:** Plus Jakarta Sans — 800 weight, tight letter-spacing (-1.5px)
  - **Body:** Plus Jakarta Sans — regular weight, generous line-height (1.7–1.8)
  - **Code & UI:** JetBrains Mono — used for nav links, dates, tags, metadata, and code blocks
- **Spacing:** Generous. Content max-width 740px for prose. Let content breathe.
- **Scanlines:** Extremely subtle repeating gradient overlay across the page for a hint of CRT texture

### The "Vibe" System

A signature interactive feature: users can customise the site's accent colour. This persists across sessions via localStorage.

- **Vibe button:** A compact pill in the status bar showing `vibe #00ff88` with a coloured dot. Clicking toggles a drawer.
- **Drawer contents:** 8 preset colour dots (Mint, Amber, Cyan, Coral, Ice, Green, Orange, Pink) plus a continuous spectrum slider for custom colours.
- **Global effect:** Changing the vibe updates every accent-coloured element site-wide with a smooth `0.4s cubic-bezier` transition — tags, links, hover states, code highlights, particles, avatar ring, status dots, everything.
- **Persistence:** Saved to localStorage as `xexr-vibe`. Restored on page load.

### Interactive Particle Effect

A reactive particle network fills the hero section background:

- **Particles:** ~60-100 nodes (density scales with viewport), connected by thin lines when within 90px proximity
- **Colour:** Particles and connections match the current accent colour in real-time
- **Mouse interaction:** Particles repulse from the cursor within a 100px radius, creating a fluid, organic feel
- **Edge fading:** Radial gradient mask fades particles at the edges so they blend naturally into the background
- **Performance:** Canvas-based with requestAnimationFrame, scaled for device pixel ratio

### Post Hover Animations

- **Accent underline:** On hover, a 1px accent-coloured line grows left-to-right along the bottom border of the post item (0.4s ease)
- **Title colour:** Post title transitions to accent colour on hover
- **No indent:** Clean, no padding-left shift on hover

### Code Blocks

macOS-style window chrome (red/yellow/green dots), filename tab, copy button. Shiki syntax highlighting with accent colour used for string literals. Line highlighting with accent-dim background. Rounded corners (10px), elevated background. These are a centrepiece of the site.

### Branding

- **Nav:** Accent-coloured square icon with `x` + monospace `xexr` text (no `>` prefix)
- **Avatar:** Placeholder with initials, wrapped in a static conic gradient ring matching the accent colour. Replace with photo later.
- **Footer:** Monospace `xexr` in accent colour, two-column link layout

### Inspiration References

- **rauchg.com** — minimal dark confidence
- **paco.me** — beautiful dark personal site
- **josh w comeau's blog** — interactive components, playful touches
- **chrisgregori.dev** — numbered post list, clean vertical rhythm
- **maggieappleton.com** — richness, custom illustrations, information design (but dark palette instead of light)

---

## Sitemap & Pages

### 1. Home (`/`)

The landing page. Not a wall of blog posts — a curated introduction.

- Hero section: Name, one-line descriptor ("Building AI-powered tools. Writing about what I learn."), subtle animated element (gradient mesh, particle field, or similar — something distinctive but not distracting)
- Featured/pinned posts (2–3 hand-picked)
- Recent posts (latest 5, with date, title, tags, reading time)
- Quick links to About, Projects, Subscribe
- Minimal footer with GitHub, Twitter, Substack links

### 2. Blog Index (`/posts`)

All posts, reverse chronological. Filterable/searchable by tags.

- Each post card shows: title, date, tags, reading time, 1–2 line excerpt
- Tag filter (clickable pills at the top)
- Search (optional, can add later — not MVP)
- Pagination or infinite scroll (preference: simple pagination)

### 3. Individual Post (`/posts/[slug]`)

The core reading experience. This must be beautiful.

- Post title (large, commanding)
- Metadata bar: date, reading time, tags
- MDX content with full component support (see Content section)
- Table of contents (sticky sidebar on desktop, collapsible on mobile)
- Giscus comments at the bottom
- Previous/next post navigation
- Share buttons (Twitter, copy link — keep it minimal)
- "Subscribe for more" CTA linking to Substack

### 4. About (`/about`)

Tell the story. Not a CV — a narrative.

**Structure:**
- Opening: Who you are in one paragraph. The chartered accountant who codes. The indie hacker building AI tools. The dad who ships products between nappy changes.
- Your path: ACA → tech → indie building. What makes you different is the combination — financial rigour + technical skill + AI obsession.
- What you're building and why: dypt, makeacraft, the Gastown community
- What you believe in: building in public, evidence-based approaches, quality over speed, honest takes over hype
- Photo of you (important — people connect with faces)
- Links to socials, email, Substack

**Tone:** Confident but not arrogant. Specific, not generic. Show personality.

### 5. Projects (`/projects`)

A showcase of what you're building.

- Card grid layout
- Each project: name, one-liner, screenshot/preview, tech stack badges, status (active/maintained/archived), link
- Projects to include:
  - **dypt** — AI-powered task manager
  - **makeacraft.com** — AI craft idea generator for kids
  - **Poyzer Tech** — the holding company (brief mention, link to poyzer.xyz)
  - Any notable open-source contributions or tools

### 6. Uses (`/uses`)

Your setup. Hardware, software, dev environment.

**Sections:**
- Hardware (machine, monitors, peripherals)
- Dev tools (Cursor IDE, Claude Code, tmux, terminal setup)
- Stack (Next.js, TypeScript, Tailwind, Vercel, etc.)
- Productivity (note-taking, task management, comms)
- Other (gaming setup if you want — shows personality)

Format: Grouped list with brief commentary on each item. This page should reflect your opinions — not just what you use, but why.

### 7. Bookshelf (`/bookshelf`)

What you're reading, have read, want to read.

**Three sections:**
- 📖 Currently Reading
- ✅ Recently Finished (with brief 2–3 sentence thoughts)
- 📚 Want to Read

Could be driven by a simple JSON/MDX data file. Consider pulling from a Goodreads API or just maintaining manually. Keep it honest — include books you bounced off and say why. Authenticity matters more than showing off.

### 8. Now (`/now`)

Inspired by nownownow.com. A single page updated monthly-ish.

What you're focused on right now:
- Current projects and their status
- What you're learning
- What you're reading
- What's going on in life (as much as you want to share)

Include a "Last updated" date so visitors know it's current.

### 9. Colophon (`/colophon`)

How the site is built. Your audience will care.

- Tech stack with brief reasoning for each choice
- Hosting setup
- Design decisions
- Link to the public GitHub repo
- Performance stats if you want to flex (Lighthouse scores, etc.)

---

## Content & MDX

### MDX Pipeline

**Velite** — purpose-built for content-driven Next.js sites. Chosen over alternatives:

- Type-safe content collections with Zod schema validation
- File-based content with frontmatter parsing
- Built-in MDX compilation
- Hot reload in development
- Works well with App Router

Contentlayer was considered but is effectively abandoned. next-mdx-remote is a lower-level alternative if more control is needed later.

### Frontmatter Schema

```yaml
---
title: "My Post Title"
description: "A brief description for SEO and excerpts"
date: "2026-02-21"
updated: "2026-02-22"          # optional, shows "Updated" badge
tags: ["ai", "orchestration", "gastown"]
draft: false                    # filtered from production builds
featured: false                 # appears on homepage
image: "/images/posts/my-post/cover.jpg"  # OG image
readingTime: 8                  # auto-calculated or manual override
---
```

### Custom MDX Components

These are what make MDX worth it. Build a library of reusable components:

- **`<Callout type="info|warning|tip">`** — styled callout boxes
- **`<CodeBlock>`** — enhanced code blocks with Shiki, copy button, filename tab, line highlighting
- **`<Interactive>`** — wrapper for embedded React demos
- **`<Image>`** — optimised images with captions, blur placeholders
- **`<Tweet>`** — embedded tweets (static, not Twitter's heavy embed)
- **`<YouTube>`** — lite YouTube embed (facade pattern for performance)
- **`<Aside>`** — margin notes on desktop, inline on mobile
- **`<Step>`** / **`<Steps>`** — numbered step-by-step guides
- **`<Comparison>`** — side-by-side before/after or option A vs B
- **`<FileTree>`** — directory structure visualisation

Don't build all of these upfront. Start with Callout, CodeBlock, and Image. Add others as posts demand them.

### Code Blocks (Shiki)

This deserves special attention. Use **Shiki** with **rehype-pretty-code** for:
- Accurate syntax highlighting (TextMate grammars)
- Line highlighting (`// [!code highlight]`)
- Line numbers (optional per block)
- Diff highlighting (`// [!code ++]` / `// [!code --]`)
- Word highlighting
- Title/filename display
- Copy button
- Custom dark theme matching your site's palette

---

## Technical Architecture

### Stack

| Layer | Choice | Reasoning |
|-------|--------|-----------|
| Framework | Next.js 16 (App Router) | Your expertise, ecosystem, Vercel integration |
| Content | MDX via Velite | Type-safe, file-based, supports React components |
| Styling | Tailwind CSS v4 | Utility-first, dark mode support, rapid iteration |
| Syntax highlighting | Shiki via rehype-pretty-code | Best-in-class code rendering |
| Comments | Giscus | GitHub Discussions-backed, free, dev-friendly |
| Deployment | Vercel | Zero-config for Next.js, preview deployments |
| Analytics | Plausible (self-hosted) | Privacy-respecting, free, single instance across all sites |
| OG Images | @vercel/og (Satori) | Auto-generated social preview images |
| Search | (later) Pagefind or Algolia | Static search, no server costs |
| RSS | Custom route handler | Full-content RSS feed at `/feed.xml` |

### Project Structure

```
xexr.com/
├── app/
│   ├── layout.tsx              # Root layout, fonts, analytics
│   ├── page.tsx                # Home
│   ├── posts/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── uses/
│   │   └── page.tsx
│   ├── bookshelf/
│   │   └── page.tsx
│   ├── now/
│   │   └── page.tsx
│   ├── colophon/
│   │   └── page.tsx
│   ├── tags/
│   │   └── [tag]/
│   │       └── page.tsx        # Posts filtered by tag
│   ├── feed.xml/
│   │   └── route.ts            # RSS feed
│   ├── og/
│   │   └── route.tsx           # OG image generation
│   └── sitemap.ts              # Auto-generated sitemap
├── content/
│   └── posts/
│       ├── my-first-post.mdx
│       └── another-post.mdx
├── components/
│   ├── ui/                     # Base UI components
│   ├── mdx/                    # MDX custom components
│   ├── layout/                 # Header, footer, nav
│   └── post/                   # Post-specific components
├── lib/
│   ├── content.ts              # Content fetching/parsing
│   ├── utils.ts
│   └── constants.ts
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── velite.config.ts            # Content schema
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### Key Technical Decisions

**File-based content is correct for now.** You're writing long-form posts, not publishing a high-frequency link blog. Git-backed MDX files give you version history, local editing in your IDE, and zero database costs. If you ever need a CMS layer, you can add Keystatic or Tina on top of the same file structure later.

**App Router over Pages Router.** You're on Next.js 15, use the modern patterns. Server components for content pages, client components only where needed (interactive MDX components, Giscus, search).

**No CMS to start.** Write MDX in your editor, commit, push, deploy. Adding a CMS is premature complexity.

**Analytics:** Plausible self-hosted on your existing VPS. Free, privacy-respecting, GDPR compliant without cookie banners, and a single instance covers all your sites (xexr.com, dypt, makeacraft, poyzer.xyz). Docker Compose setup with Postgres and ClickHouse.

---

## SEO & Distribution

### On-site SEO

- Dynamic `<meta>` tags per page (title, description, OG image)
- Auto-generated OG images via `@vercel/og` with post title, date, and your branding
- `sitemap.xml` auto-generated from content
- `robots.txt` allowing full crawling
- Canonical URLs on every page
- Structured data (JSON-LD) for blog posts (Article schema)

### Distribution Workflow (per post)

1. Write and publish on xexr.com
2. Cross-post to Substack (@danepoyzer) with canonical URL → xexr.com
3. Cross-post to dev.to with canonical URL → xexr.com
4. Share on Twitter (@danepoyzer) linking to xexr.com
5. Share in relevant communities (Gastown Discord, HN if appropriate, relevant subreddits)

### RSS

Full-content RSS feed at `xexr.com/feed.xml`. Many devs still use RSS readers — this is non-negotiable for your audience.

---

## Performance Targets

- Lighthouse: 95+ across all metrics
- First Contentful Paint: < 1.5s
- Cumulative Layout Shift: < 0.1
- No layout shifts from font loading (use `next/font` with `display: swap`)
- Images: Next.js `<Image>` with blur placeholders
- JS bundle: Minimal client-side JS — most pages should be server-rendered

---

## MVP Scope (Ship in ~1 week)

### Must have for launch:
- [ ] Home page with recent posts
- [ ] Blog index (`/posts`)
- [ ] Individual post pages with MDX rendering
- [ ] Shiki code highlighting
- [ ] Basic MDX components (Callout, Image)
- [ ] About page (even if brief to start)
- [ ] Dark theme with Vibe colour system (presets + spectrum picker + localStorage persistence)
- [ ] Hero particle effect
- [ ] RSS feed
- [ ] OG image generation
- [ ] Giscus comments
- [ ] Substack subscribe link
- [ ] Responsive design
- [ ] Deployed on Vercel
- [ ] **One published post**

### Add shortly after:
- [ ] Projects page
- [ ] Uses page
- [ ] Now page
- [ ] Tags and tag filtering
- [ ] Table of contents on posts
- [ ] Search
- [ ] Bookshelf
- [ ] Colophon
- [ ] More MDX components as needed

### Don't build yet:
- [ ] Newsletter integration on-site (use Substack link for now)
- [ ] CMS
- [ ] i18n
- [ ] Light mode (commit to dark — the Vibe system is your personalisation story)
- [ ] Advanced search with Algolia

---

## Content Plan (First 5 Posts)

These are suggestions — write what excites you most:

1. **"Hello World from xexr.com"** — Introduction post. Who you are, what you're building, why you're writing. Sets the tone.
2. **"What I've Learned About AI Orchestration from Inside Gastown"** — Your insider perspective. Practical, opinionated, valuable to the growing community.
3. **"Building in Public as a Chartered Accountant Turned Indie Hacker"** — Your unique angle. Nobody else has this exact combination.
4. **A technical deep-dive** — Something specific you've solved or learned. Could be about orchestrator patterns, agent design, or a problem you hit building dypt.
5. **"My AI-Augmented Development Workflow in 2026"** — Uses page as a post. How you use Claude Code, Cursor, and other tools day-to-day.

---

## Summary

Ship the MVP in a week. Write the first post in parallel with the build. Don't let the site become the project — the writing is the project. The site is just the container.

The single most important thing is that **post one is live on xexr.com within two weeks from today**.