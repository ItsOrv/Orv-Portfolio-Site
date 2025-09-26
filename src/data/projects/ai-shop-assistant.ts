import type { Project } from '../../types/project'

const aiShopAssistant: Project = {
  id: 'ai-shop-assistant',
  title: 'AI Shop Assistant',
  shortDescription: 'Intelligent shopping assistant powered by AI to help users find products, compare prices, and make informed purchasing decisions.',
  description: 'AI Shop Assistant is a smart shopping companion that uses artificial intelligence to enhance the online shopping experience. The system analyzes user preferences, searches for products across multiple platforms, compares prices, and provides personalized recommendations. It features natural language processing for product queries, price tracking, and intelligent filtering to help users make the best purchasing decisions.',
  image: '/images/ai-shop-assistant.jpg',
  technologies: ['Python', 'AI/ML', 'Web Scraping', 'Natural Language Processing', 'Price Comparison', 'Recommendation Engine'],
  category: 'ai-ml',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/Ai-Shop-Assistant',
  liveUrl: undefined,
  demoUrl: undefined,
  startDate: '2025-06-01',
  endDate: '2025-06-01',
  team: ['ItsOrv'],
  challenges: [
    'Implementing accurate product search across multiple platforms',
    'Creating intelligent price comparison algorithms',
    'Building personalized recommendation systems',
    'Handling real-time data updates and price changes'
  ],
  solutions: [
    'Developed multi-platform web scraping with anti-detection measures',
    'Implemented machine learning algorithms for price prediction',
    'Created user preference learning system with feedback loops',
    'Built real-time data synchronization and caching mechanisms'
  ],
  results: [
    'Accurate product search and price comparison across platforms',
    'Personalized recommendations based on user behavior',
    'Real-time price tracking and alert system',
    'User-friendly interface with natural language queries'
  ],
  screenshots: [],
  videoUrl: undefined,
  tags: ['ai', 'shopping', 'e-commerce', 'price-comparison', 'recommendation', 'web-scraping'],
  difficulty: 'advanced',
  timeSpent: '3 weeks',
  client: 'Open Source',
  industry: 'E-commerce'
}

export default aiShopAssistant
