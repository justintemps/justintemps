import { AppProps } from "next/dist/shared/lib/router/router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globals";
import { theme } from "../styles/theme";
import "../styles/fonts";

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
