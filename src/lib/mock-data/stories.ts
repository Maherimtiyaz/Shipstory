import type { Story, SignalType } from "@/types/repository";

export const mockStories: Story[] = [
  {
    id: "story-redis-caching",
    title: "Redesigned AI Tool Execution with Redis-Backed Caching",
    summary: "Introduced a caching layer around repeated tool execution, reducing latency by 78% and cutting API costs.",
    problem: "Tool execution was repeatedly hitting the same external APIs for identical requests, causing high latency and unnecessary costs.",
    change: "Implemented Redis-backed caching with intelligent invalidation strategies and parallel execution for independent tool calls.",
    technicalSignificance: 8,
    storyPotential: 9,
    visualPotential: 8,
    claims: [
      {
        id: "claim-1",
        text: "Added Redis-backed caching to tool execution pipeline",
        evidenceIds: ["evidence-commit-1", "evidence-commit-2", "evidence-file-cache", "evidence-signal-caching"]
      },
      {
        id: "claim-2",
        text: "Reduced average request latency from 1.82s to 420ms",
        evidenceIds: ["evidence-commit-3", "evidence-benchmark-test"]
      },
      {
        id: "claim-3",
        text: "Decreased external API calls by 65% through cache hits",
        evidenceIds: ["evidence-commit-4", "evidence-metrics-dashboard"]
      }
    ],
    commitShas: [
      "a1b2c3d4e5f6789012345678901234567890abcd",
      "b2c3d4e5f67890123456789012345678901abcde",
      "c3d4e5f678901234567890123456789012abcdef",
      "d4e5f6789012345678901234567890123abcdefg"
    ],
    signalTypes: ["caching", "performance", "ai-ml", "dependency-change"],
    createdAt: "2024-12-15T10:30:00Z"
  },
  {
    id: "story-eval-pipeline",
    title: "Built Automated Evaluation Pipeline for LLM Agent",
    summary: "Created comprehensive testing framework with automated benchmarks, reducing regression detection time from days to minutes.",
    problem: "Manual testing of agent behavior was slow, inconsistent, and missed subtle regressions in model outputs.",
    change: "Designed evaluation pipeline with synthetic test cases, golden datasets, and automated scoring metrics.",
    technicalSignificance: 9,
    storyPotential: 7,
    visualPotential: 6,
    claims: [
      {
        id: "claim-eval-1",
        text: "Implemented automated evaluation framework with 200+ test cases",
        evidenceIds: ["evidence-eval-commit-1", "evidence-test-files"]
      },
      {
        id: "claim-eval-2",
        text: "Reduced regression detection time from 2-3 days to under 5 minutes",
        evidenceIds: ["evidence-eval-commit-2", "evidence-ci-timing"]
      }
    ],
    commitShas: [
      "e5f6789012345678901234567890123abcdefgh",
      "f6789012345678901234567890123abcdefghij"
    ],
    signalTypes: ["testing", "ai-ml", "ci-cd", "infrastructure"],
    createdAt: "2024-12-14T16:45:00Z"
  },
  {
    id: "story-rag-optimization",
    title: "Optimized RAG Retrieval with Hybrid Search Strategy",
    summary: "Combined dense and sparse retrieval methods to improve answer relevance by 40% on complex queries.",
    problem: "Pure vector search was missing key documents for multi-hop questions requiring exact term matching.",
    change: "Implemented hybrid search combining BM25 keyword matching with semantic embeddings and re-ranking.",
    technicalSignificance: 7,
    storyPotential: 8,
    visualPotential: 9,
    claims: [
      {
        id: "claim-rag-1",
        text: "Integrated hybrid search with BM25 + vector embeddings",
        evidenceIds: ["evidence-rag-commit-1", "evidence-retrieval-code"]
      },
      {
        id: "claim-rag-2",
        text: "Improved retrieval accuracy by 40% on benchmark queries",
        evidenceIds: ["evidence-rag-commit-2", "evidence-benchmark-results"]
      }
    ],
    commitShas: [
      "g789012345678901234567890123abcdefghijkl",
      "h89012345678901234567890123abcdefghijklm"
    ],
    signalTypes: ["ai-ml", "rag", "performance", "database-change"],
    createdAt: "2024-12-13T09:15:00Z"
  },
  {
    id: "story-auth-refactor",
    title: "Migrated Authentication System to OAuth 2.0 with PKCE",
    summary: "Replaced legacy session-based auth with modern OAuth 2.0 flow, improving security and enabling SSO integrations.",
    problem: "Existing authentication lacked support for social logins and had known session fixation vulnerabilities.",
    change: "Implemented OAuth 2.0 with PKCE, secure token storage, and refresh token rotation.",
    technicalSignificance: 8,
    storyPotential: 6,
    visualPotential: 5,
    claims: [
      {
        id: "claim-auth-1",
        text: "Migrated from session cookies to JWT tokens with refresh rotation",
        evidenceIds: ["evidence-auth-commit-1", "evidence-auth-config"]
      },
      {
        id: "claim-auth-2",
        text: "Added GitHub, Google, and Microsoft SSO providers",
        evidenceIds: ["evidence-auth-commit-2", "evidence-oauth-providers"]
      }
    ],
    commitShas: [
      "i9012345678901234567890123abcdefghijklmn",
      "j012345678901234567890123abcdefghijklmno"
    ],
    signalTypes: ["authentication", "authorization", "security", "refactoring"],
    createdAt: "2024-12-12T14:20:00Z"
  },
  {
    id: "story-k8s-migration",
    title: "Migrated Monolith to Kubernetes with GitOps Workflows",
    summary: "Containerized legacy application and deployed to Kubernetes using ArgoCD for continuous deployment.",
    problem: "Manual deployments were error-prone, took 2-3 hours, and had frequent rollback scenarios.",
    change: "Created Docker images, Helm charts, and ArgoCD pipelines for automated deployments.",
    technicalSignificance: 9,
    storyPotential: 7,
    visualPotential: 8,
    claims: [
      {
        id: "claim-k8s-1",
        text: "Containerized 12 microservices with optimized Docker images",
        evidenceIds: ["evidence-k8s-commit-1", "evidence-dockerfiles"]
      },
      {
        id: "claim-k8s-2",
        text: "Reduced deployment time from 3 hours to 8 minutes",
        evidenceIds: ["evidence-k8s-commit-2", "evidence-deployment-metrics"]
      }
    ],
    commitShas: [
      "k12345678901234567890123abcdefghijklmnop",
      "l2345678901234567890123abcdefghijklmnopq"
    ],
    signalTypes: ["infrastructure", "docker", "ci-cd", "refactoring"],
    createdAt: "2024-12-10T11:00:00Z"
  }
];

