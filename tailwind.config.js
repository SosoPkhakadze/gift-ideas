/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6A0DAD',
        'dark-mode-black': '#111111',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        cinzel: ['"Cinzel Decorative"', 'cursive'],
      },
    },
  },
  plugins: [],
};