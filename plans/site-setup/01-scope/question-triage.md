# Question Triage: site-setup

**Scope selected:** Everything (all priorities)
**Questions in scope:** 142
**Auto-answerable:** 97
**Branch points for human:** 45

---

## Auto-Answerable Questions

| # | Question | Proposed Answer | Source |
|---|----------|-----------------|--------|
| 1 | How does the Vibe system prevent users from selecting colours that make the site unreadable? | Enforce minimum WCAG AA contrast ratio (4.5:1) against the background (#050505). Clamp the luminance floor on the spectrum slider so users cannot select colours below the threshold. Presets are pre-validated. Show a subtle warning if custom colour approaches low contrast, and auto-adjust luminance upward. | Industry best practice (WCAG 2.1 AA); technical constraint on dark background |
| 2 | Does the site respect `prefers-reduced-motion` for particles, hover animations, and colour transitions? | Yes, mandatory. Wrap all animations in `@media (prefers-reduced-motion: reduce)` — disable particles, replace transitions with instant swaps, disable hover animations. This is a WCAG 2.3.3 requirement, not optional. | WCAG requirement; universal expectation |
| 3 | Does the contrast ratio between secondary text (#555555) and background (#050505) meet WCAG AA? | No, it fails (2.9:1). Lighten secondary text to at least #8a8a8a (~4.5:1 against #050505) or use #999999 for comfortable margin. Keep the muted aesthetic but within accessible range. | Technical constraint (WCAG AA math) |
| 11 | Can the Vibe system reset to the default colour, and is the reset mechanism obvious? | Yes. Include a clearly labelled "Reset" button/icon in the Vibe drawer. Clicking it restores the default mint (#00ff88) and clears/resets localStorage. Position it as the last item after presets, visually distinct. | Universal UX expectation; every customisation system needs a reset |
| 12 | How does the Vibe system degrade when localStorage is unavailable? | Fall back to the default mint accent. Wrap localStorage calls in try/catch. If read fails, use default. If write fails, silently skip persistence. Never error. The site works identically, the user just cannot persist their choice. | Technical constraint; standard progressive enhancement pattern |
| 13 | Can screen reader users navigate the site effectively? | Yes, enforce: semantic HTML5 landmarks (header, nav, main, footer), skip-to-content link as first focusable element, aria-hidden on particle canvas and decorative elements (traffic light dots), proper labelling on Vibe slider ("Accent colour hue"), heading hierarchy validation. Base UI React provides accessible primitives — leverage them. | WCAG requirement; base-ui already provides accessible foundations |
| 14 | Is the Vibe system keyboard-accessible? | Yes. Tab to Vibe pill opens drawer. Arrow keys navigate presets. Slider operable via arrow keys (left/right for hue). Escape closes drawer. Focus trap inside drawer while open. Return focus to pill on close. | WCAG requirement; standard keyboard interaction patterns (WAI-ARIA slider pattern) |
| 15 | How do code blocks behave on mobile? | Copy button always visible (not hover-dependent), meeting 44x44px touch target. Long lines: horizontal scroll (not wrap — wrapping breaks code semantics). Container breaks out of prose column on mobile if needed. Scrollbar styled subtly. | Industry standard for dev blogs (Josh Comeau, Lee Robinson pattern) |
| 16 | What does the site experience look like with JavaScript disabled? | All content readable via SSR (Next.js App Router server components). Particles, Vibe system, Giscus, and copy buttons are progressive enhancements that degrade gracefully. No content is JS-gated. Static HTML + CSS delivers the reading experience. | Technical constraint (Next.js SSR); progressive enhancement best practice |
| 20 | How does the particle effect behave on touch devices? | Disable mouse-repulsion (no equivalent on touch). Particles float passively with gentle drift. Optional: single-tap creates a brief ripple repulsion at touch point. Reduce particle count by ~40% on mobile for performance. | Standard pattern for canvas effects on mobile; no hover equivalent exists |
| 22 | How does tag filtering work on /posts? | Client-side in-place filtering with URL query parameter sync (/posts?tag=ai). Clicking a tag on a post page navigates to /posts?tag=ai. This provides shareable URLs, avoids dead /tags/[tag] pages with sparse content, and feels fast. The /tags/[tag] route can be a simple redirect to /posts?tag=[tag]. | Best practice for small-to-medium content sites; avoids empty tag pages at launch |
| 25 | How does the RSS feed handle custom MDX components? | Strip or convert to plain HTML equivalents. Callout becomes a styled blockquote. CodeBlock becomes a `<pre><code>` block (no interactive features). YouTube becomes a link. Tweet becomes a blockquote with attribution link. Images use absolute URLs. Interactive components become static text with a "View on site" link. | Standard RSS practice; RSS readers do not execute JS or custom components |
| 27 | How will colour-blind users experience the Vibe system? | The accent colour is always paired with non-colour cues: underlines for links, shape for interactive elements, text labels for states. The Vibe system is decorative personalisation — it should never be the sole carrier of meaning. Presets that are perceptually similar for CVD users (Mint/Green/Cyan) are fine because the choice is aesthetic, not functional. | WCAG 1.4.1 (colour not sole information carrier); design principle |
| 29 | How do featured/pinned posts visually differentiate from recent? | Explicit "Featured" label/badge on featured post cards. Optionally larger card format or different layout (e.g., featured as a hero card, recent as a compact list). The distinction must be textual, not just visual weight. | Universal UX pattern for editorial curation |
| 30 | What metadata is visible on a post card at blog index level? | Three essentials on every card: title, date, reading time. Tags shown as compact pills (max 3 visible, see Q93). Excerpt shown only on featured cards. Full metadata (updated date, all tags) on the individual post page. | Standard dev blog pattern (Lee Robinson, Josh Comeau) |
| 31 | How does the Vibe drawer open and close? | Bottom sheet slide-up on mobile (thumb-reachable), popover expanding from the Vibe pill on desktop. Close via: backdrop click, Escape key, close button, or re-clicking the pill. Drawer contains presets + slider. Animation: 0.3s ease-out open, 0.2s ease-in close. | Standard mobile pattern (bottom sheet); brief already describes pill-based trigger |
| 32 | What immediate feedback confirms a Vibe change? | Instant site-wide colour transition (0.4s cubic-bezier as specified in brief). The transition itself is the confirmation — all accent-coloured elements update simultaneously. No toast or tooltip needed. Throttle rapid changes to prevent strobe effects (debounce at ~100ms). | Brief specifies the transition; the visual change IS the feedback |
| 34 | Is the blog post content area single centred column or sidebar ToC? | Asymmetric layout: centred prose column (740px max-width) with a sticky ToC in the right margin on desktop (visible only on post pages, only when viewport is wide enough ~1200px+). ToC does not compress the prose column. On narrower viewports, ToC moves to a collapsible element at the top of the post. | Industry standard for long-form dev blogs (Josh Comeau, Tailwind docs) |
| 35 | How does the Table of Contents behave? | Active section highlighting via IntersectionObserver. Smooth scroll on click. Sticky on desktop (in right margin). On mobile: collapsible disclosure at top of post, below metadata. Shows h2 and h3 levels. Keyboard navigable (tab to links). | Universal ToC pattern; IntersectionObserver is standard |
| 36 | What happens when a user visits a removed/renamed/draft URL? | Custom 404 page (already exists in codebase) showing: "Post not found" message, link to blog index, 3 recent posts, link to homepage. For renamed posts: maintain redirects in a config file (Next.js redirects in next.config.ts). Draft posts excluded at build time — URL returns 404, not a "draft" state. | Standard content site pattern; Next.js has built-in redirect support |
| 37 | How does Giscus handle loading, zero comments, and GitHub unreachable? | Lazy-load Giscus (IntersectionObserver trigger when comment section scrolls into view). Loading: skeleton placeholder with "Loading comments..." text. Zero comments: Giscus default empty state with "Be the first to comment" prompt. GitHub unreachable: hide comment section with "Comments temporarily unavailable" text. Non-GitHub users see "Comments require a GitHub account" note. | Standard Giscus implementation patterns |
| 38 | Visual treatment of "Updated" badge on revised posts? | Show "Updated [date]" inline next to the original date on individual post pages. Format: "Published Feb 1, 2026 / Updated Feb 15, 2026". On homepage and blog index: only show if updated within last 30 days, as a subtle badge. | Standard editorial pattern for living content |
| 39 | How does mobile layout handle the hero section? | Reduced particle count (~30-40 vs 60-100 desktop). Shorter hero height (50-60vh instead of full viewport). Particles still present but performance-budgeted. Disable mouse repulsion (see Q20). Add a subtle gradient fade at the bottom to transition into content. | Performance constraint; standard responsive canvas pattern |
| 40 | How does the site handle very long code blocks and wide lines? | Horizontal scroll for long lines (never wrap code). Code blocks break out of the prose column on mobile if needed. Very long blocks (>30 lines): show first ~20 lines with an "Expand" button. macOS chrome (dots, filename) always visible; copy button sticky to top-right during scroll within the block. | Standard dev blog pattern (Josh Comeau, Stripe docs) |
| 41 | What does the copy button do on success? | Icon change: clipboard icon transitions to checkmark icon for 2 seconds, then reverts. No toast, no tooltip — the icon change is sufficient and does not obstruct code. Copy strips line numbers, diff markers, and any decorative characters. | Industry standard (GitHub, VS Code pattern) |
| 42 | How do share buttons behave? | "Copy link": copies post URL to clipboard, shows checkmark confirmation (same pattern as code copy). Twitter: opens Twitter compose in new tab with pre-filled text (title + URL). On mobile: use Web Share API (navigator.share) if available, which shows native share sheet. Fallback to individual buttons. | Standard share pattern; Web Share API is the modern mobile standard |
| 43 | Interaction model for Vibe colour spectrum slider? | Horizontal hue track (0-360 degrees). Shows rainbow gradient. Thumb position sets hue. Real-time preview while dragging (CSS variable update on input event, not just on release). Touch-friendly: tall enough tap target (44px height), works with both pointer and touch events. | Brief describes "spectrum slider"; horizontal track is the standard slider pattern |
| 45 | How does the particle effect respond to scroll? | Particles are confined to the hero section. They do not scroll with content — the hero is a fixed-height section at the top. As the user scrolls past the hero, particles scroll away naturally (they are part of the hero's DOM, not position:fixed). Content flows below the hero cleanly. | Brief says "hero section background"; particles should not follow into content |
| 46 | What does the site look like on extremely wide monitors (2560px+)? | Prose column stays at 740px max-width, centred. Surrounding space is the dark background with the subtle scanline texture. No content stretching. The header/nav can extend wider (max ~1400px container). The hero section with particles is full-width. This is standard for content sites — the dark space is intentional. | Standard content site pattern; 740px prose width is specified in brief |
| 47 | Does the particle canvas extend edge-to-edge or respect content container? | Edge-to-edge across the full hero section width. Particles are a background atmospheric effect. They sit behind all text (z-index below content). Radial gradient mask fades edges as specified in the brief. | Brief specifies "fills the hero section background" with "edge fading" |
| 48 | Error/fallback for particle canvas if WebGL/Canvas unavailable? | The hero section renders normally without particles — just the dark background with the name, descriptor, and content below. No error message. The particles are a progressive enhancement. Check for canvas support before initialising; if unavailable, skip silently. | Progressive enhancement principle |
| 49 | Does the particle effect pause when tab is backgrounded? | Yes. Use document.visibilitychange event to pause/resume requestAnimationFrame. When tab is hidden, stop the animation loop entirely. Resume when tab becomes visible. This is standard practice — browsers already throttle rAF in background tabs, but explicitly pausing is cleaner. | Standard performance practice; browsers already throttle rAF |
| 51 | How should the site handle colour flash on page load? | Inject a blocking `<script>` in the `<head>` (before render) that reads localStorage and sets the CSS custom property immediately. This prevents any flash. The Vibe colour is applied before first paint. This is the same pattern used by dark/light mode toggles. | Standard pattern for localStorage-driven theming (same as dark mode flash prevention) |
| 53 | How does the "Now" page communicate freshness? | Prominent "Last updated: [date]" at the top of the page, directly below the heading, in the secondary text colour. Use relative + absolute format: "Last updated February 15, 2026 (7 days ago)". If older than 90 days, show a subtle note: "This page may be out of date." | Standard "Now" page convention (nownownow.com) |
| 57 | How do successful dev blogs handle cross-posting without diluting canonical? | Set canonical URL to xexr.com on all cross-posts (Substack and dev.to both support this). Add UTM parameters to links shared on social platforms. The original post on xexr.com is always the canonical source. Substack and dev.to are distribution channels, not primary homes. | Standard SEO practice; both platforms support canonical URLs |
| 61 | Required user-visible states for Vibe system? | Three states: (1) Default — no indicator needed, site shows mint. (2) Customised — the Vibe pill shows the current colour dot, which itself communicates "this is your choice." (3) Reset — returns to state 1. No explicit "you've customised this" badge needed; the colour dot in the pill IS the indicator. Keep it simple. | Design principle (the UI element itself communicates state) |
| 62 | Visual treatment of post hover animations on touch devices? | No hover states on touch. Use :focus-visible for keyboard users. On touch: tap feedback via subtle background colour shift (accent-dim). The accent underline animation does not play on touch — it is a hover-only enhancement. Tap immediately navigates. | Standard touch interaction pattern; hover is pointer-only |
| 63 | How does the post tag area behave with zero tags? | Conditionally render: if zero tags, the tag area does not render at all. No placeholder, no empty space. The layout collapses cleanly. Frontmatter schema should make tags required but allow an empty array; rendering logic checks array length. | Standard conditional rendering pattern |
| 65 | What does the 404 page offer? | Custom 404 with: "Page not found" heading, brief friendly message, link to homepage, link to blog index (/posts), 3 most recent post links. Maintain the site's dark aesthetic and branding. A 404 page already exists in the codebase — enhance it with these recovery paths. | Standard 404 best practice; codebase already has the page |
| 68 | Font loading strategy to prevent FOUT/CLS? | Use next/font for both Plus Jakarta Sans and JetBrains Mono. next/font automatically handles: self-hosting, preloading, font-display: swap with size-adjust fallbacks. This eliminates FOUT and minimises CLS. The tight letter-spacing (-1.5px) on headings is safe because next/font generates matched fallback metrics. | Technical constraint (next/font solves this); codebase already uses next/font pattern |
| 69 | How does the site handle forced-colour modes or Dark Reader? | Respect forced-colours media query: `@media (forced-colors: active)` — ensure text remains readable, borders are visible, and interactive elements are distinguishable. For Dark Reader: the site is already dark, so double-inversion is the risk. Add `<meta name="color-scheme" content="dark">` (already implied) and `<meta name="darkreader-lock">` to prevent Dark Reader from inverting the already-dark site. | Standard accessibility practice; meta tag prevents double-inversion |
| 72 | Will users expect consistent metadata quality on every post? | Yes. Enforce via frontmatter schema validation (Velite + Zod): title, date, and description are required fields. Reading time: auto-calculate from word count (assume 238 WPM for technical content, count code blocks at reduced weight). Tags: required field, allow empty array. Consistent metadata is a schema enforcement problem, not a design problem. | Technical enforcement via Velite/Zod schema; standard content site expectation |
| 73 | Does the Vibe system affect syntax highlighting? | No. Syntax highlighting colours (Shiki theme) are independent of the accent colour. The brief says accent colour is used for "string literals" only — this is one token type, not the full theme. Keywords, comments, types, operators, etc. keep their standard theme colours. This preserves code readability and developer expectations. | Brief specifies accent for strings only; standard syntax themes are independent |
| 76 | Do users expect the site to work offline (PWA)? | Not for MVP. A site.webmanifest exists in the codebase but service worker logic is not needed at launch. Offline support is a post-launch enhancement. Users do not universally expect offline for dev blogs. The manifest can stay for installability hints but active offline caching is out of scope. | Brief does not mention PWA; not industry standard for blogs |
| 82 | What if a user opens the Vibe drawer and scrolls? | On mobile (bottom sheet): the drawer blocks background scroll (scroll lock on body). Content behind is not scrollable while drawer is open. On desktop (popover): the drawer is positioned relative to the pill; scrolling dismisses it (or it scrolls away with the header). Standard modal/popover behaviour. | Standard modal/popover UX pattern |
| 83 | What if text selection is blocked by scanline overlay? | Set `pointer-events: none` on the scanline overlay. This is a CSS-only fix that makes the overlay purely visual. Text below is fully selectable. The overlay should also be `aria-hidden="true"` and use a `<div>` with no semantic meaning. | Technical constraint (CSS pointer-events: none solves this) |
| 84 | What if copied code includes hidden characters or formatting? | The copy function extracts the raw text content of the code block, stripping: line numbers, diff markers (+/-), highlight markers, terminal chrome characters, and any HTML. Use `textContent` or a dedicated extraction function, not `innerHTML`. Test with paste into a plain text editor. | Standard implementation practice for code copy buttons |
| 85 | What if user changes font size or browser zoom to 200%? | Use rem units for all sizing (not px). Tailwind defaults to rem. Test at 200% zoom: nav should remain functional (hamburger menu triggers at narrower breakpoints), code blocks scroll horizontally, content reflows within the 740px max-width. The tight letter-spacing (-1.5px) should use em units so it scales proportionally. | WCAG 1.4.4 requirement (resize to 200%); use relative units |
| 86 | Are red/yellow/green dots on code blocks conveying info solely through colour? | They are purely decorative (mimicking macOS window chrome). They do not convey functional information. Add `aria-hidden="true"` to the dots container. No alt text needed. Colour-blind users missing the distinction is irrelevant because the dots carry no meaning. | Technical assessment — the dots are decorative |
| 87 | Are blog post images accompanied by meaningful alt text? | Enforce alt text via the MDX Image component: make `alt` a required prop. Add an ESLint rule (eslint-plugin-jsx-a11y) that flags missing alt text. Provide authoring guidance in a content style guide. For decorative images, explicitly allow `alt=""`. | Standard accessibility enforcement; tooling can automate |
| 88 | Is JetBrains Mono readable at small sizes for nav links and tags? | Yes, JetBrains Mono is designed for screen readability at small sizes (its primary use case is IDE code at 12-14px). Ensure minimum 12px rendered size for UI text. JetBrains Mono at 13-14px for nav/tags is well within its design intent. | Font design specifications (JetBrains Mono is optimised for screen readability) |
| 89 | How will the site perform for assistive tech when Vibe colour changes? | Colour changes via CSS custom properties do not trigger DOM mutations, so screen readers will not announce them. No ARIA live region needed for colour changes. The Vibe slider itself needs an ARIA label ("Accent colour") and value announcement. The change is visual-only by nature. | Technical constraint (CSS variable changes are silent to AT) |
| 90 | Is content structured with proper heading hierarchy? | Enforce via: (1) ESLint/remark plugin that flags skipped heading levels in MDX. (2) Post template sets h1 as the title; authors start MDX content at h2. (3) Documentation in content style guide. (4) Build-time validation via rehype plugin if desired. | Standard authoring practice; enforceable via linting |
| 91 | Are link purposes distinguishable without relying solely on colour? | Yes. Body text links should have underlines (text-decoration: underline) as the primary affordance. The accent colour is a secondary signal. This is a WCAG 1.4.1 requirement. Nav links are distinguishable by position/context. The underline can be subtle (underline-offset, accent-coloured) but must be present. | WCAG 1.4.1 requirement; universal link convention |
| 93 | Maximum number of tags shown per post card before truncation? | Show up to 3 tags on post cards. If more than 3, show 3 + "+N more" indicator. Full tag list visible on the individual post page. This prevents card layout disruption while still providing useful categorisation. | Common UI pattern for tag truncation |
| 95 | Is RSS feed discovery surfaced in the UI? | Yes. Show an RSS icon in the footer alongside social links (GitHub, Twitter). Also include the standard `<link rel="alternate" type="application/rss+xml">` in the HTML head for auto-discovery. Developer audiences actively look for RSS — making it footer-visible respects that expectation. | Standard dev blog practice; developer audience expects visible RSS |
| 99 | How do Callout components visually distinguish from each other and prose? | Each type gets a distinct left border colour + icon: Info (accent colour, info icon), Warning (amber/yellow, warning icon), Tip (green, lightbulb icon). Background slightly elevated from page background. Border-left 3-4px solid. Always include text label ("Info", "Warning", "Tip") for non-colour distinction. | Standard callout pattern (Docusaurus, Nextra, Stripe docs) |
| 100 | Aside/margin note pattern on desktop vs mobile? | Desktop: positioned in the right margin (alongside ToC area or opposite side). Mobile: inline with prose, styled as an indented block with a subtle left border or different background — similar to a blockquote but visually distinct. Collapsible toggle is unnecessary complexity for MVP. | Standard margin note responsive pattern (Tufte CSS, Josh Comeau) |
| 101 | How does monospace "xexr" branding balance with accent-coloured square icon? | The brief specifies: accent-coloured square icon with "x" + monospace "xexr" text. The icon and text are a single unit. Icon size matches the text cap-height. Small gap (8px) between icon and text. The accent colour on the icon provides the brand colour hit; the text is off-white. This is already well-defined in the brief. | Brief specifies the design; implementation follows spec |
| 102 | What does a code block look like before Shiki highlighting loads? | Show a pre-styled `<pre><code>` block with the code block's background colour and monospace font, but without syntax colours. This is the SSR output — Shiki should run at build time (not client-side), so there is no "loading" state. With rehype-pretty-code + Velite, highlighting happens during the build. | Technical constraint (Shiki runs at build time with rehype-pretty-code, not client-side) |
| 103 | Loading/skeleton state for pages with async data? | Most pages are static (SSG via Velite). No runtime data fetching for posts, bookshelf, or projects — all content is build-time. If any dynamic elements exist (Giscus, future search), use skeleton loaders matching the component shape. The dark theme makes subtle animated pulse skeletons effective. | Technical constraint (static site — most pages have no async loading) |
| 106 | Interaction model for previous/next post navigation? | Show at the bottom of each post, below comments CTA, above footer. Display: post title + date for each direction. Arrow icons for visual direction. Full-width clickable areas. This is a secondary navigation aid — the primary post-reading action is defined in Q18. | Standard blog pattern (every major blog engine includes this) |
| 107 | How does the user distinguish internal vs external links? | External links: open in new tab (target="_blank" with rel="noopener noreferrer") and show a small external link icon (arrow-up-right) after the link text. Internal links: navigate within the site, no icon. This is a standard convention that developer audiences expect. | Standard web convention; developer audience expectation |
| 108 | Does the user feel lost in deep navigation hierarchies? | The site is shallow (max 2 levels: /posts/[slug], /tags/[tag]). Breadcrumbs are not needed at this depth. Each page has the global header/nav for orientation. Post pages show a "Back to posts" link. The site is not deep enough to require breadcrumbs. | Codebase context (site is max 2 levels deep) |
| 114 | Are date formats consistent and clear for global audiences? | Use absolute dates in ISO-friendly format: "22 Feb 2026" (unambiguous day-month-year, avoiding US/UK confusion). No relative dates on post metadata (they become stale). Relative format only for the Now page's "last updated" field where recency matters. Use `<time datetime="...">` for machine readability. | Best practice for international audience; ISO format avoids ambiguity |
| 119 | Vibe system technical implementation? | CSS custom property swap only. Set `--accent` (and derived `--accent-dim`, `--accent-soft`, `--accent-glow`) on `<html>`. All accent-coloured elements reference these variables. The particle canvas reads the current accent colour and updates particle/line colours. No full re-render needed. The transition property on elements handles the visual animation. | Brief describes CSS variable approach; technically optimal |
| 120 | Vibe colour transition timing? | 0.4s cubic-bezier(0.4, 0, 0.2, 1) for preset clicks and slider release. During slider drag: instant (no transition) for real-time preview. Hover transitions on other elements (links, tags): their own timing (0.2-0.3s) — the Vibe transition applies to the variable itself, elements inherit their own transition speeds. | Brief specifies 0.4s cubic-bezier; drag needs instant feedback |
| 121 | Does Vibe need to sync across tabs? | Yes, implement via StorageEvent listener. When localStorage changes in another tab, read the new value and update the CSS variable. This is ~5 lines of code and prevents user confusion when they have multiple tabs open. | Trivial to implement; prevents obvious inconsistency |
| 122 | How to prevent FOUT and CLS from custom font loading? | Use next/font for Plus Jakarta Sans and JetBrains Mono. next/font automatically: self-hosts fonts, generates size-adjusted fallbacks, sets font-display: swap, preloads the font files. This is the standard Next.js solution and the codebase already uses the pattern (Geist fonts). | Technical constraint (next/font); codebase already uses this pattern |
| 123 | Is the image optimisation pipeline robust for raw high-res images? | Yes. Next.js `<Image>` component + sharp (already in dependencies) handles automatic resizing, format conversion (WebP/AVIF), and quality optimisation. Authors drop images into the content directory; the build pipeline handles optimisation. No manual step needed. | Technical constraint (Next.js Image + sharp already in stack) |
| 124 | Are we generating proper JSON-LD structured data? | The root layout already includes JSON-LD schema. Extend it: Person schema on About page, BlogPosting schema on individual posts (title, datePublished, author, description, image), BreadcrumbList on post pages. WebSite schema on homepage. Implement as server-side rendered `<script type="application/ld+json">`. | Codebase context (JSON-LD already in root layout); standard SEO practice |
| 125 | Does generating OG images on the fly slow down social crawlers? | Vercel OG (Satori) generates images at edge runtime — response time is typically 50-200ms, well within social crawler timeout thresholds (5-10s). The image is cached after first generation. This is Vercel's recommended approach and handles scale well. Not a concern. | Technical assessment (Vercel OG is designed for this use case) |
| 127 | Where do images for a specific post live? | Co-located with MDX content: `/content/posts/my-post/` contains both `index.mdx` and its images. This reduces context switching when authoring and keeps related files together. Next.js Image component can reference these via relative imports. Build pipeline handles path resolution. | Best practice for content-heavy sites; reduces authoring friction |
| 128 | How do we audit for dead links and broken images? | Add a link-checking step to CI: use a tool like `lychee` or `broken-link-checker` in GitHub Actions. Run on every PR that modifies content. For internal links, Next.js typed routes (already enabled) catch broken internal routes at compile time. | Standard CI practice; Next.js typed routes already help |
| 129 | Can draft posts be accidentally guessed via URL? | No, if implemented correctly. Velite/build pipeline filters `draft: true` posts from the production build entirely. The page is never generated — there is no static file to serve. The URL returns 404. This is build-time exclusion, not client-side filtering. | Technical constraint (SSG excludes drafts at build time) |
| 130 | Are we hardcoding strings that will make i18n painful later? | The brief explicitly says "Don't build i18n yet." However, use a constants file for repeated UI strings (button labels, section headings) rather than inline strings. This is good practice regardless of i18n intent. Centralised strings are easier to change. Non-ASCII slugs should be handled by encodeURIComponent. | Brief says no i18n; centralised strings is just good practice |
| 131 | How does Giscus handle spam? | Giscus inherits GitHub Discussions' moderation: GitHub accounts required (barrier to drive-by spam), repo owner can lock/delete discussions, GitHub's existing abuse detection applies. For a personal dev blog, this is sufficient. Monitor the Discussions tab periodically. | Technical constraint (Giscus inherits GitHub's moderation) |
| 132 | How does the site handle very long post titles? | CSS: clamp title font size or allow wrapping. OG image generation: truncate with ellipsis after ~80 characters or reduce font size dynamically (Satori supports this). Post page: titles wrap naturally. Code backticks in titles render as inline code. Test with 100+ character titles during development. | Standard responsive typography practice |
| 133 | What happens to particle effect during page navigation? | With Next.js App Router, the root layout persists across navigations. If the particle canvas is in the hero (homepage only), it unmounts when navigating away and remounts on return. If desired, place it in the root layout with conditional visibility — but for MVP, reinitialisation on homepage return is acceptable and simpler. | Technical constraint (App Router layout persistence); simpler approach for MVP |
| 134 | How does the site behave during Vercel deployment? | Vercel provides zero-downtime deployments via immutable deployment URLs. The site seamlessly switches to the new version. No user-visible transition. This is handled entirely by the platform. | Technical constraint (Vercel handles this automatically) |
| 141 | Should the footer be sticky on short pages? | Yes. Use a min-height: 100vh on the main content wrapper with flexbox (flex-grow on the content area). This pushes the footer to the bottom of the viewport on short pages without making it position:fixed. The codebase layout already uses flex — just ensure the content area has flex-grow: 1. | Standard CSS layout pattern; codebase already uses flex layout |
| 50 | What is the transition between pages? | Use Next.js App Router's built-in navigation (no page transitions for MVP). The framework handles client-side navigation with prefetching. Adding custom page transitions is complexity without proportional value for launch. The "alive" feel comes from the Vibe system and particles, not page transitions. Add later if desired. | Pragmatic MVP scope; Next.js handles navigation smoothly by default |
| 59 | What Lighthouse scores are acceptable for launch? | Target 90+ for launch (not 95+ as brief aspirationally states). The particle canvas and custom fonts will impact Performance and LCP. Focus on: Performance 90+, Accessibility 100, Best Practices 100, SEO 100. Optimise Performance toward 95+ post-launch once core content is stable. | Technical constraint (canvas + custom fonts impact scores); pragmatic launch target |
| 71 | Will users assume "Recent posts" means actively maintained? | Yes. Label it "Latest" instead of "Recent" to reduce the implicit promise. Alternatively, show actual dates prominently so users judge freshness themselves. With n=1 post at launch, consider not labelling the section at all — just show the post(s). | Design principle; solved by prominent dates and careful labelling |
| 77 | Will users expect Cmd+K search from day one? | No, not for MVP. The brief explicitly lists search as "Add shortly after" and "optional." With <10 posts, search adds no value. Add Pagefind or similar when content volume warrants it (10+ posts). Users can use browser Ctrl+F in the meantime. | Brief explicitly defers search; not needed at low content volume |
| 80 | What happens when a user shares a post link — OG image quality? | OG images should include: post title (large, readable), site branding (xexr logo/name), accent colour (default mint, not user's Vibe — OG images are static). Dark background matching the site. Date optional. The brief specifies @vercel/og for auto-generation. Test dark OG images on light platform backgrounds (LinkedIn, iMessage). | Brief specifies @vercel/og; standard OG image best practice |
| 84 | Code copy stripping hidden characters? | (Duplicate of earlier Q84 answer — copy function uses textContent extraction, stripping all HTML, decorative elements, line numbers, and diff markers.) | Standard implementation practice |
| 97 | How does the avatar conic gradient ring scale? | The gradient ring is CSS (conic-gradient border or pseudo-element). It scales naturally with the avatar size at each context: large in hero/about (120-160px), medium in footer (48-64px), small if used elsewhere. The gradient is percentage-based, so it scales without breakage. OG images: render the ring via Satori's CSS subset. Static ring, not rotating (brief says "static conic gradient ring"). | Brief specifies "static conic gradient ring"; CSS scales naturally |
| 104 | Visual transition from hero section to content area? | Gradient fade at the bottom of the hero section (the brief mentions "edge fading" for particles). The particle radial mask creates the transition. Below the hero, content begins with generous top padding. The shift from immersive (particles, large type) to reading mode (prose column) should feel like settling into focus. No hard line or divider. | Brief describes "radial gradient mask" for edge fading |
| 109 | Should images in posts open in a lightbox on click? | Not for MVP. Standard blog images display inline at content width. For technical diagrams that need zoom, authors can link to the full-size image (opens in new tab). Add a lightbox component later when there is actual content that demands it. This is "Add shortly after" scope. | MVP scope constraint; add when content demands it |
| 110 | Should comments be expanded or collapsed by default? | Lazy-loaded but expanded when visible. Giscus loads when the user scrolls to the comment section (IntersectionObserver). Once loaded, comments are immediately visible — no additional click to expand. This balances page performance (lazy load) with community visibility (no extra click). | Standard Giscus implementation; balances performance and visibility |
| 113 | How do mobile users navigate from reading to exploring? | Mobile hamburger menu is always accessible from the header. After finishing a post, the prev/next navigation and subscribe CTA provide next steps. A "Back to all posts" link at the top of the post provides escape. The footer (always at bottom) provides full navigation. Standard mobile navigation patterns handle this. | Standard mobile navigation; multiple navigation touchpoints exist |
| 118 | Does file-based MDX serve the publishing frequency goal? | Yes. For a solo dev blog publishing 1-4 times per month, git-commit-to-publish is appropriate. The workflow: write MDX in editor, commit, push, Vercel auto-deploys. "Idea to published" is ~2 minutes of git operations. A CMS adds complexity without proportional value at this publishing frequency. The brief explicitly says "No CMS to start." | Brief explicitly says no CMS; git workflow is appropriate for solo publishing |
| 126 | How tied is content to Next.js/React components? | Moderately, by design. MDX files are Markdown + JSX. Standard Markdown portions are portable. Custom components (Callout, CodeBlock) would need reimplementation on a new platform but the content structure (frontmatter + body) is universal. To mitigate: keep custom component usage to genuine enhancements, not structural content. The brief accepts this trade-off. | Technical assessment; trade-off is acknowledged and acceptable |
| 136 | How should sponsored relationships be disclosed? | Add a standard disclosure policy: any sponsored content or affiliate links will be clearly labelled at the top of the post. For now, no sponsored content exists, so no implementation needed. Decide the policy in principle: "I will disclose all material relationships." Implementation when relevant. | Standard editorial practice; no implementation needed at launch |
| 138 | How should sensitive claims about employers/clients be framed? | Standard editorial guardrails: no naming specific employers/clients without permission, focus on lessons learned rather than criticising entities, frame experiences constructively. This is a content policy decision, not a technical one — but the answer is universal professional best practice. | Universal professional practice |
| 142 | Should project cards and post cards share visual language? | Share the foundational visual language (dark card background, accent-hover, consistent spacing/typography) but differentiate by content: post cards emphasise date + reading time + tags; project cards emphasise status badge + tech stack + external link. Same card component with different content slots. The codebase already has a Card component family to build on. | Design principle (consistent system, contextual content); codebase has Card components |

---

## Branch Points (Human Decision Required)

| # | Question | Why Human Needed |
|---|----------|------------------|
| 4 | Who is excluded by dark-only design — is that acceptable? | Brand identity decision. Dark-only is a deliberate aesthetic choice that excludes some users (astigmatism, bright environments). Only the site owner can decide if this trade-off aligns with their values and audience. The brief says "commit to dark" but the human should consciously affirm this knowing the exclusions. |
| 5 | What is the primary CTA on the homepage: read, explore, or subscribe? | Content strategy decision with real trade-offs. "Read a featured post" optimises for engagement. "Explore projects" optimises for credibility. "Subscribe" optimises for retention. Each shapes the homepage design differently. |
| 6 | How does a user subscribe without being redirected to Substack? | Business/platform decision. Options: (a) embed Substack form on-site, (b) keep redirect but improve the CTA copy, (c) use a different email service (Buttondown, ConvertKit) with an API. Each has cost/complexity/ownership trade-offs the human must evaluate. |
| 7 | Should placeholder pages ship before content exists or be hidden? | Content strategy decision. Shipping empty pages signals ambition but risks looking abandoned. Hiding them means fewer nav items but features appear "suddenly." The human knows their content timeline and how they want to present incomplete work. |
| 8 | Is the post page the actual primary design focus given social traffic? | Design priority decision. If yes, invest more design effort in post page polish. If the human wants the homepage to be the statement piece, that shifts priority. Both are valid — depends on what impression matters most to the owner. |
| 9 | Is the MVP scope achievable in the stated timeline (~1 week)? | Project management decision. The scope is ambitious for one week. The human must decide: (a) extend timeline, (b) cut features from MVP, or (c) accept lower polish. Only they know their availability and acceptable quality bar. |
| 10 | Who is the primary target audience: developers, clients, or indie hackers? | Foundational strategy decision. This cascades into content tone, information architecture, what pages matter most, and what success looks like. Multiple valid answers exist. Only the site owner knows who they most want to reach. |
| 17 | What is the step-by-step flow for a first-time visitor from social media? | Depends on Q8 and Q10. Once those are answered, the flow can be specified. But the human needs to confirm: should a social visitor see "subscribe" immediately, or "explore more posts," or "learn who I am"? |
| 18 | What is the single primary next action after finishing a post? | Content strategy decision. Options: (a) next post, (b) subscribe CTA, (c) related posts, (d) comment. The priority depends on whether the human values retention (subscribe), engagement (comments), or depth (more reading). |
| 19 | How do users discover the Vibe system for the first time? | Brand/product decision. Options: (a) subtle — let users find it organically (the pill is there, no hand-holding), (b) gentle — first-visit tooltip or pulse animation, (c) prominent — onboarding callout. Each sets a different tone for how "precious" the feature feels. |
| 21 | What is the empty state for homepage with n=1 posts? | Design decision dependent on Q7. Options: (a) show the single post without section labels, (b) show "Featured" with 1 post and hide "Recent," (c) combine into a single "Latest" section. The human needs to decide how sparse is acceptable at launch. |
| 23 | What is "digital home" vs blog vs portfolio — how does this shape IA? | Foundational identity decision. This is the single highest-cascade question. The answer shapes navigation, page priority, tone, and content strategy. The human must commit to a primary identity even if the site serves multiple purposes. |
| 24 | What is the relationship between "xexr" brand and "Dane Poyzer" person? | Brand identity decision. Is xexr a pseudonym, a business, or a creative handle? Do visitors address the author as "xexr" or "Dane"? This affects the About page, bylines, and how personal vs professional the site reads. Only the owner can clarify this. |
| 26 | What publishing cadence is sustainable and what signals failure? | Personal commitment question. Only the human knows their realistic availability. Setting an explicit target (monthly? quarterly?) creates accountability. The answer also determines whether "Recent posts" labelling makes sense. |
| 28 | How does navigation handle 9 pages without overwhelming the header? | Information architecture decision dependent on Q23. Options: (a) all in header (crowded), (b) primary 4-5 in header + rest in footer, (c) grouped dropdown ("More" menu). The human must decide which pages are "primary" navigation vs secondary. Depends on identity decision. |
| 33 | Does the homepage hero occupy full viewport or allow content peek? | Design feel decision. Full viewport: dramatic, immersive, statement. Partial: practical, content-forward, inviting scroll. This is a taste question — both are valid, and the human's aesthetic preference matters. |
| 44 | Where does the Vibe button live — header, floating bar, or footer? | UX placement decision. Header: always visible but adds nav complexity. Floating status bar: distinctive but non-standard. Footer: low discoverability. The brief mentions "status bar" but this is not a standard component. The human needs to decide how prominent the Vibe feature should be. |
| 52 | How should the About page lead — narrative or quick-scan facts? | Personal branding decision. Narrative-first: for readers who want to connect personally. Facts-first: for recruiters/collaborators who want quick assessment. The human knows their priority audience for this page. |
| 54 | Where does the subscribe CTA live? | Marketing aggressiveness decision. Options: (a) footer only (subtle), (b) inline after posts (contextual), (c) sticky banner (aggressive), (d) combination. The human's comfort level with promotion determines the answer. |
| 55 | What problem does the Vibe system solve for readers? | Product vision question. Is Vibe: (a) a retention/engagement mechanism, (b) a brand differentiator that signals craft, (c) a technical showcase, or (d) pure fun? The answer determines how much to invest in analytics, onboarding, and iteration. Only the creator knows the intent. |
| 56 | What does "building in public" mean operationally? | Personal definition question. The term means different things: open analytics, public roadmaps, commit streams, process blogging. The human must define what they will actually do, not just the label. |
| 58 | What does "shipped" mean for MVP? | Definition of done. Is it: (a) deployed on Vercel, (b) linked from social profiles, (c) submitted to Google Search Console, (d) shared publicly, (e) first post published? Each is a different level. The human must commit to a specific milestone. |
| 60 | How will design success be evaluated concretely? | Success criteria question. "Premium dev tool feel" is subjective. The human must decide: peer feedback? Comparison to inspiration sites? Specific Lighthouse scores? User testing? Without criteria, "done" is undefined. |
| 64 | How should navigation prioritise content types vs personal context? | Identity-dependent (cascades from Q23). If blog-first: Posts prominent, personal pages secondary. If portfolio-first: Projects prominent. If digital home: balanced. The human must declare the primary navigation emphasis. |
| 66 | How should content staleness be handled across evergreen pages? | Content commitment decision. Options: (a) show "last updated" dates prominently (honest but exposes gaps), (b) no dates on evergreen pages (hides staleness but reduces trust), (c) automated reminders to update. The human must decide their transparency level about maintenance. |
| 67 | Is the content strategy search-driven (SEO) or audience-driven (social/newsletter)? | Distribution strategy decision. SEO: write tutorials solving search queries. Social: write opinion/narrative pieces for sharing. Newsletter: write serialised content for subscribers. The human's growth model determines what to write. |
| 70 | What is the flow between About, Uses, Now, and Colophon? | IA decision dependent on Q23 and Q28. Should these be: (a) independent top-level pages, (b) grouped under an "About" section with sub-navigation, (c) tabs on a single page? The grouping affects navigation count (Q28) and discoverability. |
| 74 | Will users expect the Now page to be historically archived? | Content philosophy question. Archiving: adds value but creates maintenance burden. Ephemeral: truer to the "Now" concept but content is lost. The human must decide if past Now snapshots have lasting value. |
| 75 | Will users expect Bookshelf to link to purchase/review pages? | Affiliate/recommendation decision. Linking to Amazon implies endorsement and could include affiliate links (revenue vs authenticity trade-off). Linking to Goodreads is neutral. No links reduces utility. The human's stance on monetisation and recommendation matters. |
| 78 | How does a recruiter or collaborator experience the site? | Audience prioritisation dependent on Q10. If recruiters are a target audience, the About and Projects pages need concrete accomplishments, tech stack clarity, and professional signals. If not a priority, a more casual tone is fine. The human must decide how much to optimise for this audience. |
| 79 | How does a returning reader check for new content? | Feature scope decision. Options: (a) RSS is sufficient (most devs use readers), (b) add "New" badges with localStorage tracking (engineering effort), (c) rely on newsletter for return visit prompts. The human must decide if in-site new-content signals are worth the implementation cost. |
| 81 | Can users share a specific Vibe configuration? | Feature scope decision. Shareable Vibes (?vibe=ff6600) is a delightful feature but adds complexity. URL parameter needs to override localStorage temporarily. The human must decide if this social sharing angle is worth the engineering time for MVP or post-MVP. |
| 92 | How should the one-line descriptor be rendered — static or typed animation? | Aesthetic taste decision. Typed animation: feels "alive" (aligns with brief's language) but adds JS complexity and accessibility concerns. Static: simpler, faster, accessible by default. The human's taste determines this. |
| 94 | Should the Colophon include performance stats? | Maintenance commitment question. Performance stats (Lighthouse scores) create an obligation to keep them current. The human must decide: are they willing to update these when scores change, or is it better to omit them? |
| 96 | Does the Projects page use grid or stacked list layout? | Design preference with trade-offs. Grid: showcases more projects, requires consistent card heights, needs a minimum of 2-3 to look good. List: allows variable detail, works well with n=1. The human knows their expected project count and detail level. |
| 98 | What is the visual rhythm/density of the blog index? | Aesthetic preference. Compact (like HN/chrisgregori.dev): efficient scanning, many posts visible. Editorial (like Josh Comeau): luxurious spacing, each post feels important. The human's desired feel determines this. |
| 105 | How should hover effects communicate structure? | Design philosophy question. Minimal (just affordance): clean, functional. Expressive (grouping, relationship): richer but more complex. The human's taste and ambition level determine this. |
| 111 | Flow for evaluating credibility quickly? | Dependent on Q10 and Q78. If credibility evaluation is a priority, the About > Projects > Posts flow needs deliberate design. If the site is primarily for peers who already know the author, less emphasis is needed. |
| 112 | Intended flow from Projects to Posts (or reverse)? | Content cross-linking decision. Options: (a) explicit links ("Read about building this" on project cards), (b) tag-based discovery (project and related posts share tags), (c) no explicit connection. The human's content strategy determines this. |
| 115 | What does "indie hacker" mean in Dane's specific context? | Personal definition. The term spans side-project hobbyist to funded solo founder. The human must define what it means for them specifically so the site content is consistent. |
| 116 | What does "AI orchestration" mean to the expected readership? | Content scoping decision. Beginner tutorials vs advanced patterns vs philosophical takes. The human must scope this term for their audience so readers know what to expect. |
| 117 | What is the relationship between xexr.com and products (dypt, makeacraft)? | Brand architecture decision. Options: (a) xexr.com is the personal hub, products are separate entities, (b) xexr.com is a content marketing engine for the products, (c) products are portfolio items. The human must decide the relationship. |
| 135 | What should happen during low-output life phases? | Personal content strategy. Options: (a) pre-write buffer posts for dry spells, (b) accept silence gracefully (the Now page explains), (c) lower the bar (short posts, links, quotes). Only the human knows their life rhythm and comfort with public silence. |
| 137 | What content boundaries apply around family mentions? | Privacy decision. The brief mentions "dad life" content. The human must decide how much family content is appropriate, knowing that once published and indexed, it is difficult to retract. This is deeply personal. |
| 139 | What is the policy for controversial AI topics? | Editorial policy decision. The AI space is polarised. The human must decide: (a) take strong positions (authentic but potentially polarising), (b) focus on technical facts only, (c) acknowledge controversy without taking sides. Their professional reputation is at stake. |
| 140 | How should failed or abandoned projects be represented? | Personal branding decision. Options: (a) show all projects with honest status labels (authentic, "building in public"), (b) only show active/successful projects (curated), (c) frame abandoned projects as learning experiences (narrative). The human's comfort with public failure determines this. |

---

## Question Dependencies

### Tier 1: Foundational Decisions (cascade to many questions)

**Q23 (Identity: digital home vs blog vs portfolio)** unlocks:
- Q28 (navigation structure) — if blog-first, Posts is primary nav; if portfolio-first, Projects is primary
- Q64 (nav priority) — directly dependent on identity
- Q70 (flow between personal pages) — grouping depends on identity
- Q5 (homepage CTA) — blog-first favours "read"; portfolio-first favours "explore"
- Q21 (empty states) — how sparse content is handled depends on site identity

**Q10 (Primary target audience)** unlocks:
- Q52 (About page structure) — devs want narrative; recruiters want facts
- Q67 (content strategy: SEO vs social) — developers favour search; indie hackers favour social
- Q78 (recruiter experience) — only matters if recruiters are a target
- Q111 (credibility flow) — importance depends on audience
- Q115 (indie hacker definition) — scope depends on audience
- Q116 (AI orchestration definition) — depth depends on audience
- Q98 (blog density) — technical audience may prefer compact; general audience prefers editorial

**Q24 (xexr vs Dane Poyzer relationship)** unlocks:
- Q117 (xexr.com vs products relationship) — brand architecture depends on identity clarity

### Tier 2: Strategic Decisions (cascade to some questions)

**Q5 (Homepage primary CTA)** unlocks:
- Q33 (hero height) — if CTA is "read," content should peek; if immersive experience, full viewport
- Q17 (first-time visitor flow) — the primary CTA shapes the funnel

**Q7 (Ship placeholder pages or hide?)** unlocks:
- Q21 (empty states) — if pages are hidden, empty state design is moot for those pages
- Q28 (navigation count) — hiding pages reduces nav items

**Q9 (MVP scope vs timeline)** unlocks:
- Q58 (definition of shipped) — timeline determines what "done" means
- Q59 (Lighthouse targets) — auto-answered as 90+ (pragmatic), but human confirms if they want to push harder

**Q18 (Primary post-reading action)** unlocks:
- Q54 (subscribe CTA placement) — if subscribe is the primary action, it gets prime placement
- Q110 (comments expanded/collapsed) — auto-answered but priority relative to other post-end elements

**Q55 (Vibe system purpose)** unlocks:
- Q19 (Vibe discoverability) — if brand differentiator, needs more discoverability; if just fun, subtle is fine
- Q81 (shareable Vibe) — if social engagement tool, sharing is important; if personal customisation, not needed

**Q67 (SEO vs social content strategy)** unlocks:
- Q57 (cross-posting) — auto-answered for mechanics, but priority depends on distribution channel choice
- Q26 (publishing cadence) — SEO demands more regular cadence than social

### Tier 3: Conditional Dependencies

- **If Q4 is "yes, dark-only acceptable"** → Q69 (forced-colour modes) is auto-answered (respect forced-colours, add Dark Reader meta lock)
- **If Q7 is "hide until populated"** → Q66 (staleness handling) is less critical for launch
- **If Q10 includes "recruiters"** → Q78 becomes high priority, Q52 leans toward facts-first
- **If Q23 is "blog-first"** → Q96 (Projects layout) is deprioritised, Q8 answer is "yes, post page is primary"
- **If Q26 answers a specific cadence** → Q71 (stale content assumptions) is auto-answered by prominent dates
- **If Q55 is "brand differentiator"** → Q19 needs active discoverability, Q81 becomes higher priority
- **If Q56 defines "building in public" to include open analytics** → Colophon page scope expands
- **If Q58 is "deployed + first post live"** → Q9 timeline assessment changes (smaller scope = more feasible)

---

## Interview Plan

### Round 1: Core Mental Model (~8 questions)

These are the highest-cascade questions. Their answers unlock the most downstream decisions.

1. **Q23** — What is "digital home" vs blog vs portfolio? How does this identity shape IA?
   *Unlocks: Q28, Q64, Q70, Q5, Q21*

2. **Q10** — Who is the primary target audience: developers, clients/employers, or indie hackers?
   *Unlocks: Q52, Q67, Q78, Q111, Q115, Q116, Q98*

3. **Q24** — What is the relationship between "xexr" brand and "Dane Poyzer" person?
   *Unlocks: Q117*

4. **Q5** — What is the primary CTA on the homepage: read, explore, or subscribe?
   *Unlocks: Q33, Q17*

5. **Q18** — After reading a post, what is the single primary next action?
   *Unlocks: Q54*

6. **Q55** — What problem does the Vibe system solve for readers — retention, brand, engagement, or fun?
   *Unlocks: Q19, Q81*

7. **Q9** — Is the MVP scope achievable in ~1 week, and what is the acceptable trade-off?
   *Unlocks: Q58*

8. **Q67** — Is the content strategy search-driven (SEO/tutorials) or audience-driven (social/newsletter)?
   *Unlocks: Q26, Q57*

### Round 2: Cascaded Confirmations (~15 questions)

Present inferred answers from Round 1, ask human to confirm or override.

9. **Q8** — Is the post page the primary design focus? *(Likely "yes" if blog-first identity from Q23)*
10. **Q28** — Navigation grouping: which pages are primary vs secondary? *(Depends on Q23 identity)*
11. **Q64** — Navigation priority: content types vs personal context? *(Cascades from Q23)*
12. **Q7** — Ship placeholder pages or hide? *(Informed by Q9 timeline and Q23 identity)*
13. **Q21** — Empty state approach for n=1 posts? *(Depends on Q7 and Q23)*
14. **Q33** — Hero: full viewport or content peek? *(Depends on Q5 CTA priority)*
15. **Q17** — First-time social visitor flow? *(Now deterministic from Q5, Q8, Q10)*
16. **Q54** — Subscribe CTA placement? *(Depends on Q18 and comfort with promotion)*
17. **Q19** — Vibe discoverability approach? *(Depends on Q55 purpose)*
18. **Q52** — About page: narrative or facts-first? *(Depends on Q10 audience)*
19. **Q58** — Definition of "shipped"? *(Depends on Q9 scope decision)*
20. **Q26** — What publishing cadence is sustainable? *(Depends on Q67 strategy)*
21. **Q70** — Flow between About/Uses/Now/Colophon? *(Depends on Q28 nav structure)*
22. **Q44** — Where does the Vibe button live? *(Depends on Q55 prominence decision)*
23. **Q60** — How will design success be evaluated? *(Depends on Q10 audience and Q23 identity)*

### Round 3: Standalone Branch Points (~22 questions)

Independent questions that do not cascade. Can be asked in any order, grouped by theme.

**Identity & Brand:**
24. **Q4** — Dark-only exclusion trade-off acceptable?
25. **Q56** — What does "building in public" mean operationally?
26. **Q115** — What does "indie hacker" mean in your context?
27. **Q116** — What does "AI orchestration" mean to your readership?
28. **Q117** — Relationship between xexr.com and products (dypt, makeacraft)?

**Content Policy:**
29. **Q135** — Strategy for low-output life phases?
30. **Q137** — Content boundaries around family mentions?
31. **Q139** — Policy for controversial AI topics?
32. **Q140** — How should failed/abandoned projects be represented?
33. **Q66** — Staleness handling across evergreen pages?

**Design Preferences:**
34. **Q92** — One-line descriptor: static text or typed animation?
35. **Q96** — Projects page: grid or stacked list?
36. **Q98** — Blog index visual density: compact scan or editorial cards?
37. **Q105** — Hover effects: minimal affordance or structural communication?

**Feature Scope:**
38. **Q6** — Subscribe mechanism: embed form, keep redirect, or switch provider?
39. **Q79** — Returning reader new-content detection?
40. **Q81** — Shareable Vibe configurations (URL params)?

**Content Details:**
41. **Q74** — Now page: historically archived or ephemeral?
42. **Q75** — Bookshelf: link to purchase/review pages?
43. **Q78** — Recruiter/collaborator experience priority?
44. **Q94** — Colophon: include performance stats (maintenance obligation)?
45. **Q111** — Credibility evaluation flow priority?
46. **Q112** — Projects-to-Posts cross-linking approach?

---

**Estimated dialogue:** ~45 questions for human (~8 deep + 15 confirmations + 22 standalone), ~97 auto-noted

**Efficiency notes:**
- Round 1 answers may automatically resolve 5-10 of the Round 2 questions, reducing actual dialogue
- Round 3 questions can be batched by theme (3-5 questions per batch) for conversational efficiency
- Realistic human interaction: ~30-35 questions after cascading, across 4-6 conversational rounds
