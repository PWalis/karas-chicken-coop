import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "floc-yellow": "#F9E215",
        "light-yellow": "#fce96a",
        "floc-gray": "#1E1E1E",
      },
      fontFamily: {
        'josefin-sans': ['"Josefin Sans"', 'sans-serif'],
        'lodrina-solid': ['"Lord Rina Solid"', 'cursive'],
      },
      screens: {
        "3xl": "1668px",
      }
      
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
  ],

});
export default config;
