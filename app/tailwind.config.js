/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'library-background': "url('./res/library-background.jpg')"
      }
    }, 
  },
  plugins: [],
}

