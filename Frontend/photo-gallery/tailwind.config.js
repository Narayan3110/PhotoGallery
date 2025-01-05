/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFC0CB', // Coral - A vibrant, modern primary color
        secondary: '#E6A8D7', // Aqua Blue - A calming secondary color
        accent: '#A8D5BA', // Lemon Yellow - A cheerful accent color
        text: '#333333', // Deep Navy - Sophisticated and elegant text color
        background: '#EFEEE6', // Light Gray - Neutral and clean background
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Clean and professional sans-serif font
        heading: ['Poppins', 'sans-serif'], // Modern and stylish font for headings
      },
      spacing: {
        18: '4.5rem', // Custom spacing for unique layouts
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      borderRadius: {
        xl: '1rem', // Extra-large radius for a soft, modern look
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', // Custom shadow for card elements
      },
    },
  },
  plugins: [forms, typography],
};
