# Beads Report: site-setup

**Generated:** 2026-02-23
**Source plan:** plans/site-setup/03-plan/plan.md

---

## Creation Summary

| Level | Count |
|-------|-------|
| Feature epic | 1 |
| Phase sub-epics | 5 |
| Task issues | 39 |
| Blocker dependencies | 37 |
| Ready immediately (no blockers) | 16 |

---

## Bead ID Mapping

| Plan Reference | Bead ID | Type | Title |
|---------------|---------|------|-------|
| Feature | xr-lfk | epic | site-setup |
| Phase 1 | xr-lfk.1 | epic | Phase 1: Foundation & Infrastructure Cleanup |
| Task 1.1 | xr-lfk.1.1 | task | Clean package.json dependencies |
| Task 1.2 | xr-lfk.1.2 | task | Clean environment variables |
| Task 1.3 | xr-lfk.1.3 | task | Update site configuration |
| Task 1.4 | xr-lfk.1.4 | task | CSS token migration |
| Task 1.5 | xr-lfk.1.5 | task | Root layout rewrite |
| Task 1.6 | xr-lfk.1.6 | task | App layout cleanup |
| Task 1.7 | xr-lfk.1.7 | task | Next.js config updates |
| Task 1.8 | xr-lfk.1.8 | task | Content directory structure |
| Phase 2 | xr-lfk.2 | epic | Phase 2: Content Pipeline & Shared Abstractions |
| Task 2.1 | xr-lfk.2.1 | task | Velite configuration |
| Task 2.2 | xr-lfk.2.2 | task | Content helper module |
| Task 2.3 | xr-lfk.2.3 | task | Vibe colour utilities |
| Task 2.4 | xr-lfk.2.4 | task | Extend metadata helpers |
| Task 2.5 | xr-lfk.2.5 | task | MDX components |
| Phase 3 | xr-lfk.3 | epic | Phase 3: Components & Interactive Features |
| Task 3.1 | xr-lfk.3.1 | task | Footer component |
| Task 3.2 | xr-lfk.3.2 | task | Header redesign |
| Task 3.3 | xr-lfk.3.3 | task | MainNav update |
| Task 3.4 | xr-lfk.3.4 | task | Mobile navigation drawer |
| Task 3.5 | xr-lfk.3.5 | task | StatusBar component |
| Task 3.6 | xr-lfk.3.6 | task | VibeDrawer component |
| Task 3.7 | xr-lfk.3.7 | task | Vibe blocking script |
| Task 3.8 | xr-lfk.3.8 | task | Particle canvas |
| Task 3.9 | xr-lfk.3.9 | task | ReturnToTop repositioning |
| Phase 4 | xr-lfk.4 | epic | Phase 4: Page Routes |
| Task 4.1 | xr-lfk.4.1 | task | Homepage |
| Task 4.2 | xr-lfk.4.2 | task | PostCard and PostList components |
| Task 4.3 | xr-lfk.4.3 | task | Blog index page |
| Task 4.4 | xr-lfk.4.4 | task | Post page |
| Task 4.5 | xr-lfk.4.5 | task | About page |
| Task 4.6 | xr-lfk.4.6 | task | Projects page |
| Task 4.7 | xr-lfk.4.7 | task | Now page |
| Phase 5 | xr-lfk.5 | epic | Phase 5: SEO, Feeds, Testing & Polish |
| Task 5.1 | xr-lfk.5.1 | task | Sitemap rewrite |
| Task 5.2 | xr-lfk.5.2 | task | Robots.txt cleanup |
| Task 5.3 | xr-lfk.5.3 | task | 404 page redesign |
| Task 5.4 | xr-lfk.5.4 | task | OG image route rebrand |
| Task 5.5 | xr-lfk.5.5 | task | RSS feed |
| Task 5.6 | xr-lfk.5.6 | task | Unit tests for vibe utilities |
| Task 5.7 | xr-lfk.5.7 | task | Unit tests for content helpers |
| Task 5.8 | xr-lfk.5.8 | task | Accessibility audit |
| Task 5.9 | xr-lfk.5.9 | task | Sample content and final cleanup |
| Task 5.10 | xr-lfk.5.10 | task | Dead link checking in CI |

---

## Dependency Graph

```
Phase 1: Foundation & Infrastructure Cleanup
  1.1 (deps) ──→ 1.5, 1.7, 2.1
  1.2 (independent)
  1.3 (independent)
  1.4 (deps) ──→ 1.5, 3.7
  1.5 (deps) ──→ 3.7
  1.6 (independent)
  1.7 (deps) ──→ 2.1, 3.7
  1.8 (deps) ──→ 2.1

Phase 2: Content Pipeline & Shared Abstractions
  2.1 (deps) ──→ 2.2, 2.5
  2.2 (deps) ──→ 4.1, 4.2, 4.3 (via 4.2), 4.4, 4.6, 5.1, 5.3, 5.5, 5.7
  2.3 (deps) ──→ 3.5, 3.6, 5.6
  2.4 (deps) ──→ 4.4
  2.5 (deps) ──→ 4.4

Phase 3: Components & Interactive Features
  3.1 (independent)
  3.2 (deps) ──→ 3.3, 3.4
  3.3 (deps) ──→ 3.4
  3.4 (terminal)
  3.5 (deps) ──→ 3.6, 3.9
  3.6 (terminal)
  3.7 (terminal)
  3.8 (deps) ──→ 4.1
  3.9 (terminal)

Phase 4: Page Routes
  4.1 (terminal)
  4.2 (deps) ──→ 4.1, 4.3
  4.3 (terminal)
  4.4 (deps) ──→ 5.8
  4.5 (independent)
  4.6 (terminal)
  4.7 (independent)

Phase 5: SEO, Feeds, Testing & Polish
  5.1 (terminal)
  5.2 (independent)
  5.3 (terminal)
  5.4 (independent)
  5.5 (terminal)
  5.6 (deps) ──→ 5.8
  5.7 (deps) ──→ 5.8
  5.8 (terminal)
  5.9 (deps) ──→ 5.8, 5.10
  5.10 (terminal)
```

