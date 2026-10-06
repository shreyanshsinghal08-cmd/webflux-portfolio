/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#171229',
          surface: '#010D2A',
          border: '#073E91',
          cyan: '#00B8FF',
          cyanHover: '#0095CC',
          teal: '#0AD3C5',
          green: '#1BFF68',
          text: '#E0F9FF',
          muted: '#8AB4F8',
          track: '#0E1C38',
        },
        sys: {
          bg: '#171229',
          surface: '#010D2A',
          border: '#073E91',
          accent: '#00B8FF',
          neonGreen: '#1BFF68',
          textMain: '#E0F9FF',
          textMuted: '#8AB4F8',
        },
      },
      fontFamily: {
        heading: ['"Pathway Extreme"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 40px rgba(0, 184, 255, 0.15)',
        'neon-glow': '0 0 20px rgba(0, 184, 255, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
