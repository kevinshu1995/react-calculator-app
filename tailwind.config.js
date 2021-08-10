// const colors = require('tailwindcss/colors')

module.exports = {
    mode: "jit",
    purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                gray: "#979797",
                main: {
                    blue: {
                        darker: "#181F33",
                        dark: "#242D44",
                        DEFAULT: "#3A4663", // main bg
                        light: "#647198",
                        lighter: "#A2B2E1",
                    },
                    orange: {
                        DEFAULT: "#D03F2F",
                        light: "#F96B5B",
                    },
                    white: "#EAE3DC",
                    gray: "#434A59",
                },
            },
        },
    },
    plugins: [],
};
