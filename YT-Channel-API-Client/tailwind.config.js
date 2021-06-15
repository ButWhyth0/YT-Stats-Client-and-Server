const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        maxRed: '#D62828',
        maxYellowRed: '#FCBF49',
        someGray: '#8C92AC',
        gray: colors.gray,
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '112': '27rem',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      boxShadow: ['active'],
    },
  },
  plugins: [
    plugin( ({ addComponents }) => {
      const boxes = {
        '.box': {
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'display': 'flex',
          'flex-direction': 'column',
        },
        '.box-padding': {
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
        },
        '.title': {
          color: 'rgba(102, 102, 102, var(--tw-text-opacity))',
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '700', 
        },
        '.body': {
          color: 'rgba(0, 0, 0, var(--tw-text-opacity))',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '300',
        },
      }

      addComponents(boxes)
    })
  ],
}
