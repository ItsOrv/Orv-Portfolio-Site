import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypeSound } from '../utils/typeSound'
import TypeSoundPreload from './TypeSound'
import { Terminal, X } from 'lucide-react'

const COMMANDS: Record<string, string> = {
  help: 'Available commands: help, cd skills, open projects, whoami, sudo rm -rf /',
  'cd skills': 'Switched to skills directory. Listing skills...\n- Python\n- React\n- Linux\n- AI/ML',
  'open projects': 'Opening projects...\n- telegram-shop-bot\n- ai-news-engine\n- p2p-torrent-site',
  whoami: 'orv (privileged user)',
}

const TerminalPlayground = () => {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<string[]>(['Type `help` to see available commands.'])
  const [input, setInput] = useState('')
  const [easterEgg, setEasterEgg] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const typeSound = useTypeSound()

  const handleCommand = (cmd: string) => {
    if (cmd.trim() === 'sudo rm -rf /') {
      setEasterEgg(true)
      setLines((prev) => [...prev, `$ ${cmd}`, '💥 System meltdown initiated! 💥', 'Just kidding 😄', ''])
      return
    }
    const output = COMMANDS[cmd.trim()] ?? 'Command not found. Type `help`.'
    setLines((prev) => [...prev, `$ ${cmd}`, output])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput('')
    typeSound()
  }

  return (
    <>
      <TypeSoundPreload />
      <div className="fixed bottom-4 left-4 z-50">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full bg-black bg-opacity-70 border border-neon-green hover:bg-neon-green hover:text-black transition-colors shadow-lg"
            aria-label="Open Terminal Playground"
          >
            <Terminal className="w-5 h-5" />
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="w-80 bg-terminal-bg border border-terminal-fg rounded-lg shadow-lg p-4 relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-terminal-fg hover:text-neon-green"
                aria-label="Close Terminal"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="font-mono text-neon-green mb-2">Mini Terminal</div>
              <div className="h-40 overflow-y-auto text-terminal-fg text-sm mb-2 bg-black bg-opacity-60 rounded p-2">
                {lines.map((line, i) => (
                  <div key={i} className="whitespace-pre-line">{line}</div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="text-neon-green font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-terminal-fg font-mono"
                  autoFocus
                  disabled={easterEgg}
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
              {/* Easter Egg Animation */}
              <AnimatePresence>
                {easterEgg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: [0, 5, -5, 0] }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, repeat: 2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 rounded-lg z-10"
                  >
                    <div className="text-4xl text-red-500 font-bold mb-2 glitch-text" data-text="💀 sudo rm -rf / 💀">
                      💀 sudo rm -rf / 💀
                    </div>
                    <div className="text-neon-green font-mono text-lg mb-2">System destroyed! (not really)</div>
                    <button
                      onClick={() => { setEasterEgg(false); setLines(['Type `help` to see available commands.']) }}
                      className="px-4 py-2 bg-neon-green text-black rounded font-mono mt-2"
                    >
                      Reset Terminal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default TerminalPlayground 