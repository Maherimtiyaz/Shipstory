# ShipStory — Visual Design System

## Brand Personality

ShipStory's visual identity should communicate:

### Primary Attributes

**Technical Precision**
- Clean lines, structured layouts
- Monospace fonts for technical content
- Grid-based alignment
- Visible structure (borders, dividers)

**Editorial Sophistication**
- Generous whitespace
- Strong typographic hierarchy
- Restrained color palette
- Intentional composition

**Developer Authenticity**
- GitHub-inspired elements
- Code-friendly presentation
- No corporate polish
- Real engineering aesthetic

### Brand Metaphor

> **Linear meets GitHub meets technical magazine**

Think:
- Linear's clean UI discipline
- GitHub's technical information density
- A technical publication's editorial restraint

**NOT:**
- Generic AI SaaS (purple gradients, glassmorphism)
- Chatbot interfaces (bubbles, avatars)
- Template marketplaces (excessive decoration)
- Crypto products (neon, excessive motion)

---

## Color System

### Base Palette

```css
/* Near-black backgrounds */
--color-background: #0a0a0a;
--color-background-secondary: #121212;
--color-background-tertiary: #1a1a1a;

/* Off-white text */
--color-foreground: #fafafa;
--color-foreground-muted: #a0a0a0;
--color-foreground-subtle: #666666;

/* Cool grays */
--color-gray-50: #f9f9f9;
--color-gray-100: #e5e5e5;
--color-gray-200: #d4d4d4;
--color-gray-300: #a3a3a3;
--color-gray-400: #737373;
--color-gray-500: #525252;
--color-gray-600: #404040;
--color-gray-700: #262626;
--color-gray-800: #171717;
--color-gray-900: #0a0a0a;
```

### Accent Color

**Restrained Electric Blue**

```css
--color-accent: #3b82f6;        /* Primary accent */
--color-accent-hover: #2563eb;   /* Hover state */
--color-accent-muted: #60a5fa;   /* Muted variant */
--color-accent-bg: rgba(59, 130, 246, 0.1); /* Subtle background */
```

**Usage Guidelines:**

- Use accent sparingly (≤10% of screen area)
- Primary actions only (buttons, links)
- Evidence highlights
- Story type indicators
- Never for backgrounds or large surfaces

### Semantic Colors

```css
/* Success / Positive */
--color-success: #22c55e;
--color-success-bg: rgba(34, 197, 94, 0.1);

/* Warning / Caution */
--color-warning: #f59e0b;
--color-warning-bg: rgba(245, 158, 11, 0.1);

/* Error / Destructive */
--color-error: #ef4444;
--color-error-bg: rgba(239, 68, 68, 0.1);

/* Information */
--color-info: #3b82f6;
--color-info-bg: rgba(59, 130, 246, 0.1);
```

### Story Type Colors

```css
/* Technical stories */
--color-story-technical: #60a5fa;  /* Blue */

/* Narrative stories */
--color-story-narrative: #a78bfa;  /* Purple */

/* Career stories */
--color-story-career: #34d399;     /* Green */
```

---

## Typography

### Font Families

**Primary (UI Text):** Inter

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Monospace (Technical Content):** JetBrains Mono

