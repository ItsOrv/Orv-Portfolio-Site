import type { Project } from '../../types/project'

export const cybersecurityDashboard: Project = {
  id: 'cybersecurity-dashboard',
  title: 'Cybersecurity Monitoring Dashboard',
  description: 'A real-time cybersecurity monitoring dashboard that provides comprehensive threat detection, vulnerability assessment, and security analytics. Built with modern web technologies and integrated with various security tools.',
  shortDescription: 'Real-time cybersecurity monitoring and threat detection dashboard',
  image: '/images/projects/cybersecurity-dashboard.jpg',
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebSocket', 'D3.js', 'Chart.js'],
  category: 'cybersecurity',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/cybersecurity-dashboard',
  liveUrl: 'https://security.example.com',
  startDate: '2024-02-01',
  endDate: '2024-04-15',
  team: ['Orv (Full-Stack Developer)', 'Security Analyst'],
  challenges: [
    'Real-time threat detection and alerting',
    'Processing large volumes of security logs',
    'Creating intuitive visualizations for complex data',
    'Ensuring system security and compliance'
  ],
  solutions: [
    'Implemented WebSocket connections for real-time updates',
    'Used MongoDB with optimized indexing for log processing',
    'Created interactive charts with D3.js and Chart.js',
    'Implemented role-based access control and audit logging'
  ],
  results: [
    'Detected 99.5% of security threats in real-time',
    'Reduced incident response time by 70%',
    'Improved security team efficiency by 50%',
    'Achieved SOC 2 compliance'
  ],
  screenshots: [
    '/images/projects/cybersecurity-dashboard/overview.jpg',
    '/images/projects/cybersecurity-dashboard/threats.jpg',
    '/images/projects/cybersecurity-dashboard/analytics.jpg'
  ],
  tags: ['cybersecurity', 'monitoring', 'dashboard', 'react', 'real-time', 'threat-detection'],
  difficulty: 'advanced',
  timeSpent: '2.5 months',
  client: 'Security Company',
  industry: 'Cybersecurity'
}
