/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37', // Musa standard gold
          light: '#f7e499',
          400: '#e5c45b',
          500: '#D4AF37',
          600: '#b89a2e',
        },
        red: {
          DEFAULT: '#FF2E2E',
          400: '#ff5252',
          500: '#FF2E2E',
          600: '#e52626',
        },
        black: '#000000',
        surface: '#111111',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        cta: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'urgency': 'urgency 1.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 4px 25px rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 8px 35px rgba(255, 215, 0, 0.6)' },
        },
        urgency: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
    },
  },
  plugins: [],
};
