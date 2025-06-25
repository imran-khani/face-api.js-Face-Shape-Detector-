import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-8 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 dark:from-gray-900/95 dark:via-gray-900/80 dark:to-gray-900/40 lg:to-transparent z-10" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/6 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-8">
          {/* Left Content - Simplified */}
          <div className="text-center lg:text-left space-y-8">
            
            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Analyze Your
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Face Shape with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transform your style with our AI-powered face shape detector. Get personalized recommendations instantly.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="#detector">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Start Face Analysis
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Image - Kept Original */}
          <div className="relative lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-2xl xl:max-w-3xl">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl transform rotate-6 scale-110" />
              
              {/* Main image container */}
              <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
                <Image
                  src="/face-shape-detector.webp"
                  alt="Face shape detection demonstration"
                  width={600}
                  height={700}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  priority
                />
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl border border-gray-200 dark:border-gray-700">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-sm font-medium">AI Detected</div>
                  <div className="text-lg font-bold">Square Face</div>
                  <div className="text-xs opacity-90">95% Confidence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
