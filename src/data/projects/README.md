# Project Management System

This directory contains all project data for the portfolio website. Each project is defined in its own TypeScript file following a consistent structure.

## Adding a New Project

To add a new project to the portfolio:

### 1. Create a new project file

Create a new file in this directory with the naming convention: `project-name.ts`

Example: `my-awesome-project.ts`

### 2. Define the project data

Use the following template:

```typescript
import { Project } from '../../types/project'

export const myAwesomeProject: Project = {
  id: 'my-awesome-project',
  title: 'My Awesome Project',
  description: 'A detailed description of your project. This should be comprehensive and explain what the project does, its purpose, and key features.',
  shortDescription: 'A brief description for the project cards',
  image: '/images/projects/my-awesome-project.jpg',
  technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  category: 'web-development', // or 'telegram-bot', 'cybersecurity', 'ai-ml'
  status: 'completed', // 'completed', 'in-progress', or 'planned'
  featured: true, // Set to true to show in featured projects
  githubUrl: 'https://github.com/username/repo',
  liveUrl: 'https://your-project.com',
  demoUrl: 'https://demo.your-project.com', // Optional
  startDate: '2024-01-01',
  endDate: '2024-03-01', // Optional for ongoing projects
  team: ['Your Name (Role)'], // Optional
  challenges: [
    'Challenge 1 description',
    'Challenge 2 description',
    // Add more challenges
  ],
  solutions: [
    'Solution 1 description',
    'Solution 2 description',
    // Add corresponding solutions
  ],
  results: [
    'Result 1 with metrics',
    'Result 2 with metrics',
    // Add more results
  ],
  screenshots: [
    '/images/projects/my-awesome-project/screenshot1.jpg',
    '/images/projects/my-awesome-project/screenshot2.jpg',
    // Add more screenshots
  ],
  videoUrl: 'https://youtube.com/watch?v=example', // Optional
  tags: ['tag1', 'tag2', 'tag3'],
  difficulty: 'intermediate', // 'beginner', 'intermediate', or 'advanced'
  timeSpent: '2 months',
  client: 'Client Name', // Optional
  industry: 'Industry Name' // Optional
}
```

### 3. Export the project

Add your project to the exports in `index.ts`:

```typescript
// Import your project
import { myAwesomeProject } from './my-awesome-project'

// Add to projects array
export const projects: Project[] = [
  telegramBotManager,
  cybersecurityDashboard,
  aiAutomationTool,
  myAwesomeProject // Add your project here
]

// Export individually
export { telegramBotManager, cybersecurityDashboard, aiAutomationTool, myAwesomeProject }
```

### 4. Add project images

Create a directory for your project images:
- `public/images/projects/my-awesome-project.jpg` (main project image)
- `public/images/projects/my-awesome-project/screenshot1.jpg`
- `public/images/projects/my-awesome-project/screenshot2.jpg`

## Project Categories

Available categories:
- `telegram-bot`: Telegram bot development
- `cybersecurity`: Security-related projects
- `ai-ml`: Artificial Intelligence and Machine Learning
- `web-development`: Web applications and websites

## Project Status

- `completed`: Finished projects
- `in-progress`: Currently being developed
- `planned`: Future projects

## Featured Projects

Set `featured: true` to display the project in the main projects section. Only featured projects are shown on the homepage.

## Automatic Detection

The system automatically:
- Detects new project files in this directory
- Generates project detail pages at `/project/{id}`
- Updates the projects section with new featured projects
- Creates navigation links to project pages

## Best Practices

1. **Descriptions**: Write clear, detailed descriptions that explain the project's purpose and value
2. **Technologies**: List all major technologies used
3. **Challenges & Solutions**: Provide real challenges faced and how they were solved
4. **Results**: Include measurable outcomes and metrics
5. **Images**: Use high-quality screenshots and project images
6. **Tags**: Use relevant tags for better categorization
7. **Consistency**: Follow the same structure and naming conventions

## File Structure

```
src/data/projects/
├── README.md (this file)
├── index.ts (exports and helper functions)
├── telegram-bot-manager.ts
├── cybersecurity-dashboard.ts
├── ai-automation-tool.ts
└── your-new-project.ts
```
