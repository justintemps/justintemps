import Typography from "typography";

const typography = new Typography({
  baseFontSize: "16px",
  scaleRatio: 2.5,
  baseLineHeight: 1.666,
  headerFontFamily: ["Lobster", "serif"],
  headerWeight: 400,
  bodyFontFamily: ["Muli", "sans-serif"],
  googleFonts: [
    {
      name: "Lobster",
      styles: ["400"],
    },
    {
      name: "Muli",
      styles: ["400"],
    },
  ],
});

export default typography;
