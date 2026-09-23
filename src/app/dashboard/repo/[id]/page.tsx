"use client";

import { useParams, useRouter } from "next/navigation";
import { getRepositoryById } from "@/lib/mock-data/repositories";
import { mockStories } from "@/lib/mock-data/stories";
import { StoryCard } from "@/components/dashboard/story-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Clock, Users, TrendingUp, GitCommit, Code2, Star } from "lucide-react";

export default function RepositoryAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const repoId = params.id as string;

  const repository = getRepositoryById(repoId);
  
  if (!repository) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Repository Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The repository you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const stats = {
    commitsAnalyzed: 2847,
    activeContributors: 23,
    storiesDiscovered: mockStories.length,
    pullRequests: 156,
    filesChanged: 1243,
    linesAdded: 45678,
    linesDeleted: 23456
  };

  const handleViewStory = (storyId: string) => {
    router.push(`/dashboard/stories/${storyId}`);
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
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Repositories
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4 md:px-6">
        {/* Repository Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-2xl font-bold">{repository.fullName}</h1>
            <Badge variant={repository.isPrivate ? "destructive" : "secondary"}>
              {repository.isPrivate ? "Private" : "Public"}
            </Badge>
            {repository.language && (
              <Badge variant="outline" className="gap-1">
                <Code2 className="w-3 h-3" />
                {repository.language}
              </Badge>
            )}
          </div>
          {repository.description && (
            <p className="text-muted-foreground max-w-3xl">{repository.description}</p>
          )}
          
          {/* Repository Meta */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              {repository.stars.toLocaleString()} stars
            </span>
            <span className="flex items-center gap-1.5">
              <GitCommit className="w-4 h-4" />
              {repository.forks.toLocaleString()} forks
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Updated recently
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <GitCommit className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Commits Analyzed</p>
                <p className="text-xl font-bold">{stats.commitsAnalyzed.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Contributors</p>
                <p className="text-xl font-bold">{stats.activeContributors}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stories Discovered</p>
                <p className="text-xl font-bold">{stats.storiesDiscovered}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Code2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Files Changed</p>
                <p className="text-xl font-bold">{stats.filesChanged.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Engineering Stories</h2>
              <p className="text-sm text-muted-foreground">
                Meaningful changes discovered from your repository activity
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStories.map((story) => (
              <StoryCard 
                key={story.id} 
                story={story} 
                onViewDetails={handleViewStory}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-muted/50 border-border/50">
          <h3 className="font-semibold text-lg mb-2">Want to discover more stories?</h3>
          <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
            Analyze additional repositories or extend the analysis period to uncover more 
            engineering achievements hidden in your codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => router.push("/dashboard")}>
              Analyze Another Repository
            </Button>
            <Button variant="outline">
              Export All Stories
            </Button>
          </div>
        </Card>
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
