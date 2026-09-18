# ShipStory — Product Specification

## Product Thesis

ShipStory is an **evidence-backed engineering storytelling platform**, not an AI content generator.

The product transforms GitHub activity into meaningful engineering narratives by:

1. Ingesting actual repository data (commits, diffs, files, PRs)
2. Detecting deterministic engineering signals (dependency changes, API modifications, test additions)
3. Using AI to interpret evidence—not invent facts
4. Discovering coherent stories from related engineering work
5. Generating shareable content that traces back to verifiable evidence

**Core principle:** If you remove the AI layer, the underlying engineering intelligence and evidence should still be valuable.

---

## The Problem ShipStory Solves

Developers build interesting things, but their GitHub history is fragmented across:

- Cryptic commit messages ("fix bug", "update config")
- Scattered pull requests
- Experimental branches
- Refactors spread over weeks
- Configuration changes without context
- Tests added silently
- Documentation updates buried in diffs

This fragmentation means:

- **Recruiters** cannot quickly understand what a developer actually built
- **Peers** cannot appreciate the technical decisions made
- **The developer themselves** struggles to articulate their accomplishments
- **Good work remains invisible** because it was never translated into narrative

A simple commit summarizer fails because:

- Individual commits are often meaningless out of context
- Commit messages are frequently poor or misleading
- The real engineering work spans multiple commits
- There's no connection between code changes and their significance

ShipStory solves this by **discovering stories from patterns of evidence**, not by summarizing individual commits.

---

## Target Users

### Primary MVP Persona

**The Builder Who Can't Explain**

- Student developer or junior/mid-level engineer (0–5 years experience)
- Actively builds projects on GitHub (personal projects, contributions)
- Struggles to communicate what they've built in interviews, applications, or social media
- Has 5–20 repositories with meaningful activity in the last 30–90 days
- Wants to build a portfolio but doesn't know how to extract stories from their work
- Comfortable with GitHub, unfamiliar with personal branding

**Example:** A CS student who built an AI agent with tool calling, evaluation pipelines, and caching—but their GitHub shows only scattered commits with messages like "add agent" and "fix retrieval."

### Secondary Personas

1. **The Indie Hacker**
   - Building in public
   - Needs content for Twitter/LinkedIn
   - Wants to showcase technical depth to attract users or co-founders

2. **The Job Seeker**
   - Preparing for interview cycles
   - Needs resume bullets and portfolio pieces
   - Wants concrete examples of technical decisions

3. **The AI Builder**
   - Working on LLM applications, agents, RAG systems
   - Technical work is complex and hard to explain simply
   - Wants to demonstrate sophisticated engineering to peers

4. **The Open Source Contributor**
   - Makes meaningful contributions to large repositories
   - Individual commits don't show full impact
   - Needs to articulate contribution scope

---

## Core User Problem

GitHub is optimized for **version control**, not **communication**.

When a developer works on a feature:

```
Day 1: "initial setup"
Day 2: "add redis"
Day 3: "modify request handler"
Day 4: "fix cache bug"
Day 5: "add tests"
Day 6: "cleanup"
Day 7: "update docs"
```

Each commit is technically accurate but communicates nothing about:

- **What problem was being solved**
- **Why certain technical choices were made**
- **How the architecture changed**
- **What the impact was**

The developer knows the story: *"I redesigned the request execution pipeline to add Redis-backed caching, reducing latency by 80%."*

But that story exists only in their head—not in their GitHub history.

ShipStory bridges this gap by:

1. Recognizing that commits 2–7 form a coherent architectural change
2. Identifying the evidence (new dependency, new module, modified handler, tests)
3. Generating the narrative with explicit evidence links
4. Enabling the developer to share the story

---

## Core Value Proposition

| Simple Commit Summarizer | ShipStory |
|--------------------------|-----------|
| Reads commit messages | Reads commits + diffs + files + structure |
| Treats each commit independently | Clusters related commits into stories |
| Generates generic text | Generates evidence-backed claims |
| Cannot verify accuracy | Every claim traces to evidence |
| No understanding of engineering | Detects engineering signals (caching, auth, APIs, etc.) |
| Output: "You made 15 commits" | Output: "You added Redis-backed caching to improve performance" |
| AI invents facts | AI interprets supplied evidence only |

**Key differentiator:** Evidence graph with traceability.

