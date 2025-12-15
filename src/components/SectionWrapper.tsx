import { Suspense, type ReactNode } from 'react'
import { TerminalHeader } from './TerminalHeader'

interface TerminalCommand {
  prompt: string
  command: string
  blink?: boolean
}

interface SectionWrapperProps {
  id: string
  terminalName: string
  terminalCommands: TerminalCommand[]
  children: ReactNode
  className?: string
  backgroundElement?: ReactNode
  fallback?: ReactNode
}

/**
 * Reusable section wrapper with terminal header and suspense
 */
export const SectionWrapper = ({
  id,
  terminalName,
  terminalCommands,
  children,
  className = '',
  backgroundElement,
  fallback = <div className="premium-card animate-pulse h-64" />,
}: SectionWrapperProps) => {
  return (
    <section 
      id={id} 
      className={`executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 ${className}`}
    >
      {backgroundElement}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <TerminalHeader name={terminalName} commands={terminalCommands} />
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </div>
    </section>
  )
}

