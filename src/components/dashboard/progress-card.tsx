"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

export type AnalysisStageStatus = "pending" | "in-progress" | "completed" | "error";

export interface AnalysisStage {
  id: string;
  title: string;
  description?: string;
  status: AnalysisStageStatus;
  progress?: number;
}

interface ProgressCardProps {
  stages: AnalysisStage[];
}

export function ProgressCard({ stages }: ProgressCardProps) {
  const completedCount = stages.filter(s => s.status === "completed").length;
  const totalCount = stages.length;
  const overallProgress = (completedCount / totalCount) * 100;

  return (
    <Card className="p-6 border-border/50">
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Analysis Progress</h3>
        <p className="text-sm text-muted-foreground">
          Processing repository data to discover engineering stories
        </p>
        
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completedCount} of {totalCount} stages complete
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <div 
            key={stage.id}
            className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0"
          >
            <div className="mt-0.5">
              {stage.status === "completed" && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              {stage.status === "in-progress" && (
                <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
              )}
              {stage.status === "error" && (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              {stage.status === "pending" && (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{stage.title}</h4>
                {stage.progress !== undefined && stage.status === "in-progress" && (
                  <span className="text-xs text-muted-foreground">
                    {stage.progress}%
                  </span>
                )}
              </div>
              
              {stage.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stage.description}
                </p>
              )}

              {stage.status === "in-progress" && stage.progress !== undefined && (
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
