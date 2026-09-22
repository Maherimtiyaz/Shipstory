import { auth } from "@/../auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to ShipStory</h1>
          <p className="mt-2 text-muted-foreground">
            Your code has a story. Let us find it.
          </p>
        </div>

        <div className="mt-8">
          <form
            action={async () => {
              "use server"
              const { signIn } = await import("@/../auth")
              await signIn("github", { callbackUrl: "/dashboard" })
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-4.22 0-.93.33-1.59.87-2.15-.09-.24-.4-.96.09-2.01 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.49 1.05.18 1.77.09 2.01.54.56.87 1.22.87 2.15 0 3.33-1.86 4.01-3.64 4.22.29.25.55.74.55 1.5v2.23c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Connect GitHub
            </button>
          </form>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            By connecting GitHub, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
