import { memo } from 'react'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
}

/**
 * Reusable loading skeleton component for better UX during lazy loading
 */
export const LoadingSkeleton = memo<LoadingSkeletonProps>(({ 
  className = '', 
  lines = 3 
}) => {
  return (
    <div className={`premium-card animate-pulse ${className}`} role="status" aria-label="Loading">
      <div className="premium-card-content space-y-4">
        <div className="h-6 bg-slate-700/50 rounded w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-700/30 rounded w-full" />
            <div className="h-4 bg-slate-700/30 rounded w-5/6" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading content...</span>
    </div>
  )
})

LoadingSkeleton.displayName = 'LoadingSkeleton'

