const primeui = require('tailwindcss-primeui')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  // conforme a doc: usar a opção 'selector' com o seletor customizado
  darkMode: ['selector', '[class~=my-app-dark]'],
  theme: {
    extend: {},
  },
  plugins: [
    primeui
  ],
}