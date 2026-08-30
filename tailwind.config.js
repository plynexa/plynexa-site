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
        primaryGreen: "#39FF14", // Verde elétrico/lima Plynexa
        accentGreen: "#10B981",
        lightGray: "#F3F4F6",
        mutedGray: "#9CA3AF",
        borderGray: "rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}