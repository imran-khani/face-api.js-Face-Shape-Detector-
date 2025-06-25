"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

export function UserReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      rating: 5,
      text: "Finally found out I have a heart-shaped face! The hairstyle recommendations were perfect and I love my new look.",
      author: "Sarah M.",
      avatar: "S",
      location: "New York",
      verified: true
    },
    {
      rating: 5,
      text: "So much more accurate than trying to measure myself. Great styling tips too! This tool is amazing.",
      author: "Jessica L.",
      avatar: "J",
      location: "California",
      verified: true
    },
    {
      rating: 5,
      text: "This tool saved me from another bad haircut. Love my new square face shape-specific style!",
      author: "Mike T.",
      avatar: "M",
      location: "Texas",
      verified: true
    },
    {
      rating: 5,
      text: "The AI detection was incredibly accurate. I finally understand why certain makeup techniques work better for me!",
      author: "Emma R.",
      avatar: "E",
      location: "London",
      verified: true
    },
    {
      rating: 5,
      text: "Love how private and secure this is. Got my results instantly without any signup hassles.",
      author: "David K.",
      avatar: "D",
      location: "Canada",
      verified: true
    },
    {
      rating: 5,
      text: "Changed my entire approach to styling. The personalized recommendations are spot on!",
      author: "Lisa P.",
      avatar: "L",
      location: "Australia",
      verified: true
    }
  ]

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(reviews.length / 3))
    }, 4000)
    return () => clearInterval(interval)
  }, [reviews.length])

  const getVisibleReviews = () => {
    const start = currentIndex * 3
    return reviews.slice(start, start + 3)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've transformed their style with accurate face shape detection
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {renderStars(5)}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Flowing Reviews Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
            {getVisibleReviews().map((review, index) => (
              <Card 
                key={`${currentIndex}-${index}`}
                className="group relative border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-6 rounded-2xl overflow-hidden"
              >
                {/* Floating Quote Icon */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>
                
                {/* Review Text */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{review.text}"
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {review.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {review.author}
                      </span>
                      {review.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{review.location}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(reviews.length / 3) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-4 opacity-30">
          <div className="text-6xl">💄</div>
        </div>
        <div className="absolute bottom-20 right-4 opacity-30">
          <div className="text-6xl">✨</div>
        </div>
        <div className="absolute top-1/2 left-8 opacity-20">
          <div className="text-4xl">💇‍♀️</div>
        </div>
      </div>
    </section>
  )
}
