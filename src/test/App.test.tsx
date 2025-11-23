import { render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    utils: {
      toArray: vi.fn(() => []),
    },
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
    })),
  },
}))

// Mock ScrollTrigger
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    getAll: vi.fn(() => []),
  },
}))

// Mock Lenis
vi.mock('lenis', () => ({
  default: vi.fn(() => ({
    raf: vi.fn(),
    destroy: vi.fn(),
    scrollTo: vi.fn(),
  })),
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.createElement('div', props, children),
    header: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => React.createElement('header', props, children),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('ORV')).toBeInTheDocument()
  })

  it('displays the main title', () => {
    render(<App />)
    expect(screen.getByText('ORV')).toBeInTheDocument()
  })

  it('displays the subtitle', () => {
    render(<App />)
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument()
  })

  it('has navigation links', () => {
    render(<App />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has call-to-action buttons', () => {
    render(<App />)
    expect(screen.getByText('View My Work')).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })
})
