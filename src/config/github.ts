/**
 * GitHub API Configuration
 * Configure your GitHub username and project settings
 */

export interface GitHubConfig {
  username: string
  ignoreRepos: string[] // Repository names to ignore
  manualProjects: ManualProject[] // Projects to add manually
  updateInterval: number // Update interval in milliseconds (default: 1 hour)
}

export interface ManualProject {
  id: string
  title: string
  description: string
  shortDescription: string
  githubUrl: string
  liveUrl?: string
  category: string
  technologies: string[]
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'planned'
  [key: string]: unknown
}

export const githubConfig: GitHubConfig = {
  username: 'ItsOrv', // Your GitHub username
  ignoreRepos: [
    // Add repository names to ignore here
    // Example: 'old-project', 'test-repo'
  ],
  manualProjects: [
    // Add manual projects here if needed
    // They will be merged with GitHub projects
  ],
  updateInterval: 60 * 60 * 1000, // 1 hour in milliseconds
}