```css
font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 12px (0.75rem) | 400 | 1.5 | Metadata, timestamps |
| `text-sm` | 14px (0.875rem) | 400 | 1.5 | Secondary text, captions |
| `text-base` | 16px (1rem) | 400 | 1.5 | Body text |
| `text-lg` | 18px (1.125rem) | 500 | 1.5 | Lead paragraphs |
| `text-xl` | 20px (1.25rem) | 600 | 1.4 | Section headers |
| `text-2xl` | 24px (1.5rem) | 600 | 1.3 | Card titles |
| `text-3xl` | 30px (1.875rem) | 700 | 1.2 | Page headers |
| `text-4xl` | 36px (2.25rem) | 700 | 1.1 | Hero headline |

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Typographic Hierarchy

**Hero Headline:**
```css
text-4xl font-bold tracking-tight leading-[1.1]
```

**Page Header:**
```css
text-3xl font-bold tracking-tight
```

**Section Header:**
```css
text-xl font-semibold
```

**Card Title:**
```css
text-2xl font-semibold
```

**Body Text:**
```css
text-base leading-relaxed
```

**Metadata:**
```css
text-xs font-mono text-foreground-muted
```

---

## Spacing System

### Base Unit: 4px

All spacing values are multiples of 4px (0.25rem).

```css
--spacing-0: 0;
--spacing-1: 4px (0.25rem);
--spacing-2: 8px (0.5rem);
--spacing-3: 12px (0.75rem);
--spacing-4: 16px (1rem);
--spacing-5: 20px (1.25rem);
--spacing-6: 24px (1.5rem);
--spacing-8: 32px (2rem);
--spacing-10: 40px (2.5rem);
--spacing-12: 48px (3rem);
--spacing-16: 64px (4rem);
--spacing-20: 80px (5rem);
--spacing-24: 96px (6rem);
```

### Layout Spacing

**Page Padding:**
- Desktop: `padding: 2rem` (spacing-8)
- Mobile: `padding: 1rem` (spacing-4)

**Section Spacing:**
- Between sections: `margin-bottom: 3rem` (spacing-12)
- Between components: `margin-bottom: 1.5rem` (spacing-6)

**Component Internal Spacing:**
- Card padding: `padding: 1.5rem` (spacing-6)
- Button padding: `padding: 0.5rem 1rem` (spacing-2 spacing-4)

### Whitespace Philosophy

**Generous but intentional:**

- More whitespace around important elements (headers, CTAs)
- Tighter spacing within related groups (metadata, evidence lists)
- Never use whitespace as a substitute for clear hierarchy

---

## Borders & Dividers

### Border Widths

```css
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;
```

### Border Colors

```css
--border-color-subtle: #262626;    /* gray-800 */
--border-color-default: #404040;   /* gray-600 */
--border-color-strong: #737373;    /* gray-400 */
```

### Divider Usage

**Horizontal Rules:**

```css
border-t border-border-color-subtle my-6
```

**Card Borders:**

```css
border border-border-color-subtle rounded-lg
```

**Section Dividers:**

Use subtle borders to separate major sections, not decorative lines.

---

## Border Radius

### Radius Scale

```css
--radius-sm: 4px (0.25rem);
--radius-md: 6px (0.375rem);
--radius-lg: 8px (0.5rem);
--radius-xl: 12px (0.75rem);
--radius-2xl: 16px (1rem);
--radius-full: 9999px;
```

### Component Radii

| Component | Radius | Rationale |
|-----------|--------|-----------|
| Buttons | `radius-md` | Technical feel, not overly rounded |
| Cards | `radius-lg` | Clear containment, professional |
| Inputs | `radius-md` | Consistent with buttons |
| Badges | `radius-full` | Pill shape for tags |
| Avatars | `radius-full` | Circular |
| Modals | `radius-xl` | Softer for overlays |

**Avoid:** Excessively rounded corners (>16px) except for circles.

---

## Shadows

### Shadow Philosophy

**Minimal and purposeful:**

ShipStory uses shadows sparingly. The dark theme relies more on borders and contrast than shadows for depth.

### Shadow Values

```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);

/* Default elevation */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);

/* Elevated elements */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);

/* Modal/overlay */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
```

### Usage Guidelines

- Cards: `shadow-sm` or no shadow (border-based separation)
- Dropdowns: `shadow-md`
- Modals: `shadow-xl`
- Hover states: Slightly increase shadow intensity

---

## Icons

### Icon Library

**Primary:** Lucide React (via shadcn/ui)

```bash
npm install lucide-react
```

**Alternative:** Heroicons (if Lucide doesn't have needed icon)

### Icon Sizes

```css
--icon-xs: 14px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
```

### Icon Usage

**With Text:**

```tsx
<Button>
  <Github className="w-4 h-4" />
  Connect GitHub
</Button>
```

**Standalone:**

```tsx
<button className="p-2">
  <Download className="w-5 h-5" />
</button>
```

### Story-Type Icons

```tsx
// Technical story
<Zap className="w-5 h-5 text-story-technical" />

