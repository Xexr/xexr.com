# Plan Review: site-setup

**Generated:** 2026-02-23
**Reviewers:** Forward (spec→plan), Reverse (plan→spec), Context (plan→codebase)

---

## Summary

| Category | P0 | P1 | P2 | Total |
|----------|----|----|----|----|
| Coverage Gaps | 0 | 3 | 4 | 7 |
| Scope Creep | 0 | 0 | 1 | 1 |
| Codebase Misalignment | 0 | 2 | 1 | 3 |
| Consistency Issues | 0 | 0 | 0 | 0 |
| **Total** | **0** | **5** | **6** | **11** |

**Verdict:** All findings resolved. Zero P0. Five P1 findings fixed in plan (dead link CI, forced-colors CSS, scanline overlay, build script, error.tsx). Three actionable P2 findings fixed (Shiki accent theme, Vibe reset, Lighthouse 90+). One P2 already addressed during P1 fixes (letter-spacing). Two P2s accepted as-is (canonical field, VibePreset type). Plan now has 39 tasks across 5 phases with full spec coverage.

---

## P1 Findings (Should Fix)

### 1. Dead link CI check — no implementation task
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec auto-answers explicitly require "Dead link checking via CI (lychee or similar)." No plan task addresses this. Not in Out of Scope, not deferred.
- **Action:** Update plan — add task to Phase 5
- **Recommendation:** Add task 5.10: "Set up dead link checking in CI" — install lychee or similar, add to build/CI pipeline. Lightweight task.
- **Resolution:** FIXED — Task 5.10 added to plan.

### 2. `@media (forced-colors: active)` CSS — no implementation task
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec error handling requires `@media (forced-colors: active)` for readability in forced-colours mode (Windows High Contrast). Plan covers `darkreader-lock` meta but never writes the forced-colors media query. Not listed in 5.8 audit acceptance criteria either.
- **Action:** Update plan — add to task 1.4 (CSS tokens) or 5.8 (accessibility audit)
- **Recommendation:** Add forced-colors media query to task 1.4 acceptance criteria. Add verification to 5.8 audit checklist.
- **Resolution:** FIXED — Added to task 1.4 key details and acceptance criteria; added verification to task 5.8 audit checklist.

### 3. Scanline overlay — audited but never built
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec visual design requires "Scanlines: extremely subtle repeating gradient overlay, `pointer-events: none`, `aria-hidden`." Task 5.8 verifies `pointer-events: none` on scanline overlay, implying it exists — but no task creates the CSS. The overlay is referenced as something to audit but is never implemented.
- **Action:** Update plan — add scanline implementation to task 1.4 (CSS) or a new task
- **Recommendation:** Add scanline CSS to task 1.4 acceptance criteria: "Scanline overlay utility class defined with repeating gradient, `pointer-events: none`, `aria-hidden` on the element." The overlay is a `@layer utilities` addition to globals.css and a DOM element in the root layout.
- **Resolution:** FIXED — Scanline CSS added to task 1.4; DOM element added to task 1.5.

### 4. `build` script not updated for Velite/webpack
- **Category:** Codebase Misalignment
- **Found by:** Context
- **What:** Plan updates dev script to `--webpack` and references `pnpm build:webpack` throughout, but the plain `pnpm build` script (Turbopack) is not addressed. CI/Vercel may default to `pnpm build` which will fail when Velite requires webpack.
- **Action:** Update plan — task 1.1 should update the main `build` script
- **Recommendation:** In task 1.1, change `"build"` script to `"next build --webpack"` (or alias it to `build:webpack`). This prevents accidental Turbopack builds in CI.
- **Resolution:** FIXED — Task 1.1 now sets `"build": "next build --webpack"` with acceptance criterion.

### 5. `error.tsx` styling not updated
- **Category:** Codebase Misalignment
- **Found by:** Context
- **What:** Root error boundary `src/app/error.tsx` uses Card components and will render with styling inconsistent with the new dark palette. Plan redesigns `not-found.tsx` but does not update `error.tsx`.
- **Action:** Update plan — add error.tsx update to Phase 5
- **Recommendation:** Add a line to task 5.9 (cleanup) or create a small task: update `error.tsx` styling to match new dark palette and accent colours.
- **Resolution:** FIXED — Added to task 5.9 with file, key details, and acceptance criterion.

