# Brainstorming Answers: site-setup

## Status
- **Molecule:** xr-wisp-wisp-bmhz (spec-workflow)
- **Current step:** xr-wisp-wisp-12ij (Brainstorming dialogue) — COMPLETE
- **Progress:** 10/24 molecule steps complete
- **Interview progress:** All 3 rounds complete. 44 human answers collected + 97 auto-answers.

---

## Round 1: Core Mental Model (all answered)

| # | Question | Answer |
|---|----------|--------|
| Q23 | Site identity | **Blog-first** — Writing is the centrepiece. Posts drive SEO, social sharing, and reputation. Projects/About are supporting context. |
| Q10 | Primary audience | **Developer peers** — Other devs, indie hackers, AI practitioners. They value technical depth, honest takes, and real experience. |
| Q24 | xexr vs Dane Poyzer | **Personal handle/alias** — xexr = Dane. Online identity. Byline is "Dane Poyzer", brand is "xexr". |
| Q5 | Homepage CTA | **Read a featured post** — Optimise for engagement. Get visitors into best content immediately. |
| Q18 | Post-reading primary action | **Subscribe to newsletter** — Capture them now. Reading one post means they're warm. |
| Q55 | Vibe system purpose | **Brand differentiator** — Signals craft and taste. "This developer cares about details." |
| Q9 | MVP scope vs timeline | **1 week is achievable** — Full MVP as specified in the brief, done in 1 week. |
| Q67 | Content strategy | **Audience-driven** — Write for community (Twitter, Gastown, indie hackers). Share socially. Growth via word of mouth. |

## Round 2: Cascaded Confirmations (all answered)

| # | Question | Answer |
|---|----------|--------|
| Q8 | Post page as primary design focus | **Yes** (cascaded from blog-first identity) |
| Q28 | Navigation structure | **4-5 items in header** — More than 3, wants slightly more discoverable nav. |
| Q28b | Specific header pages | **Posts, About, Projects, Now** — Uses/Bookshelf/Colophon in footer only. |
| Q7 | Ship placeholder pages or hide | **Ship what's ready, hide the rest** — Only show pages with real content. Add others as populated. |
| Q33 | Hero height | **Partial with content peek (~60-70vh)** — Particles + name + descriptor, featured posts visible below. |
| Q52 | About page style | **Narrative-first** — Tell the story. ACA → tech → indie hacker. Show personality. |
| Q44 | Vibe button placement | **Status bar at bottom (as in brief)** — Dedicated status bar with Vibe pill. Distinctive. |
| Q6 | Subscribe mechanism | **Substack redirect (simplest)** — Link opens Substack page. Zero implementation. |
| Q26 | Publishing cadence | **2x per month** — Roughly every 2 weeks. Sustainable pace for quality long-form. |
| Q17 | First-time social visitor flow | Post → Subscribe CTA → Next/prev posts → **About page link** as tertiary action. |
| Q58 | Definition of "shipped" | **Deployed + first post live** — Site on Vercel, one real post published, linked from social profiles. |
| Q60 | Design success evaluation | **Personal satisfaction** — You know quality when you see it. If it feels right, it's right. |
| Q21 | Empty state for n=1 posts | **Single "Latest" section, no labels** — Show the post without "Featured" or "Recent" labels. |

## Round 3: Standalone Branch Points

### Batch 1 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q4 | Dark-only acceptable | **Yes, commit to dark** — Vibe system IS the personalisation story. Accept the trade-off. |
| Q56 | Building in public definition | **Process blogging** — Write about what you're building and learning. The blog IS the public building. |
| Q92 | Hero descriptor animation | **Static text** — Clean, fast, accessible. |
| Q98 | Blog index density | **Compact list** — Like chrisgregori.dev. Title, date, tags, reading time. Efficient scanning. |

### Batch 2 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q96 | Projects page layout | **Stacked list** — Full-width rows with title, description, tech stack, status. Works well even with 1-2 projects. |
| Q140 | Failed/abandoned projects | **Show with honest status** — List with status badge ('Shelved', 'Archived'). Aligns with building-in-public ethos. |
| Q74 | Now page archiving | **Git history is enough** — Replace content on update. Git preserves old versions. No UI for archives. |
| Q75 | Bookshelf external links | **Link to neutral source** — OpenLibrary, Goodreads, or publisher pages. Helpful, no commercial implications. |

