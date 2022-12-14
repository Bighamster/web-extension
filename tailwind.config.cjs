const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      height: {
        136: '34rem',
      },
    },
  },

  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ]
};
