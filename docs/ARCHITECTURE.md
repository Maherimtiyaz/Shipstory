# ShipStory — Technical Architecture

## Technology Direction

### Core Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend Framework** | Next.js 14+ (App Router) | Server-side rendering, API routes, TypeScript-first |
| **Language** | TypeScript (strict mode) | Type safety, better refactoring, fewer runtime errors |
| **Styling** | Tailwind CSS | Rapid UI development, consistent design system |
| **UI Components** | shadcn/ui | Copy-paste components, full control, no black boxes |
| **Database** | PostgreSQL | Relational data, complex queries, proven reliability |
| **ORM** | Prisma | Type-safe database access, migrations, developer experience |
| **Queue** | Redis + BullMQ | Background job processing (deferred until needed) |
| **GitHub Integration** | GitHub API v3/v4 | OAuth, repository data, webhooks (future) |
| **AI Provider** | Qwen via Ollama | Local execution, cost control, provider abstraction |
| **Visual Generation** | React + SVG + HTML | Deterministic templates, no external image APIs |

### Phase-Based Dependency Introduction

**Phase 1 (Foundation):**
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

**Phase 2–3 (UI Mocks):**
- No new dependencies
- Mock data for demonstration

**Phase 4 (Authentication):**
- `next-auth` or custom OAuth implementation
- `zod` for validation

**Phase 5 (Database):**
- PostgreSQL (external service)
- Prisma ORM
- Database hosting (local → production)

**Phase 6–7 (AI Integration):**
- Ollama client library (or direct HTTP)
- Provider abstraction (custom code)

**Phase 8+ (Background Processing):**
- Redis (external service)
- BullMQ (when ingestion requires async processing)

---

## Architecture Principles

### 1. Evidence-First Design

**Rule:** All AI-generated claims must trace back to verifiable evidence.

**Implementation:**

```typescript
// Every claim includes evidence IDs
interface Claim {
  text: string;
  evidenceIds: string[]; // Must reference existing evidence
}

// Validation ensures all IDs exist
function validateClaim(claim: Claim, availableEvidence: Set<string>): boolean {
  return claim.evidenceIds.every(id => availableEvidence.has(id));
}
```

**Consequence:** AI cannot invent facts. Invalid evidence IDs cause rejection.

---

### 2. Provider Abstraction

**Rule:** AI provider implementation details are isolated from business logic.

**Implementation:**

```typescript
// Abstract interface
interface AIProvider {
  analyzeEngineeringChange(input: AnalysisInput): Promise<AnalysisOutput>;
  discoverStories(input: StoryDiscoveryInput): Promise<StoryDiscoveryOutput>;
  generateContent(input: ContentInput): Promise<ContentOutput>;
}

// Concrete implementation
class QwenProvider implements AIProvider {
  // Implementation details hidden
}

// Future provider (e.g., Anthropic, OpenAI)
class AnotherProvider implements AIProvider {
  // Same interface, different implementation
}
```

**Consequence:** Switching AI providers requires changing only the provider class, not the story engine.

---

### 3. Server-Side Secrets

**Rule:** Sensitive credentials never reach the client.

**Implementation:**

```typescript
// ✅ Correct: Server-side only
async function fetchGitHubData(accessToken: string) {
  // Token stored in server session, never sent to browser
  const response = await fetch('https://api.github.com/user/repos', {
    headers: { Authorization: `token ${accessToken}` }
  });
  return response.json();
}

// ❌ Wrong: Never do this
function getClientToken() {
  return window.localStorage.getItem('github_token'); // EXPOSED!
}
```

**Storage:**

- OAuth tokens: Encrypted in database, accessed server-side only
- API keys: Environment variables on server
- Session cookies: HTTP-only, secure, same-site strict

---

### 4. Strict Ownership Boundaries

**Rule:** Users can only access their own data.

**Implementation:**

```typescript
// Every query includes user ownership check
async function getRepository(repositoryId: string, userId: string) {
  const repo = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: userId, // Ownership enforced
    }
  });
  
  if (!repo) {
    throw new UnauthorizedError('Repository not found or access denied');
  }
  
  return repo;
}
```

**Consequence:** Even with a valid ID, users cannot access another user's repositories.

---

### 5. Schema Validation

**Rule:** All external input is validated against strict schemas.

**Implementation:**

```typescript
import { z } from 'zod';

const AnalysisOutputSchema = z.object({
  summary: z.string(),
  problem: z.string().nullable(),
  change: z.string(),
  technicalSignificance: z.number().min(0).max(1),
  storyPotential: z.number().min(0).max(1),
  visualPotential: z.number().min(0).max(1),
  claims: z.array(z.object({
    text: z.string(),
    evidenceIds: z.array(z.string())
  }))
});

function parseAnalysisOutput(raw: unknown): AnalysisOutput {
  try {
    return AnalysisOutputSchema.parse(raw);
  } catch (error) {
    throw new ValidationError('Invalid AI output format', error);
  }
}
```

**Consequence:** Malformed AI responses are rejected before affecting the system.

---

### 6. Idempotent Ingestion

**Rule:** Re-running ingestion does not duplicate data.

**Implementation:**

```typescript
async function ingestCommit(commitData: GitHubCommit, repositoryId: string) {
  // Use commit SHA as stable external ID
  const existing = await prisma.commit.findUnique({
    where: {
      repositoryId_sha: {
        repositoryId,
        sha: commitData.sha
      }
    }
  });
  
  if (existing) {
    // Update instead of insert
    return prisma.commit.update({
      where: { id: existing.id },
      data: { /* updated fields */ }
    });
  }
  
  // Insert new commit
  return prisma.commit.create({
    data: {
      repositoryId,
      sha: commitData.sha,
      /* other fields */
    }
  });
}
```

**Consequence:** Safe to retry failed ingestion jobs without cleanup.

---

### 7. Deterministic Business Logic

**Rule:** Non-AI logic produces reproducible results.

**Implementation:**

```typescript
// ✅ Deterministic signal detection
function detectSignals(files: ChangedFile[]): EngineeringSignal[] {
  const signals: EngineeringSignal[] = [];
  
  for (const file of files) {
    if (file.path.includes('cache')) {
      signals.push({ type: 'CACHE_MODULE_ADDED', fileId: file.id });
    }
    
    if (file.path === 'package.json' && file.additions > 0) {
      signals.push({ type: 'DEPENDENCY_ADDED', fileId: file.id });
    }
  }
  
  return signals; // Same input → same output
}

// ❌ Non-deterministic (avoid)
function detectSignals(files: ChangedFile[]) {
  // Don't use random sampling, timestamps, or external state
  if (Math.random() > 0.5) { // BAD!
    return ['SIGNAL_A'];
  }
  return ['SIGNAL_B'];
}
```

**Consequence:** Signal detection is testable and debuggable.

---

### 8. AI as Interpretation, Not Source of Truth

**Rule:** AI interprets supplied evidence; it does not discover facts.

**Implementation:**

