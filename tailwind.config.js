/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-main": "#F6F6F6",
        "gray-light": "#EDEDED",
        "gray-dark": "#EAEBEC",
        "gray-darkest": "#49494A",
        "super-gray": "#DFDFDF",
        "gray-super-light": "#959595",
        "gray-border": "#DDDDDD",
        "green-accent": "#87D534",
        "blue-accent": "#009EE2",
      },
      width: {
        1200: "1200px",
        306: "306px",
        175: "175px",
        484: "484px",
      },
      height: {
        333: "333px",
        78: "78px",
        205: "205px",
        300: "300px",
        46: "46px",
      },
      margin: {
        33: "33px",
        46: "46px",
      },
    },
  },
  plugins: [],
};
