import type { Project } from '../types/project'
import { githubConfig, type ManualProject } from '../config/github'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  stargazers_count: number
  forks_count: number
  archived: boolean
  disabled: boolean
  private: boolean
}

interface CachedProjects {
  projects: Project[]
  timestamp: number
}

const CACHE_KEY = 'github_projects_cache'
const CACHE_DURATION = githubConfig.updateInterval

/**
 * Convert GitHub repository to Project format
 */
const repoToProject = (repo: GitHubRepo): Project => {
  // Extract technologies from topics and language
  const technologies = [
    ...(repo.language ? [repo.language] : []),
    ...repo.topics.filter(topic => 
      !['portfolio', 'personal', 'website'].includes(topic.toLowerCase())
    ),
  ]

  // Determine category based on topics and description
  const getCategory = (): string => {
    const desc = (repo.description || '').toLowerCase()
    const topics = repo.topics.map(t => t.toLowerCase())
    
    if (topics.includes('telegram') || desc.includes('telegram')) {
      return 'telegram-bot'
    }
    if (topics.includes('cybersecurity') || desc.includes('security')) {
      return 'cybersecurity'
    }
    if (topics.includes('ai') || topics.includes('ml') || topics.includes('machine-learning')) {
      return 'ai-ml'
    }
    return 'web-development'
  }

  // Determine status based on last push
  const getStatus = (): 'completed' | 'in-progress' | 'planned' => {
    const daysSincePush = (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSincePush > 90) return 'completed'
    if (daysSincePush > 30) return 'in-progress'
    return 'in-progress'
  }

  // Create short description from full description
  const shortDescription = repo.description 
    ? (repo.description.length > 120 ? repo.description.substring(0, 120) + '...' : repo.description)
    : 'No description available'

  return {
    id: `github-${repo.id}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description available',
    shortDescription,
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    technologies: technologies.length > 0 ? technologies : ['JavaScript', 'TypeScript'],
    category: getCategory(),
    status: getStatus(),
    featured: repo.stargazers_count > 5 || repo.forks_count > 2,
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    startDate: repo.created_at.split('T')[0],
    endDate: repo.archived ? repo.updated_at.split('T')[0] : undefined,
    challenges: [],
    solutions: [],
    results: [],
    screenshots: [],
    tags: repo.topics,
    difficulty: repo.stargazers_count > 10 ? 'advanced' : repo.stargazers_count > 5 ? 'intermediate' : 'beginner',
    timeSpent: 'Ongoing',
  }
}

/**
 * Fetch projects from GitHub API
 */
export const fetchGitHubProjects = async (): Promise<Project[]> => {
  try {
    const { username, ignoreRepos } = githubConfig
    
    // Fetch all public repositories
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=all`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter out ignored repos, private repos, archived, and disabled
    const filteredRepos = repos.filter(repo => 
      !repo.private &&
      !repo.archived &&
      !repo.disabled &&
      !ignoreRepos.includes(repo.name)
    )

    // Convert to Project format
    const projects = filteredRepos.map(repoToProject)

    return projects
  } catch (error) {
    console.error('Failed to fetch GitHub projects:', error)
    return []
  }
}

/**
 * Merge manual projects with GitHub projects
 */
export const mergeProjects = (githubProjects: Project[], manualProjects: ManualProject[]): Project[] => {
  const manualProjectsFormatted: Project[] = manualProjects.map(manual => ({
    id: manual.id,
    title: manual.title,
    description: manual.description,
    shortDescription: manual.shortDescription,
    image: '',
    technologies: manual.technologies,
    category: manual.category,
    status: manual.status || 'completed',
    featured: manual.featured ?? false,
    githubUrl: manual.githubUrl,
    liveUrl: manual.liveUrl,
    startDate: new Date().toISOString().split('T')[0],
    challenges: [],
    solutions: [],
    results: [],
    screenshots: [],
    tags: [],
    difficulty: 'intermediate',
    timeSpent: 'Unknown',
  }))

  // Combine and remove duplicates (manual projects take priority)
  const allProjects = [...manualProjectsFormatted, ...githubProjects]
  const uniqueProjects = new Map<string, Project>()
  
  allProjects.forEach(project => {
    if (!uniqueProjects.has(project.id)) {
      uniqueProjects.set(project.id, project)
    }
  })

  return Array.from(uniqueProjects.values())
}

/**
 * Get cached projects or fetch new ones
 */
export const getCachedProjects = async (): Promise<Project[]> => {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    try {
      const { projects, timestamp }: CachedProjects = JSON.parse(cached)
      const now = Date.now()
      
      // Return cached if still valid
      if (now - timestamp < CACHE_DURATION) {
        return projects
      }
    } catch (error) {
      console.warn('Failed to parse cached projects:', error)
    }
  }

  // Fetch new projects
  const githubProjects = await fetchGitHubProjects()
  const allProjects = mergeProjects(githubProjects, githubConfig.manualProjects)

  // Cache the results
  const cacheData: CachedProjects = {
    projects: allProjects,
    timestamp: Date.now(),
  }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.warn('Failed to cache projects:', error)
  }

  return allProjects
}

/**
 * Force refresh projects (bypass cache)
 */
export const refreshProjects = async (): Promise<Project[]> => {
  localStorage.removeItem(CACHE_KEY)
  return getCachedProjects()
}

/**
 * Initialize background sync
 */
export const initProjectSync = () => {
  if (typeof window === 'undefined') return

  // Check if we need to update
  const checkAndUpdate = async () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const { timestamp }: CachedProjects = JSON.parse(cached)
          const now = Date.now()
          
          // Update if cache is expired
          if (now - timestamp >= CACHE_DURATION) {
            await refreshProjects()
            console.log('Projects updated from GitHub')
          }
        } catch (error) {
          console.warn('Failed to check cache:', error)
        }
      } else {
        // No cache, fetch initial data
        await getCachedProjects()
      }
    } catch (error) {
      console.warn('Failed to sync projects:', error)
    }
  }

  // Initial check
  checkAndUpdate()

  // Set up interval for periodic updates
  const intervalId = setInterval(checkAndUpdate, githubConfig.updateInterval)

  // Also update when page becomes visible (if user returns after a while)
  const handleVisibilityChange = () => {
    if (!document.hidden) {
      checkAndUpdate()
    }
  }
  
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Cleanup function (though this runs for app lifetime)
  return () => {
    clearInterval(intervalId)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}

