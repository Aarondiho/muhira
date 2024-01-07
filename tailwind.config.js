/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}",
    "./src/screens/auth/**/*.{js,jsx,ts,tsx}",
    "./src/screens/home/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