// Narrative story
<BookOpen className="w-5 h-5 text-story-narrative" />

// Career story
<Briefcase className="w-5 h-5 text-story-career" />

// Evidence
<ShieldCheck className="w-4 h-4 text-success" />

// Warning
<TriangleAlert className="w-4 h-4 text-warning" />
```

---

## Motion

### Motion Philosophy

**Restrained and purposeful:**

- Motion should support comprehension, not decorate
- Fast transitions (150–250ms)
- Simple easing (ease-out for entrances, ease-in for exits)
- No bouncy or elastic animations

### Transition Defaults

```css
--transition-fast: 150ms;
--transition-normal: 250ms;
--transition-slow: 400ms;

--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
--easing-enter: cubic-bezier(0.4, 0, 0.2, 1);
--easing-exit: cubic-bezier(0.4, 0, 1, 1);
```

### Standard Transitions

**Hover States:**

```css
transition-colors duration-150 ease-out
```

**Expand/Collapse:**

```css
transition-all duration-250 ease-out
```

**Fade In:**

```css
transition-opacity duration-250 ease-out
```

### Loading States

**Skeleton Screens:**

```css
animate-pulse bg-gray-800 rounded
```

**Progress Indicators:**

Use deterministic progress when possible (show actual progress), not spinners.

### Micro-interactions

**Button Press:**

```css
active:scale-[0.98] transition-transform
```

**Card Hover:**

```css
hover:border-gray-500 transition-colors
```

**Avoid:**

- Spinning logos
- Bouncing elements
- Parallax effects
- Unnecessary animations

---

## Component Principles

### Buttons

**Hierarchy:**

1. **Primary:** Filled accent color, for main actions
2. **Secondary:** Outlined, for secondary actions
3. **Ghost:** Text-only, for tertiary actions

**Implementation:**

```tsx
// Primary
<button className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-md font-medium transition-colors">
  Connect GitHub
</button>

// Secondary
<button className="border border-gray-600 hover:border-gray-400 text-foreground px-4 py-2 rounded-md font-medium transition-colors">
  Cancel
</button>

// Ghost
<button className="text-foreground-muted hover:text-foreground px-4 py-2 rounded-md font-medium transition-colors">
  Learn more
</button>
```

**Sizes:**

- `sm`: `px-3 py-1.5 text-sm`
- `md`: `px-4 py-2 text-base` (default)
- `lg`: `px-6 py-3 text-lg`

---

### Cards

**Purpose:** Contain related information with clear boundaries.

**Base Style:**

```tsx
<div className="border border-gray-800 bg-background-secondary rounded-lg p-6">
  {/* Card content */}
</div>
```

**Interactive Cards:**

```tsx
<div className="border border-gray-800 hover:border-gray-600 bg-background-secondary rounded-lg p-6 transition-colors cursor-pointer">
  {/* Card content */}
</div>
```

**Card Variants:**

- **Default:** As above
- **Elevated:** Add `shadow-md`
- **Highlighted:** Add `border-accent`

---

### Badges

**Purpose:** Display status, tags, or metadata.

**Base Style:**

```tsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
  Technical
</span>
```

**Semantic Variants:**

```tsx
// Success
<span className="bg-success-bg text-success ...">

// Warning
<span className="bg-warning-bg text-warning ...">

// Error
<span className="bg-error-bg text-error ...">

// Info
<span className="bg-info-bg text-info ...">
```

---

### Metrics

**Purpose:** Display numerical data prominently.

**Large Metric:**

```tsx
<div>
  <div className="text-4xl font-bold text-foreground">77%</div>
  <div className="text-sm text-foreground-muted mt-1">Latency reduction</div>
</div>
```

**Metric with Delta:**

```tsx
<div className="flex items-baseline gap-2">
  <span className="text-2xl font-bold">420ms</span>
  <span className="text-sm text-success flex items-center">
    <ArrowDown className="w-3 h-3 mr-1" />
    77%
  </span>
