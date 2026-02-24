# QA Report — site-setup (Run 2)

## Summary

| Metric | Value |
|--------|-------|
| Total tests | 20 |
| Passed | 15 |
| Failed | 3 |
| Blocked | 2 |
| Pass rate | 75% (83% of executable tests) |
| Tester | Claude Chrome Extension |
| Date completed | 2026-02-24 |

---

## Test Results

### TC-1: Post page renders without CSP error
**Result:** PASS
**Notes:** Post page at /posts/hello-world renders fully. Console shows only a React hydration mismatch warning about the `--accent` CSS variable (SSR vs client value difference) — no CSP violation. Post title "Building in Public: Why I Started Writing", metadata bar (23 Feb 2026, 2 min read), tag pills, and prose content all visible.

---

### TC-2: Vibe pill pulse/glow animation
**Result:** PASS
**Notes:** Vibe pill has `vibe-pulse` animation. Duration: 2s, iteration count: 3 → 6 seconds total, then stops. Confirmed via computed styles.

---

### TC-3: Prefers-reduced-motion
**Result:** PASS
**Notes:** `@media (prefers-reduced-motion: reduce)` rules confirmed in stylesheet: all transitions/animations reduced to 0.01ms; `.status-bar-pulse` gets a static box-shadow instead of animation. JS checks also present in `ParticleCanvas.tsx` and `TableOfContents.tsx`.

---

### TC-4: Post page layout and typography
**Result:** PASS
**Notes:** h1 fontWeight: 800, letterSpacing: -0.9px (tight). Prose lineHeight: 28px at 16px font = 1.75 (within 1.7–1.8 spec). Article maxWidth: 740px. Body text in muted grey (lab colour). Tag pills (meta, writing, nextjs) link correctly to `/posts?tag=meta`, `/posts?tag=writing`, `/posts?tag=nextjs`.

---

