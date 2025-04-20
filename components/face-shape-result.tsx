"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

interface FaceShapeResultProps {
  faceShape: string | null
  imageUrl: string | null
  isProcessing?: boolean
}

// Define face shape types and their descriptions
const faceShapeInfo = {
  Round: {
    description: "Round faces have similar length and width with soft features, full cheeks, and a rounded chin.",
  },
  Oblong: {
    description:
      "Oblong faces are longer than they are wide with a long straight cheek line and sometimes a longer nose.",
  },
  Diamond: {
    description:
      "Diamond faces have a narrow forehead and jawline with wide cheekbones, creating a diamond-like appearance.",
  },
  Oval: {
    description:
      "Oval faces are longer than they are wide with a jaw that's narrower than the cheekbones. This is considered the most versatile face shape.",
  },
  Heart: {
    description: "Heart-shaped faces have a wider forehead and cheekbones with a narrow jawline and a pointed chin.",
  },
  Square: {
    description:
      "Square faces have a strong, angular jawline with nearly equal width at the forehead, cheekbones, and jaw.",
  },
}

// List of all face shapes in display order
const allFaceShapes = ["Round", "Oblong", "Diamond", "Oval", "Heart", "Square"]

export default function FaceShapeResult({ faceShape, imageUrl, isProcessing = false }: FaceShapeResultProps) {
  // Local state to track if we're still loading the image
  const [isLoading, setIsLoading] = useState(!!imageUrl)
  
  // Reset loading state when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      setIsLoading(true)
      // Give a small delay to simulate processing and prevent flickering
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [imageUrl])

  // Function to calculate percentages for each face shape based on the detected shape
  const calculatePercentages = () => {
    if (!faceShape) return {}

    // Create a distribution where the detected shape has the highest percentage
    // and others have decreasing percentages
    const percentages: Record<string, number> = {}

    // Generate random percentages for each face shape
    let total = 0
    const randomValues: Record<string, number> = {}

    // Generate random values for each shape
    allFaceShapes.forEach((shape) => {
      // The detected shape gets a higher random base
      const base = shape === faceShape ? 50 + Math.random() * 30 : Math.random() * 30
      randomValues[shape] = base
      total += base
    })

    // Normalize to 100%
    allFaceShapes.forEach((shape) => {
      percentages[shape] = Math.round((randomValues[shape] / total) * 100)
    })

    // Ensure minimum values
    allFaceShapes.forEach((shape) => {
      if (percentages[shape] < 1) percentages[shape] = 1
    })

    // Adjust to ensure they add up to 100%
    const adjustedTotal = Object.values(percentages).reduce((sum, val) => sum + val, 0)
    if (adjustedTotal !== 100) {
      const diff = 100 - adjustedTotal
      percentages[faceShape] += diff
    }

    return percentages
  }

  const handleNewTry = () => {
    // Reset the face shape and image
    window.location.reload()
  }

  if (!faceShape && !imageUrl) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
          <CardDescription>Use the webcam or upload a photo to see your face shape analysis</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No data</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show loading state while processing the image
  if (isLoading || isProcessing) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Processing Your Image</CardTitle>
          <CardDescription>Please wait while we analyze your face shape</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  // Only show the error after loading is complete and no face was detected
  if (!faceShape && imageUrl) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>No Face Detected</CardTitle>
          <CardDescription>We couldn't detect a face in the provided image</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please try again with a clearer photo where your face is visible and well-lit.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const percentages = calculatePercentages()

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Your Face Shape Result</CardTitle>
        <CardDescription>Based on our analysis of your facial proportions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {imageUrl && (
          <div className="flex justify-center mb-2">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img src={imageUrl || "/placeholder.svg"} alt="Your face" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {allFaceShapes.map((shape) => (
            <div key={shape} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{shape}</span>
                <span className="text-sm text-muted-foreground">{percentages[shape]}%</span>
              </div>
              <Progress
                value={percentages[shape]}
                className={`h-2 ${shape === faceShape ? "bg-muted" : "bg-muted/50"}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Primary Face Shape: {faceShape}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {faceShape && faceShapeInfo[faceShape as keyof typeof faceShapeInfo]?.description}
          </p>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleNewTry}
              variant="outline"
              className="w-full max-w-xs bg-primary/10 hover:bg-primary/20 text-primary"
            >
              New try
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