</div>
```

---

### Evidence Items

**Purpose:** Display individual pieces of evidence supporting claims.

**Base Style:**

```tsx
<div className="flex items-start gap-3 p-3 border border-gray-800 rounded-md bg-background-tertiary">
  <ShieldCheck className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
  <div>
    <div className="text-sm font-medium text-foreground">
      Cache module added
    </div>
    <div className="text-xs text-foreground-muted mt-1 font-mono">
      src/cache/redis-cache.ts (+47 lines)
    </div>
  </div>
</div>
```

**With GitHub Link:**

```tsx
<a 
  href={githubUrl}
  className="flex items-start gap-3 p-3 border border-gray-800 rounded-md hover:border-gray-600 transition-colors"
  target="_blank"
>
  {/* Evidence content */}
  <ExternalLink className="w-3 h-3 text-gray-500" />
</a>
```

---

### Repository Cards

**Purpose:** Display repository summary for selection.

**Style:**

```tsx
<div className="border border-gray-800 hover:border-gray-600 bg-background-secondary rounded-lg p-5 transition-colors cursor-pointer">
  <div className="flex items-start justify-between mb-3">
    <div>
      <h3 className="text-lg font-semibold text-foreground">
        {fullName}
      </h3>
      <p className="text-sm text-foreground-muted mt-1">
        {description || 'No description'}
      </p>
    </div>
    <GitBranch className="w-5 h-5 text-gray-500" />
  </div>
  
  <div className="flex items-center gap-4 text-xs text-foreground-muted">
    <span className="flex items-center gap-1">
      <Clock className="w-3 h-3" />
      {lastActivity}
    </span>
    <span className="flex items-center gap-1">
      <GitCommit className="w-3 h-3" />
      {commitCount} commits
    </span>
    <span>{language}</span>
  </div>
  
  {storyPotential > 0.7 && (
    <div className="mt-3 flex items-center gap-2">
      <Zap className="w-3 h-3 text-accent" />
      <span className="text-xs text-accent font-medium">
        High story potential
      </span>
    </div>
  )}
</div>
```

---

### Story Cards

**Purpose:** Display discovered stories in discovery screen.

**Style:**

```tsx
<article className="border border-gray-800 hover:border-gray-600 bg-background-secondary rounded-lg p-6 transition-colors cursor-pointer">
  <div className="flex items-start gap-3 mb-4">
    <div className="p-2 rounded-md bg-accent-bg">
      <Zap className="w-5 h-5 text-accent" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-foreground">
        Redesigned AI Tool Execution
      </h3>
      <p className="text-sm text-foreground-muted mt-1">
        You introduced a caching layer around repeated tool execution.
      </p>
    </div>
  </div>
  
  <div className="mb-4">
    <div className="text-xs font-medium text-foreground-muted mb-2">
      EVIDENCE
    </div>
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Cache module added</Badge>
      <Badge variant="info">Dependency added</Badge>
      <Badge variant="success">Tests added</Badge>
    </div>
  </div>
  
  <div className="flex gap-3">
    <Button variant="primary" size="sm">View Story</Button>
    <Button variant="secondary" size="sm">Create Post</Button>
  </div>
</article>
```

---

### Story Detail

**Layout:**

```tsx
<div className="max-w-4xl mx-auto">
  {/* Header */}
  <header className="mb-8">
    <div className="flex items-center gap-3 mb-4">
      <Badge>{storyType}</Badge>
      <span className="text-sm text-foreground-muted">
        Evidence strength: {(story.evidenceStrength * 100).toFixed(0)}%
      </span>
    </div>
    <h1 className="text-3xl font-bold text-foreground mb-3">
      {story.title}
    </h1>
    <p className="text-lg text-foreground-muted">
      {story.summary}
    </p>
  </header>
  
  {/* Main content grid */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Left column (2/3) */}
    <div className="lg:col-span-2 space-y-8">
      <ProblemSection problem={story.problemStatement} />
      <ChangeSection change={story.engineeringChange} />
      <EvidenceSection claims={story.claims} />
      <CommitsSection commits={story.commits} />
    </div>
    
    {/* Right column (1/3) */}
    <aside className="space-y-6">
      <MetricsPanel metrics={story.metrics} />
      <FilesPanel files={story.changedFiles} />
      <SignalsPanel signals={story.signals} />
    </aside>
  </div>
  
  {/* Bottom section */}
  <div className="mt-12 border-t border-gray-800 pt-8">
    <ContentGenerator story={story} />
    <VisualPreview story={story} />
  </div>