Every generated claim must answer: *"Why did ShipStory say this?"* with verifiable GitHub data.

---

## Core Product Loop

```
┌─────────────────────────────────────────────────────────────┐
│                      SHIPSTORY LOOP                         │
└─────────────────────────────────────────────────────────────┘

    GitHub
      ↓
┌──────────────┐
│  Ingestion   │  Fetch commits, diffs, files, PRs (last 30 days)
└──────────────┘
      ↓
┌──────────────┐
│ Engineering  │  Deterministic signal detection (no AI)
│   Signals    │  - dependency changes
│              │  - API route modifications
│              │  - database schema changes
│              │  - test additions
│              │  - infrastructure changes
└──────────────┘
      ↓
┌──────────────┐
│  AI Analysis │  Qwen interprets signals + evidence
│              │  Returns structured, validated output
└──────────────┘
      ↓
┌──────────────┐
│   Evidence   │  Link claims to specific commits/files
│    Graph     │  Validate all evidence IDs exist
└──────────────┘
      ↓
┌──────────────┐
│    Story     │  Cluster related changes
│   Discovery  │  Score by evidence strength, depth, scope
└──────────────┘
      ↓
┌──────────────┐
│   Content    │  Generate X post, resume bullet, portfolio desc
│  Generation  │  Three modes: Technical, Story, Career
└──────────────┘
      ↓
┌──────────────┐
│    Visual    │  Deterministic templates (SVG/React)
│  Generation  │  Before/after, architecture diagrams, timelines
└──────────────┘
      ↓
┌──────────────┐
│   Sharing    │  Download, copy, public profile
└──────────────┘
      ↓
    Growth Loop (shared story → profile → new user)
```

---

## MVP Scope

### Included in MVP

1. **Landing page** with clear value proposition and example story
2. **GitHub OAuth authentication** (read-only repository access)
3. **Repository selection** from user's repositories
4. **Ingestion pipeline** for last 30 days of activity:
   - Commits with metadata
   - Changed files per commit
   - Diffs (additions/deletions)
   - Pull request metadata (where available)
5. **Engineering signal detection** (deterministic):
   - Dependency changes
   - API route changes
   - Database/schema changes
   - Test file changes
   - Configuration changes
   - Infrastructure files (Docker, CI/CD)
   - AI/ML-related changes (agents, RAG, tools, embeddings)
6. **AI-powered analysis** via Qwen (Ollama):
   - Structured output with validation
   - Evidence ID verification
   - Rejection of malformed responses
7. **Story discovery**:
   - Commit clustering by temporal proximity, file overlap, semantic similarity
   - Transparent scoring dimensions
   - Evidence-backed claims
8. **Story detail page**:
   - Title, summary, problem, change description
   - Why it matters
   - Full evidence list with GitHub links
   - Related commits
   - Changed files preview
9. **Content generation** (three modes):
   - Technical explanation
   - Narrative story
   - Career/portfolio description
   - X post (short form)
   - Resume bullet
   - Portfolio description
10. **Visual generation**:
    - Deterministic templates (before/after, architecture, timeline)
    - SVG/React-based rendering
    - Preview and download (PNG/SVG)
11. **Public profile** (`/@username`):
    - Developer identity
    - List of stories
    - Links to evidence where appropriate
    - Subtle ShipStory branding

### Explicitly NOT in MVP

- Mobile app
- Social feed, likes, comments, followers
- Team collaboration
- Billing or payments
- LinkedIn integration
- GitLab or Bitbucket support
- Browser extension
- Job marketplace
- AI coding assistant
- Full analytics dashboard
- Real-time collaboration
- Advanced customization of visuals
- Custom domain support
- Email notifications
- Scheduled re-analysis

---

## User Journeys

### Journey 1: First Visit

**Entry point:** Direct link, shared story, or search

**Experience:**

1. Lands on homepage
2. Sees headline: *"Your code has a story."*
3. Reads subheading explaining evidence-backed storytelling
4. Views realistic example story (not generic mockup)
5. Understands product in ~10 seconds
6. Clicks "Connect GitHub"

**Success criteria:** Visitor understands what ShipStory does within 10 seconds.

---

### Journey 2: GitHub Authentication

**Flow:**

1. Clicks "Connect GitHub"
2. Redirected to GitHub OAuth consent screen
3. Grants read-only repository access
4. Redirected back to ShipStory
5. Session created securely (token stored server-side only)
6. System fetches user's repository list

