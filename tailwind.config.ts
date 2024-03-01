import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#218DBE",
        mainBackGroundColor: "#1C536FB2",
        lightBlackColor: "#191B20",
        blackColor: "#111219",
        grayColor: "#B4B7CC",
        darkGrayColor: "#9797A0",
        darkSilverColor: "#9797A0",
        mainGrayColor: "#3F3F3F",
        lightGreenColor: "#B4CAD7",
        dellColor: "#8F93B0",
        lightBlue: "#A3A9CA",
      },
    },
  },
  plugins: [],
};
export default config;
