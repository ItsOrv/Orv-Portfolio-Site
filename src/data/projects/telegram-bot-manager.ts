import type { Project } from '../../types/project'

export const telegramBotManager: Project = {
  id: 'telegram-bot-manager',
  title: 'Telegram Bot Manager',
  description: 'A comprehensive Telegram bot management system built with Python and Django. This project provides a complete solution for managing multiple Telegram bots, handling user interactions, and providing analytics.',
  shortDescription: 'Advanced Telegram bot management system with analytics and multi-bot support',
  image: '/images/projects/telegram-bot-manager.jpg',
  technologies: ['Python', 'Django', 'Telegram Bot API', 'PostgreSQL', 'Redis', 'Celery', 'Docker'],
  category: 'telegram-bot',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/telegram-bot-manager',
  liveUrl: 'https://botmanager.example.com',
  demoUrl: 'https://demo.botmanager.example.com',
  startDate: '2024-01-15',
  endDate: '2024-03-20',
  team: ['Orv (Full-Stack Developer)'],
  challenges: [
    'Managing multiple bot instances simultaneously',
    'Handling high-volume message processing',
    'Implementing real-time analytics',
    'Ensuring bot reliability and uptime'
  ],
  solutions: [
    'Implemented microservices architecture with Docker',
    'Used Redis for caching and Celery for background tasks',
    'Created real-time dashboard with WebSocket connections',
    'Implemented comprehensive monitoring and alerting system'
  ],
  results: [
    'Successfully managed 50+ bot instances',
    'Processed over 1M messages per day',
    'Achieved 99.9% uptime',
    'Reduced response time by 60%'
  ],
  screenshots: [
    '/images/projects/telegram-bot-manager/dashboard.jpg',
    '/images/projects/telegram-bot-manager/analytics.jpg',
    '/images/projects/telegram-bot-manager/bot-config.jpg'
  ],
  videoUrl: 'https://youtube.com/watch?v=example',
  tags: ['telegram', 'bot', 'management', 'python', 'django', 'analytics'],
  difficulty: 'advanced',
  timeSpent: '2 months',
  client: 'Internal Project',
  industry: 'Technology'
}
