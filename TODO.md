# Project TODO and Known Issues

This document tracks incomplete features, known issues, and remaining work for the Orv Portfolio project.

## Incomplete Features

### Project Showcase
- [ ] Project images and screenshots need to be added to `public/images/projects/`
- [ ] Some projects have empty screenshot arrays that need to be populated
- [x] Project detail modal could be enhanced with image galleries - FIXED: Added screenshot gallery with navigation
- [x] Video embeds for projects with videoUrl are not yet implemented - FIXED: Added YouTube video embed support

### Content Management
- [x] Some projects in `src/content.ts` are marked as placeholders and need real project data - FIXED: Removed fake/placeholder projects from content.ts
- [x] Project descriptions in content.ts may not match the detailed project files in `src/data/projects/` - FIXED: Removed unused projects.list from content.ts, ProjectsSection now uses data/projects exclusively
- [x] Contact email in content.ts (contact@orv.dev) differs from profile email (poriya.saw@gmail.com) - needs consistency - FIXED

### Testing
- [ ] Test coverage is incomplete - many components lack unit tests
- [ ] Integration tests for user interactions are missing
- [ ] E2E tests with Playwright are not yet implemented

### Performance
- [ ] Service Worker for offline functionality is planned but not implemented
- [ ] Critical CSS inlining could be optimized further
- [ ] Image optimization pipeline needs to be set up (WebP conversion, responsive images)

### Accessibility
- [x] Some components may need additional ARIA labels - FIXED: Added comprehensive ARIA labels throughout
- [x] Keyboard navigation could be improved in project modals - FIXED: Added keyboard navigation (Escape, Arrow keys) for project modals
- [ ] Screen reader testing needs to be performed

### SEO
- [x] Meta tags and Open Graph tags need to be added - FIXED: Already present in index.html
- [x] Structured data (JSON-LD) for projects is not implemented - FIXED: Added structured data for featured projects
- [ ] Sitemap generation is not automated

### Analytics
- [ ] Analytics integration is mentioned in PERFORMANCE.md but not implemented
- [ ] Performance monitoring utilities referenced in codebase are not present

## Known Issues

### Technical Debt
- [x] Some project data files use different export patterns (default vs named exports) - FIXED: All projects now use named exports
- [ ] Type definitions could be more comprehensive
- [x] Error boundaries may need more robust error handling - FIXED: Improved error handling with better logging and production considerations
- [x] Navigation links error handling - FIXED: Added proper error handling and cleanup for navigation event listeners
- [x] GSAP animation error handling - FIXED: Added try-catch blocks and fallbacks for GSAP animations
- [x] Empty array handling - FIXED: Added checks for empty arrays in all components
- [x] requestAnimationFrame memory leak - FIXED: Added proper cleanup with cancelAnimationFrame
- [x] SSR safety checks - FIXED: Added window/navigator checks to prevent SSR errors
- [x] BackgroundMusic responsive design - FIXED: Improved mobile responsiveness
- [x] CSS transition issues - FIXED: Removed problematic transition: none rules
- [x] Unused import in ProjectsSection - FIXED: Corrected projectsContent import usage

### UI/UX
- [x] Mobile menu animations could be smoother - FIXED: Improved animations with spring physics and hover effects
- [x] Background music controls could be more prominent - FIXED: Implemented full BackgroundMusic component with play/pause, volume control, and mute
- [ ] Terminal command animations might need performance tuning on low-end devices

### Documentation
- [ ] API documentation for component props is missing
- [ ] Architecture decision records (ADRs) would be beneficial
- [ ] Deployment scripts documentation could be more detailed

## Future Enhancements

### Features
- [ ] Blog section for technical articles
- [ ] Dark/light theme toggle
- [ ] Multi-language support (i18n)
- [ ] Project filtering and search functionality
- [ ] RSS feed generation

### Infrastructure
- [ ] CI/CD pipeline with automated testing
- [ ] Automated dependency updates (Dependabot)
- [ ] Automated performance monitoring
- [ ] Error tracking and reporting (Sentry integration)

### Content
- [ ] Add more detailed project case studies
- [ ] Include testimonials or recommendations
- [ ] Add a timeline view for career history
- [ ] Implement a contact form with backend integration

## Notes

- The project structure is well-organized but some areas need consolidation
- Performance optimizations are in place but can be further improved
- The codebase follows modern React patterns but could benefit from more comprehensive testing
- Documentation exists but some areas need expansion

## Contributing

If you're working on any of these items, please:
1. Create an issue or update this TODO list
2. Follow the contribution guidelines in CONTRIBUTING.md
3. Write tests for new features
4. Update documentation as needed