**Error handling:**

- User denies access → Clear message, retry option
- OAuth failure → Understandable error, support contact
- Rate limit → Retry with backoff, status indicator

---

### Journey 3: Repository Selection

**Screen shows:**

- "We found X repositories with recent activity"
- Filter options (last 30 days, 90 days, 6 months)
- Repository cards showing:
  - Name and description
  - Last activity date
  - Commit count (last 30 days)
  - Primary language
  - Story potential indicator (based on signal density)

**User action:**

- Selects one repository to analyze
- Optionally selects goal:
  - Build an audience
  - Build a portfolio
  - Prepare for jobs
  - Document engineering

**Note:** Goal affects presentation mode, not factual analysis.

---

### Journey 4: Repository Analysis

**Progress state:**

```
Analyzing your work...

✓ 47 commits ingested
✓ 12 pull requests fetched
✓ 23 technical changes detected
✓ Architecture patterns identified
✓ 8 test files analyzed
✓ 3 dependency changes found

Discovering stories...
```

**Duration target:** 30–90 seconds for typical repository

**Error states:**

- GitHub API timeout → "GitHub stopped responding. Retry?"
- Partial ingestion → "Analyzed 42/47 commits. Some data unavailable."
- No recent activity → "No significant changes in last 30 days. Try a different repository."

---

### Journey 5: Story Discovery

**Screen shows:**

Header: *"Your Engineering Stories"*

**Story cards** (example):

```
⚡ Redesigned AI Tool Execution

You introduced a caching layer around repeated tool execution,
reducing average latency from 1.8s to 420ms.

Evidence:
✓ Cache module added (src/cache/)
✓ Request runner modified (src/tools/runner.ts)
✓ Redis dependency added (package.json)
✓ Benchmark tests added (tests/benchmark.test.ts)

[View Story] [Create Post]
```

**Card elements:**

- Icon indicating story type (lightning = performance, shield = security, etc.)
- Title (action-oriented)
- One-sentence summary
- Evidence checklist (deterministic signals detected)
- Actions: View details, generate content

**Sorting:** By evidence strength and technical significance (not arbitrary score)

**Empty state:** "No significant stories found. This repository may contain routine maintenance work. Try selecting a repository with feature development."

---

### Journey 6: Story Inspection

**Story detail page contains:**

1. **Header**
   - Title
   - Story type badge (Technical / Story / Career)
   - Evidence strength indicator

2. **Summary section**
   - Problem statement (what was being solved)
   - Engineering change (what was done)
   - Why it matters (significance)

3. **Evidence section** (critical)
   - Claims with linked evidence
   - Each evidence item shows:
     - Type (commit, file, dependency, test)
     - Description
     - Link to GitHub source
   - Example:
     ```
     Claim: "Added Redis-backed caching"
     Evidence:
       • Commit abc123: "add redis client" [View on GitHub]
       • File added: src/cache/redis-cache.ts [View diff]
       • Dependency: redis@4.6.0 added to package.json [View change]
       • Test added: tests/cache.test.ts [View file]
     ```

4. **Related commits**
   - Timeline view of clustered commits
   - Commit messages, dates, authors
   - Quick diff preview

5. **Changed files**
   - List of files modified in story scope
   - Additions/deletions summary
   - File tree visualization

6. **Technical signals**
   - Detected patterns (caching, API change, etc.)
   - Confidence indicators
   - Raw signal data (for transparency)

7. **Generated content** (tabbed)
   - Technical explanation
   - Story narrative
   - Career description
   - X post
   - Resume bullet
   - Portfolio description
   - Regenerate button

8. **Visual preview**
   - Selected template
   - Before/after comparison or architecture diagram
   - Template selector
   - Download button

**Key UX principle:** User can always ask *"Why did ShipStory say this?"* and see evidence.

---

### Journey 7: Content Generation

**User selects mode:**

1. **Technical** (for engineering audiences)
   - Detailed explanation
   - Emphasizes architectural decisions
   - Includes technical tradeoffs

2. **Story** (for social media)
   - Narrative arc
   - Problem → solution → result
   - More conversational tone

3. **Career** (for portfolios/resumes)
   - Professional language
   - Emphasizes impact and skills
   - Suitable for recruiters

**Generated outputs:**

