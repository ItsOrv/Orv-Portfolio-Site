export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  image: string
  technologies: string[]
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  demoUrl?: string
  startDate: string
  endDate?: string
  team?: string[]
  challenges: string[]
  solutions: string[]
  results: string[]
  screenshots: string[]
  videoUrl?: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeSpent: string
  client?: string
  industry?: string
}

export interface ProjectCategory {
  id: string
  name: string
  description: string
  icon: string
}
