import { nextui } from "@nextui-org/react";

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        MTSCompact: ["MTSCompact", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        Nero: "#FFF",
        NeroBlack: "#000",
        Tundora: "#434343",
        ShuttleGray: "#575C66",
        SilverChalice: "#A1A1A1",
        ElectricViolet: "#5C28F9",
        Warning: "#FF4747",
        CodGray: "#1D1D1D",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

