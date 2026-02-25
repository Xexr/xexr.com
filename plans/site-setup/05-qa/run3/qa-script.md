# QA Test Script — site-setup (Run 3)

## Instructions

You are performing regression acceptance testing for the **site-setup** implementation after bug fixes from Run 2.

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
- **Date:** 2026-02-25
- **Feature:** site-setup (xexr.com personal blog)
- **Spec:** `plans/site-setup/02-spec/spec.md`
- **Plan:** `plans/site-setup/03-plan/plan.md`
- **Run 2 report:** `plans/site-setup/05-qa/run2/qa-report.md`

**Before starting:** Ensure JavaScript is enabled, clear browser cache and localStorage, and use a standard Chrome window (not incognito, unless a test specifically requires it).

**Context:** Run 2 found 3 failures: TC-7 (Table of Contents empty on desktop), TC-8 (Table of Contents missing on mobile), and TC-14 (prose links missing underline). All three have been fixed. This run re-tests all previously failed tests with deeper functional coverage, re-confirms the 2 environment-blocked items, and spot-checks key passing areas for regression.

---

## Test Cases

### A. Previously Failed — Re-test (Table of Contents)

---

### TC-1: Table of Contents renders on desktop (was Run 2 TC-7, Medium)

**Page:** /posts/hello-world (desktop, 1280px width)
**Steps:**
1. Navigate to `http://dev.local:3006/posts/hello-world` at 1280px+ viewport width
2. Look for a sticky sidebar in the right margin next to the article content
3. Inspect the `<aside>` element in DevTools — check that it contains child elements

**Expected:** A sticky Table of Contents appears in the right margin. It contains an "On this page" heading followed by a list of heading links. The links correspond to the h2/h3 headings in the article (e.g., "Why Write?", "What to Expect", "How This Site Works", "Directory Structure", "The Authoring Flow", "What's Next"). The aside element is NOT empty — it has visible rendered content.

**Result:** PENDING
**Notes:**

---

### TC-2: Table of Contents active heading highlight (desktop)

**Page:** /posts/hello-world (desktop, 1280px width)
**Steps:**
1. Navigate to the post at 1280px+ viewport width
2. Scroll to the "How This Site Works" section
3. Observe which ToC entry is highlighted
4. Scroll to "What's Next" section
5. Observe which ToC entry is highlighted

**Expected:** As you scroll through the article, the currently visible section's heading is highlighted in the accent colour in the ToC sidebar. The highlight updates as you scroll between sections. Non-active entries appear in muted grey.

**Result:** PENDING
**Notes:**

---

### TC-3: Table of Contents click-to-scroll (desktop)

**Page:** /posts/hello-world (desktop, 1280px width)
**Steps:**
1. Navigate to the post at 1280px+ viewport width
2. Click the "What's Next" entry in the ToC sidebar
3. Observe page scrolling behaviour

**Expected:** The page smooth-scrolls to the "What's Next" heading. After scrolling completes, that entry is highlighted in the ToC.

**Result:** PENDING
**Notes:**

---

### TC-4: Table of Contents h3 indentation (desktop)

**Page:** /posts/hello-world (desktop, 1280px width)
**Steps:**
1. Navigate to the post at 1280px+ viewport width
2. Look at the ToC entries — identify any h3 headings (sub-sections like "Directory Structure" and "The Authoring Flow" which are under "How This Site Works")

**Expected:** h3 entries are visually indented (left padding) compared to h2 entries, creating a hierarchy. h2 entries are flush left within the ToC, h3 entries are offset.

**Result:** PENDING
**Notes:**

---

### TC-5: Table of Contents renders on mobile (was Run 2 TC-8, Medium)

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. Set viewport to 375px
2. Navigate to `http://dev.local:3006/posts/hello-world`
3. Look for a collapsible element between the post header (title/tags) and the prose content

**Expected:** A collapsible "Table of Contents" card appears above the article body. It shows a list icon, the text "Table of Contents", and a "+" toggle indicator. The desktop sidebar ToC is hidden at this width.

**Result:** PENDING
**Notes:**

---

### TC-6: Mobile ToC expand/collapse interaction

**Page:** /posts/hello-world (mobile, 375px)
**Steps:**
1. At 375px viewport, find the "Table of Contents" card
2. Click/tap the card to expand it
3. Observe the heading links that appear
4. Click/tap the card header again to collapse it

**Expected:** Clicking expands the card to reveal heading links (same headings as the desktop ToC). The toggle indicator changes from "+" to "−". Clicking again collapses the list and the indicator returns to "+". Heading links inside are clickable and scroll to the corresponding section.

