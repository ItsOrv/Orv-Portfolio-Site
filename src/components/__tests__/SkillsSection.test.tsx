import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsSection from '../SkillsSection'

describe('SkillsSection', () => {
  it('renders heading', () => {
    render(<SkillsSection />)
    expect(screen.getByText(/Skills & Expertise/i)).toBeInTheDocument()
  })

  it('displays skills list', () => {
    render(<SkillsSection />)
    // Check if at least one skill is rendered
    const skillElements = screen.queryAllByText(/\d+%/)
    expect(skillElements.length).toBeGreaterThan(0)
  })

  it('has proper semantic structure', () => {
    const { container } = render(<SkillsSection />)
    const headings = container.querySelectorAll('h2, h3')
    expect(headings.length).toBeGreaterThan(0)
  })
})

