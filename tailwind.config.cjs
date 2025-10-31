const primeui = require('tailwindcss-primeui')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: ['selector', '[class~=my-app-dark]'],
  theme: {
    extend: {},
  },
  plugins: [
    primeui
  ],
}