import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { projects as projectsContent } from '../content'
import { useFeaturedProjects, useGitHubProjects } from '../hooks/useGitHubProjects'
import type { Project } from '../types/project'
import { X, Github, Globe, Youtube, Users, Code, CheckCircle, Target, Image as ImageIcon, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'

const ProjectsSection = () => {
  const featuredProjects = useFeaturedProjects()
  const { loading, error, lastUpdate, refresh } = useGitHubProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(0)

  const toggleProjectDetails = (project: Project) => {
    if (selectedProject?.id === project.id) {
      // If same project is clicked, close it
      setSelectedProject(null)
      setSelectedScreenshotIndex(0)
      // Announce to screen readers
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        const event = new CustomEvent('a11y-announce', { 
          detail: `Closed details for ${project.title}` 
        })
        window.dispatchEvent(event)
      }
    } else {
      // Open new project details
      setSelectedProject(project)
      setSelectedScreenshotIndex(0)
      // Announce to screen readers
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        const event = new CustomEvent('a11y-announce', { 
          detail: `Opened details for ${project.title}` 
        })
        window.dispatchEvent(event)
      }
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return

      if (e.key === 'Escape') {
        setSelectedProject(null)
        setSelectedScreenshotIndex(0)
      }

      // Navigate screenshots with arrow keys
      if (selectedProject.screenshots && selectedProject.screenshots.length > 0) {
        if (e.key === 'ArrowLeft') {
          setSelectedScreenshotIndex((prev) => 
            prev > 0 ? prev - 1 : selectedProject.screenshots.length - 1
          )
        } else if (e.key === 'ArrowRight') {
          setSelectedScreenshotIndex((prev) => 
            prev < selectedProject.screenshots.length - 1 ? prev + 1 : 0
          )
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string | undefined): string | null => {
    if (!url || typeof url !== 'string') return null
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2] && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null
    } catch (error) {
      console.warn('Failed to parse YouTube URL:', error)
      return null
    }
  }

  return (
    <>
      <div id="projects-section" className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="heading-section">{projectsContent.heading}</h2>
            <button
              onClick={refresh}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Refresh projects from GitHub"
              title={lastUpdate ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'Refresh projects'}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="subheading-executive mx-auto">
            {projectsContent.subheading}
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              Error loading projects: {error}
            </div>
          )}
          {loading && (
            <div className="mt-4 text-slate-400 text-sm flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Loading projects from GitHub...
            </div>
          )}
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.length === 0 ? (
            <div className="premium-card text-center py-12">
              <p className="text-slate-400">No featured projects available at the moment.</p>
            </div>
          ) : (
            featuredProjects.map((project) => (
            <div
              key={project.id}
              className="project-showcase hover-lift-executive group cursor-pointer"
              onClick={() => toggleProjectDetails(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleProjectDetails(project)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              aria-expanded={selectedProject?.id === project.id}
            >
              <div className="premium-card-content">
                {/* Project Header - Always Visible */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`badge-${project.status === 'completed' ? 'executive' : 'premium'}`}>
                      {project.status ? project.status.replace('-', ' ').toUpperCase() : 'UNKNOWN'}
                    </span>
                    <button 
                      className="text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleProjectDetails(project)
                      }}
                      aria-label={selectedProject?.id === project.id ? 'Close project details' : 'Open project details'}
                    >
                      {selectedProject?.id === project.id ? (
                        <X className="w-5 h-5" />
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies && project.technologies.length > 0 ? (
                    <>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-slate-700/50 text-slate-400 text-sm rounded-full">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-sm rounded-full">
                      Technologies not specified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">
                    {project.category}
                  </span>
                  <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    {selectedProject?.id === project.id ? 'Hide Details' : 'View Details'}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${selectedProject?.id === project.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details - Only show when selected */}
                {selectedProject?.id === project.id && (
                  <div className="mt-6 pt-6 border-t border-slate-700/50">
                    <div className="space-y-6">
                      {/* Full Description */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                        <p className="text-slate-300 leading-relaxed">{project.description}</p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Code className="w-5 h-5 text-blue-400" /> Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies && project.technologies.length > 0 ? (
                            project.technologies.map((tech) => (
                              <span key={tech} className="px-3 py-1 bg-slate-800/60 text-slate-200 text-sm rounded-full">
                                {tech}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 bg-slate-800/60 text-slate-400 text-sm rounded-full">
                              Technologies not specified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Screenshots Gallery */}
                      {project.screenshots && project.screenshots.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-blue-400" /> Screenshots
                          </h4>
                          <div className="relative">
                            <div className="relative overflow-hidden rounded-lg bg-slate-800/50 aspect-video">
                              <AnimatePresence mode="wait">
                                {project.screenshots[selectedScreenshotIndex] && (
                                  <motion.img
                                    key={selectedScreenshotIndex}
                                    src={project.screenshots[selectedScreenshotIndex]}
                                    alt={`${project.title} screenshot ${selectedScreenshotIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                    }}
                                  />
                                )}
                              </AnimatePresence>
                              
                              {project.screenshots.length > 1 && (
                                <>
                                  <button
                                    onClick={() => setSelectedScreenshotIndex((prev) => 
                                      prev > 0 ? prev - 1 : project.screenshots.length - 1
                                    )}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Previous screenshot"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => setSelectedScreenshotIndex((prev) => 
                                      prev < project.screenshots.length - 1 ? prev + 1 : 0
                                    )}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Next screenshot"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {project.screenshots.map((_, index) => (
                                      <button
                                        key={index}
                                        onClick={() => setSelectedScreenshotIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                          index === selectedScreenshotIndex
                                            ? 'bg-blue-500 w-6'
                                            : 'bg-slate-600 hover:bg-slate-500'
                                        }`}
                                        aria-label={`Go to screenshot ${index + 1}`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">
                              {selectedScreenshotIndex + 1} / {project.screenshots.length}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Video Embed */}
                      {project.videoUrl && getYouTubeEmbedUrl(project.videoUrl) && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Youtube className="w-5 h-5 text-red-400" /> Demo Video
                          </h4>
                          <div className="relative overflow-hidden rounded-lg bg-slate-800/50 aspect-video">
                            <iframe
                              src={getYouTubeEmbedUrl(project.videoUrl) || ''}
                              title={`${project.title} demo video`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Links</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-executive-sm flex items-center gap-2"
                              aria-label={`View ${project.title} on GitHub`}
                            >
                              <Github className="w-4 h-4" /> GitHub
                            </a>
                          )}
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-executive-sm flex items-center gap-2"
                              aria-label={`View live demo of ${project.title}`}
                            >
                              <Globe className="w-4 h-4" /> Live Demo
                            </a>
                          )}
                          {project.videoUrl && !getYouTubeEmbedUrl(project.videoUrl) && (
                            <a 
                              href={project.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="btn-executive-sm flex items-center gap-2"
                              aria-label={`Watch demo video of ${project.title}`}
                            >
                              <Youtube className="w-4 h-4" /> Demo Video
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Challenges, Solutions, Results */}
                      {project.challenges && project.challenges.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-red-400" /> Challenges
                          </h4>
                          <ul className="space-y-2">
                            {project.challenges.map((item, i) => (
                              <li key={i} className="text-slate-300">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.solutions && project.solutions.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" /> Solutions
                          </h4>
                          <ul className="space-y-2">
                            {project.solutions.map((item, i) => (
                              <li key={i} className="text-slate-300">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.results && project.results.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Code className="w-5 h-5 text-purple-400" /> Results
                          </h4>
                          <ul className="space-y-2">
                            {project.results.map((item, i) => (
                              <li key={i} className="text-slate-300">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Team */}
                      {project.team && project.team.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-orange-400" /> Team
                          </h4>
                          <ul className="space-y-2">
                            {project.team.map((member, i) => (
                              <li key={i} className="text-slate-300">
                                {member}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            ))
          )}
        </div>
      </div>

    </>
  )
}

export default ProjectsSection 