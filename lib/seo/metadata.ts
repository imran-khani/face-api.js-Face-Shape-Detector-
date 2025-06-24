import { Metadata } from 'next'

interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  noindex?: boolean
  faceShape?: string
  schema?: Record<string, any>
}

const baseUrl = "https://detect-face-shape.codeopx.com"
const siteName = "Face Shape Detector"
const appName = "Face Shape Detector - AI Face Analysis Tool"

export function generateMetadata({
  title,
  description = "Discover your face shape instantly with our free AI-powered detector. Upload photo, get accurate results & personalized style recommendations for hairstyles, makeup & accessories.",
  keywords = ["face shape detector", "AI face analysis", "face type finder", "what is my face shape"],
  canonical = "/",
  ogImage = "/og-image.jpg",
  noindex = false,
  faceShape,
  schema
}: SEOConfig = {}): Metadata {

  const fullTitle = title ? `${title} | ${siteName}` : 
    faceShape ? `${faceShape} Face Shape - Style Guide & Tips | ${siteName}` :
    appName

  const metaDescription = faceShape ?
    `Discover style tips for ${faceShape} face shape. Get personalized hairstyle, makeup & accessory recommendations for your ${faceShape} face type.` :
    description

  const keywordString = faceShape ?
    [...keywords, `${faceShape} face shape`, `${faceShape} hairstyles`, `${faceShape} makeup`].join(", ") :
    keywords.join(", ")

  return {
    title: {
      template: `%s | ${siteName}`,
      default: fullTitle
    },
    description: metaDescription,
    keywords: keywordString,
    authors: [{ name: "Face Shape Detector Team", url: baseUrl }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}${canonical}`
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: `${baseUrl}${canonical}`,
      siteName,
      images: [{
        url: `${baseUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: faceShape ? `${faceShape} Face Shape Analysis` : "Face Shape Detector Tool"
      }],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [`${baseUrl}${ogImage}`],
      creator: "@faceshapedetector"
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    verification: {
      google: "IGnxBXXuJZnPo_xBhWnVoueev58n1O_EHmf0XGEdDv4"
    },
    other: schema ? { "ld+json": JSON.stringify(schema) } : {}
  }
}
