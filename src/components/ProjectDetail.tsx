import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, Users, Target, CheckCircle, AlertCircle, Play } from 'lucide-react'
import { getProjectById } from '../data/projects'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? getProjectById(id) : undefined

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="premium-card text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Project Not Found</h1>
          <p className="text-slate-300 mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/" className="btn-executive">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto px-4 py-16">
          <Link to="/" className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty.toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
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
          </motion.div>
        </div>
      </div>

      {/* Project Details */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="premium-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Challenges & Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="premium-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Challenges & Solutions</h2>
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Challenge {index + 1}</h3>
                      <p className="text-slate-300 mb-3">{challenge}</p>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-green-400">{project.solutions[index]}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="premium-card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Results & Impact</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-400 font-medium">{result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="premium-card"
            >
              <h3 className="text-xl font-bold text-white mb-4">Project Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Start Date</p>
                    <p className="text-white">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {project.endDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-slate-400 text-sm">End Date</p>
                      <p className="text-white">{new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Time Spent</p>
                    <p className="text-white">{project.timeSpent}</p>
                  </div>
                </div>
                
                {project.team && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-slate-400 text-sm">Team</p>
                      <p className="text-white">{project.team.length} member{project.team.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="premium-card"
            >
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Client Info */}
            {project.client && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="premium-card"
              >
                <h3 className="text-xl font-bold text-white mb-4">Client</h3>
                <div className="space-y-2">
                  <p className="text-white font-medium">{project.client}</p>
                  {project.industry && (
                    <p className="text-slate-400 text-sm">{project.industry}</p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
