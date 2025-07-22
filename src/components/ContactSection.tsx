import { motion } from 'framer-motion'
import { Mail, Github, Send, ExternalLink } from 'lucide-react'
import { contact } from '../content'

const ContactSection = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      case 'telegram':
        return <Send className="w-5 h-5" />
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
        <div className="premium-card">
          <div className="premium-card-content">
            <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">Get In Touch</h3>
            <div className="space-y-4">
              {contact.info.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.type === 'email' ? '_self' : '_blank'}
                  rel={item.type === 'email' ? '' : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="contact-button group flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-700/40 
                           rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                           border border-slate-700/30 hover:border-slate-600/50 hover:shadow-glow-blue"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${item.icon}-500/20 
                                   text-${item.icon}-400 group-hover:bg-${item.icon}-500/30 transition-colors duration-300`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-medium group-hover:text-white transition-colors duration-300">
                        {item.type === 'email' ? item.label : item.label.split(': ')[1]}
                      </span>
                      {item.type !== 'email' && (
                        <span className="text-slate-500 text-sm">
                          {item.type === 'github' ? 'Follow me on GitHub' : 'Chat on Telegram'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    <span className="text-sm font-mono">
                      {item.type === 'email' ? 'Send Email' : 'Open'}
                    </span>
                    <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactSection 