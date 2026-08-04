import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#aa3bff',
          light: '#c084fc',
          dark: '#7c3aed',
        },
      },
    },
  },
  plugins: [],
}

export default config
