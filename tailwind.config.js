/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      brightness: {
        20: '.20',
        175: '1.75',
      }
    },
    colors: {
      'dark': '#343338',
      'lightred': '#ef233c',
      'light': '#b9baa3',
      'grayish': '#bbbbbf',
      'darkred': '#a22c29',
      'white': '#ffffff',
      'logored': '#ED4CC2',
      'linkblue': "#0077b6"
    }
  },
  plugins: [],
}