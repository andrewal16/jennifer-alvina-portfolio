import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      // COLOR PALETTE UPDATE
      colors: {
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
          dark: "var(--color-dark)",
          darkest: "var(--color-darkest)",
        },
      },
    },
  },
};

export default config;
