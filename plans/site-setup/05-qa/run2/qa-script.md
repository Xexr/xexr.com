# QA Test Script — site-setup (Run 2)

## Instructions

You are performing regression acceptance testing for the **site-setup** implementation after bug fixes from Run 1.

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
- **Run 1 report:** `plans/site-setup/05-qa/run1/qa-report.md`

**Before starting:** Ensure JavaScript is enabled, clear browser cache and localStorage, and use a standard Chrome window (not incognito, unless a test specifically requires it).

**Context:** Run 1 found 3 failures and 12 blocked tests. The critical issue was a CSP policy blocking MDX rendering on post pages (TC-28), which cascaded to block 10 other tests. This run re-tests all previously failed and blocked tests, plus spot-checks passing tests for regression.

---

## Test Cases

### A. Previously Failed — Re-test

---

### TC-1: Post page renders without CSP error (was Run 1 TC-28, Critical)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to `http://dev.local:3006/posts/hello-world`
2. Check browser console for errors (F12 → Console tab)

**Expected:** Post page renders fully — no React error boundary, no CSP violation in console. Post title "Building in Public: Why I Started Writing" (or seed post title) is visible with metadata bar (date, reading time, tags) and prose content below.

**Result:** PENDING
**Notes:**

---

### TC-2: Vibe pill pulse/glow animation (was Run 1 TC-13, Low)

**Page:** /
**Steps:**
1. Clear localStorage (DevTools → Application → Local Storage → Clear All)
2. Navigate to `http://dev.local:3006/`
3. Look at the Vibe pill in the status bar at the bottom

**Expected:** The Vibe pill has a subtle pulse/glow animation (box-shadow pulsing 3 times over ~6 seconds). After the 3 pulses, the animation stops. The pulse uses the accent glow colour.

**Result:** PENDING
**Notes:**

---

### TC-3: Prefers-reduced-motion (was Run 1 TC-19, Medium)

**Page:** /
**Steps:**
1. In DevTools, enable "prefers-reduced-motion: reduce" emulation (Rendering tab → Emulate CSS media feature)
2. Navigate to `http://dev.local:3006/`
3. Check for animations and transitions

**Expected:** All CSS transitions are effectively instant (duration near 0ms). The Vibe pill shows a static glow instead of pulsing. The particle canvas shows a static arrangement (no floating/moving particles). Changing Vibe colour via the drawer applies instantly (no 0.4s transition).

**Result:** PENDING
**Notes:**

---

### B. Previously Blocked by TC-28 — First Test

---

### TC-4: Post page layout and typography (was Run 1 TC-28)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post

**Expected:** Post title is large (Plus Jakarta Sans 800 weight, tight letter-spacing). Metadata bar shows date (e.g., "23 Feb 2026"), reading time, and tag pills (clickable, linking to `/posts?tag=X`). Prose content in a centred column (740px max-width) with generous line-height (1.7-1.8). Body text colour is muted grey.

**Result:** PENDING
**Notes:**

---

### TC-5: Post page code block rendering (was Run 1 TC-29)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post
2. Find a code block

**Expected:** Code block has macOS window chrome (three coloured dots — red/yellow/green — with `aria-hidden` on the dots). Syntax highlighting visible. A copy button is present (always visible, not hover-only) with adequate touch target. String literals in code render in the accent colour. Long lines scroll horizontally (never wrap).

**Result:** PENDING
**Notes:**

---

### TC-6: Code block copy button (was Run 1 TC-30)

**Page:** /posts/hello-world
**Steps:**
1. Find a code block on the post page
2. Click the copy button

**Expected:** Code is copied to clipboard. Icon changes to a checkmark for ~2 seconds then reverts. Copied text does not include line numbers, diff markers, or decorative elements — only raw code.

**Result:** PENDING
**Notes:**

---

### TC-7: Table of Contents — desktop (was Run 1 TC-31)

**Page:** /posts/hello-world (desktop, 1200px+ width)
**Steps:**
1. Navigate to the post at 1200px+ viewport width
2. Scroll through the post

**Expected:** A sticky Table of Contents appears in the right margin alongside the prose. Lists h2/h3 headings. Active section highlighted with accent colour as you scroll. Clicking a ToC entry smooth-scrolls to that section.

**Result:** PENDING
**Notes:**

---

### TC-8: Table of Contents — mobile (was Run 1 TC-32)

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to the post

**Expected:** ToC appears as a collapsible disclosure element at the top of the article (not sidebar). Tapping expands to show heading links. Active section highlighting still works.

**Result:** PENDING
**Notes:**

---

