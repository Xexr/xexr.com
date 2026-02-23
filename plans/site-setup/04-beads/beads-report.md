# Beads Report: site-setup

**Generated:** 2026-02-23
**Source plan:** plans/site-setup/03-plan/plan.md
**Last updated:** 2026-02-23 (post-consolidation)

---

## Creation Summary

| Level | Count |
|-------|-------|
| Feature epic | 1 |
| Phase sub-epics | 5 |
| Task issues (open) | 30 |
| Task issues (closed/merged) | 9 |
| Blocker dependencies | 28 |
| Ready immediately (no blockers) | 11 |

---

## Consolidation History

Original plan had 39 tasks. Two rounds of consolidation reduced to 30 execution units:

**Round 1 — Review fixes (2 merges):**
- 1.5 absorbed 3.7 (Root layout + Vibe blocking script — same file: `layout.tsx`)
- 1.8 absorbed 5.9 (Content directory + sample content — same file: `hello-world/index.mdx`)

**Round 2 — Execution optimization (7 merges):**
- 1.1 absorbed 1.2, 1.3 → "Foundation config cleanup" (3 XS config edits)
- 1.7 absorbed 1.6 → "Next.js config and app layout cleanup" (both Wave 2 config)
- 3.2 absorbed 3.3 → "Desktop navigation" (Header + MainNav sequential chain)
- 3.5 absorbed 3.9 → "StatusBar and ReturnToTop" (3.9 was 5-line follow-up)
- 2.1 absorbed 2.2 → "Content pipeline" (Velite config + content helpers inseparable)
- 4.2 absorbed 4.3 → "Blog listing" (PostCard/PostList + index page wrapper)
- 4.5 absorbed 4.7 → "Static content pages" (About + Now — identical pattern)

---

## Bead ID Mapping

| Plan Reference | Bead ID | Type | Title | Status |
|---------------|---------|------|-------|--------|
| Feature | xr-lfk | epic | site-setup | open |
| Phase 1 | xr-lfk.1 | epic | Phase 1: Foundation & Infrastructure Cleanup | open |
| Tasks 1.1+1.2+1.3 | xr-lfk.1.1 | task | Foundation config cleanup | open |
| ~~Task 1.2~~ | ~~xr-lfk.1.2~~ | ~~task~~ | ~~Clean environment variables~~ | merged → 1.1 |
| ~~Task 1.3~~ | ~~xr-lfk.1.3~~ | ~~task~~ | ~~Update site configuration~~ | merged → 1.1 |
| Task 1.4 | xr-lfk.1.4 | task | CSS token migration | open |
| Tasks 1.5+3.7 | xr-lfk.1.5 | task | Root layout rewrite | open |
| ~~Task 1.6~~ | ~~xr-lfk.1.6~~ | ~~task~~ | ~~App layout cleanup~~ | merged → 1.7 |
| Tasks 1.7+1.6 | xr-lfk.1.7 | task | Next.js config and app layout cleanup | open |
| Tasks 1.8+5.9 | xr-lfk.1.8 | task | Content initialization | open |
| Phase 2 | xr-lfk.2 | epic | Phase 2: Content Pipeline & Shared Abstractions | open |
| Tasks 2.1+2.2 | xr-lfk.2.1 | task | Content pipeline | open |
| ~~Task 2.2~~ | ~~xr-lfk.2.2~~ | ~~task~~ | ~~Content helper module~~ | merged → 2.1 |
| Task 2.3 | xr-lfk.2.3 | task | Vibe colour utilities | open |
| Task 2.4 | xr-lfk.2.4 | task | Extend metadata helpers | open |
| Task 2.5 | xr-lfk.2.5 | task | MDX components | open |
| Phase 3 | xr-lfk.3 | epic | Phase 3: Components & Interactive Features | open |
| Task 3.1 | xr-lfk.3.1 | task | Footer component | open |
| Tasks 3.2+3.3 | xr-lfk.3.2 | task | Desktop navigation | open |
| ~~Task 3.3~~ | ~~xr-lfk.3.3~~ | ~~task~~ | ~~MainNav update~~ | merged → 3.2 |
| Task 3.4 | xr-lfk.3.4 | task | Mobile navigation drawer | open |
| Tasks 3.5+3.9 | xr-lfk.3.5 | task | StatusBar and ReturnToTop | open |
| Task 3.6 | xr-lfk.3.6 | task | VibeDrawer component | open |
| ~~Task 3.7~~ | ~~xr-lfk.3.7~~ | ~~task~~ | ~~Vibe blocking script~~ | merged → 1.5 |
| Task 3.8 | xr-lfk.3.8 | task | Particle canvas | open |
| ~~Task 3.9~~ | ~~xr-lfk.3.9~~ | ~~task~~ | ~~ReturnToTop repositioning~~ | merged → 3.5 |
| Phase 4 | xr-lfk.4 | epic | Phase 4: Page Routes | open |
| Task 4.1 | xr-lfk.4.1 | task | Homepage | open |
| Tasks 4.2+4.3 | xr-lfk.4.2 | task | Blog listing | open |
| ~~Task 4.3~~ | ~~xr-lfk.4.3~~ | ~~task~~ | ~~Blog index page~~ | merged → 4.2 |
| Task 4.4 | xr-lfk.4.4 | task | Post page | open |
| Tasks 4.5+4.7 | xr-lfk.4.5 | task | Static content pages | open |
| Task 4.6 | xr-lfk.4.6 | task | Projects page | open |
| ~~Task 4.7~~ | ~~xr-lfk.4.7~~ | ~~task~~ | ~~Now page~~ | merged → 4.5 |
| Phase 5 | xr-lfk.5 | epic | Phase 5: SEO, Feeds, Testing & Polish | open |
| Task 5.1 | xr-lfk.5.1 | task | Sitemap rewrite | open |
| Task 5.2 | xr-lfk.5.2 | task | Robots.txt cleanup | open |
| Task 5.3 | xr-lfk.5.3 | task | 404 page redesign | open |
| Task 5.4 | xr-lfk.5.4 | task | OG image route rebrand | open |
| Task 5.5 | xr-lfk.5.5 | task | RSS feed | open |
| Task 5.6 | xr-lfk.5.6 | task | Unit tests for vibe utilities | open |
| Task 5.7 | xr-lfk.5.7 | task | Unit tests for content helpers | open |
| Task 5.8 | xr-lfk.5.8 | task | Accessibility audit | open |
| ~~Task 5.9~~ | ~~xr-lfk.5.9~~ | ~~task~~ | ~~Sample content and final cleanup~~ | merged → 1.8 |
| Task 5.10 | xr-lfk.5.10 | task | Dead link checking in CI | open |

