const { themeColor } = require("./src/styles/theme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      black: "black",
      white: "white",
      ...themeColor,
    },
  },
  plugins: [],
}
