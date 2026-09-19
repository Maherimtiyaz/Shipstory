import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { StoryCard } from "@/features/landing/components/story-card";
import { exampleStory } from "@/features/landing/data/example-story";
import { ArrowRight, GitBranch, FileSearch, Sparkles, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Your code has a story.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              ShipStory finds the engineering work hidden in your GitHub history and turns it into
              evidence-backed stories worth sharing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                disabled
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors opacity-50 cursor-not-allowed"
                title="GitHub authentication coming soon"
              >
                Connect GitHub
              </button>
              <a
                href="#example"
                className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-transparent px-6 text-sm font-medium text-foreground hover:bg-surface transition-colors"
              >
                See example <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Example Story Section */}
        <section id="example" className="container mx-auto max-w-6xl px-4 py-16">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              What ShipStory discovers
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              This is a sample of what ShipStory can find in your repository. Each claim is backed
              by concrete evidence from your actual GitHub activity.
            </p>
          </div>
          <StoryCard story={exampleStory} />
        </section>

        {/* Evidence Explanation */}
        <section className="bg-surface py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Evidence, not just AI claims
              </h2>
              <p className="text-muted-foreground mb-8">
                ShipStory never invents facts. Every statement traces back to verifiable GitHub
                artifacts—commits, files, dependencies, and technical signals detected by our
                analysis engine.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-border bg-background p-4">
                  <GitBranch className="h-5 w-5 text-accent mb-2" />
                  <h3 className="font-medium text-foreground mb-1">Commits</h3>
                  <p className="text-sm text-muted-foreground">
                    SHA, author, date, message
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <FileSearch className="h-5 w-5 text-accent mb-2" />
                  <h3 className="font-medium text-foreground mb-1">Changed Files</h3>
                  <p className="text-sm text-muted-foreground">
                    Additions, deletions, paths
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <Sparkles className="h-5 w-5 text-accent mb-2" />
                  <h3 className="font-medium text-foreground mb-1">Technical Signals</h3>
                  <p className="text-sm text-muted-foreground">
                    Dependencies, caching, tests
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <Share2 className="h-5 w-5 text-accent mb-2" />
                  <h3 className="font-medium text-foreground mb-1">Generated Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Posts, bullets, narratives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="container mx-auto max-w-6xl px-4 py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold text-foreground mb-3">How it works</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              ShipStory transforms your GitHub activity into meaningful engineering narratives through
              a systematic analysis process.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "1",
                title: "Connect GitHub",
                description:
                  "Authenticate with GitHub and select the repositories you want to analyze.",
              },
              {
                step: "2",
                title: "Analyze engineering activity",
                description:
                  "We ingest commits, diffs, changed files, and pull requests from your selected repositories.",
              },
              {
                step: "3",
                title: "Detect technical signals",
                description:
                  "Our engine identifies dependency changes, API modifications, test additions, and architectural shifts.",
              },
              {
                step: "4",
                title: "Discover meaningful changes",
                description:
                  "Related commits are clustered into coherent stories based on temporal proximity and file overlap.",
              },
              {
                step: "5",
                title: "Inspect evidence",
                description:
                  "Every claim is backed by concrete GitHub artifacts—you can see exactly why ShipStory made each statement.",
              },
              {
                step: "6",
                title: "Create and share",
                description:
                  "Generate portfolio descriptions, resume bullets, or social posts—all traceable to real evidence.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-lg border border-border bg-surface p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-sm font-semibold text-accent">{item.step}</span>
                </div>
                <h3 className="font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-20">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to tell your engineering story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect your GitHub account and discover the meaningful work hidden in your commit
              history.
            </p>
            <button
              disabled
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors opacity-50 cursor-not-allowed"
              title="GitHub authentication coming soon"
            >
              Connect GitHub
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
