import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useTypeSound, TypeSoundPreload } from './TypeSound'

const HeroTerminal = () => {
  const [command, setCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [currentOutputLine, setCurrentOutputLine] = useState(0)

  const fullCommand = '$ whois orv.dev'
  const outputLines = [
    'Name: Orv',
    'Role: Full-stack Developer | Automation Engineer | Cyber Researcher',
    'Location: Earth (probably near a Linux machine)',
    'Skills: Python, Django, Telethon, AI, Linux, n8n, Web Automation',
    'Status: Active — open for freelance and collaboration',
    '',
    'Contact:',
    '  GitHub: github.com/orv',
    '  Telegram: @orv',
    '  Email: orv@orv.dev'
  ]

  const typeSound = useTypeSound()

  useEffect(() => {
    // Type the command
    let charIndex = 0
    const commandTimer = setInterval(() => {
      if (charIndex < fullCommand.length) {
        setCommand(fullCommand.slice(0, charIndex + 1))
        typeSound()
        charIndex++
      } else {
        clearInterval(commandTimer)
        setTimeout(() => setShowOutput(true), 500)
      }
    }, 100)

    return () => clearInterval(commandTimer)
  }, [])

  useEffect(() => {
    if (!showOutput) return

    const outputTimer = setInterval(() => {
      setCurrentOutputLine((prev) => {
        if (prev < outputLines.length - 1) {
          typeSound()
          return prev + 1
        } else {
          clearInterval(outputTimer)
          return prev
        }
      })
    }, 200)

    return () => clearInterval(outputTimer)
  }, [showOutput])

  return (
    <div className="w-full h-full flex items-center justify-center bg-terminal-bg">
      <div className="w-full max-w-4xl mx-auto px-8">
        <TypeSoundPreload />
        <div className="bg-black bg-opacity-80 border border-terminal-fg p-8 rounded-lg">
          {/* Command Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-2">
              <span className="text-terminal-fg">$</span>
              <motion.span
                className="text-terminal-fg font-mono"
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 0.1 }}
              >
                {command}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  █
                </motion.span>
              </motion.span>
            </div>
          </motion.div>

          {/* Output */}
          <AnimatePresence>
            {showOutput && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                {outputLines.slice(0, currentOutputLine + 1).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-terminal-fg"
                  >
                    {line}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cursor */}
          {showOutput && currentOutputLine >= outputLines.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-terminal-fg font-mono"
              >
                █
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroTerminal 