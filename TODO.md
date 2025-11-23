# Project TODO and Known Issues

This document tracks incomplete features, known issues, and remaining work for the Orv Portfolio project.

## Incomplete Features

### Project Showcase
- [ ] Project images and screenshots need to be added to `public/images/projects/`
- [ ] Some projects have empty screenshot arrays that need to be populated
- [ ] Project detail modal could be enhanced with image galleries
- [ ] Video embeds for projects with videoUrl are not yet implemented

### Content Management
- [ ] Some projects in `src/content.ts` are marked as placeholders and need real project data
- [ ] Project descriptions in content.ts may not match the detailed project files in `src/data/projects/`
- [ ] Contact email in content.ts (contact@orv.dev) differs from profile email (poriya.saw@gmail.com) - needs consistency

### Testing
- [ ] Test coverage is incomplete - many components lack unit tests
- [ ] Integration tests for user interactions are missing
- [ ] E2E tests with Playwright are not yet implemented

### Performance
- [ ] Service Worker for offline functionality is planned but not implemented
- [ ] Critical CSS inlining could be optimized further
- [ ] Image optimization pipeline needs to be set up (WebP conversion, responsive images)

### Accessibility
- [ ] Some components may need additional ARIA labels
- [ ] Keyboard navigation could be improved in project modals
- [ ] Screen reader testing needs to be performed

### SEO
- [ ] Meta tags and Open Graph tags need to be added
- [ ] Structured data (JSON-LD) for projects is not implemented
- [ ] Sitemap generation is not automated

### Analytics
- [ ] Analytics integration is mentioned in PERFORMANCE.md but not implemented
- [ ] Performance monitoring utilities referenced in codebase are not present

## Known Issues

### Technical Debt
- [ ] Some project data files use different export patterns (default vs named exports)
- [ ] Type definitions could be more comprehensive
- [ ] Error boundaries may need more robust error handling

### UI/UX
- [ ] Mobile menu animations could be smoother
- [ ] Background music controls could be more prominent
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