- **X post:** 280 characters, natural tone, no fake hype
- **Resume bullet:** Action verb + task + result (evidence-backed)
- **Portfolio description:** 2–3 paragraphs, professional context
- **Technical explanation:** Detailed engineering narrative

**Controls:**

- Regenerate (same evidence, different wording)
- Edit manually
- Copy to clipboard
- Export as text

**Constraint:** All modes use same underlying evidence. Presentation changes, facts do not.

---

### Journey 8: Visual Generation

**Template types:**

1. **Before/After**
   - Metric comparison (latency, bundle size, test coverage)
   - Requires quantitative evidence

2. **Architecture Diagram**
   - Component flow before and after
   - Generated from file structure and signal detection

3. **Timeline**
   - Sequential phases of development
   - Derived from commit clustering

**Visual properties:**

- Deterministic (same input → same output)
- SVG/React-based (no external image generation)
- Consistent with ShipStory design system
- Subtle ShipStory watermark

**Actions:**

- Preview
- Select different template
- Customize accent color (limited options)
- Download as PNG or SVG
- Copy embed code

---

### Journey 9: Sharing

**Sharing options:**

1. **Download visual**
   - PNG (default, 1200×630 for social)
   - SVG (for editing)

2. **Copy content**
   - X post text
   - Resume bullet
   - Portfolio description

3. **Share profile link**
   - `shipstory.dev/@username`
   - Public view of stories
   - Evidence links visible

**Growth mechanism:**

Shared story → Recipient visits profile → Sees value → Connects own GitHub → Generates own stories

**No social features in MVP:** No likes, comments, or feed.

---

### Journey 10: Public Profile

**URL:** `shipstory.dev/@username`

**Profile contains:**

1. **Header**
   - Display name (from GitHub)
   - Bio (optional, from GitHub)
   - Avatar
   - "Connected to GitHub" badge

2. **Engineering stories section**
   - Grid of story cards
   - Filterable by story type
   - Each card links to detail page

3. **Technical themes**
   - Tags showing areas of work (caching, APIs, AI/ML, etc.)
   - Derived from signal detection

4. **Project history**
   - Repositories analyzed
   - Activity timeline

**Privacy controls (MVP):**

- Public by default
- Option to hide specific stories
- Option to make entire profile private

**Branding:** Subtle "Built with ShipStory" footer on shared visuals and profile.

---

## Story Concept

### What Qualifies as a "Story"?

A story represents a **meaningful engineering change** or **coherent group of related changes**—not a single commit.

**Examples of valid stories:**

✅ *"Added Redis-backed caching to reduce API latency"*
- Multiple commits (setup, integration, testing, optimization)
- Clear engineering intent
- Measurable impact
- Distinct before/after state

✅ *"Implemented tool-calling agent with evaluation pipeline"*
- Architectural change
- Multiple components (agent, tools, evaluator)
- Test coverage
- Documentation

✅ *"Migrated from REST to GraphQL API"*
- Significant refactor
- Schema changes
- Client updates
- Breaking change management

**Examples of non-stories:**

❌ *"Fixed typo in README"*
- Trivial change
- No engineering significance

❌ *"Updated dependencies"*
- Routine maintenance
- Unless it includes breaking change migration

❌ *"Initial commit"*
- No context
- No before/after comparison

### Story Grouping Criteria

Commits are grouped into stories based on:

1. **Temporal proximity** (commits within 3–7 days)
2. **File overlap** (same directories or files modified)
3. **Dependency relationships** (shared new/modified dependencies)
4. **Semantic similarity** (commit messages, diff content)
5. **Pull request relationships** (commits in same PR)
6. **Signal correlation** (multiple commits trigger same signal type)

**Clustering algorithm (simplified):**

```
For each commit:
  Extract signals
  Find nearby commits (temporal + file overlap)
  Group if signal correlation > threshold
  
For each group:
  Analyze coherence (do signals tell unified story?)
  Score by evidence strength
  Reject if too weak or scattered
```

**Transparency:** UI explains why commits were grouped:
*"These 7 commits were grouped because they all modify the caching layer and were committed within 5 days."*

---

## Evidence Model

### Layer 1: Raw GitHub Facts

**Source:** GitHub API (source of truth)

**Examples:**

