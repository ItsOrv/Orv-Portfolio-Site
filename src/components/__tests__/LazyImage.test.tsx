import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { LazyImage } from '../LazyImage'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

beforeEach(() => {
  mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    disconnect: mockDisconnect,
  })
  global.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver
})

describe('LazyImage', () => {
  it('renders with placeholder initially', () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="Test image"
        placeholder="/placeholder.jpg"
      />
    )
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('src', '/placeholder.jpg')
  })

  it('observes intersection', () => {
    render(<LazyImage src="/test.jpg" alt="Test" />)
    expect(mockObserve).toHaveBeenCalled()
  })

  it('loads image when intersecting', async () => {
    let intersectionCallback: ((entries: IntersectionObserverEntry[]) => void) | undefined

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback as (entries: IntersectionObserverEntry[]) => void
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      }
    })

    render(<LazyImage src="/test.jpg" alt="Test" />)

    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      target: document.createElement('img'),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: 0,
    } as IntersectionObserverEntry

    // Create image load mock
    const mockImage = {
      src: '',
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    }

    vi.spyOn(global, 'Image').mockImplementation(() => mockImage as unknown as HTMLImageElement)

    if (intersectionCallback) {
      intersectionCallback([mockEntry])

      // Trigger load
      if (mockImage.onload) {
        mockImage.onload()
      }

      await waitFor(() => {
        const img = screen.getByAltText('Test')
        expect(img).toHaveAttribute('src', '/test.jpg')
      })
    }
  })

  it('handles image load error', async () => {
    let intersectionCallback: ((entries: IntersectionObserverEntry[]) => void) | undefined
    const onError = vi.fn()

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback as (entries: IntersectionObserverEntry[]) => void
      return {
        observe: mockObserve,
        disconnect: mockDisconnect,
      }
    })

    render(<LazyImage src="/test.jpg" alt="Test" onError={onError} />)

    const mockEntry = {
      isIntersecting: true,
      target: document.createElement('img'),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: 0,
    } as IntersectionObserverEntry

    const mockImage = {
      src: '',
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    }

    vi.spyOn(global, 'Image').mockImplementation(() => mockImage as unknown as HTMLImageElement)

    if (intersectionCallback) {
      intersectionCallback([mockEntry])

      // Trigger error
      if (mockImage.onerror) {
        mockImage.onerror()
      }

      await waitFor(() => {
        expect(onError).toHaveBeenCalled()
      })
    }
  })
})

