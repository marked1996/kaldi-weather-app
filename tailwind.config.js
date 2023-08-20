/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#F7F7F7",
        gray: "#666666",
        hover: "#B1B1B1",
        dark: "#111111",
        border: "#CFCFCF",
      },
      fontSize: {
        large: "clamp(16px, 2.5vw, 18px)",
        xlarge: "clamp(18px, 2.75vw ,20px)",
        heading: "clamp(26px, 3vw, 32px)",
        title: "clamp(42px, 5vw, 52px)",
      },
    },
  },
  plugins: [],
};
