import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        // STRICT PALETTE
        prussian: '#031130',
        salesport: '#185DF1',
        alice: '#F3F7FE',

        // Semantic tokens
        base: '#031130',
        primary: {
          DEFAULT: '#185DF1',
          hover: '#2A6EF5',
          glow: 'rgba(24, 93, 241, 0.4)',
        },
        highlight: '#F3F7FE',
        muted: 'rgba(243, 247, 254, 0.6)',
        card: {
          bg: 'rgba(3, 17, 48, 0.4)',
          border: 'rgba(243, 247, 254, 0.08)',
          hoverBorder: 'rgba(24, 93, 241, 0.5)',
        },

        // Legacy / Cyber mapped tokens to preserve system compatibility
        cyber: {
          bg: '#031130',
          surface: 'rgba(3, 17, 48, 0.5)',
          border: 'rgba(243, 247, 254, 0.08)',
          cyan: '#185DF1',
          cyanHover: '#2A6EF5',
          teal: '#185DF1',
          green: '#2A6EF5',
          text: '#F3F7FE',
          muted: 'rgba(243, 247, 254, 0.6)',
          track: '#031130',
        },
        sys: {
          bg: '#031130',
          surface: 'rgba(3, 17, 48, 0.5)',
          border: 'rgba(243, 247, 254, 0.08)',
          accent: '#185DF1',
          neonGreen: '#185DF1',
          textMain: '#F3F7FE',
          textMuted: 'rgba(243, 247, 254, 0.6)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 40px rgba(24, 93, 241, 0.15)',
        'btn-glow': '0 0 25px rgba(24, 93, 241, 0.5)',
        'glow-sm': '0 0 15px rgba(24, 93, 241, 0.25)',
        'glow-lg': '0 0 50px rgba(24, 93, 241, 0.35)',
        'neon': '0 0 40px rgba(24, 93, 241, 0.2)',
        'neon-glow': '0 0 20px rgba(24, 93, 241, 0.45)',
        'card': '0 8px 32px rgba(3, 17, 48, 0.6)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora-1': 'auroraOne 18s ease-in-out infinite alternate',
        'aurora-2': 'auroraTwo 22s ease-in-out infinite alternate',
        'aurora-3': 'auroraThree 26s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        auroraOne: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate3d(100px, -80px, 0) scale(1.15)', opacity: '0.85' },
          '100%': { transform: 'translate3d(-60px, 40px, 0) scale(0.95)', opacity: '0.7' },
        },
        auroraTwo: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1.1)', opacity: '0.5' },
          '50%': { transform: 'translate3d(-120px, 90px, 0) scale(0.9)', opacity: '0.75' },
          '100%': { transform: 'translate3d(80px, -50px, 0) scale(1.2)', opacity: '0.6' },
        },
        auroraThree: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(0.95)', opacity: '0.55' },
          '50%': { transform: 'translate3d(70px, 100px, 0) scale(1.25)', opacity: '0.8' },
          '100%': { transform: 'translate3d(-90px, -60px, 0) scale(1)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
