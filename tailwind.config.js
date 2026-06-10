/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Noto Sans Bengali"', 'sans-serif'],
      },
      colors: {
        nctb: {
          green: '#047857',
          emerald: '#10b981',
          light: '#d1fae5',
        }
      }
    },
  },
  plugins: [],
}