```typescript
// ✅ Correct: AI receives evidence, returns interpretation
async function analyzeWithAI(evidence: Evidence[], signals: EngineeringSignal[]) {
  const prompt = `
    Analyze these engineering changes:
    
    Evidence:
    ${evidence.map(e => `- ${e.description}`).join('\n')}
    
    Signals detected:
    ${signals.map(s => `- ${s.type}`).join('\n')}
    
    Provide interpretation (do not invent new facts):
  `;
  
  const response = await aiProvider.analyzeEngineeringChange({ prompt });
  return response; // Interpretation only
}

// ❌ Wrong: Letting AI discover facts
async function analyzeWithAI(commits: Commit[]) {
  const prompt = `
    Here are some commits. Tell me what happened:
    ${commits.map(c => c.message).join('\n')}
  `;
  // AI might invent details not in commits!
}
```

**Consequence:** AI hallucinations are constrained to interpretation, not fact invention.

---

### 9. Incremental Implementation

**Rule:** Build incrementally, validate each phase before proceeding.

**Phases:**

1. Foundation (Next.js, TypeScript, Tailwind) — No backend
2. Landing page — Static, mock data
3. Dashboard — Mock data, real UI
4. Authentication — Real GitHub OAuth
5. Ingestion — Real GitHub data
6. Signals — Deterministic analysis
7. AI — First Qwen integration
8. Stories — Clustering and discovery
9. Content — Generation modes
10. Visuals — Templates
11. Profile — Public pages
12. Hardening — Security, performance

**Consequence:** Each phase is independently testable and valuable.

