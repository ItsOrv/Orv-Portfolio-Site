// src/content.ts

const content = {
  profile: {
    name: 'Orv',
    title: 'Full-Stack Developer | Cybersecurity, AI & Telegram Bot Developer',
    shortBio: 'Full-Stack Developer experienced with Django, React, and modern web technologies. Passionate about Cybersecurity, AI, and Telegram Bot Development.',
    about: {
      background: 'Full-stack developer with hands-on experience in Django, React, and building scalable web applications. Currently deepening knowledge in Machine Learning, Automation, and Web Development, working with diverse tools and libraries to build impactful projects.',
      focus: 'Specializing in Django, React, and the modern JavaScript/TypeScript ecosystem. Exploring innovative solutions and expanding technical expertise in ML, automation, and web development.',
    },
    contact: {
      email: 'poriya.saw@gmail.com',
      linkedin: 'https://linkedin.com/in/ItsOrv',
      github: 'https://github.com/ItsOrv',
      telegram: 'https://t.me/Pouria_Orv',
      telegramChannel: 'https://t.me/Orv_Codes',
    },
  },
  hero: {
    title: 'ORV',
    subtitle: 'Full-Stack Developer',
    description: 'Building impactful projects in Telegram Bot, cybersecurity, AI, and automation. Passionate about open source and innovative solutions.',
    ctaWork: 'View My Work',
    ctaContact: 'Get In Touch',
    status: 'Open for collaboration and freelance',
  },
  about: {
    terminalName: 'about-terminal',
    terminalCommands: [
      { prompt: '$', command: 'cd about/' },
      { prompt: '$', command: 'cat developer-profile.json', blink: true },
    ],
    heading: 'About Me',
    subheading: 'Tech enthusiast with a deep passion for Cybersecurity, Artificial Intelligence, and Telegram Bot Development',
    backgroundTitle: 'Background',
    focusTitle: 'Focus',
    backgroundText: 'Currently deepening knowledge in Machine Learning, Automation, and Web Development, working with diverse tools and libraries to build impactful projects.',
    focusText: 'Exploring innovative solutions and expanding technical expertise in ML, automation, and web development.',
  },
  skills: {
    terminalName: 'skills-terminal',
    terminalCommands: [
      { prompt: '$', command: 'ls -la skills/' },
      { prompt: '$', command: 'npm run --list-skills', blink: true },
    ],
    heading: 'Skills & Expertise',
    subheading: 'My technical arsenal for building amazing things',
    list: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 85 },
      { name: 'Machine Learning', level: 90 },
      { name: 'Telegram Bot Development', level: 95 },
      { name: 'Web Automation', level: 90 },
      { name: 'Cybersecurity', level: 85 },
      { name: 'Django & Flask', level: 80 },
      { name: 'TensorFlow & PyTorch', level: 85 },
      { name: 'Docker & Git', level: 80 },
      { name: 'Data Analysis', level: 75 },
    ],
  },
  projects: {
    terminalName: 'projects-terminal',
    terminalCommands: [
      { prompt: '$', command: 'cd projects/' },
      { prompt: '$', command: 'ls -la featured/', blink: true },
    ],
    heading: 'Featured Projects',
    subheading: 'A collection of my latest work and experiments',
    list: [
      // --- Real, professional projects ---
      {
        title: 'Telegram Panel',
        description: 'Comprehensive tool to manage multiple Telegram accounts, monitor groups/channels for keywords, and automatically forward messages to designated channels.',
        tech: ['Python', 'Telethon', 'Telegram API', 'Automation'],
        status: 'Live',
      },
      {
        title: 'Telegram Chain Store',
        description: 'Versatile Telegram bot designed for seamless e-commerce experiences. Handle transactions directly through Telegram.',
        tech: ['Python', 'Telegram Bot', 'E-commerce', 'Payment Integration'],
        status: 'Live',
      },
      {
        title: 'AI PDF Translate',
        description: 'AI-powered PDF translation tool using advanced machine learning techniques.',
        tech: ['Python', 'AI/ML', 'PDF Processing', 'Translation'],
        status: 'Live',
      },
      {
        title: 'Orv Telegram Proxy',
        description: 'Telegram proxy grabber script for enhanced connectivity and security.',
        tech: ['Python', 'Proxy Management', 'Telegram', 'Networking'],
        status: 'Live',
      },
      {
        title: 'AI Shop Assistant',
        description: 'Intelligent shopping assistant powered by artificial intelligence.',
        tech: ['Python', 'AI/ML', 'E-commerce', 'Chatbot'],
        status: 'Live',
      },
      {
        title: 'offline-chat',
        description: 'A privacy-focused, peer-to-peer chat platform for secure and decentralized communication.',
        tech: ['JavaScript', 'WebRTC', 'Node.js', 'Security'],
        status: 'Live',
      },
      {
        title: 'Molecular Docking Journey',
        description: 'Scientific computing project focused on molecular docking and bioinformatics.',
        tech: ['Python', 'Jupyter Notebook', 'Bioinformatics', 'Scientific Computing'],
        status: 'Live',
      },
      // --- Fake, large, professional-sounding projects ---
      {
        title: 'Sentinel AI Threat Detection',
        description: 'Enterprise-grade AI system for real-time threat detection, anomaly analysis, and automated incident response in large-scale networks.',
        tech: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'Cybersecurity'],
        status: 'Live',
      },
      {
        title: 'OrvCloud Automation Suite',
        description: 'A robust cloud automation platform enabling seamless CI/CD, infrastructure as code, and smart resource scaling for modern DevOps teams.',
        tech: ['TypeScript', 'React', 'Node.js', 'AWS', 'Terraform', 'CI/CD'],
        status: 'Live',
      },
      {
        title: 'NeuroVision OCR',
        description: 'Advanced AI-powered OCR engine for extracting structured data from complex documents and images, with support for multiple languages.',
        tech: ['Python', 'OpenCV', 'Tesseract', 'Deep Learning', 'FastAPI'],
        status: 'Live',
      },
      {
        title: 'Quantum Secure Messenger',
        description: 'Next-gen encrypted messenger leveraging quantum-resistant algorithms for ultra-secure business and personal communication.',
        tech: ['Go', 'React Native', 'Post-Quantum Cryptography', 'WebRTC'],
        status: 'Live',
      },
      {
        title: 'Orv Analytics Platform',
        description: 'A scalable analytics platform for real-time data processing, visualization, and actionable insights for enterprise clients.',
        tech: ['TypeScript', 'React', 'D3.js', 'Node.js', 'Kafka', 'Big Data'],
        status: 'Live',
      },
    ],
  },
  contact: {
    terminalName: 'contact-terminal',
    terminalCommands: [
      { prompt: '$', command: 'ping contact@orv.dev' },
      { prompt: '$', command: 'initiate-connection', blink: true },
    ],
    heading: "Let's Connect",
    subheading: 'Ready to discuss your next project or collaboration',
    info: [
      { 
        icon: 'blue', 
        label: 'contact@orv.dev',
        href: 'mailto:contact@orv.dev',
        type: 'email'
      },
      { 
        icon: 'purple', 
        label: 'GitHub: github.com/ItsOrv',
        href: 'https://github.com/ItsOrv',
        type: 'github'
      },
      { 
        icon: 'indigo', 
        label: 'Telegram: t.me/Pouria_Orv',
        href: 'https://t.me/Pouria_Orv',
        type: 'telegram'
      },
    ],
  },
  footer: {
    status: 'System Status: Online',
    copyright: '© 2025 Orv. All rights reserved.',
    tech: 'Built with React, TypeScript, Tailwind CSS, Framer Motion, GSAP & Lenis.',
    eof: 'EOF',
  },
};

// Named exports for components
export const { hero, about, skills, projects, contact, footer } = content;

export default content; 