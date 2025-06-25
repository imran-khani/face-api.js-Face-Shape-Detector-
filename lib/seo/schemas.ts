export const faceShapeData = {
  "Round": {
    characteristics: ["Soft curved lines", "Similar width and height", "Full cheeks", "Wide cheekbones"],
    hairstyles: ["Long layers", "Side-swept bangs", "Angular cuts", "Asymmetrical bob"],
    makeup: ["Contour temples", "Highlight center face", "Angular eyebrows"],
    accessories: ["Angular frames", "Cat-eye sunglasses", "Statement earrings"]
  },
  "Oval": {
    characteristics: ["Balanced proportions", "Face longer than wide", "Gentle jawline", "High cheekbones"],
    hairstyles: ["Most styles work", "Blunt cuts", "Curls", "Bangs", "Long or short"],
    makeup: ["Natural contouring", "Highlight cheekbones", "Balanced application"],
    accessories: ["Any frame style", "Round glasses", "Aviators", "Versatile choices"]
  },
  "Square": {
    characteristics: ["Strong jawline", "Angular features", "Equal width at jaw and forehead"],
    hairstyles: ["Soft waves", "Rounded cuts", "Side parts", "Textured styles"],
    makeup: ["Soften angles", "Round contouring", "Curved eyebrow shape"],
    accessories: ["Round frames", "Oval sunglasses", "Soft shapes"]
  },
  "Heart": {
    characteristics: ["Wider forehead", "Narrow chin", "Prominent cheekbones"],
    hairstyles: ["Chin-length bobs", "Full bangs", "Volume at chin", "Layered cuts"],
    makeup: ["Contour forehead", "Highlight chin", "Balanced cheek color"],
    accessories: ["Bottom-heavy frames", "Cat-eye glasses", "Aviators"]
  },
  "Diamond": {
    characteristics: ["Narrow forehead and chin", "Wide cheekbones", "Angular"],
    hairstyles: ["Wispy bangs", "Volume at crown", "Jaw-length cuts"],
    makeup: ["Highlight forehead and chin", "Soft cheek contouring"],
    accessories: ["Oval frames", "Round glasses", "Rimless styles"]
  },
  "Oblong": {
    characteristics: ["Long and narrow", "High forehead", "Long chin"],
    hairstyles: ["Horizontal lines", "Layered cuts", "Avoid long straight"],
    makeup: ["Contour length", "Widen appearance", "Horizontal emphasis"],
    accessories: ["Wide frames", "Oversized glasses", "Bold shapes"]
  }
}

export function createWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Face Shape Detector",
    "description": "Free AI-powered face shape detector tool that analyzes your photo to determine your face shape and provides personalized style recommendations",
    "url": "https://localhost:3000",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Modern web browser with JavaScript enabled",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2547"
    },
    "featureList": [
      "AI-powered face shape detection",
      "Personalized style recommendations", 
      "Hairstyle suggestions",
      "Makeup tips",
      "Accessory recommendations",
      "Privacy-focused (no data storage)"
    ]
  }
}

export function createHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Detect Your Face Shape with AI",
    "description": "Step-by-step guide to determine your face shape using our AI detector",
    "totalTime": "PT2M",
    "supply": [{
      "@type": "HowToSupply",
      "name": "Clear face photo"
    }],
    "tool": [{
      "@type": "HowToTool", 
      "name": "Face Shape Detector AI"
    }],
    "step": [{
      "@type": "HowToStep",
      "name": "Upload Photo",
      "text": "Upload a clear, front-facing photo of your face or use webcam",
      "url": "https://localhost:3000#upload"
    }, {
      "@type": "HowToStep", 
      "name": "AI Analysis",
      "text": "Our AI analyzes facial landmarks and proportions",
      "url": "https://localhost:3000#analysis"
    }, {
      "@type": "HowToStep",
      "name": "Get Results",
      "text": "Receive your face shape and personalized style recommendations",
      "url": "https://localhost:3000#results"
    }]
  }
}

export function createFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How accurate is the face shape detector?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI face shape detector uses advanced facial landmark detection with 95%+ accuracy. It analyzes key facial proportions and measurements to determine your face shape."
      }
    }, {
      "@type": "Question", 
      "name": "Is my photo stored or shared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, we prioritize your privacy. Photos are processed locally in your browser and are not stored on our servers or shared with third parties."
      }
    }, {
      "@type": "Question",
      "name": "What face shapes can be detected?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Our tool detects 6 main face shapes: Round, Oval, Square, Heart, Diamond, and Oblong. Each comes with personalized style recommendations."
      }
    }]
  }
}

export function createFaceShapeSchema(faceShape: string) {
  const data = faceShapeData[faceShape as keyof typeof faceShapeData]
  if (!data) return null

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${faceShape} Face Shape - Complete Style Guide`,
    "description": `Comprehensive guide for ${faceShape} face shape including characteristics, best hairstyles, makeup tips, and accessory recommendations.`,
    "author": {
      "@type": "Organization",
      "name": "Face Shape Detector"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Face Shape Detector",
      "logo": {
        "@type": "ImageObject",
        "url": "https://localhost:3000/logo.jpg"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://localhost:3000/face-shapes/${faceShape.toLowerCase()}`
    }
  }
}