---

## Dependency Graph

```
Phase 1: Foundation & Infrastructure Cleanup
  1.1 Foundation config cleanup (blocks) ──→ 1.5, 1.7, 2.1
  1.4 CSS token migration (blocks) ──→ 1.5
  1.5 Root layout rewrite (terminal — includes Vibe blocking script)
  1.7 Next.js config + app layout (blocks) ──→ 1.5, 2.1
  1.8 Content initialization (blocks) ──→ 2.1, 5.8, 5.10

Phase 2: Content Pipeline & Shared Abstractions
  2.1 Content pipeline (blocks) ──→ 2.5, 4.1, 4.2, 4.4, 4.6, 5.1, 5.3, 5.5, 5.7
  2.3 Vibe colour utilities (blocks) ──→ 3.5, 3.6, 5.6
  2.4 Extend metadata helpers (blocks) ──→ 4.4
  2.5 MDX components (blocks) ──→ 4.4

Phase 3: Components & Interactive Features
  3.1 Footer component (independent)
  3.2 Desktop navigation (blocks) ──→ 3.4
  3.4 Mobile navigation drawer (terminal)
  3.5 StatusBar and ReturnToTop (blocks) ──→ 3.6
  3.6 VibeDrawer component (terminal)
  3.8 Particle canvas (blocks) ──→ 4.1

Phase 4: Page Routes
  4.1 Homepage (terminal)
  4.2 Blog listing (blocks) ──→ 4.1
  4.4 Post page (blocks) ──→ 5.8
  4.5 Static content pages (independent)
  4.6 Projects page (terminal)

Phase 5: SEO, Feeds, Testing & Polish
  5.1 Sitemap rewrite (terminal)
  5.2 Robots.txt cleanup (independent)
  5.3 404 page redesign (terminal)
  5.4 OG image route rebrand (independent)
  5.5 RSS feed (terminal)
  5.6 Unit tests for vibe utilities (blocks) ──→ 5.8
  5.7 Unit tests for content helpers (blocks) ──→ 5.8
  5.8 Accessibility audit (terminal)
  5.10 Dead link checking in CI (terminal)
```

Critical path: 1.1 → 1.7 → 2.1 → 4.2 → 4.1 — 5 steps

---

## Dependency Waves

| Wave | Beads | Count |
|------|-------|-------|
| 1 | 1.1, 1.4, 1.8, 2.3, 2.4, 3.1, 3.2, 3.8, 4.5, 5.2, 5.4 | 11 |
| 2 | 1.5, 1.7, 3.4, 3.5, 5.6, 5.10 | 6 |
| 3 | 2.1, 2.5, 3.6 | 3 |
| 4 | 4.2, 4.4, 4.6, 5.1, 5.3, 5.5, 5.7 | 7 |
| 5 | 4.1, 5.8 | 2 |

Maximum parallel width: 11 (Wave 1)
Total waves: 5

---

## Ready Queue

Items with no blockers (can start immediately):

| Bead ID | Title | Phase |
|---------|-------|-------|
| xr-lfk.1.1 | Foundation config cleanup | Phase 1 |
| xr-lfk.1.4 | CSS token migration | Phase 1 |
| xr-lfk.1.8 | Content initialization | Phase 1 |
| xr-lfk.2.3 | Vibe colour utilities | Phase 2 |
| xr-lfk.2.4 | Extend metadata helpers | Phase 2 |
| xr-lfk.3.1 | Footer component | Phase 3 |
| xr-lfk.3.2 | Desktop navigation | Phase 3 |
| xr-lfk.3.8 | Particle canvas | Phase 3 |
| xr-lfk.4.5 | Static content pages | Phase 4 |
| xr-lfk.5.2 | Robots.txt cleanup | Phase 5 |
| xr-lfk.5.4 | OG image route rebrand | Phase 5 |

---

## Integration Branch

Feature epic: xr-lfk
Integration branch: integration/site-setup

---

## Summary

- Feature epic: 1
- Sub-epics (phases): 5
- Open task beads: 30
- Closed/merged task beads: 9
- Blocker dependencies: 28
- Items ready immediately: 11
- Dependency waves: 5
- Critical path: 5 steps
- Plan coverage: 100% (all 39 plan tasks accounted for in 30 beads)
