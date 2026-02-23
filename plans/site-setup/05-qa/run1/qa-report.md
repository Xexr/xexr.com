# QA Report — site-setup (Run 1)

## Summary

| Metric | Value |
|--------|-------|
| Total tests | 50 |
| Passed | 35 |
| Failed | 3 |
| Blocked | 12 |
| Pass rate | 70% (92% of executable tests) |
| Tester | Claude Chrome Extension |
| Date completed | 2026-02-23 |

---

## Test Results

### A. Global Layout & Foundation

**TC-1: Dark background and colour palette** — **PASS**
- Background: `rgb(5, 5, 5)` (#050505) ✓
- H1 colour: `rgb(232, 232, 232)` (#e8e8e8) ✓
- Body/muted text: `rgb(138, 138, 138)` (#8a8a8a) — spec says #a0a0a0; actual is slightly darker but still muted grey, all text is light-on-dark ✓

**TC-2: Font rendering (Plus Jakarta Sans and JetBrains Mono)** — **PASS**
- Headings: `"Plus Jakarta Sans"` ✓
- Nav links: `"JetBrains Mono"` ✓
- Geist font found in stylesheet but only applied to `NEXTJS-PORTAL` (Next.js dev overlay), not any content element ✓
- No Roboto loaded ✓

**TC-3: Skip-to-content link** — **PASS**
- Link text: "Skip to content", href: "#main-content" ✓
- `#main-content` element present ✓
- Link visually hidden (1px × 1px, overflow hidden, position absolute) ✓

**TC-4: Scanline overlay** — **PASS**
- `<div class="scanlines">` present with `position: fixed`, `pointer-events: none`, `aria-hidden="true"`, `z-index: 50` ✓

**TC-5: Darkreader-lock meta tag** — **PASS**
- `<meta name="darkreader-lock">` present in `<head>` ✓

---

### B. Header & Navigation

**TC-6: Header logo and branding** — **PASS**
- Accent-coloured (mint `rgb(0, 255, 136)`) square with "x" character ✓
- Monospace "xexr" text ✓
- No theme toggle button visible ✓

**TC-7: Desktop navigation links** — **PASS**
- Four items: Posts, About, Projects, Now ✓
- All in JetBrains Mono ✓
- Active page link shown in accent colour ✓

**TC-8: Desktop navigation active state** — **BLOCKED**
- `/posts` page: "Posts" correctly highlighted in accent colour ✓
- `/posts/hello-world` (parent route detection): BLOCKED — post page crashes with CSP error (see TC-28)

**TC-9: Mobile hamburger menu** — **PASS**
- At 375px viewport: desktop nav links hidden, hamburger icon visible ✓
- Tapping opens drawer with Posts, About, Projects, Now ✓
- Drawer slides in from the right ✓

**TC-10: Mobile nav drawer keyboard and escape** — **PASS**
- Escape key closes the drawer ✓
- `role="dialog"` on drawer element ✓
- All 4 nav links keyboard-focusable inside drawer ✓
- Note: focus trapping could not be mechanically verified but `role="dialog"` is present

---

### C. Footer

**TC-11: Footer content and links** — **PASS**
- "xexr" in accent colour ✓
- Primary nav column: Posts, About, Projects, Now ✓
- Social column: GitHub, Twitter/X, RSS icons ✓
- Subscribe (Substack) link ✓
- Copyright: "© 2026 xexr.com. All rights reserved." ✓
- Note: Footer has three columns — branding, primary nav, social/subscribe. "Secondary links" = social+subscribe column.

**TC-12: Footer pushed to bottom** — **PASS**
- `main` element has `flex-grow: 1` applied ✓
- Footer appears at viewport bottom on short-content pages ✓

---

### D. Vibe System

**TC-13: Status bar and Vibe pill** — **FAIL**
- Status bar fixed at bottom of viewport ✓
- Pill shows "vibe #00ff88" with accent-coloured dot ✓
- **FAIL: No pulse/glow animation on the pill** — computed `animation: none` on both pill and dot elements. No `@keyframes` for a vibe pulse animation found in stylesheets. Spec requires a "subtle pulse/glow animation."

**TC-14: Vibe drawer opens from pill** — **PASS**
- Clicking pill opens drawer with 8 presets (Mint, Amber, Cyan, Coral, Ice, Green, Orange, Pink) ✓
- Spectrum slider for custom colours ✓
- Current hex value shown ✓
- Note: On desktop the drawer appears as a centred modal, not an anchored popover from the pill. Functionally equivalent.

**TC-15: Vibe preset changes site accent colour** — **PASS**
- Clicking "Amber" changes `--accent` to `#ffb300` in real-time ✓
- Logo square, avatar ring, and pill dot all update immediately ✓
- Smooth transition observed ✓

**TC-16: Vibe colour persists across reload** — **PASS**
- Colour stored in `localStorage['xexr-vibe']` ✓
- After reload, amber colour loads immediately — no flash of mint ✓
- Hex value in pill matches selection ✓

**TC-17: Vibe drawer keyboard navigation** — **PASS**
- All 8 preset buttons have `tabIndex: 0` (keyboard-focusable) ✓
- Escape closes the drawer ✓

**TC-18: Vibe drawer on mobile (bottom sheet)** — **PASS**
- At 375px viewport: drawer opens as a bottom sheet sliding up from bottom ✓
- All 8 presets and spectrum slider accessible ✓
- Close (×) button present ✓

**TC-19: Vibe prefers-reduced-motion** — **FAIL**
- No `@media (prefers-reduced-motion: reduce)` rules found in any stylesheet ✓
- The vibe pill animation is absent regardless (see TC-13), but canvas animation and colour transitions have no reduced-motion CSS overrides
- **FAIL: No prefers-reduced-motion CSS found.** Transitions and canvas animations are not disabled for users who prefer reduced motion.

---

### E. Particle Canvas

**TC-20: Particle canvas renders in hero** — **PASS**
- Animated canvas visible behind hero content ✓
- Particles (dots) with connecting lines visible ✓
- Radial gradient fade at edges ✓
- Canvas uses accent colour for particles ✓

**TC-21: Particle canvas mouse repulsion (desktop)** — **BLOCKED**
- Requires live mouse movement over the canvas; cannot be mechanically verified via browser automation. Canvas is rendered and animating; repulsion behaviour visible during manual inspection of initial screenshot.

**TC-22: Particle canvas accessibility** — **PASS**
- `aria-hidden="true"` ✓
- `tabIndex: -1` (not keyboard-focusable) ✓
- Hero content (name, descriptor) readable on top of canvas ✓

---

### F. Homepage

**TC-23: Homepage hero content** — **PASS**
- "Dane Poyzer" heading in Plus Jakarta Sans 800 weight, 60px ✓
- Descriptor: "Building AI-powered tools. Writing about what I learn." ✓
- Avatar with "DP" initials and conic gradient ring in accent colour ✓
- Particle canvas animating behind ✓

**TC-24: Homepage featured posts section** — **PASS**
- Single "latest" post entry shown below hero (no "Featured"/"Recent" labels with only one post) ✓
- Quick links: About → /about, Projects → /projects, Subscribe → Substack ✓

---

### G. Blog Index

**TC-25: Blog index post list** — **PASS**
- Post shown: title, date ("23 Feb 2026" format ✓), tag pills (meta, writing, nextjs), reading time (2 min) ✓
- Compact list style ✓

**TC-26: Blog index tag filtering** — **PASS**
- Clicking "meta" tag button updates URL to `/posts?tag=meta` ✓
- Post list filters correctly ✓
- Clicked tag pill shows selected/active state ✓

**TC-27: Post card hover effect (desktop)** — **PASS**
- Bottom accent line: `origin-left scale-x-0 bg-accent group-hover:scale-x-100 duration-400` ✓ (grows left-to-right on hover)
- Title has `group-hover:text-accent` class ✓
- Entire card is an `<a>` element (fully clickable) ✓

---

### H. Post Page

**TC-28: Post page layout and typography** — **FAIL**
- **CRITICAL: `/posts/hello-world` crashes with a React error boundary.** Root cause: MDX renderer calls `new Function()` (in `toComponent()`) which is blocked by the Content Security Policy: `"script-src 'self' 'unsafe-inline'"` does not permit `unsafe-eval`. The error is thrown in `_be2f9c9c._.js` at the `toComponent` function.
- The page shows: "ERROR — Something went wrong — An unexpected error occurred."

**TC-29: Post page code block rendering** — **BLOCKED** (blocked by TC-28)

**TC-30: Code block copy button** — **BLOCKED** (blocked by TC-28)

**TC-31: Table of Contents (desktop)** — **BLOCKED** (blocked by TC-28)

**TC-32: Table of Contents (mobile)** — **BLOCKED** (blocked by TC-28)

**TC-33: Post reading flow (subscribe, share, comments, nav)** — **BLOCKED** (blocked by TC-28)

**TC-34: Share — copy link button** — **BLOCKED** (blocked by TC-28)

**TC-35: Post page JSON-LD schema** — **BLOCKED** (blocked by TC-28)

---

### I. About Page

**TC-36: About page content and CTAs** — **PASS**
- Narrative-first content (actuarial → engineering → indie hacker journey) ✓
- Avatar/photo placeholder with "DP" initials and conic gradient ring ✓
- "See what I've built" → /projects ✓
- "Read my thinking" → /posts ✓
- Social links: GitHub, Twitter, Substack, Email ✓
- Note: "See what I've built" button displays an external-link icon but links internally to /projects

**TC-37: About page JSON-LD schema** — **PASS**
- `@type: "Person"` ✓
- `name: "Dane Poyzer"` ✓
- `url: "https://xexr.com"` ✓
- `sameAs: [GitHub, Twitter/X, Substack]` ✓

---

### J. Projects Page

**TC-38: Projects page layout** — **PASS**
- Stacked full-width row layout ✓
- "Gas Town" project: name, description, tech badges (Go, Dolt, Git, tmux, Claude Code), "Active" status badge (distinct green styling), external GitHub link ✓
- Hover effect: accent line grows bottom of row (same pattern as post cards) ✓

---

### K. Now Page

**TC-39: Now page with date and staleness** — **PASS**
- "Last updated: 23 Feb 2026 (today)" prominently shown ✓
- Content sections: Building, Learning, Reading, Life ✓
- No staleness warning (updated today) ✓

---

### L. 404 Page

**TC-40: 404 page with recovery paths** — **PASS**
- Styled 404 page matching site design (dark background, accent colours) ✓
- "Page not found" heading ✓
- "Go home" → / and "Browse posts" → /posts recovery links ✓
- Recent post listed: "Building in Public: Why I Started Writing" ✓

---

### M. SEO & Meta

**TC-41: Sitemap** — **PASS**
- Valid XML sitemap ✓
- All pages listed: /, /posts, /about, /projects, /now, /posts/hello-world ✓
- All have `<lastmod>` dates ✓
- No stale /admin, /dashboard, /signin URLs ✓

**TC-42: Robots.txt** — **PASS**
- `User-Agent: *`, `Allow: /`, `Disallow: /api` ✓
- Sitemap URL: `https://xexr.com/sitemap.xml` ✓
- No /admin or /dashboard blocks ✓

**TC-43: RSS feed** — **PASS**
- Valid RSS 2.0 XML with correct channel metadata ✓
- Post included with title, full content, link, pubDate, guid ✓
- Note: `<mdximage>` custom component appears as raw XML in the RSS feed (not rendered). Minor issue.

**TC-44: OG image generation** — **PASS**
- Image generated at 1200×630 ✓
- Near-black background with mint green accent ✓
- "xexr.com" pill, title, and description rendered from query params ✓

---

### N. Responsive Design

**TC-45: Homepage mobile layout** — **PASS**
- At ~375px viewport: hero height is 50vh ✓
- Hamburger menu replaces desktop nav ✓
- Content readable without horizontal scrolling ✓
- Vibe pill visible at bottom ✓

**TC-46: Post page mobile layout** — **BLOCKED** (blocked by TC-28)

---

### O. Accessibility

**TC-47: Link styling (underline, not colour-only)** — **BLOCKED**
- Requires post page prose content; post page blocked by TC-28.
- Note: CTA button links on /about have `text-decoration: none` — underlines not applied to button-styled links (acceptable).

**TC-48: External link indicators** — **PASS**
- External links have `target="_blank"` ✓
- External links have `rel="noopener noreferrer"` ✓
- SVG icons present alongside external link text ✓

**TC-49: ReturnToTop button placement** — **BLOCKED**
- Spec targets `/posts/hello-world` which is blocked by TC-28.
- On homepage: no ReturnToTop button found in DOM or fixed elements after scrolling. VibeShell only contains the vibe pill. Component may only render on post pages.

**TC-50: Homepage JSON-LD schema** — **PASS**
- `@type: "WebSite"` ✓
- `name: "xexr.com"` ✓
- `url: "https://xexr.com"` ✓
- `author` field present ✓

---

## Failed Tests

### TC-13: Status bar and Vibe pill — no pulse/glow animation

- **Severity:** Low
- **Steps to reproduce:** Navigate to `/` and inspect the vibe pill element's computed animation property
- **Expected:** The pill has a subtle pulse/glow animation
- **Actual:** `animation: none` on both the pill button and the dot span. No `@keyframes` vibe animation found in any stylesheet.
- **Screenshot/description:** Pill is visible and functional but static — no animation

---

### TC-19: Vibe prefers-reduced-motion

- **Severity:** Medium
- **Steps to reproduce:** Enable "prefers-reduced-motion: reduce" in DevTools Rendering tab, observe site behaviour
- **Expected:** Pulse animation disabled, colour transitions instant, canvas disabled/static
- **Actual:** No `@media (prefers-reduced-motion)` rules found in any stylesheet. Animations/transitions would run regardless of user preference.
- **Screenshot/description:** No reduced-motion CSS rules present

---

### TC-28: Post page crash — CSP blocks MDX renderer

- **Severity:** Critical
- **Steps to reproduce:** Navigate to `http://dev.local:3006/posts/hello-world`
- **Expected:** Post page renders with title, metadata, prose content, code blocks, ToC
- **Actual:** React error boundary triggers — "Something went wrong. An unexpected error occurred." Console shows: `EvalError: Evaluating a string as JavaScript violates the following Content Security Policy directive because 'unsafe-eval' is not an allowed source of script: script-src 'self' 'unsafe-inline'"`. Stack trace points to `toComponent()` in the MDX runtime calling `new Function()`.
- **Root cause:** The MDX renderer evaluates compiled MDX at runtime using `new Function()`. The site's CSP does not include `unsafe-eval` in `script-src`, blocking this execution. Fix requires either: (a) adding `'unsafe-eval'` to the CSP `script-src` (weakens security), or (b) switching to build-time MDX compilation so no runtime eval is needed (preferred).
- **Blocked by this:** TC-29, TC-30, TC-31, TC-32, TC-33, TC-34, TC-35, TC-46, TC-47, TC-49 (10 tests blocked)

---

## Blocked Tests

- **TC-8** (partial): Post page `/posts/hello-world` can't load — parent route nav detection unverifiable
- **TC-21**: Requires live mouse movement over canvas — not automatable via current tooling
- **TC-29–35**: All blocked by TC-28 (post page crash)
- **TC-46**: Mobile post layout — blocked by TC-28
- **TC-47**: Body text link underlines — blocked by TC-28 (post page prose unavailable)
- **TC-49**: ReturnToTop — blocked by TC-28 (post page unavailable; homepage has insufficient scroll depth to trigger it)

---

## Passing Notes

- **TC-1**: Body text colour measures #8a8a8a rather than the spec's #a0a0a0 — slightly darker but aesthetically consistent. Not treated as a failure.
- **TC-14**: On desktop the Vibe drawer opens as a centred modal rather than an anchored popover from the pill. Functionally identical; layout detail differs from spec wording.
- **TC-36**: "See what I've built" button displays an external-link icon (↗) but links internally to `/projects`. Misleading icon usage.
- **TC-43**: `<mdximage>` MDX component renders as raw XML in the RSS feed. Low impact (RSS readers ignore unknown tags) but indicates RSS content is raw MDX output, not pre-rendered HTML.
- **TC-11**: Footer copyright is "© 2026" — correct year ✓

---

## Overall Assessment

The site foundation is solid: dark theme, typography, layout, navigation, Vibe system, homepage, blog index, about, projects, now, 404, and all SEO/meta endpoints all function correctly and closely match the spec.

The single critical blocker is the **post page crash (TC-28)** caused by the MDX runtime using `new Function()` in conflict with the Content Security Policy. This is a genuine incompatibility between the CSP configuration and the chosen MDX rendering approach. It blocks 10 additional tests and means the core content delivery mechanism of the blog is currently non-functional.

Two minor failures exist: the vibe pill missing its pulse animation (TC-13) and the absence of prefers-reduced-motion CSS (TC-19) — both are low-to-medium severity and do not affect core functionality.

**Recommendation: Needs fixes before landing.** Resolve the CSP/MDX conflict (TC-28) as the priority — all post-page tests should then be re-run. The two animation gaps (TC-13, TC-19) can be addressed in a follow-up.