- Commit SHA: `abc123...`
- Commit author: `alex@developer.com`
- Commit date: `2025-01-15T14:32:00Z`
- Commit message: `"add redis client"`
- Changed files: `["src/cache/redis.ts", "package.json"]`
- Additions: 47 lines
- Deletions: 3 lines
- Diff content: Unified diff format
- PR metadata: title, labels, reviewers
- Repository metadata: name, description, language

**Properties:**

- Immutable (once ingested)
- Verifiable (can check against GitHub)
- Never invented by AI
- Stored with timestamps

---

### Layer 2: Deterministic Signals

**Source:** Application code (rule-based detection)

**Examples:**

- `DEPENDENCY_ADDED`: `redis@4.6.0` added to `package.json`
- `API_ROUTE_CHANGED`: New file `src/app/api/tools/route.ts`
- `DATABASE_SCHEMA_CHANGED`: Migration file added
- `TEST_ADDED`: New file matching `*.test.ts`
- `CACHE_MODULE_ADDED`: Directory `src/cache/` created
- `AUTH_IMPLEMENTATION`: Files matching auth patterns
- `CI_CONFIG_CHANGED`: `.github/workflows/*` modified
- `DOCKER_CONFIG_ADDED`: `Dockerfile` or `docker-compose.yml`
- `AI_TOOL_CALLING`: Files with tool-calling patterns

**Detection rules:**

- Path-based (file names, directories)
- Content-based (regex patterns, AST analysis)
- Dependency-based (package.json changes)
- Structure-based (new routes, new modules)

**Properties:**

- Reproducible (same input → same signal)
- Explainable (can show which rule triggered)
- No AI involvement
- Used as context for AI interpretation

---

### Layer 3: AI Interpretation

**Source:** Qwen model (via provider abstraction)

**Role:** Interpret supplied evidence, not invent facts

**Input to AI:**

- Raw facts (Layer 1)
- Deterministic signals (Layer 2)
- Context (repository metadata, file structure)

**Output from AI:**

```typescript
{
  summary: "Added Redis-backed caching to tool execution",
  problem: "Tool execution was slow due to repeated identical requests",
  change: "Introduced caching layer with invalidation strategy",
  technicalSignificance: 0.8, // High
  storyPotential: 0.9,        // High
  visualPotential: 0.7,       // Medium-High
  claims: [
    {
      text: "Added Redis-backed caching",
      evidenceIds: ["signal:cache_module", "dep:redis", "commit:abc123"]
    },
    {
      text: "Reduced average latency by 77%",
      evidenceIds: ["benchmark:test_file"]
    }
  ]
}
```

**Constraints:**

- AI may only reference evidence IDs that exist in Layer 1 or 2
- All claims must include `evidenceIds` array
- Numerical scores are relative, not absolute precision
- AI cannot invent metrics without evidence

**Validation:**

- Schema validation (Zod or similar)
- Evidence ID verification (all IDs must exist)
- Rejection of malformed JSON
- Timeout handling
- Retry logic

---

### Layer 4: Generated Content

**Source:** AI generation (constrained by evidence)

**Examples:**

- Story title: *"How I Redesigned Tool Execution with Caching"*
- Narrative: *"I thought the model was slow. Turns out we were making the same API calls repeatedly..."*
- X post: *"Just shipped Redis-backed caching for tool execution. Latency: 1.8s → 420ms. Sometimes the bottleneck isn't what you think."*
- Resume bullet: *"Designed and implemented Redis-backed caching layer, reducing average API latency by 77%"*

**Rules:**

- Must derive from Layer 3 interpretation
- Cannot introduce new claims without evidence
- Tone varies by mode (Technical/Story/Career)
- Facts remain constant across modes

---

## Story Scoring

### Transparent Dimensions

Stories are evaluated along six dimensions. Scores are **relative indicators**, not scientifically precise measurements.

| Dimension | Description | Scale |
|-----------|-------------|-------|
| **Evidence Strength** | How much verifiable evidence supports the story? | 0.0–1.0 |
| **Technical Depth** | How sophisticated is the engineering work? | 0.0–1.0 |
| **Change Scope** | How many files/commits/components involved? | 0.0–1.0 |
| **Novelty** | How unusual/interesting is this type of work? | 0.0–1.0 |
| **Communication Potential** | How well can this be explained to others? | 0.0–1.0 |
| **Visual Potential** | Can this be represented visually (before/after, diagram)? | 0.0–1.0 |

### Scoring Guidelines

**Evidence Strength:**

