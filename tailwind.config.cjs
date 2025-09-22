// tailwind.config.cjs
const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');
const sfTypography = require('@storefront-ui/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@storefront-ui/react/**/*.js',
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      heading: ['Arial', 'Georgia'],
    },
  },
  plugins: [sfTypography],
};
