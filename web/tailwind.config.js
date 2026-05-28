/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        game: {
          bg:     'rgb(var(--color-bg) / <alpha-value>)',
          card:   'rgb(var(--color-card) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          gold:   'rgb(var(--color-gold) / <alpha-value>)',
          green:  'rgb(var(--color-green) / <alpha-value>)',
          red:    'rgb(var(--color-red) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
