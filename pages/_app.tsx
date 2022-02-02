import React from "react";
import { AppProps } from "next/dist/shared/lib/router/router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globals";
import { theme } from "../styles/theme";
import "../styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  // Turn off browser warning about using useLayoutEffect on the server
  // More info: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  if (!process.browser) {
    React.useLayoutEffect = React.useEffect;
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
