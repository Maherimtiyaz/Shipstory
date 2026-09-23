"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Repository } from "@/types/repository";
import { GitBranch, Star, Code2, Clock, Lock } from "lucide-react";

interface RepositoryGridProps {
  repositories: Repository[];
  onSelect: (repoId: string) => void;
}

export function RepositoryGrid({ repositories, onSelect }: RepositoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <Card key={repo.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-border/50">
          <div onClick={() => onSelect(repo.id)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1">{repo.fullName}</h3>
                {repo.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {repo.description}
                  </p>
                )}
              </div>
              {repo.isPrivate && (
                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" />
                {repo.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                {repo.forks.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Updated recently
              </span>
            </div>

            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {repo.topics.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{repo.topics.length - 4}
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              className="w-full text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(repo.id);
              }}
            >
              Analyze Repository
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