---

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          BROWSER                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Landing   │  │  Dashboard  │  │    Story Detail         │ │
│  │    Page     │  │    (Mock)   │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                       NEXT.JS APP                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    App Router                             │  │
│  │  /              → Landing page                            │  │
│  │  /dashboard     → Repository selection                    │  │
│  │  /stories/:id   → Story detail                            │  │
│  │  /@username     → Public profile                          │  │
│  │  /api/*         → API routes                              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Application Services                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Auth      │  │  GitHub     │  │    Story        │   │  │
│  │  │   Service   │  │  Service    │  │    Engine       │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ Ingestion   │  │  Signal     │  │    Content      │   │  │
│  │  │   Service   │  │  Detector   │  │    Generator    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Domain Layer                            │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │  Evidence   │  │   Story     │  │    Claim        │   │  │
│  │  │   Model     │  │   Model     │  │    Model        │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
            ↓                      ↓                      ↓
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   PostgreSQL     │   │   GitHub API     │   │   AI Provider    │
│   (Prisma)       │   │   (OAuth)        │   │   (Qwen/Ollama)  │
└──────────────────┘   └──────────────────┘   └──────────────────┘
            ↓
┌──────────────────┐
│   Redis +        │   (Phase 8+)
│   BullMQ         │
└──────────────────┘
```

### Request Flow Example: Repository Analysis

```
1. User clicks "Analyze Repository"
   ↓
2. Browser → POST /api/repositories/:id/analyze
   ↓
3. API Route validates ownership (user owns repository?)
   ↓
4. Ingestion Service fetches commits from GitHub API
   ↓
5. Normalization converts GitHub format → internal model
   ↓
6. Signal Detector extracts engineering signals (deterministic)
   ↓
7. Story Engine clusters commits into potential stories
   ↓
8. AI Provider analyzes each story cluster
   ↓
9. Validation checks AI output (schema + evidence IDs)
   ↓
10. Database persists stories, claims, evidence
    ↓
11. Response returned to browser
    ↓
12. Browser displays story discovery screen
```

---

## Directory Structure

```
shipstory/
├── docs/
│   ├── PRODUCT.md          # Product specification
│   ├── ARCHITECTURE.md     # This file
│   └── DESIGN.md           # Visual design system
│
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Auth-related routes
│   │   │   ├── login/
│   │   │   └── callback/
│   │   ├── (dashboard)/    # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   ├── repositories/
│   │   │   │   └── [id]/
│   │   │   │       └── analyze/
│   │   │   ├── stories/
│   │   │   │   └── [id]/
│   │   │   └── layout.tsx
│   │   ├── @username/      # Public profile
│   │   │   └── [username]/
│   │   │       └── page.tsx
│   │   ├── api/            # API routes
│   │   │   ├── auth/
│   │   │   ├── github/
│   │   │   ├── repositories/
│   │   │   ├── stories/
│   │   │   └── content/
│   │   ├── layout.tsx
│   │   └── page.tsx        # Landing page
│   │
│   ├── components/         # Shared UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── evidence/       # Evidence display components
│   │   ├── stories/        # Story cards, detail views
│   │   ├── visuals/        # Visual templates
│   │   └── layout/         # Navigation, footer, etc.
│   │
│   ├── features/           # Feature modules
│   │   ├── auth/           # Authentication logic
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── github/         # GitHub integration
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── repositories/   # Repository management
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── ingestion/      # Data ingestion pipeline
│   │   │   ├── services/
│   │   │   └── normalizers/
│   │   ├── engineering/    # Signal detection
│   │   │   ├── services/
│   │   │   ├── detectors/
│   │   │   └── types/
│   │   ├── stories/        # Story discovery engine
│   │   │   ├── services/
│   │   │   ├── clustering/
│   │   │   └── types/
│   │   ├── content/        # Content generation
│   │   │   ├── services/
│   │   │   ├── generators/
│   │   │   └── types/
│   │   ├── visuals/        # Visual generation
│   │   │   ├── components/
│   │   │   ├── templates/
│   │   │   └── services/
│   │   └── profiles/       # Public profiles
│   │       ├── components/
│   │       └── services/
│   │
│   ├── lib/                # Low-level utilities
│   │   ├── db/             # Database client (Prisma)
│   │   ├── github/         # GitHub API client
│   │   ├── ai/             # AI provider abstraction
│   │   │   ├── provider.ts
│   │   │   ├── qwen-provider.ts
│   │   │   └── types.ts
│   │   ├── queue/          # Background job queue
│   │   └── security/       # Security utilities
│   │
│   ├── server/             # Server-side only code
│   │   ├── db/             # Database schema (Prisma)
│   │   ├── sessions/       # Session management
│   │   └── middleware/     # Request middleware
│   │
│   └── types/              # Global type definitions
│       ├── domain.ts       # Domain models
│       ├── api.ts          # API types
│       └── utils.ts        # Utility types
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts             # Seed data (development)
│
├── public/                 # Static assets
│   ├── images/
│   └── fonts/
│
├── tests/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local              # Local environment variables
├── .env.example            # Example environment template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### Rationale for Structure

**Why `features/` instead of organizing by type?**

- Co-location: Related code lives together
- Easier refactoring: Move entire feature without touching others
- Clear boundaries: Features don't share internal implementation
- Scalability: Add new features without restructuring

**Why separate `lib/` and `features/`?**

- `lib/`: Low-level utilities (database client, API wrappers)
- `features/`: Business logic specific to ShipStory domains

**Why `server/` directory?**

- Code that must never run in browser
- Session management, database schema
- Clear security boundary

---

## Database Model

### Entity Relationship Overview

```
User (1) ──────< Account (N)
  │
  ├──────< Session (N)
  │
  ├──────< Repository (N)
  │           │
  │           ├──────< Commit (N)
  │           │         │
  │           │         ├──────< ChangedFile (N)
  │           │         │
  │           │         └──────< StoryCommit (N)
  │           │                   │
  │           │                   └────> Story (1)
  │           │
  │           ├──────< PullRequest (N)
  │           │
  │           └──────< EngineeringSignal (N)
  │
  ├──────< Story (N)
  │         │
  │         ├──────< Claim (N)
  │         │         │
  │         │         └──────< ClaimEvidence (N)
  │         │                   │
  │         │                   └────> Evidence (1)
  │         │
  │         └──────< GeneratedContent (N)
  │
  └──────< Visual (N)
            │
            └──────< GenerationJob (N)
```

### Core Entities

#### User

**Purpose:** Application user account

**Fields:**

- `id` (UUID, primary key)
- `githubId` (string, unique, from GitHub)
- `username` (string, unique, for public profile)
- `email` (string, nullable)
- `name` (string, nullable)
- `avatarUrl` (string, nullable)
- `bio` (text, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**MVP Required:** Yes

---

#### Account

**Purpose:** OAuth account linkage (supports multiple OAuth providers in future)

**Fields:**

- `id` (UUID, primary key)
- `userId` (UUID, foreign key → User)
- `provider` (string, e.g., "github")
- `providerAccountId` (string, GitHub user ID)
- `accessToken` (encrypted string)
- `refreshToken` (encrypted string, nullable)
- `expiresAt` (timestamp, nullable)
- `scope` (string, OAuth scopes)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**MVP Required:** Yes

**Note:** Access tokens must be encrypted at rest.

---

#### Session

**Purpose:** User session management

**Fields:**

- `id` (UUID, primary key)
- `userId` (UUID, foreign key → User)
- `sessionToken` (string, unique)
- `expiresAt` (timestamp)
- `createdAt` (timestamp)
- `lastActivityAt` (timestamp)

**MVP Required:** Yes

---

#### Repository

**Purpose:** GitHub repository metadata

**Fields:**

- `id` (UUID, primary key)
- `userId` (UUID, foreign key → User)
- `githubId` (number, unique, GitHub repository ID)
- `name` (string, e.g., "shipstory")
- `fullName` (string, e.g., "alex/shipstory")
- `description` (text, nullable)
- `htmlUrl` (string, GitHub URL)
- `language` (string, nullable, primary language)
- `isPrivate` (boolean)
- `defaultBranch` (string, e.g., "main")
- `lastIngestedAt` (timestamp, nullable)
- `ingestionStatus` (enum: PENDING, IN_PROGRESS, COMPLETED, FAILED)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes:**

- `userId` (for user's repositories)
- `githubId` (unique, for idempotency)
- `userId_lastIngestedAt` (for sorting)

**MVP Required:** Yes

---

#### Commit

**Purpose:** GitHub commit data

**Fields:**

- `id` (UUID, primary key)
- `repositoryId` (UUID, foreign key → Repository)
- `sha` (string, commit SHA)
- `message` (text, commit message)
- `authorName` (string)
- `authorEmail` (string, nullable)
- `authorGithubId` (string, nullable)
- `committedAt` (timestamp)
- `additions` (integer)
- `deletions` (integer)
- `changedFilesCount` (integer)
- `rawData` (JSON, full GitHub response for debugging)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes:**

- `repositoryId_sha` (unique composite, for idempotency)
- `repositoryId_committedAt` (for temporal queries)

**MVP Required:** Yes

---

#### ChangedFile

**Purpose:** Individual file changes within commits

**Fields:**

- `id` (UUID, primary key)
- `commitId` (UUID, foreign key → Commit)
- `filename` (string, file path)
- `status` (enum: ADDED, MODIFIED, DELETED, RENAMED)
- `additions` (integer)
- `deletions` (integer)
- `patch` (text, diff content, nullable)
- `previousFilename` (string, nullable, for renames)
- `createdAt` (timestamp)

**Indexes:**

- `commitId` (for commit's files)
- `filename` (for signal detection)

**MVP Required:** Yes

---

#### PullRequest

**Purpose:** GitHub pull request metadata

**Fields:**

- `id` (UUID, primary key)
- `repositoryId` (UUID, foreign key → Repository)
- `githubId` (number, unique, GitHub PR number)
- `title` (string)
- `body` (text, nullable)
- `state` (enum: OPEN, CLOSED, MERGED)
- `authorGithubId` (string)
- `createdAt` (timestamp)
- `mergedAt` (timestamp, nullable)
- `closedAt` (timestamp, nullable)
- `htmlUrl` (string)
- `labels` (JSON array, nullable)
- `rawData` (JSON, full GitHub response)

**Indexes:**

- `repositoryId_githubId` (unique composite)

**MVP Required:** Optional (nice-to-have for context)

---

#### EngineeringSignal

**Purpose:** Deterministic engineering signals detected from commits

**Fields:**

- `id` (UUID, primary key)
- `repositoryId` (UUID, foreign key → Repository)
- `commitId` (UUID, foreign key → Commit, nullable)
- `type` (enum, see signal types below)
- `confidence` (float, 0.0–1.0)
- `metadata` (JSON, signal-specific data)
- `detectedAt` (timestamp)

**Signal Types:**

- `DEPENDENCY_ADDED`
- `DEPENDENCY_REMOVED`
- `API_ROUTE_CHANGED`
- `DATABASE_SCHEMA_CHANGED`
- `TEST_ADDED`
- `CACHE_MODULE_ADDED`
- `AUTH_IMPLEMENTATION`
- `CI_CONFIG_CHANGED`
- `DOCKER_CONFIG_ADDED`
- `AI_TOOL_CALLING`
- `EVALUATION_PIPELINE`
- `PERFORMANCE_OPTIMIZATION`
- `REFACTORING_DETECTED`
- `DOCUMENTATION_UPDATED`

**Indexes:**

- `repositoryId` (for repository signals)
- `commitId` (for commit signals)
- `type` (for filtering)

**MVP Required:** Yes (core to evidence model)

---

#### Evidence

**Purpose:** Unified evidence records (commits, files, signals, etc.)

**Fields:**

- `id` (UUID, primary key) — This is the evidence ID referenced by claims
- `repositoryId` (UUID, foreign key → Repository)
- `type` (enum: COMMIT, FILE, SIGNAL, DEPENDENCY, PR)
- `referenceId` (string, ID of referenced entity)
- `description` (text, human-readable description)
- `metadata` (JSON, evidence-specific data)
- `githubUrl` (string, link to GitHub source)
- `createdAt` (timestamp)

**Indexes:**

- `repositoryId` (for repository evidence)
- `type_referenceId` (for lookups)

**MVP Required:** Yes (critical for evidence graph)

---

#### EngineeringAnalysis

**Purpose:** AI analysis results for commits/stories

**Fields:**

- `id` (UUID, primary key)
- `repositoryId` (UUID, foreign key → Repository)
- `storyId` (UUID, foreign key → Story, nullable)
- `summary` (text)
- `problem` (text, nullable)
- `change` (text)
- `technicalSignificance` (float, 0.0–1.0)
- `storyPotential` (float, 0.0–1.0)
- `visualPotential` (float, 0.0–1.0)
- `rawOutput` (JSON, raw AI response for debugging)
- `provider` (string, e.g., "qwen")
- `modelVersion` (string)
- `processedAt` (timestamp)

**MVP Required:** Yes

---

#### Story

**Purpose:** Discovered engineering stories

**Fields:**

- `id` (UUID, primary key)
- `repositoryId` (UUID, foreign key → Repository)
- `title` (string)
- `summary` (text)
- `problemStatement` (text, nullable)
- `engineeringChange` (text)
- `whyItMatters` (text, nullable)
- `evidenceStrength` (float, 0.0–1.0)
- `technicalDepth` (float, 0.0–1.0)
- `changeScope` (float, 0.0–1.0)
- `novelty` (float, 0.0–1.0)
- `communicationPotential` (float, 0.0–1.0)
- `visualPotential` (float, 0.0–1.0)
- `storyType` (enum: TECHNICAL, STORY, CAREER)
- `status` (enum: DRAFT, PUBLISHED, HIDDEN)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Indexes:**

- `repositoryId` (for repository stories)
- `status` (for filtering published stories)
- `evidenceStrength` (for sorting)

**MVP Required:** Yes

---

#### StoryCommit

**Purpose:** Join table linking commits to stories

**Fields:**

- `id` (UUID, primary key)
- `storyId` (UUID, foreign key → Story)
- `commitId` (UUID, foreign key → Commit)
- `groupingReason` (text, explains why commit was grouped)
- `createdAt` (timestamp)

**Indexes:**

- `storyId_commitId` (unique composite)

**MVP Required:** Yes

---

#### Claim

**Purpose:** Specific claims made in stories

**Fields:**

- `id` (UUID, primary key)
- `storyId` (UUID, foreign key → Story)
- `text` (text, claim statement)
- `mode` (enum: TECHNICAL, STORY, CAREER)
- `order` (integer, for display order)
- `createdAt` (timestamp)

**Indexes:**

- `storyId` (for story claims)

**MVP Required:** Yes

---

#### ClaimEvidence

**Purpose:** Join table linking claims to evidence

**Fields:**

- `id` (UUID, primary key)
- `claimId` (UUID, foreign key → Claim)
- `evidenceId` (UUID, foreign key → Evidence)
- `relationship` (text, how evidence supports claim)
- `createdAt` (timestamp)

**Indexes:**

- `claimId_evidenceId` (unique composite)
- `evidenceId` (for reverse lookups)

**MVP Required:** Yes (critical for evidence graph)

---

#### GeneratedContent

**Purpose:** AI-generated content (posts, bullets, descriptions)

**Fields:**

- `id` (UUID, primary key)
- `storyId` (UUID, foreign key → Story)
- `contentType` (enum: X_POST, RESUME_BULLET, PORTFOLIO_DESCRIPTION, TECHNICAL_EXPLANATION)
- `content` (text)
- `mode` (enum: TECHNICAL, STORY, CAREER)
- `characterCount` (integer)
- `regenerationCount` (integer, default 0)
- `createdAt` (timestamp)

**Indexes:**

- `storyId_contentType` (for story content)

**MVP Required:** Yes

---

#### Visual

**Purpose:** Generated visual representations

**Fields:**

- `id` (UUID, primary key)
- `storyId` (UUID, foreign key → Story)
- `templateType` (enum: BEFORE_AFTER, ARCHITECTURE_DIAGRAM, TIMELINE)
- `svgContent` (text, SVG markup)
- `metadata` (JSON, template-specific data)
- `downloadCount` (integer, default 0)
- `createdAt` (timestamp)

**MVP Required:** Yes

---

#### GenerationJob

**Purpose:** Track async generation jobs (for future background processing)

**Fields:**

- `id` (UUID, primary key)
- `userId` (UUID, foreign key → User)
- `jobType` (enum: ANALYSIS, CONTENT, VISUAL)
- `resourceId` (string, ID of resource being generated)
- `status` (enum: PENDING, PROCESSING, COMPLETED, FAILED)
- `error` (text, nullable)
- `startedAt` (timestamp, nullable)
- `completedAt` (timestamp, nullable)
- `createdAt` (timestamp)

**MVP Required:** Optional (can start synchronous, add later)

---

### Prisma Schema Notes

**Encryption:**

- `Account.accessToken` and `Account.refreshToken` must be encrypted
- Use application-level encryption before Prisma

**Cascading:**

- Delete User → cascade delete Accounts, Sessions, Repositories, Stories
- Delete Repository → cascade delete Commits, Signals, Evidence, Stories
- Delete Story → cascade delete Claims, GeneratedContent, Visuals

**Soft Deletes:**

- Consider soft deletes for Stories (status = HIDDEN) instead of hard deletes
- Allows users to "unpublish" without losing data

---

## GitHub Ingestion

### Authentication Flow

```
1. User clicks "Connect GitHub"
   ↓
2. Redirect to GitHub OAuth:
   GET https://github.com/login/oauth/authorize?
     client_id=CLIENT_ID&
     redirect_uri=CALLBACK_URL&
     scope=repo,read:user&
     state=RANDOM_STATE_TOKEN
   ↓
3. User authorizes
   ↓
4. GitHub redirects back with code:
   CALLBACK_URL?code=AUTH_CODE&state=STATE_TOKEN
   ↓
5. Verify state token (CSRF protection)
   ↓
6. Exchange code for access token:
   POST https://github.com/login/oauth/access_token
   Body: { client_id, client_secret, code, redirect_uri }
   ↓
7. Store encrypted token in Account table
   ↓
8. Create session for user
```

### Repository Discovery

```typescript
async function fetchUserRepositories(accessToken: string) {
  const repos: GitHubRepo[] = [];
  let page = 1;
  
  while (true) {
    const response = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}`,
      { headers: { Authorization: `token ${accessToken}` } }
    );
    
    const data = await response.json();
    repos.push(...data);
    
    if (data.length < 100) break; // No more pages
    page++;
  }
  
  // Filter to repositories with recent activity
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return repos.filter(repo => 
    new Date(repo.pushed_at) > thirtyDaysAgo
  );
}
```

### Commit Ingestion

```typescript
async function fetchRepositoryCommits(
  accessToken: string,
  owner: string,
  repo: string,
  since: Date
) {
  const commits: GitHubCommit[] = [];
  let page = 1;
  
  while (true) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?` +
      `since=${since.toISOString()}&per_page=100&page=${page}`,
      { headers: { Authorization: `token ${accessToken}` } }
    );
    
    const data = await response.json();
    commits.push(...data);
    
    if (data.length < 100) break;
    page++;
  }
  
  return commits;
}
```

### Diff Ingestion

```typescript
async function fetchCommitDiff(
  accessToken: string,
  owner: string,
  repo: string,
  sha: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
    { headers: { Authorization: `token ${accessToken}` } }
  );
  
  const commit = await response.json();
  
  // commit.files contains changed files with patches
  return {
    sha: commit.sha,
    message: commit.commit.message,
    files: commit.files,
    stats: commit.stats
  };
}
```

### Pagination Strategy

- Use `per_page=100` (maximum allowed)
- Track `Link` header for navigation
- Implement exponential backoff on rate limits
- Cache responses when possible

### Rate Limit Handling

```typescript
async function fetchWithRateLimitHandling(url: string, headers: HeadersInit) {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    const response = await fetch(url, { headers });
    
    if (response.status === 403) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      const waitTime = calculateWaitTime(resetTime);
      
      if (waitTime < 60000) { // Wait up to 60 seconds
        await sleep(waitTime);
        retryCount++;
        continue;
      }
    }
    
    return response;
  }
  
  throw new Error('GitHub rate limit exceeded. Please try again later.');
}
```

### Idempotency

```typescript
async function upsertCommit(repositoryId: string, githubCommit: any) {
  return prisma.commit.upsert({
    where: {
      repositoryId_sha: {
        repositoryId,
        sha: githubCommit.sha
      }
    },
    update: {
      message: githubCommit.commit.message,
      additions: githubCommit.stats.additions,
      deletions: githubCommit.stats.deletions,
      // ... other fields
    },
    create: {
      repositoryId,
      sha: githubCommit.sha,
      message: githubCommit.commit.message,
      // ... other fields
    }
  });
}
```

### Incremental Synchronization

```typescript
async function syncRepository(repositoryId: string, lastSyncAt: Date) {
  // Only fetch commits since last sync
  const newCommits = await fetchCommitsSince(repositoryId, lastSyncAt);
  
  for (const commit of newCommits) {
    await upsertCommit(repositoryId, commit);
    await ingestChangedFiles(commit);
  }
  
  await prisma.repository.update({
    where: { id: repositoryId },
    data: { lastIngestedAt: new Date() }
  });
}
```

---

## AI Architecture

### Provider Abstraction

```typescript
// src/lib/ai/provider.ts

export interface AnalysisInput {
  evidence: Evidence[];
  signals: EngineeringSignal[];
  context: AnalysisContext;
}

export interface AnalysisOutput {
  summary: string;
  problem: string | null;
  change: string;
  technicalSignificance: number;
  storyPotential: number;
  visualPotential: number;
  claims: Claim[];
}

export interface AIProvider {
  analyzeEngineeringChange(input: AnalysisInput): Promise<AnalysisOutput>;
  discoverStories(input: StoryDiscoveryInput): Promise<StoryDiscoveryOutput>;
  generateContent(input: ContentInput): Promise<ContentOutput>;
}
```

### Qwen Provider Implementation

```typescript
// src/lib/ai/qwen-provider.ts

import { AIProvider, AnalysisInput, AnalysisOutput } from './provider';

export class QwenProvider implements AIProvider {
  private baseUrl: string;
  private model: string;
  
  constructor(options: { baseUrl?: string; model?: string }) {
    this.baseUrl = options.baseUrl || 'http://localhost:11434';
    this.model = options.model || 'qwen-coder';
  }
  
  async analyzeEngineeringChange(input: AnalysisInput): Promise<AnalysisOutput> {
    const prompt = this.buildAnalysisPrompt(input);
    
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: false,
        format: 'json' // Request JSON output
      })
    });
    
    if (!response.ok) {
      throw new AIProviderError(`Qwen API error: ${response.statusText}`);
    }
    
    const result = await response.json();
    return this.parseAndValidateOutput(result.response);
  }
  
  private buildAnalysisPrompt(input: AnalysisInput): string {
    return `
You are an expert software engineer analyzing GitHub repository changes.
Your task is to interpret the engineering work and identify meaningful stories.

CONSTRAINTS:
- Only reference evidence IDs that are explicitly provided
- Do not invent metrics, files, or technologies
- If evidence is insufficient, say so
- Return valid JSON matching the schema

EVIDENCE PROVIDED:
${input.evidence.map(e => `- ID: ${e.id}, Type: ${e.type}, Description: ${e.description}`).join('\n')}

SIGNALS DETECTED:
${input.signals.map(s => `- ${s.type}: ${JSON.stringify(s.metadata)}`).join('\n')}

CONTEXT:
- Repository: ${input.context.repositoryName}
- Time period: ${input.context.startDate} to ${input.context.endDate}
- Primary language: ${input.context.primaryLanguage}

Return your analysis as JSON with this exact structure:
{
  "summary": "...",
  "problem": "..." or null,
  "change": "...",
  "technicalSignificance": 0.0-1.0,
  "storyPotential": 0.0-1.0,
  "visualPotential": 0.0-1.0,
  "claims": [
    {
      "text": "...",
      "evidenceIds": ["evidence-id-1", "evidence-id-2"]
    }
  ]
}
`.trim();
  }
  
  private parseAndValidateOutput(rawJson: string): AnalysisOutput {
    // Parse JSON
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch (error) {
      throw new ValidationError('Invalid JSON from AI provider', error);
    }
    
    // Validate schema
    const schema = AnalysisOutputSchema; // Zod schema
    const result = schema.safeParse(parsed);
    
    if (!result.success) {
      throw new ValidationError('AI output does not match schema', result.error);
    }
    
    return result.data;
  }
  
  // Implement other methods...
  async discoverStories() { /* ... */ }
  async generateContent() { /* ... */ }
}
```

### Adding a New Provider

```typescript
// src/lib/ai/anthropic-provider.ts

