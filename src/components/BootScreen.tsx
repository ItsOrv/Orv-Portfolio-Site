import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypeSound, TypeSoundPreload } from './TypeSound'

const BootScreen = () => {
  const [currentLine, setCurrentLine] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const bootLines = [
    'Booting orv.dev...',
    '█ Initializing terminal interface...',
    '█ Loading system modules...',
    '█ Establishing secure connection...',
    '█ Loading user profile...',
    '█ Starting display server...',
    '█ Terminal ready.',
    'Press any key to continue...'
  ]

  const typeSound = useTypeSound()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < bootLines.length - 1) {
          typeSound()
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => setIsComplete(true), 2000)
          return prev
        }
      })
    }, 800)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-terminal-bg">
      <div className="w-full max-w-4xl mx-auto px-8">
        <TypeSoundPreload />
        <AnimatePresence>
          {!isComplete ? (
            <motion.div
              key="boot-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {bootLines.slice(0, currentLine + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-terminal-fg text-lg md:text-xl"
                >
                  {line}
                  {index === currentLine && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      █
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="boot-complete"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  textShadow: [
                    '0 0 10px #00ff00',
                    '0 0 20px #00ff00',
                    '0 0 10px #00ff00'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl md:text-6xl font-bold text-neon-green mb-4"
              >
                orv.dev
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-terminal-fg text-lg"
              >
                System ready. Welcome to the terminal.
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default BootScreen 