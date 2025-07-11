/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/customstyles.css",
  ],

  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B20B7",
          500: "#5B20B7", // rgba(91,32,183,1) hsla(263,75,1)
        },
        secondary: {
          DEFAULT: "#8C32E0",
          500: "#8C32E0", // rgba(140,50,224,1) hsla(274,68,44,1)
          400: "#A46AE4", // rgba(164,106,228,1) hsla(264,68,44,1)
          300: "#D4B8E4", // rgba(212,184,228,1) hsla(284,44,1)
        },
        error: {
          DEFAULT: "#F52323",
          500: "#F52323", // rgba(245,35,35,1) hsla(0,92,55,1)
        },
        success: {
          DEFAULT: "#2EB857",
          500: "#2EB857", // rgba(46,184,87,1) hsla(139,67,1)
        },
        text: {
          DEFAULT: "#000000",
          primary: "#000000", // rgba(0,0,0,1) hsla(0,0,1)
          secondary: "#F5F5F5", // rgba(245,245,245,1) hsla(0,0,96,1)
        },
      },
      fontSize: {
        // Typography scale based on the image
        h1: [
          "2rem",
          {
            // 32px
            lineHeight: "2.5rem", // 40px
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        h2: [
          "1.5rem",
          {
            // 24px
            lineHeight: "2rem", // 32px
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        h3: [
          "1.25rem",
          {
            // 20px
            lineHeight: "1.75rem", // 28px
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        emphasis: [
          "1rem",
          {
            // 16px
            lineHeight: "1.5rem", // 24px
            letterSpacing: "0",
            fontWeight: "700",
          },
        ],
        button: [
          "0.875rem",
          {
            // 14px
            lineHeight: "1.25rem", // 20px
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        body: [
          "1rem",
          {
            // 16px
            lineHeight: "1.5rem", // 24px
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        faint: [
          "0.875rem",
          {
            // 14px
            lineHeight: "1.25rem", // 20px
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
