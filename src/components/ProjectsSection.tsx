import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../content'
import { getFeaturedProjects } from '../data/projects'
import type { Project } from '../types/project'
import { X, Github, Globe, Youtube, Users, Code, CheckCircle, Target } from 'lucide-react'

const ProjectsSection = () => {
  const featuredProjects = getFeaturedProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const toggleProjectDetails = (project: Project) => {
    if (selectedProject?.id === project.id) {
      // If same project is clicked, close it
      setSelectedProject(null)
    } else {
      // Open new project details
      setSelectedProject(project)
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
          <h2 className="heading-section mb-8">{projects.heading}</h2>
          <p className="subheading-executive mx-auto">
            {projects.subheading}
          </p>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-showcase hover-lift-executive group cursor-pointer"
              onClick={() => toggleProjectDetails(project)}
            >
              <div className="premium-card-content">
                {/* Project Header - Always Visible */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`badge-${project.status === 'completed' ? 'executive' : 'premium'}`}>
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <button className="text-slate-400 hover:text-white transition-colors">
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
                <AnimatePresence>
                  {selectedProject?.id === project.id && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-slate-700/50 overflow-hidden"
                  >
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
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-slate-800/60 text-slate-200 text-sm rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Links</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-executive-sm flex items-center gap-2">
                              <Github className="w-4 h-4" /> GitHub
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-executive-sm flex items-center gap-2">
                              <Globe className="w-4 h-4" /> Live Demo
                            </a>
                          )}
                          {project.videoUrl && (
                            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn-executive-sm flex items-center gap-2">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </>
  )
}

export default ProjectsSection 