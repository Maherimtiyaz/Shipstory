import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShipStory - Your code has a story",
  description: "ShipStory finds the engineering work hidden in your GitHub history and turns it into evidence-backed stories worth sharing.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
