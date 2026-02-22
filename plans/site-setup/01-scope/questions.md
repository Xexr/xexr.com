# Synthesized Question Backlog: site-setup

## Synthesis Methodology

### Raw Question Counts
| Model | User Advocate | Product Designer | Domain Expert | Total |
|-------|--------------|-----------------|---------------|-------|
| Opus | 58 | 67 | 17 | 142 |
| GPT | 48 | 48 | 12 | 108 |
| Gemini | 40 | 40 | 20 | 100 |
| **Raw Total** | **146** | **155** | **49** | **350** |

### After Deduplication
- Raw questions from all 9 analyses: **350**
- After deduplication (merging similar): **142**
- P0: **28** | P1: **42** | P2: **48** | P3: **24**
- P0 + P1 + P2 + P3 = **142** (matches unique count)

---

## Cross-Model Comparison by Perspective

### User Advocate

**All three models flagged (high confidence):**
- Vibe colour picker can produce unreadable/low-contrast combinations (all 3)
- Dark-only design excludes users with astigmatism or bright-environment needs (all 3)
- Particles/animations must respect `prefers-reduced-motion` (all 3)
- Substack redirect for subscription creates friction (all 3)
- Users arriving via social links land on post pages, not homepage (all 3)
- Code copy must strip decorative elements cleanly (all 3)
- Giscus requiring GitHub account excludes some visitors (all 3)
- localStorage failure must degrade gracefully for Vibe system (all 3)
- Placeholder/sparse pages erode credibility (all 3)
- Mobile touch interactions differ from hover-based design (all 3)

**Only one model flagged (worth attention):**
- OG image should reflect post hook, not just title (Opus)
- Vibe syntax highlighting could break standard code colour semantics (Gemini)
- "Now" page historical archiving vs ephemeral nature (Gemini)
- Bookshelf should link to purchase/review pages (Gemini)
- Print styles needed for dark-on-light printing (Opus)
- Scanline overlay may block text selection (Opus)
- Internal vs external link visual distinction (Gemini)
- Reading progress/re-entry cues for interrupted sessions (GPT)

**Where models disagreed:**
- Opus was most concerned about post page as primary first impression over homepage; GPT and Gemini gave more weight to homepage flow
- Gemini uniquely questioned whether Vibe could affect syntax highlighting semantics; Opus and GPT focused on colour contrast only
- GPT emphasised emotional journey framing more than the other two

### Product Designer

**All three models flagged (high confidence):**
- Homepage primary CTA hierarchy unclear (read/explore/subscribe) (all 3)
- Vibe discoverability is insufficient with current pill placement (all 3)
- Featured vs Recent post visual distinction needed (all 3)
- Tag filtering interaction model undefined (in-place vs navigate) (all 3)
- Mobile navigation drawer behaviour unspecified (all 3)
- Vibe reset mechanism needed (all 3)
- ToC behaviour on mobile undefined (all 3)
- Empty states for launch-day sparse content (all 3)
- Post-reading next action priority unclear (all 3)
- Code block width relative to prose column (all 3)

**Only one model flagged (worth attention):**
- Particle z-index relative to text (Gemini)
- Avatar conic gradient ring: rotate or static (Gemini)
- Footer stickiness on short pages (Gemini)
- Image lightbox/zoom behaviour (Gemini)
- Breadcrumb navigation for deep hierarchies (Gemini)
- Real-time colour preview while dragging slider (Gemini)
- Aside/margin note mobile fallback (Opus)
- Scanline intensity calibration (Opus)

**Where models disagreed:**
- Opus proposed the most detailed visual specifications; GPT focused on principles; Gemini asked targeted implementation questions
- Gemini uniquely raised particle z-index as a design concern
- GPT emphasised flow between content types (Projects to Posts) more than the others

### Domain Expert

**All three models flagged (high confidence):**
- "Digital home" vs blog vs portfolio identity confusion (all 3)
- xexr brand vs Dane Poyzer personal identity relationship (all 3)
- Target audience ambiguity (developers vs clients vs indie hackers) (all 3)
- MVP scope vs timeline mismatch (all 3)
- Content staleness risk across static pages (all 3)
- RSS handling of custom MDX components (all 3)
- Publishing cadence sustainability (all 3)
- Cross-posting canonical authority concerns (all 3)

**Only one model flagged (worth attention):**
- "Chartered accountant" angle as differentiator (Gemini)
- Content as executable artifact vs static text (Gemini)
- Vendor lock-in to Next.js/React (Gemini)
- Digital gardening vs stream mental model (Gemini)
- Failed project representation strategy (GPT)
- Evidence standards for technical claims (GPT)
- "Building in public" operational definition (Opus)

**Where models disagreed:**
- Opus was most critical of timeline feasibility, calling it "2-4 weeks of work"
- Gemini focused more on technical architecture concerns
- GPT emphasised trust and credibility metrics most strongly

---

## Prioritized Question Backlog

### P0 — Must Answer (28 questions)
*All 3 models flagged, or critical impact on launch viability.*

