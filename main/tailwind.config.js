/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "black",
        background: "white", 
        foreground: "black",
      },
      borderWidth: {
        DEFAULT: "2px",
      },
      fontSize: {
        'title': '24px',
        'body': '16px', 
        'small': '14px',
      },
      spacing: {
        'container-padding': '16px',
        'item-margin': '8px',
        'component-gap': '12px',
      }
    },
  },
  plugins: [],
};
