import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"

const theme = {
  colors: {
    azzurro: "#005FB0",
    mattone: "#C83D3D",
    arancione: "#F28F3B",
    panna: "#F2EFE5",
  },
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
