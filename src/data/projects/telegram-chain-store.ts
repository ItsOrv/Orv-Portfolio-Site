import type { Project } from '../../types/project'

const telegramChainStore: Project = {
  id: 'telegram-chain-store',
  title: 'Telegram Chain Store Bot',
  shortDescription: 'Versatile Telegram bot for seamless e-commerce experiences with transaction handling and store management.',
  description: 'The Telegram Chain Store Bot is a comprehensive e-commerce solution built for Telegram. It enables small business owners and sales representatives to handle transactions directly within the Telegram platform. The bot features inventory management, order processing, payment integration, and customer support capabilities, making it perfect for businesses looking to expand their online presence through Telegram.',
  image: '/images/telegram-store.jpg',
  technologies: ['Python', 'Telegram Bot API', 'SQLite', 'Payment Gateway', 'E-commerce', 'Telegram'],
  category: 'telegram-bot',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/Telegram-Chain-Store',
  liveUrl: undefined,
  demoUrl: undefined,
  startDate: '2025-07-01',
  endDate: '2025-07-18',
  team: ['ItsOrv'],
  challenges: [
    'Implementing secure payment processing within Telegram',
    'Creating intuitive product catalog management',
    'Handling complex order workflows and inventory tracking',
    'Ensuring data security and user privacy'
  ],
  solutions: [
    'Integrated secure payment gateways with Telegram payments',
    'Built dynamic product catalog with image and description support',
    'Implemented real-time inventory tracking and order management',
    'Added comprehensive admin panel for store management'
  ],
  results: [
    'Complete e-commerce solution within Telegram platform',
    'Secure transaction processing and order management',
    'User-friendly interface for both customers and store owners',
    'Scalable architecture for growing businesses'
  ],
  screenshots: [],
  videoUrl: undefined,
  tags: ['telegram', 'e-commerce', 'bot', 'payments', 'store', 'business'],
  difficulty: 'advanced',
  timeSpent: '3 weeks',
  client: 'Open Source',
  industry: 'E-commerce'
}

export default telegramChainStore
