/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#cfeffd",
          100: "#a0defb",
          200: "#77cff8",
          400: "#44bdf5",
          500: "#1aacf0",
          700: "#0570c9",
          800: "#003b88",
        },
        accent: {
          500: "#e6b30b",
        },
        gray: {
          700: "#221c30",
        },
      },
    },
  },
  plugins: [],
};