---

## P2 Findings (Consider)

### 6. Shiki custom theme — accent-coloured string literals
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec requires "syntax highlighting independent of Vibe — accent used for string literals only." Achieving this requires a custom Shiki theme that uses `var(--accent)` for string tokens. Plan covers line highlighting with `--accent-dim` but does not address string literal colouring.
- **Recommendation:** Add note to task 2.1 (Velite config): configure custom Shiki theme that maps string token colour to `var(--accent)`. Open question in spec acknowledges this needs tuning.
- **Resolution:** FIXED — Added custom Shiki theme requirement to task 2.1 key details and acceptance criteria.

### 7. Vibe "Reset" state not in acceptance criteria
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec defines three named Vibe states: Default (mint), Customised (colour dot), Reset (back to mint). Task 3.6 does not list a Reset button/action in acceptance criteria.
- **Recommendation:** Add to task 3.6 acceptance criteria: "Reset to default mint is available (e.g., a reset button in the drawer or re-selecting the Mint preset)."
- **Resolution:** FIXED — Added reset detail and acceptance criterion to task 3.6.

### 8. Lighthouse 90+ target absent from plan
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec states "Lighthouse target: 90+ for launch." No plan task sets this as an acceptance criterion or verification step.
- **Recommendation:** Add to Phase 5 exit criteria: "Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO."
- **Resolution:** FIXED — Added to Phase 5 exit criteria.

### 9. Letter-spacing spec not propagated
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Spec typography: "tight letter-spacing (-1.5px in em units for zoom scaling)." Plan mentions tight letter-spacing but does not specify the exact value/unit.
- **Recommendation:** Add note to task 1.4: heading letter-spacing should be `-0.05em` (approximately -1.5px at 30px font size, using em for zoom scaling).
- **Resolution:** FIXED — Already addressed during P1-3 fix (added `-0.05em` to task 1.4).

### 10. `canonical` field in metadata — minor gold-plating
- **Category:** Scope Creep
- **Found by:** Reverse
- **What:** The `canonical` field in `generatePageMetadata` (task 2.4) is not explicitly listed in the spec as a metadata requirement. It is implied by Flow 5 (Substack cross-posting with canonical URL).
- **Recommendation:** Accept as-is. One optional field with zero overhead, directly supports the Substack cross-posting workflow described in the spec.
- **Resolution:** Accepted as-is — zero overhead, supports spec Flow 5.

### 11. `VibePreset` type omits `oklch` field
- **Category:** Codebase Misalignment
- **Found by:** Context
- **What:** Plan defines `VibePreset` as `{ name: string; hex: string }`. Context documents a third `oklch: string` field for the perceptual slider. Plan exports `hexToOklch()` / `oklchToHex()` so the value can be derived, but the type diverges.
- **Recommendation:** Accept as-is. Deriving OKLCh from hex avoids storing redundant data. The `hexToOklch()` function covers the spectrum slider use case.
- **Resolution:** Accepted as-is — derived at runtime, avoids redundant stored data.

---

## Coverage Summary

**Forward (Spec→Plan):**
- Spec sections reviewed: 28
- Fully covered: 24
- Partially covered: 3 (Performance/SEO, Visual Design Spacing, Open Questions)
- Not covered: 1 (Uses/Bookshelf/Colophon — intentionally deferred)

**Reverse (Plan→Spec):**
- Plan tasks reviewed: 27
- Spec-backed: 20
- Spec-implied: 5
- Infrastructure: 1
- Scope creep: 0
- Gold-plating: 0 (1 P2 accepted)

**Context Alignment:**
- Architecture decisions checked: 12
- Aligned: 12 (all decisions consistent with codebase reality)
- Contradicts: 0 (one ambiguity on ThemeToggle file location — plan guards with "if it exists")
- Integration points missed: 2 (error.tsx, build script)
