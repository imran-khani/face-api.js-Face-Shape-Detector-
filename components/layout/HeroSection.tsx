import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh] lg:min-h-[75vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left pt-20 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 mb-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              95%+ Accurate AI Detection
            </div>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Discover Your
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Perfect Face Shape
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl lg:max-w-none">
              Transform your style with our <strong className="text-gray-900 dark:text-white">AI-powered face shape detector</strong>. Get personalized recommendations for hairstyles, makeup, and accessories in seconds.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 dark:border-gray-700/50">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant Results
              </div>
              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 dark:border-gray-700/50">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                100% Free
              </div>
              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200/50 dark:border-gray-700/50">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Privacy Protected
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button asChild size="lg" className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link href="#detector">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Photo & Analyze
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                <Link href="#face-shapes">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Learn About Face Shapes
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Join thousands who've transformed their style</p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-80">
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">4.8/5 Rating</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">10,000+ Users</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">No Registration</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
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
                  <div className="text-lg font-bold">Oval Face</div>
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