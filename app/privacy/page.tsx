import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"
import { Shield, Lock, Eye, Database, Server, UserX } from "lucide-react"

export const metadata = createMetadata({
  title: "Privacy Policy - Face Shape Detector | AI Face Analysis Privacy Protection",
  description: "Learn how our Face Shape Detector protects your personal data and uploaded photos. We use advanced AI technology for facial analysis without storing your images or compromising your privacy.",
  keywords: [
    "face shape detector privacy", "AI face analysis privacy", "facial analysis data protection",
    "uploaded photo security", "personal data protection", "face shape detection privacy",
    "facial landmarks privacy", "AI algorithms privacy", "face type analyzer security",
    "facial recognition privacy", "front-facing photo security", "face shape results privacy"
  ],
  canonical: "/privacy"
})

const privacyFeatures = [
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "No Photo Storage",
    description: "Your uploaded photos are processed instantly and never stored on our servers. All facial analysis happens locally in your browser.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Lock className="w-8 h-8 text-white" />,
    title: "Local Processing",
    description: "Our AI algorithms analyze your face shape entirely within your browser using advanced AI technology without transmitting personal data.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <UserX className="w-8 h-8 text-white" />,
    title: "No Personal Data Collection",
    description: "We don't collect, store, or share any personal information, facial analysis results, or unique facial structure data.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Eye className="w-8 h-8 text-white" />,
    title: "Transparent Processing",
    description: "See exactly how our Face Shape Analyzer works with complete transparency in facial landmarks detection and face type analysis.",
    color: "from-orange-500 to-orange-600"
  }
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy - Face Shape Detector</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is our priority. Learn how our AI-powered Face Shape Detector protects your personal data while providing accurate results for facial analysis and face shape detection.
          </p>
        </header>

        {/* Privacy Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">How We Protect Your Privacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 rounded-xl">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Privacy Content */}
        <div className="prose prose-gray max-w-none space-y-8">
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters to Our Face Shape Detection Service</h2>
            <p className="leading-relaxed">
              At Face Shape Detector, we take your privacy seriously when using our AI-powered tool for facial analysis. This comprehensive privacy policy explains how we handle your personal data, uploaded photos, and face shape results when you use our advanced Face Shape Analyzer for detecting oval face shape, round face shape, square face shape, heart-shaped face, diamond-shaped face, and oblong face shape types.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data We Don't Collect from Face Shape Detection</h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <ul className="list-disc list-inside space-y-3">
                <li><strong>Uploaded Photos:</strong> We do not store your front-facing photos or any images used for facial analysis on our servers</li>
                <li><strong>Facial Analysis Results:</strong> Your face shape results, facial landmarks data, and facial proportions measurements are not saved</li>
                <li><strong>Personal Data:</strong> We do not collect names, email addresses, or any personal identification information</li>
                <li><strong>Facial Recognition Data:</strong> No biometric data, unique facial structure information, or facial landmarks are stored permanently</li>
                <li><strong>AI Analysis History:</strong> We do not maintain records of your face type detection history or previous facial analysis sessions</li>
                <li><strong>Device Information:</strong> We do not track or store device-specific data when you use our Face Shape Detector Tools</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How Our AI Face Shape Detection Technology Works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Local Browser Processing</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our Face Shape Analyzer processes your uploaded photo entirely within your browser using advanced AI algorithms. The facial analysis technology examines face length, forehead width, cheekbone width, jawline width, and other facial landmarks to detect face shape without transmitting personal data to external servers.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Instant Results Generation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When you upload your photo for face shape detection, our AI-powered tool analyzes facial proportions instantly on your device. The system identifies whether you have common face shapes like oval, round, square, heart, diamond, or rectangle face types while keeping all analysis completely private.
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h3 className="font-semibold mb-3">Step-by-Step Privacy Protection Process:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li><strong>Photo Upload:</strong> Your front-facing photo is loaded directly into your browser's memory for facial analysis</li>
                <li><strong>AI Analysis:</strong> Advanced AI technology detects facial landmarks and measures facial features locally on your device</li>
                <li><strong>Face Shape Detection:</strong> The AI algorithms determine your face type by analyzing the widest part of the face, jawline structure, and overall facial proportions</li>
                <li><strong>Results Display:</strong> Accurate results are shown instantly with style recommendations for your unique facial structure</li>
                <li><strong>Data Clearing:</strong> All analysis data and uploaded photos can be cleared immediately with no permanent storage</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Advanced AI Technology and Privacy</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Our Face Shape Detector uses sophisticated AI algorithms for facial recognition and analysis while maintaining strict privacy standards. The advanced technology can identify different face shapes including those with prominent cheekbones, strong jawline, angular jawline, rounded jawline, wider forehead, or broad forehead characteristics without compromising your personal data security.
              </p>
              <p className="leading-relaxed">
                The facial analysis process examines your unique features and natural characteristics to provide the best hairstyle recommendations, makeup techniques, and style suggestions. Whether analyzing group photos or individual portraits, our AI-powered tool maintains the same privacy standards while delivering accurate face shape results for your perfect look.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Online Tools Privacy and Security</h2>
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <h3 className="font-semibold mb-3">What We Do to Protect You:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>No Server Transmission:</strong> Your uploaded photos never leave your device during facial analysis</li>
                <li><strong>Local AI Processing:</strong> All face shape detection happens using client-side advanced AI technology</li>
                <li><strong>Immediate Data Deletion:</strong> Face shape results and facial landmarks data can be cleared instantly</li>
                <li><strong>No Third-Party Sharing:</strong> We never share your images, analysis results, or personal data with external parties</li>
                <li><strong>Privacy-First Design:</strong> Our Face Shape Detector Tools are built with privacy protection as the primary consideration</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Virtual Try-On and Style Recommendations Privacy</h2>
            <p className="leading-relaxed">
              When our system provides style recommendations, best hairstyle suggestions, or makeup techniques based on your face type analysis, this information is generated locally without storing your preferences or facial analysis data. The latest trends and style suggestions are provided based on your detected face shape without creating a personal profile or storing your unique facial structure information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics and Usage Data</h2>
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <p className="leading-relaxed">
                We may use privacy-focused analytics to understand how our Face Shape Analyzer is used and to improve our facial analysis technology. This data is completely anonymized and doesn't include any personal information, uploaded photos, face shape results, or facial landmarks data. The analytics help us enhance the accuracy of our AI algorithms and improve the user experience of our Face Shape Detector Tools.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Control</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Complete Control Over Your Data</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Clear uploaded photos and analysis results at any time</li>
                  <li>Use the Face Shape Detector without creating accounts</li>
                  <li>Access all features without providing personal information</li>
                  <li>Exit the tool at any point without data retention</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Privacy Best Practices for Users</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Use our tool on trusted devices and networks</li>
                  <li>Clear browser cache after use for additional privacy</li>
                  <li>Avoid using public computers for facial analysis</li>
                  <li>Review browser privacy settings for optimal protection</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this privacy policy to reflect changes in our Face Shape Detection technology or legal requirements. Any updates will be posted on this page with a new "Last updated" date. We encourage you to review this policy periodically to stay informed about how we protect your privacy when using our AI-powered facial analysis tools.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us About Privacy</h2>
            <p className="leading-relaxed mb-4">
              If you have questions about this privacy policy, how we handle your personal data during face shape detection, or concerns about the privacy of our AI-powered facial analysis technology, please contact us through our main page. We're committed to maintaining the highest privacy standards while providing accurate results for all common face shapes and facial analysis needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Try Face Shape Detector
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary bg-background shadow transition-colors hover:bg-primary/5"
              >
                Learn More About Our Technology
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
