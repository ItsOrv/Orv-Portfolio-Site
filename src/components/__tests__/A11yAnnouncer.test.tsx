import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { A11yAnnouncer } from '../A11yAnnouncer'

describe('A11yAnnouncer', () => {
  it('renders live region with correct attributes', () => {
    const { container } = render(<A11yAnnouncer />)
    const liveRegion = container.querySelector('[role="status"]')
    
    expect(liveRegion).toBeInTheDocument()
    expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
    expect(liveRegion).toHaveClass('sr-only')
  })

  it('has proper structure for screen reader announcements', () => {
    const { container } = render(<A11yAnnouncer />)
    const liveRegion = container.querySelector('[role="status"]') as HTMLElement
    
    expect(liveRegion).toBeInstanceOf(HTMLDivElement)
    expect(liveRegion.tagName).toBe('DIV')
  })
})

