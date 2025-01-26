/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';



export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
  	extend: {
  		colors: {
  			primary: '#FFC0CB',
  			secondary: '#E6A8D7',
  			accent: '#A8D5BA',
  			text: '#333333',
  			background: '#EFEEE6'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'Arial',
  				'sans-serif'
  			],
  			heading: [
  				'Poppins',
  				'sans-serif'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'72': '18rem',
  			'84': '21rem',
  			'96': '24rem'
  		},
  		borderRadius: {
  			xl: '1rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
  		}
  	}
  },
  plugins: [forms, typography, require("tailwindcss-animate")],
};
