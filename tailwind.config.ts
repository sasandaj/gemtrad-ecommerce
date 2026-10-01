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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gem: {
          red: "#D71920",
          "red-hover": "#B9141A",
          "red-light": "#FEF2F2",
          blue: "#0854C4",
          "blue-hover": "#06439E",
          "blue-light": "#EFF6FF",
          silver: "#CBD5E1",
          "silver-light": "#F8FAFC",
          "silver-border": "#94A3B8",
          dark: "#0F172A",
          card: "#FFFFFF",
          gold: "#D4AF37",
          "gold-light": "#FFFDF0",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(203, 213, 225, 0.5)",
        "luxury-hover": "0 20px 40px -10px rgba(8, 84, 196, 0.12), 0 0 0 1.5px rgba(8, 84, 196, 0.4)",
        "ruby-hover": "0 20px 40px -10px rgba(215, 25, 32, 0.15), 0 0 0 1.5px rgba(215, 25, 32, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
