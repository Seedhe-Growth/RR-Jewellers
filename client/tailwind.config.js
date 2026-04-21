/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f7f4f0', // Ivory/Soft Beige
          DEFAULT: '#d4af37', // Gold
          dark: '#b8860b', // Dark Gold
        },
        luxury: {
          black: '#0a0a0a',
          gold: '#c5a059',
          cream: '#f9f6f2',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f7ef8a 50%, #d4af37 100%)',
      }
    },
  },
  plugins: [],
}