- 0.9–1.0: 5+ evidence items including commits, files, dependencies, tests
- 0.7–0.9: 3–4 evidence items with strong signals
- 0.5–0.7: 2–3 evidence items, some weak signals
- <0.5: Insufficient evidence, reject as story

**Technical Depth:**

- 0.9–1.0: Architectural redesign, novel algorithms, complex systems
- 0.7–0.9: New subsystem, integration of multiple technologies
- 0.5–0.7: Feature implementation, standard patterns
- <0.5: Routine changes, bug fixes

**Change Scope:**

- 0.9–1.0: 10+ files, 5+ commits, multiple components
- 0.7–0.9: 5–10 files, 3–5 commits
- 0.5–0.7: 3–5 files, 2–3 commits
- <0.5: 1–2 files, 1 commit

**Novelty:**

- 0.9–1.0: First-of-kind implementation, research-level work
- 0.7–0.9: Uncommon patterns, creative solutions
- 0.5–0.7: Standard implementations done well
- <0.5: Boilerplate, CRUD operations

**Communication Potential:**

- 0.9–1.0: Clear problem/solution, relatable, quantifiable impact
- 0.7–0.9: Good narrative arc, some quantification
- 0.5–0.7: Technical details clear, narrative weak
- <0.5: Hard to explain, jargon-heavy

**Visual Potential:**

- 0.9–1.0: Clear before/after metrics, architecture diagram possible
- 0.7–0.9: Some metrics, partial diagram
- 0.5–0.7: Timeline possible, limited metrics
- <0.5: No clear visualization

### Overall Story Priority

For MVP, display stories sorted by:

1. **Evidence Strength** (must exceed 0.5 threshold)
2. **Technical Significance** (average of depth + novelty)
3. **Communication Potential** (average of communication + visual)

**No single "overall score"** in MVP to avoid false precision.

UI displays dimension badges:
```
Evidence: ████████░░ 0.8
Depth:    ███████░░░ 0.7
Scope:    █████████░ 0.9
```

---

## Content Modes

### Mode 1: Technical

**Audience:** Engineering peers, technical hiring managers

**Characteristics:**

- Precise technical language
- Emphasizes architectural decisions
- Discusses tradeoffs explicitly
- Includes implementation details
- Avoids marketing speak

**Example:**

> *"Redesigned the tool execution pipeline to introduce Redis-backed caching. The original implementation executed identical tool calls repeatedly, resulting in average latencies of 1.8s. The new architecture intercepts tool requests, checks cache with 5-minute TTL, and invalidates on write operations. This reduced p50 latency to 420ms while maintaining consistency guarantees."*

**Evidence requirements:** High (must show architecture changes, benchmarks)

---

### Mode 2: Story

**Audience:** Social media, blog readers, general tech community

**Characteristics:**

- Narrative arc (problem → discovery → solution → result)
- Conversational tone
- Personal perspective ("I discovered...")
- Relatable framing
- Concise

**Example:**

> *"I thought the model was slow. Spent two days optimizing prompts, tweaking parameters—nothing worked. Then I checked the logs and realized we were making the exact same API call five times in a row. Added Redis caching, and boom: 1.8s down to 420ms. Sometimes the bottleneck isn't what you think."*

**Evidence requirements:** Medium (must show problem and solution)

---

### Mode 3: Career

**Audience:** Recruiters, hiring managers, portfolio reviewers

**Characteristics:**

- Professional language
- Emphasizes impact and outcomes
- Highlights skills demonstrated
- Suitable for resumes/LinkedIn
- Quantifies results when possible

**Example:**

> *"Designed and implemented a Redis-backed caching layer for an AI tool execution system, reducing average API latency by 77% (1.8s → 420ms). Architected cache invalidation strategy to maintain data consistency while improving throughput. Added comprehensive benchmark tests to validate performance improvements."*

**Evidence requirements:** High (must quantify claims with evidence)

---

### Mode Consistency Rule

**All three modes use identical underlying evidence.**

- Same commits
- Same files
- Same signals
- Same facts

Only **presentation** and **tone** differ.

If a claim cannot be supported in Technical mode, it cannot be supported in Story or Career mode either.

---

## Success Metrics

### MVP Metrics (Track from Day 1)

