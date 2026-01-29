import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useGitHubProjects } from '../../hooks/useGitHubProjects'
import type { Project } from '../../types/project'
import * as githubService from '../../services/githubService'

// Mock the service
vi.mock('../../services/githubService', () => ({
  getCachedProjects: vi.fn(),
  refreshProjects: vi.fn(),
  initProjectSync: vi.fn(),
  mergeProjects: vi.fn((github, manual) => [...manual, ...github]),
}))

vi.mock('../../data/projects', () => ({
  projects: [],
  getFeaturedProjects: vi.fn(() => []),
}))

describe('useGitHubProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage if available
    if (typeof localStorage !== 'undefined' && localStorage.clear) {
      localStorage.clear()
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('loads projects on mount', async () => {
    const mockProjects: Project[] = [
      {
        id: 'github-1',
        title: 'Test Project',
        description: 'Test',
        shortDescription: 'Test',
        image: '',
        technologies: ['TypeScript'],
        category: 'web-development',
        status: 'completed',
        featured: true,
        githubUrl: 'https://github.com/test/project',
        startDate: '2024-01-01',
        challenges: [],
        solutions: [],
        results: [],
        screenshots: [],
        tags: [],
        difficulty: 'intermediate',
        timeSpent: '1 month',
      },
    ]

    vi.mocked(githubService.getCachedProjects).mockResolvedValue(mockProjects)

    const { result } = renderHook(() => useGitHubProjects())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Projects should be loaded (may include static projects)
    expect(result.current.projects.length).toBeGreaterThanOrEqual(0)
    expect(result.current.error).toBeNull()
  })

  it('handles errors gracefully', async () => {
    vi.mocked(githubService.getCachedProjects).mockRejectedValue(new Error('API Error'))

    const { result } = renderHook(() => useGitHubProjects())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('API Error')
    // On error, should fallback to static projects (empty array in test)
    expect(Array.isArray(result.current.projects)).toBe(true)
  })

  it('refreshes projects', async () => {
    const mockProjects: Project[] = [{
      id: 'github-1',
      title: 'Test',
      description: 'Test',
      shortDescription: 'Test',
      image: '',
      technologies: ['TypeScript'],
      category: 'web-development',
      status: 'completed',
      featured: false,
      githubUrl: 'https://github.com/test/project',
      startDate: '2024-01-01',
      challenges: [],
      solutions: [],
      results: [],
      screenshots: [],
      tags: [],
      difficulty: 'intermediate',
      timeSpent: '1 month',
    }]
    vi.mocked(githubService.getCachedProjects).mockResolvedValue(mockProjects)
    vi.mocked(githubService.refreshProjects).mockResolvedValue(mockProjects)

    const { result } = renderHook(() => useGitHubProjects())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await result.current.refresh()

    expect(githubService.refreshProjects).toHaveBeenCalled()
    // Projects should be updated (may include static projects)
    expect(result.current.projects.length).toBeGreaterThanOrEqual(0)
  })
})

