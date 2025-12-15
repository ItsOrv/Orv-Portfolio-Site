import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseGSAPAnimationsOptions {
  isLowEnd: boolean
  prefersReducedMotion: boolean
}

/**
 * Custom hook for GSAP scroll-triggered animations
 */
export const useGSAPAnimations = (options: UseGSAPAnimationsOptions) => {
  useEffect(() => {
    const { isLowEnd, prefersReducedMotion } = options

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Optimized GSAP animations for better performance
    try {
      const sections = gsap.utils.toArray('.executive-section')
      
      if (sections && sections.length > 0) {
        sections.forEach((section, index: number) => {
          // Skip animations on low-end devices or reduced motion preference
          if (isLowEnd || prefersReducedMotion) {
            gsap.set(section as Element, { opacity: 1, y: 0, scale: 1 })
            return
          }

          try {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section as Element,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse',
                once: false,
              }
            })

            // Smooth entrance animation without jumping
            gsap.set(section as Element, { 
              opacity: 0, 
              y: 30,
              scale: 0.99,
            })

            tl.to(section as Element, { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: index * 0.03
            })
          } catch (error) {
            // Fallback: set section to visible if animation fails
            console.warn('GSAP animation failed for section:', error)
            gsap.set(section as Element, { opacity: 1, y: 0, scale: 1 })
          }
        })
      }
    } catch (error) {
      console.warn('GSAP initialization failed:', error)
    }

    return () => {
      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
    // Dependencies are intentionally specific properties, not the whole options object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.isLowEnd, options.prefersReducedMotion])
}

