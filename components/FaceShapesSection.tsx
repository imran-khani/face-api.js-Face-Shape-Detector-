import Link from "next/link"

export function FaceShapesSection() {
  const faceShapes = [
    { 
      name: "Oval", 
      emoji: "🥚", 
      desc: "Balanced proportions with face length 1.5 times the width",
      details: "Gently curved jawline with no sharp angles. Considered the ideal face shape."
    },
    { 
      name: "Round", 
      emoji: "⭕", 
      desc: "Equal width and length with soft, curved features",
      details: "Widest at the cheeks with a rounded jawline. Soft, feminine appearance."
    },
    { 
      name: "Square", 
      emoji: "⬜", 
      desc: "Strong, angular jawline with equal measurements",
      details: "Bold, structured appearance with equal forehead, cheek, and jaw width."
    },
    { 
      name: "Heart", 
      emoji: "❤️", 
      desc: "Wider forehead tapering to a pointed chin",
      details: "Prominent cheekbones with delicate jawline. Often called inverted triangle."
    },
    { 
      name: "Diamond", 
      emoji: "💎", 
      desc: "Narrow forehead and chin with prominent cheekbones",
      details: "High cheekbones are the key feature. Considered the rarest face shape."
    },
    { 
      name: "Oblong", 
      emoji: "📏", 
      desc: "Longer than wide with straight sides",
      details: "Forehead, cheeks, and jawline approximately equal in width. Rectangular shape."
    }
  ]

  return (
    <section id="face-shapes" className="py-16 bg-gray-50 dark:bg-gray-900 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Know Your Face Shape - The Six Most Common Face Shapes</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the characteristics of each face shape and find personalized styling recommendations
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faceShapes.map((shape) => (
          <Link key={shape.name} href={`/face-shapes/${shape.name.toLowerCase()}`} 
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-4">{shape.emoji}</div>
              <h3 className="font-semibold mb-3 group-hover:text-blue-600 transition-colors text-lg">{shape.name} Face Shape</h3>
              <p className="text-sm text-muted-foreground mb-2 font-medium">{shape.desc}</p>
              <p className="text-xs text-muted-foreground">{shape.details}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}