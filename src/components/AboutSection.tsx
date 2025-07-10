import { motion } from 'framer-motion'
import { about } from '../content'

const AboutSection = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section mb-8">{about.heading}</h2>
        <p className="subheading-executive mx-auto">
          {about.subheading}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="premium-card"
        >
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">{about.backgroundTitle}</h3>
            <p className="text-slate-400 leading-relaxed">
              {about.backgroundText}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="premium-card"
        >
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-4">{about.focusTitle}</h3>
            <p className="text-slate-400 leading-relaxed">
              {about.focusText}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection 