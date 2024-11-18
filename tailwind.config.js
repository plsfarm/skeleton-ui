const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "450px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#2f8af5",
        secondary: "#18182b",
        borderclr: "#2c2e32",
        grayLight: "#f4f4f4",
        textclr: "transparent",
        sidebar: "#2c63ff",

        lightPink: "#da0ce0",
        dark: "#06060c",
        darklight: "#15151a",
      },
      backgroundImage: {
        /*   primaryGr:
            "linear-gradient(108.18deg, rgba(234, 76, 137, 0.2) -2.02%, rgba(77, 68, 198, 0.2) 100%)", */
        primaryGr: "linear-gradient(108.18deg, rgba(0, 0, 0, 0.2) -2.02%, rgba(106, 47, 103, 0.2) 100%)",
        landing: 'url("/landing.jpeg")',
      },
      boxShadow: {
        pink: "0 0 16px #da0ce0",
      },
      gridTemplateColumns: {
        27: "35px repeat(13, 8px 35px)",
      },
      gridTemplateRows: {
        10: "repeat(5, 8px 35px)",
      },
      animation: {
        "spin-slow": "spin 24s reverse linear infinite",
      },
    },
  },
  plugins: [],
};
