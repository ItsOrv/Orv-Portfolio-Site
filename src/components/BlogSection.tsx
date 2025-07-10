import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const blogPosts = [
  {
    id: '1',
    title: 'How I Automated My Workflow with Python',
    date: '2024-06-01',
    content: `# How I Automated My Workflow with Python\n\nI use Python for everything from web scraping to automating boring tasks. Here’s how I set up my toolkit...`,
  },
  {
    id: '2',
    title: 'Linux Tips for Developers',
    date: '2024-05-15',
    content: `# Linux Tips for Developers\n\nSome of my favorite Linux tricks and terminal commands for boosting productivity...`,
  },
  {
    id: '3',
    title: 'Building Telegram Bots with Telethon',
    date: '2024-04-20',
    content: `# Building Telegram Bots with Telethon\n\nA quickstart guide to building powerful Telegram bots using Telethon and Python...`,
  },
]

const BlogSection = () => {
  const [selected, setSelected] = useState<null | typeof blogPosts[0]>(null)

  return (
    <div className="container mx-auto px-8 py-20">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-neon-green mb-4">Blog / Notes</h2>
        <p className="text-terminal-fg text-lg">Terminal logs, dev notes, and experiments</p>
      </motion.div>
      <div className="bg-black bg-opacity-80 border border-terminal-fg p-8 rounded-lg mb-12">
        <div className="font-mono text-terminal-fg mb-4">$ tail -n 3 blog.log</div>
        <div className="space-y-4">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="cursor-pointer hover:text-neon-green"
              onClick={() => setSelected(post)}
            >
              <span className="text-neon-green">[{post.date}]</span> {post.title}
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-terminal-bg border border-terminal-fg p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto text-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-neon-green">{selected.title}</h3>
                <button onClick={() => setSelected(null)} className="text-terminal-fg hover:text-neon-green transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="text-terminal-fg text-sm mb-2">{selected.date}</div>
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selected.content.replace(/\n/g, '<br/>') }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BlogSection 