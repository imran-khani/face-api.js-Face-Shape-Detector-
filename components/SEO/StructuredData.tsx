import Script from 'next/script'

interface StructuredDataProps {
  schema: Record<string, any> | Record<string, any>[]
}

export function StructuredData({ schema }: StructuredDataProps) {
  const schemaString = JSON.stringify(Array.isArray(schema) ? schema : [schema])
  
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaString }}
    />
  )
}

interface JsonLdProps {
  data: Record<string, any>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
