import { useEffect, useRef } from 'react'

/**
 * Accessibility announcer component for screen readers
 * Provides live region announcements for dynamic content changes
 */
export const A11yAnnouncer = () => {
  const announcerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create custom event listener for announcements
    const handleAnnounce = (event: CustomEvent<string>) => {
      if (announcerRef.current) {
        announcerRef.current.textContent = event.detail
        // Clear after announcement is read
        setTimeout(() => {
          if (announcerRef.current) {
            announcerRef.current.textContent = ''
          }
        }, 1000)
      }
    }

    window.addEventListener('a11y-announce', handleAnnounce as EventListener)

    return () => {
      window.removeEventListener('a11y-announce', handleAnnounce as EventListener)
    }
  }, [])

  return (
    <div
      ref={announcerRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  )
}

