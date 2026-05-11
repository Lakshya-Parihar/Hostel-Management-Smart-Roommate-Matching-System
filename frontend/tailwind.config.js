/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // CRA does not use index.html
  ],
  theme: {
    extend: {
        backgroundImage: {
    'custom-gradient': "linear-gradient(90deg, rgba(6,0,122,1) 0%, rgba(9,9,121,1) 52%, rgba(0,0,0,1) 100%)",
  }
    },
  },
  plugins: [],
}
