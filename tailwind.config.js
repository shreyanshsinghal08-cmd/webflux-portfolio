/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        void: '#050505',
        surface: 'rgba(20, 20, 20, 0.6)',
        silver: '#E2E8F0',
        white: '#FFFFFF',

        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(255, 255, 255, 0.25)',
        },

        prussian: '#000000',
        salesport: '#FFFFFF',
        alice: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Inter', 'Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'bento': '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 20px 40px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'btn-white': '0 0 25px rgba(255, 255, 255, 0.25)',
      },
      backdropBlur: {
        'bento': '30px',
      },
    },
  },
  plugins: [],
};
