import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      borderWidth: px0_10 as any,
      fontSize: px0_100 as any,
      lineHeight: px0_100 as any,
      width: px0_400 as any,
      minWidth: px0_400 as any,
      maxWidth: px0_200 as any,
      minHeight: px0_200 as any,
      spacing: px0_200 as any,
      rotate: {
        '270': '270deg',
      },
      keyframes: {
        fadeIn: {
          'from' : {
            opacity: '0',
            transform: 'translate3d(0, 15%, 0)'
          },
          'to': {
            opacity: '1',
            transform:'translateZ(0)'
          }
        },
        fadeOut: {
          'from' : {
            opacity: '1',
          },
          'to': {
              opacity: '0'
          }
        }
      },
      
      animation: {
        fadeIn: 'fadeIn 1s',
        fadeOut: 'fadeOut 1s',
      },
      colors: {
        nb_blue: {
          50: '#EEEFFF',
          100: '#D7DAFF',
          200: '#979BFF',
          300: '#6C72FF',
          400: '#3B43FF',
          DEFAULT: '#3B43FF',
          500: '#2B31DB',
          600: '#1D22B7',
          700: '#121693',
          800: '#0B0D7A',
          900: '#030852',
          950: '#030852',
        },
      },
    },
  },
  plugins: [],
} as Config;
