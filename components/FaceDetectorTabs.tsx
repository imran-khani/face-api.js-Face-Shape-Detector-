"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, Upload, Loader2, AlertTriangle, Info, Play, RotateCcw } from "lucide-react"

interface FaceDetectorTabsProps {
  onFaceShapeDetected: (shape: string, imageUrl: string) => void
  onError: (error: string) => void
}

export function FaceDetectorTabs({ onFaceShapeDetected, onError }: FaceDetectorTabsProps) {
  const [activeTab, setActiveTab] = useState("upload")
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [isMirrored, setIsMirrored] = useState(true)
  const [webcamStarted, setWebcamStarted] = useState(false)
  const [webcamError, setWebcamError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadModels()
    return () => {
      stopWebcam()
    }
  }, [])

  useEffect(() => {
    if (activeTab === "webcam" && isModelLoaded && webcamStarted) {
      initializeWebcam()
    } else if (activeTab !== "webcam") {
      stopWebcam()
    }
  }, [activeTab, isModelLoaded, webcamStarted])

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
      setIsModelLoaded(false)
    }
  }

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setWebcamStarted(false)
  }

  const initializeWebcam = async () => {
    if (!videoRef.current || !isModelLoaded) return
    
    try {
      // Clear any existing error
      setLoadingError(null)
      
      // Request camera permission and stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          facingMode: 'user'
        } 
      })
      
      videoRef.current.srcObject = stream
      
      // Wait for video metadata to load
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => {
            console.error("Error playing video:", e)
            setLoadingError("Could not start webcam playback. Please try again.")
            setWebcamError(true)
          })
        }
      }
      
      // Handle video loading errors
      videoRef.current.onerror = () => {
        setLoadingError("Error loading webcam feed. Please check your camera.")
        setWebcamError(true)
      }
      
    } catch (error) {
      console.error("Error accessing webcam:", error)
      
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'NotAllowedError':
            setLoadingError("Camera access denied. Please allow camera permissions and try again.")
            break
          case 'NotFoundError':
            setLoadingError("No camera found. Please connect a camera and try again.")
            break
          case 'NotReadableError':
            setLoadingError("Camera is in use by another application. Please close other apps and try again.")
            break
          default:
            setLoadingError("Could not access webcam. Please check your camera permissions.")
        }
      } else {
        setLoadingError("Could not access webcam. Please ensure you've granted camera permissions.")
      }
      
      setWebcamError(true)
    }
  }

  const handleWebcamClick = async () => {
    if (!webcamStarted && isModelLoaded) {
      setWebcamStarted(true)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const analyzeFaceShape = (landmarks: any) => {
    const jawline = landmarks.getJawOutline()
    const faceWidth = Math.abs(jawline[16].x - jawline[0].x)
    const faceHeight = Math.abs(landmarks.getNose()[0].y - jawline[8].y)
    const jawWidth = Math.abs(jawline[14].x - jawline[2].x)
    const foreheadWidth = Math.abs(landmarks.getRightEyeBrow()[0].x - landmarks.getLeftEyeBrow()[4].x)
    const chinWidth = Math.abs(jawline[10].x - jawline[6].x)

    const widthToHeightRatio = faceWidth / faceHeight
    const jawToForeheadRatio = jawWidth / foreheadWidth
    const chinToJawRatio = chinWidth / jawWidth

    if (widthToHeightRatio > 0.95) {
      if (jawToForeheadRatio > 0.9 && chinToJawRatio > 0.8) {
        return "Round"
      } else if (jawToForeheadRatio < 0.8) {
        return "Heart"
      } else {
        return "Square"
      }
    } else {
      if (jawToForeheadRatio > 0.9) {
        return "Oval"
      } else if (jawToForeheadRatio < 0.8) {
        return "Diamond"
      } else {
        return "Oblong"
      }
    }
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

      if (activeTab === "webcam" && (!video.srcObject || video.readyState !== 4)) {
        setLoadingError("Webcam not ready. Please ensure webcam is started and try again.")
        setIsProcessing(false)
        return
      }

      const displaySize = { width: video.videoWidth, height: video.videoHeight }
      faceapi.matchDimensions(canvas, displaySize)

      if (!faceapi.nets.ssdMobilenetv1.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded) {
        throw new Error("Face detection models not loaded properly")
      }

      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks()

      if (detections.length === 0) {
        setLoadingError("No face detected. Please ensure your face is clearly visible and well-lit.")
        setIsProcessing(false)
        return
      }

      const context = canvas.getContext("2d")
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height)

        if (!isMirrored) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
        } else {
          context.translate(canvas.width, 0)
          context.scale(-1, 1)
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          context.setTransform(1, 0, 0, 1, 0, 0)
        }

        const imageData = canvas.toDataURL("image/png")
        setImageUrl(imageData)

        const shape = analyzeFaceShape(detections[0].landmarks)
        onFaceShapeDetected(shape, imageData)
      }
    } catch (error) {
      console.error("Error detecting face shape:", error)
      setLoadingError("Error during face detection. Please try again.")
      onError("Error during face detection. Please try again.")
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
      img.crossOrigin = "anonymous"
      img.src = imageUrl

      img.onload = async () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext("2d")
        if (!context) return

        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0, img.width, img.height)

        if (!faceapi.nets.ssdMobilenetv1.isLoaded || !faceapi.nets.faceLandmark68Net.isLoaded) {
          throw new Error("Face detection models not loaded properly")
        }

        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks()

        if (detections.length === 0) {
          setLoadingError("No face detected in the image. Please upload a clear photo of a face.")
          setIsProcessing(false)
          return
        }

        const shape = analyzeFaceShape(detections[0].landmarks)
        onFaceShapeDetected(shape, imageUrl)
        setIsProcessing(false)
      }
    } catch (error) {
      console.error("Error processing uploaded image:", error)
      setLoadingError("Error processing the image. Please try a different photo.")
      onError("Error processing the image. Please try a different photo.")
      setIsProcessing(false)
    }
  }

  const retryModelLoading = () => {
    setLoadingError(null)
    setIsModelLoaded(false)
    loadModels()
  }

  const retryWebcam = async () => {
    setLoadingError(null)
    setWebcamStarted(false)
    
    // Wait a moment to ensure state is cleared
    setTimeout(() => {
      setWebcamStarted(true)
    }, 100)
  }

  const resetUpload = () => {
    setImageUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full border-0 shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Camera className="w-8 h-8" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Face Shape Analysis</CardTitle>
        <CardDescription className="text-blue-100 text-center text-lg">
          Advanced AI technology for accurate face shape detection with live webcam support
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {loadingError && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{loadingError}</AlertDescription>
            <div className="mt-3 flex gap-2">
              {loadingError.includes("Failed to load face detection models") && (
                <Button onClick={retryModelLoading} variant="outline" size="sm">
                  Retry Loading Models
                </Button>
              )}
              {(loadingError.includes("webcam") || loadingError.includes("camera") || loadingError.includes("Camera")) && (
                <Button onClick={retryWebcam} variant="outline" size="sm">
                  Retry Webcam
                </Button>
              )}
            </div>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 rounded-lg h-12 p-1">
            <TabsTrigger value="webcam" className="rounded-md py-2 px-3 text-sm flex items-center justify-center min-w-0">
              <Camera className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span className="truncate">Webcam</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-md py-2 px-3 text-sm flex items-center justify-center min-w-0">
              <Upload className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span className="truncate">Upload</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="webcam" className="mt-4">
            <div 
              className={`relative aspect-video bg-muted rounded-xl overflow-hidden shadow-sm ${
                !webcamStarted && isModelLoaded ? 'cursor-pointer hover:bg-muted/80 transition-colors' : ''
              }`}
              onClick={handleWebcamClick}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`w-full h-full object-cover ${isMirrored ? "scale-x-[-1]" : ""} ${webcamStarted ? '' : 'hidden'}`}
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

              {!webcamStarted && isModelLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Play className="h-10 w-10 text-primary ml-1" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-1">Click to Start Webcam</p>
                      <p className="text-sm text-muted-foreground">Position your face in the center for best results</p>
                    </div>
                  </div>
                </div>
              )}

              {webcamStarted && webcamError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-50/90 dark:bg-red-950/90 backdrop-blur-sm">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-1 text-red-800 dark:text-red-200">Webcam Error</p>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-4">Unable to access camera</p>
                      <Button onClick={retryWebcam} size="sm" variant="outline" className="border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-950">
                        Try Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={detectFaceShape}
                className="flex-1 rounded-full py-6"
                disabled={!isModelLoaded || isProcessing || !webcamStarted}
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
              {webcamStarted && (
                <>
                  <Button
                    onClick={() => setIsMirrored(!isMirrored)}
                    variant="outline"
                    className="px-4 rounded-full"
                    title={isMirrored ? "Show non-mirrored view" : "Show mirrored view"}
                  >
                    {isMirrored ? "Mirror: On" : "Mirror: Off"}
                  </Button>
                  <Button
                    onClick={() => { stopWebcam(); setWebcamStarted(false) }}
                    variant="outline"
                    className="px-4 rounded-full"
                    title="Stop webcam"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div 
              className={`relative aspect-video bg-muted rounded-xl overflow-hidden shadow-sm ${
                !imageUrl ? 'cursor-pointer hover:bg-muted/80 transition-colors group' : ''
              }`}
              onClick={!imageUrl ? handleUploadClick : undefined}
            >
              {imageUrl && activeTab === "upload" ? (
                <img
                  src={imageUrl}
                  alt="Uploaded face"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-1">Click to Upload Photo</p>
                      <p className="text-sm text-muted-foreground">Choose a clear front-facing photo</p>
                    </div>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
            </div>

            <div className="flex gap-3 mt-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={handleUploadClick}
                variant="outline"
                className="flex-1 rounded-full py-6"
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
                    {imageUrl ? 'Change Image' : 'Upload Image'}
                  </>
                )}
              </Button>
              {imageUrl && (
                <Button
                  onClick={resetUpload}
                  variant="outline"
                  className="px-4 rounded-full"
                  title="Clear image"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
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
  )
}
