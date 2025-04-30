/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff3b3b',
          600: '#ed1515',
          700: '#c80d0d',
          800: '#a50f0f',
          900: '#881414',
        },
        pastel: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        soft: {
          pink: '#FFB6C1',
          peach: '#FFDAB9',
          lavender: '#E6E6FA',
          mint: '#98FB98',
          sky: '#87CEEB',
          coral: '#FF7F50',
          cream: '#FFF5E6',
          rose: '#FFE4E1',
          gold: '#FFD700',
          pearl: '#F5F5F5',
          mist: '#E0F7FA',
          blush: '#FFE4E8',
        }
      },
      fontFamily: {
        'pixel': ['VT323', 'monospace'],
        'dyslexia': ['OpenDyslexic', 'Comic Sans MS', 'cursive'],
        'regular': ['Nunito', 'sans-serif'],
      },
      animation: {
        'pixel-bounce': 'pixel-bounce 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pixel-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(255, 182, 193, 0.5)',
        'inner-glow': 'inset 0 0 10px rgba(255, 182, 193, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 