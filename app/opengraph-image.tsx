import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Face Shape Detector - AI-Powered Face Analysis Tool'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 30,
            }}
          >
            <div style={{ fontSize: 60, color: 'white' }}>👤</div>
          </div>
        </div>
        
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Face Shape Detector
        </div>
        
        <div
          style={{
            fontSize: 32,
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          AI-Powered Face Analysis Tool
        </div>
        
        <div
          style={{
            fontSize: 24,
            color: '#3b82f6',
            textAlign: 'center',
            marginTop: 30,
          }}
        >
          Free • Instant • Private
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
