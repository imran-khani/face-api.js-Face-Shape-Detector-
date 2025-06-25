import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Zap, Shield, BookOpen, Camera, Brain, Users, Award } from "lucide-react"

export const metadata = createMetadata({
  title: "About Face Shape Detector | Advanced AI Face Analysis Tool",
  description: "Learn about our AI-powered face shape detector that analyzes facial landmarks to identify oval, round, square, heart, diamond, and oblong face shapes with accurate results and personalized style recommendations.",
  keywords: [
    "face shape detector", "about face shape analyzer", "AI face analysis", "facial landmarks detection",
    "face shape detection technology", "oval face shape", "round face shape", "square face shape",
    "heart-shaped face", "diamond-shaped face", "oblong face shape", "facial analysis tool",
    "advanced AI technology", "face shape finder", "facial proportions analysis", "AI algorithms",
    "face type detector", "facial recognition", "cheekbone width analysis", "jawline width measurement",
    "forehead width detection", "face length analysis", "accurate results", "best features detection"
  ],
  canonical: "/about"
})

const features = [
  {
    icon: <Brain className="w-8 h-8 text-white" />,
    title: "Advanced AI Technology",
    description: "Our Face Shape Detector uses cutting-edge AI algorithms and facial recognition technology to analyze facial landmarks with precision. The advanced AI examines face length, forehead width, cheekbone width, and jawline width to deliver accurate results for face shape detection.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Camera className="w-8 h-8 text-white" />,
    title: "Comprehensive Facial Analysis",
    description: "Upload your front-facing photo for complete facial analysis that identifies the widest part of the face, measures facial proportions, and detects unique features. Our AI-powered tool analyzes your unique facial structure to determine your face type with professional accuracy.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Check className="w-8 h-8 text-white" />,
    title: "All Face Shape Types Covered",
    description: "Detect face shape across all common face shapes including oval face shape, round face shape, square face shape, heart-shaped face, diamond-shaped face, and oblong face shape (Rectangle Face). Each face type receives specialized style recommendations.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <BookOpen className="w-8 h-8 text-white" />,
    title: "Personalized Style Recommendations",
    description: "Get the best hairstyle suggestions, makeup techniques, and beard styles tailored to your unique face shape. Our comprehensive guide provides style recommendations that enhance your best features and complement your natural beauty.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Privacy & Security First",
    description: "Your personal data and uploaded photos are protected with advanced security measures. Our online tools prioritize privacy while delivering accurate face shape results without storing your facial analysis data permanently.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Instant Results & Analysis",
    description: "Get face shape results instantly with our fast Face Shape Analyzer. No waiting time - upload your photo and receive immediate facial analysis with detailed insights about your facial landmarks and proportional measurements.",
    color: "from-cyan-500 to-cyan-600"
  }
]

const statistics = [
  { number: "10,000+", label: "Users Analyzed", description: "Happy users who discovered their face shape" },
  { number: "95%", label: "Accuracy Rate", description: "Precise facial landmark detection" },
  { number: "6", label: "Face Types", description: "Complete coverage of all face shapes" },
  { number: "24/7", label: "Available", description: "Access anytime, anywhere" }
]

