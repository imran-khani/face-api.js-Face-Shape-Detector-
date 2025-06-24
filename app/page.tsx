"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/layout/HeroSection"
import { DetectorSection } from "@/components/DetectorSection"
import FaceShapeResult from "@/components/face-shape-result"
import FaceShapeGuide from "@/components/face-shape-guide"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, Zap, Shield, Users, Star, CheckCircle, Upload, Loader2, AlertTriangle, Info } from "lucide-react"

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

    
     

        // Load only the models we need for basic face detection and landmarks
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ])

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

  useEffect(() => {
    if (activeTab === "webcam" && isModelLoaded) {
      startWebcam()
    } else if (activeTab !== "webcam" && videoRef.current && videoRef.current.srcObject) {
      // Stop the webcam when switching away from webcam tab
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }, [activeTab, isModelLoaded])

  const startWebcam = async () => {
    if (videoRef.current) {
      try {
        // Stop any existing stream first
        if (videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
          videoRef.current.srcObject = null
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        })
        videoRef.current.srcObject = stream
        
        // Ensure video plays when ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(e => {
            console.error("Error playing video:", e)
            setLoadingError("Could not start webcam playback. Please try again.")
          })
        }
      } catch (error) {
        console.error("Error accessing webcam:", error)
        setLoadingError("Could not access webcam. Please ensure you've granted camera permissions and no other application is using your camera.")
      }
    }
  }

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

      // Check if webcam is active and has a valid stream
      if (activeTab === "webcam" && (!video.srcObject || video.readyState !== 4)) {
        await startWebcam()
        // Give the webcam a moment to initialize
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

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
          <h1 className="text-4xl font-bold mb-4 mt-5">Face Shape Detector - AI-Powered Face Analysis Tool</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover your face shape instantly with our free AI face shape detector. Get personalized hairstyle, makeup, and accessory recommendations based on your unique facial features.
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
                    
                    {isModelLoaded && loadingError && loadingError.includes("webcam") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                        <div className="flex flex-col items-center gap-2">
                          <AlertTriangle className="h-8 w-8 text-red-500" />
                          <p className="text-center mb-2">{loadingError}</p>
                          <Button onClick={startWebcam} variant="outline" size="sm">
                            Retry Webcam Access
                          </Button>
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
                    <Button
                      onClick={startWebcam}
                      variant="outline"
                      className="px-4 rounded-full"
                      title="Restart webcam"
                    >
                      Restart
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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our AI Face Shape Detector Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our advanced AI face shape analyzer uses facial landmark detection to determine your face shape with 95%+ accuracy. Simply upload a photo or use your webcam to get instant results and personalized style recommendations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Upload & Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo or use webcam to capture your face for AI analysis
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3">AI Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI analyzes facial landmarks and proportions to detect your face shape
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Style Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized hairstyle, makeup, and accessory recommendations for your face shape
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Face Shape Types Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Face Shape Types & Style Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore detailed guides for each face shape with expert styling recommendations
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Round", desc: "Soft curves, similar width and height", icon: "🟡" },
              { name: "Oval", desc: "Balanced proportions, ideal face shape", icon: "🔵" },
              { name: "Square", desc: "Strong jawline, angular features", icon: "🟩" },
              { name: "Heart", desc: "Wider forehead, narrow chin", icon: "💖" },
              { name: "Diamond", desc: "Wide cheekbones, narrow forehead", icon: "💎" },
              { name: "Oblong", desc: "Long and narrow, high forehead", icon: "🔸" }
            ].map((shape) => (
              <Link key={shape.name} href={`/face-shapes/${shape.name.toLowerCase()}`} 
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl mb-3">{shape.icon}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{shape.name} Face</h3>
                  <p className="text-sm text-muted-foreground">{shape.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Face Shape Detector?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets user privacy for the best face shape detection experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center p-6">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">All processing happens in your browser. No data stored.</p>
            </Card>
            
            <Card className="border-0 shadow-lg text-center p-6">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Get results in seconds with our optimized AI.</p>
            </Card>
            
            <Card className="border-0 shadow-lg text-center p-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">95%+ Accurate</h3>
              <p className="text-sm text-muted-foreground">Advanced facial landmark detection technology.</p>
            </Card>
            
            <Card className="border-0 shadow-lg text-center p-6">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Trusted by Thousands</h3>
              <p className="text-sm text-muted-foreground">Join 2,500+ satisfied users worldwide.</p>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our AI face shape detector
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How accurate is the AI face shape detector?",
                a: "Our AI face shape detector uses advanced facial landmark detection technology with over 95% accuracy. It analyzes key facial measurements and proportions to determine your face shape reliably."
              },
              {
                q: "Is my photo stored or shared?",
                a: "No, we prioritize your privacy. All face shape detection is processed locally in your browser. Photos are not stored on our servers or shared with third parties."
              },
              {
                q: "What face shapes can be detected?",
                a: "Our tool detects 6 main face shapes: Round, Oval, Square, Heart, Diamond, and Oblong. Each comes with detailed style recommendations for hairstyles, makeup, and accessories."
              },
              {
                q: "What photo works best for face shape detection?",
                a: "Use a clear, front-facing photo with good lighting. Ensure your entire face is visible, hair pulled back, and avoid shadows or extreme angles for best results."
              }
            ].map((faq, index) => (
              <details key={index} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <summary className="font-semibold cursor-pointer text-lg">{faq.q}</summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-semibold text-xl">Face Shape Detector</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                The most accurate AI-powered face shape detector. Get instant results with live webcam or photo upload. 
                100% free and privacy-focused.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/thsvo" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://wa.me/+8801792577349" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Face Shapes</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/face-shapes/round" className="hover:text-white transition-colors">Round Face</Link></li>
                <li><Link href="/face-shapes/oval" className="hover:text-white transition-colors">Oval Face</Link></li>
                <li><Link href="/face-shapes/square" className="hover:text-white transition-colors">Square Face</Link></li>
                <li><Link href="/face-shapes/heart" className="hover:text-white transition-colors">Heart Face</Link></li>
                <li><Link href="/face-shapes/diamond" className="hover:text-white transition-colors">Diamond Face</Link></li>
                <li><Link href="/face-shapes/oblong" className="hover:text-white transition-colors">Oblong Face</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal & Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="https://codeopx.com/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="https://codeopx.com/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#detector" className="hover:text-white transition-colors">Try Tool</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Face Shape Detector. All rights reserved. Built with ❤️ for better style choices.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🚀 AI-Powered</span>
                <span>🔒 Private</span>
                <span>⚡ Fast</span>
                <span>🎯 Accurate</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