export const mockEvidence = {
  "evidence-commit-1": {
    id: "evidence-commit-1",
    type: "commit" as const,
    referenceId: "a1b2c3d4e5f6789012345678901234567890abcd",
    description: "Add Redis client dependency and configuration",
    url: "https://github.com/shipstory/shipstory/commit/a1b2c3d4"
  },
  "evidence-commit-2": {
    id: "evidence-commit-2",
    type: "commit" as const,
    referenceId: "b2c3d4e5f67890123456789012345678901abcde",
    description: "Implement cache wrapper around tool execution",
    url: "https://github.com/shipstory/shipstory/commit/b2c3d4e5"
  },
  "evidence-commit-3": {
    id: "evidence-commit-3",
    type: "commit" as const,
    referenceId: "c3d4e5f678901234567890123456789012abcdef",
    description: "Add cache invalidation logic and TTL management",
    url: "https://github.com/shipstory/shipstory/commit/c3d4e5f6"
  },
  "evidence-commit-4": {
    id: "evidence-commit-4",
    type: "commit" as const,
    referenceId: "d4e5f6789012345678901234567890123abcdefg",
    description: "Add benchmarks comparing cached vs uncached execution",
    url: "https://github.com/shipstory/shipstory/commit/d4e5f678"
  },
  "evidence-file-cache": {
    id: "evidence-file-cache",
    type: "file" as const,
    referenceId: "src/cache/redis-cache.ts",
    description: "New file: src/cache/redis-cache.ts (156 additions)",
    url: "https://github.com/shipstory/shipstory/blob/main/src/cache/redis-cache.ts"
  },
  "evidence-signal-caching": {
    id: "evidence-signal-caching",
    type: "signal" as const,
    referenceId: "signal-caching-detected",
    description: "Detected caching pattern: Redis client initialization, cache-aside pattern",
    url: undefined
  },
  "evidence-benchmark-test": {
    id: "evidence-benchmark-test",
    type: "file" as const,
    referenceId: "tests/benchmarks/cache-benchmark.test.ts",
    description: "New file: tests/benchmarks/cache-benchmark.test.ts (89 additions)",
    url: "https://github.com/shipstory/shipstory/blob/main/tests/benchmarks/cache-benchmark.test.ts"
  },
  "evidence-metrics-dashboard": {
    id: "evidence-metrics-dashboard",
    type: "file" as const,
    referenceId: "src/observability/metrics.ts",
    description: "Modified: src/observability/metrics.ts (+45, -12)",
    url: "https://github.com/shipstory/shipstory/blob/main/src/observability/metrics.ts"
  }
};

export function getStoryById(id: string): Story | undefined {
  return mockStories.find(story => story.id === id);
}

export function getStoriesBySignalType(signalType: SignalType): Story[] {
  return mockStories.filter(story => story.signalTypes.includes(signalType));
}