**1. How does the Vibe system prevent users from selecting colours that make the site unreadable?**
The spectrum slider allows arbitrary colours. A dark accent on near-black background renders links, tags, and status indicators invisible. The system needs contrast guardrails, luminance constraints, or automatic adjustment.
— *Opus, GPT, Gemini*

**2. Does the site respect `prefers-reduced-motion` for particles, hover animations, and colour transitions?**
Users with vestibular disorders or motion sensitivity can experience discomfort or seizures. This is a WCAG requirement, not optional. The brief does not mention it.
— *Opus, GPT, Gemini*

**3. Does the contrast ratio between secondary text (#555555) and background (#050505) meet WCAG AA?**
#555555 on #050505 yields approximately 2.9:1, which fails WCAG AA (minimum 4.5:1 for normal text). Secondary text will be unreadable for many users.
— *Opus, GPT, Gemini*

**4. Who is excluded by a dark-only design, and is that trade-off acceptable?**
Users with astigmatism experience halation (light text blur on dark backgrounds). Users in bright environments find dark sites hard to read. This is a non-trivial percentage of the population.
— *Opus, GPT, Gemini*

**5. What is the primary call-to-action on the homepage: reading a post, exploring projects, or subscribing?**
The homepage hero must establish a clear hierarchy of what the user should do first. Competing CTAs dilute engagement. This determines top-of-page design and visual weight.
— *Opus, GPT, Gemini*

**6. How does a user subscribe without being redirected off-site to Substack?**
Redirecting to Substack breaks the mental model of "subscribing to this blog," introduces friction (Substack account creation), and involves multiple context switches. The user may never return.
— *Opus, GPT, Gemini*

**7. Should placeholder pages (Bookshelf, Uses, Now) ship before content exists, or should routes be hidden until populated?**
Empty pages signal abandonment. Sparse but real content is better than beautiful emptiness. Placeholder pages actively harm credibility.
— *Opus, GPT, Gemini*

**8. Is the post page (not the homepage) the actual primary design focus, given most traffic arrives via shared links?**
Users arriving from Twitter, HN, or Discord land directly on a post page. The reading experience — title, reading time, first paragraph, code blocks — is the real first impression.
— *Opus, GPT, Gemini*

**9. Is the MVP scope achievable in the stated timeline?**
The must-have list includes Vibe system, particle effects, Shiki highlighting, MDX pipeline, Giscus, OG images, RSS, responsive design, and one published post. This is likely 2-4 weeks for a solo developer. An unrealistic timeline risks cutting quality or never shipping.
— *Opus, GPT, Gemini*

**10. Who is the primary target audience: developers, potential clients/employers, or the indie hacker community?**
Each audience wants different things. Developers want tutorials. Clients want credibility signals. Indie hackers want journey narratives. The primary reader determines content strategy, tone, and information architecture.
— *Opus, GPT, Gemini*

**11. Can the Vibe system reset to the default colour, and is the reset mechanism obvious?**
Without an explicit reset, users who experiment may not remember the default and feel stuck with an unsatisfying choice. A "Reset to Default" button is a safety hatch.
— *Opus, GPT, Gemini*

**12. How does the Vibe system degrade when localStorage is unavailable (private browsing, storage full, disabled)?**
The Vibe setting will not persist. Depending on implementation, the site might error or flash the default colour on every page load. The feature must degrade gracefully with defaults.
— *Opus, GPT, Gemini*

**13. Can screen reader users navigate the site effectively, with proper ARIA landmarks, skip-to-content links, and semantic HTML?**
The base-ui components help, but page-level semantics need explicit attention. The particle canvas should be aria-hidden. The Vibe slider needs proper labelling.
— *Opus, GPT, Gemini*

**14. Is the Vibe system keyboard-accessible (tab to button, open drawer, navigate presets, operate spectrum slider)?**
Colour sliders are notoriously difficult to make keyboard-accessible. Many users rely on non-pointer navigation. The Vibe drawer's DOM position affects tab order.
— *Opus, GPT, Gemini*

**15. How do code blocks behave on mobile, including copy button visibility and long-line handling?**
Hover-dependent copy buttons do not exist on touch devices. Code lines are often long. Horizontal scrolling vs wrapping must be decided. The copy button must be always visible on mobile and meet 44x44px touch target guidelines.
— *Opus, GPT, Gemini*

**16. What does the site experience look like with JavaScript disabled?**
Particle effects, Vibe system, and client-side interactivity all require JS. Content should be readable via server rendering even if JS fails. Progressive enhancement is expected for a content-focused blog.
— *Opus, GPT, Gemini*

**17. What is the step-by-step flow for a first-time visitor arriving from a shared social media link to a specific post?**
This is the most common entry point. The user lands on a post page without homepage context and needs to understand the site, read the content, and potentially explore further. Quick orientation and trust signals are essential.
— *Opus, GPT, Gemini*

**18. What happens after a user finishes reading a post — what is the single primary next action?**
The brief mentions previous/next navigation, Giscus comments, subscribe CTA, and share buttons. Too many options create decision paralysis. The path to subscription, related posts, or blog index must be clear and prioritised.
— *Opus, GPT, Gemini*

**19. How do users discover the Vibe system for the first time?**
The Vibe pill is a compact, non-standard UI element. Without discoverability cues (pulse, glow, tooltip, onboarding), many users will never find the site's signature feature.
— *Opus, GPT, Gemini*

**20. How does the particle effect behave on touch devices where mouse hover/repulsion does not exist?**
The brief describes mouse-based repulsion. Touch interaction needs a defined behaviour (tap triggers repulsion, passive floating, or disabled entirely) or the feature feels broken on mobile.
— *Opus, GPT, Gemini*

**21. What is the empty state for homepage sections and post lists when there are very few posts (n=1)?**
The homepage shows "Featured posts (2-3)" and "Recent posts (latest 5)." With a single post, both sections look empty. The MVP explicitly requires launching with one post, so this state must be designed.
— *Opus, GPT, Gemini*

**22. How does tag filtering work on /posts — in-place client-side filtering or navigation to /tags/[tag]?**
In-place filtering feels faster and more interactive. Navigation to a tag page provides shareable URLs but breaks flow. Clicking a tag on a post page when the tag page does not exist creates dead links.
— *Opus, GPT, Gemini*

**23. What is "digital home" versus blog versus portfolio, and how does this identity shape the information architecture?**
The brief calls xexr.com all three at different points. These are distinct content strategies with different architectures. Conflating them risks doing none well.
— *Opus, GPT, Gemini*

**24. What is the relationship between the "xexr" brand and "Dane Poyzer" the person?**
The brief uses both interchangeably. Is xexr a personal brand, a business entity, or a handle? Visitors encountering one without context of the other will be confused. Identity clarity affects connection and memorability.
— *Opus, GPT, Gemini*

**25. How does the RSS feed handle custom MDX components (Callout, CodeBlock, YouTube embeds)?**
Custom components will not render in RSS readers. The feed needs to either strip or convert these to plain HTML. Poorly rendered RSS content damages credibility. Interactive elements and iframes may break strict RSS validators.
— *Opus, GPT, Gemini*

**26. What publishing cadence is sustainable and what cadence would signal failure?**
Without a defined goal (weekly, monthly, quarterly), there is no way to know if the content strategy is working. Most personal dev blogs ship 1-5 posts then go silent. What structural mechanisms sustain publishing momentum?
— *Opus, GPT, Gemini*

**27. How will colour-blind users experience the Vibe system and accent-colour-driven UI elements?**
Several preset colours (Mint, Green, Cyan) may be indistinguishable for users with deuteranopia or protanopia. The accent colour drives meaningful UI distinctions (active states, links, status dots), so this is not just decorative.
— *Opus, GPT, Gemini*

**28. How does the navigation handle 9 pages without overwhelming the header or undermining the minimal aesthetic?**
Home, Posts, About, Projects, Uses, Bookshelf, Now, Colophon, Tags. Populating the header with all pages creates a crowded navigation. Should pages be grouped (content vs. personal context), or should some be footer-only?
— *Opus, GPT, Gemini*

---

### P1 — Should Answer (42 questions)
*2 models flagged, or moderate impact on user experience.*

**29. How do featured/pinned posts visually differentiate from recent posts on the homepage?**
Without clear visual distinction (explicit "Featured" label, larger card, different layout), users cannot tell which posts are editorially curated versus simply new.
— *Opus, GPT*

**30. What metadata is visible on a post card at the blog index level versus only on the individual post page?**
Showing too much metadata (tags, reading time, excerpt, date) on each card creates visual clutter. Too little makes posts indistinguishable. Which three pieces are essential everywhere?
— *Opus, GPT*

**31. How does the Vibe drawer open and close — slide up from bottom, expand from button, or overlay as modal?**
The animation direction and containment affect whether the drawer feels like a quick toggle or a disruptive interruption. On mobile, physical reachability matters (bottom-slide vs popover).
— *Opus, GPT, Gemini*

**32. What immediate feedback confirms a Vibe change was successful?**
Instant visual feedback (site-wide colour transition) is the response, but users need to understand it happened because of their action. Simultaneous vs cascading transitions, performance on slower connections, and preventing seizure-inducing strobe from rapid toggling all need consideration.
— *Opus, GPT, Gemini*

**33. Does the homepage hero occupy full viewport height or a fixed height that allows content to peek from below?**
Full viewport heroes feel immersive but hide content below the fold. Partial heroes invite scrolling but reduce the particle effect's visual impact.
— *Opus, GPT*

**34. Is the blog post content area a single centred column (740px) or does it have a sidebar for Table of Contents?**
A sidebar ToC on desktop requires a wider container or asymmetric layout. A centred column is simpler but loses the sticky ToC affordance. The ToC must highlight the current section and work for keyboard-only users.
— *Opus, GPT, Gemini*

**35. How does the Table of Contents behave — active section highlighting, collapse/expand, or static anchor list?**
Active section highlighting is expected in modern ToC implementations. Without it, the ToC provides less value. On mobile, it needs placement (top of post, collapsible, or hidden in a menu).
— *Opus, GPT, Gemini*

**36. What happens when a user visits a URL for a post that has been removed, renamed, or is still in draft?**
No redirect handling strategy is mentioned for renamed posts. Draft posts filtered from production may still have bookmarked or shared URLs. The 404 page needs helpful recovery options (recent posts, blog index, search).
— *Opus, GPT, Gemini*

**37. How does the Giscus comment section handle its three states: loading, zero comments, and GitHub unreachable?**
Each needs visual treatment. Eager loading adds weight and layout shift. Lazy loading shows a loading state when users reach comments. Users without GitHub accounts need clear messaging.
— *Opus, GPT, Gemini*

**38. What is the visual treatment of the "Updated" badge on posts that have been revised since original publication?**
The frontmatter schema includes an "updated" field. Its visual prominence signals content freshness and editorial care. Should updated content be surfaced globally (home/index) or only inside each post?
— *Opus, GPT*

**39. How does the mobile layout handle the hero section — reduced particle count, shorter height, or particles removed entirely?**
Performance and visual impact differ dramatically on small screens. The hero must feel intentional, not simply squished. Battery drain from canvas rendering on mobile is a concern.
— *Opus, GPT, Gemini*

**40. How does the site handle very long code blocks and code lines that exceed the prose column width?**
Code blocks with macOS window chrome add visual weight. Long lines need horizontal scrolling or breakout from the prose column. Very long blocks (500+ lines) may need auto-collapse.
— *Opus, GPT, Gemini*

**41. What does the copy button on code blocks do upon success — tooltip, toast, icon change, or text change?**
Code copying is a high-frequency interaction for the target audience. The feedback must be instant, unambiguous, and auto-dismiss. The copy must strip line numbers, diff markers, and decorative elements.
— *Opus, GPT, Gemini*

**42. How do share buttons behave — copy to clipboard, native share sheet (mobile), or open platform directly?**
The brief says "Twitter, copy link." The interaction model for each must be defined. "Copy link" needs a visible success confirmation.
— *Opus, GPT*

**43. What is the interaction model for the Vibe colour spectrum slider — horizontal track, radial picker, or hue wheel?**
The slider form factor determines precision of colour selection and how the interaction feels on mobile versus desktop. Does the site preview the colour while dragging, or only on release?
— *Opus, Gemini*

**44. Where exactly does the Vibe button live — main header, floating status bar, or footer?**
The brief mentions a "status bar" but the codebase has a Header with MainNav. Placement determines discoverability and visual weight. Should it feel like a global utility (like a dark/light switch) or a content feature?
— *Opus, Gemini*

**45. How does the particle effect respond to scroll — fixed in hero viewport, parallax, or scrolls away?**
If particles scroll with content, they may interfere with reading. If fixed, they create layered depth but risk feeling disconnected. The transition from hero to content area must feel deliberate.
— *Opus, Gemini*

**46. What does the site look like on extremely wide monitors (2560px+)?**
The 740px prose width will look narrow on ultrawide displays. The surrounding space needs intentional treatment (particles, gradient, or simply dark).
— *Opus, Gemini*

**47. Does the particle canvas extend edge-to-edge or respect the content container width?**
Edge-to-edge particles create immersion but may distract from centred content. Contained particles reinforce the layout grid. Particle z-index must be behind text for legibility.
— *Opus, Gemini*

**48. What is the error/fallback state for the particle canvas if WebGL/Canvas is unavailable or disabled?**
The hero section must degrade gracefully without particles. The hero should not feel broken for users with canvas disabled.
— *Opus, Gemini*

**49. Does the particle effect pause when the browser tab is backgrounded?**
Running requestAnimationFrame in a hidden tab wastes resources, drains battery, and may cause stuttering when the tab is foregrounded. Target: <1% CPU when idle.
— *Opus, Gemini*

**50. What is the transition between pages — Next.js page transitions or hard cut?**
The brief's emphasis on the site feeling "alive" suggests transitions, but excessive animations slow navigation for power users. The loading state during navigation needs visual continuity.
— *Opus, Gemini*

**51. How does the site handle the initial page load — does it flash default Mint before reading localStorage Vibe preference?**
A "colour jump" on every page load undermines the premium feel. The site should either block render until preferences are known or transition smoothly.
— *Opus, Gemini*

**52. How should the About page lead — narrative first or quick-scan facts (role, location, links)?**
Developer audiences often want to quickly assess who someone is before committing to reading a full narrative. This page must serve both recruiters and peers.
— *Opus, GPT*

**53. How does the "Now" page communicate freshness — is the "Last updated" date prominent enough?**
If the date is buried, visitors cannot tell if the page reflects current reality. An outdated Now page erodes trust more than not having one.
— *Opus, GPT, Gemini*

**54. Where does the Substack subscribe CTA live — footer, sticky banner, inline after posts, or all three?**
Over-promoting subscription feels pushy. Under-promoting means missing conversions at the moment of highest engagement (after reading a great post). Placement determines funnel length.
— *Opus, GPT*

**55. What problem does the Vibe system solve for readers, and how will its value be measured?**
Is it a retention mechanism, brand differentiator, engagement driver, or technical showcase? Without analytics on usage (drawer opens, colour changes, custom vs preset), the most distinctive feature cannot be evaluated.
— *Opus, GPT, Gemini*

**56. What does "building in public" mean operationally for this site?**
Does it imply open analytics, public roadmaps, commit-stream visibility, or simply blogging about the process? Users familiar with the concept will have specific expectations.
— *Opus, GPT*

**57. How do successful dev blogs handle cross-posting to Substack/dev.to without diluting canonical authority?**
The brief positions Substack as a distribution channel with canonical URLs pointing back. But Substack may bury cross-posted content. Without UTM parameters or referral tracking, channel effectiveness cannot be measured.
— *Opus, GPT, Gemini*

**58. What does "shipped" mean for MVP — deployed, linked from social profiles, submitted to Search Console, shared publicly?**
Each is a different level of "shipped." The definition determines when work stops on the build and shifts to content.
— *Opus, GPT*

**59. What Lighthouse scores are acceptable for launch versus aspirational?**
The brief says 95+, but particle effects and custom fonts make this very difficult. Canvas-based particle systems conflict with Core Web Vitals. Is 90 acceptable for launch with a plan to optimise later?
— *Opus, GPT, Gemini*

**60. How will the site's design success be evaluated concretely?**
The brief uses aspirational language ("premium dev tool feel," "clean confidence"). What specific, observable criteria determine design success? Peer feedback? Comparison screenshots? Design review?
— *Opus, GPT*

**61. What are the required user-visible states for the Vibe system (default, custom, changed, reset)?**
Explicit states make personalisation feel reliable. Users who have customised should see a "you've customised this" indicator. State transitions need to feel cohesive.
— *Opus, GPT*

**62. What is the visual treatment of post hover animations on touch devices where hover states do not exist?**
The accent underline and title colour change are hover-dependent. Touch devices need an alternative (focus states, tap feedback) or graceful degradation.
— *Opus, GPT, Gemini*

**63. How does the post tag area behave when a post has zero tags?**
Does the tag area collapse, show a placeholder, or simply not render? Conditional rendering affects layout consistency of post cards and individual post pages.
— *Opus, GPT*

**64. How should navigation prioritise content types (Posts, Projects) versus personal context (About, Now, Uses)?**
This changes how first-time visitors orient themselves and whether the site identity reads as "writer-first" or "portfolio-first."
— *Opus, GPT*

**65. What does the 404 page offer — recent posts, search, go home, or contextual suggestions?**
A custom 404 exists in the codebase. Its content and navigation options determine whether the user stays or bounces. Turning a dead end into a content opportunity.
— *Opus, GPT, Gemini*

**66. How should content staleness be handled across evergreen pages (Now, Uses, Bookshelf)?**
Personal sites notoriously go months without updates. Stale Lighthouse scores, outdated Now pages, and abandoned Bookshelves are worse than pages that do not exist. Explicit staleness states preserve honesty.
— *Opus, GPT, Gemini*

**67. Is the content strategy oriented toward search-driven discovery (SEO/tutorials) or audience-driven distribution (social/newsletter)?**
This fundamentally shapes what gets written and how. Josh Comeau's success is largely driven by educational content solving specific search problems. The brief does not define target keywords or search intent.
— *Opus, GPT*

**68. What font loading strategy prevents FOUT/CLS, especially with tight letter-spacing on headings?**
The -1.5px letter-spacing on headings could cause character overlap at larger zoom levels or with system font overrides. Font weight 800 may look blotchy on Windows. Fallback styles during loading need definition.
— *Opus, Gemini*

**69. How does the site handle users with forced-colour modes or Dark Reader extensions?**
The dark-first design with custom accent colours may be completely overridden by Windows High Contrast Mode or double-inverted by Dark Reader. The site should still be usable.
— *Opus, Gemini*

**70. What is the flow for navigating between the About, Uses, Now, and Colophon pages — are they related or separate?**
These are all "about the author" pages. Grouping them could aid discovery but might complicate navigation hierarchy.
— *Opus, GPT*

---

### P2 — Good to Have (48 questions)
*1 model flagged, design-relevant.*

**71. Will users assume "Recent posts" are truly recent and actively maintained?**
Stale content immediately lowers trust in a personal blog. The "Recent" label creates an implicit promise of freshness.
— *GPT*

**72. Will users expect consistent metadata quality (date, reading time, tags) on every post?**
Missing or inconsistent metadata makes content feel unfinished. The reading time algorithm (words per minute, whether code blocks count, whether images add time) needs definition.
— *GPT*

**73. Does the Vibe system affect syntax highlighting in a way that breaks standard colour coding?**
Developers rely on specific colours (yellow for strings, blue for keywords) to parse code quickly. If the accent colour overrides syntax colours, code readability suffers.
— *Gemini*

**74. Will users expect the "Now" page to be historically archived, or is it ephemeral?**
If a user remembers seeing something on the Now page last month, can they find it again?
— *Gemini*

**75. Will users expect the Bookshelf to link to purchase/review pages (Amazon/Goodreads)?**
A bookshelf implies a recommendation. Users will naturally want to click a book cover to learn more or buy.
— *Gemini*

**76. Do users expect the site to work offline (PWA with service worker)?**
Dev blogs are often read during commutes. A `site.webmanifest` exists in the codebase, but service worker logic is unspecified.
— *Gemini*

**77. Will users expect a search function via Cmd+K from day one?**
Command palette search is deeply ingrained muscle memory for developer audiences. Its absence may feel like a missing standard feature.
— *Opus, Gemini*

**78. How does a recruiter or potential collaborator experience the site?**
They need signal: what does this person build, how do they think, are they credible. The About page must not read too casually or lack concrete accomplishments.
— *Opus*

**79. How does a returning reader check for new content?**
No mention of "new" badges, last-visited tracking, or any mechanism to help returning visitors quickly identify what has changed since their last visit.
— *Opus*

**80. What happens when a user shares a post link — does the OG image include a compelling hook or just title/date/branding?**
The OG image is often the first visual impression for potential visitors. On platforms with light backgrounds (LinkedIn, iMessage), dark OG images can look jarring.
— *Opus, Gemini*

**81. Can users share a specific Vibe configuration (URL parameter or shareable state)?**
"Check out this site — I made it purple" has no mechanism if Vibe settings are localStorage-only. Cross-device syncing is also impossible.
— *Opus*

**82. What if a user opens the Vibe drawer and then scrolls?**
On mobile, does the drawer move with the viewport, block scrolling, or awkwardly overlay content?
— *Opus*

**83. What if a user highlights text to copy a quote and the scanline overlay interferes?**
CSS overlay effects can block text selection depending on implementation. The scanline can also cause visual vibration or headaches for users with sensory processing issues.
— *Opus, Gemini*

**84. What if a user pastes a code block and hidden characters or formatting come along?**
The copy button needs to strip all decorative elements and provide clean, paste-ready code. This includes terminal chrome characters.
— *Opus*

**85. What if a user changes their system font size or uses browser zoom to 200%?**
Tight letter-spacing could cause character overlap. Nav drawer may cover content. Code blocks may break layout. Relative units (rem) should be used over fixed px.
— *Opus, Gemini*

**86. Are the red/yellow/green dots on code blocks conveying information solely through colour?**
If decorative, they should be aria-hidden. Screen readers might announce them as noise. Colour-blind users cannot distinguish them.
— *Opus, Gemini*

**87. Are blog post images accompanied by meaningful alt text, with enforcement or guidance?**
Without linting or authoring guidance, images will likely be added without alt text, excluding screen reader users.
— *Opus*

**88. Is the JetBrains Mono font readable at small sizes for nav links, dates, and tags?**
Monospace fonts at small sizes can be harder to read for users with dyslexia. Using monospace for UI elements beyond code is an aesthetic choice that trades readability.
— *Opus*

**89. How will the site perform for assistive technology when the Vibe colour changes?**
A site-wide colour transition could be announced as a massive change event to screen readers. The interaction between the Vibe system and ARIA live regions needs consideration.
— *Opus*

**90. Is content structured with proper heading hierarchy (h1 > h2 > h3) without skipping levels?**
MDX content may skip heading levels or use headings for styling. Without linting, this creates navigation barriers for screen reader users.
— *Opus*

**91. Are link purposes distinguishable without relying solely on colour?**
If links within body text lack underlines (relying only on accent colour), users with colour vision deficiency will not identify them as links.
— *Opus*

**92. How should the one-line descriptor ("Building AI-powered tools...") be rendered — static text or typed animation?**
This sets the tone for the entire first impression and determines whether the hero feels alive or static.
— *Opus*

**93. What is the maximum number of tags shown per post card before truncation?**
A post with 8 tags creates visual noise that breaks card layout rhythm. A truncation strategy is needed.
— *Opus*

**94. Should the Colophon page include performance stats, or does that create a maintenance obligation?**
Stale Lighthouse scores are worse than no scores. The page must account for maintainability.
— *Opus*

**95. Is RSS feed discovery surfaced in the UI (icon in header/footer) or only via link tags in HTML head?**
Developer audiences actively look for RSS. Burying it means they may never find it. Should it be grouped with social icons or stand alone?
— *Opus, Gemini*

**96. Does the Projects page use a grid or stacked list layout?**
A grid showcases more projects simultaneously but requires consistent card heights. A stacked list allows variable detail per project. The page must handle n=1 gracefully.
— *Opus, Gemini*

**97. How does the avatar conic gradient ring scale across contexts (hero, about page, footer, OG images)?**
Consistent rendering across sizes ensures brand recognition. The gradient ring may not render well at small sizes. Should it rotate or stay static?
— *Opus, Gemini*

**98. What is the visual rhythm/density of the blog index — how much space separates post entries?**
Too tight feels cramped; too generous means fewer posts visible, reducing browse efficiency. Compact scan vs editorial cards.
— *Opus, GPT*

**99. How do Callout components (info, warning, tip) visually distinguish from each other and from regular prose?**
Core MDX components. Their visual language must be distinct enough to interrupt scanning without disrupting reading flow.
— *Opus*

**100. What visual pattern does the Aside/margin note follow on desktop versus mobile?**
Margin notes require extra horizontal space that does not exist on mobile. The fallback (inline, collapsible, footnote) changes the reading experience.
— *Opus*

**101. How does the monospace "xexr" branding in the nav visually balance with the accent-coloured square icon?**
The nav logo is the most frequently seen brand element. Its proportions and spacing set the tone for the entire site.
— *Opus*

**102. What does a code block look like before Shiki syntax highlighting has loaded?**
Unstyled code flashing before highlighting is a common state. A fallback style prevents layout shift and visual jank.
— *Opus*

**103. What loading or skeleton state appears for pages with asynchronous data?**
If books or projects are loaded at runtime, loading states are needed. Skeleton loaders feel faster than spinners. The brand tone should inform loading state style.
— *Opus, GPT, Gemini*

**104. What is the visual transition when scrolling from the hero section into the content area?**
The boundary between immersive hero (particles, large typography) and reading area needs a deliberate transition to avoid feeling abrupt.
— *Opus*

**105. How should hover effects communicate structure beyond affordance — content grouping or relationship?**
Motion can clarify structure, not just aesthetics. Post cards may need distinct states for hovered, focused, and filter-matched.
— *GPT*

**106. What is the interaction model for the previous/next post navigation at the bottom of a post?**
This is a key discovery mechanism. Too little information (just titles) means users cannot decide whether to continue. Too much clutters the reading conclusion.
— *Opus, GPT*

**107. How does the user distinguish between internal links and external links visually?**
Users need to know if clicking a link keeps them in the "digital home" or sends them away. External links should visually signal departure (icon, new tab).
— *Gemini*

**108. Does the user feel "lost" in deep navigation hierarchies (Tags > Post > Project)?**
Breadcrumbs are not mentioned in the brief but are vital for deep hierarchies. Each page must stand on its own for orientation when opened in a new tab.
— *Gemini*

**109. Should images in posts open in a lightbox on click?**
Critical for detailed diagrams or screenshots in technical posts. Currently unspecified.
— *Gemini*

**110. Should comments be expanded by default or collapsed behind an explicit action?**
Impacts both page focus and community visibility. Expanded signals community engagement. Collapsed keeps reading flow clean.
— *GPT*

**111. What is the flow for a user who wants to evaluate credibility quickly (who is this person, what have they built)?**
Trust-building often precedes follow/subscribe decisions. The flow from About to Projects to Posts should form a coherent narrative.
— *GPT*

**112. What is the intended flow from Projects to Posts (or reverse)?**
Bridges thought leadership and proof of work. Users comparing thinking vs execution need clear pathways.
— *GPT*

**113. How should users on mobile navigate from reading mode to site exploration without losing context?**
Mobile flow interruptions increase abandonment. Context preservation during navigation switches matters.
— *GPT*

**114. Are date formats consistent and clear for global audiences (absolute vs relative, UK vs US)?**
"Feb 22, 2026" vs "2 days ago." Relative feels social; absolute feels archival. Ambiguity can mislead about freshness. Regional conventions affect professionalism.
— *GPT, Gemini*

**115. What does "indie hacker" mean in Dane's specific context?**
The term spans a wide spectrum from side-project hobbyist to solo founder. Audience expectations differ dramatically. Vague labels reduce message clarity.
— *Opus, GPT*

**116. What does "AI orchestration" mean to the expected readership?**
Covers everything from LangChain-style chaining to enterprise automation. Without scoping, readers will not know if the site covers beginner tutorials or advanced patterns.
— *Opus, GPT*

**117. What is the relationship between xexr.com and products (dypt, makeacraft) — hub or separate entity?**
A personal brand site optimises for reputation. A content marketing engine optimises for product discovery. The brief mixes both.
— *Opus, GPT, Gemini*

**118. Does file-based MDX serve the stated goal of publishing frequently, or does git-commit-to-publish add friction?**
Git workflows add friction compared to CMS-based publishing. If the goal is sustained output, is the stack optimised for writing ease or developer satisfaction? Target: "idea to published post" in under 5 minutes of setup.
— *Opus, Gemini*

---

### P3 — Parking Lot (24 questions)
*Technical implementation questions, not blocking scope decisions.*

**119. What is the Vibe system's technical implementation — CSS variable swap only or does it re-render canvas elements?**
Determines performance optimisation strategy. CSS variables are cheap; canvas re-renders are expensive.
— *Gemini*

**120. How should the Vibe colour transition timing work — 0.4s cubic-bezier for all interactions or faster for clicks?**
Hover can be floaty; clicks should feel instant. Different interaction types may need different timing.
— *Opus, Gemini*

**121. Does the Vibe system need to sync across multiple open tabs via localStorage events?**
If a user changes Vibe in one tab, other tabs may be out of sync until refresh. StorageEvent API could handle this.
— *Gemini*

**122. How does the site prevent FOUT and CLS from custom font loading (Plus Jakarta Sans 800, JetBrains Mono)?**
Tight letter-spacing and specific weights are key to the design. Font loading strategy needs definition.
— *Gemini*

**123. Is the image optimisation pipeline robust enough to handle raw high-resolution images dropped into the folder?**
Manually optimising images is a chore. Build pipeline configuration (sharp/next-image) needs to handle this automatically.
— *Gemini*

**124. Are we generating proper JSON-LD structured data for Person, BlogPosting, and Breadcrumb schemas?**
Affects search engine rich results and ranking. Next.js App Router handles routing, but schema generation needs explicit implementation.
— *Gemini*

**125. Does generating OG images on the fly (Vercel OG) slow down initial response time for social crawlers?**
TTFB on social crawlers affects whether preview cards render correctly when sharing.
— *Gemini*

**126. How tied is the content to Next.js/React-specific components — can it be exported to raw Markdown?**
Vendor lock-in concern. Future platform migration may be blocked by deep MDX component coupling.
— *Gemini*

**127. Where do images for a specific post live — global /public or co-located with MDX?**
Affects authoring friction and file organisation. Co-location reduces context switching but may complicate builds.
— *Gemini*

**128. How do we audit the static build for dead links and broken images?**
Maintenance quality concern. Link rot prevention needs a strategy (build-time check, CI/CD integration).
— *Gemini*

**129. Can draft posts be accidentally guessed via URL manipulation if build logic is not secure?**
Editorial privacy concern. Draft filtering must be build-time, not client-side.
— *Gemini*

**130. Are we hardcoding strings that will make i18n painful later?**
The brief says "don't build i18n yet" but code structure decisions now affect future cost. Non-ASCII characters in post slugs also need handling.
— *Opus, Gemini*

**131. How does the Giscus comment system handle spam?**
GitHub Discussions-backed comments inherit GitHub's moderation tools and openness. Discussion tab may fill with spam. Moderation responsibility needs assignment.
— *Opus*

**132. How does the site handle very long post titles in hero rendering and OG image generation?**
10-word titles, titles with code backticks, and titles with special characters are edge cases that need handling.
— *Opus*

**133. What happens to the particle effect when the user navigates between pages — reinitialise or persist?**
Reinitialisation causes flashes or performance hitches. Persistence across route changes requires careful state management.
— *Opus*

**134. How does the site behave during Vercel deployment — seamless zero-downtime or visible transition?**
Vercel provides zero-downtime deploys, but perception of freshness matters for the Now page.
— *Opus*

**135. What should happen during low-output life phases — how does the site handle unexplained publishing silence?**
Unexplained silence conflicts with "active builder" positioning. A strategy for busy periods prevents credibility erosion.
— *GPT*

**136. How should sponsored relationships or affiliations be disclosed if introduced later?**
Disclosure norms affect audience trust and legal compliance. Deciding the policy now prevents retroactive awkwardness.
— *GPT*

**137. What content boundaries apply around family mentions and personal life updates?**
Privacy decisions are hard to reverse once indexed. The brief mentions "dad life" as content territory — what are the limits?
— *GPT*

**138. How should sensitive claims about employers, clients, or communities be framed?**
Legal and relationship risk can arise from casual phrasing in a public blog. Guardrails need definition.
— *GPT*

**139. What is the policy for controversial or rapidly shifting AI topics?**
Positioning without guardrails can polarise core audience segments. Evidence standards for technical claims need definition.
— *GPT*

**140. How should failed or abandoned projects be represented in the Projects narrative?**
Honest framing can strengthen authenticity if handled deliberately. Status labels (active, maintained, archived) need clear semantics.
— *GPT, Gemini*

**141. Should the footer be sticky to the bottom of the viewport on short pages (like 404)?**
Floating footers look broken/unfinished. This is a layout detail but affects perceived polish.
— *Gemini*

**142. Should project cards and post cards share the same visual language or look distinct?**
Visual consistency vs distinguishing content types. Card borders, shadows, and interaction patterns need a decision.
— *Gemini*

---

## Quality Check

| Metric | Value | Status |
|--------|-------|--------|
| Raw questions (all 9 analyses) | 350 | -- |
| After deduplication | 142 | -- |
| P0 count | 28 | -- |
| P1 count | 42 | -- |
| P2 count | 48 | -- |
| P3 count | 24 | -- |
| P0 + P1 + P2 + P3 | 142 | Matches unique count |
| Numbering | 1-142 | Global sequential |
| Model attribution | Every question | Complete |
