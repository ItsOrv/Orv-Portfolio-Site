import type { Project } from '../../types/project'

export const aiAutomationTool: Project = {
  id: 'ai-automation-tool',
  title: 'AI-Powered Automation Tool',
  description: 'An intelligent automation platform that uses machine learning to automate repetitive tasks across various applications. Features include natural language processing, workflow optimization, and predictive analytics.',
  shortDescription: 'Intelligent automation platform with ML-powered task optimization',
  image: '/images/projects/ai-automation-tool.jpg',
  technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
  category: 'ai-ml',
  status: 'in-progress',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/ai-automation-tool',
  startDate: '2024-03-01',
  team: ['Orv (Full-Stack Developer & AI Engineer)'],
  challenges: [
    'Implementing accurate natural language processing',
    'Creating flexible workflow automation',
    'Optimizing ML model performance',
    'Ensuring cross-platform compatibility'
  ],
  solutions: [
    'Used transformer-based models for NLP tasks',
    'Implemented modular workflow engine',
    'Optimized models with TensorFlow Lite',
    'Created universal API for cross-platform integration'
  ],
  results: [
    'Automated 80% of repetitive tasks',
    'Reduced manual work time by 65%',
    'Achieved 95% accuracy in task recognition',
    'Improved workflow efficiency by 70%'
  ],
  screenshots: [
    '/images/projects/ai-automation-tool/dashboard.jpg',
    '/images/projects/ai-automation-tool/workflow.jpg',
    '/images/projects/ai-automation-tool/analytics.jpg'
  ],
  tags: ['ai', 'automation', 'machine-learning', 'nlp', 'workflow', 'python'],
  difficulty: 'advanced',
  timeSpent: '3 months (ongoing)',
  client: 'Tech Startup',
  industry: 'Artificial Intelligence'
}
