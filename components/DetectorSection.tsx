import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Camera, Upload, Loader2, AlertTriangle, Info, Zap } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DetectorSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isModelLoaded: boolean
  isProcessing: boolean
  loadingError: string | null
  videoRef: React.RefObject<HTMLVideoElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  fileInputRef: React.RefObject<HTMLInputElement>
  isMirrored: boolean
  imageUrl: string | null
  detectFaceShape: () => void
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  toggleMirror: () => void
  startWebcam: () => void
  retryModelLoading: () => void
}

export function DetectorSection({
  activeTab,
  setActiveTab,
  isModelLoaded,
  isProcessing,
  loadingError,
  videoRef,
  canvasRef,
  fileInputRef,
  isMirrored,
  imageUrl,
  detectFaceShape,
  handleFileUpload,
  toggleMirror,
  startWebcam,
  retryModelLoading
}: DetectorSectionProps) {
  return (
    <section id="detector" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Face Shape Detector Tool</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred method: use your live webcam for real-time analysis or upload a photo for instant results
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Face Shape Analysis</CardTitle>
              <CardDescription className="text-blue-100 text-center text-lg">
                Advanced AI technology for accurate face shape detection
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              {loadingError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{loadingError}</AlertDescription>
                  {loadingError.includes("Failed to load face detection models") && (
                    <Button onClick={retryModelLoading} variant="outline" size="sm" className="mt-2">
                      Retry Loading Models
                    </Button>
                  )}
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl h-12">
                  <TabsTrigger value="webcam" className="rounded-lg py-3 text-base font-medium">
                    <Camera className="mr-2 h-5 w-5" />
                    Live Webcam
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="rounded-lg py-3 text-base font-medium">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Photo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="webcam" className="mt-6">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-inner border-4 border-gray-200 dark:border-gray-600">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={`w-full h-full object-cover ${isMirrored ? "scale-x-[-1]" : ""}`}
                    />
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

                    {!isModelLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4 text-center">
                          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <div>
                            <h3 className="font-semibold mb-2">Loading AI Models</h3>
                            <p className="text-sm text-muted-foreground">Preparing face detection technology...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {isModelLoaded && loadingError && loadingError.includes("webcam") && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
                          <AlertTriangle className="h-12 w-12 text-red-500" />
                          <div>
                            <h3 className="font-semibold mb-2">Camera Access Required</h3>
                            <p className="text-sm text-muted-foreground mb-4">{loadingError}</p>
                            <Button onClick={startWebcam} variant="outline">
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
                      className="flex-1 rounded-xl py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={!isModelLoaded || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Face...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-5 w-5" />
                          Detect Face Shape
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={toggleMirror}
                      variant="outline"
                      className="px-6 rounded-xl"
                      title={isMirrored ? "Disable mirror mode" : "Enable mirror mode"}
                    >
                      {isMirrored ? "Mirror: On" : "Mirror: Off"}
                    </Button>
                    <Button
                      onClick={startWebcam}
                      variant="outline"
                      className="px-6 rounded-xl"
                      title="Restart webcam"
                    >
                      Restart
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="upload" className="mt-6">
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-inner border-4 border-dashed border-gray-300 dark:border-gray-600">
                    {imageUrl && activeTab === "upload" ? (
                      <img
                        src={imageUrl}
                        alt="Uploaded face for analysis"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="font-semibold mb-2">Upload Your Photo</h3>
                          <p className="text-muted-foreground text-sm">
                            Choose a clear, front-facing photo for best results
                          </p>
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
                      className="w-full rounded-xl py-6 text-lg font-semibold border-2 border-dashed hover:border-solid transition-all"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Image...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Choose Image File
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <div className="px-8 pb-8">
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Pro Tip:</strong> For best results, ensure good lighting, face the camera directly, and keep hair away from your face
                </AlertDescription>
              </Alert>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
