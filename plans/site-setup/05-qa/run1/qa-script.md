# QA Test Script — site-setup (Run 1)

## Instructions

You are performing acceptance testing for the **site-setup** implementation.

1. Open Chrome and navigate to `http://dev.local:3006`
2. Follow each test case below sequentially
3. For each test, replace the `Result` line with **PASS**, **FAIL**, or **BLOCKED** (if the test cannot be executed)
4. Add notes for any failures or blocked tests — describe what you actually observed
5. When testing responsive behaviour, use Chrome DevTools device toolbar (mobile: 375px width, desktop: 1280px width)
6. After completing all tests, fill in the **QA Report** section at the bottom of this file
7. Save the completed file as `qa-report.md` in the same folder (keep the original `qa-script.md` unchanged for reference)
8. Commit and push

## Environment

- **Server:** `http://dev.local:3006`
- **Branch:** `integration/site-setup`
- **Date:** 2026-02-23
- **Feature:** site-setup (xexr.com personal blog)
- **Spec:** `plans/site-setup/02-spec/spec.md`
- **Plan:** `plans/site-setup/03-plan/plan.md`

**Before starting:** Ensure JavaScript is enabled, clear browser cache and localStorage, and use a standard Chrome window (not incognito, unless a test specifically requires it).

---

## Test Cases

### A. Global Layout & Foundation

---

### TC-1: Dark background and colour palette

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Inspect the page background colour using DevTools

