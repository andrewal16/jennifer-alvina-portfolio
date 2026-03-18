import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      /* ═══ COLOR PALETTE ═══ */
      colors: {
        brand: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          accent: "var(--color-accent)",
          dark: "var(--color-dark)",
          darkest: "var(--color-darkest)",
        },
      },

      /* ═══ FONT FAMILIES ═══ */
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },

      /* ═══ KEYFRAMES ═══ */
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "hero-fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "hero-slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "hero-reveal-width": {
          "0%": { width: "0" },
          "100%": { width: "80px" },
        },
        "hero-line-reveal": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "hero-corner-reveal": {
          "0%": {
            opacity: "0",
            transform: "scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "scroll-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },

      /* ═══ ANIMATION UTILITIES ═══ */
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "scroll-line": "scroll-line 1.8s ease-in-out infinite",
      },
    },
  },
};

export default config;
