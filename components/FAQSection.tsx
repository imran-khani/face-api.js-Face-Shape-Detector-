"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: "How can I identify my face shape?",
      a: "Upload a clear front-facing photo to our AI detector for instant, accurate identification of your face shape. Our advanced technology analyzes facial landmarks and proportions to determine your exact face type. Simply take a well-lit photo with your hair pulled back and let our AI do the rest!"
    },
    {
      q: "How accurate is the face shape detection?",
      a: "Our AI provides 95%+ accuracy by analyzing multiple facial landmarks and proportions using advanced algorithms trained on thousands of faces. The system measures key points like jawline width, forehead dimensions, and cheekbone prominence to deliver highly accurate results comparable to professional consultations."
    },
    {
      q: "Is the face shape detector legit?",
      a: "Absolutely! Our AI uses advanced facial recognition technology trained on thousands of diverse face images for highly accurate results. It's trusted by thousands of users worldwide with consistently positive feedback. The technology is based on established facial anthropometry principles used by professional stylists."
    },
    {
      q: "What types of face shapes can this tool identify?",
      a: "We detect all six major face shapes: oval, round, square, heart, oblong, and diamond, plus subtle variations within each category. Each result comes with detailed styling recommendations, including the best hairstyles, makeup techniques, and accessory choices for your specific face shape."
    },
    {
      q: "Is there any app to identify my face shape?",
      a: "Our web-based face shape detector works seamlessly on any device - no app download required for instant analysis! It functions perfectly on smartphones, tablets, and computers with responsive design. Simply visit our website from any browser and start analyzing immediately."
    },
    {
      q: "What is the rarest face shape?",
      a: "Diamond face shapes are considered the rarest, occurring in approximately 5-10% of the population. They're characterized by narrow forehead and chin with prominent, wide cheekbones as the face's widest point. This elegant shape is often considered highly photogenic and striking."
    },
    {
      q: "Can the tool recommend hairstyles for my face shape?",
      a: "Yes! After detecting your face shape, you'll receive personalized style recommendations including the most flattering hairstyles, makeup techniques, eyewear styles, and accessory suggestions. Our recommendations are based on professional styling principles to enhance your natural features."
    },
    {
      q: "How does the face shape analyzer work?",
      a: "Our AI processes your photo through a sophisticated 4-step analysis: image processing for optimal quality, facial landmark detection to identify key points, proportion analysis using advanced algorithms, and finally comparison against our extensive face shape database to provide accurate identification and styling recommendations."
    },
    {
      q: "Is my photo stored or shared?",
      a: "No, your privacy is our top priority! Photos are processed instantly in your browser and are never stored on our servers or shared with third parties. The analysis happens in real-time, and your image data is automatically deleted after processing. We maintain complete privacy protection."
    },
    {
      q: "What if the tool doesn't detect my face?",
      a: "If face detection fails, try these tips: ensure good lighting (natural daylight works best), remove hair from your face, look directly at the camera, avoid heavy makeup or accessories, and make sure your entire face is visible in the frame. The photo should be clear and well-focused for optimal results."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Face Shape Do I Have? - People Also Ask</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get answers to the most common questions about face shape detection and analysis
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-semibold text-lg pr-8 text-gray-900 dark:text-gray-100">
                {faq.q}
              </h3>
              <div className="flex-shrink-0">
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5 pt-0">
                <div className="border-t border-gray-100 dark:border-gray-600 pt-4">
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional SEO-friendly structured data hint */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Still have questions? Our AI face shape detector is designed to be intuitive and accurate. 
          <br />
          <span className="font-medium">Try it now for instant results!</span>
        </p>
      </div>
    </section>
  )
}