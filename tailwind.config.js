/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "center-sm": "0 0 8px rgba(0, 0, 0, 0.3)",
        "center-md": "0 0 16px rgba(0, 0, 0, 0.3)",
        "center-lg": "0 0 24px rgba(0, 0, 0, 0.3)",
      },
      fontSize: {
        xxs: "0.5rem",
      },
    },
  },
  plugins: [],
};
