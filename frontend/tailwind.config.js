/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050816",
        card: "#111827",
        primary: "#8B5CF6",
        secondary: "#06B6D4",
      },
    },
  },
  plugins: [],
}