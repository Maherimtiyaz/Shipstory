"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RepositoryGrid } from "@/components/dashboard/repository-grid";
import { mockRepositories } from "@/lib/mock-data/repositories";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRepos = mockRepositories;

  const handleSelectRepository = (repoId: string) => {
    router.push(`/dashboard/repo/${repoId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">
              ShipStory
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/dashboard" className="text-primary font-medium">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4 md:px-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Select a Repository</h1>
          <p className="text-muted-foreground max-w-2xl">
            Choose one of your repositories to analyze. ShipStory will discover meaningful 
            engineering stories hidden in your commit history, pull requests, and code changes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Stats Summary */}
        <Card className="p-4 mb-6 bg-muted/50 border-border/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredRepos.length}</span> repositories
            </p>
            <p className="text-xs text-muted-foreground">
              Sorted by recent activity
            </p>
          </div>
        </Card>

        {/* Repository Grid */}
        <RepositoryGrid 
          repositories={filteredRepos} 
          onSelect={handleSelectRepository}
        />
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
