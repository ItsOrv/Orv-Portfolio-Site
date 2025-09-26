import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Clock, Users, Target, CheckCircle, AlertCircle, Play } from 'lucide-react'
import type { Project } from '../types/project'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20'
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/20'
      case 'planned': return 'text-blue-400 bg-blue-400/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20'
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20'
      case 'advanced': return 'text-red-400 bg-red-400/20'
      default: return 'text-slate-400 bg-slate-400/20'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 z-50 overflow-y-auto"
          >
            <div className="min-h-full flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-800/80 hover:bg-slate-700/80 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                  <div className="relative p-8">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty.toUpperCase()}
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                      {project.title}
                    </h1>
                    
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-executive">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-executive">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-executive">
                          <Play className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto max-h-[60vh]">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Technologies */}
                      <div className="premium-card">
                        <h2 className="text-xl font-bold text-white mb-4">Technologies Used</h2>
                        <div className="flex flex-wrap gap-3">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Solutions */}
                      <div className="premium-card">
                        <h2 className="text-xl font-bold text-white mb-4">Challenges & Solutions</h2>
                        <div className="space-y-4">
                          {project.challenges.map((challenge, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-3 h-3 text-red-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white mb-1">Challenge {index + 1}</h3>
                                <p className="text-slate-300 mb-2 text-sm">{challenge}</p>
                                <div className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                  <p className="text-green-400 text-sm">{project.solutions[index]}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="premium-card">
                        <h2 className="text-xl font-bold text-white mb-4">Results & Impact</h2>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                              <Target className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <p className="text-green-400 font-medium text-sm">{result}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Project Info */}
                      <div className="premium-card">
                        <h3 className="text-lg font-bold text-white mb-4">Project Info</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-slate-400 text-xs">Start Date</p>
                              <p className="text-white text-sm">{new Date(project.startDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          {project.endDate && (
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-blue-400" />
                              <div>
                                <p className="text-slate-400 text-xs">End Date</p>
                                <p className="text-white text-sm">{new Date(project.endDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-slate-400 text-xs">Time Spent</p>
                              <p className="text-white text-sm">{project.timeSpent}</p>
                            </div>
                          </div>
                          
                          {project.team && (
                            <div className="flex items-center gap-3">
                              <Users className="w-4 h-4 text-blue-400" />
                              <div>
                                <p className="text-slate-400 text-xs">Team</p>
                                <p className="text-white text-sm">{project.team.length} member{project.team.length > 1 ? 's' : ''}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="premium-card">
                        <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Client Info */}
                      {project.client && (
                        <div className="premium-card">
                          <h3 className="text-lg font-bold text-white mb-4">Client</h3>
                          <div className="space-y-1">
                            <p className="text-white font-medium text-sm">{project.client}</p>
                            {project.industry && (
                              <p className="text-slate-400 text-xs">{project.industry}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
