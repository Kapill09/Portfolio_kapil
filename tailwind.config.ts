import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          start: 'hsl(var(--sky-start))',
          end: 'hsl(var(--sky-end))',
        },
        cloud: {
          white: 'hsl(var(--cloud-white))',
          border: 'hsl(var(--cloud-border))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          hover: 'hsl(var(--accent-hover))',
          soft: 'hsl(var(--accent-soft))',
        },
        warm: 'hsl(var(--warm-glow))',
        success: 'hsl(var(--success))',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        cloud: 'var(--shadow-cloud)',
        'cloud-hover': 'var(--shadow-cloud-hover)',
        float: 'var(--shadow-float)',
        glow: 'var(--shadow-glow)',
      },
      animation: {
        'cloud-drift': 'cloud-drift 25s ease-in-out infinite',
        'cloud-drift-reverse': 'cloud-drift-reverse 30s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-rise': 'fade-rise 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'moon-glow': 'moon-glow 6s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
