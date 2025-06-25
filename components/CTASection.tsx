import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Perfect Face Shape?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands who've transformed their style with accurate face shape detection. Upload your photo above for instant results and personalized recommendations.
        </p>
        
        <div className="space-y-4 mb-8">
          <Button asChild size="lg" className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="#detector">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Your Photo Now - It's Free!
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
          <span>✓ No registration required</span>
          <span>✓ Completely free</span>
          <span>✓ Instant results</span>
          <span>✓ 100% private</span>
        </div>
      </div>
    </section>
  )
}