</div>
```

---

### Visual Previews

**Purpose:** Display generated visuals with template options.

**Container:**

```tsx
<div className="border border-gray-800 rounded-lg overflow-hidden bg-background-secondary">
  <div className="p-4 border-b border-gray-800 flex items-center justify-between">
    <h3 className="font-semibold">Visual Preview</h3>
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">Change Template</Button>
      <Button variant="secondary" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  </div>
  
  <div className="aspect-video bg-background p-8 flex items-center justify-center">
    {/* SVG/React visual rendered here */}
    <VisualTemplate story={story} template="before-after" />
  </div>
  
  <div className="p-4 border-t border-gray-800 text-xs text-foreground-muted">
    Generated from evidence • Deterministic template
  </div>
</div>
```

---

### Navigation

**Top Navigation:**

```tsx
<nav className="border-b border-gray-800 bg-background sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <ShipIcon className="w-6 h-6 text-accent" />
        <span className="font-bold text-lg">ShipStory</span>
      </Link>
      
      {/* Center navigation (authenticated) */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-sm text-foreground-muted hover:text-foreground">
          Dashboard
        </Link>
        <Link href="/stories" className="text-sm text-foreground-muted hover:text-foreground">
          Stories
        </Link>
        <Link href="/profile" className="text-sm text-foreground-muted hover:text-foreground">
          Profile
        </Link>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link 
          href={`/@${user.username}`}
          className="text-sm text-foreground-muted hover:text-foreground"
        >
          Public Profile
        </Link>
        <Avatar src={user.avatarUrl} size="sm" />
      </div>
    </div>
  </div>
</nav>
```

---

## Key Screens

### Landing Page

**Hero Section:**

```tsx
<section className="py-24 px-4 border-b border-gray-800">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
      Your code has a story.
    </h1>
    <p className="text-xl text-foreground-muted max-w-2xl mx-auto mb-10">
      ShipStory finds the engineering work hidden in your GitHub history 
      and turns it into evidence-backed stories worth sharing.
    </p>
    <div className="flex items-center justify-center gap-4">
      <Button variant="primary" size="lg">
        <Github className="w-5 h-5 mr-2" />
        Connect GitHub
      </Button>
      <Button variant="ghost" size="lg">
        View Example
      </Button>
    </div>
  </div>
</section>

{/* Example Story Preview */}
<section className="py-16 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="text-sm font-medium text-foreground-muted mb-6">
      EXAMPLE STORY
    </div>
    <ExampleStoryCard />
  </div>
</section>
```

**Key Principles:**

- Understand product in ~10 seconds
- Single primary CTA
- Realistic example immediately visible
- No feature card grids

---

### Authentication Flow

**OAuth Redirect Screen:**

```tsx
<div className="min-h-screen flex items-center justify-center px-4">
  <div className="max-w-md w-full text-center">
    <ShipIcon className="w-12 h-12 text-accent mx-auto mb-6" />
    <h1 className="text-2xl font-bold mb-4">Connect to GitHub</h1>
    <p className="text-foreground-muted mb-8">
      ShipStory needs read-only access to your repositories to find 
      engineering stories. We never modify your code.
    </p>
    <Button variant="primary" size="lg" className="w-full">
      <Github className="w-5 h-5 mr-2" />
      Authorize with GitHub
    </Button>
    <p className="text-xs text-foreground-muted mt-6">
      Scopes: public_repo, read:user
    </p>
  </div>
</div>
```

---

### Repository Selection

**Screen Layout:**

```tsx
<div className="max-w-5xl mx-auto px-4 py-12">
  <header className="mb-8">
    <h1 className="text-3xl font-bold mb-3">
      Select a Repository
    </h1>
    <p className="text-foreground-muted">
      We found {repositories.length} repositories with recent activity.
    </p>
  </header>
  
  {/* Filter tabs */}
  <div className="flex gap-2 mb-6 border-b border-gray-800">
    <Tab active>Last 30 days</Tab>
    <Tab>Last 90 days</Tab>
    <Tab>Last 6 months</Tab>
  </div>
  
  {/* Repository grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    {repositories.map(repo => (
      <RepositoryCard key={repo.id} repo={repo} />
    ))}
  </div>
  
  {/* Goal selection (optional) */}
  <div className="border-t border-gray-800 pt-8">
    <h2 className="text-xl font-semibold mb-4">
      What's your primary goal?
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <GoalCard icon={Users} label="Build an audience" />
      <GoalCard icon={FolderKanban} label="Build a portfolio" />
      <GoalCard icon={Briefcase} label="Prepare for jobs" />
      <GoalCard icon={Book} label="Document engineering" />
    </div>
  </div>
</div>
```

---

### Analysis Progress

**Loading State:**

```tsx
<div className="max-w-2xl mx-auto px-4 py-16 text-center">
  <h2 className="text-2xl font-bold mb-8">
    Analyzing your work...
  </h2>
  
  <div className="space-y-4 text-left max-w-md mx-auto">
    <ProgressItem 
      done={true} 
      label={`${commitCount} commits ingested`} 
    />
    <ProgressItem 
      done={true} 
      label={`${prCount} pull requests fetched`} 
    />
    <ProgressItem 
      done={true} 
      label={`${signalCount} technical changes detected`} 
    />
    <ProgressItem 
      done={isAnalyzing} 
      label="Discovering stories..." 
    />
  </div>
  
  {/* Optional: Show sample of what's being found */}
  {signals.length > 0 && (
    <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-background-secondary">
      <div className="text-xs font-medium text-foreground-muted mb-3">
        DETECTED SIGNALS
      </div>
      <div className="flex flex-wrap gap-2">
        {signals.slice(0, 5).map(signal => (
          <Badge key={signal.type}>{signal.type}</Badge>
        ))}
      </div>
    </div>
  )}
</div>
```

**Duration Target:** 30–90 seconds

---

### Story Discovery

**Screen Layout:**

```tsx
<div className="max-w-6xl mx-auto px-4 py-12">
  <header className="mb-8">
    <h1 className="text-3xl font-bold mb-2">
      Your Engineering Stories
    </h1>
    <p className="text-foreground-muted">
      We found {stories.length} meaningful stories in your work.
    </p>
  </header>
  
  {/* Story grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {stories.map(story => (
      <StoryCard key={story.id} story={story} />
    ))}
  </div>
  
  {/* Empty state */}
  {stories.length === 0 && (
    <EmptyState
      icon={SearchX}
      title="No significant stories found"
      description="This repository may contain routine maintenance work. Try selecting a repository with feature development."
      action={{
        label: "Try another repository",
        href: "/dashboard"
      }}
    />
  )}
</div>
```

---

### Story Detail

**See component principles above for detailed layout.**

**Key UX Principle:** User can always ask *"Why did ShipStory say this?"* and see evidence.

**Evidence Visualization:**

```tsx
<div className="space-y-6">
  {claims.map(claim => (
    <div key={claim.id} className="border border-gray-800 rounded-lg p-5">
      <div className="flex items-start gap-3 mb-4">
        <Quote className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <p className="text-lg font-medium">{claim.text}</p>
      </div>
      
      <div className="ml-8">
        <div className="text-xs font-medium text-foreground-muted mb-3">
          SUPPORTING EVIDENCE
        </div>
        <div className="space-y-2">
          {claim.evidence.map(evidence => (
            <EvidenceItem 
              key={evidence.id} 
              evidence={evidence}
              showGithubLink={true}
            />
          ))}
        </div>
      </div>
    </div>
  ))}
</div>
```

---

### Content Composer

**Tabbed Interface:**

```tsx
<div className="border border-gray-800 rounded-lg overflow-hidden">
  {/* Tabs */}
  <div className="border-b border-gray-800 bg-background-secondary">
    <div className="flex">
      <Tab active>Technical</Tab>
      <Tab>Story</Tab>
      <Tab>Career</Tab>
    </div>
  </div>
  
  {/* Content area */}
  <div className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">Generated Content</h3>
      <Button variant="ghost" size="sm">
        <RefreshCw className="w-4 h-4 mr-2" />
        Regenerate
      </Button>
    </div>
    
    {/* Content formats */}
    <div className="space-y-6">
      <ContentBlock
        label="X Post"
        content={content.xPost}
        charLimit={280}
        onCopy={() => copy(content.xPost)}
      />
      
      <ContentBlock
        label="Resume Bullet"
        content={content.resumeBullet}
        onCopy={() => copy(content.resumeBullet)}
      />
      
      <ContentBlock
        label="Portfolio Description"
        content={content.portfolioDescription}
        editable={true}
        onCopy={() => copy(content.portfolioDescription)}
      />
    </div>
  </div>
</div>
```

---

### Public Profile

**Layout:**

```tsx
<div className="max-w-5xl mx-auto px-4 py-12">
  {/* Profile header */}
  <header className="mb-12">
    <div className="flex items-start gap-6">
      <Avatar src={user.avatarUrl} size="xl" />
      <div>
        <h1 className="text-3xl font-bold mb-2">
          {user.name || user.username}
        </h1>
        <p className="text-foreground-muted mb-4">
          {user.bio || 'AI Engineer'}
        </p>
        <div className="flex items-center gap-4 text-sm text-foreground-muted">
          <span className="flex items-center gap-1">
            <Github className="w-4 h-4" />
            @{user.githubLogin}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Joined {formatDate(user.createdAt)}
          </span>
        </div>
      </div>
    </div>
  </header>
  
  {/* Technical themes */}
  <section className="mb-12">
    <h2 className="text-xl font-semibold mb-4">Technical Themes</h2>
    <div className="flex flex-wrap gap-2">
      {themes.map(theme => (
        <Badge key={theme}>{theme}</Badge>
      ))}
    </div>
  </section>
  
  {/* Engineering stories */}
  <section>
    <h2 className="text-xl font-semibold mb-6">Engineering Stories</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map(story => (
        <StoryCard key={story.id} story={story} compact={true} />
      ))}
    </div>
  </section>
  
  {/* Footer branding */}
  <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
    <p className="text-xs text-foreground-muted">
      Built with{' '}
      <a href="/" className="text-accent hover:underline">
        ShipStory
      </a>
    </p>
  </footer>
