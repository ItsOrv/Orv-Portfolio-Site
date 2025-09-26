import type { Project } from '../../types/project'

const telegramPanel: Project = {
  id: 'telegram-panel',
  title: 'Telegram Panel',
  shortDescription: 'Comprehensive tool for managing multiple Telegram accounts, monitoring groups/channels, and automated message forwarding.',
  description: 'Telegram Panel is a powerful management system designed to handle multiple Telegram accounts efficiently. It monitors groups and channels for specific keywords, automatically forwards relevant messages to designated channels, and provides comprehensive account management capabilities. Perfect for businesses and content managers who need to streamline their Telegram operations.',
  image: '/images/telegram-panel.jpg',
  technologies: ['Python', 'Telethon', 'Telegram API', 'AsyncIO', 'SQLite', 'Telegram Bot API'],
  category: 'telegram-bot',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/Telegram-Panel',
  liveUrl: undefined,
  demoUrl: undefined,
  startDate: '2025-07-01',
  endDate: '2025-07-18',
  team: ['ItsOrv'],
  challenges: [
    'Managing multiple Telegram accounts simultaneously',
    'Implementing efficient message monitoring and filtering',
    'Handling rate limits and API restrictions',
    'Creating a user-friendly interface for complex operations'
  ],
  solutions: [
    'Used Telethon library for robust Telegram API integration',
    'Implemented async/await patterns for concurrent operations',
    'Created keyword-based filtering system with regex support',
    'Built modular architecture for easy maintenance and updates'
  ],
  results: [
    'Successfully manages multiple accounts without conflicts',
    '10+ stars on GitHub with active community',
    'Efficient message processing with minimal resource usage',
    'MIT License for open-source collaboration'
  ],
  screenshots: [],
  videoUrl: undefined,
  tags: ['telegram', 'automation', 'multi-account', 'monitoring', 'telethon'],
  difficulty: 'advanced',
  timeSpent: '2 weeks',
  client: 'Open Source',
  industry: 'Social Media Management'
}

export default telegramPanel
