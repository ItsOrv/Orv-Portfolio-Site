import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TerminalHeader } from '../TerminalHeader'

describe('TerminalHeader', () => {
  const mockCommands = [
    { prompt: '$', command: 'cd about/', blink: false },
    { prompt: '$', command: 'cat developer-profile.json', blink: true },
  ]

  it('renders terminal name', () => {
    render(<TerminalHeader name="test-terminal" commands={mockCommands} />)
    expect(screen.getByText('test-terminal')).toBeInTheDocument()
  })

  it('renders all commands', () => {
    render(<TerminalHeader name="test" commands={mockCommands} />)
    expect(screen.getByText('cd about/')).toBeInTheDocument()
    expect(screen.getByText('cat developer-profile.json')).toBeInTheDocument()
  })

  it('shows cursor blink for commands with blink flag', () => {
    const { container } = render(
      <TerminalHeader name="test" commands={mockCommands} />
    )
    const blinkElements = container.querySelectorAll('.animate-blink')
    expect(blinkElements.length).toBe(1)
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(
      <TerminalHeader name="test" commands={mockCommands} />
    )
    const logElement = container.querySelector('[role="log"]')
    expect(logElement).toBeInTheDocument()
  })
})