**Expected:** Page background is near-black (#050505). All text is light-on-dark. No light-theme elements visible anywhere. Headings should be off-white (#e8e8e8), body text should be muted grey (#a0a0a0).

**Result:** PENDING
**Notes:**

---

### TC-2: Font rendering (Plus Jakarta Sans and JetBrains Mono)

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Inspect the computed font-family on a heading element
3. Inspect the computed font-family on a navigation link

**Expected:** Headings and body text render in Plus Jakarta Sans. Navigation links, dates, tags, and code elements render in JetBrains Mono (monospace). No Geist or Roboto fonts loaded.

**Result:** PENDING
**Notes:**

---

### TC-3: Skip-to-content link

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Press Tab once (keyboard focus on first focusable element)

**Expected:** A "Skip to content" link becomes visible (it is visually hidden until focused). Pressing Enter scrolls/jumps to the main content area (`#main-content`).

**Result:** PENDING
**Notes:**

---

### TC-4: Scanline overlay

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Inspect the page for a full-screen overlay element

**Expected:** A subtle repeating horizontal line overlay is visible across the entire viewport. It has `pointer-events: none` (text is still selectable underneath) and `aria-hidden="true"`. The effect is very subtle — barely noticeable unless you look closely.

**Result:** PENDING
**Notes:**

---

### TC-5: Darkreader-lock meta tag

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. View page source (Ctrl+U) and search for "darkreader"

**Expected:** `<meta name="darkreader-lock">` is present in the `<head>` section.

**Result:** PENDING
**Notes:**

---

### B. Header & Navigation

---

### TC-6: Header logo and branding

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Look at the top-left of the page

**Expected:** Logo consists of an accent-coloured (mint green) square with an "x" character and monospace "xexr" text next to it. The square uses the current Vibe accent colour. No theme toggle button is visible in the header.

**Result:** PENDING
**Notes:**

---

### TC-7: Desktop navigation links

**Page:** / (desktop viewport, 1280px+)
**Steps:**
1. Navigate to `http://dev.local:3006/` at desktop width
2. Look at the header navigation area

**Expected:** Four navigation items visible: "Posts", "About", "Projects", "Now". Links are in JetBrains Mono font. The active page link is highlighted with accent colour.

**Result:** PENDING
**Notes:**

---

### TC-8: Desktop navigation active state

**Page:** /posts
**Steps:**
1. Navigate to `http://dev.local:3006/posts`
2. Check which nav item is highlighted

**Expected:** "Posts" nav item is highlighted with accent colour. Navigate to a post page (`/posts/[slug]`) — "Posts" should still be highlighted (parent route detection).

**Result:** PENDING
**Notes:**

---

### TC-9: Mobile hamburger menu

**Page:** / (mobile viewport, 375px)
**Steps:**
1. Set viewport to 375px width using DevTools
2. Navigate to `http://dev.local:3006/`
3. Look for a hamburger (menu) icon in the header

**Expected:** Desktop nav links are hidden. A hamburger menu icon is visible. Tapping it opens a mobile navigation drawer with all four nav items (Posts, About, Projects, Now). Tapping a nav item navigates to that page and closes the drawer.

**Result:** PENDING
**Notes:**

---

### TC-10: Mobile nav drawer keyboard and escape

**Page:** / (mobile viewport, 375px)
**Steps:**
1. Set viewport to 375px width
2. Open the mobile nav drawer
3. Press Escape key
4. Reopen the drawer and try Tab key to cycle through nav items

**Expected:** Escape closes the drawer. Focus is trapped inside the drawer when open (Tab doesn't escape to background elements). All nav items are keyboard-focusable.

**Result:** PENDING
**Notes:**

---

### C. Footer

---

### TC-11: Footer content and links

**Page:** /
**Steps:**
1. Scroll to the bottom of the page

**Expected:** Footer shows monospace "xexr" in accent colour. Two columns of links are visible — primary nav (Posts, About, Projects, Now) and secondary links. Social links for GitHub and Twitter/X are present. An RSS icon linking to the feed is visible. A subscribe/Substack link is present. Copyright line shown.

**Result:** PENDING
**Notes:**

---

### TC-12: Footer pushed to bottom

**Page:** /about (or any page with short content)
**Steps:**
1. Navigate to a page with minimal content
2. Check if the footer is at the bottom of the viewport

**Expected:** Even on pages with little content, the footer is pushed to the bottom of the viewport (not floating in the middle). This is achieved via flexbox `flex-grow` on the content area.

**Result:** PENDING
**Notes:**

---

### D. Vibe System

---

### TC-13: Status bar and Vibe pill

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Look at the bottom of the viewport

**Expected:** A fixed status bar is visible at the bottom of the viewport. It contains a pill showing "vibe #00ff88" (or similar text with the current hex value) with a coloured dot matching the accent colour. The pill has a subtle pulse/glow animation.

**Result:** PENDING
**Notes:**

---

### TC-14: Vibe drawer opens from pill

**Page:** /
**Steps:**
1. Click the Vibe pill in the status bar

**Expected:** A colour picker drawer opens. On desktop it should appear as a popover from the pill. It shows 8 colour preset buttons (Mint, Amber, Cyan, Coral, Ice, Green, Orange, Pink) with colour swatches, and a continuous spectrum slider for custom colours.

**Result:** PENDING
**Notes:**

---

### TC-15: Vibe preset changes site accent colour

**Page:** /
**Steps:**
1. Open the Vibe drawer
2. Click the "Amber" preset (or any non-mint preset)
3. Close the drawer

**Expected:** The entire site accent colour changes in real-time — the logo square, nav active state, links, status bar pill dot, and any accent-coloured elements all update to the new colour. The hex value in the pill updates. The transition is smooth (0.4s).

**Result:** PENDING
**Notes:**

---

### TC-16: Vibe colour persists across reload

**Page:** /
**Steps:**
1. Change the Vibe colour to a non-default colour (e.g., Coral)
2. Note the hex value shown in the pill
3. Reload the page (F5)

**Expected:** The page loads with the previously selected colour immediately — no flash of mint green before the custom colour appears. The hex value in the pill matches the selection.

**Result:** PENDING
**Notes:**

---

### TC-17: Vibe drawer keyboard navigation

**Page:** /
**Steps:**
1. Tab to the Vibe pill and press Enter
2. Use Tab/Arrow keys to navigate presets
3. Press Escape

**Expected:** The drawer opens on Enter. Preset buttons are keyboard-focusable with visible focus indicators. Escape closes the drawer and returns focus to the pill.

**Result:** PENDING
**Notes:**

---

### TC-18: Vibe drawer on mobile (bottom sheet)

**Page:** / (mobile viewport, 375px)
**Steps:**
1. Set viewport to 375px
2. Tap the Vibe pill in the status bar

**Expected:** The Vibe drawer opens as a bottom sheet (sliding up from the bottom of the screen), not as a popover. All 8 presets and the spectrum slider are accessible. Tapping outside or pressing a close button dismisses it.

**Result:** PENDING
**Notes:**

---

### TC-19: Vibe prefers-reduced-motion

**Page:** /
**Steps:**
1. In DevTools, enable "prefers-reduced-motion: reduce" emulation (Rendering tab)
2. Observe the status bar pill

**Expected:** The pulse/glow animation on the Vibe pill is disabled. Colour transitions are instant (no 0.4s animation). Particle canvas animation is disabled or shows a static arrangement.

**Result:** PENDING
**Notes:**

---

### E. Particle Canvas

---

### TC-20: Particle canvas renders in hero

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`
2. Look at the hero section (top area of the homepage)

**Expected:** An animated particle canvas is visible behind the hero content. Particles (small dots) float and are connected by lines when within proximity. Particles use the current accent colour. The canvas has a radial gradient fade at edges.

**Result:** PENDING
**Notes:**

---

### TC-21: Particle canvas mouse repulsion (desktop)

**Page:** / (desktop viewport)
**Steps:**
1. Navigate to the homepage at desktop width
2. Move the mouse over the particle canvas area

**Expected:** Particles within ~100px of the cursor repel away from the mouse position, creating a visible interaction effect.

**Result:** PENDING
**Notes:**

---

### TC-22: Particle canvas accessibility

**Page:** /
**Steps:**
1. Inspect the canvas element in DevTools

**Expected:** The canvas element has `aria-hidden="true"`. It is not focusable via keyboard. The hero content (name, descriptor) is fully readable on top of the canvas.

**Result:** PENDING
**Notes:**

---

### F. Homepage

---

### TC-23: Homepage hero content

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`

**Expected:** Hero section (~60-70vh height) displays: "Dane Poyzer" as a large heading (Plus Jakarta Sans 800 weight), a static descriptor text "Building AI-powered tools. Writing about what I learn." (or similar), and an avatar placeholder with initials "DP" and a conic gradient ring in accent colour. Particle canvas animates behind.

**Result:** PENDING
**Notes:**

---

### TC-24: Homepage featured posts section

**Page:** /
**Steps:**
1. Scroll below the hero section

**Expected:** A section showing featured/latest posts. With only one post, it should display as a single "Latest" entry without "Featured" or "Recent" labels. Quick links to About, Projects, and Subscribe (Substack) should be present below.

**Result:** PENDING
**Notes:**

---

### G. Blog Index

---

### TC-25: Blog index post list

**Page:** /posts
**Steps:**
1. Navigate to `http://dev.local:3006/posts`

**Expected:** A compact list of all published posts in date-descending order. Each post shows: title, date in "22 Feb 2026" format, tag pills (max 3 with "+N more" if exceeded), and reading time. Layout is a compact list style (not cards).

**Result:** PENDING
**Notes:**

---

### TC-26: Blog index tag filtering

**Page:** /posts
**Steps:**
1. Navigate to `/posts`
2. Click a tag filter pill at the top of the list

**Expected:** The post list filters to only show posts with the selected tag. The URL updates to include `?tag=<tagname>`. Clicking the same tag again clears the filter. An empty state message "No posts tagged [tag]" appears if no posts match.

**Result:** PENDING
**Notes:**

---

### TC-27: Post card hover effect (desktop)

**Page:** /posts (desktop viewport)
**Steps:**
1. Hover over a post card/row in the post list

**Expected:** A 1px accent-coloured line grows left-to-right along the bottom border of the card (0.4s ease animation). The post title transitions to accent colour. The entire row is clickable as a link.

**Result:** PENDING
**Notes:**

---

### H. Post Page

---

### TC-28: Post page layout and typography

**Page:** /posts/hello-world (or the seed post)
**Steps:**
1. Navigate to the seed post

**Expected:** Post title is large (Plus Jakarta Sans 800 weight, tight letter-spacing). A metadata bar shows date, reading time, and tag pills (clickable, linking to `/posts?tag=X`). Prose content renders in a centred column (740px max-width) with generous line-height (1.7-1.8). Body text colour is #a0a0a0.

**Result:** PENDING
**Notes:**

---

### TC-29: Post page code block rendering

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post
2. Find a code block

**Expected:** Code block has macOS window chrome (three coloured dots — red/yellow/green — with `aria-hidden` on the dots). Syntax highlighting is visible. A copy button is present (always visible, not hover-only) with a 44x44px touch target. String literals in the code render in the accent colour. Long lines scroll horizontally (never wrap).

**Result:** PENDING
**Notes:**

---

### TC-30: Code block copy button

**Page:** /posts/hello-world
**Steps:**
1. Find a code block on the post page
2. Click the copy button

**Expected:** The code is copied to the clipboard. The icon changes to a checkmark for ~2 seconds then reverts. Copied text does not include line numbers, diff markers, or decorative elements — only the raw code.

**Result:** PENDING
**Notes:**

---

### TC-31: Table of Contents (desktop)

**Page:** /posts/hello-world (desktop, 1200px+ width)
**Steps:**
1. Navigate to the post at 1200px+ viewport width
2. Scroll through the post

**Expected:** A sticky Table of Contents appears in the right margin alongside the prose. It lists h2/h3 headings. As you scroll, the active section is highlighted with accent colour. Clicking a ToC entry smooth-scrolls to that section.

**Result:** PENDING
**Notes:**

---

### TC-32: Table of Contents (mobile)

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to the post

**Expected:** The ToC appears as a collapsible disclosure element at the top of the article (not in the sidebar). Tapping it expands to show heading links. Active section highlighting still works.

**Result:** PENDING
**Notes:**

---

### TC-33: Post reading flow (subscribe, share, comments, nav)

**Page:** /posts/hello-world
**Steps:**
1. Scroll to the bottom of the post content

**Expected:** Below the content, in this order: (1) Subscribe CTA — a banner with text like "Enjoyed this? Get new posts in your inbox" linking to Substack, (2) Share buttons — Copy Link and Twitter share, (3) Giscus comments section (may show "Comments temporarily unavailable" if Giscus isn't configured), (4) Prev/next post navigation with titles and dates.

**Result:** PENDING
**Notes:**

---

### TC-34: Share — copy link button

**Page:** /posts/hello-world
**Steps:**
1. Click the "Copy Link" share button

**Expected:** The current post URL is copied to clipboard. The icon changes to a checkmark for ~2 seconds confirming the copy.

**Result:** PENDING
**Notes:**

---

### TC-35: Post page JSON-LD schema

**Page:** /posts/hello-world
**Steps:**
1. View page source (Ctrl+U)
2. Search for "BlogPosting"

**Expected:** A JSON-LD script tag with `@type: "BlogPosting"` is present, including `datePublished`, `author` (Dane Poyzer), and `description`.

**Result:** PENDING
**Notes:**

---

### I. About Page

---

### TC-36: About page content and CTAs

**Page:** /about
**Steps:**
1. Navigate to `http://dev.local:3006/about`

**Expected:** Narrative-first content about Dane Poyzer (ACA to tech to indie hacker journey). An avatar/photo placeholder is visible. Structured CTAs are present: "See what I've built" linking to /projects, "Read my thinking" linking to /posts. Social links (GitHub, Twitter, email) are visible.

**Result:** PENDING
**Notes:**

---

### TC-37: About page JSON-LD schema

**Page:** /about
**Steps:**
1. View page source and search for "Person"

**Expected:** A JSON-LD script tag with `@type: "Person"` is present, including name, url, and sameAs (social links).

**Result:** PENDING
**Notes:**

---

### J. Projects Page

---

### TC-38: Projects page layout

**Page:** /projects
**Steps:**
1. Navigate to `http://dev.local:3006/projects`

**Expected:** Projects displayed in a stacked list (full-width rows). Each project shows: name, one-liner description, tech stack badges, status badge (active/maintained/shelved/archived with distinct styling), and an external link (if applicable). Works well even with just 1-2 projects.

**Result:** PENDING
**Notes:**

---

### K. Now Page

---

### TC-39: Now page with date and staleness

**Page:** /now
**Steps:**
1. Navigate to `http://dev.local:3006/now`

**Expected:** Page shows a "Last updated: [date] ([N] days ago)" line prominently below the heading. Content sections visible (current projects, learning, reading, etc.). If the date is more than 90 days old, a subtle "This page may be out of date" note should appear.

**Result:** PENDING
**Notes:**

---

### L. 404 Page

---

### TC-40: 404 page with recovery paths

**Page:** /nonexistent-page
**Steps:**
1. Navigate to `http://dev.local:3006/this-page-does-not-exist`

**Expected:** A styled 404 page appears matching the site design (dark background, accent colours). Shows "Page not found" heading. Recovery links to homepage and blog index. Up to 3 recent posts are listed as suggestions.

**Result:** PENDING
**Notes:**

---

### M. SEO & Meta

---

### TC-41: Sitemap

**Page:** /sitemap.xml
**Steps:**
1. Navigate to `http://dev.local:3006/sitemap.xml`

**Expected:** Valid XML sitemap listing all pages: /, /posts, /about, /projects, /now, and one entry per published post (/posts/[slug]). No stale URLs like /signin, /signup, /admin, /dashboard. Post entries have lastModified dates.

**Result:** PENDING
**Notes:**

---

### TC-42: Robots.txt

**Page:** /robots.txt
**Steps:**
1. Navigate to `http://dev.local:3006/robots.txt`

**Expected:** Robots.txt only disallows `/api`. No stale `/admin` or `/dashboard` blocks. Sitemap URL is listed: `https://xexr.com/sitemap.xml`.

**Result:** PENDING
**Notes:**

---

### TC-43: RSS feed

**Page:** /api/rss
**Steps:**
1. Navigate to `http://dev.local:3006/api/rss`

**Expected:** Valid RSS 2.0 XML is returned. All published posts are included with full content (not just excerpts). Channel includes site title, description, and link. Each item has title, description, link, pubDate, and guid.

**Result:** PENDING
**Notes:**

---

### TC-44: OG image generation

**Page:** /api/og?title=Test+Post&description=A+test
**Steps:**
1. Navigate to `http://dev.local:3006/api/og?title=Test+Post&description=A+test+description`

**Expected:** An image renders with #050505 (near-black) background and mint green accent elements. Text uses Plus Jakarta Sans. Title and description from query params are displayed. The image should be suitable for social media sharing.

**Result:** PENDING
**Notes:**

---

### N. Responsive Design

---

### TC-45: Homepage mobile layout

**Page:** / (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to homepage

**Expected:** Hero section is 50-60vh (shorter than desktop). Avatar, name, and descriptor are properly sized. Particle canvas renders with fewer particles (~40 vs 60-100 on desktop). Post cards stack vertically. All text is readable without horizontal scrolling.

**Result:** PENDING
**Notes:**

---

### TC-46: Post page mobile layout

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to the seed post

**Expected:** Prose column fills available width with proper padding. Code blocks scroll horizontally for long lines. Code copy button is always visible (not hover-dependent) with 44x44px touch target. ToC is at the top (collapsible), not in a sidebar. All content is readable.

**Result:** PENDING
**Notes:**

---

### O. Accessibility

---

### TC-47: Link styling (underline, not colour-only)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post
2. Find body text links

**Expected:** All links within body text have underline decoration. Links are not differentiated from body text by colour alone — the underline provides a secondary visual signal.

**Result:** PENDING
**Notes:**

---

### TC-48: External link indicators

**Page:** /posts/hello-world or /about
**Steps:**
1. Find any link that points to an external site

**Expected:** External links open in a new tab (`target="_blank"`). They have `rel="noopener noreferrer"`. A small external link icon is visible next to the link text.

**Result:** PENDING
**Notes:**

---

### TC-49: ReturnToTop button placement

**Page:** /posts/hello-world
**Steps:**
1. Scroll down on a long post page
2. Check for a "Return to Top" button

**Expected:** A return-to-top button appears after scrolling. It is positioned above the StatusBar (not overlapping). It uses accent colour styling. Clicking it scrolls to the top of the page.

**Result:** PENDING
**Notes:**

---

### TC-50: Homepage JSON-LD schema

**Page:** /
**Steps:**
1. View page source and search for "WebSite"

**Expected:** A JSON-LD script tag with `@type: "WebSite"` is present with name "xexr.com", url "https://xexr.com", and author info.

**Result:** PENDING
**Notes:**

---

## QA Report

### Summary

| Metric | Value |
|--------|-------|
| Total tests | 50 |
| Passed | |
| Failed | |
| Blocked | |
| Pass rate | |
| Tester | Claude Chrome Extension |
| Date completed | |

### Failed Tests

<!-- For each failed test, copy this block: -->

#### TC-N: title

- **Severity:** Critical / High / Medium / Low
- **Steps to reproduce:** (copy from test steps, add detail if needed)
- **Expected:** what should have happened
- **Actual:** what actually happened
- **Screenshot/description:** describe what you see

### Blocked Tests

<!-- For each blocked test, briefly explain why it could not be executed -->

### Passing Notes

<!-- Optional: note anything that passed but felt borderline, or observations about quality -->

### Overall Assessment

<!-- 1-2 paragraph summary: -->
<!-- - Overall implementation quality -->
<!-- - Most significant issues found -->
<!-- - Areas that worked well -->
<!-- - Recommendation: ready to land / needs fixes / needs major rework -->
