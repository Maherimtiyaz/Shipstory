import type { Repository } from "@/types/repository";

export const mockRepositories: Repository[] = [
  {
    id: "repo-shipstory-main",
    name: "shipstory",
    owner: "shipstory",
    fullName: "shipstory/shipstory",
    description: "Evidence-backed engineering storytelling platform. Turns GitHub activity into shareable stories.",
    stars: 1542,
    forks: 234,
    language: "TypeScript",
    lastUpdated: "2024-12-15T10:30:00Z",
    size: 2456789,
    defaultBranch: "main",
    isPrivate: false,
    topics: ["developer-tools", "portfolio", "github", "ai", "storytelling"]
  },
  {
    id: "repo-acme-frontend",
    name: "frontend-app",
    owner: "acme-corp",
    fullName: "acme-corp/frontend-app",
    description: "Main React frontend application with Next.js, TypeScript, and Tailwind CSS.",
    stars: 124,
    forks: 18,
    language: "TypeScript",
    lastUpdated: "2024-12-14T16:45:00Z",
    size: 456789,
    defaultBranch: "main",
    isPrivate: true,
    topics: ["react", "nextjs", "typescript", "tailwind"]
  },
  {
    id: "repo-devtools-api",
    name: "api-gateway",
    owner: "devtools-io",
    fullName: "devtools-io/api-gateway",
    description: "High-performance API gateway with Redis caching, rate limiting, and observability.",
    stars: 892,
    forks: 156,
    language: "Go",
    lastUpdated: "2024-12-13T09:15:00Z",
    size: 1234567,
    defaultBranch: "main",
    isPrivate: false,
    topics: ["api", "gateway", "redis", "go", "microservices"]
  },
  {
    id: "repo-ml-pipeline",
    name: "ml-evaluation-pipeline",
    owner: "ai-research-lab",
    fullName: "ai-research-lab/ml-evaluation-pipeline",
    description: "Automated evaluation pipeline for LLM models with RAG testing and benchmarking.",
    stars: 2341,
    forks: 445,
    language: "Python",
    lastUpdated: "2024-12-12T14:20:00Z",
    size: 3456789,
    defaultBranch: "main",
    isPrivate: false,
    topics: ["machine-learning", "llm", "evaluation", "rag", "python"]
  },
  {
    id: "repo-mobile-app",
    name: "mobile-app",
    owner: "startupxyz",
    fullName: "startupxyz/mobile-app",
    description: "Cross-platform mobile app built with React Native and Expo.",
    stars: 67,
    forks: 12,
    language: "TypeScript",
    lastUpdated: "2024-12-10T11:00:00Z",
    size: 234567,
    defaultBranch: "develop",
    isPrivate: true,
    topics: ["react-native", "expo", "mobile", "typescript"]
  },
  {
    id: "repo-infra-k8s",
    name: "kubernetes-infra",
    owner: "cloud-native-team",
    fullName: "cloud-native-team/kubernetes-infra",
    description: "Kubernetes infrastructure as code with Terraform, Helm charts, and GitOps workflows.",
    stars: 445,
    forks: 89,
    language: "HCL",
    lastUpdated: "2024-12-09T08:30:00Z",
    size: 567890,
    defaultBranch: "main",
    isPrivate: false,
    topics: ["kubernetes", "terraform", "helm", "gitops", "devops"]
  }
];

export function getRepositoryById(id: string): Repository | undefined {
  return mockRepositories.find(repo => repo.id === id);
}

export function getRepositoriesByOwner(owner: string): Repository[] {
  return mockRepositories.filter(repo => repo.owner === owner);
}
