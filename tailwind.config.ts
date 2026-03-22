import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["var(--font-figtree)", "sans-serif"],
      },
      colors: {
        primary: "#E8431A",
        brandDark: "#1A0500",
        brandLight: "#F2F0EB",
        brandGray: "#E0DDD8",
        textMain: "#1A1A1A",
      },
    },
  },
  plugins: [],
} satisfies Config;
