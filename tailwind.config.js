/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: "#93032e",
        buff: "#c69f89",
        "moss-green-0": "#fffded",
        "moss-green-light": "#a6a15e",
        "moss-green": "#84894a",
        "brunswick-green": "#034c3c",
      },
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      kaiti: ["STKaiti"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