import { AIProvider, AnalysisInput, AnalysisOutput } from './provider';

export class AnthropicProvider implements AIProvider {
  private apiKey: string;
  
  async analyzeEngineeringChange(input: AnalysisInput): Promise<AnalysisOutput> {
    // Different API, same interface
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      messages: [{ role: 'user', content: this.buildPrompt(input) }]
    });
    
    return this.parseAndValidateOutput(response.content[0].text);
  }
  
  // Other methods...
}
```

### Usage in Story Engine

```typescript
// src/features/stories/services/story-engine.ts

import { AIProvider } from '@/lib/ai/provider';

export class StoryEngine {
  constructor(private aiProvider: AIProvider) {}
  
  async analyzeStoryCluster(cluster: CommitCluster): Promise<StoryCandidate> {
    const evidence = await this.gatherEvidence(cluster);
    const signals = await this.detectSignals(cluster);
    
    const analysis = await this.aiProvider.analyzeEngineeringChange({
      evidence,
      signals,
      context: {
        repositoryName: cluster.repositoryName,
        startDate: cluster.startDate,
        endDate: cluster.endDate,
        primaryLanguage: cluster.primaryLanguage
      }
    });
    
    // Validate evidence IDs exist
    const availableEvidenceIds = new Set(evidence.map(e => e.id));
    for (const claim of analysis.claims) {
      for (const evidenceId of claim.evidenceIds) {
        if (!availableEvidenceIds.has(evidenceId)) {
          throw new ValidationError(
            `Claim references non-existent evidence: ${evidenceId}`
          );
        }
      }
    }
    
    return this.buildStoryCandidate(analysis, cluster);
  }
}
```

---

## AI Safety & Validation

### Preventing Hallucination

**Strategy 1: Constrained Input**

```typescript
// ✅ Good: Provide only verified evidence
const input = {
  evidence: [
    { id: 'commit-abc', type: 'COMMIT', description: 'Added Redis client' },
    { id: 'file-xyz', type: 'FILE', description: 'src/cache/redis.ts (+47 lines)' }
  ],
  signals: [
    { type: 'DEPENDENCY_ADDED', metadata: { package: 'redis', version: '4.6.0' } }
  ]
};

