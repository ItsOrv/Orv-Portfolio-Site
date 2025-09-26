// Type definitions for better type safety

export interface Skill {
  name: string
  level: number
}

export interface Project {
  title: string
  description: string
  tech: string[]
  status: 'Live' | 'Development' | 'Planned'
  url?: string
  github?: string
}

export interface ContactInfo {
  type: 'email' | 'github' | 'telegram' | 'linkedin'
  label: string
  href: string
  icon: 'blue' | 'purple' | 'indigo' | 'green'
  description: string
}

export interface TerminalCommand {
  prompt: string
  command: string
  blink?: boolean
}

export interface SectionContent {
  terminalName: string
  terminalCommands: TerminalCommand[]
  heading: string
  subheading: string
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaWork: string
  ctaContact: string
  status: string
}

export interface AboutContent extends SectionContent {
  backgroundTitle: string
  focusTitle: string
  backgroundText: string
  focusText: string
}

export interface SkillsContent extends SectionContent {
  list: Skill[]
}

export interface ProjectsContent extends SectionContent {
  list: Project[]
}

export interface ContactContent extends SectionContent {
  info: ContactInfo[]
}

export interface FooterContent {
  status: string
  copyright: string
  tech: string
  eof: string
}

export interface Profile {
  name: string
  title: string
  shortBio: string
  about: {
    background: string
    focus: string
  }
  contact: {
    email: string
    linkedin: string
    github: string
    telegram: string
  }
}

export interface Content {
  profile: Profile
  hero: HeroContent
  about: AboutContent
  skills: SkillsContent
  projects: ProjectsContent
  contact: ContactContent
  footer: FooterContent
}

// Utility types
export type Theme = 'dark' | 'light'
export type AnimationType = 'fade' | 'slide' | 'scale' | 'none'
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animation?: AnimationType
  delay?: number
  duration?: number
}

// API response types (for future use)
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

// Form types (for future contact form)
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface FormValidation {
  isValid: boolean
  errors: Record<string, string>
}
