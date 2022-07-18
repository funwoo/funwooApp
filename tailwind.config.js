const BaseSpacing = 16;
const fontSizeWithLineHeight = f => [`${f}rem`, `${f * 1.75}rem`];

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textShadow: {
      default: '0 0 4px #000',
    },
    fontSize: {
      xs: fontSizeWithLineHeight('.75'),
      sm: fontSizeWithLineHeight('.875'),
      base: fontSizeWithLineHeight('1'),
      lg: fontSizeWithLineHeight('1.125'),
      xl: fontSizeWithLineHeight('1.25'),
      '2xl': fontSizeWithLineHeight('1.5'),
      '3xl': fontSizeWithLineHeight('1.875'),
      '4xl': fontSizeWithLineHeight('2.25'),
      '5xl': fontSizeWithLineHeight('3'),
      '6xl': fontSizeWithLineHeight('4'),
    },
    screens: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
    colors: {
      white: '#ffffff',
      gray50: '#fafafa',
      gray100: '#f5f5f5',
      gray300: '#e0e0e0',
      gray500: '#9e9e9e',
      gray700: '#616161',
      gray800: '#424242',
      gray900: '#212121',
      black: '#000000',
      brand: '#ef7c41',
      gold: '#b49961',
    },
    fontFamily: {
      mono: ['Roboto', 'monospace'],
    },
    extend: {
      spacing: {
        xxs: 0.25 * BaseSpacing,
        xs: 0.5 * BaseSpacing,
        s: 0.75 * BaseSpacing,
        m: 1 * BaseSpacing,
        l: 1.25 * BaseSpacing,
        xl: 1.5 * BaseSpacing,
        '2xl': 2 * BaseSpacing,
        '3xl': 3 * BaseSpacing,
        '4xl': 4 * BaseSpacing,
        '5xl': 5 * BaseSpacing,
        '6xl': 6 * BaseSpacing,
        22: '5.5rem',
        100: '25rem',
        128: '32rem',
        144: '36rem',
        fontFamily: {
          sans: ['NotoSansTC-Regular'],
          'sans-m': ['NotoSansTC-Medium'],
          'sans-b': ['NotoSansTC-Bold'],
        },
        colors: {
          origin: 'rgb(239, 124, 65)',
          brandGold: 'rgb(180,153,97)',
          windowsBlue: 'rgba(49, 130, 206)',
          gray50: 'rgba(250, 250, 250)',
          gray100: 'rgba(245, 245, 245)',
          gray300: 'rgba(224, 224, 224)',
          gray500: 'rgba(158, 158, 158)',
          gray700: 'rgba(97, 97, 97)',
          gray900: 'rgba(33, 33, 33)',
        },
        borderRadius: {
          extreme: '999px',
        },
        borderRadius: {},
      },
      boxShadow: {
        dropdown: '0px 4px 16px rgba(0, 0, 0, 0.12)',
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('tailwindcss-textshadow')],
  },
};
