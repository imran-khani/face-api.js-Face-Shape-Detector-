import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"
import { Mail, MessageCircle, HelpCircle, Settings, Users, Lightbulb } from "lucide-react"

export const metadata = createMetadata({
  title: "Contact Us - Face Shape Detector | AI Face Analysis Support",
  description: "Contact our Face Shape Detector team for support with AI-powered facial analysis, face shape detection technology, and styling recommendations. Get help with our advanced face shape analyzer.",
  keywords: [
    "face shape detector contact", "AI face analysis support", "facial analysis help",
    "face shape detection support", "contact face shape analyzer", "AI-powered tool support",
    "facial landmarks help", "face shape results support", "face type detector contact",
    "facial recognition support", "face shape finder help", "online tools support"
  ],
  canonical: "/contact"
})

const contactReasons = [
  {
    icon: <HelpCircle className="w-8 h-8 text-white" />,
    title: "Face Shape Detection Support",
    description: "Get help with using our AI-powered Face Shape Detector, uploading photos, or understanding your face shape results.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Settings className="w-8 h-8 text-white" />,
    title: "Technical Issues",
    description: "Report problems with our Face Shape Analyzer, AI algorithms, or facial analysis technology not working properly.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Style Recommendations",
    description: "Questions about hairstyle suggestions, makeup techniques, or styling advice based on your detected face shape.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    title: "Feature Suggestions",
    description: "Share ideas for improving our facial analysis technology, face shape detection accuracy, or new styling features.",
    color: "from-orange-500 to-orange-600"
  }
]

const faqTopics = [
  {
    question: "How accurate is the Face Shape Detector?",
    answer: "Our AI-powered tool provides 95%+ accuracy in face shape detection by analyzing facial landmarks, face length, forehead width, cheekbone width, and jawline width."
  },
  {
    question: "What face shapes does the analyzer detect?",
    answer: "Our Face Shape Analyzer identifies all common face shapes: oval face shape, round face shape, square face shape, heart-shaped face, diamond-shaped face, and oblong face shape."
  },
  {
    question: "Is my uploaded photo stored or shared?",
    answer: "No, your uploaded photos are processed locally in your browser using advanced AI technology. We don't store your images or personal data."
  },
  {
    question: "What photo quality works best for facial analysis?",
    answer: "Use clear front-facing photos with good lighting. Pull back hair to show your complete facial structure including forehead width and jawline for best results."
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-6xl">
        
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Our Face Shape Detection Team</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Need help with our AI-powered Face Shape Detector? Have questions about facial analysis or face shape detection? We're here to assist you with our advanced face shape analyzer technology and styling recommendations.
          </p>
        </header>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact us for support with face shape detection, technical issues with our AI algorithms, questions about facial analysis results, or suggestions for improving our Face Shape Detector Tools.
              </p>
              
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg inline-block">
                <h3 className="text-xl font-semibold mb-4">Email Support</h3>
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <a 
                    href="mailto:webunveilers@gmail.com" 
                    className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    webunveilers@gmail.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Reasons */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">What Can We Help You With?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactReasons.map((reason, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${reason.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Contact Information */}
        <section className="mb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Contact Us About Face Shape Analysis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4">Face Shape Detector Support</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our team provides comprehensive support for all aspects of face shape detection technology. Whether you need help with our AI-powered tool, have questions about facial analysis results, or want guidance on style recommendations, we're here to help.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Technical Support</h4>
                      <p className="text-sm text-muted-foreground">Issues with AI algorithms, facial landmarks detection, or Face Shape Analyzer functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Analysis Questions</h4>
                      <p className="text-sm text-muted-foreground">Understanding your face shape results, facial proportions analysis, or face type identification</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold">Style Guidance</h4>
                      <p className="text-sm text-muted-foreground">Best hairstyle recommendations, makeup techniques, and styling advice for your unique facial structure</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4">Response Time & Support Quality</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We pride ourselves on providing fast, helpful responses to all inquiries about our Face Shape Detection services. Our team includes AI technology experts and styling professionals who understand the complexities of facial analysis and personal style recommendations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <span className="font-medium">Average Response Time</span>
                    <span className="text-sm text-primary font-semibold">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <span className="font-medium">Support Availability</span>
                    <span className="text-sm text-primary font-semibold">7 days/week</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <span className="font-medium">Languages Supported</span>
                    <span className="text-sm text-primary font-semibold">English</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqTopics.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-3 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Have more questions about our AI-powered facial analysis technology?
            </p>
            <a 
              href="mailto:webunveilers@gmail.com?subject=Face Shape Detector Question"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Ask a Question
            </a>
          </div>
        </section>

        {/* When to Contact Us */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">When to Contact Our Face Shape Detection Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Before Using Our Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Questions about how our Face Shape Analyzer works, photo requirements, or what to expect from facial analysis
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl">
                <Settings className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-semibold mb-2">During Face Shape Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Technical issues with uploading photos, AI algorithms not responding, or problems with facial landmarks detection
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-xl">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">After Getting Results</h3>
                <p className="text-sm text-muted-foreground">
                  Understanding your face shape results, questions about style recommendations, or need clarification on facial analysis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topics We Can Help With */}
        <section className="mb-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950 rounded-3xl p-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Topics We Can Help You With</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Face Shape Detection & Analysis</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>How our AI algorithms analyze facial landmarks and proportions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Understanding different face shapes: oval, round, square, heart, diamond, oblong</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Accuracy of facial recognition technology and face shape results</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Best practices for uploading front-facing photos for analysis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Measuring face length, forehead width, cheekbone width, jawline width</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Style & Beauty Recommendations</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Best hairstyle recommendations for your unique facial structure</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Makeup techniques that enhance your natural features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Beard styles that complement your jawline and face type</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-rose-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Latest trends adapted to work with your face shape</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Personal style advice and achieving your perfect look</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Our Face Shape Detector?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience our advanced AI-powered facial analysis technology. Upload your photo to discover your face shape and get personalized style recommendations instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 hover:shadow-xl"
            >
              Try Face Shape Detector
            </Link>
            <a 
              href="mailto:webunveilers@gmail.com?subject=Face Shape Detector Support"
              className="inline-flex items-center justify-center rounded-md border border-primary px-8 py-4 text-lg font-medium text-primary bg-background shadow-lg transition-colors hover:bg-primary/5 hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
