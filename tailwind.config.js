/** @type {import('tailwindcss').Config} */
export default {

  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'fatec-red': '#4A0F01',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        title: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
