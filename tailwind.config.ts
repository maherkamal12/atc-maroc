import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        // Deep engineering navy — trust, structure
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2f74c0',
          600: '#1f5fa4',
          700: '#1a4c84',
          800: '#143c69',
          900: '#0d2b4d',
          950: '#071a31',
        },
        // Energy gold — solar, electricity, warmth
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f5a623',
          600: '#d98410',
          700: '#b26309',
          800: '#8f4c0d',
          900: '#763f10',
        },
        eco: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        ink: {
          500: '#64748b',
          700: '#334155',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(7,26,49,.04), 0 8px 24px -8px rgba(7,26,49,.12)',
        card: '0 1px 3px rgba(7,26,49,.06), 0 12px 32px -12px rgba(7,26,49,.18)',
        lift: '0 24px 60px -24px rgba(7,26,49,.35)',
      },
      borderRadius: { '4xl': '2rem' },
      spacing: { 4.5: '1.125rem', 5.5: '1.375rem', 18: '4.5rem', 22: '5.5rem' },
      // `duration-400` is used by the mobile drawer and the FAQ accordion.
      transitionDuration: { 400: '400ms' },
      // Extra steps used by translucent surfaces (`bg-white/92`, `bg-white/97`).
      opacity: { 92: '0.92', 97: '0.97' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.12) translateY(-1.5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.9)', opacity: '.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .8s ease both',
        'ken-burns': 'ken-burns 18s ease-out both',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(.24,.6,.36,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