</div>
```

---

## Evidence UI

### Evidence Hierarchy

**Visual Structure:**

```
Claim
├── Evidence Item 1 → Commit → GitHub
├── Evidence Item 2 → File → GitHub
└── Evidence Item 3 → Signal → Details
```

### Evidence Item Types

**Commit Evidence:**

```tsx
<div className="flex items-start gap-3">
  <GitCommit className="w-4 h-4 text-gray-500 mt-0.5" />
  <div>
    <div className="text-sm font-medium">
      Commit: {commit.message}
    </div>
    <div className="text-xs text-foreground-muted font-mono mt-1">
      {commit.sha.slice(0, 7)} • {formatDate(commit.date)}
    </div>
    <a 
      href={commit.githubUrl}
      className="text-xs text-accent hover:underline mt-2 inline-block"
      target="_blank"
    >
      View on GitHub →
    </a>
  </div>
</div>
```

**File Evidence:**

```tsx
<div className="flex items-start gap-3">
  <FileCode className="w-4 h-4 text-gray-500 mt-0.5" />
  <div>
    <div className="text-sm font-medium">
      File: {file.filename}
    </div>
    <div className="text-xs text-foreground-muted font-mono mt-1">
      +{file.additions} -{file.deletions} lines
    </div>
    <a 
      href={file.githubUrl}
      className="text-xs text-accent hover:underline mt-2 inline-block"
      target="_blank"
    >
      View diff →
    </a>
  </div>
