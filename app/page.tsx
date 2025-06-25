"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/layout/HeroSection"
import FaceShapeResult from "@/components/face-shape-result"
import FaceShapeGuide from "@/components/face-shape-guide"
import { FaceDetectorTabs } from "@/components/FaceDetectorTabs"
import { HowItWorksSection } from "@/components/HowItWorksSection"
import { FaceShapesSection } from "@/components/FaceShapesSection"
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection"
import { FAQSection } from "@/components/FAQSection"
import { UserReviewsSection } from "@/components/UserReviewsSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [faceShape, setFaceShape] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFaceShapeDetected = (shape: string, url: string) => {
    setFaceShape(shape)
    setImageUrl(url)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setFaceShape(null)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        {/* Enhanced Detector Section */}
        <section id="detector" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">AI Face Shape Detector Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use live webcam or upload a photo to get instant face shape analysis with personalized style recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <FaceDetectorTabs 
              onFaceShapeDetected={handleFaceShapeDetected}
              onError={handleError}
            />

            <div className="space-y-8">
              <FaceShapeResult faceShape={faceShape} imageUrl={imageUrl} />
              <FaceShapeGuide />
            </div>
          </div>
        </section>

        <HowItWorksSection />
        <FaceShapesSection />
        <WhyChooseUsSection />
        <FAQSection />
        <UserReviewsSection />
        <CTASection />
      </div>
      
      <Footer />
    </main>
  )
}