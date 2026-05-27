/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0f0f1a',
          card: '#1a1a2e',
          border: '#2d2d4e',
          accent: '#7c3aed',
          gold: '#f59e0b',
          green: '#10b981',
          red: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