// ❌ Bad: Let AI discover facts
const input = {
  commits: [...], // Raw commits, AI must interpret everything
  // AI might invent details not present
};
```

**Strategy 2: Evidence ID Whitelist**

```typescript
function validateEvidenceReferences(
  claims: Claim[],
  availableEvidence: Evidence[]
): void {
  const validIds = new Set(availableEvidence.map(e => e.id));
  
  for (const claim of claims) {
    for (const evidenceId of claim.evidenceIds) {
      if (!validIds.has(evidenceId)) {
        throw new ValidationError(
          `Claim "${claim.text}" references non-existent evidence: ${evidenceId}`
        );
      }
    }
  }
}
```

**Strategy 3: Numeric Claim Validation**

```typescript
function validateNumericClaims(claims: Claim[], evidence: Evidence[]): void {
  for (const claim of claims) {
    // Extract numbers from claim text
    const numbers = claim.text.match(/\d+(\.\d+)?%/g);
    
    if (numbers) {
      // Require benchmark evidence for percentage claims
      const hasBenchmark = evidence.some(
        e => e.type === 'BENCHMARK' || e.metadata?.hasMetrics
      );
      
      if (!hasBenchmark) {
        throw new ValidationError(
          `Claim "${claim.text}" makes numeric assertion without benchmark evidence`
        );
      }
    }
  }
}
```

**Strategy 4: Uncertainty Markers**

```typescript
// Prompt instruction
const prompt = `
When you are uncertain about an interpretation:
- Use phrases like "appears to", "suggests", "likely indicates"
- Do not state speculation as fact
- If evidence is insufficient, say "Insufficient evidence to determine"
`;
```

### Structured Output Validation

```typescript
import { z } from 'zod';

