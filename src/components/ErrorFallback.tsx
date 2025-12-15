import { memo } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
  showHomeButton?: boolean
}

/**
 * Reusable error fallback component
 * Provides consistent error UI across the application
 */
export const ErrorFallback = memo<ErrorFallbackProps>(({
  error,
  resetError,
  showHomeButton = false,
}) => {
  const handleReload = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <div className="premium-card max-w-md w-full text-center">
        <div className="premium-card-content">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" aria-hidden="true" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-200 mb-4">
            Oops! Something went wrong
          </h2>
          
          <p className="text-slate-400 mb-6">
            {error?.message || 'We encountered an unexpected error. Please try refreshing the page.'}
          </p>
          
          <div className="space-y-3">
            {resetError && (
              <button
                onClick={resetError}
                className="btn-executive w-full flex items-center justify-center gap-2"
                aria-label="Try again"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
            
            <button
              onClick={handleReload}
              className="btn-secondary-exec w-full flex items-center justify-center gap-2"
              aria-label="Refresh the page"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
            
            {showHomeButton && (
              <button
                onClick={handleGoHome}
                className="btn-secondary-exec w-full flex items-center justify-center gap-2"
                aria-label="Go to home page"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            )}
          </div>
          
          {import.meta.env.DEV && error && (
            <details className="mt-6 text-left">
              <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs text-red-400 bg-slate-900/50 p-3 rounded overflow-auto max-h-48">
                {error.toString()}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
})

ErrorFallback.displayName = 'ErrorFallback'

