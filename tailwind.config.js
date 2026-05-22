/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette extracted from the provided mockups & logo
        brand: {
          bg: '#000000',              // pure black backdrop
          surface: '#0A0E11',         // card surface
          surfaceAlt: '#0D1418',      // alternate card surface
          border: '#0F2933',          // hairline border (teal-tinted)
          borderStrong: '#164154',    // stronger border on hover
          teal: '#3FB8C9',            // primary brand teal (logo cyan-teal)
          tealLight: '#5FD0DD',
          tealDark: '#1F8A9C',
          gold: '#C9A876',            // warm gold accent (logo highlight)
          goldLight: '#E6C99A',
          text: '#FFFFFF',
          textMuted: '#9BA5AD',
          textDim: '#6B7480',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(135deg, #3FB8C9 0%, #1F8A9C 100%)',
        'card-gradient': 'linear-gradient(180deg, #0A0E11 0%, #050709 100%)',
      },
      boxShadow: {
        'teal-glow': '0 0 30px rgba(63, 184, 201, 0.15)',
        'teal-glow-strong': '0 0 40px rgba(63, 184, 201, 0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
