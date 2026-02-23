# Beads Review: site-setup

**Generated:** 2026-02-23
**Reviewers:** Forward (plan→beads), Reverse (beads→plan), Dependencies (graph integrity)
**Status:** Superseded by post-review consolidation (see below)

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
- **What:** Task 1.6 (App layout cleanup) has no dependency on Task 1.2 (Clean environment variables), but the plan explicitly states "Dependencies: 1.2 (env.ts cleanup removes tRPC env vars)".
- **Resolution:** Fixed — dep added. Subsequently both 1.2 and 1.6 were merged into other beads (1.2 → 1.1, 1.6 → 1.7), making this moot.

---

## P2 Findings (Consider)

### 2. Task 1.8 — Missing .gitignore clarification note
- **Resolution:** No action needed. Non-blocking.

### 3. Task 2.5 — MDXImage blur placeholder and Callout dual-export details
- **Resolution:** No action needed. AC items preserved; implementer references plan.

### 4. Task 3.7 — IIFE code snippet missing from bead
- **Resolution:** 3.7 merged into 1.5. Implementer consults plan for starter code.

### 5. Testing strategy cross-cutting details
- **Resolution:** No action needed. Discoverable from existing vitest.config.ts.

---

## Post-Review Consolidation

After review, 9 beads were merged to reduce execution units (each triggers a full build+test cycle):

| Merge | Survivor | Absorbed | Rationale |
|-------|----------|----------|-----------|
| Round 1 | xr-lfk.1.5 | 3.7 | Same file: layout.tsx |
| Round 1 | xr-lfk.1.8 | 5.9 | Same file: hello-world/index.mdx |
| Round 2 | xr-lfk.1.1 | 1.2, 1.3 | XS config edits, same wave |
| Round 2 | xr-lfk.1.7 | 1.6 | Both Wave 2 config cleanup |
| Round 2 | xr-lfk.3.2 | 3.3 | Header + MainNav sequential chain |
| Round 2 | xr-lfk.3.5 | 3.9 | 5-line follow-up to StatusBar |
| Round 2 | xr-lfk.2.1 | 2.2 | Velite config + content helpers inseparable |
| Round 2 | xr-lfk.4.2 | 4.3 | PostList + index page wrapper |
| Round 2 | xr-lfk.4.5 | 4.7 | Both hardcoded narrative pages |

**Result:** 39 → 30 task beads. 5 waves (was 6). 11 ready immediately (was 15/16).

---

## Updated Parallelism Report

| Wave | Beads | Count |
|------|-------|-------|
| 1 | 1.1, 1.4, 1.8, 2.3, 2.4, 3.1, 3.2, 3.8, 4.5, 5.2, 5.4 | 11 |
| 2 | 1.5, 1.7, 3.4, 3.5, 5.6, 5.10 | 6 |
| 3 | 2.1, 2.5, 3.6 | 3 |
| 4 | 4.2, 4.4, 4.6, 5.1, 5.3, 5.5, 5.7 | 7 |
| 5 | 4.1, 5.8 | 2 |

- **Critical path:** 1.1 → 1.7 → 2.1 → 4.2 → 4.1 (5 steps, was 6)
- **Max parallel width:** 11 (Wave 1)