</div>
```

**Signal Evidence:**

```tsx
<div className="flex items-start gap-3">
  <Zap className="w-4 h-4 text-accent mt-0.5" />
  <div>
    <div className="text-sm font-medium">
      {getSignalDisplayName(signal.type)}
    </div>
    <div className="text-xs text-foreground-muted mt-1">
      {getSignalDescription(signal)}
    </div>
  </div>
</div>
```

### Evidence Confidence

**Visual Indicator:**

```tsx
<div className="flex items-center gap-2">
  <span className="text-xs text-foreground-muted">Confidence:</span>
  <div className="flex items-center gap-1">
    <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-success rounded-full"
        style={{ width: `${confidence * 100}%` }}
      />
    </div>
    <span className="text-xs font-medium">
      {(confidence * 100).toFixed(0)}%
    </span>
  </div>
</div>
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile first */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

### Layout Adaptations

**Mobile (< 640px):**

- Single column layouts
- Stacked cards
- Full-width buttons
- Collapsed navigation (hamburger menu)
- Reduced padding (`padding: 1rem`)

**Tablet (640px – 1024px):**

- Two-column grids where appropriate
- Side-by-side buttons
- Standard navigation
- Standard padding (`padding: 1.5rem`)

**Desktop (> 1024px):**

- Multi-column layouts
- Sidebar navigation (when applicable)
- Maximum content width (`max-width: 1280px`)
- Generous padding (`padding: 2rem`)

