// Analytics and performance monitoring utilities

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

interface PerformanceMetric {
  name: string
  value: number
  delta: number
  id: string
  navigationType: string
}

class Analytics {
  private isEnabled: boolean
  private sessionId: string

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production'
    this.sessionId = this.generateSessionId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Track custom events
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) return

    try {
      // Google Analytics 4 (if implemented)
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
        })
      }

      // Custom analytics endpoint (if you have one)
      this.sendToCustomEndpoint('event', event)
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  // Track page views
  trackPageView(page: string): void {
    if (!this.isEnabled) return

    try {
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: page,
        })
      }

      this.sendToCustomEndpoint('pageview', { page, sessionId: this.sessionId })
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }

  // Track performance metrics
  trackPerformance(metric: PerformanceMetric): void {
    if (!this.isEnabled) return

    try {
      this.sendToCustomEndpoint('performance', {
        ...metric,
        sessionId: this.sessionId,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.warn('Performance tracking failed:', error)
    }
  }

  // Track user interactions
  trackInteraction(element: string, action: string): void {
    this.trackEvent({
      action,
      category: 'interaction',
      label: element,
    })
  }

  // Track scroll depth
  trackScrollDepth(depth: number): void {
    this.trackEvent({
      action: 'scroll',
      category: 'engagement',
      label: 'scroll_depth',
      value: depth,
    })
  }

  // Track time on page
  trackTimeOnPage(timeInSeconds: number): void {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: timeInSeconds,
    })
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'form',
      label: formName,
      value: success ? 1 : 0,
    })
  }

  // Track external link clicks
  trackExternalLink(url: string): void {
    this.trackEvent({
      action: 'external_link_click',
      category: 'outbound',
      label: url,
    })
  }

  // Track download events
  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent({
      action: 'download',
      category: 'file',
      label: `${fileName}.${fileType}`,
    })
  }

  // Send data to custom analytics endpoint
  private async sendToCustomEndpoint(type: string, data: any): Promise<void> {
    try {
      // Replace with your actual analytics endpoint
      const endpoint = process.env.REACT_APP_ANALYTICS_ENDPOINT
      if (!endpoint) return

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      })
    } catch (error) {
      console.warn('Failed to send analytics data:', error)
    }
  }
}

// Performance monitoring
class PerformanceMonitor {
  private observer: PerformanceObserver | null = null
  private analytics: Analytics

  constructor(analytics: Analytics) {
    this.analytics = analytics
    this.init()
  }

  private init(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry)
        }
      })

      // Observe different types of performance entries
      this.observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input'] })
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error)
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry): void {
    const metric: PerformanceMetric = {
      name: entry.name,
      value: entry.startTime,
      delta: entry.startTime,
      id: entry.name,
      navigationType: 'navigate',
    }

    this.analytics.trackPerformance(metric)
  }

  // Track Core Web Vitals
  trackWebVitals(): void {
    if (typeof window === 'undefined') return

    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.analytics.trackPerformance({
        name: 'LCP',
        value: lastEntry.startTime,
        delta: lastEntry.startTime,
        id: 'lcp',
        navigationType: 'navigate',
      })
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as any
        this.analytics.trackPerformance({
          name: 'FID',
          value: fidEntry.processingStart - fidEntry.startTime,
          delta: fidEntry.processingStart - fidEntry.startTime,
          id: 'fid',
          navigationType: 'navigate',
        })
      }
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      this.analytics.trackPerformance({
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: 'cls',
        navigationType: 'navigate',
      })
    }).observe({ entryTypes: ['layout-shift'] })
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

// Create singleton instances
export const analytics = new Analytics()
export const performanceMonitor = new PerformanceMonitor(analytics)

// Utility functions for easy use
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event)
export const trackPageView = (page: string) => analytics.trackPageView(page)
export const trackInteraction = (element: string, action: string) => analytics.trackInteraction(element, action)
export const trackScrollDepth = (depth: number) => analytics.trackScrollDepth(depth)
export const trackTimeOnPage = (timeInSeconds: number) => analytics.trackTimeOnPage(timeInSeconds)
export const trackFormSubmission = (formName: string, success: boolean) => analytics.trackFormSubmission(formName, success)
export const trackExternalLink = (url: string) => analytics.trackExternalLink(url)
export const trackDownload = (fileName: string, fileType: string) => analytics.trackDownload(fileName, fileType)

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.trackWebVitals()
}
