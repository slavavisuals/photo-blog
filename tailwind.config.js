module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {    
    extend: {
      fontFamily: {
        'nunito': ['Nunito'],
        'roboto': ['Roboto'],
      },
      screens: {
        '2xl': '1536px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