const teamValues = [
  {
    icon: <Award className="w-6 h-6 text-blue-600" />,
    title: "Accuracy & Precision",
    description: "We use advanced AI algorithms to ensure the most accurate face shape detection results, analyzing facial proportions with scientific precision."
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: "User-Centric Design",
    description: "Our Face Shape Detector Tools are designed with user experience in mind, making facial analysis accessible to everyone regardless of technical expertise."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Privacy Protection",
    description: "We prioritize your personal data security and ensure that your uploaded photos and facial analysis results remain private and secure."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About Our AI-Powered Face Shape Detector</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We created the most advanced Face Shape Analyzer to help people discover their unique facial structure and find their perfect look. Our AI-powered tool uses sophisticated facial analysis technology to identify different face shapes and provide personalized style recommendations for optimal beauty enhancement.
          </p>
        </header>

        {/* Mission Statement */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission: Perfect Face Shape Detection for Everyone</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our mission is to democratize professional-level facial analysis through advanced AI technology. We believe everyone deserves to understand their unique features and discover styling techniques that enhance their natural beauty. Our Face Shape Detector provides accurate results that help users make confident decisions about their personal style, from choosing the best hairstyle to applying makeup techniques that highlight their best features.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Face Shape Detection Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Deep Dive */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Advanced Facial Analysis Technology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">How Our AI Analyzes Your Face Shape</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our Face Shape Analyzer uses sophisticated AI algorithms to examine your uploaded photo and detect facial landmarks with remarkable precision. The system analyzes key measurements including face length, forehead width, cheekbone width, and jawline width to determine your unique facial structure.
                  </p>
                  <p>
                    The facial analysis process identifies the widest part of the face, measures facial proportions, and examines features like prominent cheekbones, angular jawline, rounded jawline, and the width of your forehead. This comprehensive analysis ensures accurate face shape detection across all face types.
                  </p>
                  <p>
                    Whether you have an oval face shape with balanced proportions, a round face shape with equal width and length, a square face shape with a strong jawline, a heart-shaped face with a wider forehead, a diamond-shaped face with high cheekbones, or an oblong face shape (Rectangle Face) with greater length than width, our AI provides precise identification.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Style Recommendations</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Beyond face shape detection, our platform provides personalized style suggestions based on your unique facial features. Get recommendations for the best hairstyle that complements your face type, makeup techniques that enhance your natural features, and beard styles that work with your jawline structure.
                  </p>
                  <p>
                    Our comprehensive guide covers styling approaches for different face shapes, helping you understand how to highlight your best features while adapting the latest trends to your unique face shape. From choosing accessories to contouring techniques, we provide expert advice for your personal style journey.
                  </p>
                  <p>
                    The system also offers Virtual Try-On integration possibilities and style recommendations that consider your overall facial harmony. Whether you want to experiment with new looks or enhance your current style, our Face Shape Detector Tools provide the foundation for confident beauty decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Trusted by Thousands Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamValues.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-full flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Face Shape Guide Section */}
        <section className="mb-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 rounded-3xl p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Understanding Different Face Shapes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Common Face Shapes We Detect</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Oval Face Shape:</strong> Balanced proportions with face length 1.5x the width</li>
                  <li><strong>Round Face Shape:</strong> Equal width and length with soft, curved features</li>
                  <li><strong>Square Face Shape:</strong> Strong jawline with equal forehead and jaw width</li>
                  <li><strong>Heart Face:</strong> Wider forehead narrowing to a pointed chin</li>
                  <li><strong>Diamond Face Shape:</strong> Widest at cheekbones with narrow forehead and chin</li>
                  <li><strong>Rectangle Face:</strong> Length greater than width with straight lines</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Advanced Facial Features Analysis</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Facial Landmarks:</strong> Precise detection of key facial points</li>
                  <li>• <strong>Proportional Analysis:</strong> Mathematical relationships between features</li>
                  <li>• <strong>Jawline Assessment:</strong> Angular vs rounded jawline identification</li>
                  <li>• <strong>Cheekbone Analysis:</strong> High cheekbones and prominence measurement</li>
                  <li>• <strong>Forehead Evaluation:</strong> Broad forehead vs narrow forehead classification</li>
                  <li>• <strong>Overall Harmony:</strong> How features work together for your perfect look</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">How to Get the Best Results</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                <h3 className="font-semibold mb-2">Upload Photo</h3>
                <p className="text-sm text-muted-foreground">Use a clear front-facing photo with good lighting. Pull back hair to show your complete facial structure including forehead width and jawline.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Our advanced AI analyzes facial landmarks, measures proportions, and identifies your unique face shape with professional accuracy.</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
                <h3 className="font-semibold mb-2">Get Recommendations</h3>
                <p className="text-sm text-muted-foreground">Receive personalized style suggestions including the right hairstyle, makeup techniques, and styling tips for your face type.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Face Shape?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Try our advanced Face Shape Detector and unlock personalized style recommendations. Upload your photo to get accurate results and discover the best hairstyle, makeup techniques, and styling approaches for your unique facial structure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 hover:shadow-xl"
            >
              Try Face Shape Detector
            </Link>
            <Link 
              href="/face-shapes" 
              className="inline-flex items-center justify-center rounded-md border border-primary px-8 py-4 text-lg font-medium text-primary bg-background shadow-lg transition-colors hover:bg-primary/5 hover:shadow-xl"
            >
              Browse Face Shape Guide
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
