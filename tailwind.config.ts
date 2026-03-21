import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        empire: {
          bg: "#0a0a0f",
          card: "#12121a",
          border: "#1e1e2e",
          text: "#f0f0f5",
          muted: "#8888a0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
