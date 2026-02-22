# Spec Review: site-setup

## Review Configuration

- **Spec:** plans/site-setup/02-spec/spec.md
- **Models Used:** Opus 4.6, GPT 5.3 Codex, Gemini 3 Pro (succeeded after rate limit retries)
- **Categories:** All (Codebase Match, Design Quality, Security, etc.)
- **Context Source:** Existing context.md from step 1

## Model Comparison

| # | Issue | Opus 4.6 | GPT 5.3 | Gemini 3 | Agree? |
|---|-------|----------|---------|----------|--------|
| 1 | Viewport maximumScale blocks zoom | HIGH: WCAG violation, must remove `maximumScale: 1` | - | - | Opus only |
| 2 | JSON-LD schema type mismatch | HIGH: Organization schema needs replacing with WebSite/Person/BlogPosting | - | - | Opus only |
| 3 | OG image colours/branding wrong | HIGH: Uses blue not mint, wrong background, wrong route path | - | - | Opus only |
| 4 | Sitemap/robots stale template content | HIGH: Sitemap has /signin, /signup, robots blocks /admin | MEDIUM: Legacy auth URLs in sitemap | - | Yes (2/3) |
| 5 | Canonical domain migration needed | - | HIGH: siteConfig has vercel.app URL, not xexr.com | - | GPT only |
| 6 | Spec blurs current vs target state | - | HIGH: Architecture reads as present reality but nothing exists yet | - | GPT only |
| 7 | "Validated" status with open questions | - | HIGH: Status says validated but open blockers remain | - | GPT only |
| 8 | Colour token migration needed | MEDIUM: OKLCh values need updating to match spec hex values | - | - | Opus only |
| 9 | Font stack full replacement scope | MEDIUM: Removing Geist/Roboto + adding Jakarta/JetBrains is multi-file | - | - | Opus only |
| 10 | (app) route group not addressed | MEDIUM: Spec doesn't mention route groups, unclear where to add pages | - | - | Opus only |
| 11 | siteConfig placeholder data | MEDIUM: Generic keywords, template topics, temp URL | - | - | Opus only |
| 12 | Vibe transition wording contradicts | MEDIUM: "instant" and "0.4s" are contradictory | - | - | Opus only |
| 13 | Analytics strategy unclear (Plausible vs Vercel) | MEDIUM: Dual analytics unresolved | - | - | Opus only |
| 14 | Content co-location vs flat structure | MEDIUM: Spec says directory-based, architecture diagram shows flat | MEDIUM: Two incompatible structures specified | - | Yes (2/3) |
| 15 | @vercel/og listed but not needed | LOW: next/og already built into Next.js 16 | MEDIUM: Code uses next/og, not @vercel/og | - | Yes (2/3) |
| 16 | Question accounting inconsistency | - | MEDIUM: 97 + 44 + 6 != 142 cleanly | - | GPT only |
| 17 | Tag filtering vs pagination underspecified | - | MEDIUM: Client-side filter + pagination interaction unclear | - | GPT only |
| 18 | Acceptance criteria not concrete / Test strategy | - | MEDIUM: No testable feature-level criteria | MEDIUM: Missing test strategy for complex logic | Yes (2/3) |
| 19 | CSP/security headers not defined | - | MEDIUM: Inline script + third-party embeds need CSP | - | GPT only |
| 20 | Self-review gap count mismatch | LOW: Claims 15 but lists ~9 | - | - | Opus only |
| 21 | Brief project structure outdated | LOW: Brief says components/ not _components/ | - | - | Opus only |
| 22 | Skip-to-content link needs id on main | LOW: Main element needs id="main-content" | - | - | Opus only |
| 23 | Mobile hamburger implementation gap | LOW: Current nav isn't hamburger pattern | - | - | Opus only |
| 24 | OG type should vary per page | LOW: Homepage = website, posts = article | - | - | Opus only |
| 25 | Status bar layout vs container width | - | - | LOW: Fixed bar may conflict with max-w-7xl container | Gemini only |
| 26 | Sitemap needs Velite data wiring | - | - | LOW: Explicit link between Velite collections and sitemap | Gemini only |
| 27 | Context doc stale about API routes | - | LOW: Says /api empty but OG route exists | - | GPT only |
| 28 | README references nonexistent DB scripts | - | LOW: README has pnpm db:start but no DB | - | GPT only |

