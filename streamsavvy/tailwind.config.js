/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: '#E50914', // Netflix Red
        dark: '#141414',
        grayd: '#2b2b2b'
      },
    },
  },
  plugins: [],
}