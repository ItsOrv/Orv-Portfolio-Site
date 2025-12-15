import { useEffect } from 'react'
import { getFeaturedProjects } from '../data/projects'

/**
 * Component to safely inject structured data (JSON-LD) into the document head
 * This avoids using dangerouslySetInnerHTML in the component body
 */
export const StructuredData = () => {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Featured Projects',
      description: 'A collection of featured projects by Orv',
      itemListElement: getFeaturedProjects().map((project, index) => ({
        '@type': 'SoftwareApplication',
        position: index + 1,
        name: project.title,
        description: project.description,
        applicationCategory: project.category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        ...(project.githubUrl && { codeRepository: project.githubUrl }),
        ...(project.liveUrl && { url: project.liveUrl }),
        ...(project.technologies && project.technologies.length > 0 && { 
          programmingLanguage: project.technologies 
        })
      }))
    }

    // Create script element
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'structured-data-projects'
    script.textContent = JSON.stringify(structuredData)
    
    // Remove existing script if present
    const existingScript = document.getElementById('structured-data-projects')
    if (existingScript) {
      existingScript.remove()
    }

    // Append to head
    document.head.appendChild(script)

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById('structured-data-projects')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return null
}

