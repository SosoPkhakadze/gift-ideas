import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6A0DAD',
        'dark-mode-black': '#111111',
        'purple-glow': '#9D4EDD',
        'light-purple': '#E0AAFF',
      },
      fontFamily: {
        lato: ['var(--font-lato)', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #6A0DAD, 0 0 10px #6A0DAD' },
          '100%': { boxShadow: '0 0 10px #6A0DAD, 0 0 20px #6A0DAD, 0 0 30px #6A0DAD' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config