### TC-5: Post page code block rendering
**Result:** PASS
**Notes:** macOS window chrome present (red #ff5f57, yellow #febc2e, green #28c840 dots, aria-hidden). Copy button always visible (not hover-only). String literals rendered in accent colour. Syntax highlighting confirmed.

---

### TC-6: Code block copy button
**Result:** BLOCKED
**Notes:** `navigator.clipboard` is `undefined` in this environment — the Clipboard API requires a secure context (`isSecureContext: false`, running over `http://`). The component uses `navigator.clipboard.writeText()` with no HTTP fallback. Button click fails silently, icon never changes to checkmark. This will work correctly in production over HTTPS. No DOM mutation observed on click.

---

### TC-7: Table of Contents — desktop
**Result:** FAIL
**Notes:** The `<aside>` element is present in DOM with `display: block` and `width: 224px` at 1280px viewport, but its `innerHTML` is completely empty — no heading links rendered. The page has 4 × h2 and 2 × h3 headings. ToC container exists but receives no content. Verified by DOM inspection before and after scrolling.

---

### TC-8: Table of Contents — mobile
**Result:** FAIL
**Notes:** At 375px viewport, the desktop `<aside>` is correctly hidden (`display: none`). However, no mobile replacement ToC is rendered — zero `<details>` elements found in the DOM. No collapsible disclosure element appears at the top of the article. Same root cause as TC-7: ToC component not rendering content.

---

### TC-9: Post reading flow — subscribe, share, comments, nav
**Result:** PASS
**Notes:** All required elements present at bottom of post: (1) Subscribe CTA — "Enjoyed this? Get new posts in your inbox" with Subscribe button linking to `https://xexr.substack.com/`. (2) Share buttons — "Copy link" and "Share" (Twitter/X). (3) "Comments temporarily unavailable" message. (4) No prev/next navigation — expected, as there is only one post.

---

### TC-10: Share — copy link button
**Result:** BLOCKED
**Notes:** Same clipboard API issue as TC-6. `navigator.clipboard.writeText()` is unavailable over HTTP. Works in production HTTPS environment.

---

### TC-11: Post page JSON-LD schema
**Result:** PASS
**Notes:** `<script type="application/ld+json">` present in `<head>` with `@type: "BlogPosting"`, `datePublished: "2026-02-23"`, `author` (Dane Poyzer), `description`, `headline`, `keywords`, `publisher`, and `url`.

---

### TC-12: Desktop navigation active state on post page
**Result:** PASS
**Notes:** "Posts" nav item highlighted with accent colour on `/posts/hello-world`. Parent route detection working correctly.

---

### TC-13: Post page mobile layout
**Result:** PASS
**Notes:** At 375px: prose column fills available width with proper padding. Code blocks have `overflow-x: auto` (horizontal scroll for long lines). Copy buttons are 44×44px (meets touch target spec). ToC not present (see TC-8). All content readable.

---

### TC-14: Link styling — underline, not colour-only
**Result:** FAIL
**Notes:** Prose links have `text-decoration-line: none`. Links are differentiated from body text by colour only (accent colour). No underline secondary signal present. Confirmed via `window.getComputedStyle()`. This is an accessibility concern — colour alone should not be the sole differentiator.

---

### TC-15: ReturnToTop button placement
**Result:** PASS
**Notes:** ReturnToTop button present and correctly positioned above the StatusBar. Button bottom: 663px, StatusBar top: 687px — no overlap. Uses accent colour styling. Visible after scrolling past the fold.

---

### TC-16: About page CTA icon
**Result:** PASS
**Notes:** "See what I've built" button links to `/projects`. Uses `lucide-arrow-right` SVG (→) — internal navigation arrow, not `lucide-external-link` (↗).

---

### TC-17: RSS feed MDXImage stripping
**Result:** PASS
**Notes:** No `<MDXImage>` or `<mdximage>` element tags found in the RSS feed XML. The string "MDXImage" appears only as prose text in the article body (a backtick code reference: "registers custom components like `Callout` and `MDXImage`") — this is correct content, not an unstripped component.

---

### TC-18: Vibe colour change still works after CSP fix
**Result:** PASS
**Notes:** Selected Coral preset (#ff6b6b) from the Vibe drawer on homepage. Accent colour applied site-wide immediately: avatar ring, particle colours, nav active state, Vibe pill indicator all changed to coral. Navigated to `/posts/hello-world` — coral accent persisted (nav "Posts" label in coral, Vibe pill showing #ff6b6b).

---

### TC-19: Vibe colour persists on post page reload
**Result:** PASS
**Notes:** On fresh navigation to `/posts/hello-world` with coral stored in localStorage (`xexr-vibe: #ff6b6b`), `document.documentElement.style.getPropertyValue('--accent')` is already `#ff6b6b` — applied before React hydration. Blocking script in `<head>` reads localStorage and sets `--accent` before first paint. No flash of default mint green.

---

### TC-20: Homepage still renders correctly
**Result:** PASS
**Notes:** Hero section: particle canvas with floating dots, "Dane Poyzer" heading, "Building AI-powered tools. Writing about what I learn." descriptor, avatar (DP initials) with accent ring. Featured/latest post ("Building in Public: Why I Started Writing") visible below hero. Footer present. No visual regressions from Run 1.

---

## Failed Tests

#### TC-7: Table of Contents — desktop

- **Severity:** Medium
- **Steps to reproduce:** Navigate to `/posts/hello-world` at 1280px viewport width. Inspect `<aside>` element in DevTools.
- **Expected:** Sticky ToC in right margin listing h2/h3 headings with accent-coloured active section.
- **Actual:** `<aside>` element exists in DOM (`display: block`, `width: 224px`) but is completely empty — `innerHTML` is `""`, zero children. Page has 6 headings (4 × h2, 2 × h3) but none are rendered into the ToC.

#### TC-8: Table of Contents — mobile

- **Severity:** Medium
- **Steps to reproduce:** Navigate to `/posts/hello-world` at 375px viewport width.
- **Expected:** Collapsible `<details>` disclosure at top of article listing headings.
- **Actual:** No `<details>` element in DOM. Desktop aside is correctly hidden. No mobile ToC replacement is rendered. Same root cause as TC-7.

#### TC-14: Link styling — underline, not colour-only

- **Severity:** Low (accessibility concern)
- **Steps to reproduce:** Navigate to `/posts/hello-world`. Inspect any prose link (e.g., "multi-agent orchestration" in "What's next" section). Check computed `text-decoration-line`.
- **Expected:** Links have underline decoration as secondary visual differentiator.
- **Actual:** `text-decoration-line: none`. Links use accent colour only. Fails WCAG 1.4.1 (Use of Color) if the colour contrast ratio of the link vs surrounding text is insufficient without underline.

---

## Blocked Tests

- **TC-6 & TC-10:** Both clipboard copy tests (code block copy, share copy link) require `navigator.clipboard` (Clipboard API), which is only available in secure contexts (HTTPS). The dev environment runs on `http://dev.local:3006`. These tests should pass in production. No fallback mechanism (e.g., `document.execCommand('copy')`) is implemented.

---

## Passing Notes

- The CSP fix from Run 1 is confirmed working — TC-1 is a clean pass with no CSP-related console errors. This unblocked all 10 post-page tests.
- The hydration mismatch warning in the console (about `--accent` CSS variable differing between server and client) is cosmetic and expected in dev with a custom vibe colour. It does not affect functionality.
- The Vibe system (TC-2, TC-18, TC-19) works well end-to-end — persistence, site-wide application, and the initial pulse animation all function correctly.
- RSS feed correctly strips MDX component tags (TC-17) — the false positive in the initial check was a prose text reference to the component name, not an unstripped tag.

---

## Overall Assessment

Run 2 is a significant improvement on Run 1. The critical CSP blocker is resolved, enabling all 10 previously blocked post-page tests to run. Of those, 8 pass cleanly.

The two remaining failures (TC-7, TC-8) share a single root cause: the Table of Contents component renders an empty container — the `<aside>` exists in the DOM but receives no content. This affects both desktop (empty aside) and mobile (no collapsible replacement). The ToC-related tests in TC-7 and TC-8 are Medium severity and should be fixed before landing.

TC-14 (link underline) is Low severity but an accessibility gap — prose links rely on colour alone to distinguish them from body text.

The two blocked tests (TC-6, TC-10) are environment limitations, not bugs; both should pass in production over HTTPS.

**Recommendation: needs fixes** — resolve the ToC rendering issue (TC-7/8) and add link underlines to prose (TC-14) before merging.