**Result:** PENDING
**Notes:**

---

### B. Previously Failed — Re-test (Link Styling)

---

### TC-7: Prose links have underline decoration (was Run 2 TC-14, Low)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to `http://dev.local:3006/posts/hello-world`
2. Find body text links within the prose content (e.g., links in the "What's Next" section)
3. Inspect a prose link using DevTools — check computed `text-decoration-line`

**Expected:** All links within the prose body text have `text-decoration-line: underline`. The underline is visible at a reduced opacity (semi-transparent accent colour). Links are NOT differentiated from body text by colour alone — underline provides a secondary visual signal.

**Result:** PENDING
**Notes:**

---

### TC-8: Prose link underline hover state

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the post
2. Hover over a prose body text link
3. Observe the underline colour change

**Expected:** On hover, the underline becomes fully opaque accent colour (brighter/more visible than the resting state). The transition is smooth.

**Result:** PENDING
**Notes:**

---

### TC-9: External link styling (icon + underline)

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the post
2. Find an external link in the prose content (a link to an https:// URL)
3. Check for both the underline and the external link icon

**Expected:** External links have both: (1) an underline decoration matching other prose links, and (2) a small external-link icon (↗) next to the link text. The icon is `aria-hidden="true"`.

**Result:** PENDING
**Notes:**

---

### C. Previously Blocked — Re-confirm

---

### TC-10: Code block copy button (was Run 2 TC-6, env-blocked)

**Page:** /posts/hello-world
**Steps:**
1. Find a code block on the post page
2. Click the copy button
3. Check browser console for errors

**Expected:** BLOCKED (expected) — `navigator.clipboard` requires HTTPS. Over HTTP, the button click may fail silently. Confirm this is still the case and no JavaScript errors are thrown. If the environment now supports clipboard (e.g., localhost exception), verify the copy works and icon changes to checkmark.

**Result:** PENDING
**Notes:**

---

### TC-11: Share copy link button (was Run 2 TC-10, env-blocked)

**Page:** /posts/hello-world
**Steps:**
1. Scroll to the share buttons below the post content
2. Click the "Copy link" button
3. Check browser console for errors

**Expected:** BLOCKED (expected) — same clipboard API limitation as TC-10. Confirm no JavaScript errors thrown on click.

**Result:** PENDING
**Notes:**

---

### D. Regression Spot-Checks

---

### TC-12: Homepage renders correctly (regression check)

**Page:** /
**Steps:**
1. Navigate to `http://dev.local:3006/`

**Expected:** Hero section with particle canvas, "Dane Poyzer" heading, descriptor text, avatar with accent ring. Featured/latest posts below hero. Footer at bottom. No visual regressions.

**Result:** PENDING
**Notes:**

---

### TC-13: Post page renders without console errors (regression check)

**Page:** /posts/hello-world
**Steps:**
1. Open DevTools Console (F12)
2. Navigate to `http://dev.local:3006/posts/hello-world`
3. Check console for errors (ignore hydration mismatch warnings about `--accent`)

**Expected:** No CSP violations, no React error boundaries, no unhandled exceptions. Post page renders fully with title, metadata, tags, prose content, subscribe CTA, share buttons, comments section, and post navigation.

**Result:** PENDING
**Notes:**

---

### TC-14: Vibe colour change applies to ToC and prose links

**Page:** /posts/hello-world
**Steps:**
1. Navigate to the homepage
2. Click the Vibe pill in the status bar
3. Select the "Coral" preset
4. Close the drawer
5. Navigate to `/posts/hello-world`
6. Check the ToC active entry colour and prose link underline colour

**Expected:** The ToC active heading highlight uses the coral accent colour. Prose link text uses coral. Prose link underlines use a semi-transparent coral. The Vibe colour change propagates to all accent-coloured elements on the post page.

**Result:** PENDING
**Notes:**

---

### TC-15: Prefers-reduced-motion with ToC (regression check)

**Page:** /posts/hello-world
**Steps:**
1. In DevTools, enable "prefers-reduced-motion: reduce" emulation (Rendering tab)
2. Navigate to `http://dev.local:3006/posts/hello-world`
3. Click a ToC entry (desktop) or expand and click a mobile ToC entry

**Expected:** Clicking a ToC entry scrolls to the heading instantly (no smooth scroll animation). The ToC still renders correctly and active highlighting still works. All other animations remain effectively instant.

**Result:** PENDING
**Notes:**

---

## QA Report

### Summary

| Metric | Value |
|--------|-------|
| Total tests | 15 |
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
