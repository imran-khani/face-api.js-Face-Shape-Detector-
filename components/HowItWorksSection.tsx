import { Card, CardContent } from "@/components/ui/card"
import { Zap } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Image Processing",
      description: "Our advanced AI processes your uploaded photo, optimizing lighting and clarity for accurate facial analysis.",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
      iconBg: "bg-blue-600"
    },
    {
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Facial Landmark Detection",
      description: "The system identifies key facial landmarks including forehead width, cheekbone width, jawline, and face length measurements.",
      bgColor: "from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
      iconBg: "bg-purple-600"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "AI Model Analysis",
      description: "Our trained AI algorithms analyze facial proportions and compare them against established face shape categories.",
      bgColor: "from-green-50 to-green-100 dark:from-green-950 dark:to-green-900",
      iconBg: "bg-green-600"
    },
    {
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Final Results",
      description: "Receive detailed results showing your primary face shape plus percentage matches for other face types.",
      bgColor: "from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900",
      iconBg: "bg-orange-600"
    }
  ]

  return (
    <section id="how-it-works" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How Face Shape Detection Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our advanced AI technology provides professional-level accuracy comparable to expert consultations through a sophisticated 4-step process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br ${step.bgColor}`}>
            <CardContent className="pt-8 pb-6 text-center">
              <div className={`w-16 h-16 ${step.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}