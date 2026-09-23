"use client";

import { useParams, useRouter } from "next/navigation";
import { getStoryById, mockEvidence } from "@/lib/mock-data/stories";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, GitCommit, FileCode, TrendingUp, CheckCircle2, ExternalLink, Copy, Download } from "lucide-react";
import { useState } from "react";

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.id as string;

  const story = getStoryById(storyId);
  
  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "content">("overview");

  if (!story) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Story Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getEvidenceDetails = (evidenceId: string) => {
    return mockEvidence[evidenceId as keyof typeof mockEvidence];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
              ShipStory
            </span>
          </Link>
          
          <nav className="flex items-center gap-4 text-sm">
            <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/repo/${story.commitShas[0]?.substring(0, 8)}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Repository
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4 md:px-6">
        {/* Story Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{story.title}</h1>
              <p className="text-muted-foreground max-w-3xl">{story.summary}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Story Metrics */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="w-3 h-3" />
              Technical Significance: {story.technicalSignificance}/10
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Story Potential: {story.storyPotential}/10
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Visual Potential: {story.visualPotential}/10
            </Badge>
          </div>

          {/* Signal Types */}
          <div className="flex flex-wrap gap-2 mb-6">
            {story.signalTypes.map((signalType) => (
              <Badge key={signalType} variant="outline">
                {signalType.replace("-", " ")}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-border/50">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("overview")}
            className="rounded-t-md rounded-b-none"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "evidence" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("evidence")}
            className="rounded-t-md rounded-b-none"
          >
            Evidence ({story.claims.reduce((acc, claim) => acc + claim.evidenceIds.length, 0)})
          </Button>
          <Button
            variant={activeTab === "content" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("content")}
            className="rounded-t-md rounded-b-none"
          >
            Generated Content
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Problem Statement */}
            {story.problem && (
              <Card className="p-6 border-border/50">
                <h3 className="font-semibold text-lg mb-3">Problem</h3>
                <p className="text-muted-foreground">{story.problem}</p>
              </Card>
            )}

            {/* Engineering Change */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold text-lg mb-3">Engineering Change</h3>
              <p className="text-muted-foreground">{story.change}</p>
            </Card>

            {/* Claims */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold text-lg mb-4">Key Claims</h3>
              <div className="space-y-4">
                {story.claims.map((claim) => (
                  <div key={claim.id} className="pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="font-medium">{claim.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground ml-8">
                      Supported by {claim.evidenceIds.length} pieces of evidence
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Commits */}
            <Card className="p-6 border-border/50">
              <h3 className="font-semibold text-lg mb-4">Related Commits</h3>
              <div className="space-y-2">
                {story.commitShas.map((sha) => (
                  <div 
                    key={sha}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <GitCommit className="w-4 h-4 text-muted-foreground" />
                      <code className="text-xs font-mono">{sha.substring(0, 8)}</code>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "evidence" && (
          <Card className="p-6 border-border/50">
            <h3 className="font-semibold text-lg mb-4">Evidence Graph</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Every claim in this story is backed by concrete evidence from your repository.
              Click on any evidence item to view the source.
            </p>
            
            <div className="space-y-6">
              {story.claims.map((claim) => (
                <div key={claim.id} className="pb-6 border-b border-border/50 last:border-0 last:pb-0">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {claim.text}
                  </h4>
                  
                  <div className="space-y-2 ml-6">
                    {claim.evidenceIds.map((evidenceId) => {
                      const evidence = getEvidenceDetails(evidenceId);
                      if (!evidence) return null;
                      
                      return (
                        <div 
                          key={evidence.id}
                          className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {evidence.type === "commit" && (
                                <GitCommit className="w-4 h-4 text-blue-600 mt-0.5" />
                              )}
                              {evidence.type === "file" && (
                                <FileCode className="w-4 h-4 text-purple-600 mt-0.5" />
                              )}
                              {evidence.type === "signal" && (
                                <TrendingUp className="w-4 h-4 text-orange-600 mt-0.5" />
                              )}
                              
                              <div>
                                <p className="text-sm font-medium">{evidence.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Type: {evidence.type} • Reference: {evidence.referenceId.substring(0, 50)}
                                </p>
                              </div>
                            </div>
                            
                            {evidence.url && (
                              <Button variant="ghost" size="sm" className="shrink-0">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            {/* X Post */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">X / Twitter Post</h3>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`Just shipped: ${story.title}\n\n${story.summary}\n\n#buildinpublic #engineering`)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">
                  Just shipped: {story.title}
                  {"\n\n"}
                  {story.summary}
                  {"\n\n"}
                  #buildinpublic #engineering
                </p>
              </div>
            </Card>

            {/* Portfolio Description */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Portfolio Description</h3>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(story.summary)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">{story.summary}</p>
              </div>
            </Card>

            {/* Resume Bullet */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Resume Bullet Point</h3>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`• ${story.change}`)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">• {story.change}</p>
              </div>
            </Card>

            {/* Technical Explanation */}
            <Card className="p-6 border-border/50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Technical Explanation</h3>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(`${story.problem}\n\nSolution: ${story.change}`)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div>
                  <p className="text-xs font-medium mb-1">Problem:</p>
                  <p className="text-sm text-muted-foreground">{story.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1">Solution:</p>
                  <p className="text-sm text-muted-foreground">{story.change}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 ShipStory. Evidence-backed engineering storytelling.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
