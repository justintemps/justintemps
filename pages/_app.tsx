import { AppProps } from "next/dist/shared/lib/router/router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "normalize.css";

import { GlobalStyle } from "../styles/globals";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
