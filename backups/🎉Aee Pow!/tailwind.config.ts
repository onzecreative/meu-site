import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['var(--font-urbanist)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: "#F94006",
        background: "#1C1817",
        foreground: "#ededed",
        "brand-dark": "#1C1817",
        "brand-light": "#F3F2F2",
        "text-main": "#363130",
        "brand-gray": "#CFCAC9",
      },
    },
  },
  plugins: [],
} satisfies Config;
