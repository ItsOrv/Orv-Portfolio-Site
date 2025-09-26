import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../content'
import { getFeaturedProjects } from '../data/projects'
import ProjectModal from './ProjectModal'
import type { Project } from '../types/project'

const ProjectsSection = () => {
  const featuredProjects = getFeaturedProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: Project) => {
    console.log('Opening modal for project:', project.title)
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <>
      <div className="space-y-12">
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
          {/* Test Button */}
          <button 
            onClick={() => openModal(featuredProjects[0])}
            className="btn-executive mt-4"
          >
            Test Modal
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-showcase hover-lift-executive group cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="premium-card-content h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <span className={`badge-${project.status === 'completed' ? 'executive' : 'premium'}`}>
                    {project.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                  {project.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2">
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
                
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  )
}

export default ProjectsSection 