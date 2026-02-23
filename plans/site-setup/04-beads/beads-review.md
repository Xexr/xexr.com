# Beads Review: site-setup

**Generated:** 2026-02-23
**Reviewers:** Forward (plan→beads), Reverse (beads→plan), Dependencies (graph integrity)

---

## Summary

| Category | P0 | P1 | P2 | Total |
|----------|----|----|----|----|
| Coverage Gaps | 0 | 0 | 4 | 4 |
| Conversion Scope Creep | 0 | 0 | 0 | 0 |
| Dependency Errors | 1 | 0 | 0 | 1 |
| Content Fidelity | 0 | 0 | 0 | 0 |
| **Total** | **1** | **0** | **4** | **5** |

---

## P0 Findings (Must Fix)

### 1. Task 1.6 missing dependency on Task 1.2
- **Category:** Dependency Error
- **Found by:** Dependencies
- **What:** Task 1.6 (App layout cleanup) has no dependency on Task 1.2 (Clean environment variables), but the plan explicitly states "Dependencies: 1.2 (env.ts cleanup removes tRPC env vars)". The tRPC provider removal in the app layout file is logically coupled to env.ts cleanup — the tRPC client imports from env.ts. Running 1.6 before 1.2 causes a type error or runtime env validation failure.
- **Evidence:** Plan §1.6 lists 1.2 as an explicit dependency. The beads snapshot shows 1.6 with "no deps". The ready queue incorrectly includes 1.6 (16 tasks instead of 15).
- **Fix command(s):**
  ```bash
  bd dep add xr-lfk.1.2 xr-lfk.1.6
  ```

---

## P1 Findings (Should Fix)

None.

---

## P2 Findings (Consider)

### 2. Task 1.8 — Missing .gitignore clarification note
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** The plan mentions "Add `content/` to `.gitignore` exclusion if needed" (clarifying that content is committed, not ignored). The bead omits this note. The intent is clear from the `.velite/` gitignore AC item.
- **Fix suggestion:** Non-blocking. Implementer can infer from context. No action needed.

### 3. Task 2.5 — MDXImage blur placeholder and Callout dual-export details
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** MDXImage blur placeholder implementation approach (`plaiceholder` vs Next.js built-in) not specified in bead key details. Callout's `calloutVariants` export pattern (the dual-export CVA convention from `button.tsx`) not explicitly stated — only `data-slot` is mentioned. AC items are preserved; these are implementation guidance gaps.
- **Fix suggestion:** Minor. Implementer should reference the plan for blur placeholder approach choice. The AC "All components follow CVA/`data-slot` patterns from button.tsx" covers the dual-export by reference.

### 4. Task 3.7 — IIFE code snippet missing from bead
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** The plan includes the full IIFE code snippet as a concrete implementation starting point. The bead captures the refined approach (only set `--accent`, let CSS `color-mix` handle variants) but omits the code snippet. All 4 AC items are preserved.
- **Fix suggestion:** Minor. Implementer must consult the plan document for the starter IIFE code. The approach is correctly described; only the example code is missing.

### 5. Testing strategy cross-cutting details
- **Category:** Coverage Gap
- **Found by:** Forward
- **What:** Vitest environment (`node`) and `SKIP_ENV_VALIDATION=true` flag from the plan's Cross-Cutting Testing Strategy section are not surfaced in the 5.6 or 5.7 bead key details. Coverage thresholds were correctly pulled into AC items.
- **Fix suggestion:** Minor. These are environment configuration details the implementer will discover from existing `vitest.config.ts`. No action needed.

---

## Parallelism Report

- **Dependency waves:** 6
- **Maximum parallel width:** 15 beads (Wave 1)
- **Critical path:** 6 beads (`1.1 → 1.7 → 2.1 → 2.2 → 4.2 → 4.1`)
- **Corrected ready queue (15 tasks after P0 fix):**
  1.1, 1.2, 1.3, 1.4, 1.8, 2.3, 2.4, 3.1, 3.2, 3.8, 4.5, 4.7, 5.2, 5.4, 5.9

### Dependency Waves (with P0 fix applied)

| Wave | Beads | Count |
|------|-------|-------|
| 1 | 1.1, 1.2, 1.3, 1.4, 1.8, 2.3, 2.4, 3.1, 3.2, 3.8, 4.5, 4.7, 5.2, 5.4, 5.9 | 15 |
| 2 | 1.5, 1.6, 1.7, 3.3, 3.5, 5.6, 5.10 | 7 |
| 3 | 2.1, 3.4, 3.6, 3.7, 3.9 | 5 |
| 4 | 2.2, 2.5 | 2 |
| 5 | 4.2, 4.4, 4.6, 5.1, 5.3, 5.5, 5.7 | 7 |
| 6 | 4.1, 4.3, 5.8 | 3 |

## Coverage Summary

**Forward (Plan→Beads):**
- Fully matched: 35 tasks
- Partially matched: 4 tasks (minor P2 gaps only)
- No matching bead: 0 tasks

**Reverse (Beads→Plan):**
- Plan-backed: 44 beads
- Plan-implied: 1 bead (5.10 — acceptable)
- Scope creep: 0 beads

**Dependencies:**
- Correctly constrained: 36
- Missing blockers: 1 (P0 — 1.6 → 1.2)
- Over-constrained: 0
