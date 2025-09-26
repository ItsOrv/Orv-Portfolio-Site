import { useEffect, useRef, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, about, skills, projects, contact, footer } from './content'

// Lazy load components for better performance
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
  
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  
  // Removed animated background elements for cleaner experience

  useEffect(() => {
    // Detect mobile device and performance mode
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Prevent overscroll and bounce effects on mobile
    if (isMobile) {
      // Prevent pull-to-refresh
      document.body.style.overscrollBehaviorY = 'contain'
      
      // Prevent overscroll bounce
      const preventOverscroll = (e: TouchEvent) => {
        const target = e.target as Element
        const scrollableParent = target.closest('[data-scrollable]') || document.body
        
        if (scrollableParent === document.body) {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
          const clientHeight = document.documentElement.clientHeight || window.innerHeight
          
          // Prevent overscroll at top
          if (scrollTop <= 0 && e.touches[0].clientY > e.touches[0].clientY) {
            e.preventDefault()
          }
          
          // Prevent overscroll at bottom
          if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < e.touches[0].clientY) {
            e.preventDefault()
          }
        }
      }
      
      document.addEventListener('touchstart', preventOverscroll, { passive: false })
      document.addEventListener('touchmove', preventOverscroll, { passive: false })
      
      return () => {
        document.removeEventListener('touchstart', preventOverscroll)
        document.removeEventListener('touchmove', preventOverscroll)
      }
    }
    // Initialize optimized smooth scroll
    const lenis = new Lenis({
      duration: 1.2, // Reduced duration for better performance
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -8 * t)), // Simplified easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile && !isLowEnd && !prefersReducedMotion, // Disable on mobile/low-end/reduced motion
      wheelMultiplier: isLowEnd ? 0.6 : 0.8, // Further reduced for low-end devices
      touchMultiplier: isLowEnd ? 1.2 : 1.5, // Further reduced for low-end devices
      ...((isMobile || isLowEnd || prefersReducedMotion) && { smooth: false }), // Disable smooth scroll
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Optimized GSAP animations for better performance
    const sections = gsap.utils.toArray('.executive-section')
    
    sections.forEach((section, index: number) => {
      // Skip animations on low-end devices or reduced motion preference
      if (isLowEnd || prefersReducedMotion) {
        gsap.set(section as Element, { opacity: 1, y: 0, scale: 1 })
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section as Element,
          start: 'top 85%', // Earlier trigger for smoother experience
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
          once: false, // Allow re-triggering
        }
      })

      // Smooth entrance animation without jumping
      gsap.set(section as Element, { 
        opacity: 0, 
        y: 30, // Reduced movement
        scale: 0.99, // Reduced scale
      })

      tl.to(section as Element, { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, // Further reduced duration
        ease: 'power2.out',
        delay: index * 0.03 // Further reduced stagger delay
      })
    })

    // Smooth navigation scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.slice(1)
        if (targetId) {
          const target = document.getElementById(targetId)
          if (target) {
            lenis.scrollTo(target, {
              offset: -100, // Account for header
              duration: 1.5, // Reduced duration
            })
          }
        }
      })
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="premium-card animate-pulse h-64 w-64" /></div>}>
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
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50 backdrop-blur-xl"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-glow-blue"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Main Executive Content */}
      <main className="relative z-10">
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
              <div className="status-online" />
              <span className="text-sm text-slate-400 font-mono">
                {hero.status}
              </span>
            </motion.div>
          </div>
        </section>
        {/* About Section with Terminal Header */}
        <section id="about" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Terminal Header with macOS buttons */}
            <div className="executive-terminal mb-16 p-0 bg-transparent border-none shadow-none">
              <div className="terminal-bar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="text-xs text-slate-400 font-mono">{about.terminalName}</div>
              </div>
              <div className="executive-terminal-content rounded-b-2xl bg-slate-900/80 p-6">
                {about.terminalCommands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-4 last:mb-0">
                    <span className="text-emerald-400">{cmd.prompt}</span>
                    <span className="text-slate-300">{cmd.command}</span>
                    {cmd.blink && <span className="w-2 h-5 bg-emerald-400 animate-blink ml-1"></span>}
                  </div>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
              <AboutSection />
            </Suspense>
          </div>
        </section>
        {/* Skills Section with Terminal Header */}
        <section id="skills" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 relative">
          <div className="parallax-executive absolute inset-0 bg-gradient-to-b from-slate-900/20 to-transparent" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {/* Terminal Header with macOS buttons */}
            <div className="executive-terminal mb-16 p-0 bg-transparent border-none shadow-none">
              <div className="terminal-bar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="text-xs text-slate-400 font-mono">{skills.terminalName}</div>
              </div>
              <div className="executive-terminal-content rounded-b-2xl bg-slate-900/80 p-6">
                {skills.terminalCommands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-4 last:mb-0">
                    <span className="text-emerald-400">{cmd.prompt}</span>
                    <span className="text-slate-300">{cmd.command}</span>
                    {cmd.blink && <span className="w-2 h-5 bg-emerald-400 animate-blink ml-1"></span>}
                  </div>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
              <SkillsSection />
            </Suspense>
          </div>
        </section>
        {/* Projects Section with Terminal Header */}
        <section id="projects" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Terminal Header with macOS buttons */}
            <div className="executive-terminal mb-16 p-0 bg-transparent border-none shadow-none">
              <div className="terminal-bar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="text-xs text-slate-400 font-mono">{projects.terminalName}</div>
              </div>
              <div className="executive-terminal-content rounded-b-2xl bg-slate-900/80 p-6">
                {projects.terminalCommands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-4 last:mb-0">
                    <span className="text-emerald-400">{cmd.prompt}</span>
                    <span className="text-slate-300">{cmd.command}</span>
                    {cmd.blink && <span className="w-2 h-5 bg-emerald-400 animate-blink ml-1"></span>}
                  </div>
                ))}
              </div>
            </div>
            <Suspense fallback={<div className="premium-card animate-pulse h-64" />}>
              <ProjectsSection />
            </Suspense>
          </div>
        </section>
        {/* Contact Section with Terminal Header */}
        <section id="contact" className="executive-section min-h-[100dvh] py-16 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            {/* Terminal Header with macOS buttons */}
            <div className="executive-terminal mb-16 p-0 bg-transparent border-none shadow-none">
              <div className="terminal-bar flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 rounded-t-2xl">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors cursor-pointer" />
                </div>
                <div className="text-xs text-slate-400 font-mono">{contact.terminalName}</div>
              </div>
              <div className="executive-terminal-content rounded-b-2xl bg-slate-900/80 p-6">
                {contact.terminalCommands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center space-x-2 mb-4 last:mb-0">
                    <span className="text-emerald-400">{cmd.prompt}</span>
                    <span className="text-slate-300">{cmd.command}</span>
                    {cmd.blink && <span className="w-2 h-5 bg-emerald-400 animate-blink ml-1"></span>}
                  </div>
                ))}
              </div>
            </div>
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
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
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
        </div>
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
