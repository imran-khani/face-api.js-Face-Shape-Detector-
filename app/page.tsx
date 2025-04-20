"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Loader2, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import FaceShapeResult from "@/components/face-shape-result"
import FaceShapeGuide from "@/components/face-shape-guide"
import Link from "next/link"

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload") // Changed from "webcam" to "upload"
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [faceShape, setFaceShape] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isMirrored, setIsMirrored] = useState(true) // Default to mirrored for webcam preview
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load face-api.js models
    const loadModels = async () => {
      try {
        const faceapi = await import("face-api.js")

        // Use a more reliable CDN for the models
        const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"

        // Show loading status
        console.log("Loading face detection models from CDN...")

        // Load only the models we need for basic face detection and landmarks
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ])

        console.log("Face detection models loaded successfully")
        setIsModelLoaded(true)
        setLoadingError(null)
      } catch (error) {
        console.error("Error loading models:", error)
        setLoadingError("Failed to load face detection models. Please check your internet connection and try again.")
        setIsModelLoaded(false)
      }
    }

    loadModels()

    // Clean up video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const startWebcam = async () => {
    if (videoRef.current) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream
      } catch (error) {
        console.error("Error accessing webcam:", error)
        setLoadingError("Could not access webcam. Please ensure you've granted camera permissions.")
      }
    }
  }

  useEffect(() => {
    if (activeTab === "webcam" && isModelLoaded) {
      startWebcam()
    }
  }, [activeTab, isModelLoaded])

  const toggleMirror = () => {
    setIsMirrored(!isMirrored)
  }

  const detectFaceShape = async () => {
    if (!isModelLoaded) {
      setLoadingError("Face detection models are still loading. Please wait.")
      return
    }

    setIsProcessing(true)
    setLoadingError(null)

    try {
      const faceapi = await import("face-api.js")
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas) return

      const displaySize = { width: video.videoWidth, height: video.videoHeight }
      faceapi.matchDimensions(canvas, displaySize)

      // First check if models are loaded
      if (!faceapi.nets.ssdMobilenetv1.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded) {
        throw new Error("Face detection models not loaded properly")
      }

      // Use SSD MobileNet for detection
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks()

      if (detections.length === 0) {
        setFaceShape(null)
        setLoadingError("No face detected. Please ensure your face is clearly visible and well-lit.")
        setIsProcessing(false)
        return
      }

      // Take a snapshot of the current video frame
      const context = canvas.getContext("2d")
      if (context) {
        // Clear the canvas first
        context.clearRect(0, 0, canvas.width, canvas.height)

        // If we want a non-mirrored image for the result
        if (!isMirrored) {
          // Draw the video directly (non-mirrored)
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
        } else {
          // For mirrored result, flip the canvas horizontally
          context.translate(canvas.width, 0)
          context.scale(-1, 1)
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          // Reset transform
          context.setTransform(1, 0, 0, 1, 0, 0)
        }

        const imageData = canvas.toDataURL("image/png")
        setImageUrl(imageData)
      }

      // Analyze face shape based on landmarks
      const landmarks = detections[0].landmarks
      const jawline = landmarks.getJawOutline()
      const faceWidth = Math.abs(jawline[16].x - jawline[0].x)
      const faceHeight = Math.abs(landmarks.getNose()[0].y - jawline[8].y)
      const jawWidth = Math.abs(jawline[14].x - jawline[2].x)
      const foreheadWidth = Math.abs(landmarks.getRightEyeBrow()[0].x - landmarks.getLeftEyeBrow()[4].x)
      const chinWidth = Math.abs(jawline[10].x - jawline[6].x)

      // Calculate ratios for shape determination
      const widthToHeightRatio = faceWidth / faceHeight
      const jawToForeheadRatio = jawWidth / foreheadWidth
      const chinToJawRatio = chinWidth / jawWidth

      // Determine face shape based on ratios
      let shape = ""

      if (widthToHeightRatio > 0.95) {
        if (jawToForeheadRatio > 0.9 && chinToJawRatio > 0.8) {
          shape = "Round"
        } else if (jawToForeheadRatio < 0.8) {
          shape = "Heart"
        } else {
          shape = "Square"
        }
      } else {
        if (jawToForeheadRatio > 0.9) {
          shape = "Oval"
        } else if (jawToForeheadRatio < 0.8) {
          shape = "Diamond"
        } else {
          shape = "Oblong"
        }
      }

      setFaceShape(shape)
    } catch (error) {
      console.error("Error detecting face shape:", error)
      setLoadingError("Error during face detection. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return

    if (!isModelLoaded) {
      setLoadingError("Face detection models are still loading. Please wait.")
      return
    }

    setIsProcessing(true)
    setLoadingError(null)

    try {
      const file = event.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)

      const faceapi = await import("face-api.js")
      const img = new Image()
      img.crossOrigin = "anonymous" // Add this to avoid CORS issues
      img.src = imageUrl

      img.onload = async () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext("2d")
        if (!context) return

        // Set canvas dimensions to match image
        canvas.width = img.width
        canvas.height = img.height

        // Draw image on canvas
        context.drawImage(img, 0, 0, img.width, img.height)

        // First check if models are loaded
        if (!faceapi.nets.ssdMobilenetv1.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded) {
          throw new Error("Face detection models not loaded properly")
        }

        // Use SSD MobileNet for detection
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks()

        if (detections.length === 0) {
          setFaceShape(null)
          setLoadingError("No face detected in the image. Please upload a clear photo of a face.")
          setIsProcessing(false)
          return
        }

        // Analyze face shape (same logic as webcam)
        const landmarks = detections[0].landmarks
        const jawline = landmarks.getJawOutline()
        const faceWidth = Math.abs(jawline[16].x - jawline[0].x)
        const faceHeight = Math.abs(landmarks.getNose()[0].y - jawline[8].y)
        const jawWidth = Math.abs(jawline[14].x - jawline[2].x)
        const foreheadWidth = Math.abs(landmarks.getRightEyeBrow()[0].x - landmarks.getLeftEyeBrow()[4].x)
        const chinWidth = Math.abs(jawline[10].x - jawline[6].x)

        const widthToHeightRatio = faceWidth / faceHeight
        const jawToForeheadRatio = jawWidth / foreheadWidth
        const chinToJawRatio = chinWidth / jawWidth

        let shape = ""

        if (widthToHeightRatio > 0.95) {
          if (jawToForeheadRatio > 0.9 && chinToJawRatio > 0.8) {
            shape = "Round"
          } else if (jawToForeheadRatio < 0.8) {
            shape = "Heart"
          } else {
            shape = "Square"
          }
        } else {
          if (jawToForeheadRatio > 0.9) {
            shape = "Oval"
          } else if (jawToForeheadRatio < 0.8) {
            shape = "Diamond"
          } else {
            shape = "Oblong"
          }
        }

        setFaceShape(shape)
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Error processing uploaded image:", error)
      setLoadingError("Error processing the image. Please try a different photo.")
      setIsProcessing(false)
    }
  }

  const retryModelLoading = () => {
    setLoadingError(null)
    setIsModelLoaded(false)
    // This will trigger the useEffect to run again
    const loadModels = async () => {
      try {
        const faceapi = await import("face-api.js")
        const MODEL_URL = "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"

        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ])

        setIsModelLoaded(true)
        setLoadingError(null)
      } catch (error) {
        console.error("Error loading models:", error)
        setLoadingError("Failed to load face detection models. Please check your internet connection and try again.")
      }
    }

    loadModels()
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-transparent backdrop-blur-sm py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-blue-600 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h1 className="text-xl font-medium"> Face Type Detector</h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-6">
            {/* <a href="/docs" className="text-blue-600 hover:underline text-sm">Docs</a>
            <a href="/" className="text-blue-600 hover:underline text-sm">Features</a> */}
            <a href="https://codeopx.com/about" className="text-blue-600 hover:underline text-sm">About</a>
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 mt-5">Face Shape Detector</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock a personalized style built with your face shape in mind
          </p>

          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          </div>
        </header>

        {loadingError && (
          <Alert variant="destructive" className="mb-10 max-w-3xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loadingError}</AlertDescription>
            {loadingError.includes("Failed to load face detection models") && (
              <Button onClick={retryModelLoading} variant="outline" size="sm" className="mt-2">
                Retry Loading Models
              </Button>
            )}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="w-full border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <CardTitle className="text-2xl">Detect Your Face Shape</CardTitle>
              <CardDescription>Upload a photo or use your webcam to detect your face shape</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 rounded-lg">
                  <TabsTrigger value="webcam" className="rounded-md py-3">
                    <Camera className="mr-2 h-4 w-4" />
                    Webcam
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-md py-3">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="webcam" className="mt-4">
                  <div className="relative aspect-video bg-muted rounded-xl overflow-hidden shadow-sm">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={`w-full h-full object-cover ${isMirrored ? "scale-x-[-1]" : ""}`}
                    />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

                    {!isModelLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p>Loading face detection models...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={detectFaceShape}
                      className="flex-1 rounded-full py-6"
                      disabled={!isModelLoaded || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Detect Face Shape"
                      )}
                    </Button>
                    <Button
                      onClick={toggleMirror}
                      variant="outline"
                      className="px-4 rounded-full"
                      title={isMirrored ? "Show non-mirrored view" : "Show mirrored view"}
                    >
                      {isMirrored ? "Mirror: On" : "Mirror: Off"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="mt-4">
                  <div className="relative aspect-video bg-muted rounded-xl overflow-hidden shadow-sm">
                    {imageUrl && activeTab === "upload" ? (
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt="Uploaded face"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-muted-foreground">Upload a clear photo of your face</p>
                        </div>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
                  </div>

                  <div className="mt-6">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full rounded-full py-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center bg-primary/5 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <p>For best results, use a well-lit front-facing photo</p>
              </div>
            </CardFooter>
          </Card>

          <div className="space-y-8">
            <FaceShapeResult faceShape={faceShape} imageUrl={imageUrl} />
            <FaceShapeGuide />
          </div>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">How Face Shape Detection Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our AI analyzes facial landmarks to determine your face shape, helping you find the most flattering styles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-primary/5 border-0">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Capture</h3>
                <p className="text-sm text-muted-foreground">
                  Take a photo or upload an existing one with your face clearly visible
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-0">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI measures key facial proportions to determine your face shape
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-0">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Discover</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized style recommendations based on your unique face shape
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <footer className="mt-20 pt-8 pb-8 border-t border-gray-200 pl-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-medium mb-4">Terms of Service</h3>
            <p className="text-sm text-gray-600 mb-2">
              By using Face type Detector, you agree to these terms. We provide this service as is, without warranties.
            </p>
            <p className="text-sm text-gray-600">
              We reserve the right to modify or terminate the service for any reason, without notice at any time.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Privacy Policy</h3>
            <p className="text-sm text-gray-600 mb-2">
              We collect minimal data necessary to provide our service. This includes the URLs you submit for Face type detection.
            </p>
            <p className="text-sm text-gray-600">
              We use cookies to enhance your experience. You can opt out of non-essential cookies at any time.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Data Usage</h3>
            <p className="text-sm text-gray-600 mb-2">
              We do not sell your personal data to third parties. We may use anonymized data for improving our service.
            </p>
            <p className="text-sm text-gray-600">
              You can request deletion of your data by contacting us.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div className="mb-4 md:mb-0">
                  <a href="/terms" className="text-gray-600 hover:text-gray-900 mr-4">Terms of Service</a>
                  <a href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
                </div> */}

            <div className="flex space-x-6">
              <a href="https://github.com/thsvo" className="text-gray-600 hover:text-gray-900">Github</a>
              <a href="https://wa.me/+8801792577349" className="text-gray-600 hover:text-gray-900">WhatsApp</a>
              <a href="https://codeopx.com/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