---

## All Issues by Severity

### CRITICAL (0 issues)

No critical issues identified by any model.

### HIGH (6 issues)

**1. Viewport maximumScale blocks zoom (Opus)**
- **What:** `maximumScale: 1` in viewport config prevents mobile zoom, a WCAG 2.1 SC 1.4.4 failure
- **Where:** `src/app/layout.tsx` line 22
- **Evidence:** Spec commits to WCAG AA but doesn't flag this existing violation
- **Recommendation:** Remove `maximumScale: 1` from viewport export. Note in spec as codebase cleanup.

**2. JSON-LD schema type mismatch (Opus)**
- **What:** Root layout renders `@type: "Organization"` but this is a personal blog
- **Where:** `src/app/layout.tsx` lines 28-37
- **Evidence:** Spec says WebSite for homepage, Person for About, BlogPosting for posts, but doesn't note Organization schema needs replacement
- **Recommendation:** Add migration note: replace Organization with WebSite schema, add page-level schemas.

**3. OG image colours and branding wrong (Opus)**
- **What:** Existing OG route uses blue accent (`#60a5fa`) and wrong background (`#030712`)
- **Where:** `src/app/api/og/route.tsx`
- **Evidence:** Spec says mint (#00ff88) and #050505. Also lists `@vercel/og` as new dependency but `next/og` is already used.
- **Recommendation:** Add OG route to migration cleanup. Remove `@vercel/og` from dependency list.

**4. Sitemap and robots contain stale template content (Opus + GPT)**
- **What:** Sitemap references `/signin`, `/signup`, `/forgot-password`; robots blocks `/admin`, `/dashboard`
- **Where:** `src/app/sitemap.ts`, `src/app/robots.ts`
- **Evidence:** None of these routes exist in the blog spec
- **Recommendation:** Add cleanup step: rewrite sitemap to generate from Velite collections, strip robots of irrelevant blocks.

**5. Canonical domain migration needed (GPT)**
- **What:** `siteConfig.ts` URL is `xexrcom.vercel.app`, not `xexr.com`. This flows into metadata, sitemap, robots.
- **Where:** `src/lib/siteConfig.ts` line 8; propagates to `metadata.ts`, `sitemap.ts`, `robots.ts`
- **Evidence:** Spec assumes `xexr.com` canonical but doesn't call out the config change
- **Recommendation:** Add explicit acceptance criterion: set `siteConfig.url` to `https://xexr.com` and verify all generated metadata uses it.

**6. Spec blurs current state vs target state (GPT)**
- **What:** Architecture section reads as though Velite/MDX/Vibe already exist, but the codebase is a placeholder scaffold
- **Where:** Architecture Overview section
- **Evidence:** App has empty nav, placeholder homepage, no Velite, no Giscus, no Shiki in dependencies
- **Recommendation:** Add a "Current State" note at the top of Architecture clarifying this is the target design. The existing codebase provides scaffolding only.

### MEDIUM (9 issues)

**7. Colour token migration scope (Opus)**
- **What:** Current OKLCh values (warm-toned shadcn defaults) need full replacement with spec's colour system
- **Where:** `src/styles/globals.css` lines 122-145
- **Recommendation:** Add CSS token migration step to spec or implementation plan.

**8. Font stack full replacement (Opus)**
- **What:** Replacing 3 fonts (Geist Sans, Geist Mono, Roboto) with 2 (Jakarta, JetBrains Mono) touches layout.tsx, globals.css, and package.json
- **Where:** Multiple files
- **Recommendation:** Acknowledge scope in Integration Points.

**9. (app) route group guidance (Opus)**
- **What:** Spec doesn't mention the existing `(app)` route group or where new pages go
- **Where:** `src/app/(app)/`
- **Recommendation:** Clarify whether to keep or flatten the route group.

**10. Content structure ambiguity (Opus + GPT)**
- **What:** Spec says directory-based co-location but architecture diagram shows flat MDX files
- **Where:** Lines 155 vs 213
- **Recommendation:** Pick one canonical structure (directory-based is better for co-located images) and update architecture diagram.

**11. Acceptance criteria / test strategy (GPT + Gemini)**
- **What:** No testable feature-level acceptance criteria or test plan
- **Where:** Missing section
- **Recommendation:** Add test plan for: Vibe persistence/sync, Velite schema validation, RSS output, OG route, accessibility.

**12. Analytics strategy unresolved (Opus)**
- **What:** Both Vercel Analytics and Plausible listed without resolution
- **Where:** Architecture
- **Recommendation:** Decide: keep both (Vercel for vitals, Plausible for traffic) or remove Vercel.

**13. Tag filtering + pagination interaction (GPT)**
- **What:** Both client-side filtering and pagination specified but interaction not defined
- **Where:** `/posts` page spec
- **Recommendation:** Specify: filter resets to page 1, pagination works within filtered set.

**14. CSP/security headers needed (GPT)**
- **What:** Blocking inline script and Giscus embed need CSP policy
- **Where:** `next.config.ts`
- **Recommendation:** Define CSP requirements for inline scripts (nonce/hash) and allowed embed domains.

**15. Vibe "instant" vs "0.4s" wording (Opus)**
- **What:** User flow says "instant site-wide colour transition (0.4s)" — contradictory
- **Where:** Line 337
- **Recommendation:** Change "instant" to "smooth".

### LOW (13 issues)

**16.** @vercel/og listed as dependency but not needed (Opus + GPT)
**17.** Question accounting: 97 auto + 44 human + 6 deferred = 147, not 142 (GPT)
**18.** Self-review claims 15 gaps but lists ~9 (Opus)
**19.** Brief's project structure outdated vs codebase (Opus)
**20.** siteConfig has placeholder keywords/topics (Opus)
**21.** Skip-to-content needs `<main id="main-content">` (Opus)
**22.** Mobile nav isn't hamburger pattern yet (Opus)
**23.** OG type should be "article" on post pages (Opus)
**24.** Status bar may conflict with container width (Gemini)
**25.** Sitemap needs Velite data wiring note (Gemini)
**26.** Context doc says /api empty but OG route exists (GPT)
**27.** README references nonexistent DB scripts (GPT)
**28.** constants.ts is a placeholder (Opus)

---

## Reasoning

**On GPT's "Spec blurs current vs target state" (HIGH):**
Valid observation. The architecture section describes the target system without clearly delineating what already exists vs what needs building. However, this is standard for a design spec — it describes what to build. Adding a brief "Current State" note is sufficient rather than restructuring the entire document.

**On GPT's "Validated status conflicts with open questions":**
Partially valid. The spec's open questions (Vibe presets, Shiki theme, Giscus config) are implementation-time decisions, not design blockers. "Validated" means the design is complete, not that every hex value is chosen. The open questions are properly labelled as such.

**On Opus's WCAG zoom issue:**
Strong finding. This is a genuine accessibility violation hiding in existing code that the spec should flag for cleanup.

**On test strategy (GPT + Gemini consensus):**
Valid. The spec should at minimum note key testable features even if detailed test plans come during implementation planning.

---

## Ambiguities Summary

| # | Issue | Ambiguity | Options |
|---|-------|-----------|---------|
| 1 | Route groups (#9) | Keep (app) group or flatten? | A: Keep for layout separation / B: Flatten to match brief |
| 2 | Analytics (#12) | Keep both or consolidate? | A: Both (Vercel vitals + Plausible traffic) / B: Plausible only |
| 3 | Content structure (#10) | Directory-based or flat? | A: Directory (better for co-located images) / B: Flat (simpler) |

---

## Summary

- **Total Issues:** 28 (0 critical, 6 high, 9 medium, 13 low)
- **Ambiguities Requiring Decision:** 3
- **Model Agreement Rate:** 5 of 28 issues flagged by 2+ models (18%)
- **Models That Failed:** Gemini 3 Pro hit 429 rate limits but eventually succeeded after retries
- **Gemini Note:** Gemini found the fewest issues (3) and rated the spec "exceptionally high quality" and "APPROVED". Opus was the most thorough reviewer (19 issues). GPT provided strong codebase-vs-spec gap analysis (12 issues).
