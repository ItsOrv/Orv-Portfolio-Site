import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MobileMenu from '../MobileMenu'

describe('MobileMenu', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders menu button', () => {
    render(<MobileMenu />)
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
  })

  it('opens menu on button click', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    
    fireEvent.click(button)
    
    await waitFor(() => {
      // Check for dialog instead of close button (which appears twice)
      expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument()
    })
  })

  it('closes menu on escape key', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    
    // Open menu
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument()
    })
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /navigation menu/i })).not.toBeInTheDocument()
    })
  })

  it('closes menu on outside click', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    
    // Open menu
    fireEvent.click(button)
    await waitFor(() => {
      // Check for menu panel instead of close button (which appears twice)
      expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument()
    })
    
    // Click outside
    fireEvent.click(document.body)
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /navigation menu/i })).not.toBeInTheDocument()
    })
  })

  it('prevents body scroll when menu is open', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    
    fireEvent.click(button)
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  it('restores body scroll when menu closes', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    
    // Open
    fireEvent.click(button)
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
    
    // Close
    fireEvent.click(button)
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('renders all menu items', async () => {
    render(<MobileMenu />)
    const button = screen.getByLabelText(/open menu/i)
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Skills')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })
  })
})

