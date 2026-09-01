/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080B10",
        cardBg: "#0F131A",
        surface: "#0F131A",
        primary: "#10B981",
        primaryGreen: "#10B981",
        accentGreen: "#A3E635",
        lightGray: "#F3F4F6",
        mutedGray: "#9CA3AF",
        borderGray: "rgba(255,255,255,.08)",
        border: "rgba(255,255,255,.08)",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
