# Contributing to Orv Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ItsOrv/Orv-Site.git
cd Orv-Site
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── ErrorBoundary.tsx
│   ├── MobileMenu.tsx
│   └── ...
├── utils/              # Utility functions
│   ├── types.ts        # TypeScript type definitions
│   ├── analytics.ts    # Analytics and performance monitoring
│   └── typeSound.ts    # Audio utilities
├── test/               # Test files
│   ├── setup.ts
│   └── App.test.tsx
├── content.ts          # All customizable content
├── App.tsx            # Main application component
├── main.tsx           # React entry point
└── index.css          # Global styles and Tailwind
```

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript types
- Add accessibility attributes (ARIA labels, roles)
- Use lazy loading for performance
- Wrap components in ErrorBoundary when needed

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the existing design system
- Use CSS custom properties for theming
- Ensure responsive design
- Test on multiple screen sizes

### Testing

- Write tests for new components
- Use React Testing Library
- Test user interactions and accessibility
- Maintain good test coverage

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Performance

- Use lazy loading for components
- Optimize images and assets
- Minimize bundle size
- Monitor Core Web Vitals
- Use proper caching strategies

### Accessibility

- Add ARIA labels and roles
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios
- Use semantic HTML elements

## Content Management

All content is managed through `src/content.ts`. To update content:

1. Edit the content object in `content.ts`
2. Follow the existing structure
3. Use proper TypeScript types
4. Test changes in development

## Deployment

### GitHub Pages

```bash
npm run deploy
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your web server

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Run tests: `npm run test`
6. Run linting: `npm run lint`
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Pull Request Guidelines

- Provide a clear description of changes
- Include screenshots for UI changes
- Reference any related issues
- Ensure all tests pass
- Follow the existing code style

## Issue Reporting

When reporting issues:

1. Use the issue template
2. Provide clear reproduction steps
3. Include browser and device information
4. Add screenshots if applicable
5. Check for existing similar issues

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards
- Respect different opinions and approaches

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Contact

If you have questions about contributing:

- Open an issue for general questions
- Contact the maintainer for specific concerns
- Join discussions in the project's community

Thank you for contributing! 🚀
