/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper & ink design system
        paper:          '#f4f1ea',   // page background — warm cream
        'paper-2':      '#ebe6da',   // card/input surfaces
        line:           '#d8d2c4',   // borders / dividers
        ink:            '#1a1916',   // primary text — warm near-black
        soft:           '#7d7768',   // muted / secondary text
        accent:         '#3d5a3d',   // forest green — primary accent
        'accent-soft':  '#e3ebe1',   // accent tint backgrounds
        miss:           '#9a4d3f',   // terracotta — error / destructive
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body:    ['"Newsreader"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out forwards',
        'slide-up': 'slideUp 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-100%) translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(-100%)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
