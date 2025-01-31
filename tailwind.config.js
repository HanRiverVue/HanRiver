/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          5: '#F2F2F2',
          10: '#E7E7E7',
          15: '#DADADA',
          20: '#CECECE',
          30: '#B6B6B6',
          40: '#9D9D9D',
          50: '#858585',
          60: '#6C6C6C',
          70: '#545454',
          80: '#3B3B3B',
          90: '#232323',
          100: '#0A0A0A',
        },
        primary: {
          1: '#1F2937',
          2: '#183F96',
          3: '#4BAFFF',
          4: '#90CAF9',
          5: '#DBEAFE',
          hover: '#364861',
        },
        secondary: {
          1: '#E3F2FD',
          2: '#F5F9FF',
          3: '#F8FAFC',
        },
        accent: {
          error: '#EB2525',
        },
      },
      fontFamily: {
        jalnan: ['yg-jalnan', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      dropShadow: {
        'post-editor-shadow': '0 0 8px rgba(0, 0, 0, 0.11)',
      },
    },
  },
  plugins: [],
};
