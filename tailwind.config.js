/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,jsx}",],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(29 155 240)',
        secondry: 'text-white/40',
        gray: '#2f3336'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}

