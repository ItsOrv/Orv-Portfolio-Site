import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface UseLenisScrollOptions {
  isMobile: boolean
  isLowEnd: boolean
  prefersReducedMotion: boolean
}

/**
 * Custom hook for Lenis smooth scrolling initialization
 */
export const useLenisScroll = (options: UseLenisScrollOptions) => {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const { isMobile, isLowEnd, prefersReducedMotion } = options

    // Initialize optimized smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile && !isLowEnd && !prefersReducedMotion,
      wheelMultiplier: isLowEnd ? 0.6 : 0.8,
      touchMultiplier: isLowEnd ? 1.2 : 1.5,
      ...((isMobile || isLowEnd || prefersReducedMotion) && { smooth: false }),
    })

    lenisRef.current = lenis

    let rafId: number | null = null
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    rafIdRef.current = rafId

    // Smooth navigation scrolling
    const handleNavClick = (e: Event) => {
      e.preventDefault()
      const link = e.currentTarget as HTMLAnchorElement
      const targetId = link.getAttribute('href')?.slice(1)
      if (targetId) {
        const target = document.getElementById(targetId)
        if (target) {
          lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5,
          })
        }
      }
    }

    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick)
    })

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      lenis.destroy()
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick)
      })
    }
    // Dependencies are intentionally specific properties, not the whole options object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.isMobile, options.isLowEnd, options.prefersReducedMotion])

  return lenisRef.current
}

