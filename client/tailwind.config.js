/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f0f0f',
          gold: '#d4af37',
          beige: '#f5f5f5',
          cream: '#faf9f6',
          charcoal: '#2C2C2C',
        },
        primary: '#0f0f0f',
        secondary: '#d4af37',
        accent: '#f5f5f5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'luxury': '16px',
      },
      boxShadow: {
        'gold-glow': '0 4px 20px rgba(212, 175, 55, 0.15)',
      }
    },
  },
  plugins: [],
}
