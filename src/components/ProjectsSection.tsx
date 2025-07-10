import { motion } from 'framer-motion'
import { projects } from '../content'

const ProjectsSection = () => {
  return (
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
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.list.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="project-showcase hover-lift-executive group"
          >
            <div className="premium-card-content">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-200">{project.title}</h3>
                <span className={`badge-${project.status === 'Live' ? 'executive' : 'premium'}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-800/50 text-slate-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsSection 