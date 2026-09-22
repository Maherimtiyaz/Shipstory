declare module "next-auth" {
  interface User {
    id: string
    login?: string
    avatarUrl?: string
  }

  interface Session {
    user: User & {
      id: string
      login?: string
      avatarUrl?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    login?: string
    avatarUrl?: string
  }
}
