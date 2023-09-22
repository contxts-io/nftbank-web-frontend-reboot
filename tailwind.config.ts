import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };

function parseCustomColors(filePath:string) {
  const fs = require('fs');
  const content = fs.readFileSync(filePath, 'utf8');
  const colors:{[key: string]:string} = {};

  // 정규 표현식을 사용하여 CSS 변수를 추출하고 Tailwind CSS 컬러로 변환
  const colorRegex = /--color-([a-zA-Z0-9_-]+): var\(--color-([a-zA-Z0-9_-]+)-(\d+)\);/g;
  const color = parseGlobalTokenColors('./global_token_color.css');
  let match;
  while ((match = colorRegex.exec(content)) !== null) {
    const customColorName = match[1];
    const tailwindColorName = match[2] || '';
    const colorNumber = match[3];
    // 컬러 토큰에서 값을 가져옴
    const colorValue = color[`${tailwindColorName}-${colorNumber}`] || '';
    colors[customColorName] = colorValue;
  }
  return colors;
}
function parseGlobalTokenColors(filePath:string) {
  const fs = require('fs');
  const content = fs.readFileSync(filePath, 'utf8');
  const colors: { [key: string]: string } = {};
  const colorRegex = /--([a-zA-Z0-9_-]+): (.+?);/g;
  let match;
  while ((match = colorRegex.exec(content)) !== null) {
    const colorName = match[1];
    const colorValue = match[2];

    // 중복되지 않는 부분 제거 및 수정
    const modifiedColorName = colorName.replace(/^[a-zA-Z]+-/, '').replace('nb_blue-nb_blue', 'nb_blue');

    colors[modifiedColorName] = colorValue;
  }
  return colors;
}

export default {
  darkMode: 'class',
  purge: {
    enabled: true,
    content: ['./**/*.tsx'],
  },
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
          'from': {
            opacity: '0',
            transform: 'translate3d(0, 15%, 0)'
          },
          'to': {
            opacity: '1',
            transform: 'translateZ(0)'
          }
        },
        fadeOut: {
          'from': {
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
        ...parseGlobalTokenColors('./global_token_color.css'),
        light: { ...parseCustomColors('./semantic_token_light.css') },
        dark: { ...parseCustomColors('./semantic_token_dark.css') },
      },
    },
  },
  plugins: [],
} as Config;
