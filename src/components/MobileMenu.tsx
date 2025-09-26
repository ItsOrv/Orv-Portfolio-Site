import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isOpen && !target.closest('.mobile-menu')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="mobile-menu lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 min-h-[44px] min-w-[44px]"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-slate-800/50 z-50 p-6"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-mono text-sm text-slate-400">Orv.dev</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2" role="navigation" aria-label="Mobile menu">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-4 py-4 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 min-h-[48px] flex items-center"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    <span className="text-lg font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Menu Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-500 font-mono">Available for work</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Let's build something amazing together
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
