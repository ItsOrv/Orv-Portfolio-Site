import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectsSection from '../ProjectsSection'

// Mock the projects data
vi.mock('../../data/projects', () => ({
  getFeaturedProjects: () => [
    {
      id: 'test-project',
      title: 'Test Project',
      description: 'Test description',
      shortDescription: 'Short test description',
      image: '/test.jpg',
      technologies: ['React', 'TypeScript'],
      category: 'web-development',
      status: 'completed' as const,
      featured: true,
      startDate: '2025-01-01',
      challenges: ['Challenge 1'],
      solutions: ['Solution 1'],
      results: ['Result 1'],
      screenshots: [],
      tags: ['test'],
      difficulty: 'intermediate' as const,
      timeSpent: '2 weeks',
    },
  ],
}))

describe('ProjectsSection', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders heading and subheading', () => {
    render(<ProjectsSection />)
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument()
  })

  it('displays featured projects', async () => {
    render(<ProjectsSection />)
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })
  })

  it('expands project details on click', async () => {
    render(<ProjectsSection />)
    const projectCard = await screen.findByText('Test Project')
    const cardElement = projectCard.closest('[role="button"]') || projectCard.closest('.project-showcase') || projectCard
    
    if (cardElement) {
      fireEvent.click(cardElement)
      
      await waitFor(() => {
        expect(screen.getByText('Test description')).toBeInTheDocument()
      }, { timeout: 3000 })
    }
  })

  it('closes project details on second click', async () => {
    render(<ProjectsSection />)
    const projectCard = await screen.findByText('Test Project')
    const cardElement = projectCard.closest('[role="button"]') || projectCard.closest('.project-showcase') || projectCard
    
    if (cardElement) {
      // Open
      fireEvent.click(cardElement)
      await waitFor(() => {
        expect(screen.getByText('Test description')).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Close
      fireEvent.click(cardElement)
      await waitFor(() => {
        expect(screen.queryByText('Test description')).not.toBeInTheDocument()
      }, { timeout: 3000 })
    }
  })

  it('handles keyboard navigation', async () => {
    render(<ProjectsSection />)
    const projectCard = await screen.findByText('Test Project')
    const cardElement = projectCard.closest('[role="button"]') || projectCard.closest('.project-showcase') || projectCard
    
    if (cardElement) {
      // Test Enter key
      fireEvent.keyDown(cardElement, { key: 'Enter' })
      await waitFor(() => {
        expect(screen.getByText('Test description')).toBeInTheDocument()
      }, { timeout: 3000 })
      
      // Test Escape key
      fireEvent.keyDown(document, { key: 'Escape' })
      await waitFor(() => {
        expect(screen.queryByText('Test description')).not.toBeInTheDocument()
      }, { timeout: 3000 })
    }
  })
})

