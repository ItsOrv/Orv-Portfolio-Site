import { useRef, Suspense, lazy, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, about, skills, projects, contact, footer } from './content'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useGSAPAnimations } from './hooks/useGSAPAnimations'
import { useMobileOverscroll } from './hooks/useMobileOverscroll'
import { TerminalHeader } from './components/TerminalHeader'
import { StructuredData } from './components/StructuredData'
import { A11yAnnouncer } from './components/A11yAnnouncer'

const AboutSection = lazy(() => import('./components/AboutSection'))
const SkillsSection = lazy(() => import('./components/SkillsSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const BackgroundMusic = lazy(() => import('./components/BackgroundMusic'))
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'))
const MobileMenu = lazy(() => import('./components/MobileMenu'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [progressPercent, setProgressPercent] = useState(0)
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // Update progress value for accessibility
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgressPercent(Math.round(latest * 100))
  })

  // Detect device capabilities
  const deviceInfo = useMemo(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return {
        isMobile: false,
        isLowEnd: false,
        prefersReducedMotion: false,
      }
    }

    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return { isMobile, isLowEnd, prefersReducedMotion }
  }, [])

  // Initialize custom hooks
  useLenisScroll(deviceInfo)
  useGSAPAnimations({
    isLowEnd: deviceInfo.isLowEnd,
    prefersReducedMotion: deviceInfo.prefersReducedMotion,
  })
  useMobileOverscroll(deviceInfo.isMobile)

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="premium-card animate-pulse h-64 w-64" />
      </div>
    }>
      <ErrorBoundary>
        <div ref={containerRef} className="relative overflow-hidden">
          {/* Clean static background */}
          <div className="fixed inset-0 bg-slate-950" />

          {/* Executive Navigation Header */}
          <motion.header 
            style={{ opacity: headerOpacity }}
            className="nav-executive"
            role="banner"
            aria-label="Main navigation"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-sm text-slate-400">Orv.dev</span>
                </div>
                <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main menu">
                  {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded"
                      aria-label={`Navigate to ${item} section`}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
                
                {/* Mobile Menu */}
                <Suspense fallback={null}>
                  <MobileMenu />
                </Suspense>
              </div>
            </div>
          </motion.header>

          {/* Executive Progress Indicator */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50 backdrop-blur-xl"
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-glow-blue"
              style={{ width: progressWidth }}
            />
          </motion.div>

          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>

          {/* Main Executive Content */}
          <main id="main-content" className="relative z-10" role="main">
            {/* Hero Section - Massive ORV Title */}
            <section 
              className="executive-section min-h-[100dvh] flex items-center justify-center relative"
              aria-label="Hero section"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
              <div className="relative z-10 text-center space-y-12 px-4 sm:px-6 lg:px-8">
                {/* Giant ORV Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-16"
                >
                  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-black tracking-tighter leading-none
                               bg-gradient-to-br from-slate-100 via-blue-200 to-indigo-300 bg-clip-text text-transparent
                               drop-shadow-2xl">
                    {hero.title}
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6
                               bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                    {hero.subtitle}
                  </h2>
                  <p className="text-xl md:text-2xl font-medium text-slate-400 leading-relaxed max-w-4xl mx-auto">
                    {hero.description}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                  <a 
                    href="#projects" 
                    className="btn-executive group min-h-[48px] min-w-[140px]"
                    aria-label="View my work and projects"
                  >
                    <span className="relative z-10">{hero.ctaWork}</span>
                  </a>
                  <a 
                    href="#contact" 
                    className="btn-secondary-exec min-h-[48px] min-w-[140px]"
                    aria-label="Get in touch and contact me"
                  >
                    {hero.ctaContact}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.1 }}
                  className="flex items-center justify-center gap-6 pt-8"
                >
                  <div className="status-online" aria-hidden="true" />
                  <span className="text-sm text-slate-400 font-mono">
                    {hero.status}
                  </span>
                </motion.div>
              </div>
            </section>

            {/* About Section with Terminal Header */}
            <section id="about" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <TerminalHeader name={about.terminalName} commands={about.terminalCommands} />
                <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
                  <AboutSection />
                </Suspense>
              </div>
            </section>

            {/* Skills Section with Terminal Header */}
            <section id="skills" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 relative">
              <div className="parallax-executive absolute inset-0 bg-gradient-to-b from-slate-900/20 to-transparent" />
              <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <TerminalHeader name={skills.terminalName} commands={skills.terminalCommands} />
                <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
                  <SkillsSection />
                </Suspense>
              </div>
            </section>

            {/* Projects Section with Terminal Header */}
            <section id="projects" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <TerminalHeader name={projects.terminalName} commands={projects.terminalCommands} />
                <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
                  <ProjectsSection />
                </Suspense>
              </div>
            </section>

            {/* Contact Section with Terminal Header */}
            <section id="contact" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
              <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <TerminalHeader name={contact.terminalName} commands={contact.terminalCommands} />
                <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
                  <ContactSection />
                </Suspense>
              </div>
            </section>

            {/* Extended Footer Section - Full Height */}
            <section className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 bg-slate-950 border-t border-slate-800/50 flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="font-mono text-slate-300 text-lg">{footer.status}</span>
                  </div>
                  <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
                    {footer.copyright}<br/>
                    {footer.tech}
                  </p>
                  <div className="flex items-center justify-center gap-6 pt-8">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                    <span className="text-slate-500 text-sm font-mono">{footer.eof}</span>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Executive Utilities */}
          <Suspense fallback={null}>
            <BackgroundMusic />
          </Suspense>

          {/* Structured Data for Projects - Safe injection */}
          <StructuredData />
          
          {/* Accessibility Announcer for screen readers */}
          <A11yAnnouncer />
        </div>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
