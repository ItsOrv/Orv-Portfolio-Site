import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchGitHubProjects, mergeProjects } from '../../services/githubService'
import { githubConfig } from '../../config/github'
import type { Project } from '../../types/project'

// Mock fetch
global.fetch = vi.fn()

// Store original config
const originalIgnoreRepos: string[] = [...githubConfig.ignoreRepos]

describe('GitHub Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear localStorage if available
    if (typeof localStorage !== 'undefined' && localStorage.clear) {
      localStorage.clear()
    }
    // Reset ignore list
    githubConfig.ignoreRepos = [...originalIgnoreRepos]
  })

  afterEach(() => {
    // Restore ignore list
    githubConfig.ignoreRepos = [...originalIgnoreRepos]
  })

  it('fetches projects from GitHub API', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'test-repo',
        full_name: 'ItsOrv/test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/ItsOrv/test-repo',
        homepage: null,
        language: 'TypeScript',
        topics: ['react', 'typescript'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        pushed_at: '2024-01-02T00:00:00Z',
        stargazers_count: 10,
        forks_count: 2,
        archived: false,
        disabled: false,
        private: false,
      },
    ]

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    } as Response)

    const projects = await fetchGitHubProjects()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`users/${githubConfig.username}/repos`),
      expect.any(Object)
    )
    expect(projects.length).toBeGreaterThan(0)
    expect(projects[0].id).toBe('github-1')
    expect(projects[0].title).toBe('Test Repo')
  })

  it('filters out ignored repositories', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'ignored-repo',
        full_name: 'ItsOrv/ignored-repo',
        description: 'Should be ignored',
        html_url: 'https://github.com/ItsOrv/ignored-repo',
        homepage: null,
        language: 'JavaScript',
        topics: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        pushed_at: '2024-01-02T00:00:00Z',
        stargazers_count: 0,
        forks_count: 0,
        archived: false,
        disabled: false,
        private: false,
      },
    ]

    // Temporarily add to ignore list
    githubConfig.ignoreRepos.push('ignored-repo')

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    } as Response)

    const projects = await fetchGitHubProjects()

    expect(projects.length).toBe(0)
  })

  it('filters out private, archived, and disabled repos', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'private-repo',
        private: true,
        archived: false,
        disabled: false,
      },
      {
        id: 2,
        name: 'archived-repo',
        private: false,
        archived: true,
        disabled: false,
      },
      {
        id: 3,
        name: 'disabled-repo',
        private: false,
        archived: false,
        disabled: true,
      },
      {
        id: 4,
        name: 'valid-repo',
        full_name: 'ItsOrv/valid-repo',
        description: 'Valid',
        html_url: 'https://github.com/ItsOrv/valid-repo',
        homepage: null,
        language: 'TypeScript',
        topics: [],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        pushed_at: '2024-01-02T00:00:00Z',
        stargazers_count: 0,
        forks_count: 0,
        private: false,
        archived: false,
        disabled: false,
      },
    ]

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockRepos,
    } as Response)

    const projects = await fetchGitHubProjects()

    expect(projects.length).toBe(1)
    expect(projects[0].id).toBe('github-4')
  })

  it('merges manual projects with GitHub projects', () => {
    const githubProjects: Project[] = [
      {
        id: 'github-1',
        title: 'GitHub Project',
        description: 'From GitHub',
        shortDescription: 'From GitHub',
        image: '',
        technologies: ['TypeScript'],
        category: 'web-development',
        status: 'completed',
        featured: false,
        githubUrl: 'https://github.com/test/repo',
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

    const manualProjects = [
      {
        id: 'manual-1',
        title: 'Manual Project',
        description: 'Manual description',
        shortDescription: 'Manual',
        githubUrl: 'https://github.com/test/manual',
        category: 'web-development',
        technologies: ['React'],
      },
    ]

    const merged = mergeProjects(githubProjects, manualProjects)

    expect(merged.length).toBe(2)
    expect(merged.find(p => p.id === 'github-1')).toBeDefined()
    expect(merged.find(p => p.id === 'manual-1')).toBeDefined()
  })

  it('handles API errors gracefully', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

    const projects = await fetchGitHubProjects()

    expect(projects).toEqual([])
  })

  it('handles non-ok responses', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)

    const projects = await fetchGitHubProjects()

    expect(projects).toEqual([])
  })
})

