import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define face shape types
type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong';

// Define the structure for face shape information
interface FaceShapeInfo {
  title: string;
  description: string;
  visualStyle: React.CSSProperties;
  recommendations: string[];
}

// Create a map of face shape data
const faceShapeData: Record<FaceShape, FaceShapeInfo> = {
  oval: {
    title: "Oval Face Shape",
    description: "Oval faces have a slightly wider forehead that narrows to a rounded chin. The cheekbones are the widest part of the face. This is considered the most versatile face shape for hairstyles and accessories.",
    visualStyle: { width: "16px", height: "20px", borderRadius: "45%" },
    recommendations: [
      "Most hairstyles work well",
      "Can wear nearly any glasses shape",
      "Balanced facial features allow for versatility"
    ]
  },
  round: {
    title: "Round Face Shape",
    description: "Round faces have curved lines with the width and length in similar proportions. The cheeks are usually full and the chin is rounded with soft features.",
    visualStyle: { width: "18px", height: "18px", borderRadius: "100%" },
    recommendations: [
      "Angular hairstyles to add definition",
      "Rectangle or square glasses to add structure",
      "Avoid round frames that emphasize roundness"
    ]
  },
  square: {
    title: "Square Face Shape",
    description: "Square faces have a strong jawline with a squared chin and forehead. The width and length of the face are in similar proportions, creating a box-like appearance.",
    visualStyle: { width: "18px", height: "18px", borderRadius: "2px" },
    recommendations: [
      "Soft, layered hairstyles to soften angles",
      "Round or oval glasses to balance strong features",
      "Side-swept bangs to add softness"
    ]
  },
  heart: {
    title: "Heart Face Shape",
    description: "Heart-shaped faces have a wider forehead that narrows down to a pointed chin. The cheekbones are often high and well-defined.",
    visualStyle: { 
      width: "18px", 
      height: "20px", 
      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" 
    },
    recommendations: [
      "Hairstyles with volume at the jaw to balance width",
      "Bottom-heavy frames or rimless glasses",
      "Styles that add width to the lower part of the face"
    ]
  },
  diamond: {
    title: "Diamond Face Shape",
    description: "Diamond faces have narrow foreheads and jawlines with wide, high cheekbones. The chin is often pointed, creating a diamond-like appearance.",
    visualStyle: { 
      width: "16px", 
      height: "20px", 
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" 
    },
    recommendations: [
      "Hairstyles with volume at the forehead and jaw",
      "Oval or rimless glasses that don't overemphasize cheekbones",
      "Side-swept bangs to add width to the forehead"
    ]
  },
  oblong: {
    title: "Oblong Face Shape",
    description: "Oblong faces are longer than they are wide with a long, straight cheek line. The forehead, cheekbones, and jawline are similar in width.",
    visualStyle: { width: "14px", height: "22px", borderRadius: "30%" },
    recommendations: [
      "Hairstyles with volume on the sides to add width",
      "Wide frames or decorative temples to add width",
      "Avoid styles that add height or elongate the face"
    ]
  }
};

export default function FaceShapeGuide() {
  return (
    <Card className="w-full border-0 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-2xl">Face Shape Guide</CardTitle>
        <CardDescription>Learn about different face shapes and their characteristics</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="oval" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-4 rounded-lg">
            {(Object.keys(faceShapeData) as FaceShape[]).map(shape => (
              <TabsTrigger key={shape} value={shape} className="rounded-md py-2">
                {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.entries(faceShapeData) as [FaceShape, FaceShapeInfo][]).map(([shape, info]) => (
            <TabsContent key={shape} value={shape} className="mt-4">
              <div className="grid gap-6">
                <div className="flex justify-center">
                  <div className="w-28 h-28 bg-primary/5 rounded-full flex items-center justify-center shadow-sm">
                    <div className="bg-primary/30" style={{
                      ...info.visualStyle,
                      width: info.visualStyle.width === "16px" ? "32px" : "36px",
                      height: info.visualStyle.height === "20px" ? "40px" : "36px"
                    }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-xl mb-2">{info.title}</h3>
                  <p className="text-muted-foreground">
                    {info.description}
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <h4 className="font-semibold mb-3 text-center">Recommended Styles</h4>
                  <ul className="space-y-2">
                    {info.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