Critical path: 1.1 → 1.7 → 2.1 → 2.2 → 4.2 → 4.1 (or 4.3) — 6 steps

---

## Ready Queue

Items with no blockers (can start immediately):

| Bead ID | Title | Phase |
|---------|-------|-------|
| xr-lfk.1.1 | Clean package.json dependencies | Phase 1 |
| xr-lfk.1.2 | Clean environment variables | Phase 1 |
| xr-lfk.1.3 | Update site configuration | Phase 1 |
| xr-lfk.1.4 | CSS token migration | Phase 1 |
| xr-lfk.1.6 | App layout cleanup | Phase 1 |
| xr-lfk.1.8 | Content directory structure | Phase 1 |
| xr-lfk.2.3 | Vibe colour utilities | Phase 2 |
| xr-lfk.2.4 | Extend metadata helpers | Phase 2 |
| xr-lfk.3.1 | Footer component | Phase 3 |
| xr-lfk.3.2 | Header redesign | Phase 3 |
| xr-lfk.3.8 | Particle canvas | Phase 3 |
| xr-lfk.4.5 | About page | Phase 4 |
| xr-lfk.4.7 | Now page | Phase 4 |
| xr-lfk.5.2 | Robots.txt cleanup | Phase 5 |
| xr-lfk.5.4 | OG image route rebrand | Phase 5 |
| xr-lfk.5.9 | Sample content and final cleanup | Phase 5 |

---

## Integration Branch

Feature epic: xr-lfk
Integration branch: integration/site-setup

---

## Coverage Verification

| Plan Task | Bead ID | Status |
|-----------|---------|--------|
| 1.1 Clean package.json dependencies | xr-lfk.1.1 | Created |
| 1.2 Clean environment variables | xr-lfk.1.2 | Created |
| 1.3 Update site configuration | xr-lfk.1.3 | Created |
| 1.4 CSS token migration | xr-lfk.1.4 | Created |
| 1.5 Root layout rewrite | xr-lfk.1.5 | Created |
| 1.6 App layout cleanup | xr-lfk.1.6 | Created |
| 1.7 Next.js config updates | xr-lfk.1.7 | Created |
| 1.8 Content directory structure | xr-lfk.1.8 | Created |
| 2.1 Velite configuration | xr-lfk.2.1 | Created |
| 2.2 Content helper module | xr-lfk.2.2 | Created |
| 2.3 Vibe colour utilities | xr-lfk.2.3 | Created |
| 2.4 Extend metadata helpers | xr-lfk.2.4 | Created |
| 2.5 MDX components | xr-lfk.2.5 | Created |
| 3.1 Footer component | xr-lfk.3.1 | Created |
| 3.2 Header redesign | xr-lfk.3.2 | Created |
| 3.3 MainNav update | xr-lfk.3.3 | Created |
| 3.4 Mobile navigation drawer | xr-lfk.3.4 | Created |
| 3.5 StatusBar component | xr-lfk.3.5 | Created |
| 3.6 VibeDrawer component | xr-lfk.3.6 | Created |
| 3.7 Vibe blocking script | xr-lfk.3.7 | Created |
| 3.8 Particle canvas | xr-lfk.3.8 | Created |
| 3.9 ReturnToTop repositioning | xr-lfk.3.9 | Created |
| 4.1 Homepage | xr-lfk.4.1 | Created |
| 4.2 PostCard and PostList components | xr-lfk.4.2 | Created |
| 4.3 Blog index page | xr-lfk.4.3 | Created |
| 4.4 Post page | xr-lfk.4.4 | Created |
| 4.5 About page | xr-lfk.4.5 | Created |
| 4.6 Projects page | xr-lfk.4.6 | Created |
| 4.7 Now page | xr-lfk.4.7 | Created |
| 5.1 Sitemap rewrite | xr-lfk.5.1 | Created |
| 5.2 Robots.txt cleanup | xr-lfk.5.2 | Created |
| 5.3 404 page redesign | xr-lfk.5.3 | Created |
| 5.4 OG image route rebrand | xr-lfk.5.4 | Created |
| 5.5 RSS feed | xr-lfk.5.5 | Created |
| 5.6 Unit tests for vibe utilities | xr-lfk.5.6 | Created |
| 5.7 Unit tests for content helpers | xr-lfk.5.7 | Created |
| 5.8 Accessibility audit | xr-lfk.5.8 | Created |
| 5.9 Sample content and final cleanup | xr-lfk.5.9 | Created |
| 5.10 Dead link checking in CI | xr-lfk.5.10 | Created |

**Plan tasks:** 39
**Beads created:** 39
**Coverage:** 100%

---

## Review Passes

| Pass | Result | Fixes Applied |
|------|--------|---------------|
| 1. Completeness | FAIL | 4 (missing criterion details, coverage thresholds, URL format, forgot-password URL) |
| 2. Dependencies | FAIL | 5 (2 false blockers removed, 3 missing blockers added) |
| 3. Clarity | FAIL | 9 (vague language, missing schema fields, unresolvable decisions, missing file paths) |

All findings resolved. Draft updated with all fixes before bead creation.
