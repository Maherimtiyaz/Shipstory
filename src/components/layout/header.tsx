import { auth } from "@/../auth"
import Link from "next/link"

export default async function Header() {
  const session = await auth()

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          ShipStory
        </Link>

        <nav className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                {session.user?.avatarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.avatarUrl}
                    alt={session.user.login || "User avatar"}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{session.user?.login}</span>
                <form
                  action={async () => {
                    "use server"
                    const { signOut } = await import("@/../auth")
                    await signOut()
                  }}
                >
                  <button
                    type="submit"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Sign in
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Connect GitHub
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
