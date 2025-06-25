import { Card } from "@/components/ui/card"
import { Zap, Shield } from "lucide-react"

export function WhyChooseUsSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "🎯 High Accurate Detection",
      description: "Advanced AI technology provides professional-level accuracy comparable to expert consultations.",
      iconBg: "bg-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "⚡ Easy to Use",
      description: "Simple upload process with instant results - no complicated measurements required.",
      iconBg: "bg-purple-600",
      iconColor: "text-purple-600"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "📚 Comprehensive Guide",
      description: "Detailed explanations of each face type with styling recommendations and tips.",
      iconBg: "bg-green-600",
      iconColor: "text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "🔒 Privacy First",
      description: "Your photos are processed instantly and never stored. Complete privacy protection guaranteed.",
      iconBg: "bg-orange-600",
      iconColor: "text-orange-600"
    }
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Our Face Shape Detector?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced technology meets user privacy for the best face shape detection experience
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg text-center p-6">
            <div className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <div className={feature.iconColor ? feature.iconColor : "text-white"}>
                {feature.icon}
              </div>
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}