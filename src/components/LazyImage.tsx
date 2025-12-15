import { useState, useRef, useEffect, memo } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onError?: () => void
}

/**
 * Lazy-loaded image component with intersection observer
 * Improves performance by loading images only when visible
 */
export const LazyImage = memo<LazyImageProps>(({
  src,
  alt,
  className = '',
  placeholder,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image()
            img.src = src
            img.onload = () => {
              setImageSrc(src)
              setIsLoaded(true)
            }
            img.onerror = () => {
              setHasError(true)
              onError?.()
            }
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before image is visible
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [src, onError])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-800/50 animate-pulse" aria-hidden="true" />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
          <span className="text-slate-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
})

LazyImage.displayName = 'LazyImage'

