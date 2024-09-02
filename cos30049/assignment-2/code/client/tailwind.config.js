/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                navy: "#0E21A0",
                violet: "#4D2DB7",
                purple: "#9D44C0",
                pink: "#EC53B0"
            }, 
            fontFamily: {
                display: ["Bakbak One", "sans-serif"],
                body: ["Inter", "sans-serif"]
            }
        }
    },
    plugins: [],
}