### Batch 3 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q115 | Indie hacker definition | **Solo builder shipping products** — Build and ship real products as a solo dev. Revenue is a goal, even if secondary. |
| Q116 | AI content depth | **Practitioner-level** — Practical tutorials and opinions for devs integrating AI. 'Here's what I built and learned.' |
| Q117 | xexr.com vs products | **Personal hub, products are portfolio items** — xexr.com is about you. Products appear on Projects page. Their own sites handle marketing. |
| Q135 | Low-output strategy | **Silence is fine** — No apologies, no filler. Now page explains what you're up to. Content resumes when it resumes. |

### Batch 4 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q137 | Family content boundaries | **Occasional colour** — Brief mentions adding personality. Never the main topic. No names or photos of family. |
| Q139 | Controversial AI stance | **Take strong positions** — Say what you think. Authentic, accept disagreement. |
| Q66 | Staleness handling | **Dates only on Now page** — Now page gets a date (freshness is its point). Other evergreen pages stand without timestamps. |
| Q94 | Colophon perf stats | **No, too much maintenance** — Stick to tech stack, tools, and design philosophy. No performance numbers. |

### Batch 5 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q105 | Hover effects | **Accent-driven feedback** — Hover triggers accent colour transitions. Borders light up, backgrounds shift. Vibe colour comes alive on interaction. |
| Q79 | Returning reader new-content | **RSS/newsletter is enough** — No in-site visit tracking or 'New' badges. Zero implementation. |
| Q81 | Shareable Vibe URLs | **Not for MVP** — Fun idea but adds complexity. Build later if there's demand. |
| Q78 | Recruiter optimisation | **Subtle professional signals** — About and Projects structured enough for professional assessment, but don't compromise personal voice. |

### Batch 6 (answered)

| # | Question | Answer |
|---|----------|--------|
| Q111 | Credibility evaluation flow | **Structured journey** — About explicitly guides: 'See what I've built' → Projects, 'Read my thinking' → Posts. Clear CTAs for evaluators. |
| Q112 | Projects-to-Posts cross-linking | **Tag-based discovery** — Projects and posts share tags. Clicking a tag shows all related content. Automatic, less manual curation. |

---

## Cascaded Inferences (from all rounds)

These follow logically from the answers above:

1. **Post page is primary design focus** — Social links drive users to posts, not homepage
2. **Nav: Posts, About, Projects, Now in header** — Uses, Bookshelf, Colophon in footer
3. **Subscribe CTA gets prime placement** — Below post content, above comments, above next/prev
4. **Vibe needs subtle first-visit discoverability** — A gentle pulse/glow on the status bar pill, no modal
5. **Shareable Vibe URLs are post-MVP** (since purpose is brand, not engagement) — confirmed by Q81
6. **Content cadence ~2x/month** — Audience-driven, no strict schedule pressure
7. **"Shipped" = deployed on Vercel + one real post live**
8. **Hidden pages at launch** — Only show pages with actual content. Reduces nav clutter.
9. **Hero is partial viewport** (~60-70vh) with content peeking below
10. **Projects page scales from 1** — Stacked list works with any count, honest status badges on all projects
11. **Vibe system is interactive** — Accent-driven hover effects make the colour choice feel alive across the whole site
12. **About page as credibility hub** — Narrative-first with structured CTAs guiding to Projects and Posts
13. **Content cross-discovery via tags** — Tags bridge Projects and Posts automatically
14. **Dark Reader meta lock needed** — Dark-only commitment means preventing double-inversion
15. **No maintenance obligations** — No perf stats, no evergreen page dates, no new-content badges. Low upkeep by design.

---

## Auto-Answered Questions (97 total)

Full auto-answers are preserved in: `plans/site-setup/01-scope/question-triage.md`

Key auto-answers include:
- WCAG AA contrast enforcement on Vibe colours
- prefers-reduced-motion disables particles/transitions
- Secondary text #555555 → lighten to #8a8a8a+
- localStorage fallback to default mint
- Blocking script in head prevents colour flash
- Sticky ToC in right margin (1200px+), collapsible on mobile
- Tag filtering: client-side with URL query sync
- Code copy strips all decorative elements
- Shiki runs at build time (no loading state)
- Draft posts excluded at build time (404)
