import { useState, useEffect } from 'react'
import type { Project } from '../types/project'
import { getCachedProjects, refreshProjects, mergeProjects } from '../services/githubService'
import { getFeaturedProjects as getStaticFeaturedProjects, projects as staticProjects } from '../data/projects'
import { githubConfig } from '../config/github'

/**
 * Custom hook to manage GitHub projects with automatic updates
 */
export const useGitHubProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const githubProjects = await getCachedProjects()
        // Merge with static projects
        const allProjects = mergeProjects(githubProjects, githubConfig.manualProjects)
        // Add static projects (they take priority)
        const projectMap = new Map<string, Project>()
        staticProjects.forEach(project => {
          projectMap.set(project.id, project)
        })
        allProjects.forEach(project => {
          if (!projectMap.has(project.id)) {
            projectMap.set(project.id, project)
          }
        })
        setProjects(Array.from(projectMap.values()))
        setLastUpdate(new Date())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
        console.error('Error loading projects:', err)
        // Fallback to static projects on error
        setProjects(staticProjects)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const githubProjects = await refreshProjects()
      // Merge with static projects
      const allProjects = mergeProjects(githubProjects, githubConfig.manualProjects)
      // Add static projects (they take priority)
      const projectMap = new Map<string, Project>()
      staticProjects.forEach(project => {
        projectMap.set(project.id, project)
      })
      allProjects.forEach(project => {
        if (!projectMap.has(project.id)) {
          projectMap.set(project.id, project)
        }
      })
      setProjects(Array.from(projectMap.values()))
      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh projects')
      console.error('Error refreshing projects:', err)
      // Fallback to static projects on error
      setProjects(staticProjects)
    } finally {
      setLoading(false)
    }
  }

  return {
    projects,
    loading,
    error,
    lastUpdate,
    refresh,
  }
}

/**
 * Hook to get featured projects (static + GitHub)
 */
export const useFeaturedProjects = () => {
  const { projects, loading } = useGitHubProjects()
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  useEffect(() => {
    if (!loading && projects.length > 0) {
      // Filter featured projects from all projects
      const featured = projects.filter(p => p.featured)
      setFeaturedProjects(featured)
    } else if (!loading) {
      // Fallback to static featured projects
      setFeaturedProjects(getStaticFeaturedProjects())
    }
  }, [projects, loading])

  return featuredProjects
}

