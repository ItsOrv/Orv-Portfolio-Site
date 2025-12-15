/**
 * Centralized error handling utility
 * Provides consistent error logging and user feedback
 */

export interface ErrorInfo {
  message: string
  code?: string
  context?: Record<string, unknown>
  severity?: 'low' | 'medium' | 'high' | 'critical'
}

class ErrorHandler {
  private isDevelopment = import.meta.env.DEV

  /**
   * Log error with context
   */
  logError(error: Error | string, context?: Record<string, unknown>) {
    const errorInfo: ErrorInfo = {
      message: error instanceof Error ? error.message : error,
      context,
      severity: 'medium',
    }

    if (this.isDevelopment) {
      console.error('Error:', errorInfo)
    } else {
      // In production, send to error tracking service
      // Example: Sentry.captureException(error, { extra: context })
      console.error('An error occurred. Please try again.')
    }

    return errorInfo
  }

  /**
   * Handle async errors
   */
  async handleAsyncError<T>(
    promise: Promise<T>,
    fallback?: T,
    context?: Record<string, unknown>
  ): Promise<T | undefined> {
    try {
      return await promise
    } catch (error) {
      this.logError(
        error instanceof Error ? error : new Error(String(error)),
        context
      )
      return fallback
    }
  }

  /**
   * Create user-friendly error message
   */
  getUserMessage(error: Error | string): string {
    if (error instanceof Error) {
      // Map technical errors to user-friendly messages
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Network error. Please check your connection and try again.'
      }
      if (error.message.includes('timeout')) {
        return 'Request timed out. Please try again.'
      }
      return 'Something went wrong. Please try again.'
    }
    return String(error)
  }
}

export const errorHandler = new ErrorHandler()

