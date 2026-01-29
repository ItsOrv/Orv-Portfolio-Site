import { motion } from 'framer-motion'
import { Mail, Github, Send, ExternalLink, Users } from 'lucide-react'
import { contact } from '../content'

const ContactSection = () => {
  const contactInfo = contact.info

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      case 'telegram':
        return <Send className="w-5 h-5" />
      case 'telegramChannel':
        return <Users className="w-5 h-5" />
      default:
        return <ExternalLink className="w-5 h-5" />
    }
  }

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
        <div className="premium-card" style={{ overflow: 'visible', padding: '3rem' }}>
          <div className="premium-card-content" style={{ overflow: 'visible' }}>
            <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Get In Touch</h3>
            <div className="space-y-4" style={{ overflow: 'visible', padding: '1rem' }}>
              {contactInfo && contactInfo.length > 0 ? (
                contactInfo.map((item) => (
                <a
                  key={item.type}
                  href={item.href}
                  target={item.type === 'email' ? '_self' : '_blank'}
                  rel={item.type === 'email' ? '' : 'noopener noreferrer'}
                  className="contact-button group block p-4 bg-slate-800/30 hover:bg-slate-700/40 
                           rounded-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-xl
                           border border-slate-700/30 hover:border-slate-600/50
                           text-decoration-none relative z-10 hover:z-20"
                  style={{ 
                    textDecoration: 'none', 
                    transformOrigin: 'center',
                    margin: '0.25rem'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full
                                     ${item.icon === 'blue' ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30' : ''}
                                     ${item.icon === 'purple' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' : ''}
                                     ${item.icon === 'indigo' ? 'bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30' : ''}
                                     ${item.icon === 'green' ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' : ''}
                                     transition-colors duration-300`}>
                        {getIcon(item.type)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-200 font-medium group-hover:text-white transition-colors duration-300">
                          {item.label}
                        </span>
                        <span className="text-slate-500 text-sm">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                      <span className="text-sm font-mono">
                        {item.type === 'email' ? 'Send Email' : 'Open'}
                      </span>
                      <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8">Contact information coming soon.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactSection 