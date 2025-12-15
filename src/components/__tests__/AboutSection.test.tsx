import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../AboutSection'

describe('AboutSection', () => {
  it('renders heading and subheading', () => {
    render(<AboutSection />)
    expect(screen.getByText(/About Me/i)).toBeInTheDocument()
  })

  it('displays background and focus sections', () => {
    render(<AboutSection />)
    expect(screen.getByText(/Background/i)).toBeInTheDocument()
    expect(screen.getByText(/Focus/i)).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    const { container } = render(<AboutSection />)
    const headings = container.querySelectorAll('h2, h3')
    expect(headings.length).toBeGreaterThan(0)
  })
})

