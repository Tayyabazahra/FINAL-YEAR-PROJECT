/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        base: {
          white: "#fff",
          black: "#000",
        },
        neutral: {
          50: "#f3f4f1",
          100: "#e5e7e0",
          200: "#cdd2c4",
          300: "#afb5a1",
          400: "#929a81",
          500: "#768065",
          600: "#5b634d",
          700: "#474d3e",
          800: "#3b4034",
          900: "#34382f",
          950: "#1a1d16",
        },
        primary: {
          50: "#f5fee7",
          100: "#e9fccb",
          200: "#d5f99d",
          300: "#baf264",
          400: "#a0e635",
          500: "#84cc16",
          600: "#68a30d",
          700: "#517c0f",
          800: "#426212",
          900: "#3a5314",
          950: "#1e2e05",
        },
        surface: {
          bg: "#fafbf9",
        },
        btn: {
          primary: {
            bg: "#34382f",
            active: "#1a1d16",
            text: "#fff",
            hover: "#474d3e",
          },
          secondary: {
            bg: "#baf264",
            hover: "#d5f99d",
            active: "#a0e635",
            text: "#3b4034",
          },
          tertiary: {
            border: "#3b4034",
            text: "#3b4034",
          },
        },
        input: {
          bg: "#fff",
          border: "#cdd2c4",
          placeholder: "#afb5a1",
          icon: "#517c0f",
          helper: "#5b634d",
          error: "#f11616",
          text: "#34382f",
        },
        text: {
          primary: "#34382f",
          secondary: "#474d3e",
          tertiary: "#768065",
        },
        link: "#84cc16",
        card: {
          bg: "#fff",
          border: "#cdd2c4",
        },
      },

      fontFamily: {
        jakarta: ["Jakarta"],
        jost: ["Jost"],
        "jost-light": ["JostLight"],
        "jost-medium": ["JostMedium"],
        "jost-bold": ["JostBold"],
        "jakarta-light": ["JakartaLight"],
        "jakarta-medium": ["JakartaMedium"],
        "jakarta-semibold": ["JakartaSemibold"],
        "jakarta-bold": ["JakartaBold"],
      },

      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "24px"],
        md: ["16px", "26px"],
        lg: ["18px", "28px"],
        xl: ["20px", "30px"],
        "display-xs": ["24px", "32px"],
        "display-sm": ["32px", "40px"],
        "display-md": ["48px", "56px"],
        "display-lg": ["64px", "72px"],
        "display-xl": ["72px", "84px"],
      },
      letterSpacing: {
        tight: "-2%",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
