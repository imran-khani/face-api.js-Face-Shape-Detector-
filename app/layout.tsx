import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Face Shape Detector! Face Type Detector AI With Camera",
  description: "Detect your face shape using AI. Our advanced AI technology helps you determine your face shape for better hairstyle, makeup, and glasses choices.",
  keywords: "face shape detector, face type, AI face detection, face analysis, facial recognition, face shape analysis",
  authors: [{ name: "Face Shape Detector Team" }],
  creator: "Face Shape Detector",
  publisher: "Face Shape Detector",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://faceshapedetector.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Face Shape Detector! Face Type Detector AI",
    description: "Detect your face shape using AI for better style choices",
    url: "https://detect-face-shape.codeopx.com", // Replace with your actual domain
    siteName: "Face Shape Detector",
    images: [
      {
        url: "/logo.jpg", // Add your actual OG image path
        width: 1200,
        height: 630,
        alt: "Face Shape Detector Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Face Shape Detector! Face Type Detector AI",
    description: "Detect your face shape using AI for better style choices",
    images: ["/logo.jpg"], // Add your actual Twitter image path
    creator: "@tsnnl", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

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
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
