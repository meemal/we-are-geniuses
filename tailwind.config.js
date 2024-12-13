/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        genius: {
          orange: '#FFB75E',
          coral: '#FF7E5F', 
          pink: '#ED4264',
          purple: '#6B2F68'
        }
      },
      backgroundImage: {
        'gradient-genius': 'linear-gradient(to bottom, #FFB75E, #FF7E5F, #ED4264, #6B2F68)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};