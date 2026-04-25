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
        'burgundy': '#7A1F2E',
        'cream': '#F2EDE6',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
