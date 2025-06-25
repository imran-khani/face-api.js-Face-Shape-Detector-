import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = createMetadata({
  title: "Face Shape Detector Guide: Find Your Perfect Face Type | AI Face Shape Analyzer",
  description: "Use our advanced face shape detector to discover your unique facial structure. Get accurate results for oval, round, square, heart, diamond, and oblong face shapes with personalized style recommendations.",
  keywords: [
    "face shape detector", "face shape analyzer", "oval face shape", "round face shape", 
    "square face shape", "heart face shape", "diamond face shape", "oblong face shape",
    "face shape detection", "facial analysis", "face length", "forehead width", "cheekbone width",
    "jawline width", "facial landmarks", "face shape finder", "AI face shape detector",
    "face type analyzer", "facial proportions", "face shape results", "rectangle face",
    "heart-shaped face", "diamond-shaped face", "detect face shape", "face shape tools",
    "facial structure analysis", "face width measurement", "advanced AI technology"
  ],
  canonical: "/face-shapes"
})

const faceShapes = [
  {
    name: "Oval",
    slug: "oval",
    description: "The oval face shape is characterized by balanced facial proportions where face length is approximately 1.5 times the forehead width. This face type features a gently rounded jawline and represents the most versatile facial structure for different hairstyles and makeup techniques.",
    measurements: {
      faceLength: "1.5x face width",
      foreheadWidth: "Slightly wider than jawline",
      cheekboneWidth: "Widest part of face",
      jawlineWidth: "Gently curved, narrower than cheekbones"
    },
    characteristics: [
      "Balanced facial proportions with ideal face length to width ratio", 
      "Gently curved jawline without sharp angles", 
      "Forehead width slightly larger than jaw area",
      "Natural harmony between all facial features"
    ],
    color: "from-blue-500 to-blue-600",
    styling: "Most versatile face shape - works with virtually any hairstyle, makeup technique, or personal style approach"
  },
  {
    name: "Round",
    slug: "round",
    description: "Round face shapes feature equal width and face length proportions with the widest part of the face at the cheeks. This face type is characterized by soft, curved features, full cheeks, and a rounded jawline that creates a circular facial appearance.",
    measurements: {
      faceLength: "Equal to face width",
      foreheadWidth: "Similar to cheekbone width",
      cheekboneWidth: "Widest point of face",
      jawlineWidth: "Soft, rounded with minimal angles"
    },
    characteristics: [
      "Equal face width and face length measurements", 
      "Widest part of the face located at cheek area", 
      "Soft, rounded jawline with curved features",
      "Full cheek area with minimal angular definition"
    ],
    color: "from-green-500 to-green-600",
    styling: "Best hairstyle choices add length and avoid adding width to the widest part of the face"
  },
  {
    name: "Square",
    slug: "square",
    description: "Square face shapes are defined by a strong, angular jawline with equal width measurements across the forehead, cheeks, and jaw. This face type features prominent bone structure and minimal variation in face width from top to bottom.",
    measurements: {
      faceLength: "Similar to face width",
      foreheadWidth: "Equal to jawline width",
      cheekboneWidth: "Equal width throughout",
      jawlineWidth: "Strong, angular with defined edges"
    },
    characteristics: [
      "Strong angular jawline with defined bone structure", 
      "Equal width at forehead, cheekbones, and jaw", 
      "Minimal face length variation from widest point",
      "Prominent, well-defined facial features"
    ],
    color: "from-purple-500 to-purple-600",
    styling: "Style recommendations focus on softening the angular jawline with curved, flowing elements"
  },
  {
    name: "Heart",
    slug: "heart",
    description: "Heart-shaped faces, also known as Heart Face types, feature a wider forehead that gradually narrows to a pointed chin. This unique facial structure includes prominent cheekbones and a delicate jawline, creating the characteristic heart silhouette.",
    measurements: {
      faceLength: "Longer than average",
      foreheadWidth: "Widest part of the face",
      cheekboneWidth: "Prominent, high placement",
      jawlineWidth: "Narrow, pointed chin area"
    },
    characteristics: [
      "Wider forehead creating the broadest part of face", 
      "Prominent cheekbones with high placement", 
      "Narrow, pointed chin with delicate jawline",
      "Heart-shaped silhouette from forehead to chin"
    ],
    color: "from-pink-500 to-pink-600",
    styling: "Balance the wider forehead with volume and width in the lower face area"
  },
  {
    name: "Diamond",
    slug: "diamond",
    description: "Diamond-shaped faces have their widest point at the cheekbones, with both narrow forehead width and narrow chin areas. This unique face shape features high cheekbones as the most prominent facial feature, creating a distinctive diamond silhouette.",
    measurements: {
      faceLength: "Longer than width",
      foreheadWidth: "Narrow, smaller than cheekbones",
      cheekboneWidth: "Widest part of the face",
      jawlineWidth: "Narrow, pointed chin"
    },
    characteristics: [
      "Narrow forehead width compared to cheekbone area", 
      "Cheekbone width represents the widest point of face", 
      "Narrow chin area with pointed jawline",
      "High, prominent cheekbones as dominant feature"
    ],
    color: "from-cyan-500 to-cyan-600",
    styling: "Highlight the natural beauty of high cheekbones while adding width to narrow forehead and chin areas"
  },
  {
    name: "Oblong",
    slug: "oblong",
    description: "Oblong face shapes, also called Rectangle Face types, feature face length that is significantly greater than face width. This facial structure maintains approximately equal width at the forehead, cheeks, and jawline with straight cheek lines.",
    measurements: {
      faceLength: "Significantly greater than width",
      foreheadWidth: "Equal to cheekbone width",
      cheekboneWidth: "Equal to jawline width",
      jawlineWidth: "Straight lines, minimal curves"
    },
    characteristics: [
      "Face length considerably greater than face width", 
      "Equal width measurements at forehead, cheeks, and jaw", 
      "Straight cheek lines with minimal facial curves",
      "Elongated facial proportions with consistent width"
    ],
    color: "from-orange-500 to-orange-600",
    styling: "Add width and curves to balance the face length and create more proportional appearance"
  }
]

