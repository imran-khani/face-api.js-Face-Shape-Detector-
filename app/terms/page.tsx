import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"
import { FileText, Shield, Users, AlertTriangle } from "lucide-react"

export const metadata = createMetadata({
  title: "Terms of Service - Face Shape Detector | AI Face Analysis Terms",
  description: "Read the terms of service for our Face Shape Detector. Learn about proper usage of our AI-powered facial analysis tool and face shape detection technology.",
  keywords: [
    "face shape detector terms", "AI face analysis terms", "facial analysis terms of service",
    "face shape detection terms", "AI-powered tool terms", "facial landmarks terms",
    "uploaded photo terms", "face shape analyzer terms", "online tools terms",
    "facial recognition terms", "face type detector terms", "AI algorithms terms"
  ],
  canonical: "/terms"
})

const termsHighlights = [
  {
    icon: <FileText className="w-8 h-8 text-white" />,
    title: "Fair Use Policy",
    description: "Use our Face Shape Detector responsibly for personal styling and educational purposes.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Privacy Protection",
    description: "Your uploaded photos and facial analysis data remain private and secure during face shape detection.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "User Responsibilities",
    description: "Users must provide accurate front-facing photos and use the AI-powered tool as intended.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-white" />,
    title: "Content Guidelines",
    description: "Maintain appropriate content standards when using our facial analysis technology.",
    color: "from-orange-500 to-orange-600"
  }
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Terms of Service - Face Shape Detector</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome to our AI-powered Face Shape Detector. These terms govern your use of our facial analysis technology and face shape detection services.
          </p>
        </header>

        {/* Terms Highlights */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Key Terms & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {termsHighlights.map((item, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 rounded-xl">
                <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Terms Content */}
        <div className="prose prose-gray max-w-none space-y-8">
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Agreement to Use Face Shape Detection Services</h2>
            <p className="leading-relaxed">
              By using our Face Shape Detector, Face Shape Analyzer, and related AI-powered tools for facial analysis, you agree to these terms of service. Our advanced AI technology helps you detect face shape, analyze facial landmarks, and receive personalized style recommendations for different face shapes including oval face shape, round face shape, square face shape, heart-shaped face, diamond-shaped face, and oblong face shape types.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptable Use of Face Shape Detection Technology</h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-3">Permitted Uses</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li><strong>Personal Styling:</strong> Use our Face Shape Analyzer to discover your unique facial structure and get the best hairstyle recommendations</li>
                <li><strong>Educational Purposes:</strong> Learn about facial analysis, facial proportions, and different face shapes through our comprehensive guide</li>
                <li><strong>Style Research:</strong> Explore makeup techniques, beard styles, and style recommendations based on your face type</li>
                <li><strong>Photo Analysis:</strong> Upload front-facing photos for accurate face shape detection and facial landmarks analysis</li>
                <li><strong>Personal Development:</strong> Use face shape results to enhance your personal style and discover your perfect look</li>
              </ul>
              
              <h3 className="font-semibold mb-3">Prohibited Uses</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Using the AI-powered tool for commercial purposes without explicit permission</li>
                <li>Uploading photos of other people without their consent for facial analysis</li>
                <li>Attempting to reverse engineer our AI algorithms or facial recognition technology</li>
                <li>Using our Face Shape Detector Tools for discriminatory or harmful purposes</li>
                <li>Submitting inappropriate, offensive, or illegal content for face shape detection</li>
                <li>Overloading our online tools with excessive automated requests</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Facial Analysis Technology Terms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Technology Accuracy & Limitations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Our advanced AI technology provides accurate results for face shape detection by analyzing facial landmarks, face length, forehead width, cheekbone width, and jawline width. However, facial analysis results may vary based on photo quality, lighting conditions, and individual facial characteristics.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• AI algorithms continuously improve but are not 100% perfect</li>
                  <li>• Face shape results are guidance, not absolute determinations</li>
                  <li>• Unique facial structures may not fit standard categories</li>
                  <li>• Style recommendations are suggestions based on common patterns</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl p-6">
                <h3 className="font-semibold mb-3">User Photo Requirements</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  To get the best results from our Face Shape Detector, users should upload clear front-facing photos that show their complete facial structure. The AI-powered tool analyzes the widest part of the face, prominent cheekbones, jawline characteristics, and overall facial proportions.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Use well-lit, clear front-facing photos</li>
                  <li>• Ensure hair is pulled back to show forehead width</li>
                  <li>• Avoid heavy shadows or extreme angles</li>
                  <li>• Submit only photos you have rights to use</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property & Face Shape Detection Technology</h2>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <p className="leading-relaxed mb-4">
                Our Face Shape Analyzer, AI algorithms, facial recognition technology, and all related intellectual property remain the exclusive property of Face Shape Detector. Users may not copy, modify, distribute, or create derivative works based on our advanced AI technology, facial analysis methods, or proprietary algorithms for face shape detection.
              </p>
              <h3 className="font-semibold mb-2">Protected Technology Includes:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>AI-powered facial landmarks detection algorithms</li>
                <li>Face shape classification and analysis methods</li>
                <li>Style recommendation engine and databases</li>
                <li>User interface design and user experience elements</li>
                <li>Proprietary facial analysis and measurement techniques</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Privacy & Data Handling in Face Shape Analysis</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Your privacy is protected when using our Face Shape Detector. All uploaded photos and facial analysis data are processed locally in your browser using advanced AI technology. We do not store your personal data, face shape results, or facial landmarks information permanently. For complete details about how we protect your privacy during face shape detection, please review our Privacy Policy.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Data Processing Summary:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Uploaded photos processed locally without server transmission</li>
                  <li>Facial analysis results generated instantly on your device</li>
                  <li>No permanent storage of personal data or facial characteristics</li>
                  <li>AI algorithms analyze facial proportions without data retention</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Style Recommendations & Virtual Try-On Disclaimer</h2>
            <p className="leading-relaxed">
              Our Face Shape Detector provides style recommendations, best hairstyle suggestions, makeup techniques, and styling advice based on your detected face type. These recommendations are general guidelines derived from common styling practices for different face shapes. Individual results may vary, and our suggestions should be considered as starting points for your personal style journey rather than definitive styling rules.
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h3 className="font-semibold mb-2">Style Guidance Includes:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                  <li>Hairstyle recommendations for your face shape</li>
                  <li>Makeup techniques that enhance natural features</li>
                  <li>Beard styles suitable for your jawline structure</li>
                  <li>Accessory suggestions based on facial proportions</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Latest trends adapted to your unique features</li>
                  <li>Color recommendations for your face type</li>
                  <li>Contouring techniques for your facial structure</li>
                  <li>General styling tips for enhanced appearance</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Availability & Technical Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Service Availability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We strive to provide continuous access to our Face Shape Analyzer and related online tools. However, we may temporarily suspend or limit access for maintenance, updates to our AI algorithms, or technical improvements to our facial analysis technology.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Service may be temporarily unavailable for maintenance</li>
                  <li>• AI algorithm updates may temporarily affect performance</li>
                  <li>• We reserve the right to modify features and functionality</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Technical Requirements</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Our AI-powered Face Shape Detector requires a modern web browser with JavaScript enabled to function properly. The facial analysis technology works best with current browser versions that support advanced web standards and local processing capabilities.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Modern web browser with JavaScript support</li>
                  <li>• Stable internet connection for initial loading</li>
                  <li>• Camera access for webcam-based face detection</li>
                  <li>• File upload capability for photo analysis</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability for Face Shape Analysis</h2>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <p className="leading-relaxed mb-4">
                Our Face Shape Detector and facial analysis services are provided "as is" for informational and entertainment purposes. While our advanced AI technology strives for accurate results in face shape detection, we cannot guarantee perfect accuracy for all users or facial structures. Users should use our face shape results and style recommendations as guidance rather than definitive determinations.
              </p>
              <h3 className="font-semibold mb-2">Important Disclaimers:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Face shape detection results may vary based on photo quality and individual features</li>
                <li>Style recommendations are general suggestions, not professional styling advice</li>
                <li>We are not liable for styling decisions made based on our AI analysis</li>
                <li>Users should consult professional stylists for personalized advice</li>
                <li>Our AI algorithms are continuously improving but may have limitations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Updates to Terms of Service</h2>
            <p className="leading-relaxed">
              We may update these terms of service to reflect changes in our Face Shape Detection technology, legal requirements, or service offerings. Any significant changes will be communicated through our platform, and continued use of our AI-powered facial analysis tools constitutes acceptance of updated terms. We encourage users to review these terms periodically to stay informed about their rights and responsibilities when using our Face Shape Analyzer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information & Support</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-6">
              <p className="leading-relaxed mb-4">
                If you have questions about these terms of service, need clarification about acceptable use of our Face Shape Detector, or require support with our AI-powered facial analysis technology, please contact us through our main platform. We're committed to providing excellent support for all users of our face shape detection services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Try Face Shape Detector
                </Link>
                <Link 
                  href="/privacy" 
                  className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary bg-background shadow transition-colors hover:bg-primary/5"
                >
                  Read Privacy Policy
                </Link>
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary bg-background shadow transition-colors hover:bg-primary/5"
                >
                  Learn More About Our Technology
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
