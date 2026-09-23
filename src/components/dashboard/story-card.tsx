"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Story } from "@/types/repository";
import { Clock, Users, TrendingUp, GitCommit, ArrowRight } from "lucide-react";

interface StoryCardProps {
  story: Story;
  onViewDetails: (storyId: string) => void;
}

export function StoryCard({ story, onViewDetails }: StoryCardProps) {
  const signalCount = story.signalTypes.length;
  const claimCount = story.claims.length;
  const commitCount = story.commitShas.length;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-border/50">
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2 leading-tight">{story.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{story.summary}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <GitCommit className="w-3.5 h-3.5" />
          {commitCount} commits
        </span>
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          {claimCount} claims
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {signalCount} signals
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {story.signalTypes.slice(0, 3).map((signalType) => (
          <Badge key={signalType} variant="secondary" className="text-xs">
            {signalType.replace("-", " ")}
          </Badge>
        ))}
        {signalCount > 3 && (
          <Badge variant="outline" className="text-xs">
            +{signalCount - 3}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Discovered recently</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewDetails(story.id)}
          className="text-sm"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
