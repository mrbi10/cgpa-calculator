// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode (e.g., <div class="dark">)
  theme: {
    extend: {
      fontFamily: {
        // Sets 'Inter' as the primary sans-serif font
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        // Custom colors for the glassy/techy theme
        gray: {
          900: '#0B0F19',
          800: '#171E2C',
          700: '#2A3343',
        },
        sky: {
          400: '#38BDF8',
          500: '#0EA5E9',
        }
      }
    },
  },
  plugins: [],
}