### Story Detail Responsive

**Desktop:**

```
┌─────────────────────────────────────────────┐
│  Header                                     │
├───────────────────┬─────────────────────────┤
│                   │  Metrics                │
│  Main Content     ├─────────────────────────┤
│  (2/3 width)      │  Files                  │
│                   ├─────────────────────────┤
│                   │  Signals                │
└───────────────────┴─────────────────────────┘
```

**Mobile:**

```
┌─────────────────┐
│  Header         │
├─────────────────┤
│  Main Content   │
├─────────────────┤
│  Metrics        │
├─────────────────┤
│  Files          │
├─────────────────┤
│  Signals        │
└─────────────────┘
```

---

## Accessibility

### Minimum Requirements

**WCAG 2.1 Level AA compliance target.**

### Color Contrast

**Text:**

- Normal text: ≥ 4.5:1 contrast ratio
- Large text (≥ 18px or 14px bold): ≥ 3:1 contrast ratio

**UI Components:**

- Interactive elements: ≥ 3:1 contrast against adjacent colors
- Focus indicators: ≥ 3:1 contrast

**Verification:**

Use tools like:
- Chrome DevTools Accessibility panel
- WebAIM Contrast Checker
- Stark plugin (Figma)

### Keyboard Navigation

**Focus Management:**

- All interactive elements focusable
- Visible focus indicators (`outline: 2px solid accent`)
- Logical tab order
- Skip links for main content

**Implementation:**

```css
/* Focus visible */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Readers

**ARIA Labels:**

```tsx
<button aria-label="Connect GitHub account">
  <Github className="w-5 h-5" />
</button>

<nav aria-label="Main navigation">
  {/* Navigation content */}
</nav>

<div role="alert" aria-live="assertive">
  Analysis complete! Found 5 stories.
</div>
```

**Heading Hierarchy:**

- One `<h1>` per page
- Logical heading levels (don't skip h2 → h4)
- Descriptive headings

### Motion Sensitivity

**Respect prefers-reduced-motion:**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Checklist

### Phase 1 (Foundation)

- [ ] Install Tailwind CSS
- [ ] Configure design tokens (colors, spacing, typography)
- [ ] Set up shadcn/ui
- [ ] Create base layout components
- [ ] Implement navigation

### Phase 2 (Landing Page)

- [ ] Build hero section
- [ ] Create example story card
- [ ] Implement responsive behavior
- [ ] Test accessibility

### Phase 3 (Dashboard Mocks)

- [ ] Repository cards
- [ ] Story cards
- [ ] Evidence components
- [ ] Story detail layout
- [ ] Content generator UI

### Phase 4+ (Integration)

- [ ] Replace mock data with real data
- [ ] Add loading states
- [ ] Add error states
- [ ] Implement visual templates
- [ ] Build public profile

---

## Version History

- **v0.1** (2025-01-20): Initial design specification
- **v0.2** (TBD): Post-MVP iteration based on user feedback

---

## Approval

This document serves as the visual design contract for ShipStory MVP development.

Any significant deviations from this specification should be documented and approved before implementation.