const ClaimSchema = z.object({
  text: z.string().min(10).max(500),
  evidenceIds: z.array(z.string()).min(1)
});

const AnalysisOutputSchema = z.object({
  summary: z.string().min(20).max(200),
  problem: z.string().nullable(),
  change: z.string().min(20).max(500),
  technicalSignificance: z.number().min(0).max(1),
  storyPotential: z.number().min(0).max(1),
  visualPotential: z.number().min(0).max(1),
  claims: z.array(ClaimSchema).min(1).max(10)
});

function validateAIOutput(raw: unknown): AnalysisOutput {
  try {
    return AnalysisOutputSchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
      throw new ValidationError(`AI output validation failed: ${issues.join(', ')}`);
    }
    throw error;
  }
}
```

### Error Handling

```typescript
async function safeAIAnalysis(input: AnalysisInput): Promise<AnalysisResult> {
  try {
    const output = await aiProvider.analyzeEngineeringChange(input);
    return { success: true, data: output };
  } catch (error) {
    if (error instanceof ValidationError) {
      // Log for debugging, return user-friendly message
      logger.warn('AI validation failed', { error, input });
      return {
        success: false,
        error: 'Analysis could not be validated. Please retry.'
      };
    }
    
    if (error instanceof TimeoutError) {
      return {
        success: false,
        error: 'Analysis timed out. The repository may be too large.'
      };
    }
    
    if (error instanceof AIProviderError) {
      return {
        success: false,
        error: 'AI service unavailable. Please try again later.'
      };
    }
    
    // Unexpected error
    logger.error('Unexpected AI error', error);
    return {
      success: false,
      error: 'An unexpected error occurred during analysis.'
    };
  }
}
```

---

## Background Processing

### When to Use Queues

**Use synchronous processing when:**

- Operation completes in < 30 seconds
- User is waiting for result
- Simple retry logic suffices

**Use background jobs when:**

- Operation may take > 30 seconds
- Complex retry/backoff needed
- Progress tracking required
- Multiple dependent steps

### MVP Approach

**Phase 1–7:** Synchronous processing

- Ingestion and analysis happen in-request
- Show loading state to user
- Accept 30–90 second wait time

**Phase 8+:** Introduce queues when:

- Users report timeouts
- Need to process multiple repositories
- Want to add progress indicators
- Need scheduled re-analysis

### BullMQ Setup (Future)

```typescript
// src/lib/queue/analysis-queue.ts

import { Queue, Worker } from 'bullmq';

const analysisQueue = new Queue('analysis', {
  connection: redisConnection
});

const analysisWorker = new Worker('analysis', async job => {
  const { repositoryId, userId } = job.data;
  
  // Update job status
  await job.updateProgress(10);
  
  // Ingest commits
  await ingestRepository(repositoryId);
  await job.updateProgress(40);
  
  // Detect signals
  const signals = await detectSignals(repositoryId);
  await job.updateProgress(60);
  
  // Analyze with AI
  const stories = await analyzeStories(repositoryId, signals);
  await job.updateProgress(90);
  
  // Persist results
  await persistStories(stories);
  await job.updateProgress(100);
  
  return { storyCount: stories.length };
}, {
  connection: redisConnection
});

// Usage
async function startAnalysis(repositoryId: string, userId: string) {
  const job = await analysisQueue.add('analyze', {
    repositoryId,
    userId
  });
  
  return { jobId: job.id };
}
```

---

## Security Architecture

### OAuth Token Protection

**Storage:**

```typescript
// Encrypt before storing
import { encrypt, decrypt } from '@/lib/security/encryption';

async function storeAccessToken(userId: string, token: string) {
  const encrypted = await encrypt(token, process.env.ENCRYPTION_KEY);
  
  await prisma.account.update({
    where: { userId },
    data: { accessToken: encrypted }
  });
}

async function getAccessToken(userId: string): Promise<string> {
  const account = await prisma.account.findUnique({
    where: { userId }
  });
  
  if (!account) throw new Error('No GitHub account linked');
  
  return await decrypt(account.accessToken, process.env.ENCRYPTION_KEY);
}
```

**Never:**

- Store tokens in localStorage
- Send tokens to browser
- Log tokens (even accidentally)
- Include tokens in error messages

---

### Session Security

```typescript
// Secure cookie configuration
const sessionCookie = {
  httpOnly: true,        // Not accessible via JavaScript
  secure: true,          // HTTPS only
  sameSite: 'strict',    // CSRF protection
  maxAge: 60 * 60 * 24,  // 24 hours
  path: '/'
};

// Session validation middleware
async function validateSession(request: Request): Promise<User> {
  const sessionToken = request.cookies.get('session')?.value;
  
  if (!sessionToken) {
    throw new UnauthorizedError('No session found');
  }
  
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true }
  });
  
  if (!session || session.expiresAt < new Date()) {
    throw new UnauthorizedError('Session expired');
  }
  
  return session.user;
}
```

---

### Repository Authorization

```typescript
// Every repository access must verify ownership
async function getRepositoryForUser(
  repositoryId: string,
  userId: string
): Promise<Repository> {
  const repository = await prisma.repository.findFirst({
    where: {
      id: repositoryId,
      userId: userId  // Critical: enforce ownership
    }
  });
  
  if (!repository) {
    // Generic error to avoid enumeration attacks
    throw new NotFoundError('Repository not found');
  }
  
  return repository;
}

// API route example
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await validateSession(request);
  const repository = await getRepositoryForUser(params.id, user.id);
  
  return Response.json(repository);
}
```

---

### Private Repository Handling

**Scope Requirements:**

- Minimum scope: `public_repo` (public repos only)
- Full scope: `repo` (public + private repos)

**User Consent:**

```typescript
// Clearly communicate scope during OAuth
const oauthParams = {
  client_id: process.env.GITHUB_CLIENT_ID,
  redirect_uri: process.env.GITHUB_CALLBACK_URL,
  scope: 'public_repo read:user', // Minimum for MVP
  state: generateStateToken()
};

