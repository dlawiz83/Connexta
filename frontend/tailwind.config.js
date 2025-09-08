/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // custom blue
        secondary: "#F59E0B", // custom yellow
        background: "#F9F9F9",
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: '14px', // sets text-base to 14px globally
      },
    },
  },
  plugins: [],
}

