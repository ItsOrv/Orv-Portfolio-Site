# Orv Portfolio

A modern, performance-optimized portfolio website built with React and TypeScript. Features a clean terminal-inspired design with smooth animations and a fully responsive layout.

## Screenshots

### Hero Section
![Hero Section](./docs/screenshots/hero.png)

### About Section
![About Section](./docs/screenshots/about.png)

### Skills Section
![Skills Section](./docs/screenshots/skills.png)

### Projects Section
![Projects Section](./docs/screenshots/projects.png)

### Contact Section
![Contact Section](./docs/screenshots/contact.png)

### Mobile View
![Mobile View](./docs/screenshots/mobile.png)

## Overview

This portfolio showcases professional work, skills, and projects with an emphasis on performance and user experience. Built with modern web technologies and best practices.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP with ScrollTrigger
- **Smooth Scrolling:** Lenis
- **Icons:** Lucide React
- **Testing:** Vitest, React Testing Library

## Features

- Terminal-inspired UI with macOS-style window headers
- Smooth scroll animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Performance optimized with lazy loading and code splitting
- Accessible components with ARIA labels
- SEO-friendly structure
- Background music with controls
- Project showcase with detailed information

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ItsOrv/Orv-Site.git
cd Orv-Site

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be generated in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── BackgroundMusic.tsx
│   ├── ErrorBoundary.tsx
│   └── MobileMenu.tsx
├── data/
│   └── projects/       # Project data files
├── types/              # TypeScript type definitions
├── test/               # Test files
├── content.ts          # Centralized content configuration
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run deploy` - Deploy to GitHub Pages

## Customization

All content is managed through `src/content.ts`. Update the following:

- Profile information and bio
- Skills and expertise levels
- Project details and descriptions
- Contact information and social links
- Section headings and terminal commands

Project data is organized in `src/data/projects/` with individual TypeScript files for each project.

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

### Other Platforms

The project can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Upload the `dist` directory to your hosting service
3. Configure your server to serve `index.html` for all routes (SPA routing)

## Performance

- Code splitting with lazy-loaded components
- Optimized bundle size with tree shaking
- Efficient animations with GSAP
- Smooth scrolling with Lenis
- Mobile-optimized with reduced animations on low-end devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for code formatting (via VS Code settings)

### Testing

Tests are written using Vitest and React Testing Library. Run tests with:

```bash
npm test
```

## License

This project is private and proprietary.

## Contact

- **Email:** poriya.saw@gmail.com
- **GitHub:** [@ItsOrv](https://github.com/ItsOrv)
- **LinkedIn:** [ItsOrv](https://linkedin.com/in/ItsOrv)
- **Telegram:** [@Pouria_Orv](https://t.me/Pouria_Orv)

---

Built with React, TypeScript, and modern web technologies.
