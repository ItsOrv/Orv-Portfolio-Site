import type { Project, ProjectCategory } from '../../types/project'
import { telegramBotManager } from './telegram-bot-manager'
import { cybersecurityDashboard } from './cybersecurity-dashboard'
import { aiAutomationTool } from './ai-automation-tool'
import telegramPanel from './telegram-panel'
import telegramChainStore from './telegram-chain-store'
import aiPdfTranslate from './ai-pdf-translate'
import aiShopAssistant from './ai-shop-assistant'
import orvHub from './orv-hub'

// Export all projects
export const projects: Project[] = [
  telegramBotManager,
  cybersecurityDashboard,
  aiAutomationTool,
  telegramPanel,
  telegramChainStore,
  aiPdfTranslate,
  aiShopAssistant,
  orvHub
]

// Export individual projects
export { 
  telegramBotManager, 
  cybersecurityDashboard, 
  aiAutomationTool,
  telegramPanel,
  telegramChainStore,
  aiPdfTranslate,
  aiShopAssistant,
  orvHub
}

// Project categories
export const projectCategories: ProjectCategory[] = [
  {
    id: 'telegram-bot',
    name: 'Telegram Bot',
    description: 'Telegram bot development and management solutions',
    icon: 'Bot'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security monitoring and threat detection systems',
    icon: 'Shield'
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Artificial intelligence and machine learning applications',
    icon: 'Brain'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web applications and solutions',
    icon: 'Globe'
  }
]

// Helper functions
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category)
}

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return projects.filter(project => project.status === status)
}
