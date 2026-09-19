"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error for debugging (never expose raw error to users)
  if (process.env.NODE_ENV === "development") {
    console.error("Application error:", error);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
