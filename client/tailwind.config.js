/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        loading: "loading 1.5s infinite",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as the default sans font
      },
      gridTemplateColumns: {
        layout: "250px 1fr",
      },
      gridTemplateRows: {
        layout: "50px 1fr",
      },
      colors: {},
      backgroundColor: {
        "code-header": "#2C2C2C",
        "code-body": "#212121",
        cream: "#fafafa",
        background: "#fafafa",
        "dark-blue": "#f5f5f5",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
};
