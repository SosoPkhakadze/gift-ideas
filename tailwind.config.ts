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
        // Use 'Inter' as the primary font for everything.
        // The 'sans' key is the default font family in Tailwind.
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'primary-purple': '#6A0DAD',
        'dark-mode-black': '#121212', // A slightly softer black for dark mode
        'purple-glow': '#9D4EDD',
        'light-purple': '#E0AAFF',
      },
      backgroundImage: {
        // Define subtle radial gradients for a more interesting background
        'radial-light': 'radial-gradient(circle at top, #f3f4f6, #ffffff)',
        'radial-dark': 'radial-gradient(circle at top, #1f2937, #121212)',
      },
    },
  },
  plugins: [],
}

export default config