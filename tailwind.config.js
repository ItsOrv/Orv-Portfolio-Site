/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Fira Code', 'IBM Plex Mono', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        'terminal-bg': '#0a0a0a',
        'terminal-fg': '#00ff00',
        'terminal-cyan': '#00ffff',
        'terminal-purple': '#ff00ff',
        'terminal-yellow': '#ffff00',
        'terminal-red': '#ff0000',
        'terminal-green': '#00ff00',
        'terminal-blue': '#0080ff',
        'neon-green': '#00ff41',
        'neon-cyan': '#00ffff',
        'neon-purple': '#ff00ff',
        'neon-blue': '#0080ff',
      },
      animation: {
        'blink': 'blink 1s infinite',
        'glitch': 'glitch 0.3s infinite',
        'scanline': 'scanline 2s linear infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 