### TC-9: Post reading flow — subscribe, share, comments, nav (was Run 1 TC-33)

**Page:** /posts/hello-world
**Steps:**
1. Scroll to the bottom of the post content

**Expected:** Below the content, in this order: (1) Subscribe CTA — banner linking to Substack, (2) Share buttons — Copy Link and Twitter share, (3) Giscus comments section (may show "Comments temporarily unavailable" if not configured), (4) Prev/next post navigation with titles and dates.

**Result:** PENDING
**Notes:**

---

### TC-10: Share — copy link button (was Run 1 TC-34)

**Page:** /posts/hello-world
**Steps:**
1. Click the "Copy Link" share button

**Expected:** Current post URL copied to clipboard. Icon changes to checkmark for ~2 seconds confirming the copy.

**Result:** PENDING
**Notes:**

---

### TC-11: Post page JSON-LD schema (was Run 1 TC-35)

**Page:** /posts/hello-world
**Steps:**
1. View page source (Ctrl+U)
2. Search for "BlogPosting"

**Expected:** A JSON-LD script tag with `@type: "BlogPosting"` is present, including `datePublished`, `author` (Dane Poyzer), and `description`.

**Result:** PENDING
**Notes:**

---

### TC-12: Desktop navigation active state on post page (was Run 1 TC-8 partial)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to `http://dev.local:3006/posts/hello-world`
2. Check which nav item is highlighted in the header

**Expected:** "Posts" nav item is highlighted with accent colour (parent route detection: `/posts/hello-world` highlights "Posts").

**Result:** PENDING
**Notes:**

---

### TC-13: Post page mobile layout (was Run 1 TC-46)

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to the seed post

**Expected:** Prose column fills available width with proper padding. Code blocks scroll horizontally for long lines. Code copy button always visible (not hover-dependent) with 44x44px touch target. ToC at the top (collapsible), not sidebar. All content readable.

**Result:** PENDING
**Notes:**

---

### TC-14: Link styling — underline, not colour-only (was Run 1 TC-47)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post
2. Find body text links within the prose content

**Expected:** All links within body text have underline decoration. Links are not differentiated from body text by colour alone — underline provides a secondary visual signal.

**Result:** PENDING
**Notes:**

---

### TC-15: ReturnToTop button placement (was Run 1 TC-49)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the seed post
2. Scroll down past the fold

**Expected:** A return-to-top button appears after scrolling. It is positioned above the StatusBar (not overlapping). Uses accent colour styling. Clicking scrolls to the top.

**Result:** PENDING
**Notes:**

---

### C. Other Low-Severity Fixes — Verify

---

### TC-16: About page CTA icon (was Low observation)

**Page:** /about
**Steps:**
1. Navigate to `http://dev.local:3006/about`
2. Look at the "See what I've built" button

**Expected:** The button links to `/projects` and uses an arrow icon (→) — NOT an external-link icon (↗). The icon should indicate internal navigation.

**Result:** PENDING
**Notes:**

---

### TC-17: RSS feed MDXImage stripping (was Low observation)

**Page:** /api/rss
**Steps:**
1. Navigate to `http://dev.local:3006/api/rss`
2. Search the XML content for "mdximage" or "MDXImage"

**Expected:** No `<mdximage>` or `<MDXImage>` tags appear in the RSS feed content. Custom MDX components should be stripped from the feed output.

**Result:** PENDING
**Notes:**

---

### D. Spot-Check Regressions

---

### TC-18: Vibe colour change still works after CSP fix

**Page:** /
**Steps:**
1. Click the Vibe pill in the status bar
2. Select the "Coral" preset
3. Close the drawer
4. Navigate to `/posts/hello-world`

**Expected:** Accent colour changes site-wide immediately. The post page renders with the new accent colour applied (links, ToC highlights, code block string literals). Colour persists after navigation.

**Result:** PENDING
**Notes:**

---

### TC-19: Vibe colour persists on post page reload

**Page:** /posts/hello-world
**Steps:**
1. With a non-default Vibe colour active, reload the post page (F5)

**Expected:** Page loads with the custom colour immediately — no flash of mint green. The blocking script in `<head>` applies the saved colour before first paint.

**Result:** PENDING
**Notes:**

---

### TC-20: Homepage still renders correctly

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`

**Expected:** Hero section with particle canvas, "Dane Poyzer" heading, descriptor text, avatar with accent ring. Featured/latest posts below hero. Footer at bottom. No visual regressions from Run 1 passing state.

**Result:** PENDING
**Notes:**

---

## QA Report

### Summary

| Metric | Value |
|--------|-------|
| Total tests | 20 |
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
