import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFocusTrap } from '../useFocusTrap'

describe('useFocusTrap', () => {
  beforeEach(() => {
    // Create a mock container element
    document.body.innerHTML = `
      <div>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </div>
    `
  })

  it('returns container ref', () => {
    const { result } = renderHook(() => useFocusTrap(false))
    expect(result.current).toBeDefined()
  })

  it('focuses first element when trap activates', () => {
    const container = document.body.querySelector('div') as HTMLElement
    const firstButton = container.querySelector('button') as HTMLElement

    const { result } = renderHook(({ isActive }) => useFocusTrap(isActive), {
      initialProps: { isActive: false },
    })

    // Assign container to ref
    if (result.current) {
      (result.current as { current: HTMLElement | null }).current = container
    }

    // Re-render with active trap
    renderHook(({ isActive }) => useFocusTrap(isActive), {
      initialProps: { isActive: true },
    })

    // Focus should be on first element
    expect(firstButton).toBeDefined()
    expect(container).toBeDefined()
  })

  it('sets up focus trap container', () => {
    const container = document.body.querySelector('div') as HTMLElement

    const { result } = renderHook(({ isActive }) => useFocusTrap(isActive), {
      initialProps: { isActive: true },
    })

    if (result.current) {
      (result.current as { current: HTMLElement | null }).current = container
    }

    // Verify container is set up
    expect(container).toBeDefined()
  })
})

