import { motion } from 'framer-motion'
import { skills } from '../content'

const SkillsSection = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-16"
        style={{ willChange: 'transform, opacity' }}
      >
        <h2 className="heading-section mb-8">{skills.heading}</h2>
        <p className="subheading-executive mx-auto">
          {skills.subheading}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.list.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="premium-card"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="premium-card-content">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-200">{skill.name}</h3>
                <span className="text-sm text-slate-400">{skill.level}%</span>
              </div>
              <div className="skill-bar-executive">
                <motion.div
                  className="skill-progress-executive"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SkillsSection
