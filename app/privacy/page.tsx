import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import Link from "next/link"

export const metadata = createMetadata({
  title: "Privacy Policy - Face Shape Detector",
  description: "Learn how Face Shape Detector protects your privacy. We don't store photos and process everything locally in your browser.",
  canonical: "/privacy"
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
            <p>
              At Face Shape Detector, we take your privacy seriously. This policy explains how we handle your data when you use our face shape detection tool.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data We Don't Collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>We do not store your photos on our servers</li>
              <li>We do not share your images with third parties</li>
              <li>We do not use your photos for training AI models</li>
              <li>We do not collect personal identification information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How Our Tool Works</h2>
            <p>
              Our face shape detector processes images locally in your browser using client-side JavaScript. When you upload a photo or use your webcam:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>The image is analyzed entirely within your browser</li>
              <li>No image data is transmitted to our servers</li>
              <li>Results are generated instantly on your device</li>
              <li>You can clear the results at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
            <p>
              We may use privacy-focused analytics to understand how our tool is used, but this data is anonymized and doesn't include any personal information or images.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us through our{" "}
              <Link href="/" className="text-primary hover:underline">main page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
