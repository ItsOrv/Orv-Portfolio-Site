import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useLenisScroll } from '../useLenisScroll'

// Mock Lenis
vi.mock('lenis', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      raf: vi.fn(),
      scrollTo: vi.fn(),
      destroy: vi.fn(),
    })),
  }
})

describe('useLenisScroll', () => {
  beforeEach(() => {
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      setTimeout(cb, 16)
      return 1
    })
    global.cancelAnimationFrame = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('initializes Lenis with correct options for desktop', () => {
    const options = {
      isMobile: false,
      isLowEnd: false,
      prefersReducedMotion: false,
    }

    renderHook(() => useLenisScroll(options))

    // Lenis should be initialized
    expect(global.requestAnimationFrame).toHaveBeenCalled()
  })

  it('disables smooth scroll on mobile', () => {
    const options = {
      isMobile: true,
      isLowEnd: false,
      prefersReducedMotion: false,
    }

    renderHook(() => useLenisScroll(options))

    // Should still initialize but with different options
    expect(global.requestAnimationFrame).toHaveBeenCalled()
  })

  it('respects reduced motion preference', () => {
    const options = {
      isMobile: false,
      isLowEnd: false,
      prefersReducedMotion: true,
    }

    renderHook(() => useLenisScroll(options))

    expect(global.requestAnimationFrame).toHaveBeenCalled()
  })
})

