import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/Footer"
import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import { createWebAppSchema, createHowToSchema, createFAQSchema } from "@/lib/seo/schemas"
import { StructuredData } from "@/components/SEO/StructuredData"

export const metadata = createMetadata({
  title: "Face Shape Detector - Free AI Tool with Live Webcam & Photo Upload",
  description: "Discover your face shape instantly with our free AI-powered detector. Use live webcam or upload photo for accurate results. Get personalized hairstyle, makeup & style recommendations. 100% private & secure.",
  keywords: ["face shape detector", "AI face analysis", "live webcam face detection", "face type finder", "what is my face shape", "face shape analyzer", "facial recognition tool", "hairstyle recommendations", "makeup tips", "free face detector", "webcam face analysis"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData schema={[
          createWebAppSchema(),
          createHowToSchema(),
          createFAQSchema()
        ]} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
