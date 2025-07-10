import { motion } from 'framer-motion'
import { contact } from '../content'

const ContactSection = () => {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="heading-section mb-8">{contact.heading}</h2>
        <p className="subheading-executive mx-auto">
          {contact.subheading}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="premium-card">
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Get In Touch</h3>
            <div className="space-y-6">
              {contact.info.map((item) => (
                <div key={item.label} className={`flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl`}>
                  <div className={`w-3 h-3 rounded-full bg-${item.icon}-400`} />
                  <span className="text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactSection 