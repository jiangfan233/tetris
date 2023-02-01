/** @type {import('tailwindcss').Config} */
// const colors = require('tailwindcss/colors')

const { fontSize, screens } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontSize,screens},
    fontSize: {
      xxm: "0.5rem",
      xs: "0.75rem"
    },
    screens: {
      xs: "420px"
    }
  },
  plugins: [],
}
