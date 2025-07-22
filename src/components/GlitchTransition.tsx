import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GlitchTransition = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchMessages = [
    '> Accessing deeper layers...',
    '> Authentication bypassed ✅',
    '> Welcome, privileged user.',
    '> Loading enhanced interface...',
    '> System compromised...',
    '> Just kidding! 😄',
    '> Welcome to the real terminal.'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < glitchMessages.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(timer)
  }, [glitchMessages.length])

  useEffect(() => {
    // Trigger glitch effect periodically
    const glitchTimer = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)

    return () => clearInterval(glitchTimer)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center bg-terminal-bg">
      <div className="w-full max-w-4xl mx-auto px-8">
        <div className="bg-black bg-opacity-80 border border-terminal-fg p-8 rounded-lg">
          <AnimatePresence>
            {glitchMessages.slice(0, currentStep + 1).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`font-mono text-terminal-fg text-lg mb-2 ${
                  isGlitching && index === currentStep ? 'glitch-text' : ''
                }`}
                data-text={message}
              >
                {message}
                {index === currentStep && (
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
          </AnimatePresence>

          {/* Glitch overlay effect */}
          {isGlitching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-500 pointer-events-none"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,0,0,0.1) 50%, transparent 70%)',
                animation: 'glitch 0.2s infinite'
              }}
            />
          )}

          {/* Progress indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / glitchMessages.length) * 100}%` }}
            className="h-1 bg-neon-green mt-4"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}

export default GlitchTransition 