import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactSection from '../ContactSection'

describe('ContactSection', () => {
  it('renders heading', () => {
    render(<ContactSection />)
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<ContactSection />)
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument()
  })

  it('has accessible links', () => {
    const { container } = render(<ContactSection />)
    const links = container.querySelectorAll('a[href]')
    expect(links.length).toBeGreaterThan(0)
    
    // Check that links have proper attributes
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })
})

