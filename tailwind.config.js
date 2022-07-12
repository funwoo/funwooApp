/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
  content: ['./src/**/*.{js,ts,jsx,tsx}', './App.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NotoSansTC-Regular'],
        'sans-m': ['NotoSansTC-Medium'],
        'sans-b': ['NotoSansTC-Bold'],
      },
      colors: {
        origin: 'rgb(239, 124, 65)',
        windowsBlue: 'rgba(49, 130, 206)',
        gray50: 'rgba(250, 250, 250)',
        gray300: 'rgba(224, 224, 224)',
        gray500: 'rgba(158, 158, 158)',
        gray700: 'rgba(97, 97, 97)',
        gray900: 'rgba(33, 33, 33)',
      },
      borderRadius: {
        extreme: '999px',
      },
    },
  },
  plugins: [],
};
