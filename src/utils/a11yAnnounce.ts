/**
 * Utility function to announce messages to screen readers
 * Separated from component to avoid fast refresh warnings
 */
export const announceToScreenReader = (message: string) => {
  const event = new CustomEvent('a11y-announce', { detail: message })
  window.dispatchEvent(event)
}

