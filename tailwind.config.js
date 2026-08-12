/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './constants.tsx', './posts.ts', './types.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Noto Sans KR'", 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};
