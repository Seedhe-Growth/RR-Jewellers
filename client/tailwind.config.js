/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          beige: '#F8F5F2',
          gold: '#D4AF37',
          charcoal: '#2C2C2C',
          cream: '#FFFDFB',
        },
        primary: '#F8F5F2',
        secondary: '#D4AF37',
        accent: '#2C2C2C',
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
