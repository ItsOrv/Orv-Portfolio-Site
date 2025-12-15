import { useEffect, useRef } from 'react'

/**
 * Custom hook to prevent mobile overscroll and bounce effects
 */
export const useMobileOverscroll = (isMobile: boolean) => {
  const lastTouchYRef = useRef<number>(0)

  useEffect(() => {
    if (!isMobile) return

    // Prevent pull-to-refresh
    document.body.style.overscrollBehaviorY = 'contain'
    
    // Prevent overscroll bounce
    const preventOverscroll = (e: TouchEvent) => {
      const target = e.target as Element
      const scrollableParent = target.closest('[data-scrollable]') || document.body
      
      if (scrollableParent === document.body) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        const clientHeight = document.documentElement.clientHeight || window.innerHeight
        const currentTouchY = e.touches[0]?.clientY || 0
        
        // Prevent overscroll at top (scrolling up when already at top)
        if (scrollTop <= 0 && currentTouchY > lastTouchYRef.current) {
          e.preventDefault()
        }
        
        // Prevent overscroll at bottom (scrolling down when already at bottom)
        if (scrollTop + clientHeight >= scrollHeight && currentTouchY < lastTouchYRef.current) {
          e.preventDefault()
        }
        
        lastTouchYRef.current = currentTouchY
      }
    }
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        lastTouchYRef.current = e.touches[0].clientY
      }
      preventOverscroll(e)
    }
    
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', preventOverscroll, { passive: false })
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', preventOverscroll)
      document.body.style.overscrollBehaviorY = ''
    }
  }, [isMobile])
}

