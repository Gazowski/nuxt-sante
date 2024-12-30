/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./nuxt.config.{js,ts}", "./app.vue", "./error.vue"],
    plugins: [require('tailwindcss-primeui')],
    darkMode: ['selector', '[class*="app-dark"]'],
    theme: {
        fontFamily: {
            sans: ['Comfortaa', 'sans-serif'],
            serif: ['Josefin Slab', 'serif'],
        }
    } 
};