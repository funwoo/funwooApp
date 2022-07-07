/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NotoSansTC-Regular'],
        'sans-m': ['NotoSansTC-Medium'],
        'sans-b': ['NotoSansTC-Bold'],
      },
      colors: {
        gray50: 'rgba(250, 250, 250)',
        gray700: 'rgba(97, 97, 97)',
        gray900: 'rgba(33, 33, 33)',
      },
    },
  },
  plugins: [],
};
