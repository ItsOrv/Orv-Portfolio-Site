import { memo } from 'react'

interface TerminalCommand {
  prompt: string
  command: string
  blink?: boolean
}

interface TerminalHeaderProps {
  name: string
  commands: TerminalCommand[]
}

/**
 * Reusable Terminal Header Component
 * Displays a macOS-style terminal window header with commands
 */
export const TerminalHeader = memo<TerminalHeaderProps>(({ name, commands }) => {
  return (
    <div className="executive-terminal mb-16 p-0 bg-transparent border-none shadow-none">
      <div className="terminal-bar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
        <div className="flex items-center space-x-2" role="presentation" aria-hidden="true">
          <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" aria-label="Close" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" aria-label="Minimize" />
          <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" aria-label="Maximize" />
        </div>
        <div className="text-xs text-slate-400 font-mono" aria-label={`Terminal: ${name}`}>
          {name}
        </div>
      </div>
      <div className="executive-terminal-content rounded-b-2xl bg-slate-900/80 p-6" role="log" aria-label="Terminal commands">
        {commands.map((cmd, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-4 last:mb-0">
            <span className="text-emerald-400" aria-hidden="true">{cmd.prompt}</span>
            <span className="text-slate-300">{cmd.command}</span>
            {cmd.blink && (
              <span 
                className="w-2 h-5 bg-emerald-400 animate-blink ml-1" 
                aria-label="Cursor"
                role="presentation"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

TerminalHeader.displayName = 'TerminalHeader'

