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
    status: 'Open for collaboration :)',
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
  },
  contact: {
    terminalName: 'contact-terminal',
    terminalCommands: [
      { prompt: '$', command: 'ping poriya.saw@gmail.com' },
      { prompt: '$', command: 'initiate-connection', blink: true },
    ],
    heading: "Let's Connect",
    subheading: 'Ready to discuss your next project or collaboration',
    info: [
      { 
        icon: 'blue', 
        label: 'poriya.saw@gmail.com',
        href: 'mailto:poriya.saw@gmail.com',
        type: 'email',
        description: 'Send me an email'
      },
      { 
        icon: 'purple', 
        label: 'github.com/ItsOrv',
        href: 'https://github.com/ItsOrv',
        type: 'github',
        description: 'Follow me on GitHub'
      },
      { 
        icon: 'indigo', 
        label: 't.me/Pouria_Orv',
        href: 'https://t.me/Pouria_Orv',
        type: 'telegram',
        description: 'Chat on Telegram'
      },
      { 
        icon: 'green', 
        label: 't.me/Orv_Codes',
        href: 'https://t.me/Orv_Codes',
        type: 'telegramChannel',
        description: 'Join my coding channel'
      },
    ],
  },
  footer: {
    status: 'System Status: Online',
    copyright: '© 2025 Orv. All rights reserved.',
    tech: 'Built with React, TypeScript, Tailwind CSS, Framer Motion, GSAP & Lenis.',
    eof: 'EOF',
  },
}

export const { hero, about, skills, projects, contact, footer } = content
export default content 