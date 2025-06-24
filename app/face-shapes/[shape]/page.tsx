import { generateMetadata as createMetadata } from "@/lib/seo/metadata"
import { createFaceShapeSchema, faceShapeData } from "@/lib/seo/schemas"
import { StructuredData } from "@/components/seo/StructuredData"
import { notFound } from "next/navigation"
import Link from "next/link"

const validShapes = ['round', 'oval', 'square', 'heart', 'diamond', 'oblong']

export async function generateStaticParams() {
  return validShapes.map(shape => ({ shape }))
}

export async function generateMetadata({ params }: { params: { shape: string } }) {
  const shape = params.shape.charAt(0).toUpperCase() + params.shape.slice(1)
  
  if (!validShapes.includes(params.shape)) {
    return createMetadata({ noindex: true })
  }

  return createMetadata({
    title: `${shape} Face Shape - Complete Style Guide & Tips`,
    description: `Discover everything about ${shape} face shape: characteristics, best hairstyles, makeup tips, and accessory recommendations. Expert styling advice for ${shape} faces.`,
    keywords: [`${shape} face shape`, `${shape} hairstyles`, `${shape} makeup`, `${shape} face styling`, "face shape guide"],
    canonical: `/face-shapes/${params.shape}`,
    faceShape: shape
  })
}

export default function FaceShapePage({ params }: { params: { shape: string } }) {
  if (!validShapes.includes(params.shape)) {
    notFound()
  }

  const shapeName = params.shape.charAt(0).toUpperCase() + params.shape.slice(1)
  const data = faceShapeData[shapeName as keyof typeof faceShapeData]
  
  return (
    <>
      <StructuredData schema={createFaceShapeSchema(shapeName)} />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-12 px-4 max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{shapeName} Face Shape Complete Guide</h1>
            <p className="text-xl text-muted-foreground">
              Discover the best styling tips and recommendations for your {shapeName.toLowerCase()} face shape
            </p>
          </header>

          <div className="grid gap-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Key Characteristics</h2>
              <ul className="list-disc list-inside space-y-2">
                {data.characteristics.map((char, index) => (
                  <li key={index} className="text-muted-foreground">{char}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Best Hairstyles for {shapeName} Face</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.hairstyles.map((style, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium">{style}</h3>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Makeup Tips</h2>
              <div className="space-y-2">
                {data.makeup.map((tip, index) => (
                  <p key={index} className="text-muted-foreground">• {tip}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Recommended Accessories</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {data.accessories.map((accessory, index) => (
                  <div key={index} className="p-3 bg-muted rounded text-center">
                    {accessory}
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center pt-8 border-t">
              <h2 className="text-2xl font-semibold mb-4">Detect Your Face Shape</h2>
              <p className="text-muted-foreground mb-6">
                Not sure if you have a {shapeName.toLowerCase()} face? Use our AI-powered face shape detector to find out instantly.
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Try Face Shape Detector
              </Link>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