// Explain to user what access means
// "ShipStory will read your public repositories to find engineering stories."
```

**Data Isolation:**

- Private repository data stored with same encryption as tokens
- Never expose private repo data in public profiles
- Allow users to mark stories as private

---

### API Secret Management

**Environment Variables:**

```bash
# .env.local (never committed)
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
ENCRYPTION_KEY=xxx
DATABASE_URL=postgresql://...
OLLAMA_BASE_URL=http://localhost:11434
```

**Access Pattern:**

```typescript
// Access via process.env, validated at startup
import { z } from 'zod';

const EnvSchema = z.object({
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().min(32),
  DATABASE_URL: z.string().url(),
  OLLAMA_BASE_URL: z.string().url().optional()
});

const env = EnvSchema.parse(process.env);

// Use validated env throughout app
export const config = {
  github: {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET
  },
  encryption: {
    key: env.ENCRYPTION_KEY
  },
  ollama: {
    baseUrl: env.OLLAMA_BASE_URL
  }
};
```

---

### User Data Isolation

**Row-Level Security (Database):**

```sql
-- Optional: Add row-level security at database level
ALTER TABLE "Repository" ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_isolation ON "Repository"
  FOR ALL
  USING ("userId" = current_setting('app.current_user_id')::uuid);
```

**Application-Level Enforcement:**

```typescript
// Middleware sets user context for each request
async function authMiddleware(request: Request, next: () => Response) {
  const user = await validateSession(request);
  
  // Set user context for Prisma
  prisma.$use(async (params, next) => {
    params.args.where = {
      ...params.args.where,
      userId: user.id
    };
    return next(params);
  });
  
  return next();
}
```

---

## Error Handling

### GitHub API Errors

```typescript
class GitHubError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public rateLimitRemaining?: number,
    public rateLimitReset?: number
  ) {
    super(message);
  }
}

async function handleGitHubResponse(response: Response) {
  if (response.ok) {
    return response.json();
  }
  
  const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
  const rateLimitReset = response.headers.get('X-RateLimit-Reset');
  
  if (response.status === 403 && rateLimitRemaining === '0') {
    throw new GitHubError(
      'GitHub API rate limit exceeded',
      403,
      0,
      rateLimitReset ? parseInt(rateLimitReset) : undefined
    );
  }
  
  throw new GitHubError(
    `GitHub API error: ${response.statusText}`,
    response.status
  );
}
```

### AI Provider Errors

```typescript
class AIProviderError extends Error {
  constructor(
    message: string,
    public provider: string,
    public retryable: boolean = true
  ) {
    super(message);
  }
}

async function callAIProvider(prompt: string) {
  try {
    const response = await fetch(aiEndpoint, {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });
    
    if (!response.ok) {
      throw new AIProviderError(
        `AI provider returned ${response.statusText}`,
        'qwen',
        response.status >= 500 // Retry on server errors
      );
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof AbortSignal.TimeoutError) {
      throw new AIProviderError('AI provider timed out', 'qwen', true);
    }
    throw error;
  }
}
```

### Database Errors

```typescript
class DatabaseError extends Error {
  constructor(
    message: string,
    public operation: string,
    public model: string
  ) {
    super(message);
  }
}

