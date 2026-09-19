"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MockStory, MockClaim, MockEvidence } from "../data/example-story";
import { ChevronRight, GitCommit, FileCode, Zap } from "lucide-react";

interface EvidenceItemProps {
  evidence: MockEvidence;
}

function EvidenceItem({ evidence }: EvidenceItemProps) {
  const iconMap = {
    commit: <GitCommit className="h-3 w-3" />,
    file: <FileCode className="h-3 w-3" />,
    signal: <Zap className="h-3 w-3" />,
  };

  return (
    <div className="flex items-start gap-3 py-2 border-b border-border last:border-0">
      <div className="mt-0.5 text-muted-foreground">{iconMap[evidence.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{evidence.label}</p>
        {evidence.metadata && (
          <div className="mt-1 flex flex-wrap gap-2">
            {Object.entries(evidence.metadata).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs text-muted-foreground font-mono">
                {key === "sha" ? (
                  <span className="text-accent">{value}</span>
                ) : key === "additions" || key === "deletions" ? (
                  <span className={key === "additions" ? "text-success" : "text-destructive"}>
                    {value}
                  </span>
                ) : (
                  <span>{value}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ClaimWithEvidenceProps {
  claim: MockClaim;
  evidence: MockEvidence[];
}

function ClaimWithEvidence({ claim, evidence }: ClaimWithEvidenceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const claimEvidence = evidence.filter((e) => claim.evidenceIds.includes(e.id));

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-surface hover:bg-surface-elevated transition-colors text-left"
      >
        <div className="flex-1 pr-4">
          <p className="text-sm font-medium text-foreground">{claim.text}</p>
        </div>
        <ChevronRight
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>
      {isExpanded && (
        <div className="p-4 bg-background border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-3">Supporting Evidence</p>
          <div className="space-y-1">
            {claimEvidence.map((item) => (
              <EvidenceItem key={item.id} evidence={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StoryCardProps {
  story: MockStory;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
            <CardDescription className="text-base">{story.summary}</CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {story.signals.map((signal) => (
            <Badge key={signal} variant="muted">
              {signal}
            </Badge>
          ))}
          <Badge variant="default">{story.commitCount} commits</Badge>
          <Badge variant="default">{story.fileCount} files</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Claims with supporting evidence
          </p>
          {story.claims.map((claim) => (
            <ClaimWithEvidence
              key={claim.id}
              claim={claim}
              evidence={story.evidence}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
