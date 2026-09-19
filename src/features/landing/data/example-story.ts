// Mock data for landing page example story
// This is presentation-only sample data, NOT a fake domain model

export interface MockEvidence {
  id: string;
  type: "commit" | "file" | "signal";
  label: string;
  metadata?: Record<string, string>;
}

export interface MockClaim {
  id: string;
  text: string;
  evidenceIds: string[];
}

export interface MockStory {
  id: string;
  title: string;
  summary: string;
  claims: MockClaim[];
  evidence: MockEvidence[];
  signals: string[];
  commitCount: number;
  fileCount: number;
}

export const exampleStory: MockStory = {
  id: "demo-story-1",
  title: "Redesigned AI tool execution with caching layer",
  summary:
    "Introduced Redis-backed caching around repeated tool execution, reducing average latency from 1.82s to 420ms while maintaining test coverage.",
  claims: [
    {
      id: "claim-1",
      text: "Added Redis-backed caching to tool execution pipeline",
      evidenceIds: ["evidence-1", "evidence-2", "evidence-3"],
    },
    {
      id: "claim-2",
      text: "Modified request runner to support cache-first strategy",
      evidenceIds: ["evidence-4", "evidence-5"],
    },
    {
      id: "claim-3",
      text: "Implemented cache invalidation on dependency changes",
      evidenceIds: ["evidence-6", "evidence-7"],
    },
  ],
  evidence: [
    {
      id: "evidence-1",
      type: "commit",
      label: "Add Redis client configuration",
      metadata: {
        sha: "a3f2b9c",
        date: "2024-01-15",
        message: "feat: add Redis client with connection pooling",
      },
    },
    {
      id: "evidence-2",
      type: "file",
      label: "src/cache/redis-client.ts",
      metadata: {
        additions: "+142",
        deletions: "-0",
      },
    },
    {
      id: "evidence-3",
      type: "signal",
      label: "Dependency added: redis@4.6.0",
      metadata: {
        type: "dependency",
      },
    },
    {
      id: "evidence-4",
      type: "commit",
      label: "Modify request runner for caching",
      metadata: {
        sha: "b7d4e1f",
        date: "2024-01-16",
        message: "refactor: implement cache-first request strategy",
      },
    },
    {
      id: "evidence-5",
      type: "file",
      label: "src/tools/request-runner.ts",
      metadata: {
        additions: "+89",
        deletions: "-34",
      },
    },
    {
      id: "evidence-6",
      type: "commit",
      label: "Add cache invalidation logic",
      metadata: {
        sha: "c9e5f2a",
        date: "2024-01-17",
        message: "feat: invalidate cache on schema changes",
      },
    },
    {
      id: "evidence-7",
      type: "file",
      label: "src/cache/invalidation.ts",
      metadata: {
        additions: "+67",
        deletions: "-0",
      },
    },
  ],
  signals: [
    "caching",
    "performance",
    "infrastructure",
    "dependency-change",
  ],
  commitCount: 5,
  fileCount: 8,
};
