import type { Project } from '../../types/project'

const aiPdfTranslate: Project = {
  id: 'ai-pdf-translate',
  title: 'AI PDF Translator',
  shortDescription: 'Intelligent PDF translation tool using AI to accurately translate documents while preserving formatting and layout.',
  description: 'AI PDF Translator is an advanced document translation system that leverages artificial intelligence to provide accurate translations of PDF documents. The tool maintains the original formatting, layout, and structure while translating content between multiple languages. It features OCR capabilities for scanned documents, context-aware translation, and batch processing for multiple documents.',
  image: '/images/ai-pdf-translate.jpg',
  technologies: ['Python', 'AI/ML', 'OCR', 'PDF Processing', 'Translation API', 'Computer Vision'],
  category: 'ai-ml',
  status: 'completed',
  featured: true,
  githubUrl: 'https://github.com/ItsOrv/Ai-PDF-Translate',
  liveUrl: undefined,
  demoUrl: undefined,
  startDate: '2025-09-01',
  endDate: '2025-09-18',
  team: ['ItsOrv'],
  challenges: [
    'Preserving PDF formatting during translation process',
    'Handling complex layouts and multi-column documents',
    'Implementing accurate OCR for scanned documents',
    'Managing large file processing efficiently'
  ],
  solutions: [
    'Used advanced PDF parsing libraries to maintain structure',
    'Implemented AI-powered layout analysis and reconstruction',
    'Integrated multiple OCR engines for better text recognition',
    'Created batch processing system with progress tracking'
  ],
  results: [
    'Accurate translation with preserved document formatting',
    'Support for multiple languages and document types',
    'Efficient processing of large documents and batch operations',
    'User-friendly interface with drag-and-drop functionality'
  ],
  screenshots: [],
  videoUrl: undefined,
  tags: ['ai', 'translation', 'pdf', 'ocr', 'document-processing', 'machine-learning'],
  difficulty: 'advanced',
  timeSpent: '2 weeks',
  client: 'Open Source',
  industry: 'Document Processing'
}

export default aiPdfTranslate
