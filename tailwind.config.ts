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
        xbn: {
          base: "#0a0a0a",
          surface: "#111111",
          card: "#1a1a1a",
          elevated: "#222222",
          border: "#2a2a2a",
          "border-hover": "#3a3a3a",
          accent: "#ff4d00",
          "accent-hover": "#ff6b2b",
          "accent-dim": "rgba(255,77,0,0.15)",
          primary: "#ffffff",
          secondary: "#a3a3a3",
          muted: "#525252",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "xbn-gradient": "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #ff4d00 0%, #ff6b2b 100%)",
      },
      transformOrigin: {
        "center-right": "center right",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "system-ui"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "xbn-card": "0 1px 3px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.8)",
        "xbn-elevated":
          "0 4px 16px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)",
        "xbn-accent": "0 0 20px rgba(255,77,0,0.25)",
        "xbn-modal":
          "0 25px 60px rgba(0,0,0,0.9), 0 0 1px rgba(255,77,0,0.2)",
      },
      screens: {
        "3xl": "1537px",
        phone: "320px",
      },
    },
  },
  plugins: [],
};
export default config;