async function safeDatabaseOperation<T>(
  operation: string,
  model: string,
  fn: () => Promise<T>
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(
        `Database error: ${error.message}`,
        operation,
        model
      );
    }
    throw error;
  }
}
```

### User-Facing Error Messages

```typescript
// Map technical errors to user-friendly messages
function getUserFriendlyMessage(error: Error): string {
  if (error instanceof GitHubError) {
    if (error.statusCode === 403) {
      return 'GitHub is temporarily limiting requests. Please wait a moment and try again.';
    }
    return 'Could not connect to GitHub. Please check your connection and try again.';
  }
  
  if (error instanceof AIProviderError) {
    return 'Analysis service is temporarily unavailable. Your data is safe. Please retry.';
  }
  
  if (error instanceof DatabaseError) {
    return 'A database error occurred. Our team has been notified. Please try again.';
  }
  
  if (error instanceof UnauthorizedError) {
    return 'Please log in to continue.';
  }
  
  if (error instanceof NotFoundError) {
    return 'The requested resource was not found.';
  }
  
  // Fallback
  return 'Something went wrong. Please try again.';
}
```

---

## Testing Strategy

### Unit Tests

**Priority Areas:**

1. **Evidence Validation**

```typescript
describe('validateEvidenceReferences', () => {
  it('passes when all evidence IDs exist', () => {
    const claims = [{ text: 'Added caching', evidenceIds: ['ev1', 'ev2'] }];
    const evidence = [
      { id: 'ev1', type: 'COMMIT' },
      { id: 'ev2', type: 'FILE' }
    ];
    
    expect(() => validateEvidenceReferences(claims, evidence)).not.toThrow();
  });
  
  it('throws when evidence ID is missing', () => {
    const claims = [{ text: 'Added caching', evidenceIds: ['ev1', 'ev3'] }];
    const evidence = [{ id: 'ev1', type: 'COMMIT' }];
    
    expect(() => validateEvidenceReferences(claims, evidence))
      .toThrow('references non-existent evidence: ev3');
  });
});
```

2. **Signal Detection**

```typescript
describe('detectSignals', () => {
  it('detects dependency additions', () => {
    const files = [
      { filename: 'package.json', additions: 5, deletions: 0, patch: '+ "redis": "^4.6.0"' }
    ];
    
    const signals = detectSignals(files);
    
    expect(signals).toContainEqual({
      type: 'DEPENDENCY_ADDED',
      confidence: expect.any(Number)
    });
  });
  
  it('detects cache module creation', () => {
    const files = [
      { filename: 'src/cache/redis-cache.ts', additions: 47, deletions: 0 }
    ];
    
    const signals = detectSignals(files);
    
    expect(signals).toContainEqual({
      type: 'CACHE_MODULE_ADDED',
      confidence: expect.any(Number)
    });
  });
});
```

3. **Ownership Enforcement**

```typescript
describe('getRepositoryForUser', () => {
  it('returns repository when user is owner', async () => {
    const repo = await createRepository({ userId: 'user-1' });
    
    const result = await getRepositoryForUser(repo.id, 'user-1');
    
    expect(result.id).toBe(repo.id);
  });
  
  it('throws when user is not owner', async () => {
    const repo = await createRepository({ userId: 'user-1' });
    
    await expect(getRepositoryForUser(repo.id, 'user-2'))
      .rejects.toThrow(NotFoundError);
  });
});
```

4. **AI Output Validation**

```typescript
describe('validateAIOutput', () => {
  it('accepts valid output', () => {
    const output = {
      summary: 'Valid summary here',
      problem: null,
      change: 'Made changes',
      technicalSignificance: 0.8,
      storyPotential: 0.9,
      visualPotential: 0.7,
      claims: [{ text: 'Claim', evidenceIds: ['ev1'] }]
    };
    
    expect(() => validateAIOutput(output)).not.toThrow();
  });
  
  it('rejects invalid scores', () => {
    const output = {
      summary: 'Valid summary',
      problem: null,
      change: 'Changes',
      technicalSignificance: 1.5, // Invalid: > 1.0
      storyPotential: 0.9,
      visualPotential: 0.7,
      claims: [{ text: 'Claim', evidenceIds: ['ev1'] }]
    };
    
    expect(() => validateAIOutput(output)).toThrow(ZodError);
  });
});
```

---

### Integration Tests

**Priority Areas:**

1. **GitHub Ingestion Pipeline**

```typescript
describe('Repository Ingestion', () => {
  it('ingests commits idempotently', async () => {
    const repository = await createTestRepository();
    
    // First ingestion
    await ingestRepository(repository.id);
    const firstCommitCount = await prisma.commit.count({
      where: { repositoryId: repository.id }
    });
    
    // Second ingestion (should not duplicate)
    await ingestRepository(repository.id);
    const secondCommitCount = await prisma.commit.count({
      where: { repositoryId: repository.id }
    });
    
    expect(firstCommitCount).toBe(secondCommitCount);
  });
});
```

2. **Story Discovery End-to-End**

```typescript
describe('Story Discovery', () => {
  it('discovers stories from commit clusters', async () => {
    const repository = await setupRepositoryWithCommits([
      { message: 'add redis', files: ['src/cache/redis.ts'] },
      { message: 'integrate cache', files: ['src/handler.ts'] },
      { message: 'add tests', files: ['tests/cache.test.ts'] }
    ]);
    
    const stories = await discoverStories(repository.id);
    
    expect(stories.length).toBeGreaterThan(0);
    expect(stories[0].evidenceStrength).toBeGreaterThan(0.5);
  });
});
```

3. **Authorization Flows**

```typescript
describe('Repository Authorization', () => {
  it('prevents cross-user access', async () => {
    const user1Repo = await createRepository({ userId: 'user-1' });
    const user2 = await createUser();
    
    const response = await GET(
      new Request(`/api/repositories/${user1Repo.id}`),
      { user: user2 }
    );
    
    expect(response.status).toBe(404);
  });
});
```

---

### End-to-End Tests

**Critical User Flows:**

1. **Landing → Auth → Dashboard**

```typescript
test('complete onboarding flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Connect GitHub');
  
  // Mock GitHub OAuth
  await mockGitHubAuth();
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=We found')).toBeVisible();
});
```

2. **Repository Analysis**

```typescript
test('analyze repository and view stories', async ({ page }) => {
  await loginAsTestUser(page);
  await page.goto('/dashboard');
  
  await page.click('text=Analyze');
  await page.waitForSelector('text=Your Engineering Stories', { timeout: 60000 });
  
  const storyCards = page.locator('[data-testid="story-card"]');
  await expect(storyCards).toHaveCount({ min: 1 });
});
```

3. **Content Generation**

```typescript
test('generate and download content', async ({ page }) => {
  await loginAndViewStory(page);
  
  await page.click('text=Generate X Post');
  await page.waitForSelector('text=Tweet ready');
  
  await page.click('text=Copy to Clipboard');
  // Verify clipboard content
});
```

---

## Architecture Decision Records (ADRs)

### ADR 001: Next.js App Router

**Date:** 2025-01-20

**Decision:** Use Next.js 14+ App Router instead of Pages Router or alternative frameworks.

**Rationale:**

- Server-side rendering out of the box
- Built-in API routes for backend logic
- Excellent TypeScript support
- Strong ecosystem and community
- Simplifies deployment (Vercel, etc.)

**Alternatives Considered:**

- **Pages Router:** Legacy, less flexible routing
- **Remix:** Similar capabilities, smaller ecosystem
- **Pure Express:** More boilerplate, no SSR built-in

**Consequences:**

- Learning curve for team unfamiliar with App Router
- Some patterns still evolving (best practices changing)

---

### ADR 002: Prisma ORM

**Date:** 2025-01-20

**Decision:** Use Prisma as database ORM instead of raw SQL or alternatives.

**Rationale:**

- Type-safe database access
- Excellent migration system
- Great developer experience
- Automatic type generation from schema
- Strong PostgreSQL support

**Alternatives Considered:**

- **Raw SQL:** More control, but error-prone, no type safety
- **Drizzle:** Lighter weight, less mature
- **TypeORM:** More complex, slower

**Consequences:**

- Cold starts slightly slower (Prisma initialization)
- Less flexibility for complex queries (must use raw SQL sometimes)

---

### ADR 003: Provider Abstraction for AI

**Date:** 2025-01-20

**Decision:** Implement AI provider abstraction instead of direct Qwen calls throughout codebase.

**Rationale:**

- Enables switching providers without rewriting business logic
- Isolates provider-specific quirks
- Easier testing (mock provider)
- Future-proof for multi-provider support

**Alternatives Considered:**

- **Direct calls:** Simpler initially, harder to change later
- **Adapter pattern:** Similar, but provider abstraction is cleaner

**Consequences:**

- Slight overhead of abstraction layer
- Must maintain interface consistency

---

### ADR 004: Evidence-First Architecture

**Date:** 2025-01-20

**Decision:** Design system around evidence graph where all claims must reference verifiable evidence.

**Rationale:**

- Core product differentiator
- Prevents AI hallucination
- Builds user trust through transparency
- Provides value even without AI

**Alternatives Considered:**

- **AI-first:** Let AI discover and claim freely (risky, untrustworthy)
- **Hybrid:** Some claims backed, some not (confusing, inconsistent)

**Consequences:**

- More complex data model
- Stricter validation requirements
- Additional database relationships

---

### ADR 005: Synchronous Processing for MVP

**Date:** 2025-01-20

**Decision:** Start with synchronous processing, add queues only when necessary.

**Rationale:**

- Simpler architecture initially
- Easier debugging and testing
- Acceptable latency for MVP (30–90 seconds)
- Can add queues incrementally

**Alternatives Considered:**

- **Queues from day one:** More robust, but adds complexity prematurely
- **Hybrid:** Queue long operations only (adds decision complexity)

**Consequences:**

- May need to refactor when adding queues
- Risk of timeouts for large repositories
- User must wait for completion

---

### ADR 006: Feature-Based Directory Structure

**Date:** 2025-01-20

**Decision:** Organize code by feature domain instead of by type.

**Rationale:**

- Co-location of related code
- Easier refactoring
- Clear feature boundaries
- Scales better as codebase grows

**Alternatives Considered:**

- **Type-based (controllers/, services/, models/):** Traditional, leads to scattered code
- **Domain-driven design:** Similar principles, more formal

**Consequences:**

- Initial learning curve for team
- Some code duplication across features (shared components in `/components`)

---

## Appendix: Technology Versions (Target)

| Technology | Target Version |
|------------|----------------|
| Next.js | 14.x or 15.x |
| TypeScript | 5.x |
| Tailwind CSS | 3.x |
| Prisma | 5.x |
| PostgreSQL | 15.x or later |
| Redis | 7.x (for queues) |
| Node.js | 20.x LTS |
| Ollama | Latest stable |

---

## Version History

- **v0.1** (2025-01-20): Initial architecture specification
- **v0.2** (TBD): Post-MVP iteration based on implementation learnings

---

## Approval

This document serves as the technical architecture contract for ShipStory MVP development.

Any significant deviations from this specification should be documented and approved before implementation.
