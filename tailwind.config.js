import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        Nero: '#FFF',
        NeroBlack: '#000',
        Tundora: '#434343',
        ShuttleGray: '#575C66',
        SilverChalice: '#A1A1A1',
        ElectricViolet: '#5C28F9',
        Warning: '#FF4747',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

