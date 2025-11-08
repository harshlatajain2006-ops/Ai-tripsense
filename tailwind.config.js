/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          sky: '#48AFF7',
          sunrise: '#FFBC5E',
          white: '#F7FAFC',
          jade: '#58C9B9',
          clay: '#A67C52',
          charcoal: '#232B2B',
        },
        dark: {
          navy: '#18355E',
          sunset: '#FF8040',
          slate: '#20232A',
          turquoise: '#00C9A7',
          gold: '#FFD700',
          mist: '#FAFAFA',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
