const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      spacing: {
        full: "100%",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
};
