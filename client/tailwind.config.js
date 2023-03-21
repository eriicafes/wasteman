/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow:{
        customShadow: '0px 2px 7px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        'map': "url('../assets/map-image2-mobile.jpg')"
      }
    },
  },
  plugins: [],
}
