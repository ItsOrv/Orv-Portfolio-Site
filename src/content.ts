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
      email: 'idk',
      linkedin: '/in/ItsOrv',
      github: 'https://github.com/ItsOrv',
      telegram: 'https://t.me/Pouria_Orv',
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
        title: 'Molecular Docking Journey',
        description: 'Scientific computing project focused on molecular docking and bioinformatics.',
        tech: ['Python', 'Jupyter Notebook', 'Bioinformatics', 'Scientific Computing'],
        status: 'In Progress',
      },
      {
        title: 'AI Shop Assistant',
        description: 'Intelligent shopping assistant powered by artificial intelligence.',
        tech: ['Python', 'AI/ML', 'E-commerce', 'Chatbot'],
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
      { icon: 'blue', label: 'contact@orv.dev' },
      { icon: 'purple', label: 'GitHub: github.com/ItsOrv' },
      { icon: 'indigo', label: 'Telegram: t.me/Pouria_Orv' },
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