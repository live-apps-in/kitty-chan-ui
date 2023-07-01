/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lilita: 'Lilita One',
        rokkitt: 'Rokkitt',
      },
      colors: {
        kittyDarkGray: '#1f2229',
        kittyLightGray: '#262934',
        kittyTextGray: '#626670',
        kittyNeutralBlack: '#17181e',
        kittyFormBg: '#1f2229',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
