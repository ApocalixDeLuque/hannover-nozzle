import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DB3300',
        dark: '#0B0604',
        tgray: '#8A8A8A',
        lightgray: '#DDDDDD',
        light: '#FFFFFF',
      },
      screens: {
        xs: '480px',
        xxs: '320px',
        '2xl': '1400px',
      },
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  /* plugins: [require('tailwindcss-animate')], */
};
export default config;
