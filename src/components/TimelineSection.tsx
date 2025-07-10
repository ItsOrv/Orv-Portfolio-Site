import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const timeline = [
    {
      year: '2019',
      title: 'First Steps',
      description: 'Started learning Python and web development. Built first automation scripts.',
      category: 'Learning'
    },
    {
      year: '2020',
      title: 'Automation Discovery',
      description: 'Discovered the power of web automation. Built first Telegram bot.',
      category: 'Automation'
    },
    {
      year: '2021',
      title: 'AI Integration',
      description: 'Started exploring AI/ML. Integrated NLP into automation projects.',
      category: 'AI/ML'
    },
    {
      year: '2022',
      title: 'Full-Stack Development',
      description: 'Expanded to full-stack development. Built complete web applications.',
      category: 'Development'
    },
    {
      year: '2023',
      title: 'Cyber Research',
      description: 'Dived into cybersecurity research. Built security tools and scripts.',
      category: 'Security'
    },
    {
      year: '2024',
      title: 'Advanced Projects',
      description: 'Working on complex automation systems and AI-powered applications.',
      category: 'Innovation'
    }
  ]

  return (
    <div ref={containerRef} className="container mx-auto px-8 py-20">
      <motion.div
        style={{ y, opacity }}
        className="text-center mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-neon-green mb-4"
        >
          Career Timeline
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-terminal-fg text-lg"
        >
          My journey through technology and innovation
        </motion.p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/2 left-0 right-0 h-1 bg-terminal-fg transform -translate-y-1/2"
          style={{ transformOrigin: 'left' }}
        />

        {/* Timeline Items */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-neon-green rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="w-full h-full bg-neon-green rounded-full opacity-50"
                />
              </motion.div>

              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-black bg-opacity-80 border border-terminal-fg p-6 rounded-lg mt-8 hover:border-neon-green transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-2xl font-bold text-neon-green">{item.year}</span>
                  <span className="text-xs px-2 py-1 bg-neon-green bg-opacity-20 text-neon-green rounded">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-terminal-fg mb-2">
                  {item.title}
                </h3>
                
                <p className="text-terminal-fg text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Terminal Command */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-black bg-opacity-80 border border-terminal-fg p-4 rounded-lg inline-block">
          <p className="text-terminal-fg font-mono">
            $ cat timeline.log | tail -n 6
          </p>
          <p className="text-neon-green font-mono mt-2">
            &gt; Timeline loaded: 6 milestones found
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default TimelineSection 