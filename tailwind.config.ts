import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 20px rgba(34,211,238,.45)',
        gold: '0 0 22px rgba(250,204,21,.55)'
      }
    }
  },
  plugins: []
}

export default config
