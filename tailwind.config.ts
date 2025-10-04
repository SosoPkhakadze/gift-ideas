import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-purple': '#6A0DAD',
        'dark-mode-black': '#121212',
        'purple-glow': '#9D4EDD',
        'light-purple': '#E0AAFF',
      },
      backgroundImage: {
        'radial-light': 'radial-gradient(circle at top, #f3f4f6, #ffffff)',
        'radial-dark': 'radial-gradient(circle at top, #1f2937, #121212)',
      },
      // ADD THE NEW ANIMATION HERE
      animation: {
        'background-pan': 'background-pan 15s linear infinite',
      },
      keyframes: {
        // AND THE NEW KEYFRAMES HERE
        'background-pan': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '-200% -200%' },
        },
      },
    },
  },
  plugins: [],
}

export default config