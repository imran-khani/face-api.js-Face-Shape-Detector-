import { Card } from "@/components/ui/card"
import { Zap, Shield, Check, BookOpen } from "lucide-react"

export function WhyChooseUsSection() {
  const features = [
    {
      icon: <Check className="w-8 h-8 text-white" strokeWidth={3} />,
      title: "🎯 High Accurate Detection",
      description: "Advanced AI technology provides professional-level accuracy comparable to expert consultations.",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "⚡ Easy to Use",
      description: "Simple upload process with instant results - no complicated measurements required.",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "📚 Comprehensive Guide",
      description: "Detailed explanations of each face type with styling recommendations and tips.",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600 shadow-lg"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "🔒 Privacy First",
      description: "Your photos are processed instantly and never stored. Complete privacy protection guaranteed.",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg"
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
          <Card key={index} className="border-0 shadow-lg text-center p-6 hover:shadow-xl transition-shadow duration-300">
            <div className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
              {feature.icon}
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}