| Metric | Definition | Target |
|--------|------------|--------|
| **Repository Connection Rate** | % of authenticated users who connect at least one repository | >80% |
| **Successful Ingestion Rate** | % of repository analyses that complete without errors | >90% |
| **Stories Discovered per Repository** | Average number of valid stories found | 3–8 |
| **Story Inspection Rate** | % of discovered stories that users click to view in detail | >60% |
| **Content Generation Rate** | % of inspected stories where user generates content | >40% |
| **Visual Generation Rate** | % of stories where user previews/downloads visual | >30% |
| **Share/Download Rate** | % of generated content/visuals that are copied or downloaded | >25% |
| **Return Usage** | % of users who return within 7 days to analyze another repository | >30% |

### Secondary Metrics

- Average time from authentication to first story view
- Most common story types (technical vs. story vs. career)
- Most used content formats (X post vs. resume vs. portfolio)
- Most popular visual templates
- Error rates by category (GitHub API, AI provider, validation)

### Vanity Metrics to Avoid (Initially)

- Total stories generated (without context of quality)
- Total users (without activation rate)
- Page views (without conversion)
- Social shares (without tracking downstream conversions)

---

## Product Risks

### Risk 1: Stories Are Boring

**Problem:** Generated stories feel generic or uninteresting.

**Mitigation:**

- Focus on repositories with genuine engineering work (filter low-signal repos)
- Improve clustering to find coherent narratives
- Allow manual story editing/regeneration
- Curate example stories that showcase best cases

**Validation:** User testing with target persona before launch.

---

### Risk 2: AI Hallucination

**Problem:** Qwen invents facts, metrics, or technologies.

**Mitigation:**

- Strict evidence ID validation (reject claims with invalid IDs)
- Schema validation on all AI output
- Never allow AI to generate raw numbers without evidence
- Provide "Report incorrect claim" feedback loop
- Log all AI outputs for auditing

**Critical:** Evidence graph must be auditable by users.

---

### Risk 3: Insufficient Evidence

**Problem:** Repository activity too sparse to form meaningful stories.

**Mitigation:**

- Set minimum evidence thresholds for story creation
- Show "insufficient activity" message gracefully
- Suggest analyzing repositories with more recent changes
- Allow extending analysis window (30 → 90 days)

**Edge case:** Student portfolios may have bursty activity (finals week). Handle appropriately.

---

### Risk 4: Poor Story Grouping

**Problem:** Commits grouped incorrectly, creating nonsensical stories.

**Mitigation:**

- Start with conservative clustering (tighter temporal/file constraints)
- Show users why commits were grouped (transparency)
- Allow manual story splitting/merging (post-MVP)
- Collect feedback on grouping quality

**Iteration:** Clustering algorithm will require tuning based on real data.

---

### Risk 5: Generated Content Sounds Generic

**Problem:** X posts and resume bullets sound like AI slop.

**Mitigation:**

- Constrain AI with specific templates and tone guidelines
- Use few-shot prompting with high-quality examples
- Avoid overused phrases ("leveraged", "spearheaded", "game-changing")
- Human review of generated examples before launch
- Allow extensive manual editing

**Test:** Compare generated content to human-written examples blind.

---

### Risk 6: Visuals Are Not Useful

**Problem:** Generated visuals look generic or misrepresent the work.

**Mitigation:**

- Start with simple templates (before/after metrics, basic architecture)
- Ensure visuals directly reflect evidence (no decorative elements)
- Allow template selection and customization
- Provide download for external editing

**Validation:** User testing on visual comprehension.

---

### Risk 7: GitHub Data Insufficient to Understand Intent

**Problem:** Code changes alone don't reveal why decisions were made.

**Mitigation:**

- Supplement with PR descriptions and commit messages (when available)
- Acknowledge uncertainty in AI interpretations ("appears to", "suggests")
- Allow users to add context manually (post-MVP feature)
- Focus on observable changes rather than inferred intent

**Philosophy:** Better to underclaim than overclaim.

---

### Risk 8: Privacy Concerns

**Problem:** Users uncomfortable sharing repository data or public profiles.

**Mitigation:**

- Read-only GitHub permissions (minimum required scope)
- Clear privacy policy explaining data usage
- Option to keep profiles private
- No storage of unnecessary repository contents
- Easy account/data deletion

**Compliance:** GDPR considerations for European users.

---

### Risk 9: Over-Reliance on AI

**Problem:** Product breaks if Qwen/Ollama unavailable.

**Mitigation:**

