import { Header } from "@/components/layout/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <section className="max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Your code has a story.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            ShipStory finds the engineering work hidden in your GitHub history and turns it into evidence-backed stories worth sharing.
          </p>
        </section>
      </main>
    </div>
  )
}
