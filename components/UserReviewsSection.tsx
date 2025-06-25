import { Card } from "@/components/ui/card"

export function UserReviewsSection() {
  const reviews = [
    {
      stars: "⭐⭐⭐⭐⭐",
      text: "Finally found out I have a heart-shaped face! The hairstyle recommendations were perfect and I love my new look.",
      author: "- Sarah M."
    },
    {
      stars: "⭐⭐⭐⭐⭐",
      text: "So much more accurate than trying to measure myself. Great styling tips too! This tool is amazing.",
      author: "- Jessica L."
    },
    {
      stars: "⭐⭐⭐⭐⭐",
      text: "This tool saved me from another bad haircut. Love my new square face shape-specific style!",
      author: "- Mike T."
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands who've transformed their style with accurate face shape detection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <Card key={index} className="border-0 shadow-lg p-6">
            <div className="text-yellow-400 text-xl mb-3">{review.stars}</div>
            <p className="text-muted-foreground mb-4 italic">
              "{review.text}"
            </p>
            <p className="font-semibold">{review.author}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}