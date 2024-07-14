/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-card': '#1E1E1E',
        'dark-text': '#E0E0E0',
        'highlight': '#FF4500',
      },
    },
  },
  plugins: [],
}
