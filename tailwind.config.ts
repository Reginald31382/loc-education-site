import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        ink: "#171412",
        cream: "#F6F1E8",
        sand: "#E7D7C2",
        terracotta: "#9B5B3E",
        moss: "#59624B",
        gold: "#C49A5A",
      },

      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],

        sans: ["Arial", "Helvetica", "sans-serif"],
      },

      boxShadow: {
        soft: "0 10px 40px rgba(23, 20, 18, 0.06)",
        elevated: "0 20px 60px rgba(23, 20, 18, 0.10)",
      },

      borderRadius: {
        "4xl": "2rem",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },

  plugins: [],
};

export default config;