export default function FaceShapesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Face Shape Detector Guide: Discover Your Perfect Face Type</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Use advanced AI technology to analyze your unique facial structure and discover your face shape. Our comprehensive guide covers all common face shapes including oval, round, square, heart-shaped, diamond-shaped, and oblong faces with accurate facial analysis and personalized style recommendations.
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">How Face Shape Detection Works with Advanced AI</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-6">
              <h3 className="font-semibold mb-3">AI-Powered Facial Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Face Shape Detector Tools use advanced AI algorithms to analyze your uploaded photo and detect facial landmarks. The AI-powered tool measures face length, forehead width, cheekbone width, and jawline width to provide accurate results about your unique facial structure and overall face shape.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Key Features of Modern Face Shape Analyzers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Advanced technology enables precise facial proportions analysis using facial recognition and facial landmarks detection. These Face Shape Analyzer tools work with front-facing photos to identify the widest part of the face, measure facial features, and determine your face type for personalized style suggestions.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Complete Guide to All Face Shapes</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Understanding different face shapes helps you choose the best hairstyle, makeup techniques, and personal style approaches. Use our face shape finder to discover your unique features and get expert style recommendations.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faceShapes.map((shape) => (
              <Link key={shape.slug} href={`/face-shapes/${shape.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${shape.color} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl font-bold text-white">
                          {shape.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{shape.name} Face Shape</h3>
                        <p className="text-sm text-muted-foreground">
                          {shape.styling}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{shape.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Facial Measurements:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li><strong>Face Length:</strong> {shape.measurements.faceLength}</li>
                          <li><strong>Forehead Width:</strong> {shape.measurements.foreheadWidth}</li>
                          <li><strong>Cheekbone Width:</strong> {shape.measurements.cheekboneWidth}</li>
                          <li><strong>Jawline Width:</strong> {shape.measurements.jawlineWidth}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Key Characteristics:</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {shape.characteristics.slice(0, 2).map((char, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0 mt-2"></div>
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-primary font-medium text-sm group-hover:underline">
                        Complete Styling Guide & Best Features →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Face Shape Analysis Benefits for Personal Style</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
                <h3 className="font-semibold mb-3">Best Hairstyle Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Discover the right hairstyle that enhances your best features and complements your unique facial structure. Different face shapes benefit from specific cuts that highlight natural beauty and create balanced proportions.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl">
                <h3 className="font-semibold mb-3">Makeup Techniques & Contouring</h3>
                <p className="text-sm text-muted-foreground">
                  Learn professional makeup techniques designed for your face type. Understanding your facial landmarks helps you apply contouring, highlighting, and other makeup methods that enhance your natural features.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl">
                <h3 className="font-semibold mb-3">Style Recommendations & Latest Trends</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized style suggestions for accessories, beard styles, and fashion choices. Our comprehensive guide helps you adapt the latest trends to work with your unique face shape and personal style preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 rounded-3xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Getting the Best Results from Face Shape Detection</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Photo Requirements for Accurate Results</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use a clear front-facing photo with good lighting</li>
                  <li>• Upload photo with your hair pulled back to show forehead width</li>
                  <li>• Ensure the widest part of your face is clearly visible</li>
                  <li>• Avoid shadows that obscure facial landmarks</li>
                  <li>• Keep facial expression neutral for accurate facial analysis</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Advanced Technology Features</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• AI algorithms analyze facial proportions automatically</li>
                  <li>• Facial recognition technology detects key landmarks</li>
                  <li>• Advanced AI provides face shape results instantly</li>
                  <li>• Online tools protect your personal data and privacy</li>
                  <li>• Virtual Try-On integration for style experimentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Try Our AI Face Shape Detector Tool</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover your unique face shape with our advanced Face Shape Analyzer. Upload your photo to get accurate results, detect facial landmarks, and receive personalized recommendations for your perfect look. Our AI-powered tool analyzes your facial structure to help you find the best hairstyle and makeup techniques for your face type.
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 hover:shadow-xl"
          >
            Upload Photo & Analyze Face Shape
          </Link>
        </section>
      </div>
    </div>
  )
}