- Design evidence engine to provide value independently
- Show deterministic signals even without AI analysis
- Graceful degradation (show evidence, note AI unavailable)
- Provider abstraction allows switching models

**Long-term:** Consider fine-tuning smaller model for reliability.

---

### Risk 10: Limited Differentiation

**Problem:** Competitors emerge with similar "AI reads GitHub" pitch.

**Mitigation:**

- Double down on evidence graph as differentiator
- Build superior engineering signal detection
- Create distinctive visual style (Linear + GitHub aesthetic)
- Focus on specific personas (AI builders, indie hackers) initially
- Community building around shared engineering stories

**Moat:** Quality of evidence analysis, not AI itself.

---

## Appendix: Example Stories

### Example Story 1: Performance Optimization

**Title:** Reduced API Latency by 77% with Redis Caching

**Evidence:**

- Commit `abc123`: "add redis client" (+47 lines in `src/cache/redis.ts`)
- Commit `def456`: "integrate cache into request handler" (+23 lines, -5 lines)
- Commit `ghi789`: "add cache invalidation" (+18 lines)
- Commit `jkl012`: "add benchmark tests" (+89 lines in `tests/benchmark.test.ts`)
- Dependency: `redis@4.6.0` added to `package.json`
- Signal: `CACHE_MODULE_ADDED`, `DEPENDENCY_ADDED`, `TEST_ADDED`

**AI Interpretation:**

> "Developer identified performance bottleneck in repeated tool execution and implemented caching layer with invalidation strategy."

**Generated Content (Technical Mode):**

> "Redesigned tool execution pipeline to introduce Redis-backed caching. Original implementation executed identical tool calls repeatedly (avg. 1.8s latency). New architecture intercepts requests, checks cache with 5-minute TTL, invalidates on writes. Achieved 77% latency reduction (1.8s → 420ms) while maintaining consistency."

**Visual:** Before/After latency comparison with architecture diagram.

---

### Example Story 2: AI Agent Development

**Title:** Built Tool-Calling Agent with Automated Evaluation

**Evidence:**

- 12 commits over 9 days
- New directory: `src/agent/` (7 files)
- New directory: `src/tools/` (5 files)
- New directory: `src/evaluation/` (4 files)
- Dependencies: `zod`, `ai-sdk`, `langchain`
- Tests: 89% coverage in `tests/agent/`
- Signal: `AI_TOOL_CALLING`, `EVALUATION_PIPELINE`, `TEST_COVERAGE_HIGH`

**AI Interpretation:**

> "Developer built autonomous agent system with tool-calling capabilities, integrated evaluation pipeline for quality assurance, achieved high test coverage."

**Generated Content (Career Mode):**

> "Architected and implemented an autonomous AI agent with dynamic tool-calling capabilities. Designed evaluation pipeline to assess agent output quality automatically. Achieved 89% test coverage through comprehensive unit and integration tests. System handles 500+ daily requests in production."

**Visual:** Architecture diagram showing agent → tools → evaluation flow.

---

### Example Story 3: Infrastructure Simplification

**Title:** Migrated from Docker Compose to Kubernetes

**Evidence:**

- Removed: `docker-compose.yml` (-234 lines)
- Added: `k8s/deployment.yaml`, `k8s/service.yaml`, `k8s/ingress.yaml`
- Added: Helm charts in `helm/` directory
- CI/CD: Updated `.github/workflows/deploy.yml`
- Documentation: Updated `DEPLOYMENT.md`
- Signal: `K8S_MIGRATION`, `CI_CD_CHANGED`, `DOCS_UPDATED`

**AI Interpretation:**

> "Developer led infrastructure migration from Docker Compose to Kubernetes, improving scalability and deployment automation."

**Generated Content (Story Mode):**

> "Our Docker Compose setup worked great—until it didn't. When traffic spiked, we had no way to scale individual services. Spent two weeks migrating to Kubernetes: wrote deployments, services, ingress rules. Built Helm charts for repeatable deploys. Updated CI/CD to automate everything. Now we can scale from 1 to 100 pods in minutes."

**Visual:** Timeline showing migration phases.

---

## Version History

- **v0.1** (2025-01-20): Initial product specification
- **v0.2** (TBD): Post-MVP iteration based on user feedback

---

## Approval

This document serves as the product contract for ShipStory MVP development.

Any significant deviations from this specification should be documented and approved before implementation.
