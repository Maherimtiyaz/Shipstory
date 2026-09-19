import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
