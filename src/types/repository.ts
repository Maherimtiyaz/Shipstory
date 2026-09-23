export interface Repository {
  id: string;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  lastUpdated: string;
  size: number;
  defaultBranch: string;
  isPrivate: boolean;
  topics: string[];
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  additions: number;
  deletions: number;
  changedFiles: string[];
}

export interface EngineeringSignal {
  id: string;
  type: SignalType;
  confidence: number;
  evidence: string[];
  description: string;
}

export type SignalType =
  | "dependency-change"
  | "api-change"
  | "database-change"
  | "authentication"
  | "authorization"
  | "caching"
  | "performance"
  | "testing"
  | "refactoring"
  | "infrastructure"
  | "ci-cd"
  | "docker"
  | "observability"
  | "ai-ml"
  | "rag"
  | "agents"
  | "documentation"
  | "security";

export interface Story {
  id: string;
  title: string;
  summary: string;
  problem: string | null;
  change: string;
  technicalSignificance: number;
  storyPotential: number;
  visualPotential: number;
  claims: Claim[];
  commitShas: string[];
  signalTypes: SignalType[];
  createdAt: string;
}

export interface Claim {
  id: string;
  text: string;
  evidenceIds: string[];
}

export interface Evidence {
  id: string;
  type: "commit" | "file" | "pr" | "signal";
  referenceId: string;
  description: string;
  url?: